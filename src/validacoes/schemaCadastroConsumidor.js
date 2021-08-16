const yup = require('./configuracoes');

const schemaCadastroConsumidor = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().required().email(),
    senha: yup.string().required().min(5),
    telefone: yup.number().required().min(8),
});

module.exports = schemaCadastroConsumidor;