<!--
views/pa/SC-FO-PA-GS-MP-010
-->
<template>
  <!-- START : 카드즉시할인 레이어 -->
  <div id="popupCardOption" class="wrap-layer option-list-layer" role="dialog" aria-labelledby="popupCardOption" aria-modal="true" :class="{active : this.modalActive.popupCardOption}">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-bottom-fixed">
      <div class="title"><h3>카드즉시할인</h3></div>
      <div class="layer-content">
        <div class="inner-box scroll-area">
          <ul class="option-list">
            <li>
              <span class="inp-radio small" style="width: 100%;">
                <input type="radio" name="crcoCd" id="option-card99" :value="undefined" v-model="cardDiscountProm">
                <label for="option-card99" style="width: 100%;">카드선택 없음 </label>
              </span>
            </li>
            <li v-for="(promInfo, idx) in cardDiscountPromList" :key="`CARD_DISCOUNT_${idx}`">
              <span class="inp-radio small" style="width: 100%;">
                <input type="radio" name="crcoCd" :id="`option-card_${idx}`" :value="promInfo" v-model="cardDiscountProm">
                <label :for="`option-card_${idx}`" style="width: 100%;">{{promInfo.tdrMeansCd === '02' ? promInfo.cardNm : promInfo.tdrMeansNm }}</label>
              </span>
              <span class="txt-point">-{{promInfo.cardDcAmt | currency}}원</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-btn">
        <button type="button" class="btn-lg btn-bg lightgreen"  @click="popupCardDcAction()">선택</button>
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 카드즉시할인 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
export default {
  name: "PopupOptionList",
  props: {
    rtnCardDiscountProm: {
      type: Object,
      default: undefined
    },
    payInfo: Object,
    ordId: String,
    ordsItemInfoList: Array,
    discountInfo: Object,
  },
  data() {
    return {
      cardDiscountPromList: null,
      cardDiscountProm: undefined,
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  filters: {
    currency: function(val) {
      return NumberUtils.toComma(val);
    },
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupCardOption');
      this.modalActiveEvent('popupCardOption');
    },
    popupCardDcAction() {
      this.$emit('setCardDisEvent', this.cardDiscountProm);
      this.$emit('popupEvent', 'popupCardOption');
    },
    // 카드사행사(카드사할인혜택)목록 조회 및 재선택
    async retrievelistTrdMeansDcCard() {
      const response = await ApiUtils.get('/fo/od/mf/ordsmgnt/prom-card-list', { ordId: this.ordId, pytcCd: this.payInfo.pytcCd });
      if ((!!response.data.data && response.data.data.length || 0) > 0) {
        this.cardDiscountPromList = response.data.data; // 카드사할인혜택정보목록
        //  이미 선택된 카드 즉시 할인 정보 Set
        if (!!this.rtnCardDiscountProm) {
          this.cardDiscountProm = this.cardDiscountPromList.find(
            promInfo => promInfo.crcoCd == this.rtnCardDiscountProm.crcoCd && promInfo.cardCode == this.rtnCardDiscountProm.cardCode
          );
        }
      }
    },
  },
  mounted() {
    this.modalActiveEvent('popupCardOption');
    // 카드사행사(카드사할인혜택)목록 조회 및 재선택 함수 호출
    this.retrievelistTrdMeansDcCard();
  },
};
</script>
