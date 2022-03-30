import { SET_ACTIVE_ROOM } from "./roomType"

export const setActiveRoom = payload => {
    return {
        type: SET_ACTIVE_ROOM,
        payload,
    }
}