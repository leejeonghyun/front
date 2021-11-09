<!--
Design: views/pa/SC-FO-PA-MF-MS-002
Pg id:
Uri:
-->
<template>
  <div class="wrap public_domain marketfor">
    <MainHeader ref="header" :headertype="3" :searchView="true" :cartView="true" :historyView="false" headerTitle="주문완료" />
    <main id="main" tabindex="0">
      <div class="gift-receive-complete">
        <section class="msg-complete order-complete">
          <h2 class="msg-complete-txt">주문이 완료되었습니다.</h2>
          <p class="msg-txt-info">이용해주셔서 감사합니다.<br>고객님의 주문내역을 확인해주세요.</p>
        </section>

        <!-- START : 배송지 -->
        <section class="section-area" v-if="!!ordFinDlvpInfo">
          <div class="sub-title border">
            <h3><span class="bg-line-brush">배송지</span></h3>
          </div>
          <div class="wrap-breakdown">
            <div class="receive-delivery-info">
              <div class="my-address">
                <p>{{ordFinDlvpInfo.adrsNm}} [{{ordFinDlvpInfo.dlvpNm}}]</p>
                <p><span class="code">{{ordFinDlvpInfo.zipcd}} </span>{{ordFinDlvpInfo.adrsStnmAddr}} {{ordFinDlvpInfo.adrsStnmDtlAddr}}</p>
              </div>
            </div>
            <div class="bottom-btn-area">
              <button type="button" :class="`btn-md btn-bg ${ordInfo.thebanchanIncldYn === 'Y' ? 'disabled' : 'darkgray'} full`" @click="movePageOrderList()">배송지 변경</button>
            </div>
            <p class="txt-delivery" v-if="ordInfo.thebanchanIncldYn === 'Y'">더반찬 상품이 포함되어 있어 배송지를 변경할 수 없습니다.</p>
          </div>
        </section>
        <!-- END : 배송지 -->
        <!-- START : 최종 결제금액 -->
        <section class="section-area">
          <div class="sub-title border flex">
            <h3><span class="bg-line-brush">최종결제금액</span></h3>
            <span class="price"><strong>{{ordInfo.totPayAmt | currency}}</strong>원</span>
          </div>
          <div class="total-payment order-payment">
            <ul class="accordion-payment">
              <li>
                <div class="tit-accordion">
                    총 상품금액 <span class="price"><strong>{{ordInfo.totOrdAmt | currency}}</strong>원</span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                    총 할인금액 <span class="price red"><strong>-{{Number(ordInfo.totDcAmt) + Number(ordInfo.totDlfeeDcAmt) | currency}}</strong>원</span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                  총 배송비 <span class="price"><strong>{{ordInfo.totDlfee | currency}}</strong>원</span>
                  <button type="button" class="btn-infomation" aria-label="배송비 안내 팝업 활성화" aria-haspopup="dialog"  @click="popupAction('popupDeliveryPrice')" />
                </div>
              </li>
            </ul>
            <div class="gspointbox"><p><em class="ico-gspoint"></em> 배송완료 후 예상 적립포인트(GS&amp;POINT)</p><span class="point">{{ordInfo.gsPntSavgAmt | currency}}P</span></div>
          </div>
        </section>
        <!-- END : 최종 결제금액 -->
        <!-- START : 결제 수단 -->
        <section class="section-area">
          <div class="sub-title border flex">
            <h3><span class="bg-line-brush">결제수단</span></h3>
            <span class="date">{{toFormat(ordInfo.ordDttm, 'YYYY.MM.DD')}}</span>
          </div>
          <div class="total-payment order-payment">
            <ul class="accordion-payment">
              <li v-for="(tdrInfo, tdrIdx) in ordFinTdrMeansInfoList" :key="`TDR_INFO_${tdrIdx}`">
                <div class="tit-accordion">
                    {{tdrInfo.tdrMeansNm}}
                    <span class="price"><strong>{{tdrInfo.tdrAmt | currency}}</strong>{{tdrInfo.amtSpNm}}</span>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <!-- END : 결제 수단 -->
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area back">
          <button type="button" class="btn-md btn-bg darkgray" @click="popupCloseAction()">주문내역확인</button>
          <button type="button" class="btn-md btn-bg lightgreen" @click="goShop()">쇼핑하러 가기</button>
        </div>
        <!-- START : 하단 버튼 -->
      </div>
    </main>
    <Footer />
    <MfPopupDeliveryPrice @popupEvent="popupAction" v-if="this.popup.popupDeliveryPrice" /> <!-- 팝업 - 배송비 안내 -->
  </div>
</template>

<script>
import MainHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
import MfPopupDeliveryPrice from '@/views/od/MfPopupDeliveryPrice'; // 팝업 - 배송비 안내

import OrderMsg from '@/components/order/MfOrderMsg'; // 주문 메세지항목
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import SiteUtils from '@/common/SiteUtils';
import StringUtils from '@/common/StringUtils';
export default {
  name: "OrderCompelete",
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '결제 완료 < 주문결제 < %s'
  },
  props: {
    ordId: String,
  },
  data() {
    return {
      ordInfo: {
        ordId: null,
        lastTdrAmt: 0,
        totItemAmt: 0,
        totDcAmt: 0,
        totDlfee: 0,
        gsPntSavgAmt: 0, // 멤버심적립금액
      },
      ordFinTdrMeansInfoList: null, // 결제수단목록 정보
      ordFinDlvpInfo: null, // 배송지 목록 정보
      popup: { // 팝업
        open: false,
        popupDeliveryPrice: false,
      },
    };
  },
  components: {
    MainHeader,
    Footer,
    MfPopupDeliveryPrice,
  },
  filters: {
    currency: function(val) {
      return NumberUtils.toComma(val);
    },
  },
  methods: {
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    toFormat(x, y) {
      let rtnDate = '';
      if (this.isNotEmpty(x)) {
        rtnDate = x.substring(0, 4) + '.' + x.substring(5, 7) + '.' + x.substring(8, 10);
      }
      return rtnDate;
    },
    // 메인 홈 이동 함수
    goShop() {
      // Food >> New In 화면으로 이동
      location.href = SiteUtils.marketformo('/');
    },
    // 주문 상세 화면으로 이동
    popupCloseAction() {
      this.$router.push('/cs/mf/orddeliv/ord_deliv_dtl/' + this.ordId); // 주문 상세 화면으로 이동
    },
    // 주문 목록 화면으로 이동
    movePageOrderList() {
      if (this.ordInfo.thebanchanIncldYn !== 'Y') {
        this.$router.push('/cs/orddeliv/ord_deliv_list'); // 주문 목록 화면으로 이동
      }
    },
    // 주문완료 정보 조회 함수
    async srchOrdFin() {
      const params = {};
      params.ordId = this.ordId;
      const response = await ApiUtils.post('/fo/od/mf/ordfinmgnt/order-finish', JSON.stringify(params));
      // 정상 접근 여부 체크
      if (response.data.data.ordValidYn === false) {
        this.$gsdialog.alert(OrderMsg.ordValidChk).then(() => {
          this.$router.push({name: 'mfTheBasketMain'});
        });
      }
      this.ordInfo = response.data.data;
      this.ordFinDlvpInfo = response.data.data.ordFinDlvpInfo;
      this.ordFinTdrMeansInfoList = response.data.data.ordFinTdrMeansInfoList;
    },
  },
  mounted() {
    // 주문완료 정보 조회 함수 호출
    this.srchOrdFin();
  }
};
</script>
