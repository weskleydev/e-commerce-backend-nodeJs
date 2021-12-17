'use strict'

const repository = require('../repositories/cart')
const jwt = require('../../middlewares/auth-jwt');

exports.get = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token']
    const user = await jwt.decodeToken(token)

    var data = await repository.get(user.id)
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.post = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token']
    const data = await jwt.decodeToken(token)

    const response = await repository.create({
      user: data.id,
      product: req.body.product,
      quantity: req.body.quantity,
      size: req.body.size
    })
    const cart = await repository.getById(response._id)

    // res.status(201).send(dataGet);
    res.status(201).send({
      cart: cart
    })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.put = async (req, res, next) => {
  try {
    let newCart = await repository.update(req.params.id, req.body)

    const cart = await repository.getById(newCart._id)

    res.status(200).send({
      message: 'Seção atualizada com sucesso!',
      cart: cart
    })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.query.id)
    res.status(200).send({
      message: 'Seção removida com sucesso!'
    })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}
