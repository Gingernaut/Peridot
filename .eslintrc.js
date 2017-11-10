// http://eslint.org/docs/user-guide/configuring

let allowDebug = process.env.NODE_ENV === 'production' ? 2 : 0

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'standard'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger
    'no-debugger': allowDebug,
    // console log statements
    'no-console': allowDebug,

    'indent': [2, 2]
  }
}
