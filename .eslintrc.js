module.exports = {
  "root": true,
  "parserOptions": {
    parser: "babel-eslint",
    sourceType: "module",
    ecmaVersion: 2017
  },
  "env": {
    node: true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier"
  ],
  "rules": {
    "arrow-parens": 0,
    "generator-star-spacing": 0,
    "no-debugger": 1,
    "no-console": 0,
    "indent": [
      2,
      2
    ],
    "eqeqeq": 1,
    "no-var": 2,
    "quotes": [
      "error",
      "double",
      {
        "allowTemplateLiterals": true
      }
    ],
    "vue/html-indent": [
      "error",
      2
    ],
    "vue/html-self-closing": "error",
    "vue/attributes-order": "error"
  },
  "parserOptions": {
    "parser": "babel-eslint"
  }
}