<!--
Design: views/ss/SC-FO-SS-GF-MS-807.vue
Pg id: PG-FO-CS-O013
Uri: /cs/claimmgnt/ord_rtn_acept/:ordId/:delivId
-->
<template>
  <div class="wrap-mypage" v-bind:class="[siteClass]"><!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
    <SubDefaultHeader headerText="반품 신청" :tabbar="true" />
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="return-wrap">
        <!-- START : 상품정보 -->
        <section class="section mypage top">
          <span v-for="(delivType, inx) in delivTypeList" :key="inx">
            <div class="sub-title">
              <h2>
                <span class="inp-chk bg">
                  <input type="checkbox" name="chkAll" :id="'chkAll'+inx" :value="delivType.delivTypeCd" @click="checkAllDeliv(inx, delivType.delivTypeCd)">
                  <label :for="'chkAll'+inx">{{delivType.delivTypeNm}}{{'('+delivType.itemCnt+')'}}</label>
                </span>
              </h2>
            </div>
            <div class="list-content">
              <MyReturnList :ordInfoRslt="ordInfoRslt" :ordMstItemList="ordMstItemList" :ordSubItemList="ordSubItemList" :ordClaimResnList="ordClaimResnList" :chkDelivTypeId="'chkAll'+inx" @refndEvent="retrieveOrdClaimAmtCalc" />
            </div>
          </span>
        </section>
        <!-- END : 상품정보 -->
        <!-- START : 상품 회수지 정보 -->
        <section class="section wrap-breakdown">
          <div class="wrap-heading">
            <h3>상품 회수지 정보</h3>
          </div>
          <div class="receive-delivery-info">
            <div class="my-address">
              <p><span class="name">{{ordDlvpRslt.adrsNm}}</span>{{toPhoneFormat(ordDlvpRslt.adrsTelNo)}}</p>
              <p><span class="code">{{ordDlvpRslt.adrsZipcd}}</span> {{ordDlvpRslt.adrsAddr}}</p>
              <button type="button" id="btnDelivDt" class="btn-border btn-small" aria-label="방문날짜 선택 팝업 활성화" aria-haspopup="dialog" @click="popupAction('popupSelectDate')">방문날짜 선택하기</button>
              <p class="visit-date" v-if="isNotEmpty(ordDlvpRslt.retSchedDt)">
                <span class="point">
                  {{toFormat(ordDlvpRslt.retSchedDt, 'MM-DD(dd)')}}
                  {{toFormat(ordDlvpRslt.retSchedDt+ordDlvpRslt.retSchedBeginTm, 'HH:mm')}}~
                  {{toFormat(ordDlvpRslt.retSchedDt+ordDlvpRslt.retSchedEndTm, 'HH:mm')}}
                </span>
              </p>
              <p class="visit-date" v-if="isNotEmpty(ordDlvpRslt.delivSlotNm)">
                <span class="point">{{ordDlvpRslt.delivSlotNm}}</span>
              </p>
            </div>
          </div>
        </section>
        <!-- END : 상품 회수지 정보 -->
        <!-- START : 최종 결제금액 -->
        <section class="section mypage">
          <div class="total-payment order-payment has-popup">
            <div class="sub-title">
              <h3>결제정보</h3>
            </div>
            <ul class="accordion-payment">
              <li>
                <div class="tit-accordion">
                  취소 상품 금액 <span class="price"><strong>{{toComma(addTdrInfo.longCnclItemSprcTotAmt)}}</strong>원</span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                쿠폰/할인혜택 <span class="price"><strong>{{toComma(Number(addTdrInfo.intReCalcExpnsGapAllTotAmt) * -1)}}</strong>원</span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                  배송비<span class="small"></span>
                  <button type="button" aria-label="배송비 안내 팝업 활성화" aria-haspopup="dialog" class="btn-infomation" @click="popupDeliveryInfoAction"><span class="hidden">배송비 안내</span></button>
                  <span class="price"><strong>{{toComma(addTdrInfo.addTdrDlivAmt)}}</strong>원</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="sub-title send-total-price">
            <div class="expected-amount">
              <strong class="return-sum">환불예정금액 <span class="price"><strong>{{toComma(addTdrInfo.ordRefndTotAmt)}}</strong>원</span></strong>
              <strong class="return-sum" v-if="addTdrInfo != null && addTdrInfo.addTdrTotAmt > 0">
                추가결제금액 <span class="price"><strong>{{toComma(addTdrInfo.addTdrTotAmt)}}</strong>원</span>
              </strong>
            </div>
            <div class="sub-details" v-if="addTdrInfo != null && addTdrInfo.ordRefndTotAmt > 0 && refndMeansList != null && refndMeansList.length > 0">
              <div class="txt-point">
                환불수단
                <button type="button" aria-label="환불 처리안내 팝업 활성화" aria-haspopup="dialog" class="btn-infomation" @click="popupReturnInfoAction"><span class="hidden">환불 처리안내</span></button>
              </div>
              <span v-for="(refndMeansDtl, inx) in refndMeansList" :key="inx">
                <div class="txt-point" v-if="(refndMeansDtl.tdrMeansCd == '01' || refndMeansDtl.tdrMeansCd == '02') && refndMeansDtl.refndReqAmt > 0"> <!-- 계좌이체 / 신용카드 -->
                  {{refndMeansDtl.tdrMeansNm}}{{isEmpty(refndMeansDtl.tdrIsseCoNm) ? '' : '('+refndMeansDtl.tdrIsseCoNm+')'}} <span class="right">{{toComma(refndMeansDtl.refndReqAmt)}}원</span>
                </div>
                <div class="txt-point" v-else-if="refndMeansDtl.tdrMeansCd == '06' && refndMeansDtl.tdrMeansDtlCd == '06' && refndMeansDtl.refndReqAmt > 0"> <!-- 적립금 / GS&POINT -->
                  GS&amp;POINT  환불 <span class="right">{{toComma(refndMeansDtl.refndReqAmt)}}P</span>
                </div>
                <div class="txt-point" v-else-if="refndMeansDtl.tdrMeansCd == '06' && refndMeansDtl.tdrMeansDtlCd == '23' && refndMeansDtl.refndReqAmt > 0"> <!-- 적립금 / 리워즈 -->
                  THE POP 리워즈 환불 <span class="right">{{toComma(refndMeansDtl.refndReqAmt)}}점</span>
                </div>
                <p class="point-tip" v-else-if="refndMeansDtl.tdrMeansCd == '18' && refndMeansDtl.refndReqAmt > 0"> <!-- 통신사 할인 -->
                  통신사 할인{{toComma(refndMeansDtl.refndReqAmt)}}원은 통신사 포인트(<span class="point">{{toComma(refndMeansDtl.refndReqAmt)}}P</span>)로 환불 됩니다.
                </p>
                <div class="txt-point" v-else-if="refndMeansDtl.refndReqAmt > 0"> <!-- 기타 환불수단 -->
                  {{refndMeansDtl.tdrMeansNm}} <span class="right">{{toComma(refndMeansDtl.refndReqAmt)}}원</span>
                </div>
              </span>
            </div>
            <div class="sub-details" v-if="savgRetGsPnt > 0">
              <p class="txt-point" v-if="savgRetGsPnt > 0">GS&amp;POINT 적립 회수 <span class="right">{{savgRetGsPnt}}P</span></p>
            </div>
          </div>
        </section>
        <!-- END : 최종 결제금액 -->
        <!-- START : 결제수단 -->
        <ClaimAddPayment  v-if="addTdrInfo != null && addTdrInfo.addTdrTotAmt > 0"
                          ref="mdClaimAddTdr"
                          :ordId="ordId"
                          :addTdrInfo="addTdrInfo"
                          @saveOrdClaimAcept="saveOrdClaimAcept" />
        <!-- END : 결제수단 -->
        <ul class="list-type-dot-bg">
          <li>회수 후 상품의 상태에 따라 교환/반품 불가 및 추가금액이 부과될 수 있습니다. </li>
          <li>해외직구 교환/반품의 경우, 판매자 및 상품에 따른 부과 비용이 다르므로 해당 판매자에게 문의 하시길 바랍니다.</li>
        </ul>
        <section class="section">
          <div class="bottom-btn-area">
            <button type="button" class="btn-lg btn-bg lightgreen" @click="processOrdRtnAcept">반품신청</button>
          </div>
        </section>
        <!-- END : 하단 버튼 -->
      </div>
    </main>
    <Footer />
    <!-- START : 팝업 -->
    <PopupReturnInfo @popupEvent="popupAction" v-if="this.popup.popupReturnInfo" /> <!-- 팝업 - 환불 처리안내 -->
    <PopupDeliveryPersonal @popupEvent="popupAction" v-if="this.popup.popupDeliveryPersonal" :ordDlfeePolcList="ordDlfeePolcList" :claimSp="'RETURN'" /> <!-- 팝업 - 배송비 안내 -->
    <PopupSelectDate :ordDlvpRslt="ordDlvpRslt" @popupEvent="popupSelectDateAction" v-if="this.popup.popupSelectDate" /> <!-- 팝업 - 방문날짜선택 -->
    <!-- END : 팝업 -->
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer'; // 푸터
import MyReturnList from '@/components/mypage/MyReturnList'; // 개발용 실사용 컴포넌트 - 상품 목록
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import PopupDeliveryPersonal from '@/views/cs/claimmgnt/PopupDeliveryPersonal'; // 팝업 - 배송비(개인부담) 안내
import PopupReturnInfo from '@/views/cs/claimmgnt/PopupReturnInfo'; // 팝업 - 환불 처리안내
import PopupSelectDate from '@/views/cs/claimmgnt/popupSelectDate'; // 팝업 - 방문날짜선택
import ClaimAddPayment from '@/views/cs/claimmgnt/ClaimAddPayment'; // 클레임 추가 결제 모듈
import PaySheet from '@/views/od/PaySheet.vue';
import ClaimMsg from '@/components/mypage/cs/ClaimMsg.vue';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';
import dayjs from 'dayjs';
export default {
  name: "RequestReturn",
  data() {
    return {
      placeholder: '반품 사유를 자세히 적어주세요.\n직접적인 사유와 이미지를 첨부해주시면 교환 절차를 빠르게 진행할 수 있습니다.', // 기획 검수용
      swiperOptionScrollX: { // 기획 검수용
        slidesPerView: 'auto',
        freeMode: true,
        containerModifierClass: 'wrap-list-photo ',
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: false,
        },
      },
      popup: {
        open: false,
        popupSelectDate: false, // 방문날짜 선택
        popupReturnInfo: false, // 환불 처리안내
        popupDeliveryPersonal: false, // 배송비(개인부담)
      },
      ordClaimResnList: [], // 클레임사유코드 정보
      bfOrdDtInfo: {}, // 이전일자 주문 정보
      custCentTel: {}, // 고객센터 전화번호 정보
      ordInfoRslt: {}, // 주문정보결과
      delivTypeList: [], // 주문배송유형목록
      ordMstItemList: [], // 주문마스터상품목록
      ordSubItemList: [], // 주문서버상품목록
      ordDlvpRslt: {}, // 주문배송지결과
      ordDlfeePolcList: [], // 주문배송비정책정보목록
      addTdrInfo: {
        longCnclItemSprcTotAmt: 0, // 취소상품금액
        intReCalcExpnsGapAllTotAmt: 0, // 재계산 차이합산 총금액
        addTdrDlivAmt: 0, // 추가결제배송비금액
        ordRefndTotAmt: 0, // 주문환불금액
        altRefndAmt: 0, // 대체환불금액
        addTdrTotAmt: 0, // 추가결제금액
      }, // 추가결제정보
      savgRetGsPnt: 0, // 적립회수 GS&POINT
      refndMeansList: [], // 환불수단 정보
      ordId: this.$route.params.ordId, // 주문ID
      delivId: this.$route.params.delivId, // 배송ID
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '반품 신청 < 마이페이지 <%s',
    meta: [
      {
        property: 'aa:page',
        content: '반품 신청',
      },
    ],
  },
  mixins: [],
  components: {
    SubDefaultHeader, // 헤더
    Footer,
    MyReturnList, // 상품 목록
    PopupSelectDate, // 팝업 - 방문날짜선택
    PopupDeliveryPersonal, // 팝업 - 배송비 안내(고객부담)
    PopupReturnInfo, // 팝업 - 환불 처리안내
    ClaimAddPayment, // 클레임 추가 결제 모듈
  },
  methods: {
    // 팝업 활성/비활성
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    popupReturnInfoAction() {
      this.popupAction('popupReturnInfo');
    },
    popupDeliveryInfoAction() {
      this.popupAction('popupDeliveryPersonal');
    },
    popupSelectDateAction(dlvpInfoRslt) {
      this.popupAction('popupSelectDate');
      this.ordDlvpRslt = Object.assign({}, this.ordDlvpRslt, {
        retSchedDt: dlvpInfoRslt.delivReqDt,
        retSchedBeginTm: dlvpInfoRslt.delivBeginTm,
        retSchedEndTm: dlvpInfoRslt.delivEndTm,
        delivSeqs: dlvpInfoRslt.delivSeqs,
        delivSeqsSeqno: dlvpInfoRslt.delivSeqsSeqno,
        dlvrMethoCd: dlvpInfoRslt.dlvrMethoCd,
        dlvrMethoAddCd: dlvpInfoRslt.dlvrMethoAddCd,
        dlvrMethoDtlCnts: dlvpInfoRslt.dlvrMethoDtlCnts,
        delivSlotNm: dlvpInfoRslt.delivSlotNm,
      });
    },
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    toFormat(x, y) {
      return DateUtils.format(x, y);
    },
    toPhoneFormat(num) {
      if (this.isEmpty(num)) return '';
      let formatNum = "";
      if (num.length == 11) {
        formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      } else if (num.length == 8) {
        formatNum = num.replace(/(\d{4})(\d{4})/, "$1-$2");
      } else if (num.length == 10) {
        if (num.indexOf("02") == 0) {
          formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
        } else {
          formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        }
      } else {
        formatNum = num;
      }
      return formatNum;
    },
    checkAllDeliv(inx, delivTypeCd) { // 해당 배송유형의 상품들을 전체 Check or Uncheck 처리
      const chkFlag = document.getElementById("chkAll"+inx).checked;
      let chkCnt = 0;
      for (let mstInx = 0; mstInx < this.ordMstItemList.length; mstInx++) {
        if (this.ordMstItemList[mstInx].totDelivTypeCd == delivTypeCd) {
          // 선택 불가 상품인지 체크
          if (this.validateChkItem(this.ordMstItemList[mstInx])) {
            continue;
          }
          // 증정 사은품은 선택 할 수 없음.
          if (this.ordMstItemList[mstInx].presFrgfYn == 'Y') {
            continue;
          }
          // 첫구매/맛보기 사은품은 선택 할 수 없음.
          if (this.ordMstItemList[mstInx].firPurchItemYn == 'Y' || this.ordMstItemList[mstInx].sampItemYn == 'Y') {
            continue;
          }
          if (chkFlag) chkCnt++;
          this.ordMstItemList[mstInx].chkFlag = chkFlag;
          this.ordMstItemList[mstInx].claimQty = this.ordMstItemList[mstInx].ordQty;
          this.ordMstItemList[mstInx].ordClaimResnCd = '';
          this.ordMstItemList[mstInx].attFileId = '';
          this.ordMstItemList[mstInx].imageList = [];
        }
      }
      for (let subInx = 0; subInx < this.ordSubItemList.length; subInx++) {
        if (this.ordSubItemList[subInx].totDelivTypeCd == delivTypeCd) {
          // 선택 불가 상품인지 체크
          if (this.validateChkItem(this.ordSubItemList[subInx])) {
            continue;
          }
          // 증정 사은품은 선택 할 수 없음.
          if (this.ordSubItemList[subInx].presFrgfYn == 'Y' && chkFlag) {
            continue;
          }
          if (chkFlag) chkCnt++;
          this.ordSubItemList[subInx].chkFlag = chkFlag;
          this.ordSubItemList[subInx].claimQty = this.ordSubItemList[subInx].ordQty;
          this.ordSubItemList[subInx].ordClaimResnCd = '';
          this.ordSubItemList[subInx].attFileId = '';
          this.ordSubItemList[subInx].imageList = [];
        }
      }
      // 선택 상품이 없는 경우 Check 상태를 False로 한다.
      if (chkFlag && chkCnt == 0) {
        document.getElementById("chkAll"+inx).checked = false;
      }
      // 주문반품 환불정보 조회
      this.retrieveOrdClaimAmtCalc();
    },
    validateChkItem(itemDtl) {
      let rtnFlag = false;
      if (itemDtl.pkgYn != 'Y' && itemDtl.presFrgfYn != 'Y' && itemDtl.itemExchRtnPosbYn == 'N') {
        // 사은품이 아니고 상품교환반품가능여부가 'N' 이면 선택 불가능
        rtnFlag = true;
      } else if (itemDtl.pkgYn == 'Y' && itemDtl.ordItemSeqno == itemDtl.relatOrdSeqno) {
        // 패키지상품(상위)은 선택 불가 / 패키지상품(하위)은 선택 가능
        rtnFlag = true;
      }
      return rtnFlag;
    },
    async retrieveOrdItemInfo() { // 반품신청 시 주문 정보 조회
      const params = {
        ordId: this.ordId,
        delivId: this.delivId
      };
      const res = await ApiUtils.get('/fo/cs/claimmgnt/order-item-info', params);
      if (res.data === null || !res.data.success) {
        await this.$gsdialog.alert(res.data.statusMessage, {html: true});
        this.goBack();
        return;
      }
      const ordRtnRslt = res.data.data;
      this.ordInfoRslt = ordRtnRslt.ordInfoRslt;
      this.delivTypeList = ordRtnRslt.delivTypeList;
      this.ordMstItemList = ordRtnRslt.ordMstItemList;
      this.ordSubItemList = this.isEmpty(ordRtnRslt.ordSubItemList) ? [] : ordRtnRslt.ordSubItemList;
      this.ordDlvpRslt = ordRtnRslt.ordDlvpRslt;
      this.ordDlfeePolcList = ordRtnRslt.ordDlfeePolcList;

      // 오픈 이전일자 주문에 대한 방어 로직
      if (this.toFormat(this.bfOrdDtInfo.commCdNm, 'YYYYMMDD') > this.toFormat(this.ordInfoRslt.ordDttm, 'YYYYMMDD')) {
        await this.$gsdialog.alert("해당 주문의 취소/반품 신청은 1:1문의 나 고객센터("+this.custCentTel.commCdNm+")로 접수해 주시기 바랍니다.", {html: true});
        this.goBack();
        return;
      }

      // 공급업체가 폐점된 경우 반품 신청 불가
      if (this.ordInfoRslt.clstYn == 'Y') {
        await this.$gsdialog.alert('해당 주문의 매장이 폐점되어 고객센터('+this.custCentTel.commCdNm+')로 문의 하시기 바랍니다.', { html: true });
        this.goBack();
      }

      // 영업종료인 경우 반품 신청 불가
      if (this.ordInfoRslt.saleTsfSbjYn == 'Y') {
        await this.$gsdialog.alert('해당 주문의 매장이 영업 종료되어<br/>고객센터('+this.custCentTel.commCdNm+')로 문의 하시기 바랍니다.', { html: true });
        this.goBack();
        return;
      }
    },
    getCheckedItemInfo() { // 선택 상품 정보 취합 함수
      const claimOrdRtnProdList = []; // 주문취소상품
      const claimDelivList = []; // 클레임배송목록
      let rtnItem = {}; // 취소상품정보
      for (let itemInx = 0; itemInx < this.ordMstItemList.length; itemInx++) {
        if (this.ordMstItemList[itemInx].chkFlag) {
          // 증정사은품은 클레임접수 시 상품 정보에 포함 하지 않음.
          if (this.ordMstItemList[itemInx].presFrgfYn == 'Y') {
            continue;
          }
          // 첫구매/맛보기 사은품은 클레임접수 시 상품 정보에 포함 하지 않음.
          if (this.ordMstItemList[itemInx].firPurchItemYn == 'Y' || this.ordMstItemList[itemInx].sampItemYn == 'Y') {
            continue;
          }
          rtnItem = {};
          rtnItem.ordDtlSeqno = this.ordMstItemList[itemInx].ordDtlSeqno; // 주문상세일련번호
          rtnItem.ordItemSeqno = this.ordMstItemList[itemInx].ordItemSeqno; // 주문상품일련번호
          rtnItem.skuId = this.ordMstItemList[itemInx].skuId; // 단품ID
          rtnItem.itemId = this.ordMstItemList[itemInx].itemId; // 상품ID
          rtnItem.ordCnclAceptQty = this.ordMstItemList[itemInx].claimQty; // 주문취소접수수량
          rtnItem.attFileId = this.ordMstItemList[itemInx].attFileId; // 첨부파일ID
          rtnItem.claimAceptAttFileList = this.ordMstItemList[itemInx].imageList; // 이미지목록
          rtnItem.ordClaimResnCd = this.ordMstItemList[itemInx].ordClaimResnCd; // 주문클레임사유코드
          rtnItem.ordClaimReqCnts = this.ordMstItemList[itemInx].ordClaimReqCnts; // 주문클레임요청내용
          rtnItem.adrsAddr = this.ordDlvpRslt.adrsAddr; // 수취인주소
          claimOrdRtnProdList.push(rtnItem);
        }
      }
      for (let itemInx = 0; itemInx < this.ordSubItemList.length; itemInx++) {
        if (this.ordSubItemList[itemInx].chkFlag) {
          // 증정사은품은 클레임접수 시 상품 정보에 포함 하지 않음.
          if (this.ordSubItemList[itemInx].presFrgfYn == 'Y') {
            continue;
          }
          rtnItem = {};
          rtnItem.ordDtlSeqno = this.ordSubItemList[itemInx].ordDtlSeqno; // 주문상세일련번호
          rtnItem.ordItemSeqno = this.ordSubItemList[itemInx].ordItemSeqno; // 주문상품일련번호
          rtnItem.skuId = this.ordSubItemList[itemInx].skuId; // 단품ID
          rtnItem.itemId = this.ordSubItemList[itemInx].itemId; // 상품ID
          rtnItem.ordCnclAceptQty = this.ordSubItemList[itemInx].claimQty; // 주문취소접수수량
          rtnItem.attFileId = this.ordSubItemList[itemInx].attFileId; // 첨부파일ID
          rtnItem.claimAceptAttFileList = this.ordSubItemList[itemInx].imageList; // 이미지목록
          rtnItem.ordClaimResnCd = this.ordSubItemList[itemInx].ordClaimResnCd; // 주문클레임사유코드
          rtnItem.ordClaimReqCnts = this.ordSubItemList[itemInx].ordClaimReqCnts; // 주문클레임요청내용
          rtnItem.adrsAddr = this.ordDlvpRslt.adrsAddr; // 수취인주소
          claimOrdRtnProdList.push(rtnItem);
        }
      }
      const claimDeliv = { // 클레임배송
        ordId: this.ordInfoRslt.ordId, // 주문ID
        delivId: this.ordDlvpRslt.orgDelivId, // 배송ID
        delivReqDt: this.ordDlvpRslt.retSchedDt, // 배송요청일자
        delivRegnSpCd: this.ordDlvpRslt.delivRegnSpCd, // 배송지역구분코드
        delivRegnId: this.ordDlvpRslt.delivRegnId, // 배송지역ID
        delivSeqs: this.ordDlvpRslt.delivSeqs, // 배송차수
        delivSeqsSeqno: this.ordDlvpRslt.delivSeqsSeqno, // 배송차수일련번호
        itemDlvrMethoCd: this.ordDlvpRslt.dlvrMethoCd, // 상품전달방법코드
        itemDlvrMethoAddCd: this.ordDlvpRslt.dlvrMethoAddCd, // 상품전달방법추가코드
        itemDlvrMethoDtlCnts: this.ordDlvpRslt.dlvrMethoDtlCnts, // 상품전달방법상세내용
        retpZipcd: this.ordDlvpRslt.retpAdrsZipcd, // 회수지우편번호
        retpAddr: this.ordDlvpRslt.retpAdrsBaseAddr, // 회수지주소
        retpDtlAddr: this.ordDlvpRslt.retpAdrsDtlAddr, // 회수지상세주소
        retpStnmAddr: this.ordDlvpRslt.retpAdrsStnmBaseAddr, // 회수지도로명주소
        retpStnmDtlAddr: this.ordDlvpRslt.retpAdrsStnmDtlAddr, // 회수지도로명상세주소
      };
      claimDelivList.push(claimDeliv);

      const params = {
        ordId: this.ordInfoRslt.ordId,
        cmmMbrNo: this.ordInfoRslt.cmmMbrNo,
        userId: this.ordInfoRslt.cmmMbrNo,
        claimSp: 'R',
        claimProdList: claimOrdRtnProdList,
        claimDelivList: claimDelivList,
      };
      return params;
    },
    retrieveOrdClaimAmtCalc() {
      const params = this.getCheckedItemInfo();
      if (params.claimProdList.length == 0) {
        // 추가결제정보 초기화
        this.addTdrInfo = {
          longCnclItemSprcTotAmt: 0, // 취소상품금액
          intReCalcExpnsGapAllTotAmt: 0, // 재계산 차이합산 총금액
          addTdrDlivAmt: 0, // 추가결제배송비금액
          ordRefndTotAmt: 0, // 주문환불금액
          altRefndAmt: 0, // 대체환불금액
          addTdrTotAmt: 0, // 추가결제금액
        };
        // 환불수단 정보 초기화
        this.refndMeansList = [];
        // GS&POINT 적립회수 정보 초기화
        this.savgRetGsPnt = null;
        // 취소/반품 되는 마스터 상품의 첫구매/맛보기/사은품이 없는 경우 Uncheck 처리
        for (let itemInx = 0; itemInx < this.ordMstItemList.length; itemInx++) {
          if (this.ordMstItemList[itemInx].presFrgfYn == "Y" || this.ordMstItemList[itemInx].firPurchItemYn == 'Y' || this.ordMstItemList[itemInx].sampItemYn == 'Y') {
            this.ordMstItemList[itemInx].claimQty = 0;
            this.ordMstItemList[itemInx].chkFlag = false;
            this.ordMstItemList[itemInx].ordClaimResnCd = '';
          }
        }
        return;
      }
      ApiUtils.post('/fo/cs/ordRtnAcept', params)
        .then(res => {
          if (res.data === null || !res.data.success || res.data.statusCode != '0000') {
            this.$gsdialog.alert("반품 시 환불 금액 계산 중 오류가 발생하였습니다.<br/>같은 증상이 지속될 경우 고객센터("+this.custCentTel.commCdNm+")로 문의하시기 바랍니다.", {html: true});
            return;
          }
          const resData = res.data.data;
          // 적립회수 GS&POINT 금액 구하기
          const chgExpnsGsPntList = resData.orgExpnsList.expnsGsPointSaveList;
          if (chgExpnsGsPntList != null) {
            let savgRetGsPnt = 0; // 적립회수 GS&POINT
            for (let idx = 0; idx < chgExpnsGsPntList.length; idx++) {
              savgRetGsPnt += chgExpnsGsPntList[idx].reCalcPntGapAmt;
            }
            this.savgRetGsPnt = Math.abs(savgRetGsPnt);
          } else {
            this.savgRetGsPnt = null;
          }

          /* ============== 취소/반품 사은품(첫구매/맛보기/금액대/증정)이 존재하면 자동 Check 로직 START  ========================== */
          let msgFlag = false; // 반납사은품 메세지 출력 여부
          let rtnFrgfMsg = "해당상품은 증정품이 포함되어 있습니다.</br>아래 사은품을 함께 반납해 주셔야 합니다.</br>";

          // 취소/반품으로 인한 증정사은품도 반품 해야 되는지 체크
          const returnFrgfItemList = resData.returnFrgfItemList;
          if (returnFrgfItemList != null && returnFrgfItemList.length > 0) {
            for (let itemInx = 0; itemInx < this.ordMstItemList.length; itemInx++) {
              if (this.ordMstItemList[itemInx].presFrgfYn == "Y" || this.ordMstItemList[itemInx].firPurchItemYn == 'Y' || this.ordMstItemList[itemInx].sampItemYn == 'Y') { // 첫구매/맛보기/사은품일 경우
                // 취소/반품 사은품이 존재하지 않으면 uncheck 처리
                this.ordMstItemList[itemInx].claimQty = 0;
                this.ordMstItemList[itemInx].chkFlag = false;
                this.ordMstItemList[itemInx].ordClaimResnCd = '';
              }
            }
            for (let idx = 0; idx < returnFrgfItemList.length; idx++) {
              for (let itemInx = 0; itemInx < this.ordMstItemList.length; itemInx++) {
                if (this.ordMstItemList[itemInx].presFrgfYn == "Y" || this.ordMstItemList[itemInx].firPurchItemYn == 'Y' || this.ordMstItemList[itemInx].sampItemYn == 'Y') { // 첫구매/맛보기/사은품일 경우
                  if (returnFrgfItemList[idx].ordDtlSeqno == this.ordMstItemList[itemInx].ordDtlSeqno && returnFrgfItemList[idx].ordItemSeqno == this.ordMstItemList[itemInx].ordItemSeqno) {
                    // 취소/반품 사은품이 존재하면 check 처리
                    msgFlag = msgFlag ? msgFlag : !this.ordMstItemList[itemInx].chkFlag; // 사은품이 선택 되지 않았다면 msgFlag : true
                    rtnFrgfMsg += "</br>" + this.ordMstItemList[itemInx].itemNm + " * " + this.ordMstItemList[itemInx].ordQty;
                    this.ordMstItemList[itemInx].claimQty = returnFrgfItemList[idx].ordQty;
                    this.ordMstItemList[itemInx].chkFlag = true;
                  }
                }
              }
              for (let itemInx = 0; itemInx < this.ordSubItemList.length; itemInx++) {
                if (returnFrgfItemList[idx].ordDtlSeqno == this.ordSubItemList[itemInx].ordDtlSeqno && returnFrgfItemList[idx].ordItemSeqno == this.ordSubItemList[itemInx].ordItemSeqno) {
                  msgFlag = msgFlag ? msgFlag : !this.ordSubItemList[itemInx].chkFlag; // 사은품이 선택 되지 않았다면 msgFlag : true
                  rtnFrgfMsg += "</br>" + this.ordSubItemList[itemInx].itemNm + " * " + this.ordSubItemList[itemInx].ordQty;
                  this.ordSubItemList[itemInx].claimQty = returnFrgfItemList[idx].ordQty;
                  this.ordSubItemList[itemInx].chkFlag = true;
                }
              }
            }
          } else {
            // 취소/반품 되는 마스터 상품의 첫구매/맛보기/사은품이 없는 경우 Uncheck 처리
            for (let itemInx = 0; itemInx < this.ordMstItemList.length; itemInx++) {
              if (this.ordMstItemList[itemInx].presFrgfYn == "Y" || this.ordMstItemList[itemInx].firPurchItemYn == 'Y' || this.ordMstItemList[itemInx].sampItemYn == 'Y') {
                this.ordMstItemList[itemInx].claimQty = 0;
                this.ordMstItemList[itemInx].chkFlag = false;
                this.ordMstItemList[itemInx].ordClaimResnCd = '';
              }
            }
          }

          // 메세지 출려 여부에 따라 정해진 메세지 노출
          if (msgFlag) {
            this.$gsdialog.alert(rtnFrgfMsg, {html: true});
          }
          /* ============== 취소/반품 사은품이 존재하면 자동 Check 로직 END  ========================== */

          this.addTdrInfo = {
            longCnclItemSprcTotAmt: resData.longCnclItemSprcTotAmt, // 취소상품금액
            intReCalcExpnsGapAllTotAmt: resData.intReCalcExpnsGapAllTotAmt, // 재계산 차이합산 총금액
            addTdrDlivAmt: resData.addTdrDlivAmt, // 추가결제배송비금액
            ordRefndTotAmt: resData.ordRefndTotAmt, // 주문환불금액
            altRefndAmt: resData.altRefndAmt, // 대체환불금액
            addTdrTotAmt: resData.addTdrTotAmt, // 추가결제금액
          };
          this.refndMeansList = resData.refndMeansList;

          if (this.addTdrInfo.altRefndAmt > 0) {
            this.$gsdialog.alert("반품 시 환불이 불가능한 결제수단이 존재합니다.<br/>고객센터로 문의하시기 바랍니다.", {html: true});
            return;
          }
        }
      );
    },
    validatOrdRtnAcept() {
      const claimProdList = this.getCheckedItemInfo().claimProdList;
      if (this.addTdrInfo.altRefndAmt > 0) {
        this.$gsdialog.alert("반품 시 환불이 불가능한 결제수단이 존재합니다.<br/>고객센터로 문의하시기 바랍니다.", {html: true});
        return false;
      }
      let chkCnt = 0;
      for (let itemInx = 0; itemInx < claimProdList.length; itemInx++) {
        chkCnt++;
        if (this.isEmpty(claimProdList[itemInx].ordClaimResnCd)) {
          this.$gsdialog.alert("신청 사유를 선택해 주세요.");
          return false;
        }
        if (this.chkClaimResn(claimProdList[itemInx].ordClaimResnCd) == "2" && (claimProdList[itemInx].claimAceptAttFileList == null || claimProdList[itemInx].claimAceptAttFileList.length == 0 )) {
          this.$gsdialog.alert("반품 상품에 대한 이미지를 등록 해주세요.");
          return false;
        }
      }
      if (chkCnt == 0) {
        this.$gsdialog.alert("선택 된 상품이 없습니다.");
        return false;
      }
      if (this.isEmpty(this.ordDlvpRslt.retSchedDt) && this.isEmpty(this.ordDlvpRslt.delivSlotNm)) {
        this.$gsdialog.alert("방문날짜를 선택해 주세요.");
        document.getElementById("btnDelivDt").focus();
        return false;
      }
      return true;
    },
    async processOrdRtnAcept() { // 반품 신청 접수
      if (!this.validatOrdRtnAcept()) {
        return;
      }
      let strMsg = "반품신청 하시겠습니까?";
      if (this.ordInfoRslt.delivTypeCd == '03') {
        strMsg = "반품신청 하시겠습니까?<br/>상품을 이미 발송하신 경우에는 고객센터("+this.custCentTel.commCdNm+")로 접수해주십시오.";
      }
      const confirmFlag = await this.$gsdialog.confirm(strMsg, {html: true});
      if (confirmFlag) {
        if (Number(this.addTdrInfo.addTdrTotAmt) > 0) { // 추가결제금액이 존재하는 경우 처리
          this.$refs.mdClaimAddTdr.sendPayAuth(); // 추가결제 인증 함수 호출
        } else { // 추가 결제금액이 0원인 경우 처리
          this.saveOrdClaimAcept(null, null, null); // 추가결제 없이 반품접수 신청 저장 처리
        }
      }
    },
    async saveOrdClaimAcept(iOrderRequest, cashRcpctInfo) { // 주문 클레임 접수 저장 함수
      const params = this.getCheckedItemInfo();
      params.payAuthInfo = iOrderRequest; // 결제 인증 정보 Set
      const res = await ApiUtils.post('/fo/cs/processRtnAcept', params);
      if (res.data === null || !res.data.success || res.data.statusCode != '0000') {
        if (res.data.statusCode == '7901') {
          this.$gsdialog.alert("해당 주문의 취소/반품 신청은 1:1문의 나 고객센터("+this.custCentTel.commCdNm+")로 접수해 주시기 바랍니다.", {html: true});
        } else {
          this.$gsdialog.alert("반품접수가 불가능한 주문입니다.<br/>고객센터("+this.custCentTel.commCdNm+")로 문의하시기 바랍니다.", {html: true});
        }
        return;
      }
      const ordInfo = res.data.data;
      const ordId = this.ordId;
      const claimSeqno = ordInfo.claimSeqno;
      this.$router.push('/cs/claimmgnt/ord_rtn_proc_sate_info/'+ordId+'/'+claimSeqno);
    },
    goBack() {
      history.back();
    },
    chkClaimResn(claimResnCd) {
      const claimResnList = this.ordClaimResnList;
      for (let idx = 0; idx < claimResnList.length; idx++) {
        if (claimResnList[idx].commCd == claimResnCd) {
          return claimResnList[idx].otherRefCd;
        }
      }
      return null;
    },
    // 공통코드 조회
    searchCommCd(commGrpCd) {
      ApiUtils.get('/fo/cm/commcdmgnt/common-codes', {commGrpCd: commGrpCd})
      .then(res => {
        if (commGrpCd == 'OD0056') { // 오픈 이전일자 주문에 대한 방어 로직 관련 공통코드 조회
          this.bfOrdDtInfo = res.data.data.filter(cdDtl => {
            return cdDtl.commCd == '01';
          })[0];
        } else if (commGrpCd == 'CS0009') {
          this.ordClaimResnList = res.data.data;
          // 교환 시 불필요한 주문클레임사유코드 제거
          for (let idx = (this.ordClaimResnList.length - 1); idx > 0; idx--) {
            if (this.ordClaimResnList[idx].commCd == '10' || this.ordClaimResnList[idx].commCd == '14' || this.ordClaimResnList[idx].commCd == '15' || this.ordClaimResnList[idx].commCd == '16' ) {
              this.ordClaimResnList.splice(idx, 1);
            }
          }
        } else if (commGrpCd == 'CS0027') {
          this.custCentTel = res.data.data.filter(cdDtl => {
            return cdDtl.commCd == '04';
          })[0];
        }
      });
    },
  },
  async mounted() {
    // 오픈 이전일자 주문에 대한 방어 로직 관련 공통코드 조회
    await this.searchCommCd("OD0056");
    // 주문클레임사유 공통코드 조회
    this.searchCommCd("CS0009");
    // 가맹점(GS 리테일) 속성 공통코드 조회
    this.searchCommCd("CS0027");
    // 반품신청 시 주문 정보 조회
    this.retrieveOrdItemInfo();
  },
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++ ) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
  },
};
</script>
<style lang="scss">
</style>
