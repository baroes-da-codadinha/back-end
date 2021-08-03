const knex = require('../conexao');
const bcrypt = require('bcrypt');
const schemaCadastroUsuario = require('../validacoes/schemaCadastroUsuario');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, restaurante } = req.body;

    try {
        await schemaCadastroUsuario.validate(req.body);
        
        const verificarEmailUsuario = await knex('usuarios').where({ email: email }).first();

        if(verificarEmailUsuario) {
            return res.status(404).json('Email informado já possui cadastro.');
        }

        const senhaCritptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios').insert({ nome: nome, email: email, senha: senhaCritptografada }).returning('*');
        
        if (!usuario) {
            return res.status(404).json('Usuário não foi cadastrado');
        }
        
        const dadosRestaurante = await knex('restaurantes').insert({ 
            usuario_id: usuario[0].id, 
            nome: restaurante.nome, 
            descricao: restaurante.descricao, 
            categoria_id: restaurante.idCategoria, 
            taxa_entrega: restaurante.taxaEntrega, 
            tempo_entrega_minutos: restaurante.tempoEntregaMinutos, 
            valor_minimo_pedido: restaurante.valorMinimoPedido }).returning('*');

        if (!dadosRestaurante) {
            return res.status(404).json('Restaurante não foi cadastrado');
        }

        return res.status(200).json('Usuário foi cadastrado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const obterUsuario = async (req, res) => {
    try {
        return res.status(200).json(req.restaurante);
        
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarUsuario,
    obterUsuario
};