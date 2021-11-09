<!--
views/od/SC-FO-PA-GS-MP-012
-->
<template>
  <!-- START : 카드결제  할부 선택 레이어 -->
  <div id="popupCardMonthly" class="wrap-layer option-list-layer" role="dialog" aria-labelledby="popupCardMonthly" aria-modal="true" :class="[{active : this.modalActive.popupCardMonthly}, siteClass]">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-bottom-fixed">
      <div class="title"><h3>카드결제  할부 선택</h3></div>
      <div class="layer-content">
        <div class="inner-box scroll-area">
          <ul class="option-list">
            <li v-for="monthlyInfo in monthlyList" v-bind:key="monthlyInfo.monthly">
              <span class="inp-radio small" v-if="monthlyInfo.monthly === '01'">
                <input type="radio" name="monthly" v-bind:id="'option-monthly'+monthlyInfo.monthly" v-bind:value="monthlyInfo.monthly" v-model="monthly" checked @click="selectCardTrdInstl(monthlyInfo)">
                <label v-bind:for="'option-monthly'+monthlyInfo.monthly">일시불</label>
              </span>
              <span class="inp-radio small" v-else>
                <input type="radio" name="monthly" v-bind:id="'option-monthly'+monthlyInfo.monthly" v-bind:value="monthlyInfo.monthly" v-model="monthly" @click="selectCardTrdInstl(monthlyInfo)">
                <label v-bind:for="'option-monthly'+monthlyInfo.monthly">
                    {{parseInt(monthlyInfo.monthly)}}개월
                    <span v-if="monthlyInfo.noIntYn == 'Y'"> (무이자)</span>
                </label>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="wrap-btn">
        <button type="button" class="btn-lg btn-bg lightgreen" @click="popupChoiceAction">선택</button>
      </div>
      <button class="btn-layer-close" @click="popupAction">
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 카드결제  할부 선택 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    month: String,
    noInterestCardDetailInfo: Object,
  },
  name: "PopupCardMonthly",
  data() {
    return {
      monthly: "01",
      monthlyList: [],
      monthlyInfo: null,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupChoiceAction() {
      this.$emit('choiceCardMonthlyEvent', this.monthlyInfo, this.noInterestCardDetailInfo);
      this.$emit('popupEvent', 'popupCardMonthly');
      this.modalActiveEvent('popupCardMonthly');
    },
    popupAction() {
      this.$emit('popupEvent', 'popupCardMonthly');
      this.modalActiveEvent('popupCardMonthly');
    },
    selectCardTrdInstl(monthlyInfo) {
      this.monthlyInfo = monthlyInfo;
      // console.log("monthlyInfo : ", monthlyInfo);
    },
  },
  created() {
    this.monthly = this.month;
  },
  mounted() {
    let noIntInfo = null;
    if (this.noInterestCardDetailInfo != null) {
      noIntInfo = (this.noInterestCardDetailInfo.installment).split(":"); // 선택된 카드의 무이자할부정보
    }
    for (let i = 1; i <= 12; i++) {
      const monthInfo = {};
      let monthTemp = "";
      let noIntYn = "N";
      if (i < 10) {
        monthTemp = "0"+i;
      } else {
        monthTemp = ""+i;
      }
      if (noIntInfo != null) {
        for (let j = 0; j < noIntInfo.length; j++) {
          if ( monthTemp == noIntInfo[j] ) {
            noIntYn = 'Y';
          }
        }
      }
      monthInfo.monthly = monthTemp;
      monthInfo.noIntYn = noIntYn;
      this.monthlyList.push(monthInfo);
    }
    this.modalActiveEvent('popupCardMonthly');
  },
};
</script>
