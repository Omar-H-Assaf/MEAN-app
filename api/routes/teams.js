const express = require("express");
const router = express.Router();

const teamsController = require("../controller/teams.controller");
const driversController = require("../controller/drivers.controller")

router.route("/teams")
    .get(teamsController.getAllTeams)
    .post(teamsController.addOneTeam);

router.route("/teams/:teamId")
    .delete(teamsController.deleteOneTeam)
    .get(teamsController.getOneTeam)
    .put(teamsController.updateOneTeam)
    .patch(teamsController.updateOneTeam);

router.route("/teams/:teamId/drivers")
    .get(driversController.getAllDrivers)
    .post(driversController.addOneDriver);

router.route("/teams/:teamId/drivers/:driverId")
    .get(driversController.getOneDriverById)
    .delete(driversController.deleteDriverById)
    .patch(driversController.updateDriverById)
    .put(driversController.updateDriverById);

module.exports = router;