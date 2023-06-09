const mongoose = require("mongoose");

require("./team-models");

const callbackify = require("util").callbackify;

const mongooseCloseWithCallBack = callbackify(mongoose.disconnect);

mongoose.connect(process.env.MONGODB);

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to " + process.env.MONGODBNAME);
});

mongoose.connection.on("disconnect", () => {
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error", (err) => {
    console.log("Mongoose error", err);
});

process.on("SIGINT", () => {
    mongooseCloseWithCallBack(() => {
        console.log("Mongoose disconnected by app termination");
        process.exit();
    });
})