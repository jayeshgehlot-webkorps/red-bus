const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const allowRoles = require("../middlewares/allowUsers");
const { makeAdmin, removeAdmin, alladmins } = require("../controllers/adminController");
const adminRouter = express();

adminRouter.patch("/make-admin", authMiddleware, allowRoles("superadmin"), makeAdmin)
adminRouter.patch("/remove-admin/:id", authMiddleware, allowRoles("superadmin"), removeAdmin)
adminRouter.get("/all-admin", authMiddleware, allowRoles("superadmin"),alladmins)
module.exports = adminRouter;
// admin/make-admin