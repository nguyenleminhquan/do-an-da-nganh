import express from 'express'
import axios from 'axios'
import verifyToken from '../middlewares/verifyToken.js'
import User from '../model/user.model.js'

const route = express.Router()

route.get('/led', verifyToken, async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.username })
        if (user.home.led == "-1") {
            const { data } = await axios.get('https://io.adafruit.com/api/v2/TSang2907/feeds/cnpm-led')
            user.home.led = data.last_value
            await user.save()

            return res.json({ value: user.home.led })
        } else {
            return res.json({ value: user.home.led })
        }
    } catch (error) {
        return next(error)
    }
})

route.get('/fan', verifyToken, async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.username })
        if (user.home.fan == "-1") {
            const { data } = await axios.get('https://io.adafruit.com/api/v2/TSang2907/feeds/cnpm-fan')
            user.home.fan = data.last_value
            await user.save()

            return res.json({ value: user.home.fan })
        } else {
            return res.json({ value: user.home.fan })
        }
    } catch (error) {
        return next(error)
    }
})

route.get('/door', verifyToken, async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.username })
        if (user.home.door == "-1") {
            const { data } = await axios.get('https://io.adafruit.com/api/v2/TSang2907/feeds/cnpm-door')
            user.home.door = data.last_value
            await user.save()

            return res.json({ value: user.home.door })
        } else {
            return res.json({ value: user.home.door })
        }
    } catch (error) {
        return next(error)
    }
})

route.get('/gas', verifyToken, async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.username })
        if (user.home.gas == "-1") {
            const { data } = await axios.get('https://io.adafruit.com/api/v2/TSang2907/feeds/cnpm-gas')
            user.home.gas = data.last_value
            await user.save()

            return res.json({ value: user.home.gas })
        } else {
            return res.json({ value: user.home.gas })
        }
    } catch (error) {
        return next(error)
    }
})

route.get('/temp', verifyToken, async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.username })
        if (user.home.temp == "-1") {
            const { data } = await axios.get('https://io.adafruit.com/api/v2/TSang2907/feeds/cnpm-temp')
            user.home.temp = data.last_value
            await user.save()

            return res.json({ value: user.home.temp })
        } else {
            return res.json({ value: user.home.temp })
        }
    } catch (error) {
        return next(error)
    }
})


route.get('/humi', verifyToken, async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.username })
        if (user.home.humi == "-1") {
            const { data } = await axios.get('https://io.adafruit.com/api/v2/TSang2907/feeds/cnpm-humi')
            user.home.humi = data.last_value
            await user.save()

            return res.json({ value: user.home.humi })
        } else {
            return res.json({ value: user.home.humi })
        }
    } catch (error) {
        return next(error)
    }
})

export default route