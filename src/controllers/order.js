'use strict'

const repository = require('../repositories/order')
const productRepository = require('../repositories/product')
const jwt = require('../../middlewares/auth-jwt');

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get()
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.getByUser = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token']
    const dataToken = await jwt.decodeToken(token)


    var data = await repository.getByUser(dataToken.id)






    res.status(200).send(data)
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.getById = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token']
  const dataToken = await jwt.decodeToken(token)

  try {
    var order = await repository.getById(req.params.id)
    if (order.user.id !== dataToken.id) {
      res.status(401).json({
        message: 'Acesso Restrito'
      })
      return;
    } else {
      res.status(200).send(order)
    }
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.post = async (req, res, next) => {
  const { items, price, payment, address } = req.body;

  try {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token']
    const data = await jwt.decodeToken(token)

    var newOrder = await repository.create({
      user: data.id,
      items: items,
      price: price,
      payment: payment,
      address: address

    })


    var order = await repository.getById(newOrder._id)

    res.status(201).send(order)
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.put = async (req, res, next) => {
  try {
    const newOrder = await repository.update(req.params.id, req.body.status)

    var order = await repository.getById(newOrder._id)

    res.status(200).send({
      message: `Status do pedido ${order.number} atualizado para ${order.status}`,
      order: order
    })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}
