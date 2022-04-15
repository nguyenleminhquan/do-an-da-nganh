import { StyleSheet, Text, View, Picker, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import colors from '../misc/colors';
import LogoutBtn from '../components/LogoutBtn';
import DateTimePicker from '@react-native-community/datetimepicker';


const Logs = () => {

  const handleLogout = () =>{}
  const [deviceName, setDeviceName] = useState('Light');
  const [room, setRoom] = useState('Living Room');
  const [day, setDay] = useState(new Date());
  const [show, setShow] = useState(false);

  const changeDate = (event, selectedDate) =>{
    setShow(!show);
    setDay(selectedDate || day);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>LOGS</Text>
        <LogoutBtn handleLogout={handleLogout}/>
      </View>
      <View style={styles.filter}>
        <View style={styles.criterion}>
          <Text style={styles.criterionText}>Device</Text>
          <Text style={styles.criterionText}>Room</Text>
          <Text style={styles.criterionText}>Date</Text>
        </View>
        <View>
          <Picker selectedValue={room} style={styles.picker}
          onValueChange={(itemValue, itemIndex)=>setDeviceName(itemValue)}
          >
            <Picker.Item label ='Light' value='Light'/>
            <Picker.Item label ='Fan' value='Fan'/>
          </Picker>
          <Picker selectedValue={deviceName} style={styles.picker}
          onValueChange={(itemValue, itemIndex)=>setRoom(itemValue)}
          >
            <Picker.Item label ='Living Room' value='Living Room'/>
            <Picker.Item label ='Bedroom' value='Bedroom'/>
          </Picker>
          <TouchableOpacity style={styles.picktime} onPress={()=>setShow(true)} >
            <Text>{day.getDate() + '/' + (day.getMonth() + 1).toString() + '/' + day.getFullYear()}</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker value={day} mode='date' onChange={changeDate} display='calendar'/>
          )}
        </View> 
      </View>
      <View style={styles.body}>

      </View>
    </View>
  );
}

export default Logs;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: colors.BLANK
  },
  header:{
    height: 35,
    width:'100%',
    backgroundColor: colors.MAIN,
    flexDirection:'row',
    paddingBottom: 2,
    paddingLeft: 5
  },
  headerText:{
    color: colors.BRIGHTTEXT,
    fontSize: 24,
    fontWeight: 'bold',
    width:'92%'
  },
  filter:{
    paddingLeft: '10%',
    flexDirection: 'row',
  },
  criterion:{
    marginRight: 10
  },
  criterionText:{
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16
  },
  picker:{
    width: 200,
    height: 24,
    marginTop: 3.5
  },
  picktime:{
    width: 200,
    backgroundColor: '#fff',
    borderWidth: 1,
    marginTop: 3.5
  },
  body:{
    alignItems: 'center'
  }
});