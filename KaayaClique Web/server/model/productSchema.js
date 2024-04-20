const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        
    },
    price: {
        type: Number,
        required: true,
        
    },
    description: {
        type: String,
        required: true,
        
    },
    category: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Category' || 'categories',
    },
    quantity: {
        type: Number,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    shipping: {
        type: Boolean,
    },
}, {timestamps: true});

const categorydb = mongoose.model("Products", productSchema);

module.exports = categorydb;
