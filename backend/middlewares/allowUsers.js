const allowUsers = (...roles) => {
    return (req, res, next) => {
        // console.log(roles )
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ msg: "Access Denied" });
        }
        next();
    }
}
module.exports = allowUsers;