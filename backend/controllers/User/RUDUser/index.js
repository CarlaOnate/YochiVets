const User = require('../../../models/User')

exports.getUser = async (req,res,next) => {
    let {id} = req.params
    let user =  await User.findById(id).populate('pets').populate('appointments')
    console.log(user)
    return res.status(200).json({ user })
}

exports.editUser = async (req, res, next) => {
    const {id} = req.params
    const {data} = req.body
    let user = await User.findByIdAndUpdate(id, {data})
}

exports.deleteUser = async (req, res, next) => {
    await User.findByIdAndDelete(req.body._id)
    let user = await User.findById(req.body._id)
    !user ? res.status(200).json({msg: 'User deleted'}) : res.status(500).json({msg: 'Sth went wrong'})
}