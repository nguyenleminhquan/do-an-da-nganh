import { View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import colors from '../misc/colors';
import {Ionicons } from '@expo/vector-icons';
import LogoutBtn from '../components/LogoutBtn';
import DevicesTag from '../components/DevicesTag';
import RoomBtn from '../components/RoomBtn'


const ROOM=[
  {
    id: 1,
    name: 'Living Room',
    bool: true
  },
  {
    id: 2,
    name: 'BathRoom',
    bool: false
  },
  {
    id: 3,
    name: 'BedRoom 1',
    bool: false
  },
  {
    id: 4,
    name: 'Kitchen',
    bool: false
  },
  {
    id: 5,
    name: 'BedRoom 2',
    bool: false
  },
]
const Rooms = ({name, chosen, onPress}) =>{
  <RoomBtn chosen={chosen} name={name} chooseRoom ={onPress}/>
}

const Home = () => {
  const [greet, setgreet] = useState('');
  const [iconGreet, setIconGreet] =useState('');
  const [greetColor, setGreetColor] = useState('');
  const devices = useSelector(state => state.device.devices)
  
  const findGreet = () =>{
      const hrs = new Date().getHours();
      if(hrs === 0 || hrs <12) {
          setGreetColor('#ff8000')
          setIconGreet('sunny');
          return setgreet('Morning');
      }  
      if(hrs === 1 || hrs <17){
          setGreetColor('#fff')
          setIconGreet('cloud');
          return setgreet('Afternoon');
      } 
      else{
          setGreetColor('#fff200');
          setIconGreet('moon');
          return setgreet('Evening');
      }
  };
  useEffect(()=> {
      findGreet();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.top}>
          <LogoutBtn/>
        </View>
        <View style={styles.logo}>
          <View style={styles.text}>
            <Text style={styles.s} >S</Text>
            <Text style={styles.mart} >mart</Text>
          </View>
          <View style={styles.greeting}>
              <Text style={styles.greetingText}>
                  {`Good ${greet}!`}
              </Text>
              <Ionicons name={iconGreet} size={24} color={greetColor} />
          </View>
        </View>
        <ScrollView horizontal={true} style={styles.rooms}>

        </ScrollView>
      </View>
      <View style={styles.body}>
        <View style={styles.bottomView}>
            <Text style={styles.bottomViewStatus}>
                {devices.length} devices in the living room are 
                <Text style={styles.deviceStatus}> working normally</Text>
            </Text>
            <ScrollView contentContainerStyle={styles.deviceLists} >
                {devices.map((device, index) => (
                    <View style={styles.deviceItem} key={index}>
                        <DevicesTag 
                            name={device.name} 
                            iconName={device.iconName} 
                            // status={device.active}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: colors.MAIN
  },
  header:{
    flex: 3,
    backgroundColor: colors.MAIN
  },
  body:{
    flex: 8,
    backgroundColor: colors.BLANK,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  top:{
    width:'100%',
    alignItems: 'flex-end',
    paddingRight: 5
  },
  logo:{
    flexDirection: 'row',
    height: 100
  },
  text:{
    flexDirection: 'row',
    paddingLeft: 10,
    width:'45%'
  },
  s:{
    color: colors.HIGHLIGHT,
    fontWeight: 'bold',
    fontSize: 60
  },
  mart:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 30
  },
  greeting:{
    width:'55%',
    flexDirection:'row',
    alignSelf:'center',
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  greetingText:{
    color:colors.BRIGHTTEXT,
    fontSize:18,
    marginRight:4
  },
  rooms:{
    position: 'absolute',
    bottom: 5
  },
  bottomViewStatus: {
    fontSize: 22,
    color: colors.PURPLE,
    // marginHorizontal: 5,
    // marginVertical: 10,
    // flex: 1,
    margin: 10
  },
  deviceStatus: {
      fontWeight: 'bold'
  },
  deviceLists: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  deviceItem: {
    margin: 12,
  },
});