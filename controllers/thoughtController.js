const { Thought } = require("../models/Thought");

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    console.log(Thought);
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
};
