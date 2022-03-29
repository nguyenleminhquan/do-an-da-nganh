import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, {useState, useEffect} from 'react';
import color from '../misc/color';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import DevicesTag from '../components/DevicesTag';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
    const devices = useSelector(state => state.device.devices)

    console.log(devices)

    const handleLogoutBtn = () => {
        Alert.alert(
        'Do you want to logout?',
        'This will return to login screen.', [
        {
          text: 'Logout',
          onPress: () => console.warn('Do not show Pressed!')
        },
        {
          text: 'Cancel'
        },
      ],
        {
          cancelable: true
        })
    }

    const [greet, setgreet] = useState('');
    const [iconGreet, setIconGreet] =useState('');
    const [greetColor, setGreetColor] = useState('');

    // Demo for device
    // const [devices, setDevices] = useState([
    //     {
    //         name: 'Fans',
    //         iconName: 'fan',
    //         isOn: [false, true]
    //         // isOn: false
    //     },
    //     {
    //         name: 'Doors',
    //         iconName: 'door-open',
    //         isOn: [false, true]
    //     },
    //     {
    //         name: 'Lights',
    //         iconName: 'lightbulb',
    //         isOn: [false, true]
    //     }
    // ])

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
        <View style={styles.topView}>
            <View style={styles.containerLogout}>
                <TouchableOpacity style={styles.logout} onPress={handleLogoutBtn}>
                    <Text style={styles.logoutText}>Logout</Text>
                    <MaterialIcons name="logout" size={20} color={color.BRIGHTTEXT} />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <View style={styles.appName}>
                    <Text style={styles.s}>
                        S
                    </Text>
                    <Text style={styles.mart}>
                        mart
                    </Text>
                </View>
                <View style={styles.greeting}>
                    <Text style={styles.greetingText}>
                        {`Good ${greet}!`}
                    </Text>
                    <Ionicons name={iconGreet} size={24} color={greetColor} />
                </View>
            </View>
        </View>
        <View style={styles.bottomView}>
            <Text style={styles.bottomViewStatus}>
                {devices.length} devices in the living room are 
                <Text style={styles.deviceStatus}>working normally</Text>
            </Text>
            <View style={styles.deviceLists}>
                {devices.map((device, index) => (
                    <DevicesTag 
                        key={index}
                        name={device.name} 
                        iconName={device.iconName} 
                        status={device.isOn}
                    />)
                )}
            </View>
        </View>
    </View>   
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:color.MAIN
    },
    topView:{
        flex: 3,
        backgroundColor: color.MAIN
    },
    bottomView:{
        flex: 8,
        backgroundColor: color.BLANK,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30 
    },
    logout:{
        flexDirection: "row",
        justifyContent:'right',
        marginTop:5,
        marginRight: 15
    },
    logoutText:{
        color:color.BRIGHTTEXT,
        marginRight:2
    },
    containerLogout:{
        width: '100%',
        textAlign: 'right'
    },
    header:{
        height: '55%',
        flexDirection: 'row'
    },
    greeting:{
        flex:1,
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'right',
        marginRight: 20
    },
    appName:{
        flexDirection:'row',
        flex:1,
        alignSelf:'center'
    },
    mart:{
        color:color.BRIGHTTEXT, 
        fontSize: 30, 
        fontWeight:'bold',
        marginTop:30
    },
    s:{
        color:color.BTNCOLOR, 
        fontSize: 60, 
        fontWeight:'bold',
        marginLeft:20
    },
    greetingText:{
        color:color.BRIGHTTEXT,
        fontSize:18,
        marginRight:4
    },
    deviceLists: {
        flexDirection: 'row'
    }
});
export default HomeScreen