import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import colors from '../misc/colors';
import Home from './Home';
import Logs from './Logs';
import TimerScreen from './TimerScreen';
import Messages from './Sensor';
import { adjustFanLevel, toggleDoor, toggleLed } from '../redux/deviceRedux/deviceAction';
import { getUserHistory } from '../redux/authenRedux/authenAction';
import Sensor from './Sensor';

const Tab = createBottomTabNavigator();

function Main({navigation}) {
  // let curTime = new Date()
  const dispatch = useDispatch()
  const [token, setToken] = useState('')
  const [timers, setTimers] = useState([])

  const [curTime, setCurTime] = useState(new Date())

  const findTimers = async () => {
    const result = await AsyncStorage.getItem('timers');
    if (result) setTimers(JSON.parse(result));
  }

  const handleAutoControlDevice = async (timer, timers, callback) => {
    try {
      let deviceStatus
      const value = await AsyncStorage.getItem(timer.deviceName)
      if (value) deviceStatus = JSON.parse(value)

      if (timer.deviceName === 'Light' && deviceStatus === '0') {
        dispatch(toggleLed({value: '1'}, token))
      } else if (timer.deviceName === 'Door' && deviceStatus === '90') {
        console.log('Turned on this door')
        dispatch(toggleDoor({value: '0'}, token)) 
      } else if (timer.deviceName === 'Fan' && deviceStatus === '0') {
        dispatch(adjustFanLevel({value: '100'}, token))
      }
      dispatch(getUserHistory(token))
  
      // After that time which had been set before => Turn off devices
      const remainTime = new Date(timer.timeOff) - new Date(timer.timeOn)
      const timeout = setTimeout(async () => {
        console.log('Prepare for turning off device')
        if (timer) {
          if (timer.deviceName === 'Light') {
            dispatch(toggleLed({value: '0'}, token))
          } else if (timer.deviceName === 'Door') {
            dispatch(toggleDoor({value: '90'}, token))
          } else if (timer.deviceName === 'Fan') {
            dispatch(adjustFanLevel({value: '0'}, token))
          } 
          
          dispatch(getUserHistory(token))

          const newTimers = timers.filter(n=>n.id !== timer.id);
          console.log(`new timers:`,newTimers)
          await AsyncStorage.setItem('timers', JSON.stringify(newTimers))
          
          callback(newTimers)
        }
      }, 20000)
      // clearTimeout(timeout)
    } catch(err) {
      console.log(err)
    }
  }

  const handleClearTimer = async (timer, timers) => {
    // const removeIdx = timers.findIndex(timer => timer.timeOff === targetTimer.timeOff)
    // setTimers(timers.splice(removeIdx))
    const newTimers = timers.filter(n=>n.id !== timer.id);
    console.log(`new timers:`,newTimers)
    try {
      await AsyncStorage.setItem('timers', JSON.stringify(newTimers));
    } catch(err) {
      console.log(err)
    }
    return newTimers
  }

  useEffect(() => {
    const firstLoad = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken')
        if (userToken) setToken(userToken)
      } catch(err) {
        console.log(err)
      }
    }
    firstLoad()
    findTimers()
  }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCurTime(new Date())
  //   }, 1000)
  // }, [curTime])

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.MAIN,
        tabBarInactiveTintColor: 'white',
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: colors.MAIN
      }}
    >
      <Tab.Screen 
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="ios-home" size={24} color={color} />
        }}
      />
      <Tab.Screen name="Sensors" component={Sensor}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="motion-sensor" size={24} color={color} />
        }} />
      <Tab.Screen
        name='Timer'
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="timer" size={24} color={color} />
        }}>
        {() => <TimerScreen 
                  onScheduleTimer={handleAutoControlDevice} 
                  onClearTimer={handleClearTimer} 
                  navigation={navigation}
              />}
      </Tab.Screen>
      <Tab.Screen name="Logs" component={Logs}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="history" size={24} color={color} />
        }}
      />
    </Tab.Navigator>

  );
}

export default Main;
