import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './app/redux/store'
//import Login from './app/screens/Login';
//import Register from './app/screens/Register';
import Intro from './app/screens/Intro';
import Main from './app/screens/Main';
import { useEffect } from 'react';
// import Logs from './app/screens/Logs';
// import LogTag from './app/components/logTag';
// import Home from './app/screens/Home';
// import LogoutBtn from './app/components/LogoutBtn';
//import DeviceTag from './app/components/DeviceTag';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loginSuccess, setLoginSuccess] = useState(false)

  useEffect(() => {
    const value = AsyncStorage.getItem('user')
    value.then(res => {
      if (JSON.parse(res)?.token) setLoginSuccess(true)
    })
  }, [])

  console.log(loginSuccess)
  return (
    <SafeAreaProvider>
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {!loginSuccess && <Stack.Screen name="Intro" component={Intro} options={{headerShown:false}}/>}
          <Stack.Screen name="Main" component={Main} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
  // return (
    // <SafeAreaProvider>
    // <View style={styles.container}>
    //   <Home/>
    // </View>
    // </SafeAreaProvider>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'purple',
    //alignItems: 'center',
    // justifyContent: 'center',
  },
});
