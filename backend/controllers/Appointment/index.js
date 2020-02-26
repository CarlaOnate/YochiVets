const Appointment = require('../../models/Appointment')
const User = require('../../models/User')
const Pet = require('../../models/Pet')

exports.createAppointment = async(req, res, next) => {
    const {client, pet, vet, date, location} = req.body
    let newAppointment = await Appointment.create({client, pet, vet, date, location})
    if(!newAppointment) return res.status(500).json({msg: 'An error ocurred creating the appointment'})
    await Pet.findByIdAndUpdate(pet, {$push: {appointments: newAppointment._id}})
    await User.findByIdAndUpdate(vet, {$push: {appointments: newAppointment._id}})
    res.status(200).json({newAppointment})
}

exports.confirmAppointment = async (req, res) => {
    const {id} = req.params
    await Appointment.findByIdAndUpdate(id, {confirmed: true})
    const appointment = await Appointment.findById(id)
    if(!appointment) res.status(500).json({msg: 'Appointment not found, id incorrect'})
    res.status(200).json({appointment})
}

exports.getAppointment = async (req, res) => {
    const {id} = req.params
    const appointment = await Appointment.findById(id).populate('pet').populate('vet').populate('client')
    if(!appointment) res.status(500).json({msg: 'Appointment not found'})
    res.status(200).json({appointment})
}

exports.editAppointment = async (req, res) => {
    const {id} = req.params
    const {pet, date, location} = req.body
    await Appointment.findByIdAndUpdate(id, { pet, date, location})
    let appointment = await Appointment.findById(id)
    if(!appointment) return res.status(500).json({msg: 'Appointment not found, id not correct'})
    res.status(200).json({appointment})
}

exports.deleteAppointment = async (req, res) => {
    const {id} = req.params
    let appointment = await Appointment.findById(id)
    await Pet.findByIdAndUpdate(appointment.pet, {$pull: {appointments: appointment._id}})
    await User.findByIdAndUpdate(appointment.vet, {$pull: {appointments: appointment._id}})
    let pet = await Pet.findById(appointment.pet)
    let vet = await User.findById(appointment.vet)
    await Appointment.findByIdAndDelete(id)
    res.status(200).json({pet, vet})
}