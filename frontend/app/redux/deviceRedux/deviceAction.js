import { TOGGLE_ON_OFF } from "./deviceType"

export const toggleOnOff = payload => {
    // payload = {name, id}
    return {
        type: TOGGLE_ON_OFF,
        payload
    }
}
