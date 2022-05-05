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


export default route