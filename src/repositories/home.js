'use strict';
const Home = require('../models/home')

exports.get = async () => {
    const res = await Home.find();
    return res;
}

exports.create = async (data) => {
    var home = new Home(data);
    await home.save();
    return home;
}

exports.update = async (id, data) => {
    const fallbackDataObj = await Home.findById(id);
    const res = await Home.findByIdAndUpdate(id, {
        $set: {
            image: data.image || fallbackDataObj.image,
            eixoX: data.eixoX || fallbackDataObj.eixoX,
            eixoY: data.eixoY || fallbackDataObj.eixoY,
            pos: data.pos || fallbackDataObj.pos
        }
    }, { upsert: true, 'new': true });
    return res;
}

exports.delete = async (id) => {
    await Home.findByIdAndUpdate(id);
} 