const cron = require('node-cron')
const mysql = require('mysql')
const { MongoClient } = require('mongodb');
const fs = require('fs');


function handleClosedOrders() {

  async function removeCompletedInsertClosed(mysqlConnection, tableName, openMongoCollection, closedMongoCollection) {
    let result = 'closed base updated successfully!'
    const orderStatus = ['concluido', 'NA']
    try {
      await openMongoCollection.find({ status: { $in: orderStatus } }).forEach( async function (item) {
        let sql = `SELECT * FROM ${tableName} WHERE protocolo = ${item.protocolo}`
        mysqlConnection.query(sql, function (error, rows) {
          if (error) {
            throw new Error(`Erro na coleta de OS fechadas do mysql: ${error}`)
          } else if (rows !== undefined && rows !== null && rows.length > 0) {
            updateCollections(closedMongoCollection, openMongoCollection, rows, item)
          }
        })
      })
    } catch (err) {
      result = `base update failed! Status code: ${err}`
    }
    const date = new Date()
    const formatedDate = ((date.getDate())) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    fs.writeFileSync('completedLastUpdate.txt', formatedDate)
    return result
  }

  function addOempData(rows, item) {
    let result = JSON.parse(JSON.stringify(rows))
    result[0].operadora_Oemp = item.operadora_Oemp,
      result[0].observacao_Oemp = item.observacao_Status,
      result[0].data_Contratacao = item.data_Contratacao,
      result[0].prazo_Operadora = item.prazo_Operadora,
      result[0].previsao_Entrega = item.previsao_Entrega,
      result[0].previsao_Atual = item.previsao_Atual,
      result[0].data_Instalacao = item.data_Instalacao,
      result[0].taxa_Instalacao = item.taxa_Instalacao,
      result[0].taxa_Mensal = item.taxa_Mensal,
      result[0].tempo_Contrato = item.tempo_Contrato,
      result[0].codigo_Viabilidade = item.codigo_Viabilidade,
      result[0].designacao_Oemp = item.designacao_Oemp,
      result[0].responsavel = item.responsavel,
      result[0].gestao = item.gestao
    return result
  }

  async function updateCollections(closedMongoCollection, openMongoCollection, rows, item) {
    await closedMongoCollection.insertMany(addOempData(rows, item))
    //await openMongoCollection.deleteOne({ protocolo: item.protocolo })
  }

  // mongoose.connect("mongodb://localhost/op-b2b-db", { useNewUrlParser: true, useUnifiedTopology: true })
  // const db = mongoose.connection
  // db.on('error', console.error.bind(console, 'Mongo DB Connection error:'))
  const url = 'mongodb://localhost:27017'
  const client = new MongoClient(url, { useUnifiedTopology: true })
  const dbName = 'op-b2b-db'
  MongoConnection()

  async function MongoConnection() {
    try {
      await client.connect()
      //console.log('Connected successfully to server...')
    } catch (error) {
      throw new Error('falha na conexao com o banco: ' + error)
    }
  }

  const db = client.db(dbName)



  const mysqlCon = mysql.createConnection({

    // host: 'localhost',
    // user: 'root',
    // password: '89118642',
    // port: 3306,
    // database: 'os'

    host: 'localhost',
    user: 'icduser',
    password: '102030',
    port: 3306,
    database: 'opb2b'
  })

  mysqlCon.connect()

  const openTable = 'os_abertas'
  const closedTable = 'os_fechadas'
  const openCollection = db.collection(openTable)
  // const closedCollection = db.collection(closedTable)
  const closedCollection = db.collection('os_fechadas_teste')

  removeCompletedInsertClosed(mysqlCon, closedTable, openCollection, closedCollection)
    .then(success => console.log(success)).catch(e => console.log(e))

}
module.exports = cron.schedule('*/1 * * * *', handleClosedOrders, {
  scheduled: false
})