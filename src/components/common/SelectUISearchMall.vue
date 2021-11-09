<template>
  <div class="wrap-select-popup">
    <!-- 수정 START : 2020.03.05 마크업 수정 -->
    <button type="button" class="btn-select" aria-haspopup="dialog" :value="selectedindex" @click="showOption">
      <span aria-label="검색 조건">{{ selecttext }}</span>
    </button>
    <!-- 수정 END : 2020.03.05 마크업 수정 -->
    <div id="modalList" class="wrap-modal-select" role="dialog" aria-modal="true" v-if="opened" @click="hideOption">
      <ul class="wrap-list-select">
        <li v-for="option in $store.state.m4Search.mallSearchInfoList" :key="option.mallId" :class="{ active: selectedMallId==option.mallId }">
          <button type="button" @click="changeSelectList(option.mallId)">
            {{ option.mallTitle }}
            <p class="desc" v-if="option.comment">{{ option.comment }}</p>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CookieUtils from '@/common/CookieUtils';
export default {
  /* 수정 START : 2020.03.05 data값 삭제 */
  name: 'Select',
  props: {
    selectedMallId: String
  },
  data() {
    return {
        opened: false,
        selectedindex: 0,
        selecttext: "통합검색"
    };
  },
  methods: {
    changeSelectList(val) {
      const selected = this.$store.state.m4Search.mallSearchInfoList.filter(e => e.mallId == val)[0];
      this.selecttext = selected.mallTitle;
      this.opened = false;
      this.$emit('changeSelectList', selected);
    },
    showOption() {
        this.opened = !this.opened;
    },
    hideOption() {
      this.opened = false;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.hideOption);
    const urlVal = window.location.host;
    let selectedMallIdTmp ='';
    if (urlVal.indexOf('my-m.gsfresh') > -1) {
      selectedMallIdTmp = '1';
    } else if (urlVal.indexOf('my-m.dalisalda') > -1) {
      selectedMallIdTmp = '11';
    } else if (urlVal.indexOf('my-m.marketfor') > -1) {
      selectedMallIdTmp = '300';
    } else {
      selectedMallIdTmp = CookieUtils.getCookie('MALL_ID');
    }
    // this.changeSelectMall(this.selectedMallId);
    this.changeSelectList(selectedMallIdTmp); // 검색팝업창 초기화 진입몰로 검색
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.hideOption);
  },
  watch: {
    selectedMallId: {
      handler() {
        // this.selectindex = this.selectData.selected;
        this.selecttext = this.$store.state.m4Search.mallSearchInfoList.filter(e => e.mallId == this.selectedMallId)[0].mallTitle;
      },
      deep: true,
    },
  }
};
</script>

<style>

</style>
