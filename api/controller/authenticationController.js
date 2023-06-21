const jwt = require("jsonwebtoken")

const authentication = (req, res, next) => {
    const response = {
        status: process.env.AUTHENTICATION_ERROR_STATUS,
        message: process.env.AUTHENTICATION_ERROR_MESSAGE
    }
    const headerExisits = req.headers.authorization;
    if (headerExisits) {
        token = req.headers.authorization.split(" ")[1];
        if (jwt.verify(token, process.env.AUTHENTICATION_KEY_VALUE)) {
            next();
        } else {
            res.status(response.status).json(response.message)
        }
    }else  {
        res.status(response.status).json(response.message)
    } 
}

module.exports = authentication;