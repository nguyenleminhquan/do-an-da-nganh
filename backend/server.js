import express from 'express'
import mqtt from 'mqtt'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { Server } from 'socket.io'
import axios from 'axios'
import cors from 'cors'

import connectDB from './config/db.js'
import APINotFound from './middlewares/APINotFound.js'
import errorHandler from './middlewares/errorHandler.js'
import verifyToken from './middlewares/verifyToken.js'
import userRoutes from './routes/user.routes.js'
import deviceRoutes from './routes/device.routes.js'
import User from './model/user.model.js'

connectDB()
dotenv.config()
const app = express()
const port = 5000

app.use(cors())

const io = new Server(4000)
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

let mailOption_gas = {
    from: 'doandanganh.hk212@gmail.com',
    to: 'fx.nguyenleminhquan@gmail.com',
    subject: '',
    text: ''
}

let mailOption_temp = {
    from: 'doandanganh.hk212@gmail.com',
    to: 'fx.nguyenleminhquan@gmail.com',
    subject: '',
    text: ''
}
// 
io.on('connection', socket => {
    console.log('Connect ' + socket.id)
    setInterval(async () => {
        try {
            const gas = await axios.get('https://io.adafruit.com/api/v2/TSang2907/feeds/cnpm-gas')
            const temp = await axios.get('https://io.adafruit.com/api/v2/TSang2907/feeds/cnpm-temp')
            const gas_data = gas.data.last_value
            const temp_data = temp.data.last_value
    
            if (parseInt(gas_data) > 300) {
                const time = new Date()
                socket.emit('warning_gas', time)
                mailOption_gas.subject = 'Cảnh báo rò rỉ khí gas: ' + time
                mailOption_gas.text = 'Có dấu hiệu bất thường về nồng độ khí gas cao vào lúc ' + time
                transporter.sendMail(mailOption_gas, (err, success) => {
                    if (err) console.error(err)
                    else {
                        console.log('Send mail successfully')
                    }
                })
            }
            if (parseFloat(temp_data) > 38) {
                const time = new Date()
                socket.emit('warning_temp', time)
                mailOption_temp.subject = 'Cảnh báo nhiệt độ cao: ' + time
                mailOption_temp.text = 'Nhiệt độ đang cao vào lúc ' + time
                transporter.sendMail(mailOption_temp, (err, success) => {
                    if (err) console.error(err)
                    else {
                        console.log('Send mail successfully')
                    }
                })
            }
        } catch (error) {
            console.error(error)            
        }
    }, 1000)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const connectUrl = `mqtt://io.adafruit.com:1883`
const client = mqtt.connect(connectUrl, {
    clientId: 558429,
    clean: true,
    connectTimeout: 4000,
    username: 'TSang2907',
    reconnectPeriod: 1000,
    password: process.env.ADAFRUIT_KEY
})
const led = 'TSang2907/feeds/cnpm-led'
const fan = 'TSang2907/feeds/cnpm-fan'
const door = 'TSang2907/feeds/cnpm-door'

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

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

app.post('/device/led', verifyToken, async (req, res, next) => {
    const value = req.body.value
    client.publish(led, value, { qos: 0, retain: false }, (error) => {
        if (error) {
            return next(error)
        }
    })
    const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
    const history = `${req.username} has turned ${value == '0' ? 'off' : 'on'} the led at ${date}`
    const user = await User.findOne({ username: req.username })
    user.home.led = value
    user.history.push(history)
    await user.save()
    return res.json({ msg: "Successfully" })
})

app.post('/device/fan', verifyToken, async (req, res, next) => {
    const value = req.body.value
    client.publish(fan, value, { qos: 0, retain: false }, (error) => {
        if (error) {
            return next(error)
        }
    })
    const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
    const history = `${req.username} has adjusted the fan speed to ${value} at ${date}`
    const user = await User.findOne({ username: req.username })
    user.home.fan = value
    user.history.push(history)
    await user.save()
    return res.json({ msg: "Succesfully" })
})

app.post('/device/door', verifyToken, async (req, res, next) => {
    const value = req.body.value
    client.publish(door, value, { qos: 0, retain: false }, (error) => {
        if (error) {
            return next(error)
        }
    })
    const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
    const history = `${req.username} has ${value == '90' ? 'closed' : 'opened'} the door at ${date}`
    const user = await User.findOne({ username: req.username })
    user.home.door = value
    user.history.push(history)
    await user.save()
    return res.json({ msg: "Succesfully" })
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

