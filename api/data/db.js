const mongoose = require("mongoose");

require("./team-models");
require("./user-models");

const callbackify = require("util").callbackify;

const mongooseCloseWithCallBack = callbackify(mongoose.disconnect);

mongoose.connect(process.env.MONGODB);

mongoose.connection.on(process.env.DB_CONNECTED, () => {
    console.log(process.env.DB_CONNECTED_TO + process.env.MONGODBNAME);
});

mongoose.connection.on(process.env.DB_DISCONNECTED, () => {
    console.log(process.env.DB_DISCONNECTED_MESSAGE);
});

mongoose.connection.on(process.env.DB_ERROR, (err) => {
    console.log(process.env.DB_ERROR_MESSAGE, err);
});

process.on(process.env.DB_TERMINATE, () => {
    mongooseCloseWithCallBack(() => {
        console.log(process.env.DB_TEMINATE_MESSAGE);
        process.exit();
    });
})