import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../../api/axios'
import { 
    SET_LED_STATUS,
    SET_DOOR_STATUS,
    SET_FAN_LEVEL,
    SET_HISTORY,
} from "./deviceType"

const LED_URL = '/device/led'
const FAN_URL = '/device/fan'
const DOOR_URL = '/device/door'
const HISTORY_URL = '/user/history'

const user = AsyncStorage.getItem('user')

export const getLedStatus = () => {
    return dispatch => {
        axios.get(LED_URL)
            .then(response => {
                const ledStatus = response.data.value

                AsyncStorage.setItem('Light', JSON.stringify(ledStatus))
                dispatch(setLedStatus(ledStatus))
            })
            .catch(error => new Error(error.message))
    }
}

export const getFanStatus = () => {
    return dispatch => {
        axios.get(FAN_URL)
            .then(response => {
                const fanLevel = response.data.value

                AsyncStorage.setItem('Fan', JSON.stringify(fanLevel))
                dispatch(setFanLevel(fanLevel))
            })
            .catch(error => new Error(error.message))
    }
}

export const getDoorStatus = () => {
    return dispatch => {
        axios.get(DOOR_URL)
            .then(response => {
                const doorStatus = response.data.value

                AsyncStorage.setItem('Door', JSON.stringify(doorStatus))
                dispatch(setDoorStatus(doorStatus))
            })
            .catch(error => new Error(error.message))
    }
}

export const toggleLed = payload => {
    return dispatch => {
        axios({
            method: 'POST',
            data: payload,
            url: LED_URL,
            headers: { Authorization: `Bearer ${user.token}` },
        })
            .then(response => {
                dispatch(setLedStatus(payload.value))
                AsyncStorage.setItem('Light', JSON.stringify(payload?.value))
            })
                
            .catch(error => new Error(error.message))
    }
}

export const toggleDoor = payload => {
    return dispatch => {
        axios({
            method: 'POST',
            data: payload,
            url: DOOR_URL,
            headers: { Authorization: `Bearer ${user.token}` }
        })
            .then(response => {
                dispatch(setDoorStatus(payload.value))
                AsyncStorage.setItem('Door', JSON.stringify(payload?.value))
            })
            .catch(error => new Error(error.message))
    }
}

export const adjustFanLevel = payload => {
    return dispatch => {
        axios({
            method: 'POST',
            data: payload, 
            url: FAN_URL,
            headers: { Authorization: `Bearer ${user.token}` }
        })
            .then(response => {
                dispatch(setFanLevel(payload.value))
                AsyncStorage.setItem('Fan', JSON.stringify(payload?.value))
            })
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


export const getHistory = () => {
    return dispatch => {
        axios({
            method: 'GET',
            url: HISTORY_URL,
            headers: { Authorization: `Bearer ${user.token}`}
        })
            .then(response => {
                dispatch(setHistory(response.data))
            })
            .catch(error => new Error(error.message))
    }

    function setHistory(payload) {
        return {
            type: SET_HISTORY,
            payload,
        }
    }
}
