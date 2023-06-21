const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, process.env.USER_MODEL_EMAIL_REQUIRED],
        unique: [true, process.env.USER_MODEL_EMAIL_UNIQUE]
    },
    password: {
        type: String,
        required: [true, process.env.USER_MODEL_PASSWORD_REQUIRED],
        minlength: 6
    },
    firstName: {
        type: String,
        required: [true, process.env.USER_MODEL_FIRSTNAME_REQUIRED],
    },
    lastName: {
        type: String,
        required: [true, process.env.USER_MODEL_LASTNAME_REQUIRED],
    }
});

mongoose.model(process.env.USER_MODEL_NAME, userSchema, process.env.USER_COLLECTION_NAME);