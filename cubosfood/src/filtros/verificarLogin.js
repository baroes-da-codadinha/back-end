const knex = require('../conexao');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');

const verificarLogin = async (req, res, next) => {
    const { authorizarion } = req.headers;

    if (!authorizarion) {
        return res.status(401).json('Acesso negado.');
    }

    try {
        const token = authorizarion.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, senhaHash);

        const verificarUsuario = await knex('usuario').where({ id: id }).first();

        if (!verificarUsuario) {
            return res.status.json('Usuário não foi encontrado.');
        }

        const { senha, ...usuario } = verificarUsuario;

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = verificarLogin;