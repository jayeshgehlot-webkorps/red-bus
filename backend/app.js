require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const user = require("./models/user.model.js");
const authRouter = require("./routes/authRoutes.js");
const bookingRouter = require("./routes/bookingRoutes.js");
const busRouter = require("./routes/busRoutes.js");
const adminRouter = require("./routes/adminRoutes.js");
const paymentRouter = require("./routes/paymentRoute.js");


app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json());
app.get("/", (req, res) => {
    res.send("done");
})

app.use("/auth", authRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/bus", busRouter);
app.use("/admin", adminRouter);
app.use("/api/payment", paymentRouter);

module.exports = app;

