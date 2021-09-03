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
        .post(userRoute.quickSearch)

    router.route('/users/mailVerify')
        .post(userRoute.mailVerify)

    router.route('/users/userIdVerify')
        .get(userRoute.findByUser)

    router.route('/auth')
        .post(authRoute.auth)

    router.route('/users')
        .get(userRoute.find)
        .post(userRoute.save)

    router.route('/users/:id')
        .delete(userRoute.delete)
        .get(userRoute.findById)

    router.route('/no-validate/:id')
        .get(userRoute.findById)

    router.route('/no-validate')
        .post(userRoute.save)

    //########reservado rotas do oemp module########

    router.route('/oemp')
        .get(oempRoute.filter)
        .post(oempRoute.save)

    router.route('/oemp/getClient')
        .get(oempRoute.getClient)

    router.route('/oemp/allbypage')
        .get(oempRoute.findAllbyPage)
        .post(oempRoute.save)

    router.route('/oemp/filter')
        .get(oempRoute.findByStatus)

    router.route('/oemp/bystatus')
        .get(oempRoute.loadOrdersByStatus)

    router.route('/oemp/byId/:id')
        .get(oempRoute.findById)

    router.route('/oemp/search')
        .post(oempRoute.quickFilter)

    router.route('/oemp/exportclosed')
        .post(oempRoute.getClosedByDate)

    router.route('/oemp/advancedSearch')
        .post(oempRoute.advancedFilter)

    router.route('/oemp/exportBase')
        .post(oempRoute.getBaseToExport)
        
    router.route('/oemp/counters')
        .get(oempRoute.getCounters)
}
