const router = require("express").Router();

const { createUser, getUsers, getSingleUser, updateUser, deleteUser } = require("../../controllers");

// /api/users/
router.route("/").get(getUsers).post(createUser);

// /api/users/:id
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;