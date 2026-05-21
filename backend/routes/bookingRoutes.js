const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { add, cancel, mybookings } = require("../controllers/booking.controller");
const bookingRouter = express.Router();


bookingRouter.post("/add", authMiddleware, add);
bookingRouter.delete("/cancel/:id", authMiddleware, cancel);
bookingRouter.get("/mybookings", authMiddleware, mybookings);


module.exports = bookingRouter;
