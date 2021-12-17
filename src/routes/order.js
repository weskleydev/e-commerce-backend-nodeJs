'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order');
const jwt = require('../../middlewares/auth-jwt')

router.get('/admin', jwt.authorize, jwt.isAdmin, controller.get);
router.get('/', jwt.authorize, controller.getByUser);
router.get('/:id', jwt.authorize, controller.getById);
router.post('/', jwt.authorize, controller.post);
router.put('/admin/:id', jwt.authorize, jwt.isAdmin, controller.put);

module.exports = router;