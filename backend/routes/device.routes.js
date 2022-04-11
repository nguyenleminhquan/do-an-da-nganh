import express from 'express'
import axios from 'axios'
import mqtt from 'mqtt'

const route = express.Router()
const connectUrl = `mqtt://io.adafruit.com:1883`
const client = mqtt.connect(connectUrl, {
    clientId: 558429,
    clean: true,
    connectTimeout: 4000,
    username: 'TSang2907',
    reconnectPeriod: 1000,
})

const led = 'TSang2907/feeds/cnpm-led'
const fan = 'TSang2907/feeds/cnpm-fan'
const door = 'TSang2907/feeds/cnpm-door'

// client.on('connect', () => {
//     console.log('Connected')
//     client.subscribe([topic], () => {
//         console.log(`Subscribe to topic '${topic}'`)
//     })
//     client.subscribe([topic1], () => {
//         console.log(`Subscribe to topic '${topic1}'`)
//     })
//     client.publish(topic, '1', { qos: 0, retain: false }, (error) => {
//         if (error) {
//             console.error(error)
//         }
//     })
//     client.publish(topic1, '0', { qos: 0, retain: false }, (error) => {
//         if (error) {
//             console.error(error)
//         }
//     })})

// client.on('message', (topic, payload) => {
//     console.log('Received Message:', topic, payload.toString())
// })

// client.on('message', (topic1, payload) => {
//     console.log('Received Message:', topic1, payload.toString())
// })

client.on('connect', () => {
    console.log('Connect Adafruit successfully!')
    client.subscribe([led], () => {
        console.log('Subscribe to led')
    })

    client.subscribe([fan], () => {
        console.log('Subscribe to fan')
    })

    client.subscribe([door], () => {
        console.log('Subscribe to door')
    })
})



route.get('/led', async (req, res, next) => {
    try {
        const { data } = await axios.get('https://io.adafruit.com/api/v2/TSang2907/feeds/cnpm-led')
        res.json({ value: data.last_value })
    } catch (error) {
        next(error)
    }
})
route.get('/fan', async (req, res, next) => {
    try {
        const { data } = await axios.get('https://io.adafruit.com/api/v2/TSang2907/feeds/cnpm-fan')
        res.json({ value: data.last_value })
    } catch (error) {
        next(error)
    }
})
route.get('/door', async (req, res, next) => {
    try {
        const { data } = await axios.get('https://io.adafruit.com/api/v2/TSang2907/feeds/cnpm-door')
        res.json({ value: data.last_value })
    } catch (error) {
        next(error)
    }
})


export default route