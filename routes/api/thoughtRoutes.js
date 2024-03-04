const router = require("express").Router();

const { getThoughts, createThought, getSingleThought } = require("../../controllers");

//  /api/thoughts/
router.route("/").get(getThoughts).post(createThought);

//  api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought);

module.exports = router;