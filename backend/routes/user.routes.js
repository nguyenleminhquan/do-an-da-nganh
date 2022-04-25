import express from 'express'
import {
    loginUser,
    registerUser,
    getHistory
} from '../controller/user.controller.js'
import verifyToken from '../middlewares/verifyToken.js'

const route = express.Router()

route.post('/register', registerUser)
route.post('/login', loginUser)
route.get('/history', verifyToken, getHistory)

export default route