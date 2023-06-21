const mongoose = require("mongoose");

const Team = mongoose.model(process.env.TEAM_MODEL_NAME);

const response = { status: process.env.SUCCESS_STATUS, message: [] };

const _checkTeam = (team) => {
    return new Promise((resolve, reject) => {
        if (team !== null) {
            resolve(team);
        } else {
            reject(_setResponse(process.env.ERROR_STATUS_NOT_FOUND_STATUS, process.env.TEAM_ERROR_STATUS_NOT_FOUND_MESSAGE));
        }
    })
}

const _setResponse = (status, message) => {
    response.status = status;
    response.message = message;
}

const _sendResponse = (res) => {
    res.status(response.status).json(response.message);
}

const getAllTeams = (req, res) => {
    let offset = process.env.OFFSET;
    let count = process.env.TEAM_COUNT;
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, process.env.PARSE_INT);

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, process.env.PARSE_INT);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, process.env.PARSE_INT);
    }

    if (isNaN(offset) || isNaN(count)) {
        _setResponse(process.env.ERROR_STATUS_NOT_FOUND_STATUS, process.env.OFFSET_COUNT_TYPE_ERROR_MESSAGE);
        _sendResponse(res);
        return;
    }
    if (count > maxCount) {
        _setResponse(process.env.ERROR_STATUS_NOT_FOUND_STATUS, process.env.MAX_COUNT_ERROR_MESSAGE + maxCount);
        _sendResponse(res);
        return;
    }
    Team.find().skip(offset).limit(count).exec()
        .then(teams => _setResponse(process.env.SUCCESS_STATUS, teams))
        .catch(err => _setResponse(process.env.ERROR_STATUS_SERVER_STATUS, err))
        .finally(() => _sendResponse(res));
}

const addOneTeam = (req, res) => {
    Team.create(req.body)
        .then(team => _setResponse(process.env.SUCCESS_STATUS, team))
        .catch(err => _setResponse(process.env.ERROR_STATUS_SERVER_STATUS, err))
        .finally(() => _sendResponse(res));
}

const deleteOneTeam = (req, res) => {
    Team.findByIdAndDelete(req.params.teamId)
        .then(team => _checkTeam(team))
        .then(team => _setResponse(process.env.SUCCESS_STATUS, team))
        .catch(err => _setResponse(process.env.ERROR_STATUS_SERVER_STATUS, err))
        .finally(() => _sendResponse(res));
}

const getOneTeam = (req, res) => {
    Team.findById(req.params.teamId)
        .then(team => _checkTeam(team))
        .then(team => _setResponse(process.env.SUCCESS_STATUS, team))
        .catch(err => _setResponse(process.env.ERROR_STATUS_SERVER_STATUS, err))
        .finally(() => _sendResponse(res));
}

const updateOneTeam = (req, res) => {
    Team.findByIdAndUpdate(req.params.teamId, req.body)
        .then(team => _checkTeam(team))
        .then(team => _setResponse(process.env.SUCCESS_STATUS, team))
        .catch(err => _setResponse(process.env.ERROR_STATUS_SERVER_STATUS, err))
        .finally(() => _sendResponse(res));
}

const getAllTeamsCount = (req, res) => {
    Team.find().count().exec()
        .then(count => _setResponse(process.env.SUCCESS_STATUS, count))
        .catch(err => _setResponse(process.env.ERROR_STATUS_SERVER_STATUS, err))
        .finally(() => _sendResponse(res));


}

module.exports = {
    getAllTeams,
    addOneTeam,
    deleteOneTeam,
    getOneTeam,
    updateOneTeam,
    getAllTeamsCount
}