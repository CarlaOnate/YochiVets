const Pet = require('../../models/Pet')
const User = require('../../models/User')

exports.createPet = async (req, res) => {
    const {name, age, medicalHistory, sex, breed, sterilized} = req.body
    let newPet = await Pet.create({name, age, medicalHistory, sex, breed, sterilized})
    if(!newPet) return res.status(500).json({msg: 'An error ocurred creating your pet'})
    const {pets, _id} = req.user
    await User.findByIdAndUpdate(_id, {pets: [...pets, newPet]})
    const user = await User.findById(_id)
    res.status(200).json({user, newPet})
}

exports.getPet = async(req, res) => {
    const {id} = req.params
    let pet = await Pet.findById(id)
    if(!pet) return res.status(500).json({msg: 'Pet not found or an error ocurred'})
    res.status(200).json({pet})
}

