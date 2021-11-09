<template>
  <div class="wrap-select-popup">
    <!-- 수정 START : 2020.03.05 마크업 수정 -->
    <button type="button" class="btn-select" aria-haspopup="dialog" :value="selectedindex" @click="showOption">
      <span aria-label="검색 조건">{{ selecttext }}</span>
    </button>
    <!-- 수정 END : 2020.03.05 마크업 수정 -->
    <div id="modalList" class="wrap-modal-select" role="dialog" aria-modal="true" v-if="opened">
      <ul class="wrap-list-select">
        <li v-for="option in selectData.options" :key="option.id" :class="{ active: selectedindex==option.id }">
          <button type="button" @click="changeSelectList(option.id)">
            {{ option.txt }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  /* 수정 START : 2020.03.05 data값 삭제 */
  name: 'Select',
  props: {
    selectData: Object,
  },
  data() {
    return {
        opened: false,
        selectedindex: 0,
        selecttext: ""
    };
  },
  methods: {
    changeSelectList(val) {
      this.selecttext = this.selectData.options[val].txt;
      this.selectedindex = this.selectData.options[val].id;
      this.opened = false;
      this.$emit('changeSelectList', this.selectedindex);
    },
    showOption() {
        this.opened = !this.opened;
    }
  },
  mounted() {
    this.selectindex = this.selectData.selected;
    this.selecttext = this.selectData.options[this.selectindex].txt;
  }
};
</script>

<style>

</style>
