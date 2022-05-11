import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import colors from '../misc/colors';

const SensorsTag = (props) => {
    const sensor = useSelector(state => state.device.sensors.find(sensor => sensor.name === props.name))
    const [value, setValue] = useState('')

    const handleLogout = () => {
        props.navigation.navigate('Login')
    }

    useEffect(() => {
        const firstLoad = async () => {
            try {
                const value = await AsyncStorage.getItem(sensor.name)
                if (value) setValue(JSON.parse(value))
            } catch(err) {
                console.log(err)
            }
        }
        firstLoad()
    }, [])

    return (
        <Pressable style={styles.container}>
            <View style={styles.logo}>
                {props.name === 'Temp' ? 
                    <FontAwesome5 name="temperature-low" size={24} color="#311A2E" />
                :   <MaterialCommunityIcons name="air-humidifier" size={24} color="black" />
                }
                <Text style={styles.sensorValue}>{props.name}</Text>
            </View>
            <Text style={styles.activeText}>{value}</Text>
        </Pressable>
    )
}

export default SensorsTag

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
        fontSize: 35,
        color: colors.HIGHLIGHTTEXT,
        marginBottom: 20
    },
    sensorValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
        color: colors.HIGHLIGHTTEXT
    }
});
