<template>
  <div class="wrap-select-popup">
    <button class="btn-select" aria-haspopup="dialog" @click="openSelectList">
      <span aria-label="배송비/ 장바구니 쿠폰 정렬"><span>{{list.selected[0]}}</span><span class="term">{{list.selected[1]}}</span></span>
    </button>
    <div id="modalList" class="wrap-modal-select" role="dialog" aria-modal="true" @click="openSelectList" v-if="open">
      <ul class="wrap-list-select">
        <li v-for="(d, i) in list" :key="i">
          <button @click="changeSelectList(d.val)">
            <span>{{d.cpnNm}}</span>
            <span class="term">{{getTerm(d.cpnValidDurBeginDttm, d.cpnValidDurEndDttm)}}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import DateUtils from '@/common/DateUtils';

export default {
  name: 'SelecCustomUI',
  props: ['type', 'selectData', 'selectedIdx'],
  data() {
    return {
      open: false,
      list: [],
      selIdx: 0,
    };
  },
  created() {
    this.selectData.forEach((e, i) => {
      e.val = i;
    });

    this.list = this.selectData;
    this.list.push({val: 999, cpnNm: '적용안함', cpnValidDurBeginDttm: '', cpnValidDurEndDttm: ''});
    if (this.selectedIdx) {
      this.selIdx = this.selectedIdx;
    }
    const term = this.getTerm(this.list[this.selIdx].cpnValidDurBeginDttm, this.list[this.selIdx].cpnValidDurEndDttm);

    this.list.selected = [this.list[this.selIdx].cpnNm, term];
    this.$emit('changeEvent', this.type, this.selIdx);
  },
  methods: {
    openSelectList() {
      this.open = !this.open;
    },
    changeSelectList(val) {
      this.open = false;
      event.stopPropagation();
      const changed = event.currentTarget.children;
      for (let i = 0; i < changed.length; i++) {
        this.list.selected[i] = changed[i].textContent;
      }
      this.$emit('changeEvent', this.type, val);
    },
    format(date, dateFormat) {
      return DateUtils.format(date, dateFormat);
    },
    getTerm(cpnValidDurBeginDttm, cpnValidDurEndDttm) {
      if (cpnValidDurBeginDttm == '') {
        return '';
      } else {
        return this.format(cpnValidDurBeginDttm, 'MM.DD') + '~' + this.format(cpnValidDurEndDttm, 'MM.DD HH:mm');
      }
    },
  },
};
</script>

<style>

</style>
