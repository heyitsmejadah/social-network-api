const { User, Thought } = require("../models");

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

// update one user
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

//   delete one user
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
      await Thought.deleteMany({ _id: { $in: deleteUser.thoughts }});
      res.json({ message: "User and associated thoughts deleted!"});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addFriend(req,res) {
    try {
      const addFriend = await User.findByIdAndUpdate(
        {_id: req.params.userId},
        { $addToSet: {friends: req.params.friendId} },
        {new: true}
      );

      if (!addFriend) {
        return res.status(404).json({
          message: "No friend found by that ID!"
        });
      }

      res.json(addFriend);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  async deleteFriend(req,res) {
    try {
      const deleteFriend = await User.findByIdAndDelete(
        {_id: req.params.userId},
        {$addToSet: {friends: req.params.friendId}},
        {new: true}
      );

      if (!deleteFriend) {
        return res.status(404).json({
          message: "No friend found by that ID!"
        });
      }

      res.json(deleteFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};
