<template>
  <div>
    <div v-if="modalcomponent" @click="close()" class="modal-mask" transition="modal">
      <div @click.stop class="modal-container">
          <span @click="close()" class="close-button"></span>
          <div class="modalbody">
            <component v-bind:is="modalcomponent" @exitModal="close"></component>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "global-navbar",
  components: {
    login: () => import("@/components/login-form"),
    signup: () => import("@/components/signup-form"),
  },
  props: ["modalcomponent"],
  mixins: [],
  data() {
    return {}
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.keyCode === 27) {
          this.close()
        }
      },
      {
        capture: true,
        passive: true,
      }
    )
  },
  computed: {
    modalType() {
      return this.modalcomponent
    },
  },
  methods: {
    close() {
      this.$emit("exitModal")
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    document.removeEventListener("keydown", this.close())
  },
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  height: auto;
  width: auto;
  min-height: 340px;
  width: 400px;
  background-color: $white;
  border-radius: 5px;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
  }
}

.modalbody {
  padding: 15px;
  width: 100%;
  height: 100%;
  display: block;
  margin-top: 50px;
}

.close-button {
  $size: 35px;
  height: $size;
  width: $size;
  position: absolute;
  box-sizing: border-box;
  line-height: $size;
  display: inline-block;
  cursor: pointer;
  cursor: hand;
  align-self: flex-end;

  &:before,
  &:after {
    $width: 22px;
    $height: 3px;
    transform: rotate(-45deg);
    content: "";
    position: absolute;
    top: 45%;
    left: 25%;
    display: inline-block;
    height: $height;
    width: $width;
    background-color: $outline;
    transition: all 0.25s ease-out;
  }

  &:after {
    transform: rotate(-135deg);
  }

  &:hover {
    &:before,
    &:after {
      transform: rotate(0deg);
    }
  }
}

@media (max-width: 600px) {
  .modal-container {
    width: 80vw;
    height: auto;
    min-height: 50vh;
  }
}
</style>
