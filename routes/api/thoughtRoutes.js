const router = require("express").Router();

const { getThoughts } = require("../../controllers");

//  /api/thoughts/
router.route("/").get(getThoughts);

module.exports = router;