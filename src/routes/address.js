'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/address');
const jwt = require('../../middlewares/auth-jwt')

router.get('/', jwt.authorize, controller.get);
router.post('/', jwt.authorize, controller.post);
router.put('/:id', jwt.authorize, controller.put);
router.delete('/', jwt.authorize, controller.delete);

module.exports = router;