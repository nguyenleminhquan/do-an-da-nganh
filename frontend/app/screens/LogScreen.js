import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import React from 'react';
import color from '../misc/color';
import { MaterialIcons } from '@expo/vector-icons';

const Btns = [
    {
      id: 1,
      title: 'Lights',
    },
    {
      id: 2,
      title: 'Fans',
    },
    {
      id: 3,
      title: 'Motors',
    },
  ];
  
  const Item = ({ title }) => (
    <TouchableOpacity
    style={styles.button}
    //onPress={onPress}
    >
        <Text style={styles.btnTitle}>{title}</Text>
    </TouchableOpacity>
  );


const logScreen = () => {
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
    const renderItem = ({ item }) => (
        <Item title={item.title} />
      );
  return (
    <View style={styles.container}>
        <View style={styles.titleView}>
            <View style={styles.containerTitle}>
                <Text style={styles.tilteText}>Log</Text>
            </View>
            <View style={styles.containerLogout}>
                <TouchableOpacity style={styles.logout} onPress={handleLogoutBtn}>
                    <Text style={styles.logoutText}>Logout</Text>
                    <MaterialIcons name="logout" size={20} color={color.BRIGHTTEXT} />
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.body}>
            <Text style={styles.deviceText}>Devices</Text>
            <FlatList
                data={Btns}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.BLANK,
        //alignItems: 'center',
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
    },
    deviceText:{
        fontWeight: 'bold',
        fontSize: 25,
        paddingTop: 10,
        paddingLeft: 10,
        marginBottom: 30
    },
    body:{

    },
    button:{
        backgroundColor: color.MAIN,
        width: '70%',
        height: 50,
        borderRadius: 20,
        marginTop: 20,
        alignSelf:'center',
        justifyContent:'center'
    },
    btnTitle:{
        color: color.BRIGHTTEXT,
        fontSize: 22,
        fontWeight:'bold',
        alignSelf: 'center'
    }
});

export default logScreen