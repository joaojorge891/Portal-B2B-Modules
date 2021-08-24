const mongoose = require('mongoose')
const cron = require('node-cron')
const model = require('../schemas/oemp.schema')
const oempSchema = mongoose.model('os_abertas', model.OempSchema, 'os_abertas')


function execUpdateOpenedBase() {


  function teste(openMongoCollection, importedMongoCollection) {
    return new Promise((resolve, reject) => {
      importedMongoCollection.find({}).forEach(async function (item) {
        try {
          await oempSchema.findOneAndUpdate({ protocolo: item.protocolo },
            {
              status: item.status,
              observacao_Status: item.observacao,
              data_Contratacao: item.dataContratacao,
              prazo_Operadora: item.prazoOperadora,
              previsao_Entrega: item.previsaoEntrega,
              previsao_Atual: item.previsaoAtual,
              data_Instalacao: item.dataInstalacao,
              taxa_Instalacao: item.taxaInstalacao,
              taxa_Mensal: item.mensalidade,
              tempo_Contrato: item.tempoContrato,
              codigo_Viabilidade: item.codigoViabilidade,
              designacao_Oemp: item.desigOperadora,
              operadora_Oemp: item.operadora,
              responsavel: item.responsavel,
              gestao: item.gestao,
              projeto: item.projeto
            })
          resolve(true)
        } catch (erro) { throw new Error('falha na atualização da base abertas...'+ erro) }
      }).then(sucess => resolve('Base de abertas atualizada com sucesso'))

      importedMongoCollection.off
      openMongoCollection.off
    })
  }



  mongoose.connect("mongodb://localhost/op-b2b-db", { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'Mongo DB Connection error:'))


  const tableMongo = 'os_abertas'
  const importedTable = 'os_importadas'
  const openCollection = db.collection(tableMongo)
  const importedCollection = db.collection(importedTable)

  teste(openCollection, importedCollection)
    .then(success => console.log(success)).catch(e => console.log(e))

}

module.exports = cron.schedule('* * * * *', execUpdateOpenedBase, {
  scheduled: false
})
