const MysqlImportOsAbertas = require("./jobs/import-mysql-os-abertas")
const handleClosedOrders = require("./jobs/os-fechadas_")
const execUpdateOpenedBase = require("./jobs/updateOpenedBase")

class ManagerCron {
  constructor() {
    this.jobs = [MysqlImportOsAbertas, handleClosedOrders, execUpdateOpenedBase]
    
  }

  run() {
    this.jobs.forEach(job => job.start())
  }
}

module.exports = new ManagerCron()