const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDB');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
