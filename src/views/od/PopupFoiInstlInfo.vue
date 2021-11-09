<!--
views/od/SC-FO-PA-GS-MP-016
-->
<template>
    <!-- START : 무이자 할부 안내 레이어 -->
    <div id="popupInterestFree" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupInterestFree" aria-modal="true" :class="[{active : this.modalActive.popupInterestFree}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>무이자 할부 안내</h3>
          </div>
          <div class="layer-content">
            <ul class="interest-free-list">
              <li>
                  <span class="name">{{noInterestCardDetailInfo.cardNm}}</span>{{toComma(noInterestCardDetailInfo.planPrice)}}원 이상<span class="dot">·</span>{{(noInterestCardDetailInfo.installmentStr)}}개월
              </li>
              <!-- <li><span class="name">현대카드</span>5만원 이상<span class="dot">·</span> 2~5개월</li>
              <li><span class="name">신한카드</span>5만원 이상<span class="dot">·</span> 2~5개월</li>
              <li><span class="name">BC카드</span>5만원 이상<span class="dot">·</span> 2~5개월</li>
              <li><span class="name">롯데카드</span>5만원 이상<span class="dot">·</span> 2~5개월</li>
              <li><span class="name">국민카드</span>5만원 이상<span class="dot">·</span> 2~5개월</li> -->
            </ul>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 무이자 할부 안내 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    noInterestCardDetailInfo: Object,
  },
  name: "PopupInterestFree",
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupInterestFree');
      this.modalActiveEvent('popupInterestFree');
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    },
  },
  mounted() {
    if (this.noInterestCardDetailInfo) {
      const periodList = this.noInterestCardDetailInfo.installment.split(':');
      this.noInterestCardDetailInfo.installmentStr = periodList[0].replace(/(^0+)/, "") + ' ~ ' + periodList[periodList.length - 1].replace(/(^0+)/, "");
    }
    this.modalActiveEvent('popupInterestFree');
  }
};
</script>
