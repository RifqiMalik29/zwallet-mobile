import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { getHistory } from '../../redux/action/history'
import style from '../../helper'
import { imageURI } from '../../utils'
import Bell from '../../assets/icons/bell-white.svg'
import Transfer from '../../assets/icons/balance/arrow-up.svg'
import Topup from '../../assets/icons/balance/plus.svg'
import { RectButton } from 'react-native-gesture-handler'

const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const { data } = useSelector(state => state.user)
    const { dataAll } = useSelector(state => state.history)

    useEffect(() => {
        dispatch(getHistory(token))
    }, [])
    
    const renderItem = ({ item, index }) => {
        if(index < 4 && !item.name) {
            return (
                <View key={index} style={styles.card}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Image style={{borderRadius: 10, width:52, height:52, marginRight: 20}} source={{uri: imageURI + item.photo}} />
                        <View style={{justifyContent: 'space-between'}}>
                            <Text>{item.receiver === data.name ? item.sender : item.receiver}</Text>
                            <Text>Transfer</Text>
                        </View>
                    </View>
                    <Text style={item.receiver === data.name ? {color: 'green'} : {color: 'red'}}>{item.receiver === data.name ? '+' : '-'}{item.amount}</Text>
                </View>
            )
        } else if(index < 4 && item.name){
            return (
                <View key={index} style={styles.card}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Image style={{borderRadius: 10, width:52, height:52, marginRight: 20}} source={require('../../assets/images/logo-topup.png')} />
                        <View style={{justifyContent: 'space-between'}}>
                            <Text>Charge</Text>
                            <Text>Top Up</Text>
                        </View>
                    </View>
                    <Text style={{color: 'green'}}>+{item.amount}</Text>
                </View>
            )
        }
    }

    return (
       <>
            <StatusBar backgroundColor={style.primary} barStyle="light-content" />
            <SafeAreaView>
                <View>
                    <ScrollView style={{height: '100%', backgroundColor: style.background}}>
                        <View style={styles.top}>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                                    <Image style={{borderRadius: 10, width:52, height:52, marginRight: 20}} source={{uri: imageURI + data.photo}} />
                                </TouchableOpacity>
                                <RectButton onPress={() => navigation.navigate("Transaction")} style={{height: '100%'}}>
                                    <Text style={{color: '#D0D0D0', marginBottom: 5}}>Balance</Text>
                                    <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>Rp{data.balance}</Text>
                                </RectButton>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                                <Bell width={28} height={28} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottom}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40, paddingHorizontal: 16}}>
                                <RectButton onPress={() => navigation.navigate("Search")} style={styles.button}>
                                    <Transfer width={28} height={28} />
                                    <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: style.title}}>Transfer</Text>
                                </RectButton>
                                <RectButton onPress={() => navigation.navigate("Topup")} style={styles.button}>
                                    <Topup width={28} height={28} />
                                    <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: style.title}}>Top Up</Text>
                                </RectButton>
                            </View>
                            <View style={{flexDirection:'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 25}}>
                                <Text style={{color: style.title, fontSize: 18, fontWeight: 'bold'}}>Transaction History</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("History")}>
                                    <Text style={{color:style.primary}}>See all</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList 
                                data={dataAll}
                                keyExtractor={({item, index}) => index}
                                renderItem={renderItem}
                            />
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
       </>
    )
}

export default Home

const styles = StyleSheet.create({
    top: {
        backgroundColor: style.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingVertical: StatusBar.currentHeight * 1.8,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16
    },
    bottom: {
        paddingVertical: 30
    },
    button: {
        padding: 16,
        backgroundColor: style.grey,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 10
    },
    card: {
        backgroundColor: style.white,
        marginHorizontal: 0,
        paddingHorizontal: 16,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 3,
    }
})
