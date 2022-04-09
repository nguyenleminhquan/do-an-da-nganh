import { StatusBar } from 'expo-status-bar';
//import Login from './app/screens/Login';
//import Register from './app/screens/Register';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Intro from './app/screens/Intro';
import Main from './app/screens/Main';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Logs from './app/screens/Logs';
import LogTag from './app/components/logTag';
import Home from './app/screens/Home';
// import LogoutBtn from './app/components/LogoutBtn';
//import DeviceTag from './app/components/DeviceTag';

//const Stack = createNativeStackNavigator();

export default function App() {
  // return (
  //   <SafeAreaProvider>
  //     <NavigationContainer>
  //       <Stack.Navigator>
  //         <Stack.Screen name="Intro" component={Intro} options={{headerShown:false}}/>
  //         <Stack.Screen name="Main" component={Main} options={{headerShown:false}}/>
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   </SafeAreaProvider>
  // );
  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <Home/>
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'purple',
    //alignItems: 'center',
    // justifyContent: 'center',
  },
});
