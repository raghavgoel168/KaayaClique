const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: {},
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0,
        
    }
}, { timestamps: true });

const authdb = mongoose.model("auth", authSchema);

module.exports = authdb;
