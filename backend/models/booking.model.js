const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    busId: {
        type: String,
        required: true
    },
    selectedSeats: [Number],
    totalPrice: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    isCancel: {
        type: Boolean,
        default: false
    }
})
const booking = mongoose.model("Booking", bookingSchema);
module.exports = booking;