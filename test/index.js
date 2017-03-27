const test = require("tape").test
const join = require("path").join

const Fly = require("fly")
const fixtureDir = join(__dirname,'fixtures')
const eslintOpt = {
  configFile: join(fixtureDir, '.eslintrc')
}

test("pass", t => {
  t.plan(2)
  const fly = new Fly({
    plugins: [
      require("../")
    ],
    tasks : {
      *foo (f) {
        yield f.source(join(fixtureDir, "pass.js"))
          .eslint(eslintOpt)
      }
    }
  })
  const message = "should pass lint"
  t.true("eslint" in fly.plugins, "attach `eslint()` plugin to fly")
  fly.start("foo")
    .then(() => t.ok(true, message))
    .catch(() => t.ok(false, message))
})

test("fail", t => {
  t.plan(2)
  const fly = new Fly({
    plugins: [
      require("../")
    ],
    tasks : {
      *foo (f) {
        yield f.source(join(fixtureDir, "fail.js"))
          .eslint(eslintOpt)
      }
    }
  })
  t.true("eslint" in fly.plugins, "attach `eslint()` plugin to fly")
  const message = "should fail lint"
  fly.start("foo")
    .then(() => t.ok(false, message))
    .catch((e) => {
      t.equal(e.name, "LinterError", "should throw LinterError")
    })
})
