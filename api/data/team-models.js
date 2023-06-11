const mongoose = require("mongoose");

const drivers = new mongoose.Schema({
    driverName: {
        type: String,
        required: true
    },
    driverNumber: {
        type: Number,
        required: true
    },
    country: String,
    podiums: Number,
    points: Number,
    grandsPrixEntered: Number,
    worldChampionships: Number,
    // dateFfBirth: Date
})

const teamsSchema = mongoose.Schema({
    teamName: {
        type: String,
        required: [true, "Team name must be provided"]
    },
    teamCheif: {
        type: String,
        required: true,
    },
    fullTeamName: String,
    teamcolor: String,
    powerUnit: String,
    firstTeamEntry: Number,
    worldChampions: Number,
    polePosiotion: Number,
    fastestLaps: Number,
    drivers: [drivers],
});

mongoose.model("Team", teamsSchema, "teams");