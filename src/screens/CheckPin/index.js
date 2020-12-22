import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Dimensions, ToastAndroid } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { transfer } from '../../redux/action/transfer'
import style from '../../helper'
import Back from '../../assets/icons/arrow-left-white.svg'
import SmoothPin from 'react-native-smooth-pincode-input'

const CheckPin = ({ navigation }) => {
    const pinInput = useRef() 
    const [pin, setPin] = useState('')
    const [isFull, setFull] = useState(false)
    const dispatch = useDispatch()
    const { dataTransfer, messagePIN, isSuccess, isFailed } = useSelector(state => state.transfer)
    const { userTransfer} = useSelector(state => state.search)
    const { data } = useSelector(state => state.user)
    const { token } = useSelector(state => state.auth)

    useEffect(() => {
        if(isSuccess || isFailed && !messagePIN) {
            ToastAndroid.show(`Transfer ${isSuccess ? 'Success' : 'Failed'}`, ToastAndroid.SHORT)
            navigation.replace("Status")
        }
    }, [isSuccess, isFailed])

    const checkPin = (pin) => {
        setFull(true)
    }

    const onSubmit = () => {
        if(isFull) {
            dispatch(transfer(token, {
                ...dataTransfer,
                pin,
                sender: data.name,
                photo_sender: data.photo,
                device_token: userTransfer.device_token
            }, userTransfer.balance))
        } else {
            ToastAndroid.show('PIN must be Fulfilled', ToastAndroid.SHORT)
        }

        if(isFailed && messagePIN && !isSuccess) {
            pinInput.current.shake()
            ToastAndroid.show(messagePIN, ToastAndroid.SHORT)
        }
    }

    return (
        <>
            <StatusBar backgroundColor={style.primary} />
            <SafeAreaView>
                <View>
                    <ScrollView style={{height: '100%', backgroundColor: style.background}}>
                        <View style={styles.top}>
                            <TouchableOpacity style={{flexDirection: 'row', marginBottom: 30, alignSelf: 'flex-start'}} onPress={() => navigation.goBack()}>
                                <Back width={28} height={28} />
								<Text style={{color: style.white, fontWeight: 'bold', fontSize: 20, marginLeft: 20}}>Enter Your PIN</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: Dimensions.get('screen').height / 1.5}}>
                            <View style={{alignItems: 'center'}}>
                                <Text style={{textAlign: 'center', color: style.dark, fontSize: 22, fontWeight: 'bold', marginBottom: 20}}>Enter PIN to Transfer</Text>
                                <Text style={{textAlign: 'center', fontSize: 16, color: style.darkMed, marginBottom: 50}}>Enter your 6 digits PIN for confirmation to continue transferring money. </Text>
                                <View>
                                    <SmoothPin
                                        ref={pinInput}
                                        codeLength={6}
                                        placeholder={<View style={{
                                            borderBottomWidth: 1,
                                            borderBottomColor: 'rgba(169, 169, 169, 0.6)',
                                            width: '60%',
                                            height: '80%'
                                        }}></View>}
                                        cellStyle={{
                                            borderRadius: 10,
                                            borderColor: isFull ? style.primary : 'rgba(169, 169, 169, 0.6)',
                                            borderWidth: 1,
                                            backgroundColor: '#FFFFFF'
                                        }}
                                        cellStyleFocused={{
                                            borderColor: style.primary
                                        }}
                                        textStyle={{
                                            color: style.dark,
                                            fontSize: 24,
                                            fontWeight: 'bold'
                                        }}
                                        cellSpacing={10}
                                        cellSize={55}
                                        value={pin}
                                        onTextChange={(pin) => {setPin(pin); pin.length < 6 ? setFull(false) : setFull(true)}}
                                        onFulfill={checkPin}
                                        onBackspace={() => setFull(false)}
                                    />
                                </View>
                            </View>
                            <RectButton onPress={onSubmit} style={isFull ? styles.buttonPrimary : styles.buttonGrey}>
                                <Text style={{color: isFull ? style.white : style.darkGrey, fontSize: 18, fontWeight: 'bold'}}>Transfer Now</Text>
                            </RectButton>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
       </>
    )
}

export default CheckPin

const styles = StyleSheet.create({
    top: {
		backgroundColor: style.primary,
		borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
		paddingTop: StatusBar.currentHeight * 1.8,
		paddingHorizontal: 16,
		marginBottom: 30,
		alignItems: 'center'
	},
    buttonPrimary: {
        alignItems: 'center',
        backgroundColor: style.primary,
        width: Dimensions.get('screen').width - 32,
        padding: 16,
        borderRadius: 12,
        elevation: 3,
        marginBottom: 15,
        marginTop: 40
    },
    buttonGrey: {
        backgroundColor: '#DADADA',
        alignItems: 'center',
        width: Dimensions.get('screen').width - 32,
        padding: 16,
        borderRadius: 12,
        elevation: 3,
        marginBottom: 15,
        marginTop: 40
    },
})
