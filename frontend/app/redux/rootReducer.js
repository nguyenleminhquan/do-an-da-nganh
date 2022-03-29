import { combineReducers } from "redux";
import authenReducer from "./authenRedux/authenReducer";
import deviceReducer from "./deviceRedux/deviceReducer"

const rootReducer = combineReducers({
    authen: authenReducer, 
    device: deviceReducer
})

export default rootReducer
