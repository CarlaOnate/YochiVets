const User = require('../../../models/User')
const Pet = require('../../../models/Pet')
const Appointment = require('../../../models/Appointment')

exports.getUser = async (req,res,next) => {
    let {id} = req.params
     await User.findById(id).populate('appointments').populate('pets').populate({
        path: 'pets',
        populate: {
            path: 'appointments',
            model: 'Appointment'
        }
    }).then((user)=>{
        if(!user) return res.status(404).json({msg:'User not found, not logged in'})
        return res.status(200).json({ user })
    }).catch(e=>res.status(404).json({msg: e}))
}

exports.logged = async (req, res, next) => {
    let logged = await User.find(req.user._id).populate('pets').populate('appointments')
    res.status(200).json({msg: 'LoggedUser', logged})
}

exports.editUser = async (req, res, next) => { //LISTO!
    const {id} = req.params
    const {email, name, address, studies} = req.body
    const {secure_url } = req.file
    await User.findByIdAndUpdate(id, {email, name, image: secure_url, address, studies})
    let newUser = await User.findById(id)
    res.status(200).json({newUser})
}

exports.deleteUser = async (req, res, next) => {
    let user = await User.findById(req.params.id)
    if(!user) return res.status(500).json({msg: 'user cannot be deleted because it was not found'})
    if(user.role === 'CLIENT'){
        user.pets.forEach(async pet => {
            let petDB = await Pet.findById(pet)
            if(!petDB) return res.status(404).json({msg: 'client has no pets'})
            petDB.appointments.forEach(async app => await Appointment.findByIdAndDelete(app)) //borra todas las citas de ese pet
            await Pet.findByIdAndDelete(pet) //borra a todos los pets del array
        })
    } else {
        user.appointments.forEach(async app => await Appointment.findByIdAndDelete(app))
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({msg: 'User deleted'})
}
