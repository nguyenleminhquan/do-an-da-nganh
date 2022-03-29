import { Text, View,TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import color from '../misc/color';
import { FontAwesome5 } from '@expo/vector-icons';

const DevicesTag = (props) => {
    const [active, setActive] = useState(props.status.filter(value => value))
    // useEffect(() => {

    // }, deviceStatus)
    return (
        <View style={styles.container}>
        <View style={styles.logo}>
            <FontAwesome5 name={props.iconName} size={24} color="#311A2E" />
            <Text style={styles.deviceName}>{props.name}</Text>
        </View>
        <Text style={styles.activeText}>Active {active.length}/{props.status.length}</Text>
        <TouchableOpacity >
            <View style={styles.detailBtn}>
                <Text style={styles.detailText}>Detail</Text>
            </View> 
        </TouchableOpacity>
        </View>
    )
}

export default DevicesTag

const styles = StyleSheet.create({
    container:{
        width: 145,
        height: 180,
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
        fontSize: 26,
        color: color.PURPLE,
        marginBottom: 20
    },
    detailBtn:{
        width: 116,
        height: 42,
        backgroundColor: color.BTNCOLOR,
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
        color: color.PURPLE
    }
})



// export class DevicesTag extends Component {
//   render() {
//     return (

//     )
//   }
// }

// styles = StyleSheet.create({
//     container:{
//         width: 145,
//         height: 180,
//         backgroundColor: '#fff',
//         borderRadius: 16,
//         alignItems:'center',
//         justifyContent:'center'
//     },
//     logo:{
//     flexDirection:'row',
//     marginBottom: 20
//     },
//     activeText:{
//     fontSize: 26,
//     color: color.PURPLE,
//     marginBottom: 20
//     },
//     detailBtn:{
//     width: 116,
//     height: 42,
//     backgroundColor: color.BTNCOLOR,
//     borderRadius: 22,
//     alignItems:'center',
//     justifyContent:'center'
//     },
//     detailText:{
//     fontSize: 18,
//     fontWeight: 'bold'
//     },
//     deviceName:{
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 5,
//     color: color.PURPLE
//     }
// });
// export default DevicesTag;