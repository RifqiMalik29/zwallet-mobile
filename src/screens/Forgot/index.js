import React, { useState, useRef, useEffect } from 'react'
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ToastAndroid } from 'react-native'
import TextInput from '../../components/inputBorderBottom'
import style from '../../helper'
import { checkEmail, emailFilled } from '../../redux/action/forgot'
import { useDispatch, useSelector } from 'react-redux'
import Mail from '../../assets/icons/mail.svg'
import MailActive from '../../assets/icons/mail-active.svg'

const Forgot = ({ navigation }) => {
    const dispatch = useDispatch()
    const { messageEmail, isEmailFilled } = useSelector(state => state.forgot)
    const [email, setEmail] = useState('')
    const [emailActive, setEmailActive] = useState(false)
    const [buttonActive, setButtonActive] = useState(false)

    useEffect(() => {
        if(isEmailFilled) {
            navigation.navigate("ResetPassword")
        }
    }, [dispatch, emailFilled])

    const onSubmit = () => {
        dispatch(checkEmail(email))
        if(messageEmail === 'Email already exist') {
            dispatch(emailFilled(email))
            if(isEmailFilled) {
                navigation.navigate("ResetPassword")
            }
        } else {
            ToastAndroid.show(messageEmail, ToastAndroid.SHORT)
        }
    }

    const onChange = () => {
        if(email) {
            dispatch(checkEmail(email))
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
                            <View style={{alignItems: 'center', width: '100%'}}>
                                <Text style={styles.title}>Reset Password</Text>
                                <Text style={styles.description}>Enter your Zwallet e-mail so we can send you a password reset link.</Text>
                                <View style={{position: 'relative', width: '100%'}}>
                                    <View style={{position: 'absolute', left: 0, top: 10}}>
                                        {emailActive ? <MailActive width={25} height={25}/> : <Mail width={25} height={30}/>}
                                    </View>
                                    <TextInput 
                                        value={email}
                                        setActive={setEmailActive}
                                        onChangeText={text => setEmail(text)}
                                        onChange={onChange}
                                        placeholder="Enter your e-mail"
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>
                            <TouchableOpacity 
                                style={buttonActive ? styles.buttonPrimary : styles.buttonGrey}
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

export default Forgot

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