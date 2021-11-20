'use strict'
import express, { Router, json, urlencoded } from 'express'
import cors from 'cors'
require('dotenv').config()
require('.config/database');

const app = express()

app.use(json({ limit: '5mb' }));
app.use(urlencoded({ extended: true }));


// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  app.use(cors());
  next();
})