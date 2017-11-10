// http://eslint.org/docs/user-guide/configuring

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

  extends: [
    'eslint:recommended',
    'standard'
  ],

  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
    // console log statements
    'no-console': 1,

    'indent': [2, 2],
    // triple equality
    'eqeqeq': 1,
    'no-var': 2
  }
}
