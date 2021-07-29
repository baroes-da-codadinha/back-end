const express = require('express');
const { login } = require('./controladores/login');
const cadastrarUsuario = require('./controladores/usuario');
const verificarLogin = require('./filtros/verificarLogin');

const rotas = express();

// USUÁRIO
rotas.post('/usuarios', cadastrarUsuario);

// LOGIN
rotas.post('/usuarios', login);

// MIDDLEWARE QUE VERIFICA LOGIN
rotas.use(verificarLogin);

module.exports = rotas;