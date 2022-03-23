import mongoose from 'mongoose'

const ledSchema = mongoose.Schema({
    value: Int16Array
})

export default mongoose.model('led', doorSchema)