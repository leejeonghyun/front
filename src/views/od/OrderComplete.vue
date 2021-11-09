<!--
Design: views/od/SC-FO-PA-GS-MP-015
Pg id:
Uri:
7658 [25] 앱리뷰 PR   DEPBOSFR-7658 변경
-->
<template>
  <div id="popupOrderCompelete" :class="[{'wrap-full-popup' : true, 'active' : true, 'h100' : true}, siteClass]" role="dialog" aria-modal="true">
    <!-- : 실사용 소스 -->
    <!-- <div id="popupOrderCompelete" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupOrderCompelete}"> -->
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <section class="gift-receive-complete">
          <h1 class="hidden">결제 완료</h1>
          <section class="msg-complete order-complete">
            <h2 class="msg-complete-txt">주문이 완료되었습니다.</h2>
            <p class="msg-txt-info">이용해주셔서 감사합니다.<br>고객님의 주문내역을 확인해주세요.</p>
            <p class="msg-txt-info signup-event-txt" v-if="fstOrdInfo && fstOrdInfo.ordSumCnt == 1">
              신규가입 <strong class="point">{{fstOrdInfo.fstVisitDttm}}</strong>까지 새벽배송 / 당일배송만 <strong class="point">{{numToComma(fstOrdInfo.dlfeeStandFreeAmt)}}원 이상 무료 배송</strong>
            </p>
          </section>
          <section class="section-area">
            <dl class="order-info">
              <dt>주문번호</dt>
              <dd>{{ordInfo.ordId}}</dd>
            </dl>
          </section>
          <!-- START : 배송지 -->
          <section class="section-area">
            <div class="sub-title">
              <h2>배송지</h2>
            </div>
            <div class="sub-inner-box">
              <div class="receive-delivery-info" v-for="ordFinDlvpInfoInfo in ordFinDlvpList" v-bind:key="ordFinDlvpInfoInfo.delivId">
                <div class="my-address">
                  <p class="wb-a">{{ordFinDlvpInfoInfo.adrsNm}} [{{ordFinDlvpInfoInfo.dlvpNm}}]</p>
                  <p><span class="code">{{ordFinDlvpInfoInfo.zipcd}}</span> {{ordFinDlvpInfoInfo.adrsStnmAddr}} {{ordFinDlvpInfoInfo.adrsStnmDtlAddr}}</p>
                </div>
              </div>
            </div>
          </section>
          <!-- END : 배송지 -->
          <!-- START : 최종 결제금액 -->
          <section class="section-area">
            <div class="sub-title send-total-price">
              <h2>최종결제금액 <span class="price"><strong>{{numToComma(ordInfo.lastTdrAmt)}}</strong>원</span></h2>
            </div>
            <div class="sub-inner-box">
              <ul class="price-list">
                <li>총 상품금액 <span class="price">{{numToComma(ordInfo.totItemAmt)}}원</span></li>
                <li>총 할인 금액 <span class="price red">{{numToCommaDc(ordInfo.totDcAmt)}}원</span></li>
                <li>총 배송비 <span class="price">{{numToComma(ordInfo.totDlfee)}}원</span></li>
              </ul>
              <p class="txt-point">배송 완료 후, GS&amp;POINT적립 <span class="point">{{numToComma(itemOrdPntSavgAmt)}}P</span></p>
            </div>
          </section>
          <!-- END : 최종 결제금액 -->
          <!-- START : 결제 수단 -->
          <section class="section-area">
            <div class="sub-title">
              <h2>결제수단</h2>
            </div>
            <dl class="sub-inner-box detail-list" v-for="(ordFinTdrMeansInfoInfo, idx) in ordFinTdrMeansInfoList" v-bind:key="ordFinTdrMeansInfoInfo.tdrMeansDtlCd">
              <dt v-if="idx === 0">{{ordFinTdrMeansInfoInfo.fstRegDttm}}</dt>
              <dd>
                  <span v-if="idx != 0">+ </span>
                  {{ordFinTdrMeansInfoInfo.tdrMeansNm}}<span v-if="ordFinTdrMeansInfoInfo.tdrMeansCd === '02'">{{ordFinTdrMeansInfoInfo.pytcCardNm}}</span> {{numToComma(ordFinTdrMeansInfoInfo.tdrAmt)}}
                  <span v-if="ordFinTdrMeansInfoInfo.tdrMeansCd === '06'">P</span> <!-- GS&POINT -->
                  <span v-else-if="ordFinTdrMeansInfoInfo.tdrMeansCd === '13'">점</span> <!-- THE POP 리워즈 -->
                  <span v-else-if="ordFinTdrMeansInfoInfo.tdrMeansCd === '15'">원</span> <!-- 해피머니상품권 -->
                  <span v-else-if="ordFinTdrMeansInfoInfo.tdrMeansCd === '16'">원</span> <!-- 도서문화상품권 -->
                  <span v-else>원</span>
                </dd>
              <!-- <dd>tdrMeansNm 1,000P</dd>
              <dd>+ THE POP리워즈 500점</dd>
              <dd>+ 해피머니상품권 10,000원</dd>
              <dd>+ 신용카드(BC카드/일시불) 16,500원</dd> -->
            </dl>
          </section>
          <!-- END : 결제 수단 -->
          <!-- START : 유의사항 -->
          <section class="section-area" v-show="dawnDelivFlag">
            <div class="sub-inner-box">
              <dl class="order-caution">
                <dt class="ico-alert">새벽배송 유의사항</dt>
                <dd class="ico-alert2">새벽배송 박스와 받으신 포장재를 다음 주문 시 배달 지정 장소에 놓아 주시면 저희가 회수해 가겠습니다.</dd>
              </dl>
            </div>
          </section>
          <!-- END : 유의사항 -->
          <!-- START : 하단 버튼 -->
          <div class="bottom-btn-area">
            <button type="button" class="btn-md btn-bg darkgray" @click="popupCloseAction">주문내역확인</button>
            <button type="button" class="btn-md btn-bg lightgreen" @click="goShop">쇼핑하러 가기</button>
          </div>
          <!-- START : 하단 버튼 -->
        </section>
      </div>
    </div>

    <!-- START : 팝업 -->
    <PopupAppReview @popupEvent="popupAction" v-if="popup.popupAppReviewEvent"/><!-- 앱리뷰 이벤트 팝업 -->
    <PopupAppImprove @popupEvent="popupAction" v-if="popup.PopupAppImprove"/><!-- 앱개선 작성 팝업 -->
    <PopupAppPushAgree @popupEvent="popupAction2" v-if="popup.pushAgreeOpenYn" /> <!-- 팝업 - APP PUSH 광고성동의 팝업 -->
  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
import LoginUtils from '@/common/LoginUtils';
import SiteUtils from '@/common/SiteUtils';
import PopupAppReview from '@/views/od/PopupAppReview'; // 팝업 - 앱리뷰 이벤트
import PopupAppImprove from '@/views/od/PopupAppImprove'; // 팝업 - 앱개선 작성
import PopupAppPushAgree from '@/components/common/PopupAppPushAgree';

export default {
  props: {
    ordId: String,
  },
  name: "PopupOrderCompelete",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '결제 완료 < 주문결제 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '주문완료',
      },
    ],
  },
  mixins: [LayerPopupMixin],
  data() {
    return {
      ordInfo: {
        ordId: '',
        lastTdrAmt: '',
        totItemAmt: '',
        totDcAmt: '',
        totDlfee: '',
        gsPntSavgAmt: '',
      },
      ordTypeCd: '10',
      ordFinDlvpInfoList: null,
      ordFinDlvpList: [],
      ordFinTdrMeansInfoList: null,
      dawnDelivFlag: false,
      itemOrdPntSavgAmt: 0, // 멤버심적립금액
      fstOrdInfo: null,
      loginYn: LoginUtils.isLogin(),
      siteClass: CookieUtils.getSiteClass(),
      popup: {
        promId: '',
        open: false,
        popupAppReviewEvent: false, // 앱리뷰 이벤트 팝업 [25] 앱리뷰   DEPBOSFR-7343
        PopupAppImprove: false, // 앱개선 작성 팝업
        pushAgreeOpenYn: false, // APP PUSH 광고성동의 팝업
      },
    };
  },
  components: {
    PopupAppReview,
    PopupAppImprove,
    PopupAppPushAgree,
  },
  watch: {
  },
  methods: {
    popupCloseAction() {
      this.$router.push('/cs/orddeliv/ord_deliv_dtl/' + this.ordId); // 주문 상세 화면으로 이동
    },
    async srchOrdFin() {
      const params = {};
      params.ordId = this.ordId;
      const response = await ApiUtils.post('/fo/od/ordfinmgnt/order-finish', JSON.stringify(params));
      // console.log('response.data.data : ', response.data.data);
      if (response.data.data.ordValidYn === false) {
        this.$gsdialog.alert(OrderMsg.ordValidChk);
        this.$router.push({name: 'theBasket'});
      }
      this.ordInfo = response.data.data;
      // this.$gsdialog.alert(this.ordInfo.appReviewPopYn);
      this.itemOrdPntSavgAmt = this.ordInfo.gsPntSavgAmt;
      this.ordTypeCd = this.ordInfo.tbOdOrdDtlDto.ordTypeCd;
      this.ordFinDlvpInfoList = response.data.data.ordFinDlvpInfoList;
      if (this.ordFinDlvpInfoList.findIndex(item=>item.delivTypeCd === '04') !== -1) {
        this.dawnDelivFlag = true;
      }
      this.ordFinTdrMeansInfoList = response.data.data.ordFinTdrMeansInfoList;
      if (this.ordFinDlvpInfoList) {
        this.ordFinDlvpList = [];
        let delivAdrs = '';
        for (let i = 0; i < this.ordFinDlvpInfoList.length; i++) {
          const dlvpInfo = this.ordFinDlvpInfoList[i];
          if (i > 0) {
            delivAdrs = this.ordFinDlvpInfoList[i-1].adrsNm + this.ordFinDlvpInfoList[i-1].dlvpNm + this.ordFinDlvpInfoList[i-1].zipcd + this.ordFinDlvpInfoList[i-1].adrsStnmAddr + this.ordFinDlvpInfoList[i-1].adrsDtlAddr;
          }
          if (delivAdrs != dlvpInfo.adrsNm + dlvpInfo.dlvpNm + dlvpInfo.zipcd + dlvpInfo.adrsStnmAddr + dlvpInfo.adrsDtlAddr) {
            this.ordFinDlvpList.push(dlvpInfo);
          }
        }
      }
      if (response.data.data.firstBuyGiftOrdYn == 'Y') {
        if (CookieUtils.getCookie('cartFirstItemId') != '' ) {
          this.$gsdialog.alert(OrderMsg.firstBuyGift(CookieUtils.getCookie('CUST_NM'), JSON.parse(CookieUtils.getCookie('cartFirstItemId')).itemNm ), {html: true});
          CookieUtils.deleteCookie('cartFirstItemId');
        }
      }
      if (this.ordInfo.appReviewPopYn == 'Y') {
        this.popup.popupAppReviewEvent = true;
      }
    },
    numToCommaDc(dcAmt) {
      let temp = 0;
      if (dcAmt != "0") {
        temp = "-"+this.numToComma(dcAmt);
      }
      return temp;
    },
    numToComma(amt) {
      let temp = 0;
      if (amt != '') {
        temp = NumberUtils.toComma(amt);
      }
      return temp;
    },
    goShop() {
      // const homeCode = 'fr_' + CookieUtils.getMallId() + '_' + CookieUtils.getMdaType();
      // location.href = CookieUtils.getDomain(homeCode);
      location.href = SiteUtils.to(CookieUtils.getMallId(), '/');
    },
    async retrievePntSavgRtInfo() {
      const iOrderRequestInputDto = {
        ordId: this.ordId
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/ord-pntSavg-rate', iOrderRequestInputDto);
      this.itemOrdPntSavgAmt = response.data.data.gsPntSavg;
    },
    async retrieveFstOrdInfo() {
      const iTbCsMbrOrdAggDto = {
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/ords-fst-ord-info', iTbCsMbrOrdAggDto);
      this.fstOrdInfo = response.data.data;
    },
    popupAction() { // 팝업 활성/비활성
      this.$emit('popupEvent', 'PopupAppReview');
    },
    popupAction2(type, promId) { // 팝업 활성/비활성
        this.popup.promId = promId;
        this.popup[`${type}`] = !this.popup[`${type}`];
        this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false;
    },
    popupAppImproveActive() {
      this.popup.popupAppReviewEvent = false;
      this.popup.PopupAppImprove = true;
    },
    checkAppImproveActiveMsg() {
      if (this.ordInfo.appCommentEntryYn == 'Y') {
        return '이미 개선의견을 등록하셨습니다.';
      } else if (this.ordInfo.appCommentEventId == null ||
                 this.ordInfo.appCommentEventId == '') {
        return '현재 진행 중인 이벤트가 없습니다.';
      } else if (this.ordInfo.appCommentEntryYn == 'N' &&
                 this.ordInfo.appCommentEventId !== null) {
        return '';
      }
    },
  },
  mounted() {
    if ( CookieUtils.getCookie('MbrJoinTodayYn') == 'N' && CookieUtils.getCookie('PushAgreeOpenYn') == 'Y' && CookieUtils.getCmmSteId() == '1') {
      this.popup.pushAgreeOpenYn = true;
    }
    this.srchOrdFin();
    // this.retrievePntSavgRtInfo();
    this.retrieveFstOrdInfo();
  }
};
</script>

<style lang="scss">
</style>
