const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('../config/passport')
const {isAuth} = require('../middleware')
const {signup, login, profile, logout} = require('../controllers/userAuth')

router.post('/signup', signup)
router.post('/login', passport.authenticate('local'), login)
router.get('/profile', isAuth, profile)
router.get('/logout', logout)


module.exports = router
