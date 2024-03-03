const router = require("express").Router();

const { createUser } = require("../../controllers");

// /api/users/
router.route("/").post(createUser);

module.exports = router;