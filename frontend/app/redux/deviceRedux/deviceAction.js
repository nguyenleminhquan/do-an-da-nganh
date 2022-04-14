import axios from 'axios'
import { 
    STATUS_LED,
    STATUS_DOOR,
    STATUS_FAN,
    SET_LED_STATUS,
    SET_DOOR_STATUS,
    SET_FAN_LEVEL,
} from "./deviceType"

export const toggleOnOff = payload => {
    // payload = {name, id}
    return {
        type: TOGGLE_ON_OFF,
        payload
    }
}

export const getLedStatus = () => {
    return dispatch => {
        axios.get('http://localhost:5000/device/led')
            .then(response => dispatch(setLedStatus(response.data)))
            .catch(error => new Error(error.message))
    }
}

export const getFanStatus = () => {
    return dispatch => {
        axios.get('http://localhost:5000/device/led')
            .then(response => dispatch(setFanLevel(response.data)))
            .catch(error => new Error(error.message))
    }
}

export const getDoorStatus = () => {
    return dispatch => {
        axios.get('http://localhost:5000/device/led')
            .then(response => dispatch(setDoorStatus(response.data)))
            .catch(error => new Error(error.message))
    }
}

export const toggleLed = payload => {
    return dispatch => {
        axios.post('http://localhost:5000/device/led', payload)
            .then(response => {
                dispatch(setLedStatus(payload))
                console.log('toggle Successfull')
            })
                
            .catch(error => new Error(error.message))
    }
}

export const toggleDoor = payload => {
    return dispatch => {
        axios.post('http://localhost:5000/device/door', payload)
            .then(response => {
                dispatch(setDoorStatus(payload))
                console.log('toggle successuful')
            })
            .catch(error => new Error(error.message))
    }
}

export const adjustFanLevel = payload => {
    return dispatch => {
        axios.get('http://localhost:5000/device/fan', payload)
            .then(response => dispatch(setFanLevel(payload)))
            .catch(error => new Error(error.message))
    }
}

export const setLedStatus = payload => {
    return {
        type: SET_LED_STATUS,
        payload
    }
}

export const setDoorStatus = payload => {
    return {
        type: SET_DOOR_STATUS,
        payload
    }
}

export const setFanLevel = payload => {
    return {
        type: SET_FAN_LEVEL,
        payload
    }
}
