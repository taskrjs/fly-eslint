const CLIEngine = require("eslint").CLIEngine

function createLinter (cli) {
  const fmt = cli.getFormatter()
  return (file) => {
    const report = cli.executeOnFiles([file])
    const msg = fmt(report.results)
    return {
      errorCount: parseInt(report.errorCount),
      warningCount: parseInt(report.warningCount)
    }
  }
}

function sumProperty(key) {
  return (count, obj) => count += obj[key]
}

module.exports = function () {
  this.eslint = function (opts) {
    const lint = createLinter(new CLIEngine(opts))

    return this.unwrap((files) => {
      const problems = files.map(file => lint(file))
        .filter((problem) => problem)

      const errorCount = problems.reduce(sumProperty('errorCount'), 0)
      const warningCount = problems.reduce(sumProperty('warningCount'), 0)

      if (errorCount > 0 || warningCount.length > 0) {
        throw `${errors} errors and ${warnings} warnings in ${problems.length} files.`
      }
    })
  }
}
