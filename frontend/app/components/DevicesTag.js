import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../misc/colors';
import { toggleDoor, toggleLed } from '../redux/deviceRedux/deviceAction';
import FanControllerModal from './FanControllerModal';

const DeviceTag = (props) => {
    const dispatch = useDispatch()
    const device = useSelector(state => state.device.devices.find(device => device.name === props.name))

    const [status, setStatus] = useState(device.active)
    const [showAdjustFanModal, setShowAdjustFanModal] = useState(false);

    //goi api de lay gia tri gan cho fanvalue
    const [fanValue, setFanValue] = useState(0);

    console.log(status)

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
        console.log(btnName)
        if (btnName === 'Off') {
            if (device.name === 'Light') {
                dispatch(toggleLed({ value: '0' }))
            }
            else if (device.name === 'Door') {
                dispatch(toggleDoor({ value: '0' }))
            }
            setBtnName('On')
            setStatus('0')
        } else if (btnName === 'On') {
            if (device.name === 'Light') {
                dispatch(toggleLed({ value: '1' }))
            }
            else if (device.name === 'Door') {
                dispatch(toggleDoor({ value: '1' }))
            }
            setBtnName('Off')
            setStatus('1')
        } else {
            // Link to adjust fan modal
            
        }
    }
    const handleAdjustFan = (value) => {
        //Post fan value 
    }
    const handleAdjustClick = ()=>{
        setShowAdjustFanModal(true);
    }

    // Hien tai chi co 1 thiet bi o moi phong
    if (device.name === 'Light' || device.name === 'Door') return (
        <Pressable style={styles.container}>
            <View style={styles.logo}>
                <FontAwesome5 name={props.iconName} size={24} color="#311A2E" />
                <Text style={styles.deviceName}>{props.name}</Text>
            </View>
            <Text style={styles.activeText}>Active {status}/1</Text>
            <TouchableOpacity onPress={handleDeviceClick}>
                <View style={styles.detailBtn}>
                    <Text style={styles.detailText}>{btnName}</Text>
                </View>
            </TouchableOpacity>
        </Pressable>
    );
    else return (
        <Pressable style={styles.container}>
            <View style={styles.logo}>
                <FontAwesome5 name={props.iconName} size={24} color="#311A2E" />
                <Text style={styles.deviceName}>{props.name}</Text>
            </View>
            <Text style={styles.activeText}>Rate {fanValue}/100</Text>
            <TouchableOpacity onPress={handleAdjustClick}>
                <View style={styles.detailBtn}>
                    <Text style={styles.detailText}>{btnName}</Text>
                </View>
            </TouchableOpacity>
            <FanControllerModal visible={showAdjustFanModal}
                onClose={() => setShowAdjustFanModal(false)}
                onChange={handleAdjustFan} 
                value={fanValue}/>
        </Pressable>
    );
}


export default DeviceTag

const styles = StyleSheet.create({
    container: {
        width: 135,
        height: 160,
        backgroundColor: '#fff',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        flexDirection: 'row',
        marginBottom: 20
    },
    activeText: {
        fontSize: 22,
        color: colors.HIGHLIGHTTEXT,
        marginBottom: 20
    },
    detailBtn: {
        width: 116,
        height: 42,
        backgroundColor: colors.HIGHLIGHT,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    deviceName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
        color: colors.HIGHLIGHTTEXT
    },
});
