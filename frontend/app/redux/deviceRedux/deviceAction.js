import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../api/axios'
import { SET_DOOR_STATUS, SET_FAN_LEVEL, SET_HUMI_STATUS, SET_LED_STATUS, SET_TEMP_STATUS } from './deviceType'

const LED_API = '/device/led'
const DOOR_API = '/device/door'
const FAN_API = '/device/fan'
const HUMI_API = '/device/humi'
const TEMP_API = '/device/temp'


const asyncSetFunc = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
        console.log(err)
    }
}

export const getLedStatus = (token) => {
    return dispatch => {
        axios.get(LED_API, {
            headers: { Authorization: `Bearer ${token}` }
        })
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

export const getDoorStatus = (token) => {
    return dispatch => {
        axios.get(DOOR_API, {
            headers: { Authorization: `Bearer ${token}` }
        })
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

export const getFanStatus = (token) => {
    return dispatch => {
        axios.get(FAN_API, {
            headers: { Authorization: `Bearer ${token}` }
        })
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

export const getTempStatus = (token) => {
    return dispatch => {
        axios.get(TEMP_API, {
            headers: { Authorization: `Bearer ${token}` }
        }) 
            .then(res => {
                const tempValue = res.data.value

                console.log(tempValue)

                asyncSetFunc('Temp', tempValue)
                dispatch(setTempStatus(tempValue))
            })
            .catch(err => {
                console.log(err)
            })
    }
}


export const getHumiStatus = (token) => {
    return dispatch => {
        axios.get(HUMI_API, {
            headers: { Authorization: `Bearer ${token}` }
        }) 
            .then(res => {
                const humiValue = res.data.value

                asyncSetFunc('Humi', humiValue)
                dispatch(setHumiStatus(humiValue))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const toggleLed = (payload, token) => {
    return dispatch => {
        axios.post(LED_API, payload, {
            headers: { Authorization: `Bearer ${token}` }
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
            headers: { Authorization: `Bearer ${token}` }
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
            headers: { Authorization: `Bearer ${token}` }
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
function setTempStatus(payload) { return { type: SET_TEMP_STATUS, payload } }
function setHumiStatus(payload) { return { type: SET_HUMI_STATUS, payload } }
