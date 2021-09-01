const { json } = require('express')
const controller = require('../controller/user.controller')

module.exports = {


    save: function (req, res) {
        let document = controller.save(req.body)
        document.then(result => res.send(result))

    },

    // updateLastLogin: function (req, res) {
    //     let document = controller.updateLastLogin(req.body)
    //     document.then(result => res.send(result))

    // },

    filter: function (req, res) {
        let document = controller.filter(req.query)
        document.then(result => res.send(result))
    },

    delete: controller.delete,

    findById: function (req, res) {
        let document = controller.findById(req.params.id)
        document.then(result => res.send(result))
    },

    findByUser: function (req, res) {
        let document = controller.findByUser(req.query.user)
        document.then(result => res.send(result))
    },

    find: function (req, res) {
        var document = controller.find(req)
        document.then(result => res.send(result))
    },

    resetPwd: function (req, res) {
        var document = controller.findByMail(req.body.email)
        document.then(result => res.send(result))
    },

    changePwd: function (req, res) {
        let document = controller.save(req.body)
        document.then(result => res.send(result))

    },

    mailVerify: function (req, res) {
        var document = controller.findMail(req.body.email)

        document.then(result => {
            res.send(result)


        });
    },

    userVerify: function (req, res) {
        var document = controller.findByUser(req.body.user)

        document.then(result => {
            res.send(result)


        });
    },

}

