const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const vetSchema = new Schema(
  {
    email: String,
    name: String,
    image: {
      type: String,
      default: 'https://res.cloudinary.com/dxxdamndt/image/upload/v1582579640/YochiVet/doctor_bvgvvb.png'
    },
    appointments: {
      type: [Schema.Types.ObjectId],
      ref: 'Appointment',
      default: []
    },
    address: {
      type: Object,
      default: {}
    },
    studies: {
        type: Object,
        default: {}
    }
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: false //Para que guarde objetos vacios, EN USER Y VET
  }
)

vetSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('Vet', vetSchema);
