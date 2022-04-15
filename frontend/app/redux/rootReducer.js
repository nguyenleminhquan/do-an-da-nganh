import { combineReducers } from "redux";
import authenReducer from "./authenRedux/authenReducer";
import deviceReducer from "./deviceRedux/deviceReducer"
import roomReducer from "./roomRedux/roomReducer";

const rootReducer = combineReducers({
    authen: authenReducer, 
    device: deviceReducer,
    room: roomReducer
})

export default rootReducer
