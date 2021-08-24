const excelToJson = require('convert-excel-to-json');
const mongoose = require('mongoose')
const result = excelToJson({
    sourceFile: '../usuarios.xlsx',
    columnToKey: {
        A: 'userId',
        B: 'name',
        C: 'nickName',
        D: 'uf',
        E: 'avatar',
        F: 'email',
        G: 'company',
        H: 'department',
        I: 'typeUser',
        J: 'status',
        K: 'password',
        L: 'creationDate',
        M: 'lastLogin',
    }
})

mongoose.connect("mongodb://localhost/op-b2b-db", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Mongo DB Connection error:'))



const table = 'users_new'
const usersCollection = db.collection(table)


async function importUserXlsToMongo(data, collection) {
    try {
        await collection.insertMany(data.usuarios)
        
    }
    catch (error) {
        throw new Error(error)
    }
    db.off
}

importUserXlsToMongo(result, usersCollection).then(result=> console.log('Base importada com sucesso!'))
