const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [
        {
            product: {
                type: mongoose.ObjectId,
                ref: "Products"
            },
            count: Number,
            color: String
        }
    ],
    payment: {},
    
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
            "Not Processed",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Completed"
        ]
    },
    orderedBy: {
        type: mongoose.ObjectId, 
        ref: "auth" 
    }
}, 
{ timestamps: true});

const orderdb = mongoose.model("Order", orderSchema);

module.exports = orderdb;
