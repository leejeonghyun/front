<!--
views/od/SC-FO-PA-GS-MP-025
7658 [25] 앱리뷰 PR   DEPBOSFR-7658 변경
-->
<template>
  <div id="popupGiftSendCompelete" :class="[{'wrap-full-popup' : true, 'active' : true, 'h100' : true}, siteClass]" role="dialog" aria-modal="true">
    <!-- : 실사용 소스 -->
    <!-- <div id="popupGiftSendCompelete" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupGiftSendCompelete}"> -->
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <section class="gift-receive-complete">
          <h1 class="hidden">선물하기 완료</h1>
          <div class="msg-complete">
            <h2 class="msg-complete-txt">선물하기결제가<br>완료되었습니다.</h2>
          </div>
          <div class="section-area">
            <dl class="order-info">
              <dt>주문번호</dt>
              <dd>{{ordInfo.ordId}}</dd>
              <dt>선물 받는 분</dt>
              <dd>
                <strong class="name">{{giftMsgInfo.giftRcptCmmMbrNm}}</strong>
                <span v-if="giftMsgInfo.msgTmplSpCd === '3'">
                  {{giftMsgInfo.giftTrpsTelNo != null ? giftMsgInfo.giftTrpsTelNo.substring(0, 3) : ''}}
                  - {{giftMsgInfo.giftTrpsTelNo != null ? giftMsgInfo.giftTrpsTelNo.substring(3, 7) : ''}}
                  - {{giftMsgInfo.giftTrpsTelNo != null ? giftMsgInfo.giftTrpsTelNo.substring(7) : ''}}
                </span>
              </dd>
            </dl>
          </div>
          <!-- START : 최종 결제금액 -->
          <div class="section-area">
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
          </div>
          <!-- END : 최종 결제금액 -->
          <!-- START : 결제 수단 -->
          <div class="section-area">
            <div class="sub-title">
              <h2>결제수단</h2>
            </div>
            <dl class="sub-inner-box payment-info" v-for="(ordFinTdrMeansInfoInfo, idx) in ordFinTdrMeansInfoList" v-bind:key="ordFinTdrMeansInfoInfo.tdrMeansCd">
              <dt v-if="idx === 0">{{ordFinTdrMeansInfoInfo.fstRegDttm}}</dt>
              <dd>
                  <span v-if="idx != 0">+ </span>
                  {{ordFinTdrMeansInfoInfo.tdrMeansNm}}<span v-if="ordFinTdrMeansInfoInfo.tdrMeansCd === '02'">({{ordFinTdrMeansInfoInfo.pytcCardNm}}/{{ordFinTdrMeansInfoInfo.ccardInstlMths!='0'?ordFinTdrMeansInfoInfo.ccardInstlMths+'개월':'일시불'}})</span> {{numToComma(ordFinTdrMeansInfoInfo.tdrAmt)}}
                  <span v-if="ordFinTdrMeansInfoInfo.tdrMeansCd === '06'">P</span> <!-- GS&POINT -->
                  <span v-else-if="ordFinTdrMeansInfoInfo.tdrMeansCd === '13'">점</span> <!-- THE POP 리워즈 -->
                  <span v-else>원</span>
                </dd>
            </dl>
          </div>
          <!-- END : 결제 수단 -->
          <!-- START : 유의사항 -->
          <section class="section-area">
            <div class="sub-inner-box">
              <dl class="order-caution">
                <dt class="ico-alert">선물하기 유의사항</dt>
                <dd class="ico-alert2">선물 받는 사람이 배송정보를 입력하면 상품 준비 및 배송이 시작됩니다.</dd>
                <dd class="ico-alert2">받는 분이 주문일로부터 <strong class="point">3일 이내</strong>에 배송정보를 입력하지 않을 경우, 주문이 자동 취소됩니다.</dd>
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
  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ShareUtils from '@/common/ShareUtils';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
import LoginUtils from '@/common/LoginUtils';
import PopupAppReview from '@/views/od/PopupAppReview'; // 팝업 - 앱리뷰 이벤트
import PopupAppImprove from '@/views/od/PopupAppImprove'; // 팝업 - 앱개선 작성


export default {
  props: {
    ordId: String,
  },
  name: "PopupGiftSendCompelete",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '선물하기 완료 < 선물하기 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '선물하기완료',
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
      ordTypeCd: '20',
      ordFinDlvpInfoList: null,
      ordFinTdrMeansInfoList: null,
      dawnDelivFlag: false,
      itemOrdPntSavgAmt: 0, // 멤버심적립금액
      loginYn: LoginUtils.isLogin(),
      giftMsgInfo: {},
      siteClass: CookieUtils.getSiteClass(),
      popup: {
        popupAppReviewEvent: false, // 앱리뷰 이벤트 팝업 [25] 앱리뷰   DEPBOSFR-7343
        PopupAppImprove: false, // 앱개선 작성 팝업
      },
    };
  },
  components: {
    PopupAppReview,
    PopupAppImprove,
  },
  methods: {
    popupCloseAction() {
      // this.$emit('popupEvent', 'popupOrderCompelete');
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
      this.ordTypeCd = this.ordInfo.tbOdOrdDtlDto.ordTypeCd;
      if (this.ordTypeCd === '20') {
        this.giftOrderSend();
      }
      this.ordFinDlvpInfoList = response.data.data.ordFinDlvpInfoList;
      this.ordFinTdrMeansInfoList = response.data.data.ordFinTdrMeansInfoList;
      for (let i = 0; i < this.ordFinDlvpInfoList.length; i++) {
        if (this.ordFinDlvpInfoList[i].delivTypeCd === '04' ) {
          this.dawnDelivFlag = true;
          break;
        }
      }
      if (this.ordInfo.appReviewPopYn == 'Y') {
        this.popup.popupAppReviewEvent = true;
      }
    },
    // 주문선물 조회(수취자정보, 결제자정보, 선물메세지)
    async giftOrderInfo() {
      const params = {
        ordId: this.ordId,
      };
      const resultGiftInfo = await ApiUtils.get('/fo/od/giftMgnt/gift_order_ps_info', params);
      this.giftMsgInfo = resultGiftInfo.data.data;
      // 휴대전화번호 공통코드 조회
      const param = {
        commGrpCd: 'CU0005',
      };
      const result = await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', param);
      this.telCoNoList = result.data.data;
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
      const homeCode = 'fr_' + CookieUtils.getMallId() + '_' + CookieUtils.getMdaType();
      location.href = CookieUtils.getDomain(homeCode);
    },
    async retrievePntSavgRtInfo() {
      const iOrderRequestInputDto = {
        ordId: this.ordId
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/ord-pntSavg-rate', iOrderRequestInputDto);
      this.itemOrdPntSavgAmt = response.data.data.gsPntSavg;
    },
    shareKa() {
        const snsUrl = SiteUtils.commo('/od/gift_rcv_dlv/' + this.ordId);
        const prodImg = process.env.VUE_APP_IMAGE_SERVER + '/mail/gift/' + this.giftMsgInfo.giftImgFilePathNm;
        const title = this.giftMsgInfo.giftRcptCmmMbrNm + '님 선물이 도착했어요.'; // TODO
        let shareText = this.giftMsgInfo.giftMsgCnts;
        shareText += '[GS 프레시몰] 선물이 도착했습니다.\n';
        shareText += this.giftMsgInfo.giftRcptCmmMbrNm + ' 고객님!\n';
        shareText += this.giftMsgInfo.giftTdrCmmMbrNm + ' 고객님께서 보낸 선물이 도착했어요\n';
        shareText += '배송지를 등록하면 GS 프레시몰 에서 안전하게 배송해 드릴게요!\n';
        shareText += '※ 배송지를 3일내 등록하지 않는 경우 자동 취소되며 원 결제자(선물한 분)에게 환급/취소됩니다.';
        shareText += '※ 이용방법 문의 및 기타 문의 고객행복센터: 1661-2562';
        console.log(prodImg);
        console.log(snsUrl);
        console.log(shareText);
        ShareUtils.shareKakaoTalk(snsUrl, shareText, prodImg, title, null);
    },
    giftOrderSend() {
      if (this.ordTypeCd === '20' && this.giftMsgInfo.msgTmplSpCd === '1') {
        ShareUtils.init();
        this.$gsdialog.confirm(OrderMsg.completeOrd, {html: true}).then(dialog =>{
          this.shareKa();
        });
      }
    },
    popupAction() {
      this.$emit('popupEvent', 'PopupAppReview');
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
    this.srchOrdFin();
    this.giftOrderInfo();
    this.retrievePntSavgRtInfo();
  }
};
</script>
