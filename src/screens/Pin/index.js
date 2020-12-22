import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Dimensions, ToastAndroid } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { checkPin, editUser } from '../../redux/action/user'
import style from '../../helper'
import Back from '../../assets/icons/arrow-left-white.svg'
import SmoothPin from 'react-native-smooth-pincode-input'

const CurrPin = ({ navigation }) => {
    const pinInput = useRef() 
    const [pin, setPin] = useState('')
    const [isFull, setFull] = useState(false)
    const [newPin, setNewPin] = useState('')
    const [isFullNew, setFullNew] = useState(false)
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const { pinCheck, checkedPin, isEditSuccess } = useSelector(state => state.user)

    const onSubmit = () => {
        if(isFull) {
            dispatch(checkPin({pin}, token))
            
        } else {
            ToastAndroid.show('PIN must be Fulfilled', ToastAndroid.SHORT)
        }
    }

    const changePin = () => {
        if(isFullNew) {
            dispatch(editUser({
                pin: newPin
            }, token))
            if(isEditSuccess) {
                navigation.navigate("Profile")
            }
        } else {
            ToastAndroid.show('PIN must be Fulfilled', ToastAndroid.SHORT)
        }

    }

    if(checkedPin) {
        return (
            <>
                <StatusBar backgroundColor={style.primary} barStyle="light-content" />
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
                                    <Text style={{textAlign: 'center', fontSize: 16, color: style.darkMed, marginBottom: 50}}>
                                        Type your new 6 digits security PIN to use in Zwallet.
                                    </Text>
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
                                            value={newPin}
                                            onTextChange={(pin) => {setNewPin(pin); pin.length < 6 ? setFullNew(false) : setFullNew(true)}}
                                            onFulfill={() => setFullNew(true)}
                                            onBackspace={() => setFullNew(false)}
                                        />
                                    </View>
                                </View>
                                <RectButton onPress={changePin} style={isFullNew ? styles.buttonPrimary : styles.buttonGrey}>
                                    <Text style={{color: isFullNew ? style.white : style.darkGrey, fontSize: 18, fontWeight: 'bold'}}>Change PIN</Text>
                                </RectButton>
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
           </>
        )
    } else {
        return (
            <>
                <StatusBar backgroundColor={style.primary} barStyle="light-content"/>
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
                                    <Text style={{textAlign: 'center', fontSize: 16, color: style.darkMed, marginBottom: 50, lineHeight: 27}}>
                                        Enter your current 6 digits Zwallet PIN below to continue to the next steps.
                                    </Text>
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
                                            onFulfill={() => setFull(true)}
                                            onBackspace={() => setFull(false)}
                                        />
                                    </View>
                                </View>
                                <Text style={{textAlign: 'center', color: style.error, fontSize: 16}}>{pinCheck}</Text>
                                <RectButton onPress={onSubmit} style={isFull ? styles.buttonPrimary : styles.buttonGrey}>
                                    <Text style={{color: isFull ? style.white : style.darkGrey, fontSize: 18, fontWeight: 'bold'}}>Confirm</Text>
                                </RectButton>
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
           </>
        )
    }
}

export default CurrPin

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
