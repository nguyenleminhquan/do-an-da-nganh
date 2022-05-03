import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Main from './app/screens/Main'
import store from './app/redux/store'
import Register from './app/screens/Register';
import Login from './app/screens/Login';
import RootScreen from './app/screens/RootScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState('')

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
  }, [])

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          {token !== '' ? (
            <Stack.Navigator>
                <Stack.Screen name='Main' component={Main} options={{headerShown: false}} />
                <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
                <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>  
            </Stack.Navigator>
          ) : (
            <RootScreen />
          )}
        </NavigationContainer>
      </Provider>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
