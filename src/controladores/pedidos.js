const knex = require('../conexao');

const listarPedidos = async (req, res) => {
    const { restaurante } = req;

    try {
        if (req.params.entregue) {
            const pedidos = await knex('pedido').where({ restaurante_id: restaurante.id, entregue: true });
        } else if (!req.params.entregue) {
            const pedidos = await knex('pedido').where(() => {
                this.where({ restaurante_id: restaurante.id, entregue: false })
                orWhere({ restaurante_id: restaurante.id, entregue: null })
            });
        }

        for (const pedido of pedidos) {
            pedido.consumidor = await knex('consumidor').where({ id: pedido.consumidor_id }).first();
            pedido.endereço = await knex('endereco').where({ id: pedido.endereco_id }).first();
            pedido.itens = await knex('itens').where({ pedidos_id: pedido.id })
        }

        return res.status(200).json(pedidos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const enviarPedido = async (req, res) => {
    const { restaurante } = req;
    const { id } = req.params

    try {
        const enviarPedido = await knex('pedido')
            .where({ restaurante_id: restaurante.id, id })
            .update({ enviado: true });

        if (!enviarPedido){
            return res.status(400).json('Não foi possível enviar o pedido!');
        }

        return res.status(200).json('Pedido enviado');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarPedidos,
    enviarPedido,
}