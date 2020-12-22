import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Dimensions, ToastAndroid } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { editUser } from '../../redux/action/user'
import style from '../../helper'
import Back from '../../assets/icons/arrow-left-white.svg'
import Trash from '../../assets/icons/trash.svg'
import PhoneLogo from '../../assets/icons/phone.svg'
import PhoneActive from '../../assets/icons/phone-active.svg'
import Input from '../../components/inputBorderBottom'
import { RectButton } from 'react-native-gesture-handler'

const Phone = ({ navigation }) => {
    const [inputActive, setActive] = useState(false)
    const [phone, setPhone] = useState('')
    const dispatch = useDispatch()
    const { data, isEditFailed } = useSelector(state => state.user)
    const { token } = useSelector(state => state.auth)

    const splitPhone = (phone) => {
        if(phone) {
            const newPhone = phone.split('').map((item, index) => {
                if(index === 2 || index === 6) {
                    return item + '-'
                } else {
                    return item
                }
            })
    
            return newPhone
        } else {
            return ""
        }
    }

    const addPhone = () => {
        if(phone.length == 11 && phone[0] != 0) {
            dispatch(editUser({ phone }, token))
            if(isEditFailed) {
                ToastAndroid.show('Phone already exist', ToastAndroid.SHORT)
            }
        } else {
            ToastAndroid.show('Phone must be 11 character and not include 0', ToastAndroid.SHORT)
        }
    }

    const deletePhone = () => {
        dispatch(editUser({phone: null}, token))
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
                                    {data.phone ? 'Manage Phone Number' : 'Add Phone Number'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', paddingHorizontal: 16, marginBottom: 30, justifyContent: 'space-between', height: Dimensions.get('screen').height / 1.5}}>
                            <View>
                                <Text style={{textAlign: 'center', color: style.darkMed, fontSize: 16, lineHeight: 27, marginBottom: 40}}>
                                    {data.phone ? (
                                        'You can only delete the phone number and then you must add another phone number.'
                                    ) : (
                                        'Add at least one phone number for the transfer ID so you can start transfering your money to another user.'
                                    )}
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                    {data.phone ? (
                                        <View style={[styles.card, {justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}]}>
                                            <View>
                                                <Text style={styles.title}>Primary</Text>
                                                    <Text style={styles.value}>+62 {splitPhone(data.phone)}</Text>
                                            </View>
                                            <TouchableOpacity onPress={deletePhone}>
                                                <Trash width={28} height={28} />
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <View style={{position: 'relative', width: Dimensions.get('screen').width - 32}}>
                                            <View style={{position: 'absolute', left: 0, top: 10}}>
                                                {inputActive ? <PhoneActive width={24} height={24} /> : <PhoneLogo width={24} height={24} />}
                                            </View>
                                            <View style={{position: 'absolute', left: 33, top: 13}}>
                                                <Text style={{color: style.dark2, fontSize: 16,fontWeight: '800'}}>+62</Text>
                                            </View>
                                            <Input
                                                setActive={setActive}
                                                value={phone}
                                                onChangeText={text => setPhone(text)}
                                                placeholder="Enter your phone number"
                                                placeholderTextColor="rgba(169, 169, 169, 0.8)"
                                                returnKeyType="send"
                                                padding={70}
                                                keyboardType="phone-pad"
                                            />
                                        </View>
                                    )}
                                </View> 
                            </View>
                            {data.phone ? (
                            <Text></Text>
                            ) : (
                                <RectButton onPress={addPhone} style={phone.length === 11 ? styles.buttonPrimary : styles.buttonGrey}>
                                    <Text style={{color: phone.length === 11 ? style.white : style.darkGrey, fontSize: 18, fontWeight: 'bold'}}>Submit</Text>
                                </RectButton>
                            )}
                        </View>       
                    </ScrollView>
                </View>
            </SafeAreaView>
       </>
    )
}

export default Phone

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
