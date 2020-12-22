import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { getHistoryToday, getHistoryByWeek } from '../../redux/action/history'
import style from '../../helper'
import Back from '../../assets/icons/arrow-left-white.svg'
import { imageURI } from '../../utils'
import Income from '../../assets/icons/arrow-down.svg'
import Expense from '../../assets/icons/arrow-up.svg'

const Notification = ({ navigation }) => {
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.user)
    const { token } = useSelector(state => state.auth)
    const { dataToday, dataWeek } = useSelector(state => state.history)

    useEffect(() => {
        dispatch(getHistoryToday(token))
        dispatch(getHistoryByWeek(token))
    }, [])

    const renderItems = ({ item, index}) => {
        if(!item.name) {
            return (
                <View key={index} style={styles.card}>
                    <View style={{flexDirection: 'row'}}>
                        {item.receiver === data.name ? <Income /> : <Expense />}
                        <View style={{justifyContent: 'space-between'}}>
                            <Text>{item.receiver === data.name ? `Transfered from ${item.sender}` : `Transfered to ${item.receiver}`}</Text>
                            <Text>{item.amount}</Text>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View key={index} style={styles.card}>
                    <View style={{flexDirection: 'row'}}>
                    <Income />
                        <View style={{justifyContent: 'space-between'}}>
                            <Text>Top up from Bank</Text>
                            <Text>{item.amount}</Text>
                        </View>
                    </View>
                </View>
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
                            <TouchableOpacity style={{flexDirection: 'row', marginBottom: 30, alignSelf: 'flex-start'}} onPress={() => navigation.goBack()}>
                                <Back width={28} height={28} />
								<Text style={{color: style.white, fontWeight: 'bold', fontSize: 20, marginLeft: 20}}>Notification</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{paddingHorizontal: 16}}>
                            <Text>Today</Text>
                            <FlatList 
                                data={dataToday}
                                renderItem={renderItems}
                            />
                        </View>
                        <View style={{paddingHorizontal: 16}}>
                            <Text>This Week</Text>
                            <FlatList 
                                data={dataWeek}
                                renderItem={renderItems}
                            />
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
       </>
    )
}

export default Notification

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
        elevation: 4,
        flex: 1,
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        alignItems: 'center'
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
    button: {
        backgroundColor: style.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        padding: 15,
        borderRadius: 12,
        elevation: 4
    },
    buttonActive: {
        backgroundColor: style.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        padding: 15,
        borderRadius: 12,
        elevation: 4
    }
})
