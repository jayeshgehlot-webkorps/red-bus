const connectDB = require("./config/db");
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
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
console.log("outside")
app.use(express.json());
app.use(async (req, res, next) => {
    try {
        console.log(process.env.API_DB)
        await connectDB();   
        next();
    } catch (err) {
        res.status(500).json({ error: "DB connection failed" });
    }
});
app.get("/", (req, res) => {
    res.send("done");
})

app.use("/auth", authRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/bus", busRouter);
app.use("/admin", adminRouter);
app.use("/api/payment", paymentRouter);

module.exports = app;

