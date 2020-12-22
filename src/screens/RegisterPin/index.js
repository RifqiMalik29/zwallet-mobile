import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Dimensions, ToastAndroid } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { pinFilled, signup } from '../../redux/action/register'
import style from '../../helper'
import Back from '../../assets/icons/arrow-left-white.svg'
import SmoothPin from 'react-native-smooth-pincode-input'

const ResgisterPin = ({ navigation }) => {
    const pinInput = useRef() 
    const [pin, setPin] = useState('')
    const [isFull, setFull] = useState(false)
    const dispatch = useDispatch()
    const { data, isSuccess, message } = useSelector(state => state.register)

    useEffect(() => {
        if(isSuccess) {
            navigation.replace("RegisterSuccess")
        } else {
            ToastAndroid.show(message, ToastAndroid.SHORT)
        }
    }, [signup, isSuccess])

    const checkPin = (pin) => {
        setFull(true)
    }

    const onSubmit = ( ) => {
        if(isFull) {
            dispatch(pinFilled(pin))
            if(data.pin) {
                dispatch(signup(data))
            }
        }
    }

    return (
        <>
            <StatusBar backgroundColor="#FAFCFF" barStyle="dark-content"/>
            <SafeAreaView>
                <View>
                    <ScrollView style={{height: '100%'}}>
                        <View style={styles.containerTop}>
                            <Text style={styles.logo}>Zwallet</Text>
                        </View>
                        <View style={styles.containerBottom}>
                            <View style={{alignItems: 'center'}}>
                                <Text style={styles.title}>Create Security PIN</Text>
                                <Text style={styles.description}>Create a PIN that’s contain 6 digits number for security purpose in Zwallet.</Text>
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
                            <TouchableOpacity 
                                style={isFull ? styles.buttonPrimary : styles.buttonGrey}
                                onPress={onSubmit}
                            >
                                <Text style={{color:'#FFFFFF', fontSize: 18}}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
       </>
    )
}

export default ResgisterPin

const styles = StyleSheet.create({
    containerTop: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: style.background,
        height: Dimensions.get('screen').width / 3
    },
    logo: {
        fontSize: 26,
        color: style.primary,
        fontWeight: 'bold',
        fontFamily: style.font
    }, 
    containerBottom: {
        backgroundColor: style.white,
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingVertical: 40,
        paddingHorizontal: 16,
        height: Dimensions.get('screen').height / 1.4,
        elevation: 3,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: style.font
    },
    description: {
        fontSize: 16,
        color: 'rgba(58, 61, 66, 0.6)',
        textAlign: 'center',
        marginBottom: 40,
        marginHorizontal: 30,
        fontFamily: style.font,
        lineHeight: 27
    },
    buttonPrimary: {
        alignItems: 'center',
        backgroundColor: style.primary,
        width: "100%",
        padding: 16,
        borderRadius: 12,
        elevation: 3,
        marginBottom: 15,
        marginTop: 40
    },
    buttonGrey: {
        backgroundColor: '#DADADA',
        alignItems: 'center',
        width: "100%",
        padding: 16,
        borderRadius: 12,
        elevation: 3,
        marginBottom: 15,
        marginTop: 40
    },
    forget: {
        color: 'red',
        fontSize: 14,
        alignSelf: 'flex-end'
    },
    navigation: {
        color: 'rgba(58, 61, 66, 0.8)',
        textAlign: 'center',
        fontSize: 16
    }
})
