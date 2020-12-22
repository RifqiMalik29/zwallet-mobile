import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Image, Dimensions } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import style from '../../helper'
import { imageURI } from '../../utils'
import Back from '../../assets/icons/arrow-left-white.svg'
import Income from '../../assets/icons/arrow-down.svg'
import Expense from '../../assets/icons/arrow-up.svg'

const Transaction = ({ navigation }) => {
    const { data } = useSelector(state => state.user)
    const { dataAll } = useSelector(state => state.history)

    const handleGraph = (stats) => {
        let income = 0;
        let expense = 0;
        dataAll.forEach(item => {
            if(item.receiver === data.name || item.name) {
                income += item.amount
            } else {
                expense += item.amount
            }
        })

        if(stats === 'income') {
            return income
        } else {
            return expense
        }
    }

    const dataChart = {
        labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
            label: '',
            data: [223, 97, 149, 183, 138, 197, 155]
        }]
    }

    const options = {
        legend: {
            display: false,
        },
        responsive: true,
        scales: {
        xAxes: [
            {
            maxBarThickness: 20,
            gridLines: {
                lineWidth: 0,
                display: false,
            },
            },
        ],
        yAxes: [
            {
            ticks: {
                display: false,
                min: 0
            },
            gridLines: {
                lineWidth: 0,
                display: false,
            },
            },
        ],
    },
}
    
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
                            <TouchableOpacity style={{flexDirection: 'row', marginBottom: 30, alignSelf: 'flex-start'}} onPress={() => navigation.goBack()}>
                                <Back width={28} height={28} />
								<Text style={{color: style.white, fontWeight: 'bold', fontSize: 20, marginLeft: 20}}>Transaction</Text>
                            </TouchableOpacity>
                            <View style={styles.label}>
                                <View style={{flexDirection: 'row'}}>
                                    <Income  />
                                    <View style={styles.amount}>
                                        <Text style={styles.stats}>Income</Text>
                                        <Text style={styles.total}>Rp{handleGraph('income')}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', marginRight: 36}}>
                                    <Expense  />
                                    <View style={styles.amount}>
                                        <Text style={styles.stats}>Expense</Text>
                                        <Text style={styles.total}>Rp{handleGraph('expense')}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{paddingHorizontal: 16}}>
                            <Text style={{color: style.title, fontSize: 18, fontWeight: 'bold'}}>In This Week</Text>
                            <BarChart 
                                
                                data={{
                                    labels: ["January", "February", "March", "April", "May", "June"],
                                    datasets: [
                                    {
                                        data: [20, 45, 28, 80, 99, 43]
                                    }
                                    ]
                                }}
                                width={Dimensions.get("window").width - 32}
                                height={220}
                                yAxisLabel="$"
                                chartConfig={{
                                    backgroundColor: style.white,
                                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                                    strokeWidth: 2, // optional, default 3
                                    barPercentage: 0.5,
                                    useShadowColorFromDataset: false // optional
                                }}
                                withHorizontalLabels={false}
                                
                            />
                        </View>
                        <View style={styles.bottom}>
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

export default Transaction

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
    },
    label: {
        backgroundColor: style.primary,
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 20,
        justifyContent: 'space-between'
    },
    panelLabel: {
        justifyContent: 'center'
    },
    amount: {
        marginLeft: 10,
        justifyContent: 'space-around',
        height: 50
    },
    stats: {
        color: '#D0D0D0',
        fontSize: 16
    },
    total: {
        color: '#F1F1F1',
        fontSize: 18,
        fontWeight: 'bold'
    }
})
