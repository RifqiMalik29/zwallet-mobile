import React, { useState, useRef, useEffect } from 'react'
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ToastAndroid } from 'react-native'
import TextInput from '../../components/inputBorderBottom'
import style from '../../helper'
import { reset } from '../../redux/action/forgot'
import { useDispatch, useSelector } from 'react-redux'
import Lock from '../../assets/icons/lock.svg'
import LockActive from '../../assets/icons/lock-active.svg'
import Eye from '../../assets/icons/eye-crossed.svg'

const ResetPassword = ({ navigation }) => {
    const dispatch = useDispatch()
    const { email, isSuccess } = useSelector(state => state.forgot)
    const inputPassword = useRef()
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeat] = useState('')
    const [passwordActive, setPasswordActive] = useState(false)
    const [repeatActive, setRepeatActive] = useState('')
    const [eyeCondition, setEyeCondition] = useState(false)
    const [eyeRepeat, setEyeRepeat] = useState(false)
    const [buttonActive, setButtonActive] = useState(false)

    useEffect(() => {
        if(isSuccess) {
            navigation.replace("Login")
        }
    }, [isSuccess, reset])

    const onSubmit = () => {
        console.log(password, repeatPassword)
        if(password === repeatPassword) {
            dispatch(reset({email, password}))
                if(isSuccess) {
                    navigation.replace("Login")
                }
        } else {
            ToastAndroid.show('Password must be the same', ToastAndroid.SHORT)
        }
    }

    return (
        <>
            <StatusBar backgroundColor={style.background} barStyle="dark-content"/>
            <SafeAreaView>
                <View>
                    <ScrollView style={{height: '100%'}}>
                        <View style={styles.containerTop}>
                            <Text style={styles.logo}>Zwallet</Text>
                        </View>
                        <View style={styles.containerBottom}>
                            <View style={{alignItems: 'center', width: '100%'}}>
                                <Text style={styles.title}>Reset Password</Text>
                                <Text style={styles.description}>Enter your Zwallet e-mail so we can send you a password reset link.</Text>
                                <View style={{position: 'relative', width: '100%'}}>
                                    <View style={{position: 'absolute', left: 0, top: 10}}>
                                        {passwordActive ? <LockActive width={25} height={25}/> : <Lock width={25} height={25}/>}
                                    </View>
                                    <TextInput
                                        value={password}
                                        setActive={setPasswordActive}
                                        onChangeText={text => {setPassword(text); password && password === repeatPassword ? setButtonActive(true) : setButtonActive(false)}}
                                        placeholder="Create new password"
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        secureTextEntry={eyeCondition ? false : true}
                                        onSubmitEditing={() => inputPassword.current.focus()}
                                    />
                                    <TouchableOpacity onPress={() => setEyeCondition(!eyeCondition)} style={{position: 'absolute', right: 0, top: 10}}>
                                        <Eye width={25} height={30} />
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{position: 'relative', width: '100%'}}>
                                    <View style={{position: 'absolute', left: 0, top: 10}}>
                                        {repeatActive ? <LockActive width={25} height={25}/> : <Lock width={25} height={25}/>}
                                    </View>
                                    <TextInput
                                        inputref={inputPassword}
                                        value={repeatPassword}
                                        setActive={setRepeatActive}
                                        onChangeText={text => {setRepeat(text); password && password === repeatPassword ? setButtonActive(true) : setButtonActive(false)}}
                                        placeholder="Confirm new password"
                                        returnKeyType="send"
                                        autoCapitalize="none"
                                        secureTextEntry={eyeRepeat ? false : true}
                                    />
                                    <TouchableOpacity onPress={() => setEyeRepeat(!eyeRepeat)} style={{position: 'absolute', right: 0, top: 10}}>
                                        <Eye width={25} height={30} />
                                    </TouchableOpacity>
                                </View>
                            <TouchableOpacity 
                                style={styles.buttonPrimary}
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

export default ResetPassword

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
        justifyContent: 'space-between',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingVertical: 40,
        paddingHorizontal: 16,
        height: Dimensions.get('screen').height / 1.4,
        elevation: 3
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
        marginBottom: 20,
        marginHorizontal: 30,
        fontFamily: style.font,
        lineHeight: 23
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
    }
})