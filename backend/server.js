import express from 'express'
import mqtt from 'mqtt'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import APINotFound from './middlewares/APINotFound.js'
import errorHandler from './middlewares/errorHandler.js'

import userRoutes from './routes/user.routes.js'
import deviceRoutes from './routes/device.routes.js'

connectDB()
dotenv.config()
const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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
const connectUrl = `mqtt://io.adafruit.com:1883`
const client = mqtt.connect(connectUrl, {
    clientId: 558429,
    clean: true,
    connectTimeout: 4000,
    username: 'TSang2907',
    reconnectPeriod: 1000,
    password: 'aio_yrDc79deqXpMCSR10xjfMLteoy7O'
})
const led = 'TSang2907/feeds/cnpm-led'
const fan = 'TSang2907/feeds/cnpm-fan'
const door = 'TSang2907/feeds/cnpm-door'

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

client.on('message', (led, payload) => {
    console.log('Received Message:', led, payload.toString())
})
client.on('message', (fan, payload) => {
    console.log('Received Message:', fan, payload.toString())
})
client.on('message', (door, payload) => {
    console.log('Received Message:', door, payload.toString())
})

app.post('/device/led', (req, res, next) => {
    const value = req.body.value
    client.publish(led, value, { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
    res.json({ msg: "Successfully" })
})

app.post('/device/fan', (req, res, next) => {
    const value = req.body.value
    client.publish(fan, value, { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })

    res.json({ msg: "Succesfully" })
})

app.post('/device/door', (req, res, next) => {
    const value = req.body.value
    client.publish(door, value, { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
    res.json({ msg: "Succesfully" })
})

app.use('/user', userRoutes)
app.use('/device', deviceRoutes)

app.get('/', (req, res, next) => {
    res.send('API is running!')
})

app.use(APINotFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
