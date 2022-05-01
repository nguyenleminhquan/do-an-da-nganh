import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    fullname: String,
    myhome: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home'
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