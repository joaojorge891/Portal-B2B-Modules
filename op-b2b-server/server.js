const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const appRouter = require('./router')
const port = 8081
const ManagerCron = require('./manager-cron')

mongoose.connect('mongodb://localhost/op-b2b-db', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Mongo DB Connection error:'))

app.use((req, res, next) => {
  res.set('X-Powered-By', 'Oi-B2B')
  next()
})

app.use(cors())

appRouter.appRouter(app)

// app.use(express.static('static'))

app.listen(port, () => {
  console.log(`OP-B2B Server is running at http://localhost:${port}...`)
  ManagerCron.run()
})