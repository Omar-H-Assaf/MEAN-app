const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const promisify = require("util").promisify
const jwt = require("jsonwebtoken")

const userModel = mongoose.model(process.env.USER_MODEL_NAME)
const response = { status: process.env.SUCCESS_STATUS, message: [] };
const userInfo = {firstName: '', lastName: ''};

const _getSalt = () => {
    return bcrypt.genSalt(12)
}

const _encryptPassword = (password, salt) => {
    return bcrypt.hash(password, salt)
}

const _addUser = (encryptedPassword, body) => {
    return userModel.create({
        email: body.email,
        password: encryptedPassword,
        firstName: body.firstName,
        lastName: body.lastName,
    })
}

const _comparePassword = (passwrod, user) => {
    userInfo.firstName = user.firstName;
    userInfo.lastName = user.lastName;
    return bcrypt.compare(passwrod, user.password);
}

const _findUser = (email) => {
    return userModel.findOne(email);
}

const _LoginStatus = (authorized) => {
    const isAuthorized = new Promise((resolve, reject) => {
        if (authorized) {
            response.message = process.env.AUTHENTICATION_SUCCESS_MESSAGE;
            response.status = process.env.SUCCESS_STATUS;
            resolve();
        } else {
            response.message = process.env.AUTHENTICATION_ERROR_MESSAGE;
            response.status = process.env.ERROR_STATUS_NOT_FOUND_STATUS;
            reject();
        }
    });
    return isAuthorized;
}

const _setResponse = (status, message) => {
    response.status = status;
    response.message = message;
}

const _sendResponse = (res) => {
    res.status(response.status).json(response.message);
}

const addUser = (req, res) => {
    _getSalt().then(salt => {
        _encryptPassword(req.body.password, salt)
            .then((encryptedPassword) => _addUser(encryptedPassword, req.body))
            .then(user => res.status(process.env.SUCCESS_STATUS).json(user))
            .catch(err => res.status(process.env.ERROR_STATUS_SERVER_STATUS).json(err))
    });
}

const loginUser = (req, res) => {
    _findUser({ email: req.body.email })
        .then(user => _comparePassword(req.body.password, user))
        .then(isAuthorized => _LoginStatus(isAuthorized))
        .then(()=> _generateToken())
        .then((token) => _setResponse(process.env.SUCCESS_STATUS, token))
        .catch(error => _setResponse(process.env.ERROR_STATUS_SERVER_STATUS, error))
        .finally(()=>_sendResponse(res))
}
const _generateToken = () => {
    const sign = promisify(jwt.sign)
    return sign(userInfo, process.env.AUTHENTICATION_KEY_VALUE)
}

module.exports = {
    addUser,
    loginUser
}