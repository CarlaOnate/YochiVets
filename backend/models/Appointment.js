const {model, Schema} = require('mongoose')

const appointmentSchema = new Schema({
    client: Schema.Types.ObjectId,
    vet: Schema.Types.ObjectId,
    pet: Schema.Types.ObjectId,
    date: { //Tiene hora?
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