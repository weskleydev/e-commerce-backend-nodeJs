'use strict'

const repository = require('../repositories/address')
const jwt = require('../../middlewares/auth-jwt');

exports.get = async (req, res, next) => {
  try {

    const token =
      req.body.token || req.query.token || req.headers['x-access-token']
    const dataToken = await jwt.decodeToken(token)

    var data = await repository.get(dataToken.id)
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.post = async (req, res, next) => {
  const {
    city: city,
    complement: complement,
    district: district,
    lat: lat,
    long: long,
    number: number,
    state: state,
    street: street,
    zipCode: zipCode
  } = req.body

  try {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token']
    const dataToken = await jwt.decodeToken(token)
    let address = await repository.create({
      user: dataToken.id,
      city: city,
      complement: complement,
      district: district,
      lat: lat,
      long: long,
      number: number,
      state: state,
      street: street,
      zipCode: zipCode
    })
    res.status(201).send({
      _id: address._id,
      user: {
        _id: address.user
      },
      city: address.city,
      complement: address.complement,
      district: address.district,
      lat: address.lat,
      long: address.long,
      number: address.number,
      state: address.state,
      street: address.street,
      zipCode: address.zipCode
    })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.put = async (req, res, next) => {
  try {
    let address = await await repository.update(req.params.id, req.body)
    res.status(200).send({
      _id: address._id,
      user: {
        _id: address.user
      },
      city: address.city,
      complement: address.complement,
      district: address.district,
      lat: address.lat,
      long: address.long,
      number: address.number,
      state: address.state,
      street: address.street,
      zipCode: address.zipCode
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
      message: 'Endereço removido com sucesso!'
    })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}
