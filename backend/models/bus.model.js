const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const busSchema = new mongoose.Schema({
    busName: {
        type: String,
        require: true
    },
    from: {
        type: String,
        require: true
    },
    to: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    departureTime: String,
    arrivalTime: String,
    price: Number,
    bustype: String,
    seats: [
        {
            seatNumber: Number,
            isBooked: {
                type: Boolean,
                default: false
            }
        }
    ]
})


const bus = mongoose.model("Bus", busSchema);
module.exports = bus;