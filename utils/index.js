const mongoose = require("mongoose");
const Team = mongoose.model("Team");

const driverSubDocument = (teamId) => {
    return Team.findById(teamId).select(process.env.TEAMSUBDOCUMENT);
}

module.exports = {
    driverSubDocument
}