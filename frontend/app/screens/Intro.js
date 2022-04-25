//import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register';
import Main from './Main';

const Stack = createNativeStackNavigator();

export default function Intro() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
      <Stack.Screen name='Main' component={Main} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}
