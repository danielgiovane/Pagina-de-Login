const express = require('express');

const rotas = express.Router();

rotas.get('/', (req, res)  => {
  res.render('index')
});


rotas.get('/registrar', (req, res)  => {
  res.render('registrar')
});


rotas.get('/login', (req, res)  => {
  res.render('login')
});

module.exports = rotas;