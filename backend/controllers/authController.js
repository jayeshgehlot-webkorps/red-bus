// const user = require("../models/user.model.js");
// const jwt = require("jsonwebtoken");

// const register = async (req, res) => {
//     const { name, email, password } = req.body;
//     if (name.trim() == "") {
//         res.status(400).send("name is required");
//     }
//     else if (email.trim() == "") {
//         res.status(400).send("email is required");
//     } else if (password.toString().trim() == "") {
//         res.status(400).send("password is required");
//     }
//     else if (!email.includes("@") || !email.includes(".") || email.startsWith("@") || email.endsWith("@") || email.startsWith(".") || email.endsWith(".")) {
//         res.status(400).send("email is invalid");
//     }
//     else if (await user.findOne({ email })) {
//         res.status(400).json({
//             message: "already registered"
//         });
//     }
//     let tempUser = await user.insertOne({ name, email, password })
//     const token = jwt.sign(
//         {
//             id: tempUser._id,
//             email: tempUser.email
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//     )
//     res.json({
//         message: "register successful",
//         token
//     });
// }

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     if (email.trim() == "") {
//         res.status(400).send("email is required");
//     } else if (password.trim() == "") {
//         res.status(400).send("password is required");
//     }
//     else if (!email.includes("@") || !email.includes(".") || email.startsWith("@") || email.endsWith("@") || email.startsWith(".") || email.endsWith(".")) {
//         res.status(400).send("email is invalid");
//     }

//     let tempUser = await user.findOne({ email });

//     if (tempUser.password != password) {
//         res.status(400).send("Invalid password");
//     }
//     const token = jwt.sign(
//         {
//             id: tempUser._id,
//             email: tempUser.email
//         },
//         "secret",
//         { expiresIn: "1d" }
//     )

//     res.json({
//         message: "login successful",
//         token
//     });
// }



// module.exports = {
//     register, login
// }

const user = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).send("name is required");
    }

    if (!email || email.trim() === "") {
        return res.status(400).send("email is required");
    }

    if (!password || password.trim() === "") {
        return res.status(400).send("password is required");
    }

    if (
        !email.includes("@") ||
        !email.includes(".") ||
        email.startsWith("@") ||
        email.endsWith("@") ||
        email.startsWith(".") ||
        email.endsWith(".")
    ) {
        return res.status(400).send("email is invalid");
    }

    const existingUser = await user.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: "already registered"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const tempUser = await user.create({
        name,
        email,
        role: 'user',
        password: hashedPassword
    });

    const token = jwt.sign(
        {
            id: tempUser._id,
            email: tempUser.email,
            role: tempUser.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({
        message: "register successful",
        token
    });
};


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || email.trim() === "") {
        return res.status(400).send("email is required");
    }

    if (!password || password.trim() === "") {
        return res.status(400).send("password is required");
    }

    if (
        !email.includes("@") ||
        !email.includes(".") ||
        email.startsWith("@") ||
        email.endsWith("@") ||
        email.startsWith(".") ||
        email.endsWith(".")
    ) {
        return res.status(400).send("email is invalid");
    }

    const tempUser = await user.findOne({ email });

    if (!tempUser) {
        return res.status(400).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, tempUser.password);

    if (!isMatch) {
        return res.status(400).send("Invalid password");
    }
    const token = jwt.sign(
        {
            id: tempUser._id,
            role: tempUser.role,
            email: tempUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({
        message: "login successful",
        token
    });
};


module.exports = {
    register,
    login
};