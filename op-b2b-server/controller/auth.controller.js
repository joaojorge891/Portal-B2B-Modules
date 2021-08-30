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
        return {
            status: 'ok',
            typeUser: user[0].typeUser,
            token: token,
            expires: expires,
            userId: user[0].userId,
            name: user[0].name,
            company: user[0].company,
            creationDate: user[0].creationDate,
            status: user[0].status,
            email: user[0].email,
            uf: user[0].uf,
            nickName: user[0].nickName,
            avatar: user[0].avatar,
            department: user[0].department,
            lastLogin: user[0].lastLogin,
        }
    } else {
        return { status: 'error', error: 'Usuário ou senha inválido!' }
    }
}

