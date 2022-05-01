import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const FanControllerModal = (props) => {
    // dung api lay gia tri hien tai cua quat de truyen vao value
    const [currentValue, setCurrentValue] = useState(props.value);

    const handleOnChange = () => {
        if (props.value !== currentValue) {
            props.onChange(currentValue);
        }
        props.onClose();
    }
    const handleOnClose = () => {
        setCurrentValue(props.value);
        props.onClose();
    }
    return (
        <Modal
            animationType="slide"
            transparent
            visible={props.visible}>
            <View style={styles.container}>
                <View style={styles.containerContent}>
                    <Text style={styles.text}>Current Rate</Text>
                    <Text style={styles.figure}>{currentValue}</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={100}
                        value={currentValue}
                        onValueChange={(value) => setCurrentValue(Math.round(value))}
                    ></Slider>
                    <View style={styles.bottom}>
                        <TouchableOpacity style={styles.btn} onPress={() => handleOnChange()}>
                            <Text style={styles.btnText}>Change</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => handleOnClose()}>
                            <Text style={styles.btnText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
// onPress={() => props.changeValue()}
// onPress={() => props.closeModal()}
export default FanControllerModal;

const styles = StyleSheet.create({
    containerContent: {
        width: 250,
        height: 250,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 180,
        borderRadius: 30,

    },
    container: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: '100%',
        width: '100%'
    },
    slider: {
        width: 200,
        height: 40
    },
    btn: {
        width: '40%',
        height: 40,
        marginLeft: 35,
        marginTop: 15
    },
    text: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    figure: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'red'
    },
    bottom: {
        height: 40,
        width: '100%',
        margin: 10,
        flexDirection: 'row',
    },
    btnText: {
        fontSize: 18,
    }
});