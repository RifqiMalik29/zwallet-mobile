import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Image, } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import style from '../../helper'
import Back from '../../assets/icons/arrow-left-white.svg'
import { imageURI } from '../../utils'
import moment from 'moment'

const Confirm = ({ navigation }) => {
    const { userTransfer } = useSelector(state => state.search)
    const { data } = useSelector(state => state.user)
    const { dataTransfer } = useSelector(state => state.transfer)

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
                        <View style={{justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16}}>
                            <View style={{alignItems: 'center'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={[styles.card, { marginRight: 10 }]}>
                                        <Text style={styles.title}>Amount</Text>
                                        <Text style={styles.value}>{dataTransfer.amount}</Text>
                                    </View>
                                    <View style={[styles.card, { marginLeft: 10 }]}>
                                        <Text style={styles.title}>Balance Left</Text>
                                        <Text style={styles.value}>{data.balance - dataTransfer.amount}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={[styles.card, { marginRight: 10 }]}>
                                        <Text style={styles.title}>Date</Text>
                                        <Text style={styles.value}>{moment().format('LL')}</Text>
                                    </View>
                                    <View style={[styles.card, { marginLeft: 10 }]}>
                                        <Text style={styles.title}>Time</Text>
                                        <Text style={styles.value}>{moment().format('LT')}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={styles.card}>
                                        <Text style={styles.title}>Notes</Text>
                                        <Text style={styles.value}>{dataTransfer.note}</Text>
                                    </View>
                                </View>
                            </View>
                            <RectButton onPress={() => navigation.navigate("CheckPin")} style={styles.buttonPrimary}>
                                <Text style={{color: style.white, fontSize: 18}}>Confirm</Text>
                            </RectButton>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
       </>
    )
}

export default Confirm

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
        fontSize: 18,
        fontWeight: 'bold'
    }, 
    buttonPrimary: {
        alignItems: 'center',
        backgroundColor: style.primary,
        width: '100%',
        padding: 16,
        borderRadius: 12,
        elevation: 3,
        marginBottom: 15,
        marginTop: 40
    },
    buttonGrey: {
        backgroundColor: '#DADADA',
        alignItems: 'center',
        width: '100%',
        padding: 16,
        borderRadius: 12,
        elevation: 3,
        marginBottom: 15,
        marginTop: 40
    },
})
