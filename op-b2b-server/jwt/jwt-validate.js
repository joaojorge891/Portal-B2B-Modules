const jwt = require('jwt-simple')
const controller = require('../controller/user.controller')

module.exports = async function (req, res, next) {
    let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['access_token']
    let userParam = req.body.username || req.headers.username

    if (token) {
        try {
            let decoded = jwt.decode(token, 'SECRET-OP-B2B-TOKEN')
            if (decoded.exp <= Date.now()) {
                res.status(400).json({ error: 'Acesso expirado, faça login novamente.' })
            }

            let user = await controller.findByUser(userParam)

            if (user != null) {
                if (decoded.iss == user[0]._id) {
                    req.user = user
                    return next()
                } else {
                    res.status(500).json({ error: 'Usuário inválido.' })
                }

            } else {
                res.status(500).json({ error: 'Seu token é inválido.' })
            }
        } catch (err) {
            console.log('[JWT] Erro: ', err)
            res.status(500).json({ error: 'Seu token é inválido.' })
        }

    } else {
        res.status(401).json({ error: 'Token não encontrado ou informado.' })
    }

    return
}