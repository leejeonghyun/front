<!--
Design: views/ss/SC-FO-SS-GF-MS-812.vue
Pg id: PG-FO-CS-O025.
Uri: /cs/claimmgnt/ord_exch_dtl/:ordId/:claimSeqno
-->
<template>
  <div class="wrap-mypage" v-bind:class="[siteClass]"><!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
    <SubDefaultHeader headerText="교환상세" :tabbar="true"/>
    <main id="main" tabindex="0">
      <div class="return-wrap">
        <!-- START : 주문 정보 -->
        <section class="wrap-breakdown">
          <dl class="detail-breakdown order-top" v-if="refndInfoRsltDto != null">
            <dt>교환 접수</dt>
            <dd>{{toFormat(refndInfoRsltDto.claimOccrDttm, 'YYYY-MM-DD(dd) HH:mm:ss')}} </dd>
            <dt>주문 번호</dt>
            <dd>{{refndInfoRsltDto.ordId}} </dd>
          </dl>
        </section>
        <!-- END : 주문 정보 -->
        <!-- START : 상품정보 -->
        <section class="section mypage" v-for="delivDtl in delivTypeRsltList" :key="delivDtl.delivId">
          <div class="sub-title">
            <h2>{{delivDtl.delivTypeNm}}{{'('+delivDtl.itemCnt+')'}}</h2>
          </div>
          <ul class="step-state step-three" v-for="(ordInfo, idx) in filterOrdInfoList(delivDtl.delivTypeCd)" :key="'DELIV'+idx">
            <li v-if="ordInfo.ordClaimStatCd != '24'"><span :class="'icon_take_back ' + (ordInfo.ordClaimStatCd == '21' || ordInfo.ordClaimStatCd == '22' || ordInfo.ordClaimStatCd == '23' || ordInfo.ordClaimStatCd == '50' ? 'current' : '')">교환신청</span></li>
            <li v-if="ordInfo.ordClaimStatCd == '24'"><span class="icon_take_back current">교환신청 취소</span></li>
            <li v-if="ordInfo.ordClaimStatCd != '24'"><span :class="'icon_shipping ' + (ordInfo.ordClaimStatCd == '25' || ordInfo.ordClaimStatCd == '26' || ordInfo.ordClaimStatCd == '27' || ordInfo.ordClaimStatCd == '28' || ordInfo.ordClaimStatCd == '29' ? 'current' : '')">교환중</span></li>
            <li v-if="ordInfo.ordClaimStatCd != '24'"><span :class="'icon_shipping_complete ' + (ordInfo.ordClaimStatCd == '30' ? 'current' : '')">교환완료</span></li>
          </ul>
          <div class="list-content">
            <OrderCancelItemList :checkbox="false" :ordItemRsltList="filterItemList(delivDtl.delivTypeCd)" :addItemRsltList="addItemRsltList" :claimSpCd="'EXCHANGE'"/>
          </div>
          <!-- END : 상품정보 -->
          <span v-for="(ordDlvpInfo, dlvpInx) in filterOrdDlvpInfoList(delivDtl.delivTypeCd)" :key="'DLVP_'+dlvpInx">
            <!-- START : 상품 회수지 정보 -->
            <section class="section wrap-breakdown">
              <h3>상품 회수지 정보</h3>
              <dl class="detail-breakdown">
                <dt>받는 분</dt>
                <dd>{{ordDlvpInfo.adrsNm}}</dd>
                <dt>주소</dt>
                <dd>{{ordDlvpInfo.adrsAddr}}</dd>
                <dt>연락처</dt>
                <dd>{{toPhoneFormat(ordDlvpInfo.adrsTelNo)}}</dd>
              </dl>
            </section>
            <!-- END : 상품 회수지 정보 -->
            <!-- START : 요청사항 -->
            <section class="section wrap-breakdown">
              <h3>요청사항</h3>
              <dl class="detail-breakdown">
                <dt v-if="isNotEmpty(ordDlvpInfo.retSchedDt)">방문예정</dt>
                <dd v-if="ordDlvpInfo.delivTypeCd == '03'">1~3일내로 고객님께 직접 방문합니다.</dd>
                <dd v-else-if="isNotEmpty(ordDlvpInfo.retSchedDt)">{{toFormat(ordDlvpInfo.retSchedDt, 'MM-DD(dd)')}}
                  {{toFormat(ordDlvpInfo.retSchedDt+ordDlvpInfo.retSchedBeginTm, 'HH:mm')}}~
                  {{toFormat(ordDlvpInfo.retSchedDt+ordDlvpInfo.retSchedEndTm, 'HH:mm')}}
                </dd>
                <dt>회수위치</dt>
                <dd>{{ordDlvpInfo.itemDlvrMethoNm}}
                  <br>
                  <span class="front-num">
                    {{!isEmpty(ordDlvpInfo.itemDlvrMethoAddNm) ? ordDlvpInfo.itemDlvrMethoAddNm + ' : ' : '' }}
                    {{!isEmpty(ordDlvpInfo.itemDlvrMethoDtlCnts) ? ordDlvpInfo.itemDlvrMethoDtlCnts : '' }}
                  </span>
                </dd>
              </dl>
            </section>
            <!-- END : 요청사항 -->
          </span>
        </section>
        <!-- START : 최종 결제금액 -->
        <section class="section mypage">
          <div class="total-payment order-payment">
            <div class="sub-title">
              <h3>결제정보</h3>
            </div>
            <ul class="accordion-payment">
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
              <strong class="return-sum" v-if="refndInfoRsltDto.ordClaimStatCd == '24'">
                환불예정금액 <span class="price"><strong>{{toComma(refndInfoRsltDto.refndSchedAmt)}}</strong>원</span>
              </strong>
              <strong class="return-sum" v-if="refndInfoRsltDto.addTdrAmt > 0">
                추가결제금액 <span class="price"><strong>{{toComma(refndInfoRsltDto.addTdrAmt)}}</strong>원</span>
              </strong>
            </div>
            <div class="sub-details" v-if="refndMeansRsltList != null && refndMeansRsltList.length > 0 && refndInfoRsltDto.ordClaimStatCd == '24'">
              <div class="txt-point"> <!-- 계좌이체 / 신용카드 -->
                환불수단
                <button type="button" aria-label="환불 처리안내 팝업 활성화" aria-haspopup="dialog" class="btn-infomation" @click="popupReturnInfoAction">
                  <span class="hidden">환불 처리안내</span>
                </button>
              </div>
              <span v-for="(refndMeansDtl, inx) in refndMeansRsltList" :key="inx">
                <div class="txt-point" v-if="refndMeansDtl.refndMeansCd == '01' || refndMeansDtl.refndMeansCd == '02'"> <!-- 계좌이체 / 신용카드 -->
                  {{refndMeansDtl.refndMeansNm}} <span class="right">{{toComma(refndMeansDtl.refndMeansAmt)}}원</span>
                </div>
                <div class="txt-point" v-else-if="refndMeansDtl.refndMeansCd == '06' && refndMeansDtl.refndMeansDtlCd == '06'"> <!-- 적립금 / GS&POINT -->
                  GS&amp;POINT 환불 <span class="right">{{toComma(refndMeansDtl.refndMeansAmt)}}P</span>
                </div>
              </span>
            </div>
          </div>
        </section>
        <!-- END : 최종 결제금액 -->
        <!-- START : 결제수단 -->
        <section class="section wrap-breakdown" v-if="tdrMeansRsltList != null && tdrMeansRsltList.length > 0 && refndInfoRsltDto.ordClaimStatCd != '24'">
          <div class="wrap-heading">
            <h3>결제수단</h3>
          </div>
          <ul class="method-list">
            <span v-for="(tdrMeansDtl, tdrInx) in tdrMeansRsltList" :key="tdrInx">
              <li v-if="tdrMeansDtl.addTdrMeansCd == '01' || tdrMeansDtl.addTdrMeansCd == '02'">
                {{tdrMeansDtl.addTdrMeansNm}}<span class="sum">{{toComma(tdrMeansDtl.addTdrAmt)}}원</span>
                <button type="button" class="btn-border btn-small bill" aria-label="전자영수증 팝업활성화" aria-haspopup="dialog" @click="popupMobileBillAction" v-if="refndInfoRsltDto.ordClaimStatCd == '29' || refndInfoRsltDto.ordClaimStatCd == '30'">전자영수증</button>
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
        <!-- END : 결제수단 -->
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area">
          <button type="button" class="btn-md btn-bg darkgray" @click="goPageClaimList">취소/반품/교환 목록</button>
          <button type="button" class="btn-md btn-bg lightgreen" @click="goHome">쇼핑하러가기</button>
        </div>
         <!-- 4월 수정 END : 버튼 감싸는 영역 삭제 -->
        <!-- END : 하단 버튼 -->
      </div>
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
    <!-- START : 팝업 -->
    <PopupDeliveryPersonal @popupEvent="popupAction" v-if="this.popup.popupDeliveryPersonal" :ordDlfeePolcList="ordDlfeePolcList" :claimSp="'EXCHANGE'" /> <!-- 팝업 - 배송비 안내 -->
    <PopupReturnInfo @popupEvent="popupAction" v-if="popup.popupReturnInfo" /> <!-- 팝업 - 환불 처리안내 -->
    <PopupMobileBill @popupEvent="popupAction" v-if="this.popup.popupMobileBill" /> <!-- 팝업 - 전자 영수증 -->
    <!-- END : 팝업 -->
  </div>
</template>
<script>
/* START : 실 사용 컴포넌트 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
import OrderCancelItemList from '@/components/mypage/cs/OrderCancelItemList'; //  주문교환 상품 목록 컴포넌트
import PopupMobileBill from '@/views/cs/recptmgnt/PopupMobileBill'; //  팝업 - 전자영수증
import PopupDeliveryPersonal from '@/views/cs/claimmgnt/PopupDeliveryPersonal'; // 팝업 - 배송비(개인부담) 안내
import PopupReturnInfo from '@/views/cs/claimmgnt/PopupReturnInfo'; // 팝업 - 환불 처리안내
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import SiteUtils from '@/common/SiteUtils';
import CookieUtils from '@/common/CookieUtils';
import dayjs from 'dayjs';
export default {
  name: "ChangeDetail",
  data() {
    return {
      popup: {
        open: false,
        popupMobileBill: false,
        popupDeliveryPersonal: false, // 배송비
        popupReturnInfo: false,
      },
      ordInfoList: [], // 주문교환정보
      delivTypeRsltList: [], // 배송유형 목록
      ordItemRsltList: [], // 주문교환상품 목록
      addItemRsltList: [], // 추가구성 상품 목록
      refndInfoRsltDto: {}, // 환불정보
      refndMeansRsltList: [], // 환불수단 목록
      tdrMeansRsltList: [], // 결제수단 목록
      ordDlvpInfoList: {}, // 주문배송지(회수지) 정보
      ordDlfeePolcList: [], // 주문배송비정책정보목록
      ordId: this.$route.params.ordId, // 주문ID
      claimSeqno: this.$route.params.claimSeqno, // 클레임일련번호
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '교환상세 < 마이페이지 <%s',
    meta: [
      {
        property: 'aa:page',
        content: '교환상세내역',
      },
    ],
  },
  mixins: [LayerPopupMixin],
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
    OrderCancelItemList, //  주문교환 상품 목록 컴포넌트
    PopupMobileBill, // 팝업 - 모바일 영수증
    PopupDeliveryPersonal, // 팝업 - 배송비 안내(고객부담)
    PopupReturnInfo, // 팝업 - 환불처리 안내 팝업
  },
  methods: {
    // 팝업 활성/비활성
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    popupMobileBillAction() {
      this.popupAction('popupMobileBill');
    },
    popupDeliveryInfoAction() {
      this.popupAction('popupDeliveryPersonal');
    },
    popupReturnInfoAction() {
      this.popupAction('popupReturnInfo');
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
    filterOrdInfoList(selDelivType) {
      return this.ordInfoList.filter(ordDtl => {
        return ordDtl.totDelivTypeCd == selDelivType;
      });
    },
    filterItemList(selDelivType) {
      return this.ordItemRsltList.filter(itemDtl => {
        return itemDtl.totDelivTypeCd == selDelivType;
      });
    },
    filterOrdDlvpInfoList(selDelivType) {
      return this.ordDlvpInfoList.filter(dlvpDtl => {
        return dlvpDtl.delivTypeCd == selDelivType;
      });
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
      this.ordInfoList = res.data.data.ordInfoList; // 주문교환정보
      this.delivTypeRsltList = res.data.data.delivTypeRsltList; // 배송유형 목록
      this.ordItemRsltList = res.data.data.ordItemRsltList; // 주문취소상품 목록
      this.addItemRsltList = res.data.data.addItemRsltList; // 추가구성 상품 목록
      this.refndInfoRsltDto = res.data.data.refndInfoRsltDto; // 환불정보
      this.refndMeansRsltList = res.data.data.refndMeansRsltList; // 환불수단 목록 정보
      this.tdrMeansRsltList = res.data.data.addTdrRsltList; // 결제수단 목록 정보
      this.ordDlvpInfoList = res.data.data.ordDlvpInfoList; // 주문 배송지(회수지) 정보
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
    // 클레임주문상세정보 조회 함수 호출
    this.retrieveClaimOrdDtlInfo();
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
