'use strict'

const Validator = require('../../validators/validator');
const repository = require('../repositories/product')

exports.get = async (req, res, next) => {
  try {
    var products = await repository.get()
    res.status(200).send(products)
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.getByCategoryId = async (req, res, next) => {
  try {
    var products = await repository.getByCategoryId(req.params.id)
    res.status(200).send(products)
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.getById = async (req, res, next) => {
  try {
    var product = await repository.getById(req.params.id)
    res.status(200).send(product)
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.post = async (req, res, next) => {
  const { name: name, description: description, category: category, sizes: sizes, images: images } = req.body

  let contract = new Validator()
  contract.hasMinLen(name, 3, 'O nome deve conter pelo menos 3 caracteres')
  contract.hasMinLen(description, 3, 'A descrição deve conter pelo menos 3 caracteres')

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  try {
    let product = await repository.create({ name: name, description: description, category: category, images: images, sizes: JSON.parse(JSON.stringify(sizes)) })
    res.status(201).send({ message: 'Produto cadastrado com sucesso!', product: product })
  } catch (e) {
    res.status(500).send({ message: 'Falha ao processar sua requisição' })
  }
}

exports.put = async (req, res, next) => {
  try {
    let product = await repository.update(req.params.id, req.body)
    res.status(200).send({ message: 'Produto atualizado com sucesso!', product: product })
  } catch (e) {
    res.status(500).send({ message: 'Falha ao processar sua requisição' })
  }
}

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.query.id)
    res.status(200).send({
      message: 'Produto removido com sucesso!'
    })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}
