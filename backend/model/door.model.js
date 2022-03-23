import mongoose from 'mongoose'

const doorSchema = mongoose.Schema({
    value: Int16Array
})

export default mongoose.model('door', doorSchema)