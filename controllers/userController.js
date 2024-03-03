const { User } = require("../models/Users");

module.exports = {
    // get all users
    async getUsers(req, res) {
        console.log(User);
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
        console.log("This is the User data:", User);
        try {
            const createUser = await User.create(req.body);
            // console.log("This is the User data:", User);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },
};