const Vet = require('../../models/Vet');

exports.vetSignup = async (req, res, next) => {
    let vetOnDB = await Vet.findOne({email: req.body.email})
    if(!vetOnDB){
      let vet = await Vet.register(req.body, req.body.password)
      if(!vet) return res.status(500).json({ msg: 'An error ocurred, signup client'})
      res.status(200).json({vet})
    } else {
      res.status(409).json({msg: 'User already registered'})
    }
}

exports.vetLogin = (req, res, next) => {
    console.log('loggedInVet', req.user)
    const { user } = req
    res.status(200).json({ user })
}

// exports.vetProfile = (req, res, next) => {
//     Vet.findById(req.user._id)
//       .then((user) => res.status(200).json({ user }))
//       .catch((err) => res.status(500).json({ err }))
// }

