const MysqlImportOsAbertas = require("./jobs/import-mysql-os-abertas")
const removeCompleted = require("./jobs/os-fechadas")

class ManagerCron {
  constructor() {
    this.jobs = [MysqlImportOsAbertas, removeCompleted]
  }

  run() {
    this.jobs.forEach(job => job.start())
  }
}

module.exports = new ManagerCron()