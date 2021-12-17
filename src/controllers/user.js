'use strict'

const Validator = require('../../validators/validator');
const repository = require('../repositories/user');
const jwt = require('../../middlewares/auth-jwt');


exports.signUp = async (req, res) => {
  const { name, email, password, roles } = req.body;

  //Efetua a validação dos campos
  let user_validator = new Validator();
  user_validator.hasMinLen(name, 3, 'O nome deve conter pelo menos 3 caracteres');
  user_validator.isEmail(email, 'E-mail inválido');
  user_validator.hasMinLen(password, 6, 'A senha deve conter pelo menos 6 caracteres');

  // Se os dados forem inválidos
  if (!user_validator.isValid()) {
    res.status(400).send(user_validator.errors()).end();
    return;
  }
  try {
    // Verifica se o email informa já existe
    const isEmailExists = await repository.isEmailExists(email)
    if (!isEmailExists) {
      // Caso não existe o email, chama o repositorio para efetuar o cadastro do novo usuário
      let user = await repository.signUp({ name: name, email: email, password: password });
      // Gera um novo token 
      const token = await jwt.generateToken({
        id: user._id,
        email: user.email,
        name: user.name,
      });
      // Retorna um mapa com a mensagem, os dados do usuário e o token
      res.status(201).send({
        token: token,
        _id: user._id,
        email: user.email,
        name: user.name,
        roles: user.roles,
        message: 'Cliente cadastrado com sucesso!'
      });
    } else {
      res.status(404).send({ message: `O Email ${email} já existe!` })
    }
  } catch (error) {
    // Retorna um erro não mapeado 
    res.status(500).send({
      message: 'Falha ao processar sua requisição', error: error
    })
  }
}

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  //Efetua a validação dos campos
  let user_validator = new Validator();
  user_validator.isEmail(email, 'E-mail inválido');
  user_validator.hasMinLen(password, 6, 'A senha deve conter pelo menos 6 caracteres');

  try {
    //Verifica se o email existe
    const user = await repository.signIn({ email: email, password: password })
    if (!user) {
      res.status(404).send({ message: 'Usuário ou senha inválidos' });
      return;
    } else {
      //Se email existe, verifica se o password está correto
      user.isCorrectPassword(password, async function (err, same) {
        if (!same)
          res.status(401).send({ message: 'Usuário ou senha inválidos' })
        else {
          // Gera um novo token 
          const token = await jwt.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            roles: user.roles
          });
          // Retorna um mapa com a mensagem, os dados do usuário e o token

          res.status(200).send({
            token: token,
            _id: user._id,
            email: user.email,
            name: user.name,
            image: user.image,
            roles: user.roles,
            message: 'Login Efetuado com sucesso!'
          });
        }
      })
    }
  } catch (error) {
    // Retorna um erro não mapeado 
    res.status(500).send({
      message: 'Falha ao processar sua requisição', error: error
    })
  }

}