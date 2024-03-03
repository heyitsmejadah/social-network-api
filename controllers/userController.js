const { User } = require("../models");

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // create one user
  async createUser(req, res) {
    try {
      const createUser = await User.create(req.body);
      res.json(createUser);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  // get one user
  async getSingleUser(req, res) {
    try {
      const getSingleUser = await User.findOne({ _id: req.params.userId });

      if (!getSingleUser) {
        return res.status(404).json({
          message: "No user exists!",
        });
      }
      res.json(getSingleUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const getUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!getUser) {
        return res.status(404).json({
          message: "No user found for that ID!",
        });
      }
      res.json(getUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const deleteUser = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!deleteUser) {
        return res.status(404).json({
          message: "No user found for that ID!",
        });
      }
      res.json(deleteUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
