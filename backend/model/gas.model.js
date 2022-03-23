import mongoose from 'mongoose'

const gasSchema = mongoose.Schema({
    value: Int16Array
})

export default mongoose.model('gas', doorSchema)