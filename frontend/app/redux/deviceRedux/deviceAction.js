import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../api/axios'
import { SET_DOOR_STATUS, SET_FAN_LEVEL, SET_LED_STATUS } from './deviceType'

const LED_API = '/device/led'
const DOOR_API = '/device/door'
const FAN_API = '/device/fan'

const asyncSetFunc = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
        console.log(err)
    }
}

export const getLedStatus = () => {
    return dispatch => {
        axios.get(LED_API)
            .then(res => {
                const ledStatus = res.data.value

                asyncSetFunc('Light', ledStatus)
                dispatch(setLedStatus(ledStatus))
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}

export const getDoorStatus = () => {
    return dispatch => {
        axios.get(DOOR_API)
            .then(res => {
                const doorStatus = res.data.value

                asyncSetFunc('Door', doorStatus)
                dispatch(setDoorStatus(doorStatus))
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}

export const getFanStatus = () => {
    return dispatch => {
        axios.get(FAN_API)
            .then(res => {
                const fanLevel = res.data.value
                
                asyncSetFunc('Fan', fanLevel)
                dispatch(setFanLevel(fanLevel))
            })
            .catch(err => {
                console.log(err.message)
            })
        
    }       
}

export const toggleLed = (payload, token) => {
    return dispatch => {
        axios.post(LED_API, payload, {
            // headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                dispatch(setLedStatus(payload.value))
                asyncSetFunc('Light', payload.value)
            })
            .catch(err => {
                console.log(err.message)
            }) 
    }
}

export const toggleDoor = (payload, token) => {
    return dispatch => {
        axios.post(DOOR_API, payload, {
            // headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                dispatch(setDoorStatus(payload.value))
                asyncSetFunc('Door', payload.value)
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}

export const adjustFanLevel = (payload, token) => {
    return dispatch => {
        axios.post(FAN_API, payload, {
            // headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                dispatch(setFanLevel(payload.value))
                asyncSetFunc('Fan', payload.value)
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}

function setLedStatus(payload) { return { type: SET_LED_STATUS, payload } }
function setDoorStatus(payload) { return { type: SET_DOOR_STATUS, payload } }
function setFanLevel(payload) { return { type: SET_FAN_LEVEL, payload } }
