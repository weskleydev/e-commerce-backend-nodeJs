'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')
const jwt = require('../../middlewares/auth-jwt')


router.post('/signUp', controller.signUp);
router.post('/signIn', controller.signIn);

module.exports = router
