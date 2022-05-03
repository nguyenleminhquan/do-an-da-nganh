import { LOGIN_FAILURE, LOGIN_SUCCESS, LOG_OUT_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS } from "./authenType"

const initState = {
    isLoading: true,
    userToken: '',
    msg: '',
}

const authenReducer = (state = initState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                isLoading: false,
                userToken: action.payload,
                msg: '',
            }
        case LOGIN_FAILURE:
            return {
                ...state, 
                msg: action.payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                msg: action.payload,
            }
        case REGISTER_FAILURE:
            return {
                ...state, 
                msg: action.payload
            }
        case LOG_OUT_SUCCESS:
            return {
                isLoading: false,
                userToken: '',
                msg: '',
            }
        default: 
            return state
    }
}

export default authenReducer
