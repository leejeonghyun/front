<template>
  <div class="wrap-select-popup" :class="type">
    <button class="btn-select" aria-haspopup="dialog" :value="list" @click="openSelectList">
      <span aria-label="상품목록 정렬">{{list}}</span>
    </button>
    <div id="modalList" class="wrap-modal-select" role="dialog" aria-modal="true" @click="openSelectList" v-if="selectData.open">
      <ul class="wrap-list-select">
        <li>
          <button @click="changeSelectList" value="자주 구매 순">자주 구매 순</button>
        </li>
        <li>
          <button @click="changeSelectList" value="할인율순">할인율순</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectPersonalizeUI',
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
