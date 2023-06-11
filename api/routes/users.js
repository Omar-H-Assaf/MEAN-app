const express = require("express");
const router = express.Router();

const usersController = require("../controller/users.controller")

router.route("/")
.post(usersController.addUser)

router.route("/login")
    .post(usersController.loginUser)

module.exports = router;