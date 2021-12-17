'use strict'

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
require('./config/database')
const cors = require('cors')
const routes = require('./src/routes')


const app = express()

app.use(bodyParser.json());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));


// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  app.use(cors());
  next();
})

// Carrega as Rotas
app.use('/', routes);


module.exports = app