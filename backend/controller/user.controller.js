import createError from 'http-errors'
import bcrypt from 'bcrypt'
import User from '../model/user.model.js'
import generateToken from '../middlewares/generateToken.js'

const registerUser = async (req, res, next) => {
    const body = req.body
    // find exist account
    const exist = await User.findOne({ username: body.username })
    
    if (exist) {
        return next(createError(400, "Username is exist"))
    } else {    
        let newUser = new User(body)
        try {
            console.log(1)
            newUser = await newUser.save()
            return res.json({
                msg: "Register successfully"
            })
            next()
        } catch (error) {
            return next(error)
        }
    }
}

const loginUser = async (req, res, next) => {
    const { username, password } = req.body
    const exist = await User.findOne({ username: username })

    if (exist) {
        const match = await bcrypt.compare(password, exist.password)

        // if match
        if (match) {
            const token = generateToken({ username })
            return res.json({
                id: exist._id,
                username: exist.username,
                fullname: exist.fullname,
                home: exist.myhome,
                history: exist.history,
                token: token
            })
        } else {
            return next(createError(400, "Password doesn't match"))
        }
    } else {
        return next(createError(400, "No username found"))
    }
}

export {
    loginUser,
    registerUser
}