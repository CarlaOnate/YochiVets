const {model, Schema} = require('mongoose')

const appointmentSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    vet: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pet: [{
        type: Schema.Types.ObjectId,
        ref: 'Pet'
    }],
    date: {
        type: Date,
        default: Date.now()
    },
    location: {
        type: Object,
        default: {}
    },
    confirmed: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Appointment', appointmentSchema)