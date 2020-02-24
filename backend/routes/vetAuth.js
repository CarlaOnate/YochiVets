const express = require('express');
const router = express.Router();
const Vet = require('../models/Vet');
const passport = require('../config/passport');
//Tiene el prefijo de /vet

router.post('/signup', (req, res, next) => {
  Vet.register(req.body, req.body.password)
    .then((user) => res.status(201).json({ user }))
    .catch((err) => res.status(500).json({ err }))
    passport.authenticate('local')(req, res, next)
    req.user ? res.status(200).json({msg: 'User logged in', user: req.user }) : res.status(401).json({msg: 'Error in login'})
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const { user } = req;
  res.status(200).json({ user })
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.status(200).json({ msg: 'Logged out' })
})

router.get('/profile', isAuth, (req, res, next) => {
  Vet.findById(req.user._id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }))
})

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Vet not logged in' })
}

module.exports = router
