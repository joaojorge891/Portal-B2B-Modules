const { json } = require('express')
const controller = require('../controller/oemp.controller')

module.exports = {


    save: function (req, res) {
        let document = controller.save(req.body)
        document.then(result => res.send(result))

    },

    advancedFilter: function (req, res) {
        const clearBody = req.body
        delete clearBody.access_token
        delete clearBody.username
        let document = controller.advancedFilter(clearBody)
        document.then(result => res.send(result))

    },

    findByCircuit: function (req, res) {
        let document = controller.findByCircuit(req.query.circuito)
        document.then(result => res.send(result))
    },

    findByStatus: function (req, res) {
        let document = controller.findByStatus(req.query)
        document.then(result => res.send(result))
    },

    findByCircuit: function (req, res) {

        let document = controller.findByCircuit(req.query.circuito)
        document.then(result => res.send(result))
    },

    findById: function (req, res) {
        let document = controller.findById(req.params.id)
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

    getTotalOpen: function (req, res) {
        let document = controller.getTotalOpen(req)
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

    fullFilter: function (req, res) {
        let document = controller.fullFilter()
        document.then(result => res.send(result))

    },

    newFilter: function (req, res) {
        let document = controller.newFilter(req)
        document.then(result => res.send(result))
    },

    geralFilter: function (req, res) {
        let document = controller.geralFilter(req)
        document.then(result => res.send(result))
    },

    changePwd: function (req, res) {
        let document = controller.save(req.body)
        document.then(result => res.send(result))

    },

    loadOrdersByStatus: function (req, res) {
        let document = controller.loadOrdersByStatus(req)
        document.then(result => {
            res.send(result)
        });
    }

}

