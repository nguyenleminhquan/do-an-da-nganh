import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Modal, Picker, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';

const CreateTimerModal = (props) => {
    const [showDateOnPicker, setShowDateOnPicker] = useState(false);
    const [showDateOffPicker, setShowDateOffPicker] = useState(false);
    const [timeOn, setTimeOn] = useState(new Date());
    const [timeOff, setTimeOff] = useState(new Date(timeOn.getTime() + 10 * 60 * 1000));
    const [deviceName, setDeviceName] = useState('Light');
    const [showTimeOnPicker, setShowTimeOnPicker] = useState(false)
    const [showTimeOffPicker, setShowTimeOffPicker] = useState(false)
    const changeDateOn = (event, selectedDate) => {
        setShowDateOnPicker(!showDateOnPicker);
        setTimeOn(selectedDate || timeOn);
    }
    const changeDateOff = (event, selectedDate) => {
        setShowDateOffPicker(!showDateOffPicker);
        setTimeOff(selectedDate || timeOff);
    }
    const changeTimeOn = (event, selectedTime) => {
        setShowTimeOnPicker(!showTimeOnPicker);
        setTimeOn(selectedTime || timeOn);

    }
    const changeTimeOff = (event, selectedTime) => {
        setShowTimeOffPicker(!showTimeOffPicker);
        setTimeOff(selectedTime || timeOff);
    }
    
    const handleOnSave = ()=>{
        if (timeOn > timeOff){
            Alert.alert(
                "Wrong time!",
                "The time on must be before the time off!",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                  }
                ]
            );
        }
        else{
        props.onSave(deviceName, timeOn, timeOff);
        props.onClose();
        }
    }
    const handleOnClose = () =>{
        props.onClose();
    } 
    return (
        <Modal
            animationType="slide"
            transparent
            visible={props.visible}>
            <View style={styles.container}>
                <View style={styles.containerContent}>
                    <Text style={styles.title}>Device:</Text>
                    <Picker selectedValue={deviceName} style={styles.pickerDevice}
                        onValueChange={(itemValue, itemIndex) => setDeviceName(itemValue)}
                    >
                        <Picker.Item label='Light' value='Light' />
                        <Picker.Item label='Fan' value='Fan' />
                        <Picker.Item label='Door' value='Door' />
                    </Picker>
                    <View style={styles.pickDay}>
                        <Text style={styles.title}>Date On:</Text>
                        <TouchableOpacity style={styles.calendarPicker} onPress={() => setShowDateOnPicker(true)}>
                            <FontAwesome name="calendar" size={20} color="black" />
                        </TouchableOpacity>
                        {showDateOnPicker && (
                            <DateTimePicker value={timeOn} mode='date' onChange={changeDateOn} display='calendar' />
                        )}
                        <Text style={styles.text}>
                            {timeOn.getDate() + '/' + (timeOn.getMonth() + 1).toString() + '/' + timeOn.getFullYear()}
                        </Text>
                    </View>
                    <View style={styles.pickTime}>
                        <Text style={styles.title}>Time On:</Text>
                        <TouchableOpacity style={styles.calendarPicker} onPress={() => setShowTimeOnPicker(true)}>
                            <FontAwesome name="clock-o" size={20} color="black" />
                        </TouchableOpacity>
                        {showTimeOnPicker && (
                            <DateTimePicker value={timeOn} mode='time' onChange={changeTimeOn} />
                        )}
                        <Text style={styles.text}>
                            {timeOn.getHours() + ':' + timeOn.getMinutes() + ':' + timeOn.getSeconds()}
                        </Text>
                    </View>
                    <View style={styles.pickDay}>
                        <Text style={styles.title}>Date Off:</Text>
                        <TouchableOpacity style={styles.calendarPicker} onPress={() => setShowDateOffPicker(true)}>
                            <FontAwesome name="calendar" size={20} color="black" />
                        </TouchableOpacity>
                        {showDateOffPicker && (
                            <DateTimePicker value={timeOff} mode='date' onChange={changeDateOff} display='calendar' />
                        )}
                        <Text style={styles.text}>
                            {timeOff.getDate() + '/' + (timeOff.getMonth() + 1).toString() + '/' + timeOff.getFullYear()}
                        </Text>
                    </View>
                    <View style={styles.pickTime}>
                        <Text style={styles.title}>Time Off:</Text>
                        <TouchableOpacity style={styles.calendarPicker} onPress={() => setShowTimeOffPicker(true)}>
                            <FontAwesome name="clock-o" size={20} color="black" />
                        </TouchableOpacity>
                        {showTimeOffPicker && (
                            <DateTimePicker value={timeOff} mode='time' onChange={changeTimeOff} />
                        )}
                        <Text style={styles.text}>
                            {timeOff.getHours() + ':' + timeOff.getMinutes() + ':' + timeOff.getSeconds()}
                        </Text>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity style={styles.btn} onPress={handleOnSave}>
                            <Text style={styles.btnText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={handleOnClose}>
                            <Text style={styles.btnText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    );
}

export default CreateTimerModal;

const styles = StyleSheet.create({
    containerContent: {
        width: 350,
        height: 300,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 20,
        alignSelf: 'center',
        marginTop: 100,
        borderRadius: 30,

    },
    container: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: '100%',
        width: '100%'
    },
    bottom: {
        height: 40,
        width: '90%',
        margin: 10,
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 40
    },
    btnText: {
        fontSize: 18,
        width: 100
    },
    btn: {
        width: '40%',
        height: 40,
        marginLeft: 30,
        marginTop: 10
    },
    calendarPicker: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20
    },
    pickDay: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 18,
        marginRight: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 20
    },
    pickerDevice: {
        width: 200,
        height: 24,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 20
    },
    pickTime: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    }
});