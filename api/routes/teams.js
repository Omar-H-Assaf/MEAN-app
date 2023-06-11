const express = require("express");
const router = express.Router();

const teamsController = require("../controller/teams.controller");
const driversController = require("../controller/drivers.controller")

router.route("/")
    .get(teamsController.getAllTeams)
    .post(teamsController.addOneTeam);

router.route("/:teamId")
    .delete(teamsController.deleteOneTeam)
    .get(teamsController.getOneTeam)
    .put(teamsController.updateOneTeam)
    .patch(teamsController.updateOneTeam);

router.route("/:teamId/drivers")
    .get(driversController.getAllDriversByTeamId)
    .post(driversController.addOneDriver);

router.route("/:teamId/drivers/:driverId")
    .get(driversController.getOneDriverById)
    .delete(driversController.deleteDriverById)
    .patch(driversController.updateDriverById)
    .put(driversController.updateDriverById);

module.exports = router;