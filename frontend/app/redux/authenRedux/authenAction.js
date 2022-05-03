import axios from '../../api/axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOG_OUT_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS } from './authenType';

const LOGIN_URL = '/user/login'
const REGISTER_URL = '/user/register'

const asynSetFunc = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch(e) {
        console.log(e)
    }
}

const asynRemoveFunc = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch(e) {
        console.log(e)
    }
}

export const login = userInfo => {
    return dispatch => {
        axios.post(LOGIN_URL, userInfo)
            .then(res => {
                const token = res.data.token

                asynSetFunc('userToken', token)
                dispatch(loginSuccess(token))
                console.log('Login Successfully!')
            })
            .catch(err => {
                const errMsg = err.response.data.msg

                dispatch(loginFailure(errMsg))
                console.log('Login Failure!')
            })
    }   

    function loginSuccess(token) {
        return {
            type: LOGIN_SUCCESS,
            payload: token
        }
    }

    function loginFailure(errMsg) {
        return {
            type: LOGIN_FAILURE,
            payload: errMsg
        }
    }
}

export const register = userInfo => {
    return dispatch => {
        axios.post(REGISTER_URL, userInfo) 
            .then(res => {
                const msg = res.data

                dispatch(registerSuccess(msg))
                console.log('Register Successfully!')
            })
            .catch(err => {
                const errMsg = err.response.data.msg

                dispatch(registerFailure(errMsg))
                console.log('Register Failure!')
            })
    }

    function registerSuccess(msg) {
        return {
            type: REGISTER_SUCCESS,
            payload: msg
        }
    }
    
    function registerFailure(errMsg) {
        return {
            type: REGISTER_FAILURE,
            payload: errMsg
        }
    }
}

export const logOut = () => {
    return dispatch => {
        asynRemoveFunc('userToken')
        dispatch(logOutSuccess())
    }
    function logOutSuccess() {
        return {
            type: LOG_OUT_SUCCESS
        }
    }
}
