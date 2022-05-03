import { ScrollView, View, StyleSheet, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import color from "../misc/color"
import { setActiveRoom } from "../redux/roomRedux/roomActions"

function RoomLists() {
    const rooms = useSelector(state => state.room.rooms)
    const activeRoom = useSelector(state => state.room.activeRoom)
    const dispatch = useDispatch()

    return (
        <View style={styles.roomLists}>
            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {rooms.map(room => (
                    <Text
                        key={room}
                        style={[styles.roomItem, activeRoom === room ? styles.roomActive : null ]}
                        onPress={() => dispatch(setActiveRoom(room))}
                    >{room}</Text>

                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    roomLists: {
        flexDirection: 'row',
        marginVertical: 12
    },
    roomItem: {
        fontSize: 20,
        paddingHorizontal: 20,
        color: color.BRIGHTTEXT,
        paddingVertical: 6
    },
    roomLists: {
        flexDirection: 'row',
        marginVertical: 12,
    },
    roomItem: {
        fontSize: 20,
        paddingHorizontal: 20,
        paddingVertical: 6,
        color: color.BRIGHTTEXT,
    },
    roomActive: {
        backgroundColor: '#ffb600',
        borderRadius: 22,
        color: color.DARK,
        fontWeight: 'bold'
    }
})

export default RoomLists