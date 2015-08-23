const CLIEngine = require("eslint").CLIEngine
var counts = 0

function createLinter (cli) {
  const fmt = cli.getFormatter()
  return (file) => {
    const report = cli.executeOnFiles([file])
    const msg = fmt(report.results)
    if (msg === "") return
    console.error(msg)
    counts += parseInt(report.errorCount + report.warningCount)
  }
}

module.exports = function () {
  this.eslint = function (opts) {
    const lint = createLinter(new CLIEngine(opts))
    return this.unwrap((files) => {
      files.forEach(file => lint(file))
      if (counts > 0) throw counts + " problems."
    })
  }
}
