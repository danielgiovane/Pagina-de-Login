const express = require('express');
const autenticacaoController = require('../controller/autenticacao');

const rotas = express.Router();

rotas.post('/registrar', autenticacaoController.registrar);

module.exports = rotas;