
const express = require('express');

const indexRoute = require('./index-route');
const userRoute = require('./user');
const categoryRoute = require('./category');
const homeRoute = require('./home');
const productRoute = require('./product');
const cartRoute = require('./cart');
const orderRoute = require('./order');
const addressRoute = require('./address');

const router = express.Router();


router.use('/', indexRoute);
router.use('/users', userRoute);
router.use('/category', categoryRoute);
router.use('/home', homeRoute);
router.use('/products', productRoute);
router.use('/orders', orderRoute);
router.use('/address', addressRoute);
router.use('/cart', cartRoute);


module.exports = router;


