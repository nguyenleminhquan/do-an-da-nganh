import axios from 'axios'
import { 
    SET_LED_STATUS,
    SET_DOOR_STATUS,
    SET_FAN_LEVEL,
} from "./deviceType"

const LED_URL = '/device/led'
const FAN_URL = 'device/fan'
const DOOR_URL = '/device/door'

export const getLedStatus = () => {
    return dispatch => {
        axios.get(LED_URL)
            .then(response => dispatch(setLedStatus(response.data)))
            .catch(error => new Error(error.message))
    }
}

export const getFanStatus = () => {
    return dispatch => {
        axios.get(FAN_URL)
            .then(response => dispatch(setFanLevel(response.data)))
            .catch(error => new Error(error.message))
    }
}

export const getDoorStatus = () => {
    return dispatch => {
        axios.get(DOOR_URL)
            .then(response => dispatch(setDoorStatus(response.data)))
            .catch(error => new Error(error.message))
    }
}

export const toggleLed = payload => {
    return dispatch => {
        axios.post(LED_URL, payload)
            .then(response => {
                dispatch(setLedStatus(payload))
                console.log('toggle Successfull')
            })
                
            .catch(error => new Error(error.message))
    }
}

export const toggleDoor = payload => {
    return dispatch => {
        axios.post(DOOR_URL, payload)
            .then(response => {
                dispatch(setDoorStatus(payload))
                console.log('toggle successuful')
            })
            .catch(error => new Error(error.message))
    }
}

export const adjustFanLevel = payload => {
    return dispatch => {
        axios.get(FAN_URL, payload)
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
