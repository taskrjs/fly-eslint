<div align="center">
  <a href="http://github.com/flyjs/fly">
    <img width=200px  src="https://cloud.githubusercontent.com/assets/8317250/8733685/0be81080-2c40-11e5-98d2-c634f076ccd7.png">
  </a>
</div>

> [ESLint](http://eslint.org/) plugin for _[Fly][fly]_.

[![][fly-badge]][fly]
[![npm package][npm-ver-link]][releases]
[![][dl-badge]][npm-pkg-link]
[![][travis-badge]][travis-link]
[![][mit-badge]][mit]

## Usage
> Check out the [documentation](http://eslint.org/docs/user-guide/command-line-interface) to see the available options.

### Install

```a
npm install -D fly-eslint
```

### Example

```js
export function* test () {
  yield this.source("src/**/*.js").eslint()
}
```

# License

[MIT][mit] © [Jorge Bucaran][author] et [al][contributors]


[mit]:          http://opensource.org/licenses/MIT
[author]:       http://about.bucaran.me
[contributors]: https://github.com/bucaran/fly-eslint/graphs/contributors
[releases]:     https://github.com/bucaran/fly-eslint/releases
[fly]:          https://www.github.com/flyjs/fly
[fly-badge]:    https://img.shields.io/badge/fly-JS-05B3E1.svg?style=flat-square
[mit-badge]:    https://img.shields.io/badge/license-MIT-444444.svg?style=flat-square
[npm-pkg-link]: https://www.npmjs.org/package/fly-eslint
[npm-ver-link]: https://img.shields.io/npm/v/fly-eslint.svg?style=flat-square
[dl-badge]:     http://img.shields.io/npm/dm/fly-eslint.svg?style=flat-square
[travis-link]:  https://travis-ci.org/bucaran/fly-eslint
[travis-badge]: http://img.shields.io/travis/bucaran/fly-eslint.svg?style=flat-square
