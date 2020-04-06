module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    ecmaVersion: 2017,
  },
  env: {
    node: true,
  },
  rules: {
    "arrow-parens": 0,
    "generator-star-spacing": 0,
    "no-console": "off", // process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    indent: [2, 2],
    eqeqeq: 1,
    "no-var": 2,
    quotes: [
      "error",
      "double",
      {
        allowTemplateLiterals: true,
      },
    ],
    "vue/html-indent": ["error", 2],
    "vue/html-self-closing": "error",
    "vue/attributes-order": "error",
  },
  extends: ["plugin:vue/strongly-recommended", "@vue/prettier"],
}
