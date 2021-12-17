'use strict'
const Order = require('../models/order')

exports.get = async data => {
  var res = await Order.find(
    {},
    'number status user items createDate price payment'
  )
    .populate('user', ['name', 'email'])
    .populate('items')
    .populate({
      path: 'items',
      populate: { path: 'cart.product' }
    })
  return res
}

exports.getByUser = async id => {
  const res = Order.find({ user: id })
    .populate('user', ['name', 'email'])
    .populate('items')
    .populate({
      path: 'items',
      populate: { path: 'cart.product' }
    })


  return res
}

exports.getById = async id => {
  const res = Order.findById(
    id,
    'number status user items createDate price payment'
  )
    .populate('user', ['name', 'email'])
    .populate('items')
    .populate({
      path: 'items',
      populate: { path: 'cart.product' }
    })

  return res
}

exports.create = async data => {
  var order = new Order(data)
  await order.save()
  return order
}

//Atualiza o Status do pedido
exports.update = async (id, status) => {
  const res = await Order.findByIdAndUpdate(id, {
    $set: {
      status: status
    }
  }, { upsert: true, 'new': true })
  return res
}
