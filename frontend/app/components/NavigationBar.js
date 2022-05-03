import { View, StyleSheet } from "react-native";
import { Link } from 'react-router-native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import color from "../misc/color";


function NavigationBar() {
    return (
        <View style={styles.navigationBar}>
            <Link to='/'>
                <FontAwesome5 name="home" size={32} color="white" />
            </Link>
            <Link to='/notiScreen'>
                <Ionicons name="notifications" size={32} color="white" />
            </Link>
            <Link to='/logScreen'>
                <FontAwesome5 name="history" size={32} color="white" />
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    navigationBar: {
        flexDirection: 'row',
        width: '100%',
        fontSize: 30,
        justifyContent: 'space-around',
        paddingVertical: 15,
        backgroundColor: color.MAIN
    }
})

export default NavigationBar