const Appointment = require('../../models/Appointment')
const Pet = require('../../models/Pet')
const Vet = require('../../models/Vet')

exports.createAppointment = async(req, res) => {
    const {client, pet, vet, date, location} = req.body
    let newAppointment = await Appointment.create({client, pet, vet, date, location})
    if(!newAppointment) return res.status(500).json({msg: 'An error ocurred creating the appointment'})
    await Pet.findByIdAndUpdate(pet, {$push: {appointments: newAppointment._id}})
    await Vet.findByIdAndUpdate(vet, {$push: {appointments: newAppointment._id}})
    res.status(200).json({newAppointment})
}