const mongoose = require('mongoose')
const model = require('../schemas/oemp.schema')
const closedModel = require('../schemas/closedOemp.schema')
const oempSchema = mongoose.model('os_abertas', model.OempSchema, 'os_abertas')
const closedOempSchema = mongoose.model('os_fechadas', closedModel.closedOempSchema, 'os_fechadas')
const fs = require('fs')
const { error } = require('console')


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
        if (doc !== null && doc !== undefined) {
            object = doc
        } else {
            object = { status: 'fail', error: 'Erro: ' + err.message }
        }
    } catch (err) {
        throw new Error(err)
    }
    return object
}

exports.fullFilter = async function () {
    try {
        let doc = await oempSchema.find({ status: 'Em execução' })
        if (doc !== null && doc !== undefined) {
            object = (totalOrders.length).toString()
        } else {
            object = { status: 'fail', error: 'Erro: ' + err.message }
        }
    } catch (err) {
        throw new Error(err)
    }
    return object
}

exports.newFilter = async function () {
    try {
        let doc = await oempSchema.find({ status: 'Novo' })
        if (doc !== null && doc !== undefined) {
            object = (doc.length).toString()
        } else {
            object = { status: 'fail', error: 'Erro: ' + err.message }
        }
    } catch (err) {
        throw new Error(err)
    }
    return object
}

exports.geralFilter = async function () {
    try {
        let doc = await oempSchema.find({})
        if (doc !== null && doc !== undefined) {
            object = (doc.length).toString()
        } else {
            object = { status: 'fail', error: 'Erro: ' + err.message }
        }
    } catch (err) {
        throw new Error(err)
    }
    return object
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
    try {
        let doc = await oempSchema.findById(id)
        if (doc != null) {
            object = doc
        } else {
            object = { status: 'not_found' }
        }
    } catch (err) {
        throw new Error(err)
    }
    return object
}

exports.findByCircuit = async function (circuito) {
    try {
        let filter = {}
        filter['circuito'] = { '$eq': circuito }
        let doc = await oempSchema.find(filter)
        if (doc !== null && doc !== undefined) {
            object = doc
        } else {
            object = { status: 'fail', error: 'Erro: ' + err.message }
        }
    } catch (err) {
        throw new Error(err)
    }
    return object

}

exports.getTotalOpen = function () {
    let promise = new Promise(function (resolve, reject) {
        oempSchema.find({}).select(
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
            .then(doc => {
                object = doc
                resolve(object)
            }
            ).catch(error)
    })
    return promise
}

exports.getCounters = async function () {

    try {
        object = await oempSchema.aggregate([
            {
                "$group": {
                    _id: "$status",
                    count: {
                        $sum: 1,
                    }
                }
            }
        ])

    } catch (e) {
        throw new Error('Erro na atualização dos contadores!')
    } 
    return object
}

exports.getClosedByDate = async function (req) {
    let promise = new Promise(function (resolve, reject) {
        closedOempSchema.find({
            DatadeFechamento: { $gte: req.start, $lte: req.end }
        }).select(
            {
                'fonte': 1,
                'status': 1,
                'geo': 1,
                'protocolo': 1,
                'osCrm': 1,
                'uf': 1,
                'uf_b': 1,
                'gra_b': 1,
                'estacao_b': 1,
                'loc_b': 1,
                'localidade': 1,
                'circuito': 1,
                'acesso': 1,
                'circuitoAssociado': 1,
                'produto': 1,
                'tipoOS': 1,
                'tipoR1': 1,
                'servico': 1,
                'velocidade': 1,
                'vel': 1,
                'NomedoCliente': 1,
                'Conglomerado': 1,
                'endereco': 1,
                'DatadeAbertura': 1,
                'DatadeFechamento': 1,
                'TMI_Exp': 1,
                'TMI_Op': 1,
                'TMI_Ger': 1,
                'segm': 1,
                'estacao': 1,
                'linha': 1,
                'atendimento': 1,
                'TecnologiaAcesso': 1,
                'ModelodoRoteador': 1,
                'ItxIsento': 1,
                'pove': 1,
                'cnpj': 1,
                'cnpjRaiz': 1,
                'ExecutivoAtencao': 1,
                'GerentedeEntrega': 1,
                'GestordeEntrega': 1,
                'obsAbertura': 1,
                'obsFechamento': 1
            }).sort({ DatadeFechamento: -1 })
            .then(doc => {
                object = doc
                resolve(object)
            }).catch(error)

    })
    return promise
}

exports.findById = async function (id) {
    try {
        let doc = await oempSchema.findById(id)
        if (doc !== null && doc !== undefined) {
            object = doc
        } else {
            object = { status: 'not_found' }
        }

    } catch (err) {
        throw new Error(err)
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
            ).catch(error)
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
            ).catch(error)
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
            ).catch(error)

    })

    return promise
}


exports.findByStatus = function (req) {
    let promise = new Promise(function (resolve, reject) {
        let page = 0
        let object = {
            items: [],
            hasNext: false
        }

        if (req.page != null) {
            page = Number(req.page) || 0
        }
        if (req.status === 'completedCounter') {

            const completedLastUpdate = fs.readFileSync('completedLastUpdate.txt', 'utf8')
            object = { completedLastUpdate }
            resolve(object)
        } else {
            oempSchema.find({ status: req.status })
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
                ).catch(error)
        }

    })

    return promise
}


