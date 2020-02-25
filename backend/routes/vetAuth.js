const express = require('express');
const router = express.Router();
const Vet = require('../models/Vet');
const passport = require('../config/passport')
const {isAuth} = require('../middleware')
const {vetSignup, vetLogin, vetProfile, getVet} = require('../controllers/vetAuth')
//Tiene el prefijo de /vet

router.post('/signup', vetSignup) 
router.post('/login', passport.authenticate("local"), vetLogin)
router.get('/profile', vetProfile)


module.exports = router
