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
    await Pet.findByIdAndUpdate(id, {name, age, medicalHistory, sex, breed, sterilized})
    let pet = await Pet.findById(id)
    res.status(200).json({pet})
}

exports.deletePet = async (req, res, next) => {
    const {id} = req.params
    const user = await User.findById(req.user._id)
    let pet = await Pet.findById(id)
    let petName = pet.name
    if(user.pets){
        user.pets.forEach((petid) => {
            if(petid === pet._id) return User.findByIdAndUpdate(req.user._id, { $pull: { pets: petid}}) //Esto no borra ñaña
        })
    }
    if(pet.appointments) {
        pet.appointments.forEach(async app => {
            await Appointment.findByIdAndDelete(app)
        })
    }
    await Pet.findByIdAndDelete(id)
    res.status(200).json({msg: `Dear ${petName} rest in pet heaven );`})
}
