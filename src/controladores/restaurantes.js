const knex = require('../conexao');

const listarRestaurantes = async (req, res) => {
    try {
        const { busca } = req.body;

        const restaurantes = await knex('restaurantes')
        .where('nome', 'like', `${busca}%`);

        return res.status(200).json(restaurantes);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = { listarRestaurantes }