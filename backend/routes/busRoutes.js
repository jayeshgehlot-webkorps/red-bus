const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { addbus, updatebus, deletebus, buses, busByid } = require("../controllers/bus.controller");
const allowUsers = require("../middlewares/allowUsers");
const busRouter = express.Router();


busRouter.post("/create", authMiddleware, allowUsers("admin", "superadmin"), addbus);
busRouter.patch("/update/:id", authMiddleware, allowUsers("admin", "superadmin"), updatebus);
busRouter.delete("/delete/:id", authMiddleware, allowUsers("admin", "superadmin"), deletebus);
busRouter.get("/buses", buses);
busRouter.get("/byid/:id", authMiddleware, busByid);

module.exports = busRouter;