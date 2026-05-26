const mongoose = require("mongoose");
const app = require("./app");
const db = require("./config/db");
const port = process.env.PORT || process.env.port || 3000;

app.listen(port, () => {
    console.log("server is running "+port);
})