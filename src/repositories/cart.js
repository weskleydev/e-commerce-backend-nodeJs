'use strict';
const Cart = require('../models/cart')


exports.get = async (id) => {
    var res = await Cart.find({ user: id }, 'quantity product size').populate('product', ['id', 'category', 'name', 'description', 'images', 'sizes', 'deleted']);
    return res;
}

exports.getById = async (id) => {
    const res = await Cart
        .findById(id, 'quantity product size')
        .populate('product', ['id', 'description', 'category', 'name', 'images', 'sizes', 'deleted']);
    return res;
}

exports.create = async (data) => {
    var cart = new Cart(data);
    await cart.save();
    return cart;
}

exports.update = async (id, data) => {
    const fallbackDataObj = await Cart.findById(id);
    const res = await Cart.findByIdAndUpdate(id, {
        $set: {
            product: data.product || fallbackDataObj.product,
            quantity: data.quantity || fallbackDataObj.quantity,
            size: data.size || fallbackDataObj.size,
        }
    }, { upsert: true, 'new': true });
    return res;
}

exports.delete = async (id) => {
    await Cart.findByIdAndRemove(id);
}

