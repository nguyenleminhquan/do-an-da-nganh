import { TOGGLE_ON_OFF } from "./deviceType"

const initState = {
    devices: [
        {
            name: 'Fans',
            iconName: 'fan',
            isOn: [false,true]
        },
        {
            name: 'Doors',
            iconName: 'door-open',
            isOn: [false]
        },
        {
            name: 'Lights',
            iconName: 'lightbulb',
            isOn: [false]
        }
    ],

}

const deviceReducer = (state = initState, action) => {
    switch (action.type) {
        case TOGGLE_ON_OFF:
            const targetDevice = state.devices.find(element => action.payload.name === element.name)

            const updatedDevice = {
                ...targetDevice, 
                isOn: isOn.map(function(value, index) {
                    if (index === action.payload.id) {
                        return !value
                    }
                    return value
                })
            }
            return {
                ...state, 
                updatedDevice
            }
        default: 
            return state
    }
}

export default deviceReducer
