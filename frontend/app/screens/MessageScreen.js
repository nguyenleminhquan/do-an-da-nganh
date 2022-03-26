import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import color from '../misc/color';
import { MaterialIcons } from '@expo/vector-icons';

const MessageScreen = () => {
    const handleLogoutBtn = () => {
        Alert.alert(
        'Do you want to logout?',
        'This will return to login screen.', [
        {
          text: 'Logout',
          onPress: () => console.warn('Do not show Pressed!')
        },
        {
          text: 'Cancel'
        },
      ],
        {
          cancelable: true
        })
    }
  return (
    <View style={styles.container}>
        <View style={styles.titleView}>
            <View style={styles.containerTitle}>
                <Text style={styles.tilteText}>Message</Text>
            </View>
            <View style={styles.containerLogout}>
                <TouchableOpacity style={styles.logout} onPress={handleLogoutBtn}>
                    <Text style={styles.logoutText}>Logout</Text>
                    <MaterialIcons name="logout" size={20} color={color.BRIGHTTEXT} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.BLANK,
        alignItems: 'center',
    },
    tilteText:{
        color: color.BRIGHTTEXT,
        fontWeight: 'bold',
        fontSize: 20,
    },
    titleView:{
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: color.MAIN,
        width: '100%',
        height: 40
    },
    logout:{
        flexDirection: "row",
        justifyContent:'center',
    },
    logoutText:{
        color:color.BRIGHTTEXT,
        marginRight:2
    },
    containerLogout:{
        width: '30%',
        textAlign: 'right'
    },
    containerTitle:{
        width: '70%',
        textAlign: 'left',
        paddingLeft: 20
    }
});

export default MessageScreen