'use strict'


const repository = require('../repositories/home')

exports.get = async (req, res, next) => {
  try {
    var home = await repository.get()
    res.status(200).send(home);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.getById = async (req, res, next) => {
  try {
    var home = await repository.getById(req.params.id)
    res.status(200).send({ home: home })
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

exports.post = async (req, res, next) => {

  console.log(req.body)
  try {
    let home = await repository.create(req.body)
    res.status(201).send(home)
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição',
      home: home
    })
  }
}

exports.put = async (req, res, next) => {

  try {
    let home = await repository.update(req.params.id, req.body)
    res.status(200).send({ message: 'Home atualizada com sucesso!', home: home })
  } catch (e) {
    res.status(500).send({ message: 'Falha ao processar sua requisição' })
  }
}

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.query.id)
    res.status(200).send({ message: 'Imagem removida com sucesso!' })
  } catch (e) {
    res.status(500).send({ message: 'Falha ao processar sua requisição' })
  }
}
