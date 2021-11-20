'use strict'

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const connectionDb = require('./config/database')
const cors = require('cors')

const app = express()
const router = express.Router()

// Connecta ao banco
mongoose.connect(connectionDb.connectionString)


app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Carrega as Rotas
const indexRoute = require('./src/routes/index-route')


// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  app.use(cors());
  next();
})

// Carrega as Rotas
app.use('/', indexRoute)

module.exports = app