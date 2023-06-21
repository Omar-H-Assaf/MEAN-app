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
    driverImage: String,
    driverMainImage: String
})

const teamsSchema = mongoose.Schema({
    teamName: {
        type: String,
        required: true,
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
    carImage: String,
    drivers: [drivers],
});

mongoose.model(process.env.TEAM_MODEL_NAME, teamsSchema, process.env.TEAM_COLLECTION_NAME);