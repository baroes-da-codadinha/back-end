const listarRestaurantes = async (req, res) => {
    try {
        const { busca } = req;

        const restaurantes = await knex.select('nome')
            .from('restaurantes').where('nome', 'like', `${busca}%` );

        return res.status(200).json(restaurantes);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = { listarRestaurantes }