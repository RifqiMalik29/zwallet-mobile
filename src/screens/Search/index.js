import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Image, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { search, searchByName, getUserTransfer } from '../../redux/action/search'
import style from '../../helper'
import { imageURI } from '../../utils'
import Back from '../../assets/icons/arrow-left-white.svg'
import LogoSearch from '../../assets/icons/search.svg'
import { FlatList } from 'react-native-gesture-handler'
import { RectButton } from 'react-native-gesture-handler'

const Search = ({ navigation }) => {
	const [query, setQuery] = useState('')
	const dispatch = useDispatch()
	const { data } = useSelector(state => state.search)
	const { token } = useSelector(state => state.auth)

	useEffect(() => {
		dispatch(search(token))
	}, [])

	const renderItem = ({ item, index }) => {
		if(item.phone) {
			return (
				<RectButton onPress={() => {dispatch(getUserTransfer(token, item.phone)); navigation.navigate("Input")}} style={styles.card}>
					<Image style={{borderRadius: 10, width: 52, height: 52, marginRight: 20}} source={{ uri: imageURI + item.photo}} />
					<View style={{justifyContent: 'space-between'}}>
						<Text style={{color: style.dark, fontWeight: 'bold', marginBottom: 10}}>{item.name}</Text>
						<Text>{item.phone}</Text>
					</View>
				</RectButton>
			)
		}
	}

    return (
        <>
            <StatusBar backgroundColor={style.primary} />
            <SafeAreaView>
                <View>
                    <ScrollView style={{height: '100%', backgroundColor: style.background}}>
                        <View style={styles.top}>
                            <TouchableOpacity style={{flexDirection: 'row', marginBottom: 40, alignSelf: 'flex-start'}} onPress={() => navigation.goBack()}>
                                <Back width={28} height={28} />
								<Text style={{color: style.white, fontWeight: 'bold', fontSize: 20, marginLeft: 20}}>Find Receiver</Text>
                            </TouchableOpacity>
							<View style={{width: '100%', position: 'relative'}}>
								<View style={{position: 'absolute', zIndex: 3, top: 15, left: 15}}>
									<LogoSearch width={24} height={24} />
								</View>
								<TextInput 
									style={styles.input}
									placeholder="Search receiver here"
									placeholderTextColor="rgba(58, 61, 66, 0.4)"
									value={query}
									onChangeText={(text) => {setQuery(text);dispatch(searchByName(token, text))}}
									returnKeyType="search"
									onSubmitEditing={() => dispatch(searchByName(token, query))}
								/>
							</View>
                        </View>
						<View style={{marginBottom: 25, paddingHorizontal: 16}}>
							<Text style={{fontWeight: 'bold', color: style.dark, fontSize: 18}}>Contacts</Text>
							<Text style={{color: '#8F8F8F', marginTop: 10}}>{data.filter(item => item.phone).length} Contacts Found</Text>
						</View>
						<SafeAreaView style={{ backgroundColor: style.background}}>
							<FlatList 
								data={data}
								renderItem={renderItem}
							/>
						</SafeAreaView>
                    </ScrollView>
                </View>
            </SafeAreaView>
       </>
    )
}

export default Search

const styles = StyleSheet.create({
    top: {
		backgroundColor: style.primary,
		borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
		paddingTop: StatusBar.currentHeight * 1.8,
		paddingBottom: StatusBar.currentHeight,
		paddingHorizontal: 16,
		marginBottom: 40,
		alignItems: 'center'
	},
	input: {
		width: '100%',
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 50,
		paddingVertical: 15,
		borderRadius: 12
	},
	card: {
		backgroundColor: '#FFFFFF',
		width: '100%',
		elevation: 5,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		marginBottom: 20
	}
})
