import mongoose from 'mongoose'

const tempSchema = mongoose.Schema({
    value: Decimal128
})

export default mongoose.model('temp', doorSchema)