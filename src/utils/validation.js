const validator = require('validator');
const { validate } = require('../models/user');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName) {
        throw new Error("Firstname is not valid!");
    } else if (!lastName) {
        throw new Error("Lastname is not valid!");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid!");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password!");
    }

};

module.exports = {
    validateSignUpData,
}