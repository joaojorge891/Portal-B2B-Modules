const cron = require('node-cron')
const mysql = require('mysql')
const mongoose = require('mongoose')




function MysqlImportOsAbertas() {

  function sqlQuery(mysqlConnection, tableName) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM ' + tableName + ' WHERE area = "OEMP" OR pend = "3902"'
      openMysqlConnection(mysqlConnection)
      mysqlConnection.query(sql, function (error, results) {
        if (error) {
          console.log(error)
          reject(error)
        }
        resolve(results)
        closeMysqlConnection(mysqlConnection)
      })
    })
  }

  function insertToMongo(results, mongoCollection) {
    const promises = []
    const mainPromise = new Promise((resolve, reject) => {

      results.forEach(function (item) {
        const secondaryPromise = new Promise((resolve, reject) => {
          mongoCollection.find({ protocolo: item.protocolo }).toArray(async function (error, data) {
            if (error) {
              console.log(error)
              reject(err)
            }

            if (data.length === 0) {
              if (item.pend === '3902') {
                item.gestao = 'UN'
              }
              item.status = 'novo'
              item.lastUpdate = new Date()
              await mongoCollection.insertOne(item)

            }

            else {
              const date = new Date()
              const formatedDate = ((date.getDate())) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
              await mongoCollection.updateOne({ protocolo: item.protocolo }, { $set: { lastUpdate: formatedDate } })

            }
          })
          resolve(true)
        })
        promises.push(secondaryPromise)
      })
      Promise.all(promises).then(success => resolve('open base successfully updated!'))

    })

    return mainPromise
  }

  mongoose.connect("mongodb://localhost/op-b2b-db", { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'Mongo DB Connection error:'))

  const mysqlCon = mysql.createConnection({
    host: 'localhost',
    user: 'icduser',
    password: '102030',
    port: 3306,
    database: 'opb2b'

    // host: 'localhost',
    // user: 'root',
    // password: '89118642',
    // port: 3306,
    // database: 'os'
  })

  function openMysqlConnection(mysqlConnection) {
    mysqlConnection.connect(function (err) {
      if (err) {
        return console.error('erro de conexão com o mysql: ' + err.message);
      }
    })
  }

  function closeMysqlConnection(mysqlConnection) {
    mysqlConnection.end(function (err) {
      if (err) {
        return console.error('erro na desconexão com o mysql: ' + err.message);
      }
    })
  }

  
  const table = 'os_abertas'
  const collection = db.collection(table)

  sqlQuery(mysqlCon, table)
    .then(result => insertToMongo(result, collection))
    .then(success => console.log(success)).catch(e => console.log(e))

}

module.exports = cron.schedule('0 00 8 * Jan-Dec 1-5', MysqlImportOsAbertas, {
  scheduled: false
})