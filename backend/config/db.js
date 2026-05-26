const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const db = mongoose.connect(process.env.API_DB)
    .then(() => {
        console.log("db connected");
    })
    .catch((er) => {
        console.log(er);
    });
module.exports = db;

// const mongoose = require("mongoose");

// let isConnected = false;

// const connectDB = async () => {
//     if (isConnected) return;

//     try {
//         console.log(process.env.API_DB);
//         const db = await mongoose.connect(process.env.API_DB);
//         isConnected = db.connections[0].readyState;
//         console.log("DB connected");
//     } catch (err) {
//         console.log("DB error:", err);
//         throw err;
//     }
// };

// module.exports = connectDB;
