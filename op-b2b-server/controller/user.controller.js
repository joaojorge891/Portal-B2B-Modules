const mongoose = require('mongoose')
const model = require('../schemas/user.schema')
const sendMail = require('./mail.controller')
const userSchema = mongoose.model('users_new', model.UserSchema, 'users_new')

exports.save = async function (user) {
    switch (user.requester) {
        case 'updateByAdmin':
            try {
                let userPrevious = await userSchema.findById(user._id)
                if (userPrevious.requester === 'newByUser') {
                    await userPrevious.updateOne(user)
                    sendMail.sendMailNewRegisterToUser(user)
                    object = { status: 'ok' }
                    console.log(`[LOG] [USUARIO ${userPrevious.name} AUTORIZADO COM SUCESSO!]`)
                } else {
                    await userPrevious.updateOne(user)
                    console.log(`[LOG] [USUARIO ${userPrevious.name} ATUALIZADO COM SUCESSO!]`)
                    object = { status: 'ok' }

                }
            }
            catch (err) {
                object = { status: 'fail', error: 'Erro: ' + err.message }
            }
            return object
        case 'resetPwdByUser':

            try {

                let result = await userSchema.findOneAndUpdate({ _id: user._id }, { password: user.password })
                console.log(`[LOG] [SENHA DO USUARIO ${result.name} RESETADO COM SUCESSO!]`)
                object = { status: 'ok' }

            }

            catch (err) {
                object = { status: 'fail', error: 'Erro: ' + err.message }
            }
            return object

        case 'validateUser':
            try {

                if (user.status === 'active') {
                    let result = await userSchema.findByIdAndUpdate(user._id, user)
                    object = { status: 'ok' }
                    console.log(`[LOG] [USUARIO ${result.name} AUTORIZADO COM SUCESSO!]`)
                    sendMail.sendMailNewRegisterToUser(user)

                } else {
                    let result = await userSchema.findByIdAndUpdate(user._id, user)
                    object = { status: 'ok' }
                    console.log(`[LOG] [USUARIO ${result.name} REJEITADO PELO ADMIN!]`)
                    sendMail.sendMailNewRegisterRejectToUser(user)


                }
            }
            catch (err) {
                object = { status: 'fail', error: 'Erro: ' + err.message }
            }
            return object

        case 'newByUser':
            try {
                let userModel = new userSchema(user)
                userModel.creationDate = new Date()
                let userObject = await userModel.save()
                object = { status: 'ok' }
                console.log(`[LOG] [USUARIO ${userObject.name} CRIADO COM SUCESSO! (SOLICITACAO DE USUARIO)]`)
                sendMail.sendMailNewRegisterToAdmin(userObject)

            } catch (err) {
                object = { status: 'fail', error: 'Erro: ' + err.message }
            }
            return object

        case 'newByAdmin':
            try {
                let userModel = new userSchema(user)
                userModel.creationDate = new Date()
                let userObject = await userModel.save()
                object = { status: 'ok' }
                console.log(`[LOG] [USUARIO ${userObject.name} CRIADO COM SUCESSO! (BY ADMIN)]`)
            } catch (err) {
                object = { status: 'fail', error: 'Erro: ' + err.message }
            }
            return object

    }

}

exports.updateLastLogin = async function (user) {
    try {

        let result = await userSchema.findOneAndUpdate({ userId: user.userId }, { lastLogin: user.lastLogin })
        console.log(`[LOG] [ULTIMO ACESSO DO USUARIO ${result.userId} ATUALIZADO COM SUCESSO!]`)
        object = { status: 'ok' }

    }

    catch (err) {
        object = { status: 'fail', error: 'Erro: ' + err.message }
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

exports.delete = async function (req, res) {

    userSchema.deleteOne({ '_id': req.params.id }, function (err) {
        if (err) {
            return res.send(err)

        } else {
            console.log(`[LOG] [USUARIO ${req.params.id} REMOVIDO COM SUCESSO!]`)
            return res.send({ status: 'ok' })
        }
    })
}

exports.findById = async function (id) {

    let object = null
    let doc = await userSchema.findById(id)
    if (doc != null) {
        object = doc
    } else {
        object = { status: 'not_found' }


    }
    return object


}

exports.findByUser = async function (user) {
    try {
        let filter = {}
        filter['userId'] = { '$eq': user }
        var user = await userSchema.find(filter)
    } catch (error) {
        throw new Error(error)
    }
    return (user)

}

exports.findByTypeUser = async function () {

    let filter = {}
    filter['typeUser'] = { '$eq': admin }
    let typeUser = await userSchema.find(filter)


    return typeUser

}

exports.findByMail = async function (email) {

    let filter = {}
    filter['email'] = { '$eq': email }
    var user = await userSchema.find(filter)
    if (user != null && user != undefined && user != '') {
        sendMail.sendMailPwdRecovery(user)
        return { status: 'ok' }

    } else {
        return { status: 'error' }
    }

}

exports.findMail = async function (email) {

    let filter = {}
    filter['email'] = { '$eq': email }
    var mail = await userSchema.find(filter)
    if (mail != null && mail != undefined && mail != '') {
        return { exist: true }
    } else {
        return { exist: false }
    }

}

exports.find = function (req) {
    let promise = new Promise(function (resolve, reject) {
        let page = 0
        let filter = {}
        let object = {
            items: [],
            hasNext: false
        }

        if (req.params.id != null) {
            filter['user'] = {
                '$regex': req.params.id,
                "$options": "i"
            }
        }

        if (req.query.page != null) {
            page = Number(req.query.page) || 0
        }

        userSchema.find(filter)
            .select(
                {
                    '_id': 1,
                    'name': 1,
                    'user': 1,
                    'company': 1,
                    'department': 1,
                    'typeUser': 1,
                    'uf': 1,
                    'creationDate': 1,
                    'status': 1
                }
            )
            .sort({ status: -1 })
            .skip(page * 15)
            .limit(15)
            .then(
                function (doc) {
                    object.items = doc
                    resolve(object)
                }
            )
    })
    return promise
}
