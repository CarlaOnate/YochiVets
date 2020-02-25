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
