const accFunctions = {
  greet: function() {
    console.log("hello there")
  },
}

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$accountAPI", {
      value: accFunctions,
    })
  },
}
