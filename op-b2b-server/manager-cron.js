const MysqlImportOsAbertas = require('./jobs/import-mysql-os-abertas')
const handleClosedOrders = require('./jobs/os-fechadas')
const dateRecoveryClosedOrders = require('./jobs/os-fechadas-date-recovery')
const execUpdateOpenedBase = require('./jobs/updateOpenedBase')
const formatClosedOrders = require('./jobs/os-fechadas-format')

class ManagerCron {
  constructor() {
    this.jobs = [MysqlImportOsAbertas, handleClosedOrders]
    //this.jobs = [formatClosedOrders]


  }

  run() {
    this.jobs.forEach(job => job.start())
  }
}

module.exports = new ManagerCron()