'use strict';
const Category = require('../models/category')

exports.get = async () => {
    const res = await Category.find({ deleted: false });
    return res;
}

exports.getById = async (id) => {
    const res = await Category.findById(id);
    return res;
}

exports.create = async (data) => {
    var category = new Category(data);
    await category.save();
    return category;
}

exports.update = async (id, data) => {
    const fallbackDataObj = await Category.findById(id);
    const res = await Category.findByIdAndUpdate(id, {
        $set: {
            image: data.image || fallbackDataObj.image,
            name: data.name || fallbackDataObj.name,
            deleted: data.deleted || fallbackDataObj.deleted
        }
    }, { upsert: true, 'new': true });
    return res;
}


exports.delete = async (id) => {
    await Category.findByIdAndUpdate(id, { deleted: true });
} 