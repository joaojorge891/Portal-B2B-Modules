const authController = require('../controller/auth.controller')

module.exports = {

    auth: function (req, res) {
        let document = authController.auth(req.body)
        document.then(result => {
            if (result.statusResult === 'ok') {
                res.send(result)
            } else if (result.status === 'error') {
                res.status(500).send(result.error)
            }
        })
    }
}