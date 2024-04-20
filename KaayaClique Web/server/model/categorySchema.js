const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        lowercase: true,
        
    }
    
});

const categorydb = mongoose.model("Category", categorySchema);

module.exports = categorydb;
