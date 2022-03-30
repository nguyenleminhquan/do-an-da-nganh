import { StyleSheet, View, Text } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import color from "../misc/color";

function DeviceDetailTag(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{`${props.deviceName} ${props.index+1}`}</Text>
            <AntDesign name="poweroff" size={50} color={color.BTNCOLOR} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 145,
        height: 180,
        backgroundColor: '#fff',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    text: {
        fontSize: 20,
        // marginBottom: 16
    }
})

export default DeviceDetailTag
