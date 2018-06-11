<template>
  <transition name="fade">
    <div v-if="component" class="modal-mask" @click="close()">
      <div class="modal-container" @click.stop>
        <span class="close-button" @click="close()"/>
        <div class="modalbody">
          <transition name="fade">
            <component :is="component" :payload="payload" @exitModal="close"/>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "global-modal",
  components: {},
  props: ["component", "payload"],
  mixins: [],
  data() {
    return {}
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    document.addEventListener("keydown", (e) => this.closeOnKeyDown(e), {
      capture: true,
      passive: true,
    })
  },
  computed: {},
  methods: {
    close(result = null) {
      this.$emit("exitModal", result)
    },
    closeOnKeyDown(e) {
      if (e.keyCode === 27) {
        this.close()
      }
    },
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {
    document.removeEventListener("keydown", this.closeOnKeyDown())
  },
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 30; // over navbar, under delete dialog
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
}

.modal-container {
  height: auto;
  min-height: 380px;
  min-width: 440px;
  background-color: $white;
  border-radius: 5px;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2);
  margin-top: $stickyNavHeight * 2;
  padding: 10px;
  display: flex;
  align-self: flex-start;
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
  margin-top: $stickyNavHeight;
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
    background-color: $primary;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 700px) {
  .modal-container {
    width: 80vw;
    min-width: 0;
    margin-top: $stickyNavHeight * 1.3;
  }
}
</style>
