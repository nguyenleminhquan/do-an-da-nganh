import mongoose from 'mongoose'

const humiSchema = mongoose.Schema({
    value: Int16Array
})

export default mongoose.model('humi', doorSchema)