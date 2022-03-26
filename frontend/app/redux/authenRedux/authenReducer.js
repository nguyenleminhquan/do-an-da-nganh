import { LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS } from "./authenType"

const initState = {

}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            // Do something
        case LOGIN_FAILURE:
            // Do something
        case REGISTER_SUCCESS:
            // Do something
        case REGISTER_FAILURE:
            // Do something
        default:
            return state
    }
}

export default reducer