import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Image } from 'react-native'
import { RectButton, FlatList } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { getHistory, getHistoryByFilter} from '../../redux/action/history'
import style from '../../helper'
import Back from '../../assets/icons/arrow-left-white.svg'
import { imageURI } from '../../utils'
import Income from '../../assets/icons/arrow-down.svg'
import Expense from '../../assets/icons/arrow-up.svg'
import IncomeActive from '../../assets/icons/income-active.svg'
import ExpenseActive from '../../assets/icons/expense-active.svg'
import moment from 'moment'
import Animated from 'react-native-reanimated'
import BottomSheet from 'reanimated-bottom-sheet'
import DatePicker from '@react-native-community/datetimepicker'
import CalendarPicker from 'react-native-calendar-picker';
moment.locale('id')

const History = ({ navigation }) => {
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.user)
    const { token } = useSelector(state => state.auth)
    const { dataAll, dataFilter } = useSelector(state => state.history)
    const [expense, setExpense] = useState(false)
    const [income, setIncome] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [isFilter, setFilter] = useState(false)
    const [modeFilter, setModeFilter] = useState(false)
    const bs = useRef()
    const fall = new Animated.Value(1)

    useEffect(() => {
        dispatch(getHistory(token))
    }, [])

    const onDateChange = (date, type) => {
        if (type === 'END_DATE') {
          setEndDate(date)
        } else {
          setStartDate(date)
          setEndDate(null)
        }
      }

    const newDataAll = dataAll.sort((a, b) => a.date || a.createdAt - b.date || b.createdAt)

    const incomeAll = newDataAll.filter(item => item.receiver === data.name || item.name)
    const expenseAll = newDataAll.filter(item => item.receiver !== data.name && !item.name)

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    )

    const filter = () => {
        setModeFilter(true)
    }

    const renderContent = () => (
        <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.panelTitle}>Filter By Date</Text>
            </View>
            <View style={{marginBottom: 40}}>
                <CalendarPicker 
                    startFromMonday={true}
                    allowRangeSelection={true}
                    todayBackgroundColor="#6379F4"
                    selectedDayColor={style.primary}
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={onDateChange}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <Text>From</Text>
                        <Text>{moment(startDate).format('LL')}</Text>
                    </View>
                    <View>
                        <Text>To</Text>
                        <Text>{moment(endDate).format('LL')}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.panelButton} onPress={filter}>
                    <Text style={styles.panelButtonTitle}>Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.panelButton}
                    onPress={() => {bs.current.snapTo(1); setFilter(false)}}>
                    <Text style={styles.panelButtonTitle}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    const renderItems = ({ item, index}) => {
        if(!item.name) {
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
        } else {
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
            <StatusBar backgroundColor={style.primary} />
            <SafeAreaView>
                <View>
                    <ScrollView style={{height: '100%', backgroundColor: style.background}}>
                        <View style={styles.top}>
                            <TouchableOpacity style={{flexDirection: 'row', marginBottom: 30, alignSelf: 'flex-start'}} onPress={() => navigation.goBack()}>
                                <Back width={28} height={28} />
								<Text style={{color: style.white, fontWeight: 'bold', fontSize: 20, marginLeft: 20}}>History</Text>
                            </TouchableOpacity>
                        </View>
                        {modeFilter ? (
                            <Text>Filter from {moment(startDate).format('LL')} to {moment(endDate).format('LL')}</Text>
                        ) : <Text></Text>}
                        <View style={{ marginBottom: 100}}>
                        {modeFilter ? (
                            <FlatList 
                                data={dataFilter}
                                renderItem={renderItems} 
                            />) 
                        : income || expense ? income ? (
                            <FlatList 
                                data={incomeAll} 
                                renderItem={renderItems}
                            />
                        ) : (
                            <FlatList 
                                data={expenseAll}
                                renderItem={renderItems} 
                            />
                        )
                        : <FlatList 
                            data={newDataAll}
                            renderItem={renderItems}                             
                        /> }
                        </View>
                    </ScrollView>
                    <View style={{zIndex: isFilter ? -1 : 0,flexDirection: 'row', paddingHorizontal: 16, marginTop: 30, marginBottom: 30, justifyContent: 'center', position: 'absolute', bottom: 20}}>
                        <RectButton onPress={() => {setIncome(!income); setExpense(false)}} style={income ? styles.buttonActive : styles.button}>
                            {income ? <IncomeActive width={28} height={28} /> : <Income width={28} height={28} />}
                        </RectButton>
                        <RectButton onPress={() => {setExpense(!expense); setIncome(false)}} style={expense ? styles.buttonActive : styles.button}>
                            {expense ? <ExpenseActive width={28} height={28} /> : <Expense width={28} height={28} />}
                        </RectButton>
                        <RectButton onPress={() => { setFilter(true); bs.current.snapTo(0)}} style={[styles.button, { paddingHorizontal: 40}]}>
                            <Text style={{fontSize: 18, color: style.primary, fontWeight: 'bold'}}>Filter By Date</Text>
                        </RectButton>
                    </View>
                    {modeFilter ? (
                        <RectButton onPress={() => setModeFilter(false)} style={styles.buttonActive}>
                            <Text style={{fontSize: 16, color: style.white}}>Cancel Mode Filter</Text>
                        </RectButton>
                    ) : <Text></Text>}
                </View>
            </SafeAreaView>
            <BottomSheet 
                ref={bs}
                snapPoints={[580, 0]}
                enabledGestureInteraction={false}
                initialSnap={1}
                callbackNode={fall}
                renderHeader={renderHeader}
                renderContent={renderContent}
            />
       </>
    )
}

export default History

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
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 3
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        zIndex: 3
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: style.primary,
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
})
