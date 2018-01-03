// http://eslint.org/docs/user-guide/configuring
const config = require('./config/oracle')
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2017
  },
  env: {
    browser: true
  },

  plugins: [
    'html'
  ],
  extends: [
    'eslint:recommended', 
    'standard', 
    'plugin:vue/strongly-recommended'
  ],

  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger
    'no-debugger': config.NODE_ENV === 'production' ? 2 : 1,
    // console log statements
    'no-console': config.NODE_ENV === 'production' ? 1 : 0,
    // indentation
    'indent': [2, 2],
    // triple equality
    'eqeqeq': 1,
    // var instead of let
    'no-var': 2,
    // string quotes
    'quotes': ['error', 'single', {'allowTemplateLiterals': true}]
  }
};
