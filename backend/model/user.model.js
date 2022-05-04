import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    fullname: String,
    home: {
        door: {
            type: String,
            default: "-1"
        },
        led: {
            type: String,
            default: "-1"
        },
        fan: {
            type: String,
            default: "-1"
        }
    },
    history: [{ type: String }]
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        next()
    } else {
        this.password = bcrypt.hashSync(this.password, 10)
        next()
    }
})

export default mongoose.model('User', userSchema)