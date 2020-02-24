const express = require('express');
const router = express.Router();
const Vet = require('../models/Vet');
const passport = require('../config/passport');
const {vetSignup, vetLogin, vetProfile} = require('../controllers/vetAuth')
//Tiene el prefijo de /vet

//No hay logout porque es el mismo del user logout.
router.post('/signup', vetSignup) //TODO BIEN

router.post('/login', passport.authenticate("local"), vetLogin)

router.get('/profile', isAuth, vetProfile)

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Vet not logged in' })
}

module.exports = router
