<template>
  <div>
    <transition name="zoomIn" appear @after-leave="anmiationEnded">
      <div v-if="show" ref="container" class="dg-container">
        <div class="dg-content-cont dg-content-cont--floating">
          <div class="dg-main-content">
            <div v-if="options.header" class="dg-header">{{ options.header }}</div>

            <div v-if="options.html" class="dg-content" v-html="options.message"></div>
            <div v-else class="dg-content">{{ options.message }}</div>

            <div :class="getSkin">
              <button
                @click.prevent="clickRightBtn()"
                ref="rb"
                :class="['dg-btn', 'dg-btn--right', {'dg-btn--loading': loading}]"
              >
                <span class="dg-btn-content">{{options.okBtnTxt}}</span>
              </button>

              <div class="dg-clear"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div class="dg-backdrop"></div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      show: true,
      loading: false
    };
  },
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.$refs["rb"].focus();
  },
  computed: {
    loaderEnabled() {
      return this.options.loader === true;
    },
    getSkin() {
      return this.options.skin();
    },
  },
  methods: {
    clickRightBtn() {
      this.proceed();
    },
    proceed() {
      if (this.loading === true) return;
      this.options.promiseResolver(true);
      this.close();
    },
    close() {
      this.show = false;
    },
    anmiationEnded() {
      this.$emit("close");
    },
  }
};
</script>

<style>
@import "../styles/_animations.css";
@import "../styles/default.css";
</style>
