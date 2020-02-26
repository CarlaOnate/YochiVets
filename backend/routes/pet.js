const express = require('express');
const router = express.Router();
let uploadCloud = require('../config/cloudinary')
const {isAuth} = require('../middleware')
const {createPet, getPet, editPet, deletePet} = require('../controllers/Pet')
//prefijo pet

router.post('/', isAuth, createPet)
router.get('/:id', isAuth, getPet)
router.put('/:id', isAuth, uploadCloud.single('image'), editPet)
router.delete('/:id', isAuth, deletePet)

module.exports = router
