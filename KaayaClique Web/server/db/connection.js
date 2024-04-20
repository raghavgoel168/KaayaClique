const MONGODB_URI = require('../config/keys.js').MONGODB_URI;
require('dotenv').config({ path: '../'});
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || MONGODB_URI;

mongoose.connect(uri, {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
        })
        .then(() => {
            //console.log("Conneted To Mongodb Database");
        })
        .catch((err) => {
            //console.log(err);
        });

