import React, { useState, useRef } from 'react'
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ToastAndroid } from 'react-native'
import TextInput from '../../components/inputBorderBottom'
import style from '../../helper'
import { checkEmail, formFilled } from '../../redux/action/register'
import { useDispatch, useSelector } from 'react-redux'
import Person from '../../assets/icons/person.svg'
import PersonActive from '../../assets/icons/person-active.svg'
import Mail from '../../assets/icons/mail.svg'
import MailActive from '../../assets/icons/mail-active.svg'
import Lock from '../../assets/icons/lock.svg'
import LockActive from '../../assets/icons/lock-active.svg'
import Eye from '../../assets/icons/eye-crossed.svg'

const Register = ({ navigation }) => {
    const dispatch = useDispatch()
    const { isFormFilled, messageEmail } = useSelector(state => state.register)
    const inputEmail = useRef()
    const inputPassword = useRef()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameActive, setNameActive] = useState(false)
    const [emailActive, setEmailActive] = useState(false)
    const [passwordActive, setPasswordActive] = useState(false)
    const [eyeCondition, setEyeCondition] = useState(false)
    const [buttonActive, setButtonActive] = useState(false)

    const onSubmit = () => {
        if(name && email && password) {
            dispatch(checkEmail(email))
            if(messageEmail === 'Email Not Found') {
                dispatch(formFilled({
                    name,
                    email,
                    password
                }))
                if(isFormFilled) {
                    navigation.navigate('RegisterPin')
                }
            } else {
                ToastAndroid.show(messageEmail, ToastAndroid.SHORT)
            }
        }
    }

    const onChange = () => {
        if(name && email && password) {
            dispatch(checkEmail(email))
            setButtonActive(true)
        } else {
            setButtonActive(false)
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
                            <Text style={styles.title}>Sign Up</Text>
                            <Text style={styles.description}>Create your account to access Zwallet.</Text>
                            <View style={{position: 'relative', width: '100%'}}>
                                <View style={{position: 'absolute', left: 0, top: 10}}>
                                    {nameActive ? <PersonActive width={25} height={25}/> : <Person width={25} height={30}/>}
                                </View>
                                <TextInput 
                                    value={name}
                                    setActive={setNameActive}
                                    onChangeText={text => setName(text)}
                                    onChange={onChange}
                                    onSubmitEditing={() => inputEmail.current.focus()}
                                    placeholder="Enter your username"
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                />
                            </View>
                            <View style={{position: 'relative', width: '100%'}}>
                                <View style={{position: 'absolute', left: 0, top: 10}}>
                                    {emailActive ? <MailActive width={25} height={25}/> : <Mail width={25} height={30}/>}
                                </View>
                                <TextInput 
                                    inputref={inputEmail}
                                    value={email}
                                    setActive={setEmailActive}
                                    onChangeText={text => {setEmail(text)}}
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
                            <TouchableOpacity 
                                style={buttonActive ? styles.buttonPrimary : styles.buttonGrey}
                                onPress={onSubmit}
                            >
                                <Text style={{color:'#FFFFFF', fontSize: 18}}>Register</Text>
                            </TouchableOpacity>
                            <Text>Already have an account? Let’s <Text onPress={() => navigation.navigate('Login')} style={{color: '#6379F4', fontWeight: 'bold'}}>Login</Text></Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )
}

export default Register

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