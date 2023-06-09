const callbackify = require("util").callbackify
const { driverSubDocument } = require("../../utils");

const teamDriversFindAllExecWithCallBack = callbackify((offset, count, teamId) => {
    return driverSubDocument(teamId).skip(offset).limit(count).exec();
});

const teamFindOneExecWithCallBack = callbackify((teamId) => {
    return driverSubDocument(teamId);
});

const teamDriverSaveExecWithCallBack = callbackify((team)=>{
    return team.save();
});

const getAllDrivers = (req, res) => {
    let offset = 0;
    let count = 5;
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({
            "message": "QueryString Offset and Count should benumbers"
        });
        return;
    }
    if (count > maxCount) {
        res.status(400).json({ "message": "Cannot exceed count of " + maxCount });
        return;
    }

    teamDriversFindAllExecWithCallBack(offset, count, req.params.teamId, (err, drivers) => {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = drivers;
        }
        res.status(response.status).json(response.message);
    });
}

const getOneDriverById = (req, res) => {
    teamFindOneExecWithCallBack(req.params.teamId, (err, team) => {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (team.drivers.id(req.params.driverId) === null) {
            response.status = 400;
            response.message = "Driver Not Found!";
        } else {
            response.status = 200;
            response.message = team.drivers.id(req.params.driverId);
        }
        res.status(response.status).json(response.message);
    })
}

const addOneDriver = (req, res) => {
    teamFindOneExecWithCallBack(req.params.teamId, (err, team) => {
        team.drivers.push(req.body);
        teamDriverSaveExecWithCallBack(team, (err) => {
            const response = { status: 200, message: [] };
            if (err) {
                response.status = 500;
                response.message = err;
            } else {
                response.status = 201;
                response.message = req.body;
            }
            res.status(response.status).json(response.message);
        });
    });
}

const deleteDriverById = (req, res) => {
    const response = { status: 200, message: [] };
    teamFindOneExecWithCallBack(req.params.teamId, (err, team) => {
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (team.drivers.id(req.params.driverId) === null) {
                response.status = 400;
                response.message = "Driver Not Found!";
                res.status(response.status).json(response.message);
            } else {
                team.drivers.remove(team.drivers.id(req.params.driverId));
                teamDriverSaveExecWithCallBack(team, (err) => {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    } else {
                        response.status = 201;
                        response.message = "Deleted!";
                    }
                    res.status(response.status).json(response.message);
                });
            }
    });
}

const updateDriverById = (req, res) => {
    const isFullUpdate = req.method === "PUT";
    teamFindOneExecWithCallBack(req.params.teamId, (err, team) => {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            if (team.drivers.id(req.params.driverId) === null) {
                response.status = 400;
                response.message = "Driver Not Found!";
                res.status(response.status).json(response.message);
            } else {
                const updatedDriver = team.drivers.id(req.params.driverId);
                updatedDriver.driverName = req.body.driverName || isFullUpdate ? req.body.driverName : updatedDriver.driverName;
                updatedDriver.driverNumber = req.body.driverNumber || isFullUpdate ? req.body.driverNumber : updatedDriver.driverNumber;
                updatedDriver.country = req.body.country || isFullUpdate ? req.body.country : updatedDriver.country;
                updatedDriver.podiums = req.body.podiums || isFullUpdate ? req.body.podiums : updatedDriver.podiums;
                updatedDriver.points = req.body.points || isFullUpdate ? req.body.points : updatedDriver.points;
                updatedDriver.grandsPrixEntered = req.body.grandsPrixEntered || isFullUpdate ? req.body.grandsPrixEntered : updatedDriver.grandsPrixEntered;
                updatedDriver.worldChampionships = req.body.worldChampionships || isFullUpdate ? req.body.worldChampionships : updatedDriver.worldChampionships;

                teamDriverSaveExecWithCallBack(team, (err) => {
                    if (err) {
                        response.status = 500;
                        response.message = err;
                    } else {
                        response.status = 201;
                        response.message.push(updatedDriver);
                    }
                    res.status(response.status).json(response.message);
                });
            }
        }
    });
}

module.exports = {
    getAllDrivers,
    getOneDriverById,
    addOneDriver,
    deleteDriverById,
    updateDriverById
}