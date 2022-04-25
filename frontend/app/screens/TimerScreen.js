import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CreateTimerModal from '../components/CreateTimerModal';
import LogoutBtn from '../components/LogoutBtn';
import colors from '../misc/colors';
import TimerTag from '../components/TimerTag'
import { useDispatch, useSelector } from 'react-redux';
import { adjustFanLevel, toggleDoor, toggleLed } from '../redux/deviceRedux/deviceAction';

const reverseData = data => {
    return data.sort((a, b) => {
        const aInt = new Date(a.timeOn);
        const bInt = new Date(b.timeOn);
        if (aInt > bInt) return 1;
        if (aInt == bInt) return 0;
        if (aInt < bInt) return -1;
    });
};

const TimerScreen = () => {
    const dispatch = useDispatch()
    const devices = useSelector(state => state.device.devices)
    
    const [timers, setTimers] = useState([]);
    const [showCreateTimer, setShowCreateTimer] = useState(false);
    //const { timers, setTimers, findTimers } = useTimers();
    const [startTimer, setStartTimer] = useState(false)
    const reverseTimers = reverseData(timers);

    const handleLogout = () => { }
    const handleOnSave = async (deviceName, timeOn, timeOff) => {
        const timer = { id: Date.now(), deviceName, timeOn, timeOff };
        const updatedTimers = [...timers, timer];
        setTimers(updatedTimers);
        setStartTimer(true)
        await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
        
        // console.log(timers);
        // console.log(typeof timers[0].timeOn);
    }
    const findTimers = async () => {
        const result = await AsyncStorage.getItem('timers');
        if (result) setTimers(JSON.parse(result));
        //console.log(timers[0].timeOn);
    }

    const handleAutoControlDevice = () => {
        setInterval(() => {
            let currentTime = (new Date()).toISOString()
            
            timers.forEach(async (timer) => {
                if (timer.timeOn <= currentTime) {
                    const value = await AsyncStorage.getItem(timer.deviceName)
                    const deviceStatus = JSON.parse(value)

                    if (timer.deviceName === 'Light' && deviceStatus === '0') {
                        console.log('aasdasd')
                        dispatch(toggleLed({value: '1'}))
                    } else if (timer.deviceName === 'Door' && deviceStatus === '90') {
                        dispatch(toggleDoor({value: '0'}))
                        console.log('aasdasd')
                    } else if (timer.deviceName === 'Fan' && deviceStatus === '0') {
                        dispatch(adjustFanLevel({value: '100'}))
                        console.log('aasdasd')
                    }
                } else if (timer.timeOff === currentTime) {
                    if (timer.deviceName === 'Light' && deviceStatus === '1') {
                        dispatch(toggleLed({value: '0'}))
                        console.log('aasdasd')
                    } else if (timer.deviceName === 'Door' && deviceStatus === 0) {
                        dispatch(toggleDoor({value: '90'}))
                        console.log('aasdasd')
                    } else if (timer.deviceName === 'Fan' && deviceStatus === '100') {
                        dispatch(adjustFanLevel({value: '0'}))
                        console.log('aasdasd')
                        }
                }
            })
        }, 1000)
    }

    useEffect(() => {
        //AsyncStorage.clear();
        findTimers();
    }, [])

    useEffect(() => {
        handleAutoControlDevice()
    }, [timers])
    return (
        <>
            <StatusBar hidden />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Timer</Text>
                    <LogoutBtn onPress={handleLogout} />
                </View>
                <TouchableOpacity style={styles.addBtn}
                    onPress={() => setShowCreateTimer(true)}>
                    <Entypo name="plus" size={24} color="black" />
                </TouchableOpacity>
                <ScrollView>
                    <FlatList data={timers}
                    keyExtractor={item=>item.id.toString()}
                    renderItem={({item})=><TimerTag 
                    timeOn ={new Date(item.timeOn)} 
                    timeOff ={new Date(item.timeOff)} 
                    device={item.deviceName}
                    id = {item.id}
                    />}
                    />
                </ScrollView>
            </View>
            <CreateTimerModal visible={showCreateTimer}
                onSave={handleOnSave}
                onClose={() => setShowCreateTimer(false)}
            />
        </>
    );
}

export default TimerScreen;

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
    addBtn: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5

    },
});