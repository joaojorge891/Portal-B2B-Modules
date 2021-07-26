const MysqlImportOsAbertas = require("./jobs/import-mysql-os-abertas")
const handleClosedOrders = require("./jobs/os-fechadas_")

class ManagerCron {
  constructor() {
    this.jobs = [MysqlImportOsAbertas, handleClosedOrders]
    //this.jobs = [MysqlImportOsAbertas]
  }

  run() {
    this.jobs.forEach(job => job.start())
  }
}

module.exports = new ManagerCron()