const yup = require('./configuracoes');

const schemaCadastroUsuario = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().required().email(),
    senha: yup.string().required().min(5),
    restaurante: yup.object().shape({
        nome: yup.string().required('Informe o nome do produto.'),
        idCategoria: yup.number().required('Informe a categoria do produto.'),
        taxaEntrega: yup.number().required('Informe a taxa de entrega.'),
        tempoEntregaEmMinutos: yup.number().required('Informe o tempo de entrega.'),
        valorMinimoPedido: yup.number().required('Informe o valor mínimo do produto.')
    })
});

module.exports = schemaCadastroUsuario;