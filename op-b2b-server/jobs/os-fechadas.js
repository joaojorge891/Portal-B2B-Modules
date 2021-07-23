const cron = require('node-cron')
const mysql = require('mysql')
const mongoose = require('mongoose')
const fs = require('fs')


function removeCompleted() {

  function sqlQuery(mysqlConnection, tableName) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM ' + tableName
      mysqlConnection.query(sql, function (error, results) {
        if (error) {
          console.log(error)
          reject(error)
        }
        resolve(results)
        mysqlConnection.end()
      })
    })
  }

  function removeMongo(results, openMongoCollection, closedMongoCollection) {
    const promises = []
    const mainPromise = new Promise((resolve, reject) => {
      results.forEach(function (item) {
        const secondaryPromise = new Promise((resolve, reject) => {
          openMongoCollection.find({ protocolo: item.protocolo, status: 'completed' }).toArray(async function (error, data) {
            if (error) {
              console.log(error)
              reject(err)
            }

            if (data.length > 0) {
              await openMongoCollection.deleteOne({ protocolo: item.protocolo })
              await closedMongoCollection.insertOne(item)
              const date = new Date()
              const formatedDate = ((date.getDate())) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
              fs.writeFileSync('completedLastUpdate.txt', formatedDate)
              resolve(true)

            } else {
              const date = new Date()
              const formatedDate = ((date.getDate())) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
              fs.writeFileSync('completedLastUpdate.txt', formatedDate)
              resolve(true)
            }

          })
        })
        promises.push(secondaryPromise)
      })
      Promise.all(promises).then(success => resolve('completed base successfully updated!'))
    })
    openMongoCollection.off
    closedMongoCollection.off
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
    // database: 'os_fechadas'

    host: 'localhost',
    user: 'icduser',
    password: '102030',
    port: 3306,
    database: 'opb2b'
  })

  mysqlCon.connect()

  const tableMongo = 'os_abertas'
  const tableMysql = 'os_fechadas'
  const openCollection = db.collection(tableMongo)
  const closedCollection = db.collection(tableMysql)

  sqlQuery(mysqlCon, tableMysql)
    .then(result => removeMongo(result, openCollection, closedCollection)).then(success => console.log(success)).catch(e => console.log(e))

}

module.exports = cron.schedule('0 00 7 * Jan-Dec 1-5', removeCompleted, {
  scheduled: false
})