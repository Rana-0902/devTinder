const mongoose = require('mongoose');
var validator = require('validator');

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
        validate(value) {
          if (!validator.isEmail(value)) {
                throw new Error("Enter a valid Email Id" + value);
            }
        },
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
          if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong password" + value);
            }
        },
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        trim: true,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        },
    }, 
    photoURL: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
        validate(value) {
          if (!validator.isURL(value)) {
                throw new Error("Enter a valid photoURL Id" + value);
            }
        },
    },
    about: {
        type: String,
        trim:true,
        default: "This is a default about of user.",  
    },
    skills: {
        type: [String],
        default: ["arr"],
    }
},
{
    timestamps: true,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
