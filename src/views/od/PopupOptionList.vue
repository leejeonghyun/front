<!--
views/od/SC-FO-OD-GS-MP-005
-->
<template>
  <!-- START : 단일옵션 레이어 -->
  <div id="popupOptionList" class="wrap-layer option-list-layer" role="dialog" aria-labelledby="popupOptionList" aria-modal="true" :class="[{active : this.modalActive.popupOptionList}, siteClass]">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-bottom-fixed">
      <div class="title"><h3>{{itemNm}}</h3></div>
      <div class="layer-content">
        <div class="inner-box scroll-area">
          <ul class="option-list">
            <li v-for="(optn, index) in itemOptnList" v-bind:key="index">
              <span class="inp-radio small">
                <input type="radio" name="option" :id="`${'option-item' + index}`" :value="optn.skuId" v-model="selectedSkuId" >
                <label :for="`${'option-item' + index}`">{{optn.skuNm}}</label>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-btn">
        <button type="button" class="btn-lg btn-bg lightgreen"  @click="changeItemOptn">변경</button>
      </div>
      <button class="btn-layer-close" @click="popupAction">
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 단일옵션 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    itemOptnList: Array,
    itemNm: String,
    skuId: String,
  },
  name: "PopupOptionList",
  data() {
    return {
      selectedSkuId: '',
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupOptionList');
      this.modalActiveEvent('popupOptionList');
    },
    changeItemOptn() {
      const selctedItemOptn = this.itemOptnList.find(optn => optn.skuId === this.selectedSkuId);
      if (selctedItemOptn) {
        const iPutItemOptn = {
          itemId: selctedItemOptn.itemId,
          skuId: selctedItemOptn.skuId,
          itemCd: selctedItemOptn.itemCd
        };

        this.$emit('changeItemOptn', iPutItemOptn);
        // this.popupAction();
      }
    }
  },
  mounted() {
    this.selectedSkuId = this.skuId;
    this.modalActiveEvent('popupOptionList');
  },
};
</script>
