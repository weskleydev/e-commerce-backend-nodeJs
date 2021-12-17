'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/home');
const jwt = require('../../middlewares/auth-jwt')

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', jwt.isAdmin, controller.post);
router.put('/:id', jwt.isAdmin, controller.put);
router.delete('/', jwt.isAdmin, controller.delete);

module.exports = router;