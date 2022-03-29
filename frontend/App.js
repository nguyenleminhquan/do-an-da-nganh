//import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import LogScreen from './app/screens/LogScreen';
import Login from './app/screens/Login';
import MessageScreen from './app/screens/MessageScreen';
import HomeScreen from './app/screens/HomeScreen';
import DevicesTag from './app/components/DevicesTag';

export default function App() {
  return (
  <Provider store={store}>
    <View style={styles.temp}>
      <HomeScreen />
    </View>
  </Provider>
  );
}

const styles = StyleSheet.create({
  temp: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
//   container:{
//     width: 145,
//     height: 180,
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     alignItems:'center',
//     justifyContent:'center'
// },
//   logo:{
//     flexDirection:'row',
//     marginBottom: 20
//   },
//   activeText:{
//     fontSize: 26,
//     color: '#311A2E',
//     marginBottom: 20
//   },
//   detailBtn:{
//     width: 116,
//     height: 42,
//     backgroundColor: '#FFB600',
//     borderRadius: 22,
//     alignItems:'center',
//     justifyContent:'center'
//   },
//   detailText:{
//     fontSize: 18,
//     fontWeight: 'bold'
//   },
//   deviceName:{
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 5,
//     color: '#311A2E'
//   }
});