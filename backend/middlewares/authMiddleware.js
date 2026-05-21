const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const auth = async(req, res, next) => {
    try {
        const authoriz = req.headers.authorization;
        if (!authoriz || !authoriz.startsWith("Bearer ")) {
            return res.status(400).json({
                message: "token is missing"
            })
        }
        const token = authoriz.split(" ")[1];
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const foundUser = await User.findById(verifyToken.id);

        if (!foundUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        req.user = verifyToken;
        next();
    }
    catch (err) {
        return res.status(400).json({
            message: "Invalid token"
        })
    }
}
module.exports = auth;