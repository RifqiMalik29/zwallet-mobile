import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Image, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { topup } from '../../redux/action/topup'
import style from '../../helper'
import Back from '../../assets/icons/arrow-left-white.svg'
import { FlatList } from 'react-native-gesture-handler'

const Topup = ({ navigation }) => {
	const dispatch = useDispatch()
	const dataUser = useSelector(state => state.user.data)
	const { data } = useSelector(state => state.topup)
	const { token } = useSelector(state => state.auth)

	useEffect(() => {
		dispatch(topup(token))
	}, [])

	const renderItem = ({ item, index }) => {
		return (
			<View style={styles.card}>
				<Text style={{color: style.primary, marginRight: 25, fontWeight: 'bold'}}>{index+1}</Text>
				<Text style={{color: '#7A7886', fontSize: 16, flexWrap: 'wrap', lineHeight: 27}}>{item.title}</Text>
			</View>
		)
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
								<Text style={{color: style.white, fontWeight: 'bold', fontSize: 20, marginLeft: 20}}>Top up</Text>
                            </TouchableOpacity>
                            <View style={styles.label}>
                                <TouchableOpacity>
                                <Image style={{borderRadius: 10, width:52, height:52, marginRight: 15}} source={require('../../assets/images/logo-topup.png')} />
                                </TouchableOpacity>
								<View>
									<Text style={{marginBottom: 10}}>Virtual Account Number</Text>
									<Text style={{color: style.dark, fontWeight: 'bold', fontSize: 16}}>2389 0{dataUser.phone}</Text>
								</View>
                            </View>
                        </View>
						<View style={{marginBottom: 25, paddingHorizontal: 16}}>
							<Text style={{fontWeight: 'bold', color: style.dark, fontSize: 18}}>How to Top-Up</Text>
						</View>
						<SafeAreaView style={{backgroundColor: style.background, alignItems: 'center', paddingHorizontal: 16}}>
							<FlatList 
								data={data}
								renderItem={renderItem}
								keyExtractor={({item, index}) => index}
							/>
						</SafeAreaView>
                    </ScrollView>
                </View>
            </SafeAreaView>
       </>
    )
}

export default Topup

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
		flexDirection: 'row',
		width: Dimensions.get('screen').width - 32,
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 30,
		marginBottom: 20,
		elevation: 3
	}
})
