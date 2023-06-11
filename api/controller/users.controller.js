const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModel = mongoose.model("User")
const response = { status: 200, message: [] };

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

const _comparePassword = (passwrod, dbPassword) => {
    return bcrypt.compare(passwrod, dbPassword);
}

const _findUser = (email) => {
    return userModel.findOne(email);
}

const _LoginStatus = (authorized) => {
    const isAuthorized = new Promise((resolve, reject) => {
        if (authorized) {
            response.message = "Authorized";
            response.status = 200;
            resolve();
        } else {
            response.message = "Wrong Email or Password";
            response.status = 500;
            reject();
        }
    });
    return isAuthorized;
}



const addUser = (req, res) => {
    _getSalt().then(salt => {
        _encryptPassword(req.body.password, salt)
            .then((encryptedPassword) => _addUser(encryptedPassword, req.body))
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500).json(err))
    });
}

const loginUser = (req, res) => {
    _findUser({ email: req.body.email })
        .then(user => _comparePassword(req.body.password, user.password))
        .then(isAuthorized => _LoginStatus(isAuthorized))
        .then()
        .catch(error => console.log(error))
        .finally(res.status(response.status).json(response.message))
}

module.exports = {
    addUser,
    loginUser
}