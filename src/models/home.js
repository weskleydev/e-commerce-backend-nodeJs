'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  image: {
    type: String,
    required: true,
  },
  pos: {
    type: Number,
    required: true,
  },
  eixoX: {
    type: Number,
    required: true
  },
  eixoY: {
    type: Number,
    required: true
  }
});



module.exports = mongoose.model('Home', schema);