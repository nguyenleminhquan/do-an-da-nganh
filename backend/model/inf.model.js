import mongoose from 'mongoose'

const infSchema = mongoose.Schema({
    value: Int16Array
})

export default mongoose.model('inf', doorSchema)