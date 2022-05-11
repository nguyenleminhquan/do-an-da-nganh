import { SET_DOOR_STATUS, SET_FAN_LEVEL, SET_HUMI_STATUS, SET_LED_STATUS, SET_TEMP_STATUS } from "./deviceType"

const initState = {
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
            active: '',
        }
    ],
    sensors: [
        {
            name: 'Temp',
            value: ''
        },
        {
            name: 'Humi',
            value: ''
        }
    ]
}

const deviceReducer = (state = initState, action) => {
    let updatedDevices, updatedSensors
    switch(action.type) {
        case SET_LED_STATUS:
            updatedDevices = state.devices.map(device => {
                if (device.name === 'Light') return {
                    ...device,
                    active: action.payload
                } 
                else return device
            })
            return {
                ...state, 
                devices: updatedDevices
            }
        case SET_DOOR_STATUS:
            updatedDevices = state.devices.map(device => {
                if (device.name === 'Door') return {
                    ...device,
                    active: action.payload
                }
                else return device
            })
            return {
                ...state, 
                devices: updatedDevices
            }
        case SET_FAN_LEVEL:
            updatedDevices = state.devices.map(device => {
                if (device.name === 'Fan') return {
                    ...device,
                    active: action.payload
                }
                else return device
            })
            return {
                ...state, 
                devices: updatedDevices
            }
        case SET_TEMP_STATUS:
            updatedSensors = state.sensors.map(sensor => {
                if (sensor.name === 'Temp') return {
                    ...sensor,
                    value: action.payload
                } 
                else return sensor
            })
            return {
                ...state, 
                sensors: updatedSensors
            }
        case SET_HUMI_STATUS:
            updatedSensors = state.sensors.map(sensor => {
                if (sensor.name === 'Humi') return {
                    ...sensor,
                    value: action.payload
                } 
                else return sensor
            })
            return {
                ...state, 
                sensors: updatedSensors
            }
        default: 
            return state
    }
}

export default deviceReducer
