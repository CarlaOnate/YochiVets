const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const {isAuth} = require('../middleware')
const {createPet, getPet, editPet, deletePet} = require('../controllers/Pet')
//prefijo pet

router.post('/', isAuth, createPet)
router.get('/:id', isAuth, getPet)
router.put('/:id', isAuth, editPet)
router.delete('/:id', isAuth, deletePet)

module.exports = router
