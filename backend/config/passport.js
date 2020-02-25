const User = require('../models/User')
const Vet = require('../models/Vet')
const passport = require('passport')

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// passport.use(Vet.createStrategy())
// passport.serializeUser(Vet.serializeUser())
// passport.deserializeUser(Vet.deserializeUser())


module.exports = passport;
