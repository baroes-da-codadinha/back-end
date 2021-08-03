const express = require('express');
const { login } = require('./controladores/login');
const { cadastrarProdutos, listarProdutos, atualizarProduto, deletarProduto, ativarProduto, desativarProduto, obterProduto } = require('./controladores/produtos');
const { cadastrarUsuario, obterUsuario } = require('./controladores/usuario');
const verificarLogin = require('./filtros/verificarLogin');

const rotas = express();

// USUÁRIO
rotas.post('/usuarios', cadastrarUsuario);

// LOGIN
rotas.post('/login', login);

// MIDDLEWARE QUE VERIFICA LOGIN
rotas.use(verificarLogin);

// ROTAS DE PRODUTOS
rotas.get('/produtos', listarProdutos);
rotas.get('/produtos/:id', obterProduto);
rotas.post('/produtos', cadastrarProdutos);
rotas.put('/produtos/:id', atualizarProduto);
rotas.delete('/produtos/:id', deletarProduto);
rotas.post('/produtos/:id/ativar', ativarProduto);
rotas.post('/produtos/:id/desativar', desativarProduto);

// OBTER USUARIO
rotas.get('/usuarios', obterUsuario);

module.exports = rotas;