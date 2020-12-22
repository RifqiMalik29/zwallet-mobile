import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Dimensions, ToastAndroid } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { editUser } from '../../redux/action/user'
import style from '../../helper'
import Back from '../../assets/icons/arrow-left-white.svg'
import Lock from '../../assets/icons/lock.svg'
import LockActive from '../../assets/icons/lock-active.svg'
import Eye from '../../assets/icons/eye-crossed.svg'
import Input from '../../components/inputBorderBottom'
import { RectButton } from 'react-native-gesture-handler'

const Password = ({ navigation }) => {
    const [currPassword, setCurrPassword] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeat] = useState('')
    const [currActive, setCurrActive] = useState('')
    const [active, setActive] = useState('')
    const [repeatActive, setRepeatActive] = useState('')
    const [eyeCurr, setEyeCurr] = useState(false)
    const [eye, setEye] = useState(false)
    const [eyeRepeat, setEyeRepeat] = useState(false)
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const { isEditSuccess, messageEdit, isEditFailed } = useSelector(state => state.user)

    const onSubmit = () => {
        if(currPassword && password && password === repeatPassword) {
            dispatch(editUser({ currPassword, password }, token))
            if(isEditSuccess) {
                navigation.replace("Profile")
                ToastAndroid.show(messageEdit, ToastAndroid.SHORT)
            }

            if(isEditFailed) {
                ToastAndroid.show(messageEdit, ToastAndroid.SHORT)
            }
        } else {
            ToastAndroid.show('Current Password must be fulfilled and Repeat password must be same with password', ToastAndroid.SHORT)
        }
    }

    return (
        <>
            <StatusBar backgroundColor={style.primary} barStyle="light-content" />
            <SafeAreaView>
                <View>
                    <ScrollView style={{height: '100%', backgroundColor: style.background}}>
                        <View style={styles.top}>
                            <TouchableOpacity style={{flexDirection: 'row', marginBottom: 30, alignSelf: 'flex-start'}} onPress={() => navigation.goBack()}>
                                <Back width={28} height={28} />
								<Text style={{color: style.white, fontWeight: 'bold', fontSize: 20, marginLeft: 20}}>
                                    Change Password
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', paddingHorizontal: 16, marginBottom: 30, justifyContent: 'space-between', height: Dimensions.get('screen').height / 1.5}}>
                            <View>
                                <Text style={{textAlign: 'center', color: style.darkMed, fontSize: 16, lineHeight: 27, marginBottom: 40}}>
                                    You must enter your current password and then type your new password twice.
                                </Text>
                                <View>
                                    <View style={{position: 'relative', width: '100%'}}>
                                        <View style={{position: 'absolute', left: 0, top: 10}}>
                                            {currActive ? <LockActive width={25} height={25}/> : <Lock width={25} height={25}/>}
                                        </View>
                                        <Input
                                            value={currPassword}
                                            setActive={setCurrActive}
                                            onChangeText={text => setCurrPassword(text)}
                                            placeholder="Current Password"
                                            returnKeyType="next"
                                            autoCapitalize="none"
                                            secureTextEntry={eyeCurr ? false : true}
                                        />
                                        <TouchableOpacity onPress={() => setEyeCurr(!eyeCurr)} style={{position: 'absolute', right: 0, top: 10}}>
                                            <Eye width={25} height={30} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{position: 'relative', width: '100%'}}>
                                        <View style={{position: 'absolute', left: 0, top: 10}}>
                                            {active ? <LockActive width={25} height={25}/> : <Lock width={25} height={25}/>}
                                        </View>
                                        <Input
                                            value={password}
                                            setActive={setActive}
                                            onChangeText={text => setPassword(text)}
                                            placeholder="New Password"
                                            returnKeyType="next"
                                            autoCapitalize="none"
                                            secureTextEntry={eye ? false : true}
                                        />
                                        <TouchableOpacity onPress={() => setEye(!eye)} style={{position: 'absolute', right: 0, top: 10}}>
                                            <Eye width={25} height={30} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{position: 'relative', width: '100%'}}>
                                        <View style={{position: 'absolute', left: 0, top: 10}}>
                                            {repeatActive ? <LockActive width={25} height={25}/> : <Lock width={25} height={25}/>}
                                        </View>
                                        <Input
                                            value={repeatPassword}
                                            setActive={setRepeatActive}
                                            onChangeText={text => setRepeat(text)}
                                            placeholder="Repeat Password"
                                            returnKeyType="send"
                                            autoCapitalize="none"
                                            secureTextEntry={eyeRepeat ? false : true}
                                        />
                                        <TouchableOpacity onPress={() => setEyeRepeat(!eyeRepeat)} style={{position: 'absolute', right: 0, top: 10}}>
                                            <Eye width={25} height={30} />
                                        </TouchableOpacity>
                                    </View>
                                </View> 
                            </View>
                            <RectButton onPress={onSubmit} style={currPassword && password && password === repeatPassword ? styles.buttonPrimary : styles.buttonGrey}>
                                <Text style={{color: currPassword && password && password === repeatPassword ? style.white : style.darkGrey, fontSize: 18, fontWeight: 'bold'}}>Change Password</Text>
                            </RectButton>
                        </View>       
                    </ScrollView>
                </View>
            </SafeAreaView>
       </>
    )
}

export default Password

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
    card: {
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
        padding: 15,
		marginBottom: 20,
        elevation: 3,
        flex: 1
    },
    title: {
        color: style.darkMed,
        fontSize: 16,
        marginBottom: 10
    },
    value: {
        color: style.title,
        fontSize: 22,
        fontWeight: 'bold'
    }, 
})
