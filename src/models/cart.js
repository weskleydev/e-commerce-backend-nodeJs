'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Cart', schema);