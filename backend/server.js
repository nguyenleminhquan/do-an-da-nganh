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

const connectUrl = `mqtt://io.adafruit.com:1883`

const client = mqtt.connect(connectUrl, {
    clientId: 558429,
    clean: true,
    connectTimeout: 4000,
    username: 'TSang2907',
    reconnectPeriod: 1000,
})

// const topic = 'TSang2907/feeds/cnpm-led'
// const topic1 = 'TSang2907/feeds/cnpm-fan'

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
