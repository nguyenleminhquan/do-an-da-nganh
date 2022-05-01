import AsyncStorage from "@react-native-async-storage/async-storage"
import { 
    LOGIN_FAILURE, 
    LOGIN_SUCCESS, 
    LOG_OUT, 
    REGISTER_FAILURE, 
    REGISTER_SUCCESS 
} from "./authenType"

const user = AsyncStorage.getItem('user') ?? {} 

const initState = {
    loginSuccess: Object.keys(user).length === 0 ? false : true,
    registerSuccess: false,
    errorMsg: '',
    user: user,
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
            return {
                ...state, 
                registerSuccess: true,
                errorMsg: action.payload
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                registerSuccess: false, 
                errorMsg: action.payload
            }
        case LOG_OUT: 
            return {
                ...state,
                loginSuccess: false,
                user: {}
            }
        default:
            return state
    }
}

export default authenReducer