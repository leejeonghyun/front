// TODO: 미사용 삭제
export default {
  data() {
    return {
      width: 0,
      margin: parseInt(this.slideMargin)
    };
  },
  methods: {
    scrollCalculatorEvent(el, style) {
      let element = this.$el;
      while (element.clientWidth === 0) {
        element = element.parentNode;
      }
      const wrapper = element.clientWidth;
      const itemWitdh = wrapper / parseFloat(style.slideShow);
      this.width = itemWitdh;
      const container = itemWitdh * el.childNodes.length;
      el.style.width = container + 'px';
    }
  }
};
