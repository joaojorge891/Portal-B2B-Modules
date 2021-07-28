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
              obsStatus: item.observacao,
              contractDate: item.dataContratacao,
              oempDeadLine: item.prazoOperadora,
              deliveryPrediction: item.previsaoEntrega,
              currentPrediction: item.previsaoAtual,
              installationDate: item.dataInstalacao,
              installationFee: item.taxaInstalacao,
              monthlyPayment: item.mensalidade,
              contractTime: item.tempoContrato,
              feasibilityCode: item.codigoViabilidade,
              oempDesignation: item.desigOperadora
            })
          resolve(true)
        } catch (erro) { throw new Error('falha na atualização da base abertas...') }
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
