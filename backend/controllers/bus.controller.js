const jwt = require("jsonwebtoken");
const bus = require("../models/bus.model");

const addbus = async (req, res) => {
    const { busName, bustype, from, to, date, departureTime, arrivalTime, price, seats } = req.body;
    if (busName == "" || bustype == "" || from == "" || to == "" || date == "" || departureTime == "" || arrivalTime == "" || price == "" || seats == "") {
        res.send("empty field");
    }

    const seatArray = [];

    for (let i = 1; i <= seats; i++) {
        seatArray.push({
            seatNumber: i,
            isBooked: false
        });
    }

    const bus1 = await bus.insertOne({ busName, bustype, from, to, date, departureTime, arrivalTime, price, seats: seatArray });
    res.send("bus added");
}

const deletebus = async (req, res) => {
    const id = req.params.id;
    try {
        await bus.findByIdAndDelete(id);
    }
    catch (er) {
        console.log("error");
    }
    res.send("bus-deleted");
}

const updatebus = async (req, res) => {
    const busid = req.params.id;
    const { busName, from, to, date, departureTime, arrivalTime, price, seats } = req.body;
    const buss = await bus.findById(busid);
    buss.busName = busName;
    buss.from = from;
    buss.to = to;
    buss.date = date;
    buss.departureTime = departureTime;
    buss.arrivalTime = arrivalTime;
    buss.price = price;
    buss.seats = seats;
    await buss.save();
    res.send("bus-updated ");
}

const buses = async (req, res) => {
    const allbus = await bus.find({});
    res.send({ allbus });
}

const busByid = async (req, res) => {
    try {
        const bid = req.params.id;
        const buss = await bus.findById(bid)
        res.json(buss);
    } catch (er) {
        res.status(401).send("error in bus by id");
    }
}

module.exports = {
    addbus, updatebus, deletebus, buses, busByid
}