const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createPayment, verifyPayment } = require("../controllers/paymentController");
const paymentRouter = express.Router();

paymentRouter.post("/create-order", authMiddleware, createPayment);
paymentRouter.post("/verify-payment",authMiddleware,verifyPayment);

module.exports = paymentRouter;