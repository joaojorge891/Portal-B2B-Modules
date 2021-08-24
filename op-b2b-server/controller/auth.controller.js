const userController = require('./user.controller')
const moment = require('moment')
const jwt = require('jwt-simple')

exports.auth = async function (parameters) {
   let user = await userController.findByUser(parameters.userId)
    if (user != undefined && user != null & user.length > 0 && user[0].password === parameters.password) {
        let expires = moment().add(1, 'days').valueOf()
        let token = jwt.encode(
            {
                iss: user[0]._id,
                exp: expires
            },
            'SECRET-OP-B2B-TOKEN'
        )
        return { status: 'ok', 'typeUser': user[0].typeUser, 'token': token, 'expires': expires, 'username': user[0].userId }
    } else {
        return { status: 'error', error: 'Usuário ou senha inválido!' }
    }
}

