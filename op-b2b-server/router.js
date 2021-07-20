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
        .get(jwtValidate, oempRoute.filter)
        .post(jwtValidate, oempRoute.save)

    router.route('/oemp/all')
        .get(jwtValidate, oempRoute.findAllbyPage)
        .post(jwtValidate, oempRoute.save)

    router.route('/oemp/filter')
        .get(jwtValidate, oempRoute.findByStatus)

    router.route('/oemp/load')
        .get(jwtValidate, oempRoute.loadOrdersByStatus)

    router.route('/oemp/byid/:id')
        .get(jwtValidate, oempRoute.findById)

    router.route('/oemp/search')
        .get(jwtValidate, oempRoute.findByCircuit)

        router.route('/oemp/exportclosed')
        .post(jwtValidate, oempRoute.getClosedByDate)

    router.route('/oemp/new')
        .get(jwtValidate, oempRoute.newFilter)

    router.route('/oemp/advancedsearch')
        .post(jwtValidate, oempRoute.advancedFilter)

    router.route('/oemp/total-counter')
        .get(jwtValidate, oempRoute.totalFilter)


}