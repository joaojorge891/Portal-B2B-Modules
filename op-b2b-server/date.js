const moment = require('moment')

var date = moment('16/04/2021 05:00:00', 'DD-MM-YYYY[T]HH:mm:ss').utcOffset(-360).format('YYYY-MM-DD[T]HH:mm:ss')
console.log(new Date(date))