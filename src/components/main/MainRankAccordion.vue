<template>
  <ol class="wrap-list-chart" data-emergence="hidden">
    <li class="list" v-for="(items, index) in mainRankAccordion" :key="index">
      <button
        :id="'accordionRank'+ index"
        class="btn-list-chart"
        :aria-controls="'accordionRankContent'+index"
        :aria-expanded="isActive[index]"
        @click="accordionAction(index)"
        v-on:focus="accordionAutoStop"
      >
        <ProductName :items="items.rmnTplConrCompoSbjInq" />
        <span class="ico-status up">
          <span class="hidden">순위 상승중</span>
        </span>
      </button>
      <transition
        name="accordion"
        v-on:before-enter="accordionBeforeEnter"
        v-on:enter="accordionEnter"
        v-on:after-enter="accordionAfterEnter"
        v-on:before-leave="accordionBeforeLeave"
        v-on:leave="accordionLeave"
      >
        <div
          :id="'accordionRankContent'+index"
          class="accordion-content"
          :aria-labelledby="'accordionRank'+ index"
          role="region"
          v-show="isActive[index]"
        >
          <ProductSlideMain2 :slideMargin="5" :items="items.rmnTplConrCompoSbjInq" />
        </div>
      </transition>
    </li>
  </ol>
</template>

<script>
import ProductSlideMain2 from '@/components/product/ProductSlideMain2';
import ProductName from '@/components/product/ProductName';

import emergence from 'emergence.js';
export default {
  name: 'MainRankAccordion',
  components: {
    ProductName,
    ProductSlideMain2,
  },
  data() {
    return {
      isAuto: true,
      activeNumber: 0,
      isActive: [true, false, false, false, false],
    };
  },
  props: {
    mainRankAccordion: {
      type: Array,
      default: () => ({}),
    },
  },
  methods: {
    accordionAutoStop() {
      if (!!this.intervalFunction) {
        clearInterval(this.intervalFunction);
        this.intervalFunction = undefined;
      }
    },
    accordionAuto() {
      const $this = this;
      if (!!!$this.intervalFunction) {
        $this.intervalFunction = setInterval(function() {
          const currentId = $this.activeNumber;
          const newId =
            currentId + 1 >= $this.isActive.length ? 0 : currentId + 1;
          // $this.$set($this.isActive, [currentId], false);
          // $this.$set($this.isActive, [newId], false);
          $this.isActive.splice(currentId, 1, false);
          $this.isActive.splice(newId, 1, true);
          $this.activeNumber = newId;
        }, 5000);
      }
    },
    accordionAction(id) {
      const $this = this;
      if ($this.isAuto) {
        $this.accordionAutoStop();
        if (id === $this.activeNumber) {
          $this.isActive.splice(id, 1, true);
        } else {
          $this.isActive.splice($this.activeNumber, 1, false);
          $this.isActive.splice(id, 1, true);
        }
      } else {
        if (id === $this.activeNumber) {
          if ($this.isActive[id]) {
            $this.isActive.splice(id, 1, false);
          } else {
            $this.isActive.splice(id, 1, true);
          }
        } else {
          $this.isActive.splice($this.activeNumber, 1, false);
          $this.isActive.splice(id, 1, true);
        }
      }
      $this.activeNumber = id;
      $this.isAuto = false;
    },
    accordionBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    accordionEnter(el) {
      el.style.height = el.scrollHeight + 'px';
      el.style.opacity = 1;
    },
    accordionAfterEnter(el) {
      el.style.height = 'auto';
    },
    accordionBeforeLeave(el) {
      el.style.height = el.scrollHeight + 'px';
      el.style.opacity = 1;
    },
    accordionLeave(el) {
      el.style.height = 0;
      el.style.opacity = 0;
    },
  },
  mounted() {
    const $this = this;
    emergence.init({
      callback: function(element, state) {
        if (state === 'visible') {
          $this.accordionAuto();
        } else if (state === 'reset') {
          $this.accordionAutoStop();
        }
      },
    });
    // this.accordionAuto();
  },
};
</script>

<style>
</style>
