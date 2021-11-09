<!--
Design: views/ss/SC-FO-SS-GF-MS-810.vue
Pg id: PG-FO-CS-O023.
Uri: /cs/claimmgnt/ord_cncl_dtl/:ordId/:claimSeqno
-->
<template>
  <div class="wrap-mypage" v-bind:class="[siteClass]"><!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
    <SubDefaultHeader headerText="취소상세" :tabbar="true"/>
    <main id="main" tabindex="0">
      <section class="wrap-mypage">
        <section class="wrap-breakdown">
          <dl class="detail-breakdown order-top" v-if="refndInfoRsltDto != null">
            <dt>취소 접수</dt>
            <dd>{{toFormat(refndInfoRsltDto.claimOccrDttm, 'YYYY-MM-DD(dd) HH:mm:ss')}} </dd>
            <dt>주문 번호</dt>
            <dd>{{refndInfoRsltDto.ordId}} </dd>
          </dl>
        </section>
        <section class="cart-category-product mypage" v-for="(delivDtl, inx) in delivTypeRsltList" :key="'DELIV'+inx">
          <div id="todayDelivery" class="wrap-category-content">
            <h3 class="title-cate">
              <span class="inp-chk bg">
                <input type="checkbox" name="chkDelivType" :id="'chkDelivType'+inx" v-model="delivDtl.chkFlag" @click="checkedDelivTypeItem(delivDtl)">
                <label :for="'chkDelivType'+inx">{{delivDtl.delivTypeNm}}{{'('+delivDtl.itemCnt+')'}}</label>
              </span>
            </h3>
            <div class="list-content">
              <OrderCancelItemList :checkbox="true" :ordItemRsltList="filterItemList(delivDtl.delivTypeCd)" :addItemRsltList="addItemRsltList" :claimSpCd="'CANCEL'" :chkDelivTypeId="'chkDelivType'+inx" />
            </div>
          </div>
        </section>
        <div class="cart-all">
          <button type="button" class="btn-lg btn-bg darkgray" @click="processItemsRpur"><span>선택 상품 담기</span></button>
        </div>
        <!-- START : 최종 결제금액 -->
        <section class="mypage">
          <div class="total-payment order-payment has-popup">
            <div class="sub-title">
              <h3>결제정보</h3>
            </div>
            <ul class="accordion-payment">
              <li>
                <div class="tit-accordion">
                  취소 상품 금액 <span class="price"><strong>{{toComma(refndInfoRsltDto.cnclItemAmt)}}</strong>원</span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                쿠폰/할인혜택 <span class="price"><strong>{{toComma(refndInfoRsltDto.dcAmtDdct)}}</strong>원</span>
                </div>
              </li>
              <li>
                <div class="tit-accordion">
                  배송비<span class="small"></span>
                  <button type="button" aria-label="배송비 안내 팝업 활성화" aria-haspopup="dialog" class="btn-infomation" @click="popupDeliveryInfoAction"><span class="hidden">배송비 안내</span></button>
                  <span class="price"><strong>{{toComma(Number(refndInfoRsltDto.dlfeeAmt) + Number(refndInfoRsltDto.addDlfeeAmt))}}</strong>원</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="sub-title send-total-price">
            <div class="expected-amount">
              <strong class="return-sum">환불예정금액 <span class="price"><strong>{{toComma(refndInfoRsltDto.refndSchedAmt)}}</strong>원</span></strong>
              <strong class="return-sum" v-if="refndInfoRsltDto.addTdrAmt > 0">
                추가결제금액 <span class="price"><strong>{{toComma(refndInfoRsltDto.addTdrAmt)}}</strong>원</span>
              </strong>
            </div>
            <div class="sub-details" v-if="refndMeansRsltList != null && refndMeansRsltList.length > 0">
              <div class="txt-point"> <!-- 계좌이체 / 신용카드 -->
                환불수단
                <button type="button" aria-label="환불 처리안내 팝업 활성화" aria-haspopup="dialog" class="btn-infomation" @click="popupReturnInfoAction"><span class="hidden">환불 처리안내</span></button>
              </div>
              <span v-for="(refndMeansDtl, inx) in refndMeansRsltList" :key="inx">
                <div class="txt-point" v-if="refndMeansDtl.refndMeansCd == '01' || refndMeansDtl.refndMeansCd == '02'"> <!-- 계좌이체 / 신용카드 -->
                  {{refndMeansDtl.refndMeansNm}} <span class="right">{{toComma(refndMeansDtl.refndMeansAmt)}}원</span>
                </div>
                <div class="txt-point" v-else-if="refndMeansDtl.refndMeansCd == '06' && refndMeansDtl.refndMeansDtlCd == '06'"> <!-- 적립금 / GS&POINT -->
                  GS&amp;POINT 환불 <span class="right">{{toComma(refndMeansDtl.refndMeansAmt)}}P</span>
                </div>
                <div class="txt-point" v-else-if="refndMeansDtl.refndMeansCd == '06' && refndMeansDtl.refndMeansDtlCd == '23'"> <!-- 적립금 / 리워즈 -->
                  THE POP 리워즈 환불 <span class="right">{{toComma(refndMeansDtl.refndMeansAmt)}}점</span>
                </div>
                <p class="point-tip" v-else-if="refndMeansDtl.refndMeansCd == '18'"> <!-- 통신사 할인 -->
                  통신사 할인{{toComma(refndMeansDtl.refndMeansAmt)}}원은 통신사 포인트(<span class="point">{{toComma(refndMeansDtl.refndMeansAmt)}}P</span>)로 환불 됩니다.
                </p>
                <div class="txt-point" v-else> <!-- 기타 환불수단 -->
                  {{refndMeansDtl.refndMeansNm}} <span class="right">{{toComma(refndMeansDtl.refndMeansAmt)}}원</span>
                </div>
              </span>
            </div>
            <div class="sub-details" v-if="savgRetRsltList != null && savgRetRsltList.length > 0">
              <p class="txt-point" v-for="(savgRet, inx) in savgRetRsltList" :key="'SEVG_RET'+inx">
                {{savgRet.ordExpnsTypeDtlNm}}
                <span class="right">{{toComma(savgRet.savgRetAmt)}}{{savgRet.unitNm}}</span>
              </p>
            </div>
          </div>
        </section>
        <!-- END : 최종 결제금액 -->
        <!-- 결제수단 추가 -->
        <section class="section wrap-breakdown" v-if="tdrMeansRsltList != null && tdrMeansRsltList.length > 0">
          <div class="wrap-heading">
            <h3>결제수단</h3>
          </div>
          <ul class="method-list">
            <span v-for="(tdrMeansDtl, inx) in tdrMeansRsltList" :key="inx">
              <li v-if="tdrMeansDtl.addTdrMeansCd == '01' || tdrMeansDtl.addTdrMeansCd == '02'">
                {{tdrMeansDtl.addTdrMeansNm}}<span class="sum">{{toComma(tdrMeansDtl.addTdrAmt)}}원</span>
                <button type="button" class="btn-border btn-small bill" aria-label="전자영수증 팝업활성화" aria-haspopup="dialog" @click="popupMobileBillAction" v-if="refndInfoRsltDto.ordClaimStatCd == '44' || refndInfoRsltDto.ordClaimStatCd == '45'">전자영수증</button>
              </li>
              <li v-else-if="tdrMeansDtl.addTdrMeansCd == '06' && tdrMeansDtl.addTdrMeansDtlCd == '06'">
                GS&amp;POINT<span class="sum">{{toComma(tdrMeansDtl.addTdrAmt)}}P</span>
              </li>
              <li v-else-if="tdrMeansDtl.addTdrMeansCd == '06' && tdrMeansDtl.addTdrMeansDtlCd == '23'">
                THE POP 리워즈<span class="sum">{{toComma(tdrMeansDtl.addTdrAmt)}}점</span>
              </li>
              <li v-else-if="tdrMeansDtl.addTdrMeansCd == '18'">
                {{tdrMeansDtl.addTdrMeansNm}} <strong class="mobile">{{tdrMeansDtl.addTdrMeansDtlNm}}</strong><span class="sum">{{toComma(tdrMeansDtl.addTdrAmt)}}원</span>
              </li>
              <li v-else>
                {{tdrMeansDtl.addTdrMeansNm}}|{{tdrMeansDtl.pytcNm}}<span class="sum">{{toComma(tdrMeansDtl.addTdrAmt)}}원</span>
              </li>
            </span>
          </ul>
        </section>
        <!-- 결제수단 추가 -->
        <!-- START : 하단 버튼 -->
        <section class="section">
          <div class="bottom-btn-area">
            <button type="button" class="btn-md btn-bg darkgray" @click="goPageClaimList">취소/반품/교환 목록</button>
            <button type="button" class="btn-md btn-bg lightgreen" @click="goHome">쇼핑하러가기</button>
          </div>
        </section>
        <!-- END : 하단 버튼 -->
        <Footer />
        <PopupDeliveryPersonal @popupEvent="popupAction" v-if="this.popup.popupDeliveryPersonal" :ordDlfeePolcList="ordDlfeePolcList" :claimSp="'CANCEL'" /> <!-- 팝업 - 배송비 안내 -->
        <PopupReturnInfo @popupEvent="popupAction" v-if="popup.popupReturnInfo" /> <!-- 팝업 - 환불 처리안내 -->
        <PopupMobileBill @popupEvent="popupAction" v-if="this.popup.popupMobileBill" /> <!-- 팝업 - 전자 영수증 -->
      </section>
    </main>
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 헤더
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import OrderCancelItemList from '@/components/mypage/cs/OrderCancelItemList'; //  주문취소 상품 목록 컴포넌트
import MyOrderNoSimplyCook from '@/components/mypage/MyOrderNoSimplyCook'; //  개발용 실사용 컴포넌트 - 상품 목록 심플리쿡 없는 경우
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import PopupMobileBill from '@/views/cs/recptmgnt/PopupMobileBill'; //  팝업 - 전자영수증
import PopupDeliveryPersonal from '@/views/cs/claimmgnt/PopupDeliveryPersonal'; // 팝업 - 배송비(개인부담) 안내
import PopupReturnInfo from '@/views/cs/claimmgnt/PopupReturnInfo'; // 팝업 - 환불 처리안내
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';
import Basket from '@/common/od/Basket';
import dayjs from 'dayjs';
export default {
  name: "CancelDetailList",
  data() {
    return {
      devFlag: false,
      popup: { // 팝업
        open: false,
        popupDiscountInfo: false,
        popupMobileBill: false,
        popupDeliveryPersonal: false, // 배송비
        popupReturnInfo: false,
      },
      ordInfoList: {}, // 주문취소정보
      delivTypeRsltList: [], // 배송유형 목록
      ordItemRsltList: [], // 주문취소상품 목록
      addItemRsltList: [], // 추가구성 상품 목록
      refndInfoRsltDto: {}, // 환불정보
      refndMeansRsltList: [], // 환불수단 목록
      tdrMeansRsltList: [], // 결제수단 목록
      savgRetRsltList: [], // 적립회수정보 목록
      ordDlfeePolcList: [], // 주문배송비정책정보목록
      ordId: this.$route.params.ordId, // 주문ID
      claimSeqno: this.$route.params.claimSeqno, // 클레임일련번호
      siteClass: '',
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '취소상세내역 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '취소상세내역',
      },
    ],
  },
  mixins: [LayerPopupMixin],
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
    OrderCancelItemList, //  주문취소 상품 목록 컴포넌트
    PopupMobileBill, // 팝업 - 전자영수증
    PopupDeliveryPersonal, // 팝업 - 배송비 안내(고객부담)
    PopupReturnInfo, // 팝업 - 환불 처리안내
  },
  methods: {
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    popupReturnInfoAction() {
     this.popupAction('popupReturnInfo');
    },
    popupDeliveryInfoAction() {
      this.popupAction('popupDeliveryPersonal');
    },
    popupMobileBillAction() {
      this.popupAction('popupMobileBill');
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
    filterItemList(selDelivType) {
      return this.ordItemRsltList.filter(itemDtl => {
        return itemDtl.totDelivTypeCd == selDelivType;
      });
    },
    filterAddItemList(selItemDtl) {
      return this.addItemRsltList.filter(itemDtl => {
        if (this.isNotEmpty(selItemDtl.grpItemId)) {
          return itemDtl.grgItemId == selItemDtl.grgItemId;
        } else {
          // 상위 상품의 원주문상세일련번호/원주문상품일련번호 == 하위 상품의 원주문일련번호/연관주문일련번호가 같은 상품을 노출
          return itemDtl.orgOrdDtlSeqno == selItemDtl.orgOrdDtlSeqno && itemDtl.orgRelatOrdSeqno == selItemDtl.orgOrdItemSeqno;
        }
      });
    },
    checkedDelivTypeItem(delivDtl) { // 배송유형별 ChechBox 체크 호출 함수
      const chkFlag = event.target.checked;
      const itemList = this.filterItemList(delivDtl.delivTypeCd);
      // 상품을 배송유형별 체크 True
      for (let inx = 0; inx < itemList.length; inx++) {
        if (itemList[inx].presFrgfYn == 'Y' || itemList[inx].sampItemYn == 'Y') {
          continue;
        }
        itemList[inx].chkFlag = chkFlag;
      }
    },
    async processItemsRpur() { // 상품 재구매(선택 상품 담기)
      const bakItems = [];
      let iBsktPut = {};
      let ibakItemList = [];
      let subItemList = [];
      const chkMstItemCnt = this.ordItemRsltList.filter(itemDtl => {
        return itemDtl.chkFlag === true;
      }).length;
      const chkSubItemCnt = this.addItemRsltList.filter(itemDtl => {
        return itemDtl.chkFlag === true;
      }).length;

      if (chkMstItemCnt == 0 && chkSubItemCnt == 0) {
        this.$gsdialog.alert("선택된 상품이 없습니다..").then(dialog => {});
        return;
      }
      // 01. 체크된 상품 담기
      for (let inx = 0; inx < this.ordItemRsltList.length; inx++) {
        // 체크된 상품 중 맛보기상품, 증정사은품은 제외
        if (this.ordItemRsltList[inx].chkFlag && this.ordItemRsltList[inx].sampItemYn != 'Y' && this.ordItemRsltList[inx].presFrgfYn != 'Y') {
          // 하위구성상품 정보를 Object에 담기
          subItemList = this.filterAddItemList(this.ordItemRsltList[inx]);

          // 02. 전송파라미터 생성
          ibakItemList = [];
          iBsktPut = {
            bsktTypeCd: '1', /* 장바구니유형코드 */
            mallId: this.ordItemRsltList[inx].mallId, /* 몰ID */
          };
          ibakItemList.push(this.setOrdItemOptPutItemProperty(this.ordItemRsltList[inx], 'MAIN', subItemList));

          for (let subIdx = 0; subIdx < subItemList.length; subIdx++) {
            // 증정사은품 제외한 나머지 하위구성상품 담기
            if (subItemList[inx].presFrgfYn != 'Y') {
              ibakItemList.push(this.setOrdItemOptPutItemProperty(this.ordItemRsltList[inx], 'SUB'));
            }
          }

          iBsktPut.bsktPutDtoList = ibakItemList;
          bakItems.push(iBsktPut);
        }
      }
      // 03. 전송처리
      try {
        ApiUtils.post('/fo/od/bsktmgnt/mall-basket-item', {bsktMultiPutDtoList: bakItems}).then(res => {
          if (res.data.success) {
            this.$gsdialog.alert("선택된 상품을 장바구니에 담았습니다.").then(dialog => {});
          } else {
            this.$gsdialog.alert("장바구니 담기에 실패하였습니다.(" + res.data.statusMessage + ")").then(dialog => {});
          }
        });
      } catch (error) {
        this.$gsdialog.alert("에러발생(" + error + ")").then(dialog => {});
      }
    },
    setOrdItemOptPutItemProperty(paramItemInfo, paramMode, subItemList) {
      // TODO BJW 연관상품이 아닐수 있어..
      let vItemGrpSeqno = "";
      let vItemCompoCd = "01";
      if (paramMode == 'MAIN') {
        if (subItemList != null || subItemList.length == 0) {
          vItemGrpSeqno = paramItemInfo.relatOrdSeqno;
        } else {
          vItemGrpSeqno = subItemList[0].relatOrdSeqno;
          vItemCompoCd = "02";
        }
      } else {
        vItemGrpSeqno = paramItemInfo.relatOrdSeqno;
        vItemCompoCd = "02";
      }
      const returnObj = {
        itemGrpSeqno: vItemGrpSeqno, /* 상품그룹일련번호(같은 그룹상품 패키지, 추가구성상품 일 경우 같은 값으로 세팅) */
        ssevntId: paramItemInfo.ssevntId, /* 기획전 ID */
        dspCtgId: paramItemInfo.dspCtgId, /* 전시카테고리ID */
        itemId: paramItemInfo.itemId, /* 상품ID */
        skuId: paramItemInfo.skuId, /* 단품ID */
        grpItemId: paramItemInfo.grpItemId, /* 그룹상품ID */
        bsktQty: (paramItemInfo.claimQty == 0)?1:paramItemInfo.claimQty, /* 장바구니수량(클레임수량) */
        relatBsktId: null, /* 연관장바구니ID */
        delivDt: null, /* 배송일자 */
        storId: paramItemInfo.storId, /*  */
        supplFirmCd: paramItemInfo.supplFirmCd, /*  */
        zipcd: null, /* 우편번호 */
        ssevntTimes: paramItemInfo.ssevntTimes, /* 기획전회차 */
        itemCompoCd: vItemCompoCd, /* 01 : 패키지를 제외한 상품, 02 : 패키지 상품 (연관상품은 메인포함 모두 '02' 로 전송) */
        ordTypeCd: (paramItemInfo.ordTypeCd == '20')?'10':paramItemInfo.ordTypeCd, /* 주문유형코드 */
        delivTypeCd: paramItemInfo.delivTypeCd, /* 배송유형코드 */
      };
      return returnObj;
    },
    async retrieveClaimOrdDtlInfo() { // 클레임주문상세정보 조회
      const params = {
        ordId: this.ordId, // 주문ID
        claimSeqno: this.claimSeqno, // 클레임일련번호
      };
      const res = await ApiUtils.get('/fo/cs/claimmgnt/claim-order-detail-info', params);
      if (res.data === null || !res.data.success) {
        this.$gsdialog.alert(res.data.statusMessage);
        return;
      }
      this.ordInfoList = res.data.data.ordInfoList; // 주문취소정보
      this.delivTypeRsltList = res.data.data.delivTypeRsltList; // 배송유형 목록
      this.ordItemRsltList = res.data.data.ordItemRsltList; // 주문취소상품 목록
      this.addItemRsltList = res.data.data.addItemRsltList; // 추가구성 상품 목록
      this.refndInfoRsltDto = res.data.data.refndInfoRsltDto; // 환불정보
      this.refndMeansRsltList = res.data.data.refndMeansRsltList; // 환불수단 목록 정보
      this.tdrMeansRsltList = res.data.data.addTdrRsltList; // 결제수단 목록 정보
      this.savgRetRsltList = res.data.data.savgRetRsltList; // 적립회수 목록 정보
      this.ordDlfeePolcList = res.data.data.ordDlfeePolcList; // 배송비 정책 정보
    },
    goPageClaimList() {
      this.$router.push('/cs/claimmgnt/claim_statement_list');
    },
    goHome() {
      // 공통 화면이면 home으로 이동 시 location.href;
      if (SiteUtils.isCommonSite()) {
        if (CookieUtils.getMallId() === '11') {
          // 달리살다
          location.href = SiteUtils.dalimo('/');
        } else {
          // gsfresh
          location.href = SiteUtils.freshmo('/');
        }
      } else {
        this.$router.push(
          { path: '/' },
        );
      }
    },
  },
  mounted() {
    this.siteClass = CookieUtils.getSiteClass();
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
    // 클레임주문상세정보 조회 함수 호출
    this.retrieveClaimOrdDtlInfo();
  },
};
</script>
<style lang="scss">
</style>
