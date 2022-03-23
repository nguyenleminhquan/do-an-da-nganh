import mongoose from 'mongoose'

const homeSchema = mongoose.Schema({
    door: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Door'
    },
    fan: {
        type: mongoosse.Schema.Types.ObjectId,
        ref: 'Fan'
    },
    gas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gas'
    },
    humi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Humi'
    },
    inf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inf'
    },
    led: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Led'
    },
    temp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Temp'
    }
})

export default mongoose.model('Home', homeSchema)