const {model, Schema} = require('mongoose')

const petSchema = new Schema({
    name: String,
    age: { //Age in months
        type: Number,
        default: 1
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dxxdamndt/image/upload/v1582579640/YochiVet/pawprint_ovbj8t.png'
    },
    medicalHistory: { //array of strings
        type: Array,
        default: []
    },
    sex: {
        type: String,
        enum: ['Male', 'Female']
    },
    breed: {
        type: String,
        default: ''
    },
    sterilized: {
        type: Boolean,
        default: false
    },
    owner: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    appointment: {
        type: [Schema.Types.ObjectId],
        ref: 'Appointment',
        default: []
    }
})

module.exports = model('Pet', petSchema)