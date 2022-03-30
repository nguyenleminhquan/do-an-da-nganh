import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Alert,
    ScrollView 
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveRoom } from '../redux/roomRedux/roomActions'
import color from '../misc/color';
import DevicesTag from '../components/DevicesTag';
import NavigationBar from '../components/NavigationBar';
import RoomLists from '../components/RoomLists';

const HomeScreen = () => {
    const devices = useSelector(state => state.device.devices)
    const rooms = useSelector(state => state.room.rooms)
    const activeRoom = useSelector(state => state.room.activeRoom)
    const dispatch = useDispatch()
    
    const [greet, setgreet] = useState('');
    const [iconGreet, setIconGreet] =useState('');
    const [greetColor, setGreetColor] = useState('');
    // console.log(devices)

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

    const findGreet = () =>{
        const hrs = new Date().getHours();
        if(hrs === 0 || hrs <12) {
            setGreetColor('#ff8000')
            setIconGreet('sunny');
            return setgreet('Morning');
        }  
        if(hrs === 1 || hrs <17){
            setGreetColor('#fff')
            setIconGreet('cloud');
            return setgreet('Afternoon');
        } 
        else{
            setGreetColor('#fff200');
            setIconGreet('moon');
            return setgreet('Evening');
        }
    };

    useEffect(()=> {
        findGreet();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <View style={styles.containerLogout}>
                    <TouchableOpacity style={styles.logout} onPress={handleLogoutBtn}>
                        <Text style={styles.logoutText}>Logout</Text>
                        <MaterialIcons name="logout" size={20} color={color.BRIGHTTEXT} />
                    </TouchableOpacity>
                </View>
                <View style={styles.header}>
                    <View style={styles.appName}>
                        <Text style={styles.s}>
                            S
                        </Text>
                        <Text style={styles.mart}>
                            mart
                        </Text>
                    </View>
                    <View style={styles.greeting}>
                        <Text style={styles.greetingText}>
                            {`Good ${greet}!`}
                        </Text>
                        <Ionicons name={iconGreet} size={24} color={greetColor} />
                    </View>
                </View>
                {/* <View style={styles.navigationBar}>
                    <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {rooms.map(room => (
                            <Text 
                                key={room}
                                style={[styles.navigationItem, activeRoom === room ? styles.roomActive : null ]}
                                onPress={() => dispatch(setActiveRoom(room))}
                            >{room}</Text>
                        ))}
                    </ScrollView>
                </View> */}
                <RoomLists />
            </View>
            <View style={styles.bottomView}>
                <Text style={styles.bottomViewStatus}>
                    {devices.length} devices in the living room are 
                    <Text style={styles.deviceStatus}> working normally</Text>
                </Text>
                <View style={styles.deviceLists}>
                    {devices.map((device, index) => (
                        <View style={styles.deviceItem} key={index}>
                            <DevicesTag 
                                name={device.name} 
                                iconName={device.iconName} 
                                status={device.isOn}
                            />
                        </View>
                    ))}
                </View>
            </View>
            <NavigationBar />
        </View>   
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:color.MAIN
    },
    topView:{
        // flex: 4,
        backgroundColor: color.MAIN
    },
    bottomView:{
        flex: 12,
        backgroundColor: color.BLANK,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    logout:{
        flexDirection: "row",
        justifyContent:'flex-end',
        marginTop:5,
        marginRight: 15
    },
    logoutText:{
        color:color.BRIGHTTEXT,
        marginRight:2
    },
    containerLogout:{
        width: '100%',
        textAlign: 'right',
        marginTop: 50,
        // marginBottom: 20,
    },
    header:{
        // height: '55%',
        flexDirection: 'row'
    },
    greeting:{
        flex:1,
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'flex-end',
        marginRight: 20
    },
    appName:{
        flexDirection:'row',
        flex:1,
        alignSelf:'center'
    },
    mart:{
        color:color.BRIGHTTEXT, 
        fontSize: 30, 
        fontWeight:'bold',
        marginTop:30
    },
    s:{
        color:color.BTNCOLOR, 
        fontSize: 60, 
        fontWeight:'bold',
        marginLeft:20
    },
    greetingText:{
        color:color.BRIGHTTEXT,
        fontSize:18,
        marginRight:4
    },
    bottomViewStatus: {
        fontSize: 22,
        color: color.PURPLE,
        marginHorizontal: 40,
        marginVertical: 20,
        // flex: 1,
    },
    deviceStatus: {
        fontWeight: 'bold'
    },
    deviceLists: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    deviceItem: {
        margin: 12,
    },
    navigationBar: {
        flexDirection: 'row',
        marginVertical: 12,
    },
    navigationItem: {
        fontSize: 20,   
        paddingHorizontal: 20,
        color: color.BRIGHTTEXT,
        paddingVertical: 6
    },
    roomActive: {
        backgroundColor: '#ffb600',
        borderRadius: 22,
        color: color.DARK,
        fontWeight: 'bold'
    }
});

export default HomeScreen
