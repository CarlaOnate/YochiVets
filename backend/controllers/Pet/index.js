const Pet = require('../../models/Pet')
const User = require('../../models/User')
const Appointment = require('../../models/Appointment')

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
    let pet = await Pet.findById(id).populate('appointments')
    if(!pet) return res.status(500).json({msg: 'Pet not found or an error ocurred'})
    res.status(200).json({pet})
}

exports.editPet = async (req, res, next) => {
    const {id} = req.params
    const {name, age, medicalHistory, sex, breed, sterilized} = req.body
    const {secure_url} = req.file
    await Pet.findByIdAndUpdate(id, {name, age, medicalHistory, image: secure_url, sex, breed, sterilized})
    let pet = await Pet.findById(id)
    res.status(200).json({pet})
}

exports.deletePet = async (req, res, next) => {
    const {id} = req.params
    const user = req.user
    let pet = await Pet.findById(id)
    let petName = pet.name
    user.pets.splice(user.pets.indexOf(pet._id), 1)
    await User.findByIdAndUpdate(req.user._id, {pets: user.pets})
    await Pet.findByIdAndDelete(id)
    res.status(200).json({msg: `Dear ${petName} rest in pet heaven );`})
}
