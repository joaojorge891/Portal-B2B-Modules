const excelToJson = require('convert-excel-to-json');
const mongoose = require('mongoose')
const result = excelToJson({
    sourceFile: '../backlog_v2.xlsx',
    columnToKey: {
        A: 'protocolo',
        B: 'circuito',
        C: 'status',
        D: 'observacao',
        E: 'dataContratacao',
        F: 'prazoOperadora',
        G: 'previsaoEntrega',
        H: 'previsaoAtual',
        I: 'dataInstalacao',
        J: 'taxaInstalacao',
        K: 'mensalidade',
        L: 'tempoContrato',
        M: 'codigoViabilidade',
        N: 'desigOperadora',
        O: 'operadora',
        P: 'responsavel',
        Q: 'gestao',
        R: 'projeto'
    }
})

mongoose.connect("mongodb://localhost/op-b2b-db", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Mongo DB Connection error:'))



const table = 'os_importadas'
const importadasCollection = db.collection(table)


async function importXlsToMongo(data, collection) {
    try {
        await collection.insertMany(data.Planilha1)
        
    }
    catch (error) {
        throw new Error('falha na inserção de dados no Mongo...')
    }
    db.off
}

importXlsToMongo(result, importadasCollection).then(result=> console.log('Base importada com sucesso!'))
