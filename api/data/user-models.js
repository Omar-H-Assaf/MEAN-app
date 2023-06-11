const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email must be provided"],
        unique: [true, "Email already register"]
    },
    password: {
        type: String,
        required: [true, "Password must be provided"],
        minlength: 6
    },
    firstName: {
        type: String,
        required: [true, "First name must be provided"],
    },
    lastName: {
        type: String,
        required: [true, "Last name must be provided"],
    }
});

mongoose.model("User", userSchema, "users");