const express = require("express");
const router = express.Router();

const teamsRoute = require("./teams")

router.use("/teams", teamsRoute)

module.exports = router;