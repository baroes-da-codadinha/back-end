const express = require('express');
const { loginUsuario } = require('./controladores/login');
const { cadastrarProdutos, listarProdutos, atualizarProduto, deletarProduto, ativarProduto, desativarProduto, obterProduto } = require('./controladores/produtos');
const { cadastrarUsuario, obterUsuario, atualizarUsuario } = require('./controladores/usuario');
const { cadastrarConsumidor } = require('./controladores/consumidor')
const verificarLogin = require('./filtros/verificarLogin');
const { uploadImagem, updateImagem } = require('./controladores/imagens');

const rotas = express();

// USUÁRIO
rotas.post('/usuarios', cadastrarUsuario);
rotas.post('/consumidor', cadastrarConsumidor);

// LOGIN
rotas.post('/login-usuario', loginUsuario);


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

// ROTAS DE USUÁRIO PROTEGIDAS
rotas.get('/usuarios', obterUsuario);
rotas.put('/usuarios/:id', atualizarUsuario);

// ROTAS DE IMAGENS
rotas.post('/imagem', uploadImagem)
rotas.put('/imagem', updateImagem)

module.exports = rotas;