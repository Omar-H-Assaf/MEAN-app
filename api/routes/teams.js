const express = require("express");
const router = express.Router();

const teamsController = require("../controller/teams.controller");
const driversController = require("../controller/drivers.controller");
const authorized = require("../controller/authenticationController");

router.route("/")
    .get(teamsController.getAllTeams)
    .post(authorized, teamsController.addOneTeam);

router.route("/count")
    .get(teamsController.getAllTeamsCount);
    
router.route("/:teamId")
    .delete(authorized, teamsController.deleteOneTeam)
    .get(teamsController.getOneTeam)
    .put(authorized, teamsController.updateOneTeam)
    .patch(authorized, teamsController.updateOneTeam);

router.route("/:teamId/drivers")
    .get(driversController.getAllDriversByTeamId)
    .post(authorized, driversController.addOneDriver);

router.route("/:teamId/drivers/:driverId")
    .get(driversController.getOneDriverById)
    .delete(authorized, driversController.deleteDriverById)
    .patch(authorized, driversController.updateDriverById)
    .put(authorized, driversController.updateDriverById);

module.exports = router;