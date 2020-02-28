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
    console.log(vets)
}