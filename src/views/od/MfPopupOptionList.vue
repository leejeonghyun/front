<!--
views/od/SC-FO-OD-MF-MP-003
-->
<template>
    <!-- START : 단일옵션 레이어 -->
    <div id="popupOptionList" class="wrap-layer option-list-layer" role="dialog" aria-labelledby="popupOptionList" aria-modal="true" :class="{active : this.modalActive.popupOptionList}">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-bottom-fixed">
        <div class="title"><h3>{{bsktItemInfo.itemNm}}</h3></div>
        <div class="layer-content">
          <div class="inner-box scroll-area">
            <ul class="option-list">
              <li v-for="(itemOptn, idx) in itemOptnList" :key="`ITEM_OPTN_${idx}`">
                <span class="inp-radio small">
                  <input type="radio" name="itemOptn" :id="`itemOptn${idx}`" :value="itemOptn.skuId" v-model="selectedSkuId">
                  <label :for="`itemOptn${idx}`">{{itemOptn.skuNm + (itemOptn.skuAddAmt > 0 ? ` (+${toComma(itemOptn.skuAddAmt)}원)` : '')}}</label>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="wrap-btn">
          <button type="button" class="btn-lg btn-bg lightgreen"  @click="changeItemOptn">변경</button>
        </div>
        <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 단일옵션 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
export default {
  name: "MfPopupOptionList",
  props: {
    bsktItemInfo: Object,
  },
  data() {
    return {
      itemOptnList: [], // 옵션목록 정보
      selectedSkuId: '', // 선택된 단품(옵션)ID
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    showLoading(flag) {
      this.$emit('showLoading', flag);
    },
    popupAction() {
      this.$emit('popupEvent', 'popupOptionList');
      this.modalActiveEvent('popupOptionList');
    },
    // 옵션 List 조회 함수
    async getItemOptnList() {
      this.showLoading(true);
      const result = await ApiUtils.get('/fo/od/mf/bsktmgnt/item-option', {itemId: this.bsktItemInfo.itemId});
      this.showLoading(false);
      this.itemOptnList = result.data.data;
    },
    // 선택 옵션 정보 Update 처리 함수
    changeItemOptn() {
      const selctedItemOptn = this.itemOptnList.find(optn => optn.skuId === this.selectedSkuId);
      if (selctedItemOptn) {
        // 기존 선택 옵션과 동일 하면 레이어 팝업 Close
        if (selctedItemOptn.skuId == this.bsktItemInfo.skuId) {
          this.popupAction();
          return;
        }
        const iPutItemOptn = {
          itemId: selctedItemOptn.itemId,
          itemCd: selctedItemOptn.itemCd,
          skuId: selctedItemOptn.skuId,
          skuNm: selctedItemOptn.skuNm,
          skuAddAmt: selctedItemOptn.skuAddAmt,
          supplFirmItemId: selctedItemOptn.supplFirmItemId,
        };
        this.$emit('changeItemOptn', iPutItemOptn);
      }
    }
  },
  mounted() {
    this.modalActiveEvent('popupOptionList');
    // 기존 선택된 단품(옵션)ID 정보 Set
    this.selectedSkuId = this.bsktItemInfo.skuId;
    // 상품목록 조회
    this.getItemOptnList();
  },
};
</script>
