import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { FlatList, Picker, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LogoutBtn from '../components/LogoutBtn';
import LogTag from '../components/LogTag';
import colors from '../misc/colors';
import { getHistory } from '../redux/deviceRedux/deviceAction';


// const data = ['Doan.quan2 has turn on the led at 4/25/2022, 10:45:44 PM',
//   'Doan.quan2 has turn on the led at 4/26/2022, 10:45:44 PM',
//   'Doan.quan2 has turn off the led at 4/27/2022, 11:30:00 PM'];

let data = []

const Logs = () => {
  const dispatch = useDispatch()
  const history = useSelector(state => state.device.history)
  console.log(history)
  const handleLogout = () => { }
  const [deviceName, setDeviceName] = useState('led');
  const [day, setDay] = useState(new Date());
  const [show, setShow] = useState(false);
  const [histories, setHistories] = useState([]);

  const changeDate = (event, selectedDate) => {
    setShow(!show);
    setDay(selectedDate || day);
  }
  const searchAction = () => {
    let dayText = (day.getMonth() + 1).toString() + '/' + day.getDate() + '/' + day.getFullYear();
    let newHistory = data.filter(n => (n.search(dayText) !== -1) && (n.search(deviceName) !== -1));
    setHistories(newHistory);
  }

  useEffect(() => {
    dispatch(getHistory())
  }, [])
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>LOGS</Text>
          <LogoutBtn handleLogout={handleLogout} />
        </View>
        <View style={styles.filter}>
          <View style={styles.criterion}>
            <Text style={styles.criterionText}>Device</Text>
            <Text style={styles.criterionText}>Date</Text>
          </View>
          <View>
            {/* <View style={styles.pickerContainer}>
            <Picker selectedValue={deviceName} style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setDeviceName(itemValue)}
            >
              <Picker.Item label='led' value='led' />
              <Picker.Item label='Fan' value='fan' />
              <Picker.Item label='Door' value='door' />
            </Picker>
          </View> */}
            <Picker selectedValue={deviceName} style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setDeviceName(itemValue)}
            >
              <Picker.Item label='led' value='led' />
              <Picker.Item label='Fan' value='fan' />
              <Picker.Item label='Door' value='door' />
            </Picker>
            <TouchableOpacity style={styles.picktime} onPress={() => setShow(true)} >
              <Text>{(day.getMonth() + 1).toString() + '/' + day.getDate() + '/' + day.getFullYear()}</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker value={day} mode='date' onChange={changeDate} display='calendar' />
            )}
          </View>
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => searchAction()}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
        <View style={styles.body}>
          <FlatList data={histories}
            renderItem={({ item }) => <LogTag content={item} />}
          />

        </View>
      </View>
    </>
  );
}

export default Logs;

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
  filter: {
    paddingLeft: '10%',
    flexDirection: 'row',
    marginTop: 5
  },
  criterion: {
    marginRight: 10
  },
  criterionText: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16
  },
  picker: {
    width: 200,
    height: 22,
    //marginTop: 10
  },
  picktime: {
    width: 200,
    backgroundColor: '#fff',
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 5
  },
  body: {
    alignItems: 'center'
  },
  searchBtn: {
    width: 60,
    height: 25,
    backgroundColor: 'white',
    borderWidth: 1,
    alignSelf: 'center',
    textAlign: 'center',
    margin: 10
  },
  searchText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  pickerContainer: {
    width: 200,
    backgroundColor: 'white',
    borderWidth: 1
  }
});