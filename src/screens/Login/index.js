import React, { useState, useRef } from 'react'
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, ToastAndroid } from 'react-native'
import TextInput from '../../components/inputBorderBottom'
import style from '../../helper'
import { login } from '../../redux/action/login'
import { useDispatch, useSelector } from 'react-redux'
import Mail from '../../assets/icons/mail.svg'
import MailActive from '../../assets/icons/mail-active.svg'
import Lock from '../../assets/icons/lock.svg'
import LockActive from '../../assets/icons/lock-active.svg'
import Eye from '../../assets/icons/eye-crossed.svg'

const Login = ({ navigation }) => {
    const { loading, isLogin, error, isAdmin, isUser, device_token } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const inputPassword = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailActive, setEmailActive] = useState(false)
    const [passwordActive, setPasswordActive] = useState(false)
    const [eyeCondition, setEyeCondition] = useState(false)
    const [buttonActive, setButtonActive] = useState(false)

    const onSubmit = async() => {
       dispatch(login({ email, password, device_token }))
       if(isLogin && !isAdmin && isUser) {
           ToastAndroid.show('Login Success', ToastAndroid.SHORT)
       }

       if(isLogin && isAdmin && !isUser) {
           ToastAndroid.show('Your account is admin please login on our web', ToastAndroid.LONG)
       }

       if(error && !isLogin) {
           ToastAndroid.show(error, ToastAndroid.SHORT)
       }
    }

    const onChange = () => {
        if(email && password) {
            setButtonActive(true)
        } else {
            setButtonActive(false)
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
                            <Text style={styles.title}>Login</Text>
                            <Text style={styles.description}>Login to your existing account to access all the features in Zwallet.</Text>
                            <View style={{position: 'relative', width: '100%'}}>
                                <View style={{position: 'absolute', left: 0, top: 10}}>
                                    {emailActive ? <MailActive width={25} height={25}/> : <Mail width={25} height={30}/>}
                                </View>
                                <TextInput 
                                    value={email}
                                    setActive={setEmailActive}
                                    onChangeText={text => setEmail(text)}
                                    onChange={onChange}
                                    onSubmitEditing={() => inputPassword.current.focus()}
                                    placeholder="Enter your e-mail"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                />
                            </View>
                            <View style={{position: 'relative', width: '100%'}}>
                                <View style={{position: 'absolute', left: 0, top: 10}}>
                                    {passwordActive ? <LockActive width={25} height={25}/> : <Lock width={25} height={25}/>}
                                </View>
                                <TextInput
                                    inputref={inputPassword}
                                    value={password}
                                    setActive={setPasswordActive}
                                    onChangeText={text => setPassword(text)}
                                    onChange={onChange}
                                    placeholder="Enter your password"
                                    returnKeyType="send"
                                    autoCapitalize="none"
                                    secureTextEntry={eyeCondition ? false : true}
                                />
                                <TouchableOpacity onPress={() => setEyeCondition(!eyeCondition)} style={{position: 'absolute', right: 0, top: 10}}>
                                    <Eye width={25} height={30} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('Forgot')} style={{alignSelf: 'flex-end'}}>
                                <Text style={styles.forget}>Forgot password?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={buttonActive ? styles.buttonPrimary : styles.buttonGrey}
                                onPress={onSubmit}
                            >
                                <Text style={{color:'#FFFFFF', fontSize: 18}}>Login</Text>
                            </TouchableOpacity>
                            <Text>Don’t have an account? Let’s <Text onPress={() => navigation.navigate('Register')} style={{color: '#6379F4', fontWeight: 'bold'}}>Sign Up</Text></Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )
}

export default Login

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
        
    }, 
    containerBottom: {
        backgroundColor: style.white,
        alignItems: 'center',
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
        
    },
    description: {
        fontSize: 16,
        color: 'rgba(58, 61, 66, 0.6)',
        textAlign: 'center',
        marginBottom: 20,
        marginHorizontal: 30,
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
    },
    forget: {
        color: '#3A3D42',
        fontSize: 14
    },
    navigation: {
        color: 'rgba(58, 61, 66, 0.8)',
        textAlign: 'center',
        fontSize: 16
    }
})