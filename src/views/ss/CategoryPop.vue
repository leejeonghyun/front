<template>
  <div id="categoryPop" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.categoryPop}">
    <div class="header-popup">
      <strong></strong>
    </div>
    <div class="full-popup-body">
        <div class="main-category-wrap">
          <div v-for="(list, index) in datas.headerData" :key="index">
            <div class="main-category-txt" v-bind:class="{ active: Number(datas.pageIndex.hIndex) === index }">
              <span>{{ list.title }}</span>
            </div>
            <div class="main-category-list">
              <div v-for="(subList, subIndex) in datas.cornerData[index]" :key="subIndex"><button @click="linkMainAction(index, subIndex)" v-bind:class="{ active: Number(datas.pageIndex.vIndex) === subIndex && Number(datas.pageIndex.hIndex) === index }"><span>{{ subList.title }}</span></button></div>
            </div>
          </div>
        </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import LoginUtils from "@/common/LoginUtils";
export default {
  name: "categoryPop",
  mixins: [LayerPopupMixin],
  props: ["datas"],
  metaInfo: {
    title: 'marketFor',
    titleTemplate: 'category < %s'
  },

  data() {
    return {
    };
  },
  components: {
  },
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'categoryPop');
      this.modalActiveEvent('categoryPop');
    },
    linkMainAction(hIndex, vIndex) {
      const url = this.datas.cornerData[hIndex][vIndex].url;
      this.$router.push( { path: url, query: { hIndex, vIndex } } );
    },
  },
  mounted() {
    this.modalActiveEvent('categoryPop');
  }
};
</script>
