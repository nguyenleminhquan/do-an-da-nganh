import { Text, View,TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import colors from '../misc/colors';
import { FontAwesome5 } from '@expo/vector-icons';

const DeviceTag = (props) => {
  return (
    <Pressable style={styles.container}>
        <View style={styles.logo}>
            <FontAwesome5 name={props.iconName} size={24} color="#311A2E" />
            <Text style={styles.deviceName}>{props.name}</Text>
        </View>
        <Text style={styles.activeText}>Active 1/1</Text>
        <TouchableOpacity >
            <View style={styles.detailBtn}>
            <Text style={styles.detailText}>Detail</Text>
            </View>
        </TouchableOpacity>
    </Pressable>
  );
}

export default DeviceTag

const styles = StyleSheet.create({
    container:{
        width: 135,
        height: 160,
        backgroundColor: '#fff',
        borderRadius: 16,
        alignItems:'center',
        justifyContent:'center'
    },
    logo:{
        flexDirection:'row',
        marginBottom: 20
    },
    activeText:{
        fontSize: 22,
        color: colors.HIGHLIGHTTEXT,
        marginBottom: 20
    },
    detailBtn:{
        width: 116,
        height: 42,
        backgroundColor: colors.HIGHLIGHT,
        borderRadius: 22,
        alignItems:'center',
        justifyContent:'center'
    },
    detailText:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    deviceName:{
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
        color: colors.HIGHLIGHTTEXT
    }
});