import {SET_ACTIVE_ROOM} from '../roomRedux/roomType'

const initState = {
    rooms: ['Living Room', 'Bedroom', 'Badroom', 'Kitchen'],
    activeRoom: 'Living Room',

}

const roomReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_ACTIVE_ROOM:
            return {
                ...state, 
                activeRoom: action.payload
            }
        default:
            return state
    }
}

export default roomReducer