'use strict'
require('../models/user-model')
const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.signUp = async data => {
  const user = new User({ name: data.name, email: data.email, password: data.password });
  let res = await user.save();
  return res;
}

exports.signIn = async data => {
  let res = await User.findOne({ email: data.email });
  return res;
}

exports.isEmailExists = async value => {
  let res = await User.findOne({ email: value });
  return res;
}



exports.isEmailExists = async value => {
  let res = await User.findOne({ email: value });
  return res;
}
