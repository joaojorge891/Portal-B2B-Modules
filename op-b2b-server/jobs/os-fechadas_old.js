const cron = require('node-cron')
const mysql = require('mysql')
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
const fs = require('fs')


function handleClosedOrders() {

  function removeCompletedInsertClosed(mysqlConnection, tableName, openMongoCollection, closedMongoCollection) {
    const promises = []
    const mainPromise = new Promise((resolve, reject) => {
      const status = ['concluido', 'NA']
      openMongoCollection.find({ status: { $in: status } }).forEach(function (item) {
        const secondaryPromise = new Promise((resolve, reject) => {
          let sql = 'select * from ' + tableName + ' where protocolo = ' + item.protocolo
          mysqlConnection.query(sql, async function (error, rows, fields) {
            if (error) {
              throw new Error(`Erro na coleta de OS fechadas do mysql: ${error}`)
            } else {
              if (rows !== undefined && rows !== null && rows.length > 0) {
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
                await closedMongoCollection.insertMany(result)
                await openMongoCollection.deleteOne({ protocolo: item.protocolo })
              }
            }
            resolve(true)
          })
        })
        promises.push(secondaryPromise)
      })
      const date = new Date()
      const formatedDate = ((date.getDate())) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
      fs.writeFileSync('completedLastUpdate.txt', formatedDate)
      Promise.all(promises).then(success => resolve('closed base updated successfully!'))
    })
    return mainPromise
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
      throw new Error('falha na conexão com o banco: ' + error)
    }
  }
  
  const db = client.db(dbName)
  


  const mysqlCon = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '89118642',
    port: 3306,
    database: 'os'

    // host: 'localhost',
    // user: 'icduser',
    // password: '102030',
    // port: 3306,
    // database: 'opb2b'
  })

  mysqlCon.connect()

  const openTable = 'os_abertas'
  const closedTable = 'os_fechadas'
  const openCollection = db.collection(openTable)
  const closedCollection = db.collection(closedTable)

  removeCompletedInsertClosed(mysqlCon, closedTable, openCollection, closedCollection)
    .then(success => console.log(success)).catch(e => console.log(e))


}
module.exports = cron.schedule('0 45 6 * Jan-Dec 1-5', handleClosedOrders, {
  scheduled: false
})