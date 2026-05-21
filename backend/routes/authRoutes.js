const express = require("express");
const { login, register, logout } = require("../controllers/authController.js");
const { model } = require("mongoose");

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);


module.exports = authRouter;