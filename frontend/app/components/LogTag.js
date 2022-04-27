import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const LogTag = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.content}>
                {props.content}
            </Text>
        </View>
        // <View style={styles.container}>
        //     <View style={styles.left}>
        //         <View style={styles.pairinfo}>
        //             <Text style={styles.title}>Type: </Text>
        //             <Text style={styles.info}>{props.type}</Text>
        //         </View>
        //         <View style={styles.pairinfo}>
        //             <Text style={styles.title}>ID: </Text>
        //             <Text style={styles.info}>{props.id}</Text>
        //         </View>
        //         <View style={styles.pairinfo}>
        //             <Text style={styles.title}>Room: </Text>
        //             <Text style={styles.info}>{props.room}</Text>
        //         </View>
        //     </View>
        //     <View style={styles.right}>
        //         <View style={styles.pairinfo}>
        //             <Text style={styles.title}>Date: </Text>
        //             <Text style={styles.info}>{props.date}</Text>
        //         </View>
        //         <View style={styles.pairinfo}>
        //             <Text style={styles.title}>Last time used: </Text>
        //             <Text style={styles.info}>{props.lastTimeUsed}</Text>
        //         </View>
        //         <View style={styles.pairinfo}>
        //             <Text style={styles.title}>Time usage: </Text>
        //             <Text style={styles.info}>{props.timeUsage}</Text>
        //         </View>
        //     </View>        
        // </View>
    );
}

export default LogTag;

const styles = StyleSheet.create({
    container: {
        width: '94%',
        backgroundColor: '#fff',
        marginTop: 5,
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    content:{
        color: 'red',
        fontSize: 16
    }
    // left: {
    //     flex: 3,
    //     marginLeft: 10
    // },
    // right: {
    //     flex: 5,
    //     marginLeft: 10
    // },
    // pairinfo: {
    //     flexDirection: 'row'
    // },
    // title: {
    //     fontWeight: 'bold',
    //     fontSize: 12
    // },
    // info: {
    //     fontSize: 12
    // }
});