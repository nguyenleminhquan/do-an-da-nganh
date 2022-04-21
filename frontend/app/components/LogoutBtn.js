import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';


const LogoutBtn = (props) => {
  return (
    <TouchableOpacity style={styles.container}
        onPress={props.onPress}
    >
        <Ionicons name="log-out" size={24} color="white" />
    </TouchableOpacity>
  );
}

export default LogoutBtn;

const styles = StyleSheet.create({
    container:{
        width:24,
        height:24,
        justifyContent: 'center',
        marginTop: 5
    }
});