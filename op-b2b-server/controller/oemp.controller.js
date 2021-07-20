const mongoose = require('mongoose')
const model = require('../schemas/oemp.schema')
const closedModel = require('../schemas/closedOemp.schema')
const oempSchema = mongoose.model('os_abertas', model.OempSchema, 'os_abertas')
const closedOempSchema = mongoose.model('os_fechadas', closedModel.closedOempSchema, 'os_fechadas')
const fs = require('fs')


exports.save = async function (order) {
    try {

        let result = await oempSchema.findByIdAndUpdate(order._id, order)
        object = { status: 'ok' }
        console.log(`[LOG] [Ordem ${result.cod} ATUALIZADA COM SUCESSO!]`)

    }
    catch (err) {
        object = { status: 'fail', error: 'Erro: ' + err.message }
    }
    return object

}

exports.advancedFilter = async function (filters) {
    try {
        let doc = await oempSchema.find(filters)
        object = doc
    } catch (err) {
        object = { status: 'fail', error: 'Erro: ' + err.message }
    }
    return object
}

exports.fullFilter = async function () {
    let totalOrders = await oempSchema.find({ status: 'Em execução' })
    let counter = (totalOrders.length).toString()
    return counter

}

exports.newFilter = async function () {
    let newOrders = await oempSchema.find({ status: 'Novo' })
    let counter = (newOrders.length).toString()
    return counter

}

exports.geralFilter = async function () {
    let newOrders = await oempSchema.find({})
    let counter = (newOrders.length).toString()
    return counter

}

exports.filter = async function (parameters) {

    const object = {
        items: [],
        hasNext: true
    }

    const filter = {}

    Object.entries(parameters).forEach(element => {

        let key = element[0]

        if (key == 'page' || key == 'pageSize') return

        if ((key == 'filter' && req.query.filter.length > 0) || key == 'user') {
            filter['user'] = { $regex: `.*${req.query.filter}.*`, $options: 'i' }
            filter[key] = element[1]
        }

    })

    try {
        let users = await userSchema.find(filter).select('-password')
        object.items = users
    } catch (error) {
        throw new Error(error)
    }
    return object
}


exports.findById = async function (id) {

    let object = null
    let doc = await oempSchema.findById(id)
    if (doc != null) {
        object = doc
    } else {
        object = { status: 'not_found' }


    }
    return object


}

exports.findByCircuit = async function (circuito) {
    let filter = {}
    filter['circuito'] = { '$eq': circuito }
    let serviceOrder = await oempSchema.find(filter)
    return (serviceOrder)

}

exports.totalFilter = async function () {
    let serviceOrder = await oempSchema.find({}).select(
        {
            '_id': 0,
            'TempoVida': 1,
            'TempoPosto': 1,
            'geo': 1,
            'uf': 1,
            'protocolo': 1,
            'osCrm': 1,
            'circuito': 1,
            'localidade': 1,
            'produto': 1,
            'velocidade': 1,
            'servico': 1,
            'oempCompany': 1,
            'pove': 1,
            'pend': 1,
            'descricao': 1,
            'gerencia': 1,
            'atividade': 1,
            'conglomerado': 1,
            'projeto': 1,
            'NomedoCliente': 1,
            'segm': 1,
            'obsAbertura': 1,
            'obsPend': 1,
            'status': 1,
            'obsStatus': 1,
            'contractDate': 1,
            'deliveryPrediction': 1,
            'accountable': 1
        }
    )
        .sort({ tempoPosto: -1 })
    return (serviceOrder)
}

exports.getClosedByDate = async function (req) {
    let serviceOrder = await closedOempSchema.find({
        DatadeFechamento: { $gte: req.start, $lte: req.end }
    })
        .sort({ DatadeFechamento: -1 })
    if (serviceOrder != null) {
        object = serviceOrder
    } else {
        object = { status: 'not_found' }
        return (object)
    }
}
exports.findById = async function (id) {

    let object = null
    let doc = await oempSchema.findById(id)
    if (doc != null) {
        object = doc
    } else {
        object = { status: 'not_found' }


    }
    return object


}



exports.filterAll = function (req) {
    let promise = new Promise(function (resolve, reject) {
        let page = 0
        let object = {
            items: [],
            hasNext: false
        }
        if (req.query.page != null) {
            page = Number(req.query.page) || 0
        }
        oempSchema.find({})
            .select(
                {
                    'TempoVida': 1,
                    'TempoPosto': 1,
                    'geo': 1,
                    'uf': 1,
                    'circuito': 1,
                    'protocolo': 1,
                    'projeto': 1,
                    'pove': 1,
                    'servico': 1,
                    'oempCompany': 1,
                    'status': 1,
                    'deliveryPrediction': 1,
                    'lastUpdate': 1
                }
            )
            .sort({ tempoPosto: -1 })
            .limit(30)
            .skip(page * 30)
            .then(doc => {
                object.items = doc
                resolve(object)
            }
            )
    })

    return promise
}

exports.findAllbyPage = function (req) {
    let promise = new Promise(function (resolve, reject) {
        let page = 0
        let object = {
            items: [],
            hasNext: false
        }
        if (req.query.page != null) {
            page = Number(req.query.page) || 0
        }
        oempSchema.find({})
            .select(
                {
                    '_id': 1,
                    'TempoVida': 1,
                    'TempoPosto': 1,
                    'geo': 1,
                    'uf': 1,
                    'circuito': 1,
                    'protocolo': 1,
                    'projeto': 1,
                    'pove': 1,
                    'servico': 1,
                    'oempCompany': 1,
                    'status': 1,
                    'deliveryPrediction': 1
                }
            )
            .sort({ tempoPosto: -1 })
            .limit(30)
            .skip(page * 30)
            .then(doc => {
                object.items = doc
                resolve(object)
            }
            )
    })

    return promise
}

exports.loadOrdersByStatus = function (req) {

    let promise = new Promise(function (resolve, reject) {
        let page = 0
        let object = {
            items: [],
            hasNext: false
        }

        if (req.query.page != null) {
            page = Number(req.query.page) || 0
        }
        oempSchema.find({ status: req.query.status })
            .select(
                {
                    '_id': 1,
                    'TempoVida': 1,
                    'TempoPosto': 1,
                    'geo': 1,
                    'uf': 1,
                    'circuito': 1,
                    'protocolo': 1,
                    'pove': 1,
                    'servico': 1,
                    'oempCompany': 1,
                    'oempDesignation': 1,
                    'contractDate': 1,
                    'deliveryPrediction': 1
                }
            )
            .sort({ tempoPosto: -1 })
            .limit(30)
            .skip(page * 30)
            .then(doc => {
                object.items = doc
                resolve(object)
            }
            )

    })

    return promise
}


exports.findByStatus = function (req) {
    let promise = new Promise(function (resolve, reject) {
        let object = {
            items: [],
            hasNext: false
        }
        if (req === 'completedCounter') {

            const completedLastUpdate = fs.readFileSync('completedLastUpdate.txt', 'utf8')
            object = { completedLastUpdate }
            resolve(object)
        } else {
            oempSchema.find({ status: req })
                .select(
                    {
                        '_id': 1,
                        'TempoVida': 1,
                        'TempoPosto': 1,
                        'geo': 1,
                        'uf': 1,
                        'circuito': 1,
                        'protocolo': 1,
                        'pove': 1,
                        'servico': 1,
                        'oempCompany': 1,
                        'oempDesignation': 1,
                        'contractDate': 1,
                        'deliveryPrediction': 1
                    }
                )
                .sort({ tempoPosto: -1 })
                .then(doc => {
                    object.items = doc
                    resolve(object)
                }
                )
        }

    })

    return promise
}


