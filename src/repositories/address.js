'use strict'

const Address = require('../models/address')

exports.get = async userId => {
  const res = Address.findOne({ user: userId })
    .populate('user', ['_id'])
  return res
}

exports.create = async data => {

  var address = new Address(data)
  await address.save()
  return address
}

exports.update = async (userId, data) => {
  let res = await Address.findOneAndUpdate({ user: userId }, {
    $set: {
      city: data.city,
      complement: data.complement,
      district: data.district,
      lat: data.lat,
      long: data.long,
      number: data.number,
      state: data.state,
      street: data.street,
      zipCode: data.zipCode
    }
  }, { upsert: true, 'new': true });

  return res;
}

exports.delete = async id => {
  await Address.findByIdAndRemove(id)
}
