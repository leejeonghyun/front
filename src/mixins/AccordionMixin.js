export default {
  data() {
    return {
      accordionViewInit: false,
      accodionActive: {} // TEST
    };
  },
  methods: {
    accordionEvent() {
      const $target = event.currentTarget;
      const controls = $target.getAttribute('aria-controls');
      const expanded = $target.getAttribute('aria-expanded') === "true" ? true : false;
      if (expanded) {
        document.getElementById(controls).setAttribute('hidden', true);
      } else {
        document.getElementById(controls).removeAttribute('hidden');
      }
      $target.setAttribute('aria-expanded', !expanded);
    },
    accordionInit(groupKey) { // 초기값 필요한 경우
      const $this = this;
      const group = document.querySelector('[data-group=' + groupKey + ']');
      const el = group.querySelectorAll('.btn-accordion');
      for (let i = 0; i< el.length; i++) {
        const expanded = el[i].getAttribute('aria-expanded');
        const controls = el[i].getAttribute('aria-controls');
        if (expanded === 'true') {
          $this.$set(this.accodionActive, [controls], true);
        }
      }
      this.accordionViewInit = true;
    },
    accordionEvent02() {
      const $target = event.currentTarget;
      const controls = $target.getAttribute('aria-controls');
      const expanded = $target.getAttribute('aria-expanded');
      if (this.accodionActive[controls] === undefined) {
        this.$set(this.accodionActive, [controls], true);
        $target.setAttribute('aria-expanded', true);
      } else {
        this.$set(this.accodionActive, [controls], !this.accodionActive[controls]);
        $target.setAttribute('aria-expanded', !expanded);
      }
    },
    accordionGroupEvent02(groupKey) {
      const $this = this;
      const $target = event.currentTarget;
      const group = document.querySelector('[data-group=' + groupKey + ']');
      const expanded = $target.getAttribute('aria-expanded') === "true" ? true : false;
      const el = group.querySelectorAll('.btn-accordion');
      if (expanded) {
        const targetContent = $target.getAttribute('aria-controls');
        $target.setAttribute('aria-expanded', false);
        $this.$set(this.accodionActive, targetContent, false);
      } else {
        for (let i = 0; i< el.length; i++) {
          const controls = el[i].getAttribute('aria-controls');
          $this.$set(this.accodionActive, [controls], false);
          el[i].setAttribute('aria-expanded', false);
          if ($target === el[i]) {
            $this.$set(this.accodionActive, [controls], true);
            $target.setAttribute('aria-expanded', true);
          }
        }
      }
    },
    accordionGroupEvent() {
      const $target = event.target;
      let parents = $target.parentNode;
      const controls = $target.getAttribute('aria-controls');
      let btns = [];
      let elements = [];
      const isParents = parents.classList.contains('wrap-accordion');
      if (!isParents) {
        parents = parents.parentNode;
      }
      elements = parents.querySelectorAll('.accordion-content');
      btns = parents.querySelectorAll('.btn-accordion');
      for (let i=0; i < elements.length; i++) {
        elements[i].setAttribute('hidden', true);
        btns[i].setAttribute('aria-expanded', false);
      }
      document.getElementById(controls).removeAttribute('hidden');
      $target.setAttribute('aria-expanded', true);
    }
  }
};
