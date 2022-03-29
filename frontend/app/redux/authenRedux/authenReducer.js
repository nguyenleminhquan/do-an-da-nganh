import AsyncStorage from "@react-native-async-storage/async-storage"
import { LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS } from "./authenType"

const initState = {
    isLogin: false,
    // user: JSON.parse(window.localStorage.getItem('user')) && {}
    user: AsyncStorage.getItem('user') ?? {} 
}

const authenReducer = (state = initState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            // Do something
            return {
                ...state, 
                isLogin: true,
                user: action.payload
            }
        case LOGIN_FAILURE:
            // Do something'
            return {
                ...state, 
                isLogin: true,
                user: {}
            }
        case REGISTER_SUCCESS:
            // Do something
        case REGISTER_FAILURE:
            // Do something
        default:
            return state
    }
}

export default authenReducer