const User = require('../../../models/User')
const passport = require('passport')

exports.signup = async (req, res, next) => {
    let userOnDB = await User.findOne({email: req.body.email})
    if(!userOnDB){
      let user = await User.register(req.body, req.body.password)
      if(!user) return res.status(500).json({ msg: 'An error ocurred, signup client'})
      res.status(200).json({user})
      passport.authenticate('local')(req, res, next)
    } else {
      res.status(409).json({msg: 'User already registered'})
    }
}

exports.login = (req, res, next) => {
  const { user } = req
  res.status(200).json({ user })
}

exports.logout = (req, res, next) => {
  req.logout()
  res.status(200).json({ msg: 'Logged out' })
}