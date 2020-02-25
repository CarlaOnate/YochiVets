const User = require('../../../models/User')

exports.getUser = async (req,res,next) => {
    let {id} = req.params
    let user =  await User.findById(id).populate('pets')
    // user.pets.forEach(el => {
    //     el.populate('appointment') //PROBAR CEHCAR ESTO!
    // })
    return res.status(200).json({ user })
}

exports.editUser = async (req, res, next) => { //LISTO!
    const {id} = req.params
    const {email, name, image, address} = req.body
    await User.findByIdAndUpdate(id, {email, name, image, address})
    let newUser = await User.findById(id)
    res.status(200).json({newUser})
}

// exports.deleteUser = async (req, res, next) => {
//     await User.findByIdAndDelete(req.body._id)
//     let user = await User.findById(req.body._id)
//     !user ? res.status(200).json({msg: 'User deleted'}) : res.status(500).json({msg: 'Sth went wrong'})
// }
