const User = require('../models/User')
const passport = require('passport')

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//Necesito crear otra estrategia para poder loggear al vet.
// passport.use(Vet.createStrategy())
// passport.serializeUser(Vet.serializeUser())
// passport.deserializeUser(Vet.deserializeUser())


module.exports = passport;
