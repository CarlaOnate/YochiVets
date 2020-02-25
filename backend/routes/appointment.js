const express = require('express');
const router = express.Router();
const Vet = require('../models/Pet');
const passport = require('../config/passport')
const {isAuth} = require('../middleware')
const {createAppointment} = require('../controllers/Appointment')

router.post('/', isAuth, createAppointment)
// router.get('/:id', isAuth, getPet)

module.exports = router
