import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Image, Dimensions, TextInput, ToastAndroid } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { formFilled } from '../../redux/action/transfer'
import NoteInput from '../../components/inputBorderBottom'
import style from '../../helper'
import Back from '../../assets/icons/arrow-left-white.svg'
import Edit from '../../assets/icons/edit.svg'
import EditActive from '../../assets/icons/edit-active.svg'
import { imageURI } from '../../utils'

const Input = ({ navigation }) => {
    const dispatch = useDispatch()
    const noteInput = useRef()
    const [amount, setAmount] = useState('')
    const [note, setNote] = useState('')
    const [noteActive, setNoteActive] = useState(false)
    const { userTransfer } = useSelector(state => state.search)
    const { data } = useSelector(state => state.user)

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

    const onSubmit = () => {
        if(parseInt(amount) && parseInt(amount) <= data.balance) {
            dispatch(formFilled({
                amount: parseInt(amount),
                note,
                phone_receiver: userTransfer.phone
            }))
            navigation.navigate("Confirm")
        } else {
            ToastAndroid.show('Invalid Amount', ToastAndroid.SHORT)
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
								<Text style={{color: style.white, fontWeight: 'bold', fontSize: 20, marginLeft: 20}}>Transfer</Text>
                            </TouchableOpacity>
                            <View style={styles.label}>
                                <Image style={{borderRadius: 10, width:52, height:52, marginRight: 15}} source={{uri: imageURI + userTransfer.photo}} />
								<View>
									<Text style={{marginBottom: 10, fontSize: 16, color: style.dark, fontWeight: 'bold'}}>{userTransfer.name}</Text>
									<Text style={{color: style.darkMed, fontSize: 14}}>+62 {splitPhone(userTransfer.phone)}</Text>
								</View>
                            </View>
                        </View>
                        <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{alignItems: 'center'}}>
                                <TextInput 
                                    keyboardType="numeric"
                                    placeholder="0.00"
                                    placeholderTextColor="#B5BDCC"
                                    value={amount}
                                    onChangeText={text => setAmount(text)}
                                    style={{fontSize: 42, textAlign: 'center', color: style.primary, fontWeight: '800', marginBottom: 25}}
                                    returnKeyType="next"
                                    onSubmitEditing={() => noteInput.current.focus()}
                                />
                                <Text style={{color: '#7C7895', fontSize: 16, fontWeight: 'bold', marginBottom: 40}}>Rp{data.balance} Available</Text>
                                <View style={{position: 'relative', width: Dimensions.get('screen').width - 32}}>
                                    <View style={{position: 'absolute', left: 0, top: 10}}>
                                        {noteActive ? <EditActive width={24} height={24} /> : <Edit width={24} height={24} />}
                                    </View>
                                    <NoteInput
                                        inputref={noteInput}
                                        setActive={setNoteActive}
                                        value={note}
                                        onChangeText={text => setNote(text)}
                                        placeholder="Add some notes"
                                        placeholderTextColor="rgba(169, 169, 169, 0.8)"
                                        returnKeyType="send"
                                    />
                                </View>
                            </View>
                            <RectButton onPress={onSubmit} style={amount ? styles.buttonPrimary : styles.buttonGrey}>
                                <Text style={amount ? {color: style.white, fontSize: 18} : {color: style.darkGrey, fontSize: 18}}>Continue</Text>
                            </RectButton>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
       </>
    )
}

export default Input

const styles = StyleSheet.create({
    top: {
		backgroundColor: style.primary,
		borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
		paddingTop: StatusBar.currentHeight * 1.8,
		paddingBottom: StatusBar.currentHeight,
		paddingHorizontal: 16,
		marginBottom: 30,
		alignItems: 'center'
	},
	label: {
        backgroundColor: style.white,
        borderRadius: 10,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 20
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
