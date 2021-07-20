const authController = require('../controller/auth.controller')
const userController = require('../controller/user.controller')

module.exports = {

    auth: function (req, res) {
        let document = authController.auth(req.body)
        document.then(result => {
            if (result.status === 'ok') {
                res.send(result)
                let documentUpdateLastLogin = userController.updateLastAccess(req.body)
                documentUpdateLastLogin.then(resultado => {
                    if (resultado.status != 'ok') {
                        res.status(500).send(result.error)
                    }
                })

            } else if (result.status === 'error') {
                res.status(500).send(result.error)

            } else {
                res.status(500).send(result)
            }
        })
    }

}