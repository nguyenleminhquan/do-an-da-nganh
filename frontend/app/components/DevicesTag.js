import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../misc/colors';
import { toggleDoor, toggleLed } from '../redux/deviceRedux/deviceAction';
import FanControllerModal from './FanControllerModal';

const DeviceTag = (props) => {
    const dispatch = useDispatch()
    const device = useSelector(state => state.device.devices.find(device => device.name === props.name))

    const [status, setStatus] = useState('')

    useEffect(() => {
        const value = AsyncStorage.getItem(device.name)
        value.then(res => setStatus(JSON.parse(res)))
    }, [])

    const [showAdjustFanModal, setShowAdjustFanModal] = useState(false);

    //goi api de lay gia tri gan cho fanvalue
    const [fanValue, setFanValue] = useState(0);

    // console.log(`${device.name} status: ${status}`)

    const [btnName, setBtnName] = useState(() => {
        if (device.name === 'Fan') return 'Adjust'
        else if (device.name === 'Door') {
            if (status === '90') return 'Open'
            else return 'Close'
        } else if (device.name === 'Light') {
            if (status === '0') return 'On'
            else return 'Off'
        }
    })      
    
    const handleDeviceClick = () => {
        if (device.name === 'Door') {
            if (status === '0') {
                dispatch(toggleDoor({value: '90'}))
                setStatus('90')
                setBtnName('Open')
            } else {
                dispatch(toggleDoor({value: '0'}))
                setStatus('0')
                setBtnName('Close')
            }
        } else if (device.name === 'Light') {
            if (status === '0') {
                dispatch(toggleLed({value: '1'}))
                setStatus('1')
                setBtnName('Off')
            } else {
                dispatch(toggleLed({value: '0'}))
                setStatus('0')
                setBtnName('On')
            }
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
