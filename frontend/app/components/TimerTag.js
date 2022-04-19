import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, Text, View,Pressable, Alert } from 'react-native';
import colors from '../misc/colors';

const TimerTag = (props) => {
    const handleLongPress= (id)=>{
        Alert.alert(
            "Delete timer!",
            "Are you sure?",
            [
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel"
              },
              { text: "Delete", onPress: async () => {
                const result = await AsyncStorage.getItem('timers');
                let timers = [];
                if(result) timers = JSON.parse(result);
                console.log(timers);
                const newTimers = timers.filter(n=>n.id !== id);
                console.log(`new timers:`,newTimers)
                await AsyncStorage.setItem('timers', JSON.stringify(newTimers));
              } }
            ]
          );
    }
    return (
        <Pressable style={styles.container} onLongPress={()=>handleLongPress(props.id)}>
            <View style={styles.devicecontainer}>
            <Text style={styles.title}>Device: </Text>
            <Text style={styles.deviceText}>{props.device}</Text>
            </View>
            <View style={styles.timeContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Time On:</Text>
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>
                            {props.timeOn.getHours() + ':' + props.timeOn.getMinutes() + ':' + props.timeOn.getSeconds()}
                        </Text>
                        <Text style={styles.day}>
                            {' ' + props.timeOn.getDate() + '/' + (props.timeOn.getMonth() + 1).toString() + '/' + props.timeOn.getFullYear()}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Time Off:</Text>
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>
                            {props.timeOff.getHours() + ':' + props.timeOff.getMinutes() + ':' + props.timeOff.getSeconds()}
                        </Text>
                        <Text style={styles.day}>
                            {' ' + props.timeOff.getDate() + '/' + (props.timeOff.getMonth() + 1).toString() + '/' + props.timeOff.getFullYear()}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

export default TimerTag;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 70,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: colors.MAIN,
        borderRadius: 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 10
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    infoContainer: {
        width: '50%',
        justifyContent: 'center',
    },
    time: {
        fontSize: 18,
        marginLeft: 10
    },
    day: {
        fontSize: 12,
        color: 'gray',
        marginTop: 6
    },
    timeContainer: {
        flexDirection: 'row'
    },
    devicecontainer:{
        fontSize: 14,
        flexDirection: 'row'
    }
});