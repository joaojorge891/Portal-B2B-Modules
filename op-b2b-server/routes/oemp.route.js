const { json } = require('express')
const controller = require('../controller/oemp.controller')

module.exports = {


    save: function (req, res) {
        let document = controller.save(req.body)
        document.then(result => res.send(result))

    },

    advancedFilter: function (req, res) {
        
        const filters = req.body
        delete filters.access_token
        delete filters.username
        
        let document = controller.advancedFilter(filters)
        document.then(result => res.send(result))

    },

    quickFilter: function (req, res) {
        let document = controller.quickFilter(req.body)
        document.then(result => res.send(result))
    },

    findByStatus: function (req, res) {
        let document = controller.findByStatus(req.query)
        document.then(result => res.send(result))
    },

    findById: function (req, res) {
        let document = controller.findCaseById(req.params.id)
        document.then(result => res.send(result))
    },

    filter: function (req, res) {
        let document = controller.filterAll(req)
        document.then(result => res.send(result))
    },

    findAllbyPage: function (req, res) {
        let document = controller.findAllbyPage(req)
        document.then(result => res.send(result))
    },

    getBaseToExport: function (req, res) {
        let document = controller.getBaseToExport(req.body)
        document.then(result => res.send(result))
    },

    getClient: function (req, res) {
        let document = controller.getClient(req)
        document.then(result => res.send(result))
    },

    getCounters: function (req, res) {
        let document = controller.getCounters(req)
        document.then(result => res.send(result))
    },

    getClosedByDate: function (req, res) {
        const clearBody = req.body
        delete clearBody.access_token
        delete clearBody.username
        
        let document = controller.getClosedByDate(clearBody)
        document.then(result => res.send(result))
    },

    loadOrdersByStatus: function (req, res) {
        let document = controller.loadOrdersByStatus(req)
        document.then(result => {
            res.send(result)
        });
    }

}

