const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
        trim: true,
    },  
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 50,
        trim: true,
    },
    emailId: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        },
    },
    about: {
        type: String,
        default: "This is a default of user.",
    }
}, {
    timestamps: true,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
