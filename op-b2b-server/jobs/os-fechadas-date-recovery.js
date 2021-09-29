const cron = require('node-cron')
const mysql = require('mysql')
const { MongoClient } = require('mongodb')
const moment = require('moment')

function dateRecoveryClosedOrders() {

  async function closedOrdersRecovery(mysqlConnection, tableName, closedMongoCollection) {
    let result = 'closed base updated successfully!'
    try {
      await closedMongoCollection.find({}).forEach(async function (item) {
        let sql = `SELECT * FROM ${tableName} WHERE protocolo = ${item.protocolo}`
        mysqlConnection.query(sql, function (error, rows) {
          if (error) {
            throw new Error(`Erro na coleta de OS fechadas do mysql: ${error}`)
          } else if (rows !== undefined && rows !== null && rows.length > 0) {
            dateRecovery(closedMongoCollection, rows, item)
          }
        })
      })
    } catch (err) {
      result = `base update failed! Status code: ${err}`
    }
    return result
  }

  function addOempData(rows) {
    const result = JSON.parse(JSON.stringify(rows))
    const dates = [moment(result[0].DatadeAbertura).format('DD/MM/YYYY HH:mm:ss'), moment(result[0].DatadeFechamento).format('DD/MM/YYYY HH:mm:ss')]
    return dates
  }

  async function dateRecovery(closedMongoCollection, rows, item) {
    await closedMongoCollection.updateOne({ protocolo: item.protocolo }, { $set: { DatadeAbertura: addOempData(rows)[0], DatadeFechamento: addOempData(rows)[1] } })
  }

  const url = 'mongodb://localhost:27017'
  const client = new MongoClient(url, { useUnifiedTopology: true })
  const dbName = 'op-b2b-db'
  MongoConnection()

  async function MongoConnection() {
    try {
      await client.connect()
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

  const closedTable = 'os_fechadas'
  const closedCollection = db.collection(closedTable)

  closedOrdersRecovery(mysqlCon, closedTable, closedCollection)
    .then(success => console.log(success)).catch(e => console.log(e))

}

module.exports = cron.schedule('*/4 * * * *', dateRecoveryClosedOrders, {
  scheduled: false
})