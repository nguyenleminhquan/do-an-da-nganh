import AsyncStorage from "@react-native-async-storage/async-storage"
import { Provider } from 'react-redux';
import store from './app/redux/store';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Link, Routes } from "react-router-native";
import LogScreen from './app/screens/LogScreen';
import Login from './app/screens/Login';
import MessageScreen from './app/screens/MessageScreen';
import HomeScreen from './app/screens/HomeScreen';
import DeviceDetail from "./app/screens/DeviceDetail";

export default function App() {
  // const activeRoom = useSelector(state => state.room.activeRoom)

  return (
    <NativeRouter>
      <Provider store={store}>
          {/* <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path='/notiScreen' element={<MessageScreen />} />
            <Route path="/logScreen" element={<LogScreen />} />
            <Route path='/deviceDetail' element={<DeviceDetail id='0' />} />
          </Routes> */}
          <DeviceDetail id='0' />
     
      </Provider>
    </NativeRouter>
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
