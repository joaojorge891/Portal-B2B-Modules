const cron = require('node-cron')
const { MongoClient } = require('mongodb')
const moment = require('moment')

function formatClosedOrders() {

  async function formatDateOrders(closedMongoCollection) {
    let result = 'date formated successfully!'
    try {
      await closedMongoCollection.find({}).forEach(async function (item) {
        item.DatadeFechamento = new Date(moment(item.DatadeFechamento, 'DD-MM-YYYY[T]HH:mm:ss').utcOffset(-360).format('YYYY-MM-DD[T]HH:mm:ss'))
        item.DatadeAbertura = new Date(moment(item.DatadeAbertura, 'DD-MM-YYYY[T]HH:mm:ss').utcOffset(-360).format('YYYY-MM-DD[T]HH:mm:ss'))
        await closedMongoCollection.updateOne({protocolo: item.protocolo}, {$set: {DatadeFechamento: item.DatadeFechamento, DatadeAbertura: item.DatadeAbertura}})
      })

    } catch (err) {
      result = `format date failed! Status code: ${err}`
    }
    return result
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


  const closedTable = 'os_fechadas'
  const closedCollection = db.collection(closedTable)

  formatDateOrders(closedCollection)
    .then(success => console.log(success)).catch(e => console.log(e))

}

module.exports = cron.schedule('0 05 8 * Jan-Dec 1-5', formatClosedOrders, {
  scheduled: false
})