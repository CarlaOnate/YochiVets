
exports.isAuth = (req, res, next)  => {
    console.log(req.user, req.isAuthenticated())
    req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Not logged in' })
}