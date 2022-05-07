import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { logOut } from '../redux/authenRedux/authenAction';
import CreateTimerModal from '../components/CreateTimerModal';
import LogoutBtn from '../components/LogoutBtn';
import colors from '../misc/colors';
import TimerTag from '../components/TimerTag'

const TimerScreen = (props) => {
    const dispatch = useDispatch()
    const [timers, setTimers] = useState([]);
    const [showCreateTimer, setShowCreateTimer] = useState(false);
    const [startTimer, setStartTimer] = useState(false)

    const handleLogout = () => {
        // Alert.alert(
        //   'Do you want to logout?',
        //   'This will return to login screen.', [
        //     {
        //       text: 'Logout',
        //       onPress: () => {
        //         console.warn('Do not show Pressed!')
        //         dipatch(logout())
        //         navigation.navigate('Intro')
        //       }
        //     },
        //     {
        //       text: 'Cancel'
        //     },
        //   ],
        //   {
        //     cancelable: true
        //   })
        props.navigation.navigate('Login')
        dispatch(logOut())
    }

    const handleOnSave = async (deviceName, timeOn, timeOff) => {
        const timer = { id: Date.now(), deviceName, timeOn, timeOff };
        const updatedTimers = [...timers, timer];
        setTimers(updatedTimers);
        setStartTimer(true)
        await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
        

        props.onScheduleTimer(timer, timers, setTimers)
        // Delete timer after finishing?
        // setTimers(props.onClearTimer(timers, timer))
    }
    const findTimers = async () => {
        const result = await AsyncStorage.getItem('timers');
        if (result) setTimers(JSON.parse(result));
        //console.log(timers[0].timeOn);
    }

    useEffect(() => {
        //AsyncStorage.clear();
        findTimers();
    }, [])

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
                {/* <ScrollView> */}
                    <FlatList data={timers}
                    keyExtractor={item=>item.id.toString()}
                    renderItem={({item})=><TimerTag 
                    timeOn ={new Date(item.timeOn)} 
                    timeOff ={new Date(item.timeOff)} 
                    device={item.deviceName}
                    id = {item.id}
                    />}
                    />
                {/* </ScrollView> */}
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