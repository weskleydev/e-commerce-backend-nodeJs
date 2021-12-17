'use strict'
const Product = require('../models/product')

exports.get = async () => {
  const res = await Product.find({ deleted: false })
  return res
}

exports.getById = async id => {
  const res = await Product.findById(id)
  return res
}

exports.getByCategoryId = async categoryId => {
  const res = await Product.find({ category: categoryId })
  return res
}

exports.create = async data => {
  var product = new Product(data)
  await product.save()
  return product
}

exports.update = async (id, data) => {
  const fallbackDataObj = await Product.findById(id)
  const res = await Product.findByIdAndUpdate(id, {
    $set: {
      name: data.name || fallbackDataObj.name,
      description: data.description || fallbackDataObj.description,
      images: data.images || fallbackDataObj.images,
      sizes: data.sizes || fallbackDataObj.sizes,
      deleted: data.deleted || fallbackDataObj.deleted
    }
  }, { upsert: true, 'new': true });
  return res;
}

exports.delete = async id => {
  await Product.findByIdAndUpdate(id, { deleted: true })
}
