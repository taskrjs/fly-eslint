const CLIEngine = require("eslint").CLIEngine
const join = require("path").join

function createLinter (cli) {
  const fmt = cli.getFormatter()
  return (file) => {
    const report = cli.executeOnFiles([file])
    const msg = fmt(report.results)

    if (msg.length > 0) {
      console.warn(msg)
    }

    return {
      errorCount: parseInt(report.errorCount),
      warningCount: parseInt(report.warningCount)
    }
  }
}

function sumProperty(key) {
  return (count, obj) => count += obj[key]
}

function LinterError(message) {
  this.name = "LinterError"
  this.message = message || ""
}

LinterError.prototype = Object.create(Error.prototype)

module.exports = function (fly) {
  fly.plugin("eslint", {every: 0}, function * (files, opts) {
    const lint = createLinter(new CLIEngine(opts))

    const problems = files.map(file => lint(join(file.dir, file.base)))
      .filter(problem => problem.errorCount > 0 || problem.warningCount > 0)
    const errorCount = problems.reduce(sumProperty("errorCount"), 0)
    const warningCount = problems.reduce(sumProperty("warningCount"), 0)

    if (errorCount > 0 || warningCount > 0) {
      throw new LinterError(errorCount + " errors and " + warningCount + " warnings in " + problems.length + " files.")
    }
  })
}
