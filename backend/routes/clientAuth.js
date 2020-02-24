const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('../config/passport')

router.post('/signup', async (req, res, next) => {
  let userOnDB = await User.findOne({email: req.body.email})
  if(!userOnDB){
    let user = await User.register(req.body, req.body.password)
    if(!user) return res.status(500).json({ msg: 'An error ocurred, signup client'})
    res.status(200).json({user})
  } else {
    res.status(409).json({msg: 'User already registered'})
  }
})  //LISTO!

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const { user } = req
  res.status(200).json({ user })
}) //Funciona!


router.get('/profile', isAuth, (req, res, next) => {
  User.findById(req.user._id)
  .then((user) => res.status(200).json({ user , msg: 'Profile route'}))
  .catch((err) => res.status(500).json({ err }))
}) //SE VE QUE FUNCIONA!

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' })
}


router.get('/logout', (req, res, next) => {
  req.logout()
  res.status(200).json({ msg: 'Logged out' })
}) //SE VE QUE SIRVE


module.exports = router
