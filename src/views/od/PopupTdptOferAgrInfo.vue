<!--
views/od/SC-FO-PA-GS-MP-027
-->
<template>
  <div id="popupAgreeDetail" class="wrap-full-popup h100" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupAgreeDetail}, siteClass]">
    <div class="header-popup">
      <strong>개인정보 제3자 제공동의</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <section class="section-area">
          <!-- START : 개인정보 제3자 제공동의 -->
          <div class="sub-inner-box liquor-agree-cont safe-agree-cont">
            <p class="txt">회원의 개인정보는 당사의 개인정보취급방침에 따라 안전하게 보호됩니다.</p>
            <ul class="txt-info-list">
              <li class="ico-alert2">회사는 서비스 제공을 위하여 당사의 개인정보 취급방침의 개인정보의 수집 및 이용목적 에서 고지한 범위 내에서 수집, 활용하며 그 밖의 인권침해 및 사생활 침해가 우려되는 개인정보는 일체 수집하지 않습니다.</li>
              <li class="ico-alert2">회사가 제공하는 서비스를 통하여 주문 및 결제가 이루어진 경우 구매자 확인 및 해피콜 등 거래이행을 위하여 관련된 정보를 필요한 범위 내에서 거래 업체에게 제공합니다.</li>
            </ul>
            <table class="delivery-time-table" summary="개인정보 제3자 제공 동의 상세내용 표">
              <caption>개인정보 제3자 제공 동의 상품평과 제공받는 자</caption>
              <colgroup>
                <col style="width: 72%;">
                <col style="width: 28%;">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">상품명</th>
                  <th scope="col">제공받는자</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ordsItemInfo, idx) in ordsItemInfoList" v-bind:key="(ordsItemInfo.supplFirmCd, idx)">
                  <td>{{ordsItemInfo.itemNm}}</td>
                  <td>{{ordsItemInfo.supplFirmNm}}</td>
                </tr>
                <!-- <tr>
                  <td>[요리버리]포천 향유갈비 돈왕갈비1Kg</td>
                  <td>아빠컴퍼니</td>
                </tr> -->
              </tbody>
            </table>
            <dl class="info-detail">
              <dt>제공목적</dt>
              <dd>서비스 제공, 구매자 확인, 해피콜, 구매한 상품의 배송</dd>
              <dt>제공정보</dt>
              <dd>주문정보, 주문자 정보(성명/연락처/주소), 고객요청사항, 상품정보<br>구매자와 수취인이 다를 경우에는 수취인의 정보가 제공될 수 있습니다.</dd>
              <dt>보유 및 이용기간</dt>
              <dd>서비스 제공 완료 1년 후 삭제</dd>
              <dt>※ 동의 거부권 등에 대한 고지</dt>
              <dd>개인정보 제공은 서비스 이용을 위해 꼭 필요합니다. 개인정보 제공을 거부하실 수 있으나, 이 경우 서비스 이용이 제한될 수 있습니다.</dd>
            </dl>
          </div>
          <!-- END : 개인정보 제3자 제공동의 -->
        </section>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';

export default {
  props: {
    ordsItemList: Object,
    ordsItemLists: Array,
  },
  name: "PopupAgreeDetail",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '개인정보 제3자 제공동의 < 주문결제 < %s'
  },
  mixins: [LayerPopupMixin],
  data() {
    return {
      ordsItemInfoList: [],
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
  },
  methods: {
    popupCloseAction() {
      this.$emit('popupAction', 'popupAgreeDetail');
      // this.modalActiveEvent('popupAgreeDetail');
    },
  },
  mounted() {
    if (this.ordsItemList != null) {
      const ordsDelivGrpInfoList = this.ordsItemList.ordsDelivGrpInfoList;
      for (let j = 0; j < ordsDelivGrpInfoList.length; j++) {
        const ordsDelivSupplGrpInfoList = ordsDelivGrpInfoList[j].ordsDelivSupplGrpInfoList;
        for (let k = 0; k < ordsDelivSupplGrpInfoList.length; k++) {
          const ordsItemInfoList = ordsDelivSupplGrpInfoList[k].ordsItemInfoList;
          for (let l = 0; l < ordsItemInfoList.length; l++) {
            this.ordsItemInfoList.push(ordsItemInfoList[l]);
          }
        }
      }
    }
    // 다중배송지 상품일경우처리 20200528 유현석
    if (this.ordsItemLists != null) {
      for (let q=0; q < this.ordsItemLists.length; q++) {
        const ordsDelivGrpInfoList = this.ordsItemLists[q].ordsDelivGrpInfoList;
        for (let j = 0; j < ordsDelivGrpInfoList.length; j++) {
          const ordsDelivSupplGrpInfoList = ordsDelivGrpInfoList[j].ordsDelivSupplGrpInfoList;
          for (let k = 0; k < ordsDelivSupplGrpInfoList.length; k++) {
            const ordsItemInfoList = ordsDelivSupplGrpInfoList[k].ordsItemInfoList;
            for (let l = 0; l < ordsItemInfoList.length; l++) {
              this.ordsItemInfoList.push(ordsItemInfoList[l]);
            }
          }
        }
      }
    }
    // this.modalActiveEvent('popupAgreeDetail');
  }
};
</script>
