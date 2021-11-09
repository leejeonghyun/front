<template>
    <!-- START : 결제공지사항 레이어 -->
    <div id="popupPaymentNoticeInfo" class="wrap-layer description-layer addr-change-layer active" role="dialog" aria-labelledby="popupPaymentNoticeInfo" aria-modal="true" v-bind:class="[siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>결제공지사항</h3>
          </div>
          <div class="layer-content">
            <ul class="interest-free-list">
              <li><span class="name">{{payNoticeList[0].notiSeqno}}</span>5만원 이상<span class="dot">·</span> 2~5개월</li>
              <li><span class="name">현대카드</span>5만원 이상<span class="dot">·</span> 2~5개월</li>
              <li><span class="name">신한카드</span>5만원 이상<span class="dot">·</span> 2~5개월</li>
              <li><span class="name">BC카드</span>5만원 이상<span class="dot">·</span> 2~5개월</li>
              <li><span class="name">롯데카드</span>5만원 이상<span class="dot">·</span> 2~5개월</li>
              <li><span class="name">국민카드</span>5만원 이상<span class="dot">·</span> 2~5개월</li>
            </ul>
          </div>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 결제공지사항 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  props: {
    payNoticeList: Array,
  },
  name: "PopupPaymentNoticeInfo",

  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      // payNoticeList2: [],
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupPaymentNoticeInfo');
      // this.modalActiveEvent('popupPaymentNoticeInfo');
    },
  },
  mounted() {
    // console.log(this.payNoticeList);
    // this.payNoticeList2 = this.payNoticeList;
    // this.modalActiveEvent('popupPaymentNoticeInfo');
  }
};
</script>
