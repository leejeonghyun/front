<!--
Design: views/ss/SC-FO-SS-GF-MS-806.vue
Pg id: PG-FO-CS-O011.
Uri: /cs/claimmgnt/ord_cncl_acept/:ordId/:delivId
-->
<template>
  <div class="wrap-mypage" v-bind:class="[siteClass]"><!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
    <SubDefaultHeader headerText="취소신청" :tabbar="true"/>
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
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
              <MyChangeAmountList :ordInfoRslt="ordInfoRslt" :ordMstItemList="ordMstItemList" :ordSubItemList="ordSubItemList" :chkDelivTypeId="'chkAll'+inx" @refndEvent="retrieveOrdClaimAmtCalc" />
            </div>
          </span>
        </section>
        <!-- END : 상품정보 -->
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
        <!-- START : 결제수단 추가 -->
        <ClaimAddPayment  v-if="addTdrInfo != null && addTdrInfo.addTdrTotAmt > 0"
                          ref="mdClaimAddTdr"
                          :ordId="ordId"
                          :addTdrInfo="addTdrInfo"
                          @saveOrdClaimAcept="saveOrdClaimAcept" />
        <!-- END : 결제수단 추가 -->
        <!-- START : 하단 버튼 -->
        <section class="section">
          <div class="bottom-btn-area">
            <button type="button" class="btn-lg btn-bg lightgreen" @click="processFrontOrdCnclAcept">취소신청</button>
          </div>
        </section>
        <!-- START : 하단 버튼 -->
      </div>
    </main>
    <Footer />
    <!-- START : 팝업 -->
    <PopupDeliveryPersonal @popupEvent="popupAction" v-if="this.popup.popupDeliveryPersonal" :ordDlfeePolcList="ordDlfeePolcList" :claimSp="'CANCEL'" /> <!-- 팝업 - 배송비 안내 -->
    <PopupReturnInfo @popupEvent="popupAction" v-if="this.popup.popupReturnInfo" /> <!-- 팝업 - 환불 처리안내 -->
    <!-- END : 팝업 -->
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import MyChangeAmountList from '@/components/mypage/MyChangeAmountList'; //  상품 목록
import PopupDeliveryPersonal from '@/views/cs/claimmgnt/PopupDeliveryPersonal'; // 팝업 - 배송비(개인부담) 안내
import PopupReturnInfo from '@/views/cs/claimmgnt/PopupReturnInfo'; // 팝업 - 환불 처리안내
import ClaimAddPayment from '@/views/cs/claimmgnt/ClaimAddPayment'; // 클레임 추가 결제 모듈
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';
import Tracker from '@/common/Tracker';
import dayjs from 'dayjs';
export default {
  name: "RequestCancel",
  data() {
    return {
      cashReceipt: false,
      popup: {
        open: false,
        popupReturnInfo: false, // 환불 처리안내
        popupDeliveryPersonal: false, // 배송비
        popupReturnInfo: false, // 환불 처리안내
      },
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
    titleTemplate: '취소 신청 < 마이페이지 <%s'
  },
  mixins: [],
  components: {
    SubDefaultHeader, // 헤더
    Footer,
    MyChangeAmountList, // 상품 목록 - 수량 변경
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
      let spckItemOrderYn = 'N'; // 심플리쿡 상품 발주 여부
      for (let mstInx = 0; mstInx < this.ordMstItemList.length; mstInx++) {
        if (this.ordMstItemList[mstInx].totDelivTypeCd == delivTypeCd) {
          // 증정 사은품은 선택 할 수 없음.
          if (this.ordMstItemList[mstInx].presFrgfYn == 'Y') {
            continue;
          }
          // 첫구매/맛보기 사은품은 선택 할 수 없음.
          if (this.ordMstItemList[mstInx].firPurchItemYn == 'Y' || this.ordMstItemList[mstInx].sampItemYn == 'Y') {
            continue;
          }
          // 심플리쿡 상품이고 발주상태코드가 발주('Y')이면 선택 불가능
          if (this.ordMstItemList[mstInx].spckItemYn == 'Y' && this.ordMstItemList[mstInx].orderStatCd == 'Y') {
            spckItemOrderYn = chkFlag ? 'Y' : spckItemOrderYn;
            continue;
          }
          if (chkFlag) chkCnt++;
          this.ordMstItemList[mstInx].chkFlag = chkFlag;
          this.ordMstItemList[mstInx].claimQty = this.ordMstItemList[mstInx].ordQty;
          this.ordMstItemList[mstInx].ordClaimResnCd = '';
        }
      }
      for (let subInx = 0; subInx < this.ordSubItemList.length; subInx++) {
        if (this.ordSubItemList[subInx].totDelivTypeCd == delivTypeCd) {
          // 증정 사은품은 선택 할 수 없음.
          if (this.ordSubItemList[subInx].presFrgfYn == 'Y' && chkFlag) {
            continue;
          }
          // 심플리쿡 상품이고 발주상태코드가 발주('Y')이면 선택 불가능
          if (this.ordSubItemList[subInx].spckItemYn == 'Y' && this.ordSubItemList[subInx].orderStatCd == 'Y') {
            spckItemOrderYn = chkFlag ? 'Y' : spckItemOrderYn;
            continue;
          }
          if (chkFlag) chkCnt++;
          this.ordSubItemList[subInx].chkFlag = chkFlag;
          this.ordSubItemList[subInx].claimQty = this.ordSubItemList[subInx].ordQty;
          this.ordSubItemList[subInx].ordClaimResnCd = '';
        }
      }
      // 선택 상품이 없는 경우 Check 상태를 False로 한다.
      if (chkFlag && chkCnt == 0) {
        document.getElementById("chkAll"+inx).checked = false;
      }
      // 심플리쿡 상품이고 발주상태코드가 발주('Y')인 상품이 있으면 메세지 노출
      if (spckItemOrderYn === 'Y') {
        this.$gsdialog.alert("해당 주문에 준비중인 심플리쿡 상품이 있습니다.<br/>선택 되지 않은 상품을 확인 하세요.", {html: true});
      }
      // 주문취소 환불정보 조회
      this.retrieveOrdClaimAmtCalc();
    },
    async retrieveOrdItemInfo() { // 취소신청 시 주문 정보 조회
      const params = {
        ordId: this.ordId,
        delivId: this.delivId
      };
      const res = await ApiUtils.get('/fo/cs/claimmgnt/order-item-info', params);
      if (res.data === null || !res.data.success) {
        this.$gsdialog.alert(res.data.statusMessage, {html: true});
        this.goBack();
        return;
      }
      const ordCnclRslt = res.data.data;
      this.ordInfoRslt = ordCnclRslt.ordInfoRslt;
      this.delivTypeList = ordCnclRslt.delivTypeList;
      this.ordMstItemList = ordCnclRslt.ordMstItemList;
      this.ordSubItemList = this.isEmpty(ordCnclRslt.ordSubItemList) ? [] : ordCnclRslt.ordSubItemList;
      this.ordDlvpRslt = ordCnclRslt.ordDlvpRslt;
      this.ordDlfeePolcList = ordCnclRslt.ordDlfeePolcList;

      // 오픈 이전일자 주문에 대한 방어 로직
      if (this.toFormat(this.bfOrdDtInfo.commCdNm, 'YYYYMMDD') > this.toFormat(this.ordInfoRslt.ordDttm, 'YYYYMMDD')) {
        await this.$gsdialog.alert("해당 주문의 취소/반품 신청은 1:1문의 나 고객센터("+this.custCentTel.commCdNm+")로 접수해 주시기 바랍니다.", {html: true});
        this.goBack();
        return;
      }

      // 첫구매 상품이 포함된 주문은 전체취소만 가능
      if (this.ordInfoRslt.firPurchItemYn == 'Y') {
        await this.$gsdialog.alert("첫구매 상품이 포함된 주문은 전체취소만 가능합니다.", {html: true});
        this.goBack();
        return;
      }

      // 합배송인 경우 취소신청이 불가능하다.
      if (this.ordInfoRslt.bundlDelivYn == 'Y') {
        await this.$gsdialog.alert("합배송주문은 취소신청이 불가능합니다.<br/>자세한 사항은 고객센터로 문의해주십시오.", {html: true});
        this.goBack();
        return;
      }

      // 영업종료인 경우 취소신청이 불가능하다.
      if (this.ordInfoRslt.saleTsfSbjYn == 'Y') {
        await this.$gsdialog.alert('해당 주문의 매장이 영업 종료되어<br/>고객센터('+this.custCentTel.commCdNm+')로 문의 하시기 바랍니다.', { html: true });
        this.goBack();
        return;
      }
    },
    getCheckedItemInfo() { // 선택 상품 정보 취합 함수
      const claimOrdCnclProdList = []; // 주문취소상품
      let cnclItem = {}; // 취소상품정보
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
          cnclItem = {};
          cnclItem.ordDtlSeqno = this.ordMstItemList[itemInx].ordDtlSeqno; // 주문상세일련번호
          cnclItem.ordItemSeqno = this.ordMstItemList[itemInx].ordItemSeqno; // 주문상품일련번호
          cnclItem.skuId = this.ordMstItemList[itemInx].skuId; // 단품ID
          cnclItem.itemId = this.ordMstItemList[itemInx].itemId; // 상품ID
          cnclItem.ordCnclAceptQty = this.ordMstItemList[itemInx].claimQty; // 주문취소접수수량
          cnclItem.ordClaimResnCd = '01'; // 주문클레임사유코드 (01:단순변심)
          cnclItem.ordClaimReqCnts = ''; // 주문클레임요청내용
          claimOrdCnclProdList.push(cnclItem);
        }
      }
      for (let itemInx = 0; itemInx < this.ordSubItemList.length; itemInx++) {
        if (this.ordSubItemList[itemInx].chkFlag) {
          // 증정사은품은 클레임접수 시 상품 정보에 포함 하지 않음.
          if (this.ordSubItemList[itemInx].presFrgfYn == 'Y') {
            continue;
          }
          cnclItem = {};
          cnclItem.ordDtlSeqno = this.ordSubItemList[itemInx].ordDtlSeqno; // 주문상세일련번호
          cnclItem.ordItemSeqno = this.ordSubItemList[itemInx].ordItemSeqno; // 주문상품일련번호
          cnclItem.skuId = this.ordSubItemList[itemInx].skuId; // 단품ID
          cnclItem.itemId = this.ordSubItemList[itemInx].itemId; // 상품ID
          cnclItem.ordCnclAceptQty = this.ordSubItemList[itemInx].claimQty; // 주문취소접수수량
          cnclItem.ordClaimResnCd = '01'; // 주문클레임사유코드 (01:단순변심)
          cnclItem.ordClaimReqCnts = ''; // 주문클레임요청내용
          claimOrdCnclProdList.push(cnclItem);
        }
      }

      const params = {
        ordId: this.ordInfoRslt.ordId,
        claimSp: 'C',
        cmmMbrNo: this.ordInfoRslt.cmmMbrNo,
        userId: this.ordInfoRslt.cmmMbrNo,
        claimProdList: claimOrdCnclProdList,
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

      ApiUtils.post('/fo/cs/fronOrdCancelAmtCalc', params).then(res => {
        if (res.data === null || !res.data.success || res.data.statusCode != '0000') {
          this.$gsdialog.alert("취소 시 환불 금액 계산 중 오류가 발생하였습니다.<br/>같은 증상이 지속될 경우 고객센터("+this.custCentTel.commCdNm+")로 문의하시기 바랍니다.", {html: true});
          return;
        }
        const resData = res.data.data;
        // 환불 배송비 금액 구하기
        let refndDlivAmt = 0; // 환불배송금액
        const orgExpnsBsktDleFeeList = resData.orgExpnsList.expnsBsktDleFeeList;
        if (orgExpnsBsktDleFeeList != null) {
          let bsktAddAmt = 0; // 배송비금액
          let bsktReCalcAddAmt = 0; // 변경된 배송비금액
          for (let idx = 0; idx < orgExpnsBsktDleFeeList.length; idx++) {
            if (this.ordDlvpRslt.orgDelivId == orgExpnsBsktDleFeeList[idx].delivId) {
              bsktAddAmt = orgExpnsBsktDleFeeList[idx].addAmt;
              bsktReCalcAddAmt = orgExpnsBsktDleFeeList[idx].reCalcAddAmt;
              refndDlivAmt += (bsktAddAmt - bsktReCalcAddAmt) > 0 ? bsktAddAmt : 0;
            }
          }
        }
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
        let rtnFrgfMsg = "해당상품은 증정품이 포함되어 있습니다.</br>아래 사은품이 함께 취소됩니다.</br>";

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
          addTdrDlivAmt: refndDlivAmt + Number(resData.addTdrDlivAmt), // 환불배송금액 + 추가결제배송비금액
          ordRefndTotAmt: resData.ordRefndTotAmt, // 주문환불금액
          altRefndAmt: resData.altRefndAmt, // 대체환불금액
          addTdrTotAmt: resData.addTdrTotAmt, // 추가결제금액
        };
        this.refndMeansList = resData.refndMeansList;

        if (this.addTdrInfo.altRefndAmt > 0) {
          this.$gsdialog.alert("취소시 환불이 불가능한 결제수단이 존재합니다.<br/>고객센터로 문의하시기 바랍니다.", {html: true});
          return;
        }
      });
    },
    validatOrdCnclAcept() {
      const claimProdList = this.getCheckedItemInfo().claimProdList;
      if (this.addTdrInfo.altRefndAmt > 0) {
        this.$gsdialog.alert("취소시 환불이 불가능한 결제수단이 존재합니다.<br/>고객센터로 문의하시기 바랍니다.", {html: true});
        return false;
      }
      let chkCnt = 0;
      for (let itemInx = 0; itemInx < claimProdList.length; itemInx++) {
        chkCnt++;
      }
      if (chkCnt == 0) {
        this.$gsdialog.alert("취소하실 상품을 선택해주세요.");
        return false;
      }
      return true;
    },
    async processFrontOrdCnclAcept() { // 취소신청 접수
      if (!this.validatOrdCnclAcept()) {
        return;
      }
      const confirmFlag = await this.$gsdialog.confirm('취소 신청 하시겠습니까?');
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
      const res = await ApiUtils.post('/fo/cs/frontOrdCnclAcept', params);
      if (res.data === null || !res.data.success || res.data.statusCode != '0000') {
        if (res.data.statusCode == '6901') {
          this.$gsdialog.alert("해당 주문의 취소/반품 신청은 1:1문의 나 고객센터("+this.custCentTel.commCdNm+")로 접수해 주시기 바랍니다.", {html: true});
        } else {
          this.$gsdialog.alert("취소접수가 불가능한 주문입니다.<br/>고객센터("+this.custCentTel.commCdNm+")로 문의하시기 바랍니다.", {html: true});
        }
        return;
      }
      const ordId = res.data.data.ordId;
      const claimSeqno = res.data.data.claimSeqno;
      Tracker.canceledOrder(ordId, params.claimProdList);
      this.$router.push('/cs/claimmgnt/ord_cncl_proc_sate_info/'+ordId+'/'+claimSeqno);
    },
    goBack() {
      history.back();
    },
    // 공통코드 조회
    searchCommCd(commGrpCd) {
      ApiUtils.get('/fo/cm/commcdmgnt/common-codes', {commGrpCd: commGrpCd})
      .then(res => {
        if (commGrpCd == 'OD0056') { // 오픈 이전일자 주문에 대한 방어 로직 관련 공통코드 조회
          this.bfOrdDtInfo = res.data.data.filter(cdDtl => {
            return cdDtl.commCd == '01';
          })[0];
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
    // 가맹점(GS 리테일) 속성 공통코드 조회
    await this.searchCommCd("CS0027");
    // 취소신청 시 주문 정보 조회
    await this.retrieveOrdItemInfo();
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
