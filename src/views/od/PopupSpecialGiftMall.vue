<!--
views/od/SC-FO-OD-GS-MP-045
-->
<template>
    <!-- START : 사은품 안내 레이어 -->
    <div id="popupSpecialGiftMall" class="wrap-full-popup" role="dialog" aria-labelledby="popupSpecialGiftMall" aria-modal="true" :class="[{active : this.modalActive.popupSpecialGiftMall}, siteClass]">
    <div class="header-popup">
      <strong>금액대별 사은품 안내</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <section class="special-gift-layer" v-if="bsktInqRsltDto.freshPresList !== null && bsktInqRsltDto.freshPresList.length > 0">
          <div v-for="pres in bsktInqRsltDto.freshPresList" v-bind:key="pres.promId">
            <div class="box-alert txt-gift-desc">
              <strong>[GS 프레시몰]</strong>
              <p class="txt">{{pres.promNm}}</p>
              <em>{{format(pres.beginDttm, 'YY.MM.DD(dd)')}}</em> ~ <em>{{format(pres.endDttm, 'YY.MM.DD(dd)')}}</em> {{format(pres.endDttm, 'HH:mm')}}까지 주문 시
            </div>
            <div class="layer-content">
              <p class="current-price">현재 주문예정금액 : <strong>{{comma(bsktInqRsltDto.totItemDcSprc + bsktInqRsltDto.totDlfee - (bsktInqRsltDto.totItemCpnDcAmt + bsktInqRsltDto.totDblDcCpnDcAmt) - bsktInqRsltDto.totCmplDcAmt)}}원</strong></p>
              <div class="section" v-for="(promBeneZone, index) in pres.promBeneZoneList" v-bind:key="index">
                <p class="tit-gift"> {{comma(promBeneZone.beneZoneBeginVal)}}원 이상 구매 시</p>
                <ul class="gift-list">
                  <li v-for="frgf in promBeneZone.promPresFrgfList" v-bind:key="frgf.promPresFrgfSeqno">
                    <img src="@/assets/images/img/_img_logo_coupon.jpg" alt="" v-if="frgf.presFrgfTypeCd === '3'">
                    <img src="@/assets/images/img/_img_logo_gspoint.jpg" alt="" v-else-if="frgf.presFrgfTypeCd === '4'">
                    <img src="@/assets/images/img/_img_logo_thepop.jpg" alt="" v-else-if="frgf.presFrgfTypeCd === '5'">
                    <img :src="getItemImg(frgf.itemImgUrl)" alt="" v-else>
                    <strong>{{getFrgfText(frgf)}}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section class="special-gift-layer" v-if="bsktInqRsltDto.daliPresList !== null && bsktInqRsltDto.daliPresList.length > 0">
          <div v-for="pres in bsktInqRsltDto.daliPresList" v-bind:key="pres.promId">
            <div class="box-alert txt-gift-desc">
              <strong>[달리살다]</strong>
              <p class="txt">{{pres.promNm}}</p>
              <em>{{format(pres.beginDttm, 'YY.MM.DD(dd)')}}</em> ~ <em>{{format(pres.endDttm, 'YY.MM.DD(dd)')}}</em> {{format(pres.endDttm, 'HH:mm')}}까지 주문 시
            </div>
            <div class="layer-content">
              <p class="current-price">현재 주문예정금액 : <strong>{{comma(bsktInqRsltDto.totItemDcSprc + bsktInqRsltDto.totDlfee - (bsktInqRsltDto.totItemCpnDcAmt + bsktInqRsltDto.totDblDcCpnDcAmt) - bsktInqRsltDto.totCmplDcAmt)}}원</strong></p>
              <div class="section" v-for="(promBeneZone, index) in pres.promBeneZoneList" v-bind:key="index">
                <p class="tit-gift"> {{comma(promBeneZone.beneZoneBeginVal)}}원 이상 구매 시</p>
                <ul class="gift-list">
                  <li v-for="frgf in promBeneZone.promPresFrgfList" v-bind:key="frgf.promPresFrgfSeqno">
                    <img src="@/assets/images/img/_img_logo_coupon.jpg" alt="" v-if="frgf.presFrgfTypeCd === '3'">
                    <img src="@/assets/images/img/_img_logo_gspoint.jpg" alt="" v-else-if="frgf.presFrgfTypeCd === '4'">
                    <img src="@/assets/images/img/_img_logo_thepop.jpg" alt="" v-else-if="frgf.presFrgfTypeCd === '5'">
                    <img :src="getItemImg(frgf.itemImgUrl)" alt="" v-else>
                    <strong>{{getFrgfText(frgf)}}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section class="special-gift-layer" v-if="bsktInqRsltDto.spckPresList !== null && bsktInqRsltDto.spckPresList.length > 0">
          <div v-for="pres in bsktInqRsltDto.spckPresList" v-bind:key="pres.promId">
            <div class="box-alert txt-gift-desc">
              <strong>[심플리쿡]</strong>
              <p class="txt">{{pres.promNm}}</p>
              <em>{{format(pres.beginDttm, 'YY.MM.DD(dd)')}}</em> ~ <em>{{format(pres.endDttm, 'YY.MM.DD(dd)')}}</em> {{format(pres.endDttm, 'HH:mm')}}까지 주문 시
            </div>
            <div class="layer-content">
              <p class="current-price">현재 주문예정금액 : <strong>{{comma(bsktInqRsltDto.totItemDcSprc + bsktInqRsltDto.totDlfee - (bsktInqRsltDto.totItemCpnDcAmt + bsktInqRsltDto.totDblDcCpnDcAmt) - bsktInqRsltDto.totCmplDcAmt)}}원</strong></p>
              <div class="section" v-for="(promBeneZone, index) in pres.promBeneZoneList" v-bind:key="index">
                <p class="tit-gift"> {{comma(promBeneZone.beneZoneBeginVal)}}원 이상 구매 시</p>
                <ul class="gift-list">
                  <li v-for="frgf in promBeneZone.promPresFrgfList" v-bind:key="frgf.promPresFrgfSeqno">
                    <img src="@/assets/images/img/_img_logo_coupon.jpg" alt="" v-if="frgf.presFrgfTypeCd === '3'">
                    <img src="@/assets/images/img/_img_logo_gspoint.jpg" alt="" v-else-if="frgf.presFrgfTypeCd === '4'">
                    <img src="@/assets/images/img/_img_logo_thepop.jpg" alt="" v-else-if="frgf.presFrgfTypeCd === '5'">
                    <img :src="getItemImg(frgf.itemImgUrl)" alt="" v-else>
                    <strong>{{getFrgfText(frgf)}}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div class="box-alert-icon">
          <p class="ico-alert2">결제 단계에서  모든 할인 적용 후,  최종 결제금액 기준으로 사은품을 선택할 수 있습니다.</p>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
    <!-- END : 사은품 안내 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';
import ImgUtils from '@/common/ImgUtils';
export default {
  props: {
    bsktInqRsltDto: Object,
  },
  name: "PopupSpecialGiftMall",
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
      this.$emit('popupEvent', 'popupSpecialGiftMall');
      this.modalActiveEvent('popupSpecialGiftMall');
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    getFrgfText(frgf) {
      let text = '';

      if (frgf.presFrgfTypeCd === '4') {
        text += frgf.presFrgfApplVal + '포인트';
      } else if (frgf.presFrgfTypeCd === '5') {
        text += frgf.presFrgfApplVal + '점';
      } else {
        text += frgf.presFrgfApplValNm;
      }

      return text;
    },
    format(date, dateFormat) {
      return DateUtils.format(date, dateFormat);
    },
    getItemImg(url) {
      let path = '';
      try {
        url = url.replace("{SIZE}", 300); // 임시로 사이즈 변경함
        if (url === '') {
          path = require('@/assets/images/img/img_product_nothumb.jpg');
        } else {
          path = ImgUtils.path(url);
        }
      } catch (e) {
        path = require('@/assets/images/img/img_product_nothumb.jpg');
      }
      return path;
    },
  },
  mounted() {
    this.modalActiveEvent('popupSpecialGiftMall');
  }
};
</script>
