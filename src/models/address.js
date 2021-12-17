'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    city: {
        type: String,
        required: true,
    },
    complement: {
        type: String,
        required: false
    },
    district: {
        type: String,
        default: false
    },
    lat: {
        type: Number,
        required: true,
    },
    long: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
    ,
    state: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Address', schema);