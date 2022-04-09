import express from 'express'
import axios from 'axios'

const route = express.Router()

route.get('/led', async (req, res, next) => {
    const { data } = await axios.get('/https://io.adafruit.com/api/v2/TSang2907/feeds/cnpm-led')
    res.json(data) 
})
route.get('/fan', (req, res, next) => {

})
route.get('/door', (req, res, next) => {

})

export default route