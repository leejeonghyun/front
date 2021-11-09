<!--
Design: views/ss/SC-FO-SS-GF-MS-819.vue
Pg id: PG-FO-CS-O020.
Uri: /cs/claimmgnt/ord_exch_acept/:ordId/:delivId
-->
<template>
  <div class="wrap-mypage" v-bind:class="[siteClass]"><!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
    <SubDefaultHeader headerText="교환 신청" :tabbar="true" />
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
              <MyExchangeList :ordInfoRslt="ordInfoRslt" :ordMstItemList="ordMstItemList" :ordSubItemList="ordSubItemList" :ordClaimResnList="ordClaimResnList" :chkDelivTypeId="'chkAll'+inx" @refndEvent="retrieveExchAddDlfee" />
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
          <div class="total-payment order-payment">
            <div class="sub-title">
              <h3>결제정보</h3>
            </div>
            <ul class="accordion-payment exchange">
              <li>
                <p class="tit-accordion">
                  배송비<span class="small"></span>
                  <button type="button" aria-label="배송비 안내 팝업 활성화" aria-haspopup="dialog" class="btn-infomation" @click="popupDeliveryInfoAction"><span class="hidden">배송비 안내</span></button>
                  <span class="price"><strong>{{toComma(addTdrInfo.dlfeeAmt)}}</strong>원</span>
                </p>
              </li>
            </ul>
          </div>
          <div class="sub-title send-total-price">
            <div class="expected-amount exchange">
              <h2>추가결제금액 <span class="price"><strong>{{toComma(addTdrInfo.addTdrTotAmt)}}</strong>원</span></h2>
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
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area">
          <button type="button" class="btn-lg btn-bg lightgreen" @click="processOrdExchAcept">교환신청</button>
        </div>
        <!-- START : 하단 버튼 -->
      </div>
    </main>
    <Footer />
    <!-- START : 팝업 -->
    <PopupSelectDate :ordDlvpRslt="ordDlvpRslt" @popupEvent="popupSelectDateAction" v-if="this.popup.popupSelectDate" /> <!-- 팝업 - 방문날짜선택 -->
    <PopupDeliveryPersonal @popupEvent="popupAction" v-if="this.popup.popupDeliveryPersonal" :ordDlfeePolcList="ordDlfeePolcList" :claimSp="'EXCHANGE'" /> <!-- 팝업 - 배송비 안내 -->
    <!-- END : 팝업 -->
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer'; // 푸터
import MyExchangeList from '@/components/mypage/MyExchangeList'; // 개발용 실사용 컴포넌트 - 상품 목록
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import PopupDeliveryPersonal from '@/views/cs/claimmgnt/PopupDeliveryPersonal'; // 팝업 - 배송비(개인부담) 안내
import PopupSelectDate from '@/views/cs/claimmgnt/popupSelectDate'; // 팝업 - 방문날짜선택
import ClaimAddPayment from '@/views/cs/claimmgnt/ClaimAddPayment'; // 클레임 추가 결제 모듈
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';
import dayjs from 'dayjs';
export default {
  name: "RequestChange",
  data() {
    return {
      placeholder: '교환 사유를 자세히 적어주세요.\n직접적인 사유와 이미지를 첨부해주시면 교환 절차를 빠르게 진행할 수 있습니다.',
      returnValue: 0, // 교환사유 선택
      isListTab: 0, // 결제수단 신용카드 선택
      showBill: true, // 현금영수증 발급
      defaultBillType: 'personal', // 현금영수증 타입 션택
      swiperOptionScrollX: {
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
        popupDeliveryPersonal: false, // 배송비(개인부담)
      },
      ordClaimResnList: [], // 클레임사유코드 정보
      custCentTel: {}, // 고객센터 전화번호 정보
      ordInfoRslt: {}, // 주문정보결과
      delivTypeList: [], // 주문배송유형목록
      ordMstItemList: [], // 주문마스터상품목록
      ordSubItemList: [], // 주문서버상품목록
      ordDlvpRslt: {}, // 주문배송지결과
      ordDlfeePolcList: [], // 주문배송비정책정보목록
      addTdrInfo: {
        dlfeeAmt: 0, // 배송비
        addTdrTotAmt: 0, // 추가결제금액
      }, // 추가결제정보
      ordId: this.$route.params.ordId, // 주문ID
      delivId: this.$route.params.delivId, // 배송ID
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '교환 신청 < 마이페이지 <%s',
    meta: [
      {
        property: 'aa:page',
        content: '교환 신청',
      },
    ],
  },
  mixins: [],
  components: {
    SubDefaultHeader, // 헤더
    Footer,
    MyExchangeList, // 상품 목록
    PopupSelectDate, // 팝업 - 방문날짜선택
    PopupDeliveryPersonal, // 팝업 - 배송비 안내(고객부담)
    ClaimAddPayment, // 클레임 추가 결제 모듈
  },
  methods: {
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
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
      let exchPosbYn = true; // 교환 가능 여부
      let exchItemNm = ''; // 교환상품명
      let exchItemCnt = 0; // 교환상품건수
      for (let mstInx = 0; mstInx < this.ordMstItemList.length; mstInx++) {
        if (this.ordMstItemList[mstInx].totDelivTypeCd == delivTypeCd) {
          // 패키지 상품인 경우 하위상품만 선택 가능
          if (this.ordMstItemList[mstInx].pkgYn == 'Y') {
            continue;
          }
          // 선택 불가 상품인지 체크
          if (this.validateChkItem(this.ordMstItemList[mstInx])) {
            continue;
          }
          // 상품 재고가 없으면 선택 할 수 없음.
          if (chkFlag === true && (this.ordMstItemList[mstInx].sellPosbQty == null || this.ordMstItemList[mstInx].sellPosbQty == 0)) {
            exchPosbYn = false;
            if (exchItemCnt++ < 1) { // 교환상품건수가 1보다 작으면 교환상품명 셋팅 후 건수를 1 더한다.
              exchItemNm = this.ordMstItemList[mstInx].itemNm;
            }
            continue;
          }
          // 주문상품수량과 판매가능수량 체크
          if (chkFlag === true && (this.ordMstItemList[mstInx].ordQty > this.ordMstItemList[mstInx].sellPosbQty)) {
            exchPosbYn = false;
            if (exchItemCnt++ < 1) { // 교환상품건수가 1보다 작으면 교환상품명 셋팅 후 건수를 1 더한다.
              exchItemNm = this.ordMstItemList[mstInx].itemNm;
            }
            continue;
          }
          if (chkFlag) chkCnt++;
          this.ordMstItemList[mstInx].chkFlag = chkFlag;
          this.ordMstItemList[mstInx].claimQty = this.ordMstItemList[mstInx].ordQty < this.ordMstItemList[mstInx].sellPosbQty ? this.ordMstItemList[mstInx].ordQty : this.ordMstItemList[mstInx].sellPosbQty;
          this.ordMstItemList[mstInx].ordClaimResnCd = '';
          this.ordMstItemList[mstInx].attFileId = '';
          this.ordMstItemList[mstInx].imageList = [];
        }
      }
      for (let subInx = 0; subInx < this.ordSubItemList.length; subInx++) {
        if (this.ordSubItemList[subInx].totDelivTypeCd == delivTypeCd) {
          // 증정사은품의 경우 선택이 불가.
          if (this.ordSubItemList[subInx].presFrgfYn == 'Y') {
            continue;
          }
          // 선택 불가 상품인지 체크
          if (this.validateChkItem(this.ordSubItemList[subInx])) {
            continue;
          }
          // 주문상품수량과 판매가능수량 체크
          if (this.ordSubItemList[subInx].ordQty > this.ordSubItemList[subInx].sellPosbQty) {
            exchPosbYn = false;
            if (exchItemCnt++ < 1) { // 교환상품건수가 1보다 작으면 교환상품명 셋팅 후 건수를 1 더한다.
              exchItemNm = this.ordSubItemList[subInx].itemNm;
            }
            continue;
          }
          // 상품 재고가 없으면 선택 할 수 없음.
          if (chkFlag === true && (this.ordSubItemList[subInx].sellPosbQty == null || this.ordSubItemList[subInx].sellPosbQty == 0)) {
            exchPosbYn = false;
            continue;
          }
          if (chkFlag) chkCnt++;
          this.ordSubItemList[subInx].chkFlag = chkFlag;
          this.ordSubItemList[subInx].claimQty = this.ordSubItemList[subInx].ordQty < this.ordSubItemList[subInx].sellPosbQty ? this.ordSubItemList[subInx].ordQty : this.ordSubItemList[subInx].sellPosbQty;
          this.ordSubItemList[subInx].ordClaimResnCd = '';
          this.ordSubItemList[subInx].attFileId = '';
          this.ordSubItemList[subInx].imageList = [];
        }
      }
      // 선택 상품이 없는 경우 Check 상태를 False로 한다.
      if (chkFlag && chkCnt == 0) {
        document.getElementById("chkAll"+inx).checked = false;
      }
      // 재고가 없어 교환이 불가능한 상품이 있는 경우
      if (!exchPosbYn) {
        const msgExchItemNm = exchItemCnt > 1 ? exchItemNm + '외 ' + (exchItemCnt-1) + '건' : exchItemNm;
        this.$gsdialog.alert(msgExchItemNm + " 상품은(는) 재고가 없거나 재고수량만큼 교환이 가능합니다.<br/>교환신청을 원하시면 1:1문의 혹은 고객센터("+this.custCentTel.commCdNm+")로 문의 바랍니다.", {html: true});
      }
      // 교환 추가 배송비 및 추가결제 정보 조회
      this.retrieveExchAddDlfee();
    },
    validateChkItem(itemDtl) {
      let rtnFlag = false;
      if (itemDtl.apchItemYn == 'Y') {
        // 임박상품은 선택 불가능.
        rtnFlag = true;
      } else if (itemDtl.presFrgfYn != 'Y' && itemDtl.itemExchRtnPosbYn == 'N') {
        // 사은품이 아니고 상품교환반품가능여부가 'N' 이면 선택 불가능
        rtnFlag = true;
      } else if (itemDtl.delivTypeCd == '05') {
        // 해외직구배송이면 선택 불가능
        rtnFlag = true;
      } else if (itemDtl.spckItemYn == 'Y') {
        // 심플리쿡상품이면 선택 불가능
        rtnFlag = true;
      } else if (itemDtl.ordTypeCd == '50') {
        // 예약배송 상품이면 선택 불가능
        rtnFlag = true;
      } else if (itemDtl.sampItemYn == 'Y') {
        // 맛보기 상품이면 선택 불가능
        rtnFlag = true;
      }
      return rtnFlag;
    },
    async retrieveOrdItemInfo() { // 교환신청 시 주문 정보 조회
      const params = {
        ordId: this.ordId,
        delivId: this.delivId
      };
      const res = await ApiUtils.get('/fo/cs/claimmgnt/order-item-info', params);
      if (res.data.data === null || !res.data.success) {
        await this.$gsdialog.alert(res.data.statusMessage, {html: true});
        this.goBack();
        return;
      }
      const ordExchRslt = res.data.data;
      this.ordInfoRslt = ordExchRslt.ordInfoRslt;
      this.delivTypeList = ordExchRslt.delivTypeList;
      this.ordMstItemList = ordExchRslt.ordMstItemList;
      this.ordSubItemList = this.isEmpty(ordExchRslt.ordSubItemList) ? [] : ordExchRslt.ordSubItemList;
      this.ordDlvpRslt = ordExchRslt.ordDlvpRslt;
      this.ordDlfeePolcList = ordExchRslt.ordDlfeePolcList;

      // 공급업체가 폐점된 경우 반품 신청 불가
      if (this.ordInfoRslt.clstYn == 'Y') {
        await this.$gsdialog.alert('해당 주문의 매장이 폐점되어 고객센터('+this.custCentTel.commCdNm+')로 문의 하시기 바랍니다.', { html: true });
        this.goBack();
      }

      // 배송유형이 해외배송인 경우 부분 교환 불가
      for (let idx = 0; idx < this.delivTypeList.length; idx++) {
        if (this.delivTypeList[idx].delivTypeCd == '05') {
          await this.$gsdialog.alert('해외직구 상품 교환은 고객센터('+this.custCentTel.commCdNm+')로 접수해 주시기 바랍니다.', { html: true });
          this.goBack();
        }
      }

      // 영업종료인 경우 교환 신청 불가
      if (this.ordInfoRslt.saleTsfSbjYn == 'Y') {
        await this.$gsdialog.alert('해당 주문의 매장이 영업 종료되어<br/>고객센터('+this.custCentTel.commCdNm+')로 문의 하시기 바랍니다.', { html: true });
        this.goBack();
        return;
      }
    },
    validatOrdExchAcept() {
      let chkCnt = 0;
      if (this.ordInfoRslt.itemRcptTypeCd != 'D' && this.ordInfoRslt.itemRcptTypeCd != 'O') {
        this.$gsdialog.alert("해당 주문 교환/반품신청은 1:1문의 나 고객센터("+this.custCentTel.commCdNm+")로 접수해 주시기 바랍니다.", { html: true });
        return false;
      }

      // 교환 할 상품에 대해 필수 입력 조건 체크
      const claimProdList = this.getCheckedItemInfo();
      for (let itemInx = 0; itemInx < claimProdList.length; itemInx++) {
        chkCnt++;
        if (this.isEmpty(claimProdList[itemInx].ordClaimResnCd)) {
          this.$gsdialog.alert("신청 사유를 선택해 주세요.", { html: true });
          return false;
        }
        if (this.chkClaimResn(claimProdList[itemInx].ordClaimResnCd) == "1" && this.isEmpty(claimProdList[itemInx].exchOrdSkuId)) {
          this.$gsdialog.alert("배송될 상품을 선택해 주세요.", { html: true });
          return false;
        }
        if (this.chkClaimResn(claimProdList[itemInx].ordClaimResnCd) == "2" && (claimProdList[itemInx].imageList == null || claimProdList[itemInx].imageList.length == 0 )) {
          this.$gsdialog.alert("교환 상품에 대한 이미지를 등록 해주세요.", { html: true });
          return false;
        }
      }
      if (chkCnt == 0) {
        this.$gsdialog.alert("선택 된 상품이 없습니다.", { html: true });
        return false;
      }
      if (this.isEmpty(this.ordDlvpRslt.retSchedDt) && this.isEmpty(this.ordDlvpRslt.delivSlotNm)) {
        this.$gsdialog.alert("방문날짜를 선택해 주세요.", { html: true });
        document.getElementById("btnDelivDt").focus();
        return false;
      }
      return true;
    },
    getParameter() { // 교환 신청 접수 Parameter 정보 Setting 함수
      const exchAceptItemList = []; // 교환접수상품List
      const exchAceptDlvpList = []; // 교환접수배송지List
      const exchAceptExpnsList = []; // 교환접수비용List

      let exchItem = {}; // 교환상품정보
      for (let itemInx = 0; itemInx < this.ordMstItemList.length; itemInx++) {
        if (this.ordMstItemList[itemInx].chkFlag) {
          exchItem = {};
          exchItem.ordId = this.ordMstItemList[itemInx].ordId; // 주문ID
          exchItem.ordDtlSeqno = this.ordMstItemList[itemInx].ordDtlSeqno; // 주문상세일련번호
          exchItem.ordItemSeqno = this.ordMstItemList[itemInx].ordItemSeqno; // 주문상품일련번호
          exchItem.itemCd = this.ordMstItemList[itemInx].itemCd; // 상품코드
          exchItem.itemId = this.ordMstItemList[itemInx].itemId; // 상품ID
          exchItem.exchRtnSkuId = this.ordMstItemList[itemInx].skuId; // 교환반품단품ID
          exchItem.exchOrdSkuId = this.ordMstItemList[itemInx].exchOrdSkuId; // 교환주문단품ID
          exchItem.grpItemId = this.ordMstItemList[itemInx].grpItemId; // 그룹상품ID
          exchItem.exchQty = this.ordMstItemList[itemInx].claimQty; // 교환수량
          exchItem.ordClaimResnCd = this.ordMstItemList[itemInx].ordClaimResnCd; // 주문클레임사유코드
          exchItem.ordClaimReqCnts = this.ordMstItemList[itemInx].ordClaimReqCnts; // 주문클레임요청내용
          exchItem.attFileId = this.ordMstItemList[itemInx].attFileId; // 첨부파일ID
          exchItem.exchAceptAttFileList = this.ordMstItemList[itemInx].imageList; // 이미지목록
          exchAceptItemList.push(exchItem);
        }
      }
      for (let itemInx = 0; itemInx < this.ordSubItemList.length; itemInx++) {
        if (this.ordSubItemList[itemInx].chkFlag) {
          exchItem = {};
          exchItem.ordId = this.ordSubItemList[itemInx].ordId; // 주문ID
          exchItem.ordDtlSeqno = this.ordSubItemList[itemInx].ordDtlSeqno; // 주문상세일련번호
          exchItem.ordItemSeqno = this.ordSubItemList[itemInx].ordItemSeqno; // 주문상품일련번호
          exchItem.itemCd = this.ordSubItemList[itemInx].itemCd; // 상품코드
          exchItem.itemId = this.ordSubItemList[itemInx].itemId; // 상품ID
          exchItem.exchRtnSkuId = this.ordSubItemList[itemInx].skuId; // 교환반품단품ID
          exchItem.exchOrdSkuId = this.ordSubItemList[itemInx].exchOrdSkuId; // 교환주문단품ID
          exchItem.grpItemId = this.ordSubItemList[itemInx].grpItemId; // 그룹상품ID
          exchItem.exchQty = this.ordSubItemList[itemInx].claimQty; // 교환수량
          exchItem.ordClaimResnCd = this.ordSubItemList[itemInx].ordClaimResnCd; // 주문클레임사유코드
          exchItem.ordClaimReqCnts = this.ordSubItemList[itemInx].ordClaimReqCnts; // 주문클레임요청내용
          exchItem.attFileId = this.ordSubItemList[itemInx].attFileId; // 첨부파일ID
          exchItem.exchAceptAttFileList = this.ordSubItemList[itemInx].imageList; // 이미지목록
          exchAceptItemList.push(exchItem);
        }
      }

      const exchdlvp = {}; // 교환배송지
      exchdlvp.ordId = this.ordDlvpRslt.ordId; // 주문ID
      exchdlvp.supplFirmCd = this.ordDlvpRslt.supplFirmCd; // 공급업체코드
      exchdlvp.delivTypeCd = this.ordDlvpRslt.delivTypeCd; // 배송유형코드
      exchdlvp.delivReqDt = this.ordDlvpRslt.retSchedDt; // 배송요청일자
      exchdlvp.delivRegnSpCd = this.ordDlvpRslt.delivRegnSpCd; // 배송지역구분코드
      exchdlvp.delivRegnId = this.ordDlvpRslt.delivRegnId; // 배송지역ID
      exchdlvp.delivSeqsSeqno = this.ordDlvpRslt.delivSeqsSeqno; // 배송차수일련번호
      exchdlvp.delivSeqs = this.ordDlvpRslt.delivSeqs; // 배송차수
      exchdlvp.retpAdrsZipcd = this.ordDlvpRslt.retpAdrsZipcd; // 회수지우편번호
      exchdlvp.retpAdrsBaseAddr = this.ordDlvpRslt.retpAdrsBaseAddr; // 회수지주소
      exchdlvp.retpAdrsDtlAddr = this.ordDlvpRslt.retpAdrsDtlAddr; // 회수지상세주소
      exchdlvp.retpAdrsStnmBaseAddr = this.ordDlvpRslt.retpAdrsStnmBaseAddr; // 회수지도로명주소
      exchdlvp.retpAdrsStnmDtlAddr = this.ordDlvpRslt.retpAdrsStnmDtlAddr; // 회수지도로명상세주소
      exchdlvp.exchDelivAdrsZipcd = this.ordDlvpRslt.exchDelivAdrsZipcd; // 교환배송지우편번호
      exchdlvp.exchDelivAdrsBaseAddr = this.ordDlvpRslt.exchDelivAdrsBaseAddr; // 교환배송지주소
      exchdlvp.exchDelivAdrsDtlAddr = this.ordDlvpRslt.exchDelivAdrsDtlAddr; // 교환배송지상세주소
      exchdlvp.exchDelivAdrsStnmBaseAddr = this.ordDlvpRslt.exchDelivAdrsStnmBaseAddr; // 교환배송지도로명주소
      exchdlvp.exchDelivAdrsStnmDtlAddr = this.ordDlvpRslt.exchDelivAdrsStnmDtlAddr; // 교환배송지도로명상세주소
      exchdlvp.retItemDlvrMethoCd = this.ordDlvpRslt.dlvrMethoCd; // 상품전달방법코드
      exchdlvp.retItemDlvrMethoAddCd = this.ordDlvpRslt.dlvrMethoAddCd; // 상품전달방법추가코드
      exchdlvp.retItemDlvrMethoDtlCnts = this.ordDlvpRslt.dlvrMethoDtlCnts; // 상품전달방법상세내용
      exchdlvp.delivItemDlvrMethoCd = this.ordDlvpRslt.dlvrMethoCd; // 교환배송상품전달방법코드
      exchdlvp.delivItemDlvrMethoAddCd = this.ordDlvpRslt.dlvrMethoAddCd; // 교환배송상품전달방법추가코드
      exchdlvp.delivItemDlvrMethoDtlCnts = this.ordDlvpRslt.dlvrMethoDtlCnts; // 교환배송상품전달방법상세내용
      exchdlvp.orgDelivId = this.ordDlvpRslt.orgDelivId; // 원배송ID
      exchAceptDlvpList.push(exchdlvp);

      const exchExpns = {};
      exchExpns.ordId = this.ordInfoRslt.ordId;
      exchExpns.orgOrdDtlSeqno = exchItem.ordDtlSeqno; // 마지막 주문상세일련번호 Setting
      exchExpns.exemptionYn = 'N'; // 면제여부
      exchExpns.dlfeeId = this.addTdrInfo.dlfeeId; // 배송비ID
      exchAceptExpnsList.push(exchExpns);

      return {
        ordId: this.ordInfoRslt.ordId,
        cmmMbrNo: this.ordInfoRslt.cmmMbrNo,
        exchAceptItemList: exchAceptItemList, // 교환접수상품목록
        exchAceptDlvpList: exchAceptDlvpList, // 교환접수배송목록
        exchAceptExpnsList: exchAceptExpnsList, // 교환접수비용목록
        userId: this.ordInfoRslt.cmmMbrNo,
        tdrUrlSendYn: 'N', // 추가결제여부
      };
    },
    async processOrdExchAcept() { // 교환신청 접수
      if (!this.validatOrdExchAcept()) {
        return;
      }
      let strMsg = "교환 신청 접수를 하시겠습니까?";
      if (this.ordInfoRslt.delivTypeCd == '03') {
        strMsg = "교환 신청 접수를 하시겠습니까?<br/>상품을 이미 발송하신 경우에는 고객센터("+this.custCentTel.commCdNm+")로 접수해 주시기 바랍니다.";
      }
      const confirmFlag = await this.$gsdialog.confirm(strMsg, {html: true});
      if (confirmFlag) {
        if (Number(this.addTdrInfo.addTdrTotAmt) > 0) { // 추가결제금액이 존재하는 경우 처리
          this.$refs.mdClaimAddTdr.sendPayAuth(); // 추가결제 인증 함수 호출
        } else { // 추가 결제금액이 0원인 경우 처리
          this.saveOrdClaimAcept(null, null, null); // 추가결제 없이 교환접수 신청 저장 처리
        }
      }
    },
    async saveOrdClaimAcept(iOrderRequest, cashRcpctInfo) { // 주문 클레임 접수 저장 함수
      const params = this.getParameter();
      params.payAuthInfo = iOrderRequest; // 결제 인증 정보 Set
      const res = await ApiUtils.post('/fo/cs/claimmgnt/order-exchange-accept', params);
      if (res.data === null || !res.data.success || res.data.statusCode != '0000') {
        this.$gsdialog.alert("교환접수가 불가능한 주문입니다.<br/>고객센터("+this.custCentTel.commCdNm+")로 문의하시기 바랍니다.", {html: true});
        return;
      }
      const ordId = res.data.data.ordId;
      const claimSeqno = res.data.data.claimSeqno;
      this.$router.push('/cs/claimmgnt/ord_exch_proc_sate_info/'+ordId+'/'+claimSeqno);
    },
    getCheckedItemInfo() { // 선택 상품 정보 취합 함수
      const exchAceptItemList = []; // 주문교환상품
      let exchItem = {}; // 교환상품정보
      for (let itemInx = 0; itemInx < this.ordMstItemList.length; itemInx++) {
        if (this.ordMstItemList[itemInx].chkFlag) {
          exchItem = {};
          exchItem.ordId = this.ordMstItemList[itemInx].ordId; // 주문ID
          exchItem.delivId = this.ordMstItemList[itemInx].delivId; // 배송ID
          exchItem.ordDtlSeqno = this.ordMstItemList[itemInx].ordDtlSeqno; // 주문상세일련번호
          exchItem.ordItemSeqno = this.ordMstItemList[itemInx].ordItemSeqno; // 주문상품일련번호
          exchItem.exchOrdSkuId = this.ordMstItemList[itemInx].exchOrdSkuId; // 교환주문단품ID
          exchItem.itemId = this.ordMstItemList[itemInx].itemId; // 상품ID
          exchItem.ordClaimResnCd = this.ordMstItemList[itemInx].ordClaimResnCd; // 주문클레임사유코드
          exchItem.exchQty = this.ordMstItemList[itemInx].claimQty; // 주문취소접수수량
          exchItem.imageList = this.ordMstItemList[itemInx].imageList; // 이미지리스트
          exchAceptItemList.push(exchItem);
        }
      }
      for (let itemInx = 0; itemInx < this.ordSubItemList.length; itemInx++) {
        if (this.ordSubItemList[itemInx].chkFlag) {
          exchItem = {};
          exchItem.ordId = this.ordSubItemList[itemInx].ordId; // 주문ID
          exchItem.delivId = this.ordSubItemList[itemInx].delivId; // 배송ID
          exchItem.ordDtlSeqno = this.ordSubItemList[itemInx].ordDtlSeqno; // 주문상세일련번호
          exchItem.ordItemSeqno = this.ordSubItemList[itemInx].ordItemSeqno; // 주문상품일련번호
          exchItem.exchOrdSkuId = this.ordSubItemList[itemInx].exchOrdSkuId; // 교환주문단품ID
          exchItem.itemId = this.ordSubItemList[itemInx].itemId; // 상품ID
          exchItem.ordClaimResnCd = this.ordSubItemList[itemInx].ordClaimResnCd; // 주문클레임사유코드
          exchItem.exchQty = this.ordSubItemList[itemInx].claimQty; // 주문취소접수수량
          exchItem.imageList = this.ordSubItemList[itemInx].imageList; // 이미지리스트
          exchAceptItemList.push(exchItem);
        }
      }
      return exchAceptItemList;
    },
    retrieveExchAddDlfee() { // 교환 추가 배송비 및 추가결제 정보 조회
      const exchDlvpList = []; // 교환접수배송지List
      const exchdlvp = {}; // 교환배송지
      exchdlvp.ordId = this.ordDlvpRslt.ordId; // 주문ID
      exchdlvp.delivId = this.ordDlvpRslt.delivId; // 배송ID
      exchdlvp.orgDelivId = this.ordDlvpRslt.orgDelivId; // 원배송ID
      exchdlvp.retpAdrsZipcd = this.ordDlvpRslt.retpAdrsZipcd; // 회수지우편번호
      exchdlvp.retpBaseAddr = this.ordDlvpRslt.retpAdrsBaseAddr; // 회수지주소
      exchdlvp.retpDtlAddr = this.ordDlvpRslt.retpAdrsDtlAddr; // 회수지상세주소
      exchdlvp.retpStnmBaseAddr = this.ordDlvpRslt.retpAdrsStnmBaseAddr; // 회수지도로명주소
      exchdlvp.retpStnmDtlAddr = this.ordDlvpRslt.retpAdrsStnmDtlAddr; // 회수지도로명상세주소
      exchDlvpList.push(exchdlvp);
      const params = {
        ordId: this.ordInfoRslt.ordId, // 주문ID
        exchItemList: this.getCheckedItemInfo(), // 선택 상품 정보 Get
        exchDlvpList: exchDlvpList,
      };
      if (params.exchItemList.length == 0) {
        this.addTdrInfo = {
          dlfeeId: null,
          dlfeeAmt: 0, // 배송비
          addTdrTotAmt: 0, // 추가결제금액
        }; // 추가결제정보 초기화
        return;
      }
      ApiUtils.post('/fo/cs/claimmgnt/exch-add-dlfee-info', params)
        .then(res => {
          if (res.data === null || !res.data.success) {
            this.$gsdialog.alert("교환 배송비 조회 중 오류가 발생하였습니다.<br/>같은 증상이 지속될 경우 고객센터("+this.custCentTel.commCdNm+")로 문의하시기 바랍니다.", {html: true});
            return;
          }
          const resData = res.data.data;
          if (resData != null) {
            this.addTdrInfo = {
              dlfeeId: resData.dlfeeId, // 배송비ID
              dlfeeAmt: resData.dlfeeAmt, // 배송비
              addTdrTotAmt: resData.addAmt, // 추가결제금액
            };
          } else {
            this.addTdrInfo = {
              dlfeeId: null, // 배송비ID
              dlfeeAmt: 0, // 배송비
              addTdrTotAmt: 0, // 추가결제금액
            };
          }
        }
      );
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
        if (commGrpCd == 'CS0009') {
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
  mounted() {
    // 주문클레임사유 공통코드 조회
    this.searchCommCd("CS0009");
    // 가맹점(GS 리테일) 속성 공통코드 조회
    this.searchCommCd("CS0027");
    // 교환신청 시 주문 정보 조회
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
