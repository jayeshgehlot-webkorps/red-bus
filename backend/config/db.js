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