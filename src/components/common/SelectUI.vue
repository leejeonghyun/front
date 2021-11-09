<template>
  <div class="wrap-select-popup" :class="type">
    <button class="btn-select" aria-haspopup="dialog" :value="list" @click="openSelectList">
      <span aria-label="상품목록 정렬">{{list}}</span>
    </button>
    <div id="modalList" class="wrap-modal-select" role="dialog" aria-modal="true" @click="openSelectList" v-if="selectData.open">
      <ul class="wrap-list-select">
        <li>
          <button @click="changeSelectList" value="GS 프레시몰 랭킹순">
            GS 프레시몰 랭킹순
            <p class="desc">랭킹순 정렬은 할인율, 판매량, 상품평 등을 종합적으로 고려하여 상품을 추천 드립니다.</p>
          </button>
        </li>
        <li>
          <button @click="changeSelectList" value="판매량순">판매량순</button>
        </li>
        <li>
          <button @click="changeSelectList" value="낮은 가격순">낮은 가격순</button>
        </li>
        <li>
          <button @click="changeSelectList" value="높은 가격순">높은 가격순</button>
        </li>
        <li>
          <button @click="changeSelectList" value="할인율순">할인율순</button>
        </li>
        <li>
          <button @click="changeSelectList" value="신상품">신상품</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: ['type', 'selectData'],
  data() {
    return {
      list: this.selectData.selected
    };
  },
  methods: {
    openSelectList() {
      this.$emit('selectEvent', this.type);
    },
    changeSelectList() {
      event.stopPropagation();
      const changed = event.currentTarget.getAttribute('value');
      this.list = changed;
      this.$emit('changeEvent', this.type, this.list);
    }
  }
};
</script>

<style>

</style>
