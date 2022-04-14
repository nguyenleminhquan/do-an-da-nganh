import AsyncStorage from "@react-native-async-storage/async-storage"
import { LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS } from "./authenType"

const initState = {
    loginSuccess: false,
    errorMsg: '',
    user: AsyncStorage.getItem('user') ?? {} 
}

const authenReducer = (state = initState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            // Do something
            return {
                ...state,
                loginSuccess: true,
                user: action.payload
            }
        case LOGIN_FAILURE:
            // Do something'
            return {
                ...state, 
                loginSuccess: false,
                errorMsg: action.payload
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