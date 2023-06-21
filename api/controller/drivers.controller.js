const mongoose = require("mongoose");

const Team = mongoose.model(process.env.TEAM_MODEL_NAME);

const response = { status: process.env.SUCCESS_STATUS, message: [] };

const _setResponse = (status, message) => {
    if (response.status === process.env.SUCCESS_STATUS && response.status === process.env.ERROR_STATUS_SERVER_STATUS) {
        response.status = status;
    }
    response.message = message;
}

const _sendResponse = (res) => {
    res.status(response.status).json(response.message);
}

const _checkTeamExist = (teamId) => {
    return new Promise((resolve, reject) => {
        Team.findById(teamId)
            .then(team => {
                if (team !== null) {
                    resolve(team)
                } else {
                    response.status = process.env.ERROR_STATUS_NOT_FOUND_STATUS;
                    reject(process.env.TEAM_ERROR_STATUS_NOT_FOUND_MESSAGE)
                }
            });
    });
}

const _checkDriverExisit = (drivers, driverId) => {
    const driver = drivers.id(driverId);
    return new Promise((resolve, reject) => {
        if (driver === null) {
            response.status = process.env.ERROR_STATUS_NOT_FOUND_STATUS;
            reject(process.env.DRIVER_ERROR_STATUS_NOT_FOUND_MESSAGE);
        } else {
            resolve(driver)
        }
    });
}

const _selectDriver = (team) => {
    return new Promise((resolve, rejects) => {
        if (team !== null && team.drivers) {
            resolve(team.drivers);
        } else {
            response.status = process.env.ERROR_STATUS_NOT_FOUND_STATUS;
            rejects(process.env.DRIVER_ERROR_STATUS_NOT_FOUND_MESSAGE);
        }
    })
}

const _driversSelected = (offset, count, drivers) => {
    return new Promise((resolve, rejects) => {
        const driverSelected = drivers.splice(offset, count);
        if (driverSelected.length > 0) {
            resolve(driverSelected)
        } else {
            rejects(process.env.DRIVER_ERROR_STATUS_NO_MORE_MESSAGE)
        }
    })
}

const _deleteDriver = (team, driverId) => {
    const driver = team.drivers.id(driverId);
    return new Promise((resolve, rejects) => {
        if (driver === null) {
            response.status = process.env.ERROR_STATUS_NOT_FOUND_STATUS;
            rejects(process.env.DRIVER_ERROR_STATUS_NOT_FOUND_MESSAGE);
        } else {
            team.drivers.remove(driver);
            resolve(team, driver);
        }
    })
}

const _updateDriver = (team, driver, driverId, isFullUpdate) => {
    return new Promise((resolve, rejects) => {
        if (driver === null) {
            response.status = process.env.ERROR_STATUS_NOT_FOUND_STATUS;
            rejects(process.env.DRIVER_ERROR_STATUS_NOT_FOUND_MESSAGE);
        } else {
            const updatedDriver =
                team.drivers.id(driverId);
            updatedDriver.driverName =
                driver.driverName || isFullUpdate ? driver.driverName : updatedDriver.driverName;
            updatedDriver.driverNumber =
                driver.driverNumber || isFullUpdate ? driver.driverNumber : updatedDriver.driverNumber;
            updatedDriver.country =
                driver.country || isFullUpdate ? driver.country : updatedDriver.country;
            updatedDriver.podiums =
                driver.podiums || isFullUpdate ? driver.podiums : updatedDriver.podiums;
            updatedDriver.points =
                driver.points || isFullUpdate ? driver.points : updatedDriver.points;
            updatedDriver.grandsPrixEntered =
                driver.grandsPrixEntered || isFullUpdate ? driver.grandsPrixEntered : updatedDriver.grandsPrixEntered;
            updatedDriver.worldChampionships =
                driver.worldChampionships || isFullUpdate ? driver.worldChampionships : updatedDriver.worldChampionships;
            updatedDriver.driverImage =
                driver.driverImage || isFullUpdate ? driver.driverImage : updatedDriver.driverImage;
            updatedDriver.driverMainImage =
                driver.driverMainImage || isFullUpdate ? driver.driverMainImage : updatedDriver.driverMainImage;

            resolve(team, updatedDriver);
        }
    })
}

const _saveTeam = (team) => {
    return team.save();
}

const _saveNewTeam = (team, driver) => {
    team.drivers.push(driver);
    return team.save();
}

const getAllDriversByTeamId = (req, res) => {
    let offset = process.env.OFFSET;
    let count = process.env.DRIVER_COUNT;
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, process.env.PARSE_INT);
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, process.env.PARSE_INT);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, process.env.PARSE_INT);
    }

    if (isNaN(offset) || isNaN(count)) {
        _setResponse(process.env.ERROR_STATUS_NOT_FOUND_STATUS, process.env.OFFSET_COUNT_TYPE_ERROR_MESSAGE);
        _sendResponse(res)
        return;
    }
    if (count > maxCount) {
        _setResponse(process.env.ERROR_STATUS_NOT_FOUND_STATUS, process.env.MAX_COUNT_ERROR_MESSAGE + maxCount);
        _sendResponse(res);
        return;
    }

    _checkTeamExist(req.params.teamId)
        .then(team => _selectDriver(team))
        .then(drivers => _driversSelected(offset, count, drivers))
        .then(drivers => _setResponse(process.env.SUCCESS_STATUS, drivers))
        .catch(err => _setResponse(process.env.ERROR_STATUS_SERVER_STATUS, err))
        .finally(() => _sendResponse(res));
}

const getOneDriverById = (req, res) => {
    _checkTeamExist(req.params.teamId)
        .then(team => _selectDriver(team))
        .then(drivers => _checkDriverExisit(drivers, req.params.driverId))
        .then(driver => _setResponse(process.env.SUCCESS_STATUS, driver))
        .catch(err => _setResponse(process.env.ERROR_STATUS_SERVER_STATUS, err))
        .finally(() => _sendResponse(res));
}

const addOneDriver = (req, res) => {
    _checkTeamExist(req.params.teamId)
        .then(team => _saveNewTeam(team, req.body))
        .then(team => _setResponse(process.env.SUCCESS_STATUS, team))
        .catch(err => _setResponse(process.env.ERROR_STATUS_SERVER_STATUS, err))
        .finally(() => _sendResponse(res));
}

const deleteDriverById = (req, res) => {
    _checkTeamExist(req.params.teamId)
        .then(team => _deleteDriver(team, req.params.driverId))
        .then(team => _saveTeam(team))
        .then(team => _setResponse(process.env.SUCCESS_STATUS, team))
        .catch(err => _setResponse(process.env.ERROR_STATUS_SERVER_STATUS, err))
        .finally(() => _sendResponse(res));
}

const updateDriverById = (req, res) => {
    const isFullUpdate = req.method === process.env.REQ_METHOD;
    _checkTeamExist(req.params.teamId)
        .then(team => _updateDriver(team, req.body, req.params.driverId, isFullUpdate))
        .then(team => _saveTeam(team))
        .then(team => _setResponse(process.env.SUCCESS_STATUS, team))
        .catch(err => _setResponse(process.env.ERROR_STATUS_SERVER_STATUS, err))
        .finally(() => _sendResponse(res));
}

module.exports = {
    getAllDriversByTeamId,
    getOneDriverById,
    addOneDriver,
    deleteDriverById,
    updateDriverById
}