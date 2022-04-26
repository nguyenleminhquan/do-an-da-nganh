import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import colors from '../misc/colors';
import Home from './Home';
import Logs from './Logs';
import Messages from './Messages';
import TimerScreen from './TimerScreen';
import { adjustFanLevel, toggleDoor, toggleLed } from '../redux/deviceRedux/deviceAction';

const Tab = createBottomTabNavigator();

function Main() {
  const dispatch = useDispatch()
  const [timers, setTimers] = useState([])

  const findTimers = async () => {
    const result = await AsyncStorage.getItem('timers');
    if (result) setTimers(JSON.parse(result));
  }

  const handleAutoControlDevice = async (timer, timers, callback) => {
    const value = await AsyncStorage.getItem(timer.deviceName)
    const deviceStatus = JSON.parse(value)

    // Dispatch an action turn on for devices
    if (timer.deviceName === 'Light' && deviceStatus === '0') {
      dispatch(toggleLed({value: '1'}))
    } else if (timer.deviceName === 'Door' && deviceStatus === '90') {
      console.log('Turned on this door')
      dispatch(toggleDoor({value: '0'})) 
    } else if (timer.deviceName === 'Fan' && deviceStatus === '0') {
      dispatch(adjustFanLevel({value: '100'}))
    }

    // After that time which had been set before => Turn off devices
    const remainTime = new Date(timer.timeOff) - new Date(timer.timeOn)
    setTimeout(() => {
      console.log('Prepare for turning off device')
      if (timer.deviceName === 'Light') {
        dispatch(toggleLed({value: '0'}))
      } else if (timer.deviceName === 'Door') {
        dispatch(toggleDoor({value: '90'}))
      } else if (timer.deviceName === 'Fan') {
        dispatch(adjustFanLevel({value: '0'}))
      } 
      // handleClearTimer()
    }, remainTime)
    // Clear setTimeout()?
  }

  const handleClearTimer = () => {
    const removeIdx = timers.findIndex(timer => timer.timeOff === targetTimer.timeOff)
    setTimers(timers.splice(removeIdx))
  }
  useEffect(() => {
    findTimers()
  }, [])

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
      <Tab.Screen name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="ios-home" size={24} color={color} />
        }}
      />
      {/* <Tab.Screen name="TimerScreen" component={TimerScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="timer" size={24} color={color} />
        }}
      /> */}
      <Tab.Screen
        name='TimerScreen'
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="timer" size={24} color={color} />
        }}>
        {() => <TimerScreen onScheduleTimer={handleAutoControlDevice} onClearTimer={handleClearTimer}/>}
      </Tab.Screen>
      <Tab.Screen name="Messages" component={Messages}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="notifications-sharp" size={24} color={color} />
        }} />
      <Tab.Screen name="Logs" component={Logs}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="history" size={24} color={color} />
        }}
      />
    </Tab.Navigator>

  );
}

export default Main;
