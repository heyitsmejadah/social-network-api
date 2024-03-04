const { Thought, User } = require("../models");

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

  // create one thought
  async createThought(req, res) {
    try {
      const createThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId},
        { $addToSet: { thoughts: createThought._id}},
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but no user found with that data"
        })
      }

      res.json(createThought);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId})

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID"});
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateThought(req,res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $set: req.body},
        { runValidators: true, new: true}
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this ID!"});
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteThought(req,res) {
    try {
      const deletedThought = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId},
        { runValidators: true, new: true}
      );

      if (!deletedThought) {
        return res.status(404).json({ message: "No thought with this ID!"})
      }

      res.json(deletedThought);
      
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};
