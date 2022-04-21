import express from 'express'
import axios from 'axios'

const route = express.Router()

route.get('/led', async (req, res, next) => {
    try {
        const { data } = await axios.get('https://io.adafruit.com/api/v2/TSang2907/feeds/cnpm-led')
        return res.json({ value: data.last_value })
    } catch (error) {
        return next(error)
    }
})
route.get('/fan', async (req, res, next) => {
    try {
        const { data } = await axios.get('https://io.adafruit.com/api/v2/TSang2907/feeds/cnpm-fan')
        return res.json({ value: data.last_value })
    } catch (error) {
        return next(error)
    }
})
route.get('/door', async (req, res, next) => {
    try {
        const { data } = await axios.get('https://io.adafruit.com/api/v2/TSang2907/feeds/cnpm-door')
        return res.json({ value: data.last_value })
    } catch (error) {
        return next(error)
    }
})


export default route