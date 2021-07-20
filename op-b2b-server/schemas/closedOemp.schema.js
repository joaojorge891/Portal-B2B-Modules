const mongoose = require('mongoose')
const closedOempSchema = new mongoose.Schema(

    {
        fonte: String,
        status: String,
        geo: String,
        protocolo: Number,
        osCrm: String,
        uf: String,
        uf_b: String,
        gra_b: String,
        estacao_b: String,
        loc_b: String,
        localidade: String,
        circuito: String,
        acesso: String,
        circuitoAssociado: String,
        produto: String,
        tipoOS: String,
        tipoR1: String,
        servico: String,
        velocidade: String,
        vel: String,
        NomedoCliente: String,
        Conglomerado: String,
        endereco: String,
        DatadeAbertura: Date,
        DatadeFechamento: Date,
        TMI_Exp: String,
        TMI_Op: String,
        TMI_Ger: String,
        segm: String,
        estacao: String,
        linha: String,
        atendimento: String,
        TecnologiaAcesso: String,
        ModelodoRoteador: String,
        ItxIsento: String,
        pove: String,
        cnpj: String,
        cnpjRaiz: String,
        ExecutivoAtencao: String,
        GerentedeEntrega: String,
        GestordeEntrega: String,
        obsAbertura: String,
        obsFechamento: String
    },
    {
        collection: 'os_fechadas'
    }

)

module.exports = { Mongoose: mongoose, closedOempSchema: closedOempSchema }