import { Text, View,TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import colors from '../misc/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDoor, toggleLed } from '../redux/deviceRedux/deviceAction';

const DeviceTag = (props) => {
    const dispatch = useDispatch()
    const device = useSelector(state => state.device.devices.find(device => device.name === props.name))
    
    const [status, setStatus] = useState(device.active)

    // const targetDevice = devices.find(device => device.name === props.name)  
    const [btnName, setBtnName] = useState(() => {
        if (device.name === 'Fan') {
            return 'Adjust'
        }
        else {
            if (status === '1') return 'Off'
            else if (status === '0') return 'On'
        }
    })

    const handleDeviceClick = () => {
        

    }
    console.log('Nut nay la: ', btnName)
    // Hien tai chi co 1 thiet bi o moi phong
    return (
        <Pressable style={styles.container}>
            <View style={styles.logo}>
                <FontAwesome5 name={props.iconName} size={24} color="#311A2E" />
                <Text style={styles.deviceName}>{props.name}</Text>
            </View>
            <Text style={styles.activeText}>Active {device.active}/1</Text>
            <TouchableOpacity >
                <View style={styles.detailBtn}>
                {/* <Text style={styles.detailText}>Detail</Text> */}
                <Text 
                    style={styles.detailText}
                    onPress={handleDeviceClick}
                >{btnName}</Text>
                </View>
            </TouchableOpacity>
        </Pressable>
    );
}

export default DeviceTag

const styles = StyleSheet.create({
    container:{
        width: 135,
        height: 160,
        backgroundColor: '#fff',
        borderRadius: 16,
        alignItems:'center',
        justifyContent:'center'
    },
    logo:{
        flexDirection:'row',
        marginBottom: 20
    },
    activeText:{
        fontSize: 22,
        color: colors.HIGHLIGHTTEXT,
        marginBottom: 20
    },
    detailBtn:{
        width: 116,
        height: 42,
        backgroundColor: colors.HIGHLIGHT,
        borderRadius: 22,
        alignItems:'center',
        justifyContent:'center'
    },
    detailText:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    deviceName:{
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
        color: colors.HIGHLIGHTTEXT
    },
});
