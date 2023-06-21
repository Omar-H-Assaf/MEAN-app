const express = require("express");
require("dotenv").config();
require("./api/data/db");

const routes = require("./api/routes");
const app = express();

app.use(express.json());
app.use("/", function (req, res, next) {
    res.header('Access-Control-Allow-Origin',
        'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, XRequested-With, Content-Type, Accept, *');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE, PATCH');
    next();
});
app.use(routes)

const server = app.listen(process.env.PORT, () => {
    console.log("Listening to port", server.address().port);
});
