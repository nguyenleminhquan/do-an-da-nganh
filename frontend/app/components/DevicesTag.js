import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../misc/colors';
import { adjustFanLevel, toggleDoor, toggleLed } from '../redux/deviceRedux/deviceAction';
import FanControllerModal from './FanControllerModal';

const DeviceTag = (props) => {
    const dispatch = useDispatch()
    const device = useSelector(state => state.device.devices.find(device => device.name === props.name))

    const [status, setStatus] = useState('')
    const [fanValue, setFanValue] = useState(0)
    const [showAdjustFanModal, setShowAdjustFanModal] = useState(false);
    const [activeText, setActiveText] = useState('')
    const [token, setToken] = useState('')
    const [btnName, setBtnName] = useState('')      
    
    const handleDeviceClick = () => {   
        if (device.name === 'Door') {
            console.log(token)
            if (status === '0') {
                dispatch(toggleDoor({value: "90"}, token))
                setStatus('90')
                setBtnName('Open')
                setActiveText('Closing...')
            } else {
                dispatch(toggleDoor({value: "0"}, token))
                setStatus('0')
                setBtnName('Close')
                setActiveText('Opening...')
            }
        } else if (device.name === 'Light') {
            if (status === '0') {
                dispatch(toggleLed({value: "1"}, token))
                setStatus('1')
                setBtnName('Off')
                setActiveText('On now...')
            } else {
                dispatch(toggleLed({value: "0"}, token))
                setStatus('0')
                setBtnName('On')
                setActiveText('Off now...')
            }
        }
    }
    const handleAdjustFan = (value) => {
        dispatch(adjustFanLevel({value: value.toString()}, token)) 
        setFanValue(value)
    }
    const handleAdjustClick = () => {
        setShowAdjustFanModal(true);
    }

    useEffect(() => {
        const firstLoad = async () => {
            try {
                const value = await AsyncStorage.getItem(device.name)
                if (device.name === 'Fan') {
                    setBtnName('Adjust')
                    setFanValue(JSON.parse(value))
                } else {
                    if (device.name === 'Light') {
                        if (JSON.parse(value) === '0') {
                            setBtnName('Turn On')
                            setActiveText('Off now...')
                        } else {
                            setBtnName('Turn Off')
                            setActiveText('On now...')
                        }
                    } else if (device.name === 'Door') {
                        if (JSON.parse(value) === '0') {
                            setBtnName('Close')
                            setActiveText('Opening...')
                        } else {
                            setBtnName('Open')
                            setActiveText('Closing...')
                        }
                    }   
                    setStatus(JSON.parse(value))
                }
            } catch(err) {
                console.log(err)
            }
        }
        firstLoad()
    }, [])
    
    useEffect(() => {
        const firstLoad = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken') 
                if (userToken) setToken(userToken)
            } catch(err) {
                console.log(err)
            }
        }
        firstLoad()
    }, [])

    // Hien tai chi co 1 thiet bi o moi phong
    if (device.name === 'Light' || device.name === 'Door') return (
        <Pressable style={styles.container}>
            <View style={styles.logo}>
                <FontAwesome5 name={props.iconName} size={24} color="#311A2E" />
                <Text style={styles.deviceName}>{props.name}</Text>
            </View>
            <Text style={styles.activeText}>{activeText}</Text>
            <TouchableOpacity onPress={handleDeviceClick}>
                <View style={styles.detailBtn}>
                    <Text style={styles.detailText}
                    >{btnName}</Text>
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
            <Text style={styles.activeText}>Level: {fanValue}%</Text>
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