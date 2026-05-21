
const User = require("../models/user.model");

const makeAdmin = async (req, res) => {
    try {
        const { email } = req.body;

        if (req.user.role !== "superadmin") {
            return res.status(403).json({ msg: "Not authorized" });
        }
        const user = await User.findOne({
            email: email,
            role: { $ne: "superadmin" }
        });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        if (user.role === "admin") {
            return res.status(400).json({ msg: "Already admin" });
        }
        user.role = "admin";
        await user.save();

        res.json({
            msg: "User promoted to admin",
            user
        });

    } catch (err) {
        console.log("error:", err);
        res.status(500).json({ msg: "Error updating role" });
    }
};

const alladmins = async (req, res) => {
    try {
        const response = await User.find({ role: "admin" }).select({ password: 0 });
        // console.log(response)
        res.send(response)
    }
    catch (er) {
        console.log(er)
    }
}

const removeAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.role !== "superadmin") {
            return res.status(403).json({ msg: "Not authorized" });
        }
      
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (user.role === "superadmin") {
            return res.json({ msg: "Cannot remove superadmin" });
        }
        user.role = "user";
        await user.save();

        res.json({ msg: "Admin removed successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error removing admin" });
    }
};

module.exports = {
    makeAdmin,
    removeAdmin,
    alladmins
};