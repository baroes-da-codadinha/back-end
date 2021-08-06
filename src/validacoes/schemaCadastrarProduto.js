const yup = require('./configuracoes');

const schemaCadastroProduto = yup.object().shape({
    nome: yup.string().required(),
    preco: yup.number().required(),
    permiteObservacoes: yup.string().required(),
    urlImagem: yup.string().required(),
});

module.exports = schemaCadastroProduto;