import { StyleSheet, Text, View } from "react-native"
import { useSelector } from "react-redux"
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import RoomLists from "../components/RoomLists"
import NavigationBar from "../components/NavigationBar";
import color from "../misc/color";
import DeviceDetailTag from "../components/DeviceDetailTag";

function DeviceDetail({ id }) {
    const device = useSelector(state => state.device.devices)
    const deviceName = device[id].name
    const deviceIcon = device[id].iconName

    return (
        <View style={styles.container}>
            <RoomLists />
            <View style={styles.body}>
                <Text style={styles.title}>
                    <FontAwesome5 name={deviceIcon} size={24} color="#311A2E" />
                    <Text style={styles.deviceName}>{deviceName}</Text>
                </Text>
                <View style={styles.deviceList}>
                    {device[id].isOn.map((element, index) => (
                        <View style={styles.deviceItem}>
                            <DeviceDetailTag 
                                key={index}
                                deviceName={deviceName}
                                index={index}
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
    container: {
        backgroundColor: color.MAIN,
        justifyContent: 'space-between',
        flex: 1,
        paddingTop: 35,
    },
    body: {
        backgroundColor: color.BLANK,
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginVertical: 24,
    },
    deviceList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    deviceItem: {
        margin: 12,
    }
})

export default DeviceDetail
