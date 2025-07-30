const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
    "mongodb+srv://rana_09:blLWmLQKAPo43Jaj@namastenode.culihrb.mongodb.net/devTinder"
    );
};

module.exports = connectDB;