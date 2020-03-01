const User = require('../../../models/User')
const Pet = require('../../../models/Pet')
const Appointment = require('../../../models/Appointment')

exports.getAllVets = async (req,res,next) => {
    let vets = await User.find({role: 'VET'})
    if(vets){
        res.status(200).json({vets})
    } else {
        res.status(500).json({msg: 'Sth went wrong in getAllVets'})
    }
}

exports.getSpecialty = async (req, res, next) => {
    const {specialty} = req.params
    console.log(specialty, 'inside get specialty')
    let vets = await User.find({studies: {specialty: {$eq: specialty}}}).populate('appointments') //NO SIRVE
    if(vets){
        res.status(200).json({vets})
    } else {
        res.status(500).json({msg: 'Sth went wrong in getSpecialty'})
    }
}