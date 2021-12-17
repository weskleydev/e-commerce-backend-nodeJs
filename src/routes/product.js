'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product');
const jwt = require('../../middlewares/auth-jwt')

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/category/:id', controller.getByCategoryId);
router.post('/', jwt.isAdmin, controller.post);
router.put('/:id', jwt.isAdmin, controller.put);
router.delete('/', jwt.isAdmin, controller.delete);

module.exports = router;