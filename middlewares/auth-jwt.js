'use strict'
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_TOKEN;

exports.generateToken = async data => {
  return jwt.sign(data, secret, { expiresIn: '7d' })
}

exports.decodeToken = async token => {
  var data = await jwt.verify(token, secret)
  return data
}

exports.authorize = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {
    res.status(401).json({
      message: 'Acesso Restrito'
    })
  } else {
    jwt.verify(token, secret, function (error, decoded) {
      if (error) {
        res.status(401).json({
          message: 'Token Inválido'
        })
      } else {
        next()
      }
    })
  }
}

exports.isAdmin = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {
    res.status(401).json({
      message: 'Token Inválido'
    })
  } else {
    jwt.verify(token, secret, function (error, decoded) {
      if (error) {
        res.status(401).json({
          message: 'Token Inválido'
        })
      } else {
        if (decoded.roles.includes('admin')) {
          next()
        } else {
          res.status(403).json({
            message: 'Esta funcionalidade é restrita para administradores'
          })
        }
      }
    })
  }
}
