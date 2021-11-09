<!--
views/pa/SC-FO-PA-MF-MP-001
-->
<template>
  <div id="popupTelecom" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupTelecom" aria-modal="true" :class="{active : this.modalActive.popupTelecom}">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-inner">
      <div class="inner-box">
        <div class="title">
          <h3>통신사할인</h3>
        </div>
        <div class="layer-content">
          <ul class="list-dot">
              <li v-if="!!ktUsePntInfo.promId">KT : {{ktUsePntInfo.standAmt | currency}}원 이상 구매 시 {{ktUsePntInfo.pntDcAmt | currency}}P 사용 가능</li>
              <li v-if="!!lgUsePntInfo.promId">LGU+ : {{lgUsePntInfo.standAmt | currency}}원 이상 구매 시 {{lgUsePntInfo.pntDcAmt | currency}}P 사용 가능</li>
              <li>현재 합계금액 : <span class="point">{{reqPntForm.pntUseAmt | currency}}</span>원</li>
              <li>결제 횟수 한도
                <ul class="dash">
                    <li v-if="!!ktUsePntInfo.promId">- KT : 일 1회, 일반 할인 월 1회</li>
                    <li v-if="!!lgUsePntInfo.promId">- LGU+ : 일 1회, 월 횟수 제한 없음</li>
                </ul>
              </li>
              <li>기타문의
                  <ul class="dash">
                      <li v-if="!!ktUsePntInfo.promId">- KT 고객센터 : 무선 114(무료), 유료 100(유료)</li>
                      <li v-if="!!lgUsePntInfo.promId">- LGU+ 고객센터 : 무선 114(무료),<br>유선 1544-0010(유료) </li>
                      <li>- GS 프레시몰 고객센터 : 1661-2562(유료)</li>
                  </ul>
              </li>
          </ul>
        </div>
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';
export default {
  name: "popupTelecom",
  props: {
    reqPntForm: Object,
    ktUsePntInfo: Object,
    lgUsePntInfo: Object,
  },
  data() {
    return {
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
      this.$emit('popupEvent', 'popupTelecom');
      this.modalActiveEvent('popupTelecom');
    },
  },
  mounted() {
    this.modalActiveEvent('popupTelecom');
  }
};
</script>
