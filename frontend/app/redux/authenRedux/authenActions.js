// import axios from '../../api/axios'
import axios from 'axios'
import { LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS } from "./authenType"

const LOGIN_URL = '/user/login'
const REGISTER_URL = '/user/register'

export const login = payload => {
    return dispatch => {
        axios.post('http://localhost:5000/user/login', payload)
            .then(response => {
                const user = response.data

                localStorage.setItem('user', JSON.stringify(user))
                dispatch(loginSuccess(user))
                console.log('Login Successfully!!!')
            })
            .catch(error => {
                const errorMsg = error.response.data.msg

                console.log(errorMsg)
                dispatch(loginFailure(errorMsg))
            })
    }
    function loginSuccess(payload) { return { type: LOGIN_SUCCESS, payload } }
    function loginFailure(payload) { return { type: LOGIN_FAILURE, payload } }
}

export const register = payload => {
    return dispatch => {
        axios.post('http://localhost:5000/user/register', payload) 
            .then(response => {
                const users = response.data
                dispatch(registerSuccess(users))
                console.log('successful')
            })
            .catch(error => {
                const errorMsg = error.msg
                dispatch(registerFailure(errorMsg))
            })
    }
    function registerSuccess(payload) { return { type: REGISTER_SUCCESS, payload } }
    function registerFailure(payload) { return { type: REGISTER_FAILURE, payload } }
}

