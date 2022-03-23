import express from 'express'
import mqtt from 'mqtt'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/user.routes.js'

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
    password: 'aio_FuQE07rCHZRmaV3wdlYKHX5pVnSD',
    // reconnectPeriod: 1000,
})

const topic = '/feeds/cnpm-temp'
client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`)
    })
    client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
})
client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
})


app.use('/user', userRoutes)

app.get('/', (req, res, next) => {
    res.send('API is running!')
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})