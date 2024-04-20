const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    displayName: String,
    email: String,
    image: String,
}, { timestamps: true });

const userdb = mongoose.model("users", userSchema);

module.exports = userdb;