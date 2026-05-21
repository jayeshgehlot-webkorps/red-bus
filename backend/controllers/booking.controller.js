const jwt = require("jsonwebtoken");
const booking = require("../models/booking.model");
const bus = require("../models/bus.model");

const add = async (req, res) => {
    try {
        const { busId, selectedSeats, totalPrice, bookingDate } = req.body;
        if (busId == "" || selectedSeats == "" || totalPrice == "" || bookingDate == "") {
            res.json({ message: "fields empty" });
        }
        const userId = req.user.id;
        let uBooking = await booking.insertOne({ userId, busId, selectedSeats, totalPrice, bookingDate })
        let selectedbus = await bus.findById(busId);
        selectedSeats.forEach(element => {
            selectedbus.seats[element - 1].isBooked = true;
        });

        selectedbus.save();
        res.send("BusBooking - add")
    }
    catch (er) {
        res.json("error during booking" + er);
    }
}

const cancel = async (req, res) => {
    try {
        const bookingId = req.params.id;

        const selectedBooking = await booking.findById(bookingId);

        if (!selectedBooking) {
            return res.status(404).json({ msg: "Booking not found" });
        }

        if (selectedBooking.userId.toString() !== req.user.id.toString()) {
            return res.status(403).json({ msg: "Not allowed" });
        }

        if (selectedBooking.isCancel) {
            return res.status(400).json({ msg: "Already cancelled" });
        }

        const busData = await bus.findById(selectedBooking.busId);

        if (!busData) {
            return res.status(404).json({ msg: "Bus not found" });
        }

        selectedBooking.selectedSeats.forEach((seatNo) => {
            if (busData.seats[seatNo - 1]) {
                busData.seats[seatNo - 1].isBooked = false;
            }
        });

        await busData.save();

        selectedBooking.isCancel = true;
        await selectedBooking.save();

        res.json({ msg: "Booking cancelled successfully" });

    } catch (err) {
        console.log("Error during cancel:", err);
        res.status(500).json({ msg: "Error cancelling booking" });
    }
};


const mybookings = async (req, res) => {
    try {
        const uid = req.user.id;
        const data = await booking.find({ userId: uid });
        res.send(data);
    }
    catch (er) {
        res.send("error during my bookings")
    }
}

module.exports = {
    add, cancel, mybookings
}
