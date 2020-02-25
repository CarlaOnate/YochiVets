const User = require('../../models/User')

exports.signup = async (req, res, next) => {
    let userOnDB = await User.findOne({email: req.body.email})
    if(!userOnDB){
      let user = await User.register(req.body, req.body.password)
      if(!user) return res.status(500).json({ msg: 'An error ocurred, signup client'})
      res.status(200).json({user})
    } else {
      res.status(409).json({msg: 'User already registered'})
    }
}

exports.login = (req, res, next) => {
  const { user } = req
  res.status(200).json({ user })
}

exports.profile = (req, res, next) => {
  console.log(req.user)
  User.findById(req.user._id)
  .then((user) => res.status(200).json({ user , msg: 'Profile route'}))
  .catch((err) => res.status(500).json({ err }))
}

exports.logout = (req, res, next) => {
  req.logout()
  res.status(200).json({ msg: 'Logged out' })
}