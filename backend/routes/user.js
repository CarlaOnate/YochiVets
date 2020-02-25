const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('../config/passport')
const {isAuth} = require('../middleware')
const {signup, login, logout} = require('../controllers/User/auth')
const { editUser, deleteUser, getUser} = require('../controllers/User/RUDUser')

router.post('/signup', signup)
router.post('/login', passport.authenticate('local'), login)
router.get('/logout', logout)
router.get('/client/:id', isAuth, getUser)
router.put('/client/:id', isAuth, editUser)
router.delete('/client/:id', isAuth, deleteUser)

// router.get('/vetProfile', vetProfile)

module.exports = router
