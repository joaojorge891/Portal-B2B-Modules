const authController = require('../controller/auth.controller')
const userController = require('../controller/user.controller')

module.exports = {

    auth: function (req, res) {
        let document = authController.auth(req.body)
        document.then(result => {
            if (result.status === 'ok') {
                res.send(result)
                let docLastLogin = userController.updateLastLogin(req.body)
                docLastLogin.then(resultado => {
                    if (resultado.status === 'ok') {
                        res.send(resultado)
                    } else {
                        res.status(500).send(result.error)
                    }
                })

            } else if (result.status === 'error') {
                res.status(500).send(result.error)

            }
        })
    }

}