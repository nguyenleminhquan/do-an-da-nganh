import { 
    SET_FAN_LEVEL,
    SET_LED_STATUS,
    SET_DOOR_STATUS,
} from "./deviceType"

const initState = {
    // ledStatus: 0, 
    devices: [
        {
            name: 'Fan',
            iconName: 'fan',
            active: '0',
        },
        {
            name: 'Door',
            iconName: 'door-open',
            active: '0', 
        },
        {
            name: 'Light',
            iconName: 'lightbulb',
            active: '0'
        },
    ],

}

const deviceReducer = (state = initState, action) => {
    let updatedDevices
    switch (action.type) {
        // case TOGGLE_ON_OFF:
        //     const targetDevice = state.devices.find(element => action.payload.name === element.name)

        //     const updatedDevice = {
        //         ...targetDevice, 
        //         isOn: isOn.map(function(value, index) {
        //             if (index === action.payload.id) {
        //                 return !value
        //             }
        //             return value
        //         })
        //     }
        //     return {
        //         ...state, 
        //         updatedDevice
        //     }
        case SET_LED_STATUS:
            updatedDevices = state.devices.map(device => {
                if (device.name === 'Light') {
                    return {
                        ...device,
                        active: action.payload
                    }
                }
                return device
            })
            return {
                ...state,
                devices: updatedDevices
            }
        case SET_FAN_LEVEL:
            updatedDevices = state.devices.map(device => {
                if (device.name === 'Fan') {
                    return {
                        ...device,
                        active: action.payload
                    }
                }
                return device
            })
            return {
                ...state,
                devices: updatedDevices
            }
        case SET_DOOR_STATUS:
            updatedDevices = state.devices.map(device => {
                if (device.name === 'Door') {
                    return {
                        ...device,
                        active: action.payload
                    }
                }
                return device
            })
            return {
                ...state,
                devices: updatedDevices
            }
        
        default: 
            return state
    }
}

export default deviceReducer
