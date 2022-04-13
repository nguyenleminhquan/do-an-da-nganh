import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '../misc/colors';

const RoomBtn = (props) => {
    if (props.chosen) return (
        <View style = {styles.chosen}>
            <Text style = {styles.chosenText}>{props.name}</Text>
        </View>
    );
    return (
    <TouchableOpacity onPress={props.chooseRoom}>
        <Text style = {styles.text}>{props.name}</Text>
    </TouchableOpacity>
    );
}

export default RoomBtn;

const styles = StyleSheet.create({
    chosen:{
        backgroundColor: colors.HIGHLIGHT,
        borderRadius: 30
    },
    chosenText:{
        fontWeight: 'bold',
        color: colors.DARKTEXT,
        fontSize: 14
    },
    text:{
        fontWeight: 'bold',
        color: colors.BRIGHTTEXT,
        fontSize: 14
    }
});