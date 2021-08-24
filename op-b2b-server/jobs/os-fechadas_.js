const cron = require('node-cron')
const mysql = require('mysql')
const mongoose = require('mongoose')
const fs = require('fs')


function handleClosedOrders() {

  function removeCompletedInsertClosed(mysqlConnection, tableName, openMongoCollection, closedMongoCollection) {
    const promises = []
    const mainPromise = new Promise((resolve, reject) => {
      openMongoCollection.find({}).forEach(function (item) {
        const secondaryPromise = new Promise((resolve, reject) => {
          let sql = 'select * from ' + tableName + ' where protocolo = ' + item.protocolo
          mysqlConnection.query(sql, async function (error, data) {
            if (error) throw new Error('Erro na coleta de OS fechadas no Mysql...')
            if (data !== undefined && data !== null && data.length > 0) {
              await openMongoCollection.deleteOne({ protocolo: item.protocolo })
              await closedMongoCollection.insertMany(data)
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


  mongoose.connect("mongodb://localhost/op-b2b-db", { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'Mongo DB Connection error:'))

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
  const closedCollection = db.collection(closedTable)

  removeCompletedInsertClosed(mysqlCon, closedTable, openCollection, closedCollection)
    .then(success => console.log(success)).catch(e => console.log(e))

}

module.exports = cron.schedule('0 10 8 * Jan-Dec 1-5', handleClosedOrders, {
  scheduled: false
})