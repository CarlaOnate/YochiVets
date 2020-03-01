const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('../config/passport')
const {isAuth} = require('../middleware')
let uploadCloud = require('../config/cloudinary')
const {signup, login, logout} = require('../controllers/User/auth')
const { editUser, deleteUser, getUser, getLoggedUser} = require('../controllers/User/RUDUser')
const { getAllVets, getSpecialty } = require('../controllers/User/Vets')

router.post('/signup', signup)
router.post('/login', passport.authenticate('local'), login)
router.get('/logout', logout)
router.get('/client/:id', isAuth, getUser)
router.get('/client/logged', isAuth, getLoggedUser)
router.put('/client/:id', isAuth, uploadCloud.single('image'), editUser)
router.delete('/client/:id', isAuth, deleteUser)

//VETS routes

router.post('/vet-signup', uploadCloud.single('diploma'), signup)
router.get('/allVets', getAllVets)
router.get('/vet/:specialty', getSpecialty)

module.exports = router
