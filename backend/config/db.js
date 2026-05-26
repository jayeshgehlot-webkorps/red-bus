const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = () =>  {
    mongoose.connect(process.env.API_DB)
    .then(() => {
        console.log("db connected ");
        return;
    })
    .catch((er) => {
        console.log(er);
        return;
    });
}

module.exports = connectDB;

