const nodemailer = require('nodemailer')
const moment = require('moment')
const configurations = require('../environment')
const mongoose = require('mongoose')
const model = require('../schemas/user.schema')
const userSchema = mongoose.model('users_new', model.UserSchema, 'users_new')


const transporter = nodemailer.createTransport({
    host: configurations.mailHost,
    port: configurations.mailPort,
    secure: false,
    auth: {
        user: configurations.mailUser,
        pass: configurations.mailPwd
    },
    tls: { rejectUnauthorized: false }
})

exports.sendMailPwdRecovery = async function (user) {
    let userResetPwd = user
    let token = moment().add(1, 'hour').valueOf()

    let mailOptions = {
        from: 'no-reply@', // sender address
        to: userResetPwd[0].email, // list of receivers
        subject: `Portal de Operações B2B - Reset de Senha`, // Subject line
        html: `<p>Caro ${userResetPwd[0].name},</p><br/>
               <p>Por favor, Clique neste <a href="${configurations.hostApplication}/#/unauthenticated/reset-pwd/${userResetPwd[0]._id}/${token}">Link</a> para prosseguir com reset da sua senha.<p/>
               <p>Link válido por 1 hora<p/><br/>
               <p>Att<p/>
               <p>Dev Team - Portal B2B<p/>`
    }
    let info = await transporter.sendMail(mailOptions)
        .catch(function (err) {
            console.log('Erro: ', err)
        })
    if (info !== undefined) {
        console.log('email enviado com sucesso!')
        return { status: 'ok', info: info }
    } else {
        return { status: 'err', error: 'Erro ao enviar o email, contacte o administrador do sistema!' }
    }

}

exports.sendMailNewRegisterToAdmin = async function (user) {
    let admins = (await userSchema.find({ typeUser: 'admin' }))

    let convertEmArray = []
    for (i = 0; i < admins.length; i++) {
        if (convertEmArray.indexOf(admins[i].email) === -1) {
            convertEmArray.push(admins[i].email)
        }
    }

    let adminsList = convertEmArray.toString()

    let mailOptions = {
        from: 'no-reply@', // sender address
        to: adminsList, // list of receivers
        subject: `Portal de Operações B2B - Solicitação de Novo Usuário`, // Subject line
        html: `<p>Caro administrador,</p><br />
                <p>Por favor, avalie esta solicitação de novo usuário clicando neste <a
                href="${configurations.hostApplication}/#/home-admin/users/no-validate/${user._id}">Link</a>. Abaixo o motivo da
                solicitação emitida pelo usuário:</p><br />
        <font color="black" face="Verdana" size="3px"><strong><i>${user.reason}</i></strong></font><br /><br />
        
        <p>Att</p>
        <p>Dev Team - Portal B2B</p>`
    }
    let info = await transporter.sendMail(mailOptions)
        .catch(function (err) {
            console.log('Erro: ', err)
        })
    if (info !== undefined) {
        console.log('email enviado com sucesso!')
        return { status: 'ok', info: info }
    } else {
        return { status: 'err', error: 'Erro ao enviar o email, contacte o administrador do sistema!' }
    }

}

exports.sendMailNewRegisterToUser = async function (user) {

    let mailOptions = {
        from: 'no-reply@', // sender address
        to: user.email, // list of receivers
        subject: `Portal de Operações B2B - Liberação de Login`, // Subject line
        html: `<p>Caro ${user.name},</p><br/>
               <p>Seu login foi liberado com sucesso. Clique no link abaixo para acessar o Portal de Operações B2B.<p/><br/>
               <a href="http://10.61.81.95/op_b2b/index.php">http://10.61.81.95/op_b2b/index.php<a/><br/><br/>
               <p>Att<p/>
               <p>Portal Dev Team - Portal B2B<p/>`
    }
    let info = await transporter.sendMail(mailOptions)
        .catch(function (err) {
            console.log('Erro: ', err)
        })
    if (info !== undefined) {
        console.log('email enviado com sucesso!')
        return { status: 'ok', info: info }
    } else {
        return { status: 'err', error: 'Erro ao enviar o email, contacte o administrador do sistema!' }
    }

}

exports.sendMailNewRegisterRejectToUser = async function (user) {

    let mailOptions = {
        from: 'no-reply@', // sender address
        to: user.email, // list of receivers
        subject: `Portal de Operações B2B - Liberação de Login`, // Subject line
        html: `<p>Caro ${user.name},</p>
               <p>Sua solicitação de login não foi aceita. Abaixo o motivo:<p/><br/>
               <font color="black" face="Verdana" size="3px"><strong><i>${user.rejectReason}</i></strong></font><br /><br />
               <p>Para esclarecimentos, favor enviar e-mail para LD-PORTALB2BBR@oi.net.br<p/><br/>


              <p>Dev Team - Portal B2B<p/>`
    }
    let info = await transporter.sendMail(mailOptions)
        .catch(function (err) {
            console.log('Erro: ', err)
        })
    if (info !== undefined) {
        console.log('email enviado com sucesso!')
        return { status: 'ok', info: info }
    } else {
        return { status: 'err', error: 'Erro ao enviar o email, contacte o administrador do sistema!' }
    }

}
