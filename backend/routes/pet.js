const express = require('express');
const router = express.Router();
const Vet = require('../models/Pet');
const passport = require('../config/passport')
const {isAuth} = require('../middleware')
const {createPet, getPet} = require('../controllers/Pet')

router.post('/', isAuth, createPet)
router.get('/:id', isAuth, getPet)

module.exports = router
