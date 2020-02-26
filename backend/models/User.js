const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema(
  {
    email: String,
    name: String,
    role: {
      type: String,
      enum: ['VET', 'CLIENT'],
      default: 'CLIENT'
    },
    image: {
      type: String,
      default: 'https://res.cloudinary.com/dxxdamndt/image/upload/v1582579640/YochiVet/user_1_pfqtjd.png'
    },
    pets: [{
      type: Schema.Types.ObjectId,
      ref: 'Pet'
    }],
    appointments: [{
      type: Schema.Types.ObjectId,
      ref: 'Appointment'
    }],
    address: {
      type: Object,
      default: {}
    },
    studies: {
      type: Object,
      default: {}
    },
    availableHours: [{
      type: String,
      default: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00','14:00','15:00','16:00','17:00','18:00', '19:00', '20:00']
    }],
    about : {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: false
  }
);

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);
