<template>
  <div class="wrap-select-popup" :class="type">
    <button class="btn-select" aria-haspopup="dialog" :value="list" @click="openSelectList">
      <span aria-label="상품목록 정렬">{{list}}</span>
    </button>
    <div id="modalList" class="wrap-modal-select" role="dialog" aria-modal="true" @click="openSelectList" v-if="selectData.open">
      <ul class="wrap-list-select">
        <li>
          <button @click="changeSelectList" value="배송전체">배송전체</button>
        </li>
        <li>
          <button @click="changeSelectList" value="전국택배">전국택배</button>
        </li>
        <li>
          <button @click="changeSelectList" value="업체배송">업체배송</button>
        </li>
        <li>
          <button @click="changeSelectList" value="예약배송">예약배송</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectDeliveryUI',
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
