const callbackify = require("util").callbackify
const mongoose = require("mongoose");

const Team = mongoose.model("Team");

const teamFindAllExecWithCallBack = callbackify((offset, count) => {
    return Team.find().skip(offset).limit(count).exec();
});

const teamAddOneExecWithCallBack = callbackify((team) => {
    return Team.create(team);
});

const teamDeleteOneExecWithCallBack = callbackify((teamId) => {
    return Team.findByIdAndDelete(teamId);
});

const teamFindOneExecWithCallBack = callbackify((teamId) => {
    return Team.findById(teamId);
});

const teamUpdateOneExecWithCallBack = callbackify((teamId, team) => {
    return Team.findByIdAndUpdate(teamId, team);
});

const getAllTeams = (req, res) => {
    let offset = 0;
    let count = 5;
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);
    const response = { status: 200, message: [] };
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({
            "message": "QueryString Offset and Count should benumbers"});
            return;
        }
    if (count > maxCount) {
            res.status(400).json({ "message": "Cannot exceed count of " + maxCount });
            return;
    }
    Team.find().skip(offset).limit(count).exec().then(teams => {
        res.status(response.status).json(teams);
    }).catch(err => {});
    // teamFindAllExecWithCallBack(offset, count, req.params.teamId, (err, teams) => {
    //     if (err) {
    //         response.status = 500;
    //         response.message = err;
    //     } else {
    //         response.status = 200;
    //         response.message = teams;
    //     }
    //     res.status(response.status).json(response.message);
    // })
}

    // bcrypt.genSalt(10).then((salt) => {
    //     _getSalt(req.body.password, salt)
    //         .then((encryptedPassword) => {
    //             userModel.create({
    //                 email: req.body.email,
    //                 password: encryptedPassword,
    //                 firstName: req.body.firstName,
    //                 lastName: req.body.lastName,
    //             }).then().catch(err => { console.log(err); });
    //         });
    // });
    // userModel.create(req.body).then().catch(err => {console.log(err);});
const addOneTeam = (req, res) => {
    teamAddOneExecWithCallBack(req.body, (err, team) => {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = team;
        }
        res.status(response.status).json(response.message);
    })
}

const deleteOneTeam = (req, res) => {
    teamDeleteOneExecWithCallBack(req.params.teamId, (err , team) => {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else if (team === null) {
            response.status = 200;
            response.message = "Team Not Found!";
        } else {
            response.status = 200;
            response.message = team;
        }
        res.status(response.status).json(response.message);
    })
}

const getOneTeam = (req, res) => {
    teamFindOneExecWithCallBack(req.params.teamId, (err, team) => {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = team;
        }
        res.status(response.status).json(response.message);
    })
}

const updateOneTeam = (req, res) => {
    teamUpdateOneExecWithCallBack(req.params.teamId, req.body, (err, team) => {
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        } else {
            response.status = 200;
            response.message = team;
        }
        res.status(response.status).json(response.message);
    })
}

module.exports = {
    getAllTeams,
    addOneTeam,
    deleteOneTeam,
    getOneTeam,
    updateOneTeam
}