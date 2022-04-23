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
            active: '',
        },
        {
            name: 'Door',
            iconName: 'door-open',
            active: '', 
        },
        {
            name: 'Light',
            iconName: 'lightbulb',
            active: ''
        },
    ],

}

const deviceReducer = (state = initState, action) => {
    let updatedDevices
    switch (action.type) {
        case SET_LED_STATUS:
            updatedDevices = state.devices.map(device => {
                if (device.name === 'Light') {
                    console.log(action.payload)
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
