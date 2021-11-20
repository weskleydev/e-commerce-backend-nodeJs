'use strict'

require('dotenv').config()
const express = require('express')
require('./config/database')
const cors = require('cors')

const app = express()

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Carrega os Models
// require('./src/models/user-model')

// Carrega as Rotas
const indexRoute = require('./src/routes/index-route')
const userRoute = require('./src/routes/user-route')


// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  app.use(cors());
  next();
})


app.use('/', indexRoute)
app.use('/users', userRoute)

module.exports = app