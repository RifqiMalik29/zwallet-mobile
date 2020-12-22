import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './redux/action/user'
import { deviceToken } from './redux/action/login'
import Login from './screens/Login'
import Register from './screens/Register'
import Forgot from './screens/Forgot'
import SplashScreen from 'react-native-splash-screen'
import Home from './screens/Home'
import Profile from './screens/Profile'
import Search from './screens/Search'
import Topup from './screens/Topup'
import Input from './screens/Input'
import Confirm from './screens/Confirm'
import CheckPin from './screens/CheckPin'
import Status from './screens/Status'
import Info from './screens/Info'
import Phone from './screens/Phone'
import Password from './screens/Password'
import ChangePin from './screens/Pin'
import History from './screens/History'
import Transaction from './screens/Transaction'
import Notification from './screens/Notification'
import ResgisterPin from './screens/RegisterPin'
import RegisterSuccess from './screens/RegisterSuccess'
import ResetPassword from './screens/ResetPassword'
import messaging from '@react-native-firebase/messaging'

const Stack = createStackNavigator()

const MainNavigator = () => {
    const dispatch = useDispatch()
    const { token, isLogin, isUser } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(true);
    const [initialRoute, setInitialRoute] = useState('Home');

    useEffect(() => {
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
              'Notification caused app to open from background state:',
              remoteMessage.notification,
            );
            navigation.navigate(remoteMessage.data.type);
          });

        messaging()
        .getInitialNotification()
        .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(initialRoute)
        }
        setLoading(false);
      });

      messaging().getToken().then((token) => {
          console.log(token)
          if(!isLogin) {
            dispatch(deviceToken(token))
          }
      })
    }, [])

    useEffect(() => {
        if(token) {
            dispatch(getUser(token))       
        }
        
        SplashScreen.hide()
    }, [token])

    if(loading) {
        return null;
    }

    return (
        <NavigationContainer>
            {isLogin && token && isUser ? (
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
                    <Stack.Screen name="History" component={History} options={{headerShown: false}} />
                    <Stack.Screen name="Transaction" component={Transaction} options={{headerShown: false}} />
                    <Stack.Screen name="Notification" component={Notification} options={{headerShown: false}} />
                    <Stack.Screen name="Search" component={Search} options={{headerShown: false}} />
                    <Stack.Screen name="Input" component={Input} options={{headerShown: false}} />
                    <Stack.Screen name="Confirm" component={Confirm} options={{headerShown: false}} />
                    <Stack.Screen name="CheckPin" component={CheckPin} options={{headerShown: false}} />
                    <Stack.Screen name="Status" component={Status} options={{headerShown: false}} />
                    <Stack.Screen name="Topup" component={Topup} options={{headerShown: false}} />
                    <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
                    <Stack.Screen name="Info" component={Info} options={{headerShown: false}} />
                    <Stack.Screen name="Phone" component={Phone} options={{headerShown: false}} />
                    <Stack.Screen name="Password" component={Password} options={{headerShown: false}} />
                    <Stack.Screen name="Pin" component={ChangePin} options={{headerShown: false}} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                    <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
                    <Stack.Screen name="RegisterPin" component={ResgisterPin} options={{headerShown: false}} />
                    <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} options={{headerShown: false}} />
                    <Stack.Screen name="Forgot" component={Forgot} options={{headerShown: false}} />
                    <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown: false}} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}

export default MainNavigator
