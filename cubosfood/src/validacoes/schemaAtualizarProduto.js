const yup = require('./configuracoes');

const schemaAtualizarProduto = yup.object().shape({
    nome: yup.string().required(),
    preco: yup.number().required(),
    permiteObservacoes: yup.string().required()
});

module.exports = schemaAtualizarProduto;