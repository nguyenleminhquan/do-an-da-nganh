import React from 'react';
import { StyleSheet, Text, View,StatusBar, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LogoutBtn from '../components/LogoutBtn';
import colors from '../misc/colors';
import SensorsTag from '../components/SensorsTag';
import { logOut } from '../redux/authenRedux/authenAction';

const Sensor = (props) => {
  const dispatch = useDispatch()
  const sensors = useSelector(state => state.device.sensors)

  const handleLogout = () => {
    // Alert.alert(
    //   'Do you want to logout?',
    //   'This will return to login screen.', [
    //     {
    //       text: 'Logout',
    //       onPress: () => {
    //         console.warn('Do not show Pressed!')
    //         dispatch(logOut())
    //         props.navigation.navigate('Login')
    //       }
    //     },
    //     {
    //       text: 'Cancel'
    //     },
    //   ],
    //   {
    //     cancelable: true
    //   })

    // Test on web
    props.navigation.navigate('Login')
    dispatch(logOut())
  }

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Sensors</Text>
          <LogoutBtn onPress={handleLogout} />
        </View>
        <ScrollView contentContainerStyle={styles.sensorLists} >
          {sensors.map((sensor, index) => (
            <View style={styles.sensorItem} key={index}>
              <SensorsTag name={sensor.name} />
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

export default Sensor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLANK
  },
  header: {
    paddingTop: 10,
    height: 50,
    width: '100%',
    backgroundColor: colors.MAIN,
    flexDirection: 'row',
    paddingBottom: 2,
    paddingLeft: 5
  },
  headerText: {
    color: colors.BRIGHTTEXT,
    fontSize: 24,
    fontWeight: 'bold',
    width: '92%'
  },
  sensorLists: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  sensorItem: {
    margin: 12,
  }
});