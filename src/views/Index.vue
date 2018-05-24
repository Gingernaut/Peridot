<template>
  <div class="home">
    Hello {{ name }}
    <button @click="setName()">Click Me</button>
  </div>
</template>

<script>
// @ is an alias to /src

import HelloWorld from "@/components/HelloWorld.vue"

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  mixins: [],
  data() {
    return {
      name: "bob",
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  computed: {},
  methods: {},
  filters: {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
}
</script>
