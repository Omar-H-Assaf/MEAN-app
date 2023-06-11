const express = require("express");
const router = express.Router();

const teamsRoute = require("./teams");
const usersRoute = require("./users");

router.use("/teams", teamsRoute);
router.use("/users", usersRoute);

module.exports = router;