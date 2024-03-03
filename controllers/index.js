const Thought = require("./thoughtController");
const User = require("./userController");

module.exports = { ...Thought, ...User };