'use strict'

const Validator = require('../../validators/validator');
const repository = require('../repositories/category')

exports.get = async (req, res, next) => {
  try {
    var categories = await repository.get()
    res.status(200).send(categories);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.getById = async (req, res, next) => {
  try {
    var category = await repository.getById(req.params.id)
    res.status(200).send({ category: category })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.post = async (req, res, next) => {
  const { image: image, name: name } = req.body
  let contract = new Validator()
  // contract.hasMinLen(image, 3, 'O nome da categoria deve conter pelo menos 3 caracteres')
  contract.hasMinLen(
    name,
    3,
    'O nome da categoria deve conter pelo menos 3 caracteres'
  )

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  try {
    let category = await repository.create({ image: image, name: name })
    res.status(201).send({ message: 'Categoria cadastrada com sucesso!', category: category })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição',
      category: category
    })
  }
}

exports.put = async (req, res, next) => {
  const { image: image, name: name } = req.body
  let contract = new Validator()

  // contract.hasMinLen(image, 3, 'O nome da categoria deve conter pelo menos 3 caracteres')
  contract.hasMinLen(name, 3, 'O nome da categoria deve conter pelo menos 3 caracteres')

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }
  try {
    let category = await repository.update(req.params.id, req.body)
    res.status(200).send({ message: 'Categoria atualizada com sucesso!', category: category })
  } catch (e) {
    res.status(500).send({ message: 'Falha ao processar sua requisição' })
  }
}

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.query.id)
    res.status(200).send({ message: 'Categoria removida com sucesso!' })
  } catch (e) {
    res.status(500).send({ message: 'Falha ao processar sua requisição' })
  }
}
