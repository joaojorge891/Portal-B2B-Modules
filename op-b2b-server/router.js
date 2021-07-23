exports.appRouter = function (app) {
    const express = require('express')
    const jwtValidate = require('./jwt/jwt-validate')
    const router = express.Router()
    const userRoute = require('./routes/user.route')
    const oempRoute = require('./routes/oemp.route')
    const authRoute = require('./routes/auth.route')
    const jsonConvert = express.json()
    const urlEncodedConvert = express.urlencoded()

    app.use(jsonConvert)

    app.use(urlEncodedConvert)

    app.use('/api', router)

    //########reservado rotas do user module########

    router.route('/users/resetPwd')
        .post(userRoute.resetPwd)

    router.route('/users/changePwd')
        .post(userRoute.changePwd)

    router.route('/users/new-register')
        .post(userRoute.save)

    router.route('/users/search')
        .get(jwtValidate, userRoute.findByUser)

    router.route('/users/mailverify')
        .post(userRoute.mailVerify)

    router.route('/users/userverify')
        .post(userRoute.userVerify)

    router.route('/auth')
        .post(authRoute.auth)

    router.route('/users')
        .get(jwtValidate, userRoute.find)
        .post(jwtValidate, userRoute.save)

    router.route('/users/:id')
        .delete(jwtValidate, userRoute.delete)
        .get(jwtValidate, userRoute.findById)

    router.route('/no-validate/:id')
        .get(userRoute.findById)

    router.route('/no-validate')
        .post(userRoute.save)

    //########reservado rotas do oemp module########

    router.route('/oemp')
        .get(oempRoute.filter)
        .post(oempRoute.save)

    router.route('/oemp/allbypage')
        .get(oempRoute.findAllbyPage)
        .post(oempRoute.save)

    router.route('/oemp/filter')
        .get(oempRoute.findByStatus)

    router.route('/oemp/bystatus')
        .get(oempRoute.loadOrdersByStatus)

    router.route('/oemp/byid/:id')
        .get(oempRoute.findById)

    router.route('/oemp/search')
        .get(oempRoute.findByCircuit)

    router.route('/oemp/exportclosed')
        .post(oempRoute.getClosedByDate)

    router.route('/oemp/new')
        .get(oempRoute.newFilter)

    router.route('/oemp/advancedsearch')
        .post(oempRoute.advancedFilter)

    router.route('/oemp/exportopen')
        .get(oempRoute.getTotalOpen)

    router.route('/oemp/counters')
        .get(oempRoute.getCounters)
}