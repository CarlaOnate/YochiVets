const express = require('express');
const router = express.Router();
const Vet = require('../models/Pet');
const passport = require('../config/passport')
const {isAuth} = require('../middleware')
const {createAppointment, getAppointment, confirmAppointment, editAppointment, deleteAppointment, clientAppointments} = require('../controllers/Appointment')

router.post('/', isAuth, createAppointment)
router.get('/:id', isAuth, getAppointment)
router.get('/client/:id', clientAppointments)
router.get('/confirm/:id', isAuth, confirmAppointment)
router.put('/:id', isAuth, editAppointment)
router.delete('/:id', isAuth, deleteAppointment)

module.exports = router
