import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import style from '../../helper'
import Back from '../../assets/icons/arrow-left-white.svg'

const Info = ({ navigation }) => {
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

    return (
        <>
            <StatusBar backgroundColor={style.primary} barStyle="light-content" />
            <SafeAreaView>
                <View>
                    <ScrollView style={{height: '100%', backgroundColor: style.background}}>
                        <View style={styles.top}>
                            <TouchableOpacity style={{flexDirection: 'row', marginBottom: 30, alignSelf: 'flex-start'}} onPress={() => navigation.goBack()}>
                                <Back width={28} height={28} />
								<Text style={{color: style.white, fontWeight: 'bold', fontSize: 20, marginLeft: 20}}>Personal Information</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', paddingHorizontal: 16, marginBottom: 30}}>
                            <Text style={{textAlign: 'center', color: style.darkMed, fontSize: 16, lineHeight: 27, marginBottom: 40}}>We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</Text>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.card}>
                                    <Text style={styles.title}>First Name</Text>
                                    <Text style={styles.value}>{data.firstName}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.card}>
                                    <Text style={styles.title}>Last Name</Text>
                                    <Text style={styles.value}>{data.lastName}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.card}>
                                    <Text style={styles.title}>Verified E-mail</Text>
                                    <Text style={styles.value}>{data.email}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={[styles.card, {justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}]}>
                                    <View>
                                        <Text style={styles.title}>Phone Number</Text>
                                        {data.phone ? (
                                            <Text style={styles.value}>+62 {splitPhone(data.phone)}</Text>
                                        ) : (
                                            <TouchableOpacity onPress={() => navigation.navigate("Phone")}>
                                                <Text style={{color: style.primary, fontSize: 22, fontWeight: 'bold'}}>Add phone number</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    {data.phone ? (
                                        <TouchableOpacity onPress={() => navigation.navigate("Phone")}>
                                            <Text style={{color: style.primary}}>Manage</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <Text></Text>
                                    )}
                                </View>
                            </View>
                        </View>       
                    </ScrollView>
                </View>
            </SafeAreaView>
       </>
    )
}

export default Info

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
