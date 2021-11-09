<template>
  <!-- START : 장바구니 새벽배송 옮기기 -->
  <div id="popupDaybreakpopupCart" class="wrap-layer alert-layer daybreak-delivery" role="dialog" aria-labelledby="popupDaybreakpopupCart" aria-modal="true" :class="[{active : liHtml !== ''}, siteClass]">
    <!-- 실사용 소스
    <div id="daybreakpopupCart" class="wrap-layer alert-layer" role="dialog" aria-labelledby="daybreakpopupCart" aria-modal="true" :class="{active : this.modalActive.daybreakpopupCart}">
      -->
    <div class="layer-bg" @click="popupAction"></div>
    <div class="alert-layer-inner">
      <div class="inner-box">
        <div class="layer-content">
          <div class="message">
            현재 배송지는<br />새벽 배송이  불가한 지역입니다.
          </div>
          <div class="daybreak-delivery">
            <div class="area-delivery-desc">
              <strong class="delivery-desc-title">새벽배송 가능지역</strong>
              <ul class="address-list" v-html="liHtml">
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-alert-bottom">
        <button class="btn-confirm" @click="popupAction">확인</button>
      </div>
    </div>
  </div>
  <!-- END : 장바구니 새벽배송 옮기기 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupDaybreakpopupCart",
  data() {
    return {
      liHtml: '',
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  directives: {},
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupDaybreakpopupCart');
      this.modalActiveEvent('popupDaybreakpopupCart');
    },
  },
  async created() {
    const iPut = {
      dspConrId: '122',
      cmmSteId: '1',
      // storId: CookieUtils.getCookie('STOR_ID'),
      // supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD'),
      storId: '3009',
      supplFirmCd: '70011',
      mallId: '1',
      dspScrSpCd: '02',
      custGrdCd: CookieUtils.getCookie('CUST_GRD_CD')
    };
    const result = await ApiUtils.get('/dp/fr/displaymgnt/display-comm-banner-info', iPut);
    if (result.data.success) {
      try {
        this.liHtml = result.data.data.rdspCommConrInfo[0].rdspCommConrSetInfo[0].rdspCommConrSbjInfo[0].rdspCommConrCntInfo[0].dspCnts;
      } catch (e) {
        this.liHtml = '<li><em>서울</em><span>전지역</span></li><li><em>경기</em><span>부천시, 광명시, 시흥시(은행/대야/신천), 분당구, 위례지구(위례신도시), 고양시</span></li>';
      }
    } else {
      this.liHtml = '<li><em>서울</em><span>전지역</span></li><li><em>경기</em><span>부천시, 광명시, 시흥시(은행/대야/신천), 분당구, 위례지구(위례신도시), 고양시</span></li>';
    }
  },
  mounted() {
    this.modalActiveEvent('popupDaybreakpopupCart');
  }
};
</script>
