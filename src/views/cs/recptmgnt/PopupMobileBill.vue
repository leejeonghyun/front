<!--
Design: views/ss/SC-FO-SS-GF-MP-856
Pg Id: PG-FO-CS-I013
Uri: /cs/claimmgnt/mobile_bill/:ordId/:claimSeqno
-->
<template>
  <!-- : 실사용 소스 -->
  <div id="popupMobileBill" class="wrap-full-popup active" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
  <!-- <div id="popupMobileBill" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupMobileBill}"> -->
    <div class="header-popup">
      <!-- 4월 수정 : 내용 변경 -->
      <strong>전자영수증</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <section class="wrap-breakdown">
          <div class="wrap-heading">
            <h2 class="hidden">주문번호</h2>
            <!-- 4월 수정 : 삭제
              <button type="button" class="btn-border btn-small">이미지저장</button> -->
          </div>
          <!-- 4월 수정 : class 추가 -->
          <dl class="detail-breakdown order-top">
            <dt>주문 번호</dt>
            <dd>{{ordInfoRslt.ordId}} </dd>
            <dt class="order-date">주문 일자</dt>
            <dd>{{toFormat(ordInfoRslt.ordDttm, 'YYYY.MM.DD (dd)  HH:mm:ss')}}</dd>
          </dl>
        </section>
        <!-- START : 구매자 정보 -->
        <!-- START: 4월 수정 -->
        <section class="section">
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>구매자 정보</h2>
            </div>
            <dl class="detail-breakdown mt10">
              <dt>주문고객</dt>
              <dd>{{ordInfoRslt.ordpsNm}} <span class="line"></span> {{ordInfoRslt.webId}}</dd>
            </dl>
          </div>
        </section>
        <!-- END: 4월 수정 -->
        <!-- END : 구매자 정보 -->
        <!-- START : 주문상품 상세내역 -->
        <section class="section">
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>주문상품 상세내역</h2>
            </div>
            <div>
              <!-- START : 당일배송 + 새벽배송 + 택배배송 -->
              <table class="tbl-type-col" v-for="(delivTypeDtl, inx) in delivTypeRsltList" :key="inx">
                <caption>{{delivTypeDtl.delivTypeNm}} ({{inx}}) 주문상품 상세내용</caption>
                <colgroup>
                  <col style="width:auto">
                  <col style="width:20%">
                  <col style="width:25%">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">{{delivTypeDtl.delivTypeNm}} 상품명/옵션</th>
                    <th scope="col">수량</th>
                    <th scope="col">구매금액</th>
                  </tr>
                </thead>
                <tbody v-if="delivTypeDtl.delivTypeCd != '0203'">
                  <tr v-for="(itemDtl, itemInx) in filterItemList(delivTypeDtl.delivTypeCd)" :key="itemInx">
                    <td><p v-bind:class="{asterisk : itemDtl.taxFreeYn == 'Y'}">{{itemDtl.itemNm}}</p></td>
                    <td class="center">{{toComma(itemDtl.ordQty)}}</td>
                    <!-- 상품유형코드 '03(사은품)' -->
                    <td class="right">{{itemDtl.itemTypeCd == '03' ? '(사은품)' : toComma(itemDtl.salesAmt) + '원'}}</td>
                  </tr>
                </tbody>
                <tbody v-else v-html="makeDelivItemList(delivTypeDtl.delivTypeCd, delivTypeDtl.storId)">
                </tbody>
              </table>
              <!-- END : 당일배송 + 새벽배송 + 택배배송 -->
            </div>
            <!-- START : 최종 결제금액 -->
            <div class="popup-bill">
              <div class="total-payment bill-payment">
                <ul class="accordion-payment border">
                  <li>
                    <p class="tit-accordion">
                      면세품 가액
                      <span class="price"><strong>{{toComma(ordInfoRslt.totFtaxSalesAmt)}}</strong>원</span>
                    </p>
                  </li>
                  <li>
                    <p class="tit-accordion">
                      과세물품 가액
                      <span class="price"><strong>{{toComma(ordInfoRslt.totTaxSalesAmt)}}</strong>원<em>(부가세 {{toComma(ordInfoRslt.totTaxSalesVatAmt)}}원 포함)</em></span>
                    </p>
                  </li>
                  <li>
                    <p class="tit-accordion">
                      상품구매합계
                      <span class="price"><strong>{{toComma(ordInfoRslt.totSalesAmt)}}</strong>원<em>(부가세 {{toComma(ordInfoRslt.totSalesVatAmt)}}원 포함)</em></span>
                    </p>
                  </li>
                  <li>
                    <p class="tit-accordion">
                      총 배송비
                      <span class="price"><strong>{{toComma(ordInfoRslt.totDlfeeAmt)}}</strong>원<em>(부가세 {{toComma(ordInfoRslt.totDlfeeVatAmt)}}원 포함)</em></span>
                    </p>
                  </li>
                  <li>
                    <p class="tit-accordion total-price">
                      최종결제금액
                      <!-- 4월 수정 : class 삭제 -->
                      <span class="price"><strong>{{toComma(ordInfoRslt.tdrAmt)}}</strong>원<em>(부가세 {{toComma(ordInfoRslt.tdrVatAmt)}}원 포함)</em></span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <!-- END : 최종 결제금액 -->
          </div>
        </section>
        <!-- END : 주문상품 상세내역 -->
        <!-- START : 결제내역 -->
        <section class="section">
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>결제내역</h2>
            </div>
            <div v-for="(tdrMeans, inx) in tdrMeansRsltList" :key="inx">
              <p class="info-detail"> <!-- v - i f ="tdrMeans.tdrMeansCd == 'easy_pay'"> -->
                <span class="date">{{toFormat(tdrMeans.ordDt, 'YYYY.MM.DD')}}</span>
                {{tdrMeans.tdrMeansNm}}{{tdrMeans.pytcAttrInfo}} <!-- ({{tdrMeans.pytcAttrNm}} /{{tdrMeans.pytcAttrTypeNm}}) -->
              </p>
              <!-- START : 결제내역 -->
              <table class="tbl-type-col"> <!-- v-if="tdrMeans.tdrMeansCd == '01' || tdrMeans.tdrMeansCd == '02'"> -->
                <caption>결제내역 상세내용</caption>
                <colgroup>
                  <col style="width:auto">
                  <col style="width:auto">
                  <col style="width:28%">
                  <col style="width:33%">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">판매자</th>
                    <th scope="col">가맹점</th>
                    <th scope="col">구매금액</th>
                    <th scope="col">증빙발급</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tdrStat, statInx) in filterTdrStatList(tdrMeans.tdrMeansCd, tdrMeans.tdrMeansDtlCd, tdrMeans.addPayFlag)" :key="statInx">
                    <td>{{tdrStat.supplFirmNm}}</td>
                    <td>{{fcInfoRslt.fcConmNm}}</td>
                    <td class="center">{{toComma(tdrStat.tdrShareAmt)}}원</td>
                    <td class="center" v-if="tdrStat.tdrMeansCd == '02'">
                      <button type="button" class="btn-border btn-small" aria-label="신용카드매출전표 팝업활성화" aria-haspopup="dialog" @click="popupCardStatementAction(tdrMeans, tdrStat)">신용카드매출전표</button>
                    </td>
                    <td class="center" v-else-if="tdrStat.cashRecptIssuYn == 'Y' && (tdrStat.tdrMeansCd == '01' || tdrStat.tdrMeansCd == '13')">
                      <button type="button" class="btn-border btn-small" aria-label="현금영수증 팝업활성화" aria-haspopup="dialog" @click="popupCashReceiptAction(tdrMeans, tdrStat)">현금영수증</button>
                    </td>
                    <td class="center" v-else> 비대상 </td>
                  </tr>
                </tbody>
              </table>
              <!-- // 4월 수정 : 내용 추가 -->
              <!-- END : 결제내역 -->
            </div>
            <!-- START : 수기환불 -->
            <div v-if="refndManualInfoRslt != null">
              <p class="info-detail">
                <span class="date">{{refndManualInfoRslt.refndDt}}</span> {{refndManualInfoRslt.refndTitle}}
              </p>
              <table class="tbl-type-col">
                <caption>수기환불내용</caption>
                <colgroup>
                  <col style="width:auto">
                  <col style="width:auto">
                  <col style="width:28%">
                  <col style="width:33%">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">판매자</th>
                    <th scope="col">가맹점</th>
                    <th scope="col">구매금액</th>
                    <th scope="col">증빙발급</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{refndManualInfoRslt.supplFirmNm}}</td>
                    <td>{{refndManualInfoRslt.fcNm}}</td>
                    <td class="center">-{{toComma(refndManualInfoRslt.refndAmt)}}원</td>
                    <td class="center">비대상</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- END : 수기환불 -->
          </div>
        </section>
        <!-- END : 결제내역 -->
        <PopupCardStatement :tdrStatRslt="tdrStatRslt" @popupEvent="popupAction('popupCardStatement')" v-if="this.popup.popupCardStatement" /> <!-- 팝업 - 신용카드 매출전표 -->
        <PopupCashReceipt :tdrStatRslt="tdrStatRslt" @popupEvent="popupAction('popupCashReceipt')" v-if="this.popup.popupCashReceipt" /> <!-- 팝업 - 현금영수증 -->
        <ul class="list-type-dot-bg mg0">
          <!-- 4월 수정 : 내용 변경 -->
          <li>본 영수증은 증빙용으로 활용할 수 없으므로 법적 증빙서류가 필요하신 경우는 현금영수증, 신용카드 매출전표를 확인해주세요.</li>
        </ul>
        <!-- 4월 수정 : 하단 버튼 추가 -->
        <div class="bottom-btn-area">
          <!-- button type="button" class="btn-md btn-bg darkgray" @ click="routeBefore()">주문/배송조회</button -->
          <gs-link to="/cs/orddeliv/ord_deliv_list" class="btn-md btn-bg darkgray">주문/배송조회</gs-link>
          <!-- 4월수정 START : 버튼 텍스트 수정 -->
          <button type="button" class="btn-md btn-bg lightgreen" @click="sendEmail()">이메일 전송</button>
          <!-- 4월수정 END : 버튼 텍스트 수정 -->
        </div>
        <!-- // 4월 수정 : 하단 버튼 추가 -->
      </div>
      <!-- START : 2020.02.20 태그 변경 -->
      <!-- 2020.10.05 (변경) 배너이미지 수정 및 달리살다 사이트 배너삭제. 이미지설명문 삭제. -->
      <div v-if="goBannerLink() != '#'">
        <a v-bind:href="goBannerLink()" class="link-banner">
          <img src="@/assets/images/_temp/_img_banner_bill.jpg" alt="" />
        </a>
      </div>
      <!-- END : 2020.02.20 태그 변경 -->
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import PopupCardStatement from '@/views/cs/recptmgnt/PopupCardStatement'; //  팝업 - 신용카드 매출전표
import PopupCashReceipt from '@/views/cs/recptmgnt/PopupCashReceipt'; //  팝업 - 현금영수증
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import dayjs from 'dayjs';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';
import LoginUtils from '@/common/LoginUtils';
import ClaimMsg from '@/components/mypage/cs/ClaimMsg.vue';

export default {
  name: "PopupMobileBill",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '전자영수증 < 마이페이지 < %s',
    meta: [
      // 앱 트래커 메타정보
      {
        property: 'aa:page',
        content: '전자영수증',
      },
    ],
  },
  props: {
    // ordInfoRslt: Object,
  },
  mixins: [LayerPopupMixin],
  data() {
    return {
      popup: { // 팝업
        open: false,
        popupCardStatement: false,
        popupCashReceipt: false,
      },
      ordId: this.$route.params.ordId, // 주문ID
      claimSeqno: this.$route.params.claimSeqno, // 클레임일련번호
      ordInfoRslt: {}, // 주문정보결과
      tdrStatRslt: {}, // 결제분배상세정보
      delivTypeRsltList: [], // 배송유형결과List
      storInfoRsltList: [], // 매장정보결과List
      ordItemRsltList: [], // 주문상품결과List
      tdrMeansRsltList: [], // 결제수단결과List
      tdrStatRsltList: [], // 결제내역결과List
      refndManualInfoRslt: {}, // 수기환불정보결과
      fcInfoRslt: {}, // 가맹점정보결과
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    PopupCardStatement, // 팝업 - 신용카드 매출전표
    PopupCashReceipt, // 팝업 - 현금영수증
  },
  methods: {
    toComma(x) {
      return NumberUtils.toComma(Math.floor(Number(x)));
    },
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    toFormat(x, y) {
      return DateUtils.format(x, y);
    },
    printDelivTitle() {
      const refreshDomain = "gsrefresh"; // TODO 실제 도메인으로 변경 필요
      return location.host.indexOf(refreshDomain) > -1 ? "GS 프레시몰 택배" : "GS 프레시몰 달리살다택배";
    },
    popupCloseAction() {
      this.$emit('popupEvent', 'popupMobileBill');
      // this.modalActiveEvent('popupMobileBill');
    },
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    // 신용카드 매출 전표
    popupCardStatementAction(tdrMeans, tdrStat) {
      // this.tdrStatRslt = tdrStat;
      this.tdrStatRslt = tdrMeans;
      this.tdrStatRslt.ordId = this.ordInfoRslt.ordId;
      this.tdrStatRslt.supplFirmCd = tdrStat.supplFirmCd;
      this.popupAction('popupCardStatement');
    },
    // 현금 영수증
    popupCashReceiptAction(tdrMeans, tdrStat) {
      // this.tdrStatRslt = tdrStat;
      this.tdrStatRslt = tdrMeans;
      this.tdrStatRslt.ordId = this.ordInfoRslt.ordId;
      this.tdrStatRslt.supplFirmCd = tdrStat.supplFirmCd;
      this.popupAction('popupCashReceipt');
    },
    filterItemList(selDelivType, selStorId) {
      if (selDelivType == null) {
        return;
      }
      console.log("deliv type : "+ selDelivType +", stor ID : "+ selStorId);

      if (selDelivType != '0203') {
        return this.ordItemRsltList.filter(itemDtl => {
          return itemDtl.delivTypeCd == selDelivType;
        });
      } else {
        return this.ordItemRsltList.filter(itemDtl => {
          return (itemDtl.delivTypeCd == '02' || itemDtl.delivTypeCd == '03') && itemDtl.storId == selStorId;
        });
      }
    },
    filterTdrStatList(selTdrMeansCd, selTdrMeansDtlCd, addPayFlag) {
      return this.tdrStatRsltList.filter( tdrStatDtl => {
        // if (tdrStatDtl.tdrMeansCd == selTdrMeansCd && tdrStatDtl.tdrMeansDtlCd == selTdrMeansDtlCd && tdrStatDtl.addPayFlag == addPayFlag) {
        //   return true;
        // } else if (tdrStatDtl.tdrMeansCd == '01' && tdrStatDtl.tdrMeansDtlCd == '20' && tdrStatDtl.tdrMeansCd == selTdrMeansCd) {
        //   return true;
        // } else if (tdrStatDtl.tdrMeansCd == '02' && tdrStatDtl.tdrMeansDtlCd == '19' && tdrStatDtl.tdrMeansCd == selTdrMeansCd) {
        //   return true;
        // } else if (tdrStatDtl.tdrMeansCd == '21' && (selTdrMeansCd == '01' || selTdrMeansCd == '02')) {
        //   return true;
        // }
        return (tdrStatDtl.tdrMeansCd == selTdrMeansCd && tdrStatDtl.tdrMeansDtlCd == selTdrMeansDtlCd && tdrStatDtl.addPayFlag == addPayFlag);
      });
    },
    makeDelivItemList(delivTypeCd, storId) {
      let strHtml = "";
      let itemList = null;
      for (let storInx = 0; storInx < this.storInfoRsltList.length; storInx++) {
        console.log("1..... stor ID["+ storInx +"] : "+ this.storInfoRsltList[storInx].storId +"\nParam Stor ID : "+ storId);
        if (this.storInfoRsltList[storInx].storId != storId) {
          continue;
        }
        strHtml = "<tr class=\"title\">";
        strHtml += "<td scope=\"row\" colspan=\"3\"><strong>" + this.storInfoRsltList[storInx].storNm + "</strong></td>";
        strHtml += "</tr>";
        itemList = this.filterItemList(delivTypeCd, this.storInfoRsltList[storInx].storId);
        for (let itemInx = 0; itemInx < itemList.length; itemInx++) {
          strHtml += "<tr>";
          // 면세품에는 별표
          if (itemList[itemInx].taxFreeYn == 'Y') {
            // 배송유형코드 '02(전국택배)'
            strHtml += "<td><p class='asterisk'>" + ( delivTypeCd == '02' ? printDelivTitle() : itemList[itemInx].itemNm ) + "</p></td>";
          } else {
            strHtml += "<td><p>" + ( delivTypeCd == '02' ? printDelivTitle() : itemList[itemInx].itemNm ) + "</p></td>";
          }
          strHtml += "<td class=\"center\">" + NumberUtils.toComma(itemList[itemInx].ordQty) + "</td>";
          // 상품유형코드 '03(사은품)'
          strHtml += "<td class=\"right\">" + ( itemList[itemInx].itemTypeCd == '03' ? '(사은품)' : NumberUtils.toComma(itemList[itemInx].salesAmt) + '원' ) + "</td>";
          strHtml += "</tr>";
        }
      }
      return strHtml;
    },
    async retrieveMobilRecptInfo() { // 모바일영수정(전자영수증) 상세 정보 조회
      const params = {
        cmmMbrNo: this.cmmMbrNo,
        ordId: this.ordId, // 주문ID
      };
      const res = await ApiUtils.get('/fo/cs/recptmgnt/mobile-receipt-info', params);
      if (res.data === null || !res.data.success) {
        return;
      }
      console.log('mobile-receipt-info 응답데이터 확인');
      console.log(res.data);
      this.ordInfoRslt = res.data.data.ordInfoRslt; // 완료된 주문정보
      this.delivTypeRsltList = res.data.data.delivTypeRsltList; // 배송유형 목록
      this.storInfoRsltList = res.data.data.storInfoRsltList; // 매장정보 목록
      this.ordItemRsltList = res.data.data.ordItemRsltList; // 완료된 주문상품 목록
      this.tdrMeansRsltList = res.data.data.tdrMeansRsltList; // 결제수단 목록
      this.tdrStatRsltList = res.data.data.tdrStatRsltList; // 결제내역 목록
      this.refndManualInfoRslt = res.data.data.refndManualInfoRslt; // 수기환불정보결과
      this.fcInfoRslt = res.data.data.fcInfoRslt; // 가맹점 정보
      // console.log(this.ordInfoRslt);
    },
    async sendEmail() {
      const $vm = this;
      const emailInfo = {
        ordInfoRslt: this.ordInfoRslt, // 완료된 주문정보
        delivTypeRsltList: this.delivTypeRsltList, // 배송유형 목록
        storInfoRsltList: this.storInfoRsltList, // 매장정보 목록
        ordItemRsltList: this.ordItemRsltList, // 완료된 주문상품 목록
        tdrMeansRsltList: this.tdrMeansRsltList, // 결제수단 목록
        tdrStatRsltList: this.tdrStatRsltList, // 결제내역 목록
        refndManualInfoRslt: this.refndManualInfoRslt, // 수기환불정보결과
        fcInfoRslt: this.fcInfoRslt // 가맹점 정보
      };
      await ApiUtils.post('/fo/cs/recptmgnt/send-email', emailInfo)
      .then( res => {
        if (res && res.data && res.data.success) {
          $vm.$gsdialog.alert(res.data.data + '<br/><br/>' + ClaimMsg.sendEmail, {html: true});
        } else {
          $vm.$gsdialog.alert(ClaimMsg.confirmEmail, {html: true});
        }
      }).catch( error => {
        // TODO alert 창? -> 안내메시지 필요
        console.error(error);
        return;
      });
    },
    goBannerLink() {
      if (Number(CookieUtils.getMallId()) == 1) { // gsfresh
        if (CookieUtils.getMdaType() == '01') { // PC
          return 'https://www.gsfresh.com/dp/ssevnt_detail?ssevntId=2341';
        } else {
          return 'https://m.gsfresh.com/dp/ssevnt_detail?ssevntId=2341';
        }
      } else {
        // [9/29] 달리살다의 경우, 배너링크 삭제요청 (by 류은진D)
        // if (CookieUtils.getMdaType() == '02') { // Mobile
        //   return 'https://dalisalda.com/dp/ssevnt_detail?ssevntId=2341';
        // }
        return '#';
      }
    },
    goPage(url) {
      if (Number(CookieUtils.getMallId()) == 1) { // gsfresh
        if (CookieUtils.getMdaType() == '01') { // PC
          return SiteUtils.freshmo(url);
        } else {
          return SiteUtils.freshpc(url);
        }
      } else if (Number(CookieUtils.getMallId()) == 11) { // dalisalda
        if (CookieUtils.getMdaType() == '02') { // Mobile
          return SiteUtils.dalimo(url);
        }
      }
      return SiteUtils.to(CookieUtils.getMallId(), url);
    },
    printElement(elementRef) {
      console.log(elementRef);
      const thisApp = document.getElementById('app');
      const printContents = elementRef.innerHTML;
      const printDiv = document.createElement('DIV');

      document.body.appendChild(printDiv);
      printDiv.innerHTML = printContents;
      thisApp.style.display = 'none';
      window.print();

      thisApp.style.display = 'block';
      printDiv.style.display = 'none';
      printDiv.innerHTML = '';
    },
    goHome() {
      CookieUtils.deleteCookie('ordSearchOption');
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
  async mounted() {
    const res = await ApiUtils.get('/fo/cs/orddelivdtl/order-type-info', {ordId: this.ordId});
    if (res.data === null || res.data.data === null) {
      return;
    }
    const d = res.data.data.ordInfo;
    const ordTypeCd = d.ordTypeCd;
    const chanlNm = d.chanlNm;
    if (ordTypeCd == '40') { // 제휴주문
      await this.$gsdialog.alert('제휴사(' + chanlNm + ')에서 결제된 주문입니다.<br/>제휴사 마이페이지에서 확인하여 주세요.', {html: true, header: ''}).then(dialog => {});
      this.goHome();
      return;
    }

    if (!LoginUtils.isLogin()) {
      let returnUrl = location.href;
      returnUrl = encodeURIComponent(returnUrl);
      console.log('returnUrl,'+returnUrl);
      this.$router.push({ path: '/cu/login?returnUrl='+returnUrl });
      return;
    }
    // 모바일영수정(전자영수증) 상세 정보 조회
    this.retrieveMobilRecptInfo();
    // this.printElement(document.getElementById('popupMobileBill'));

    // this.modalActiveEvent('popupMobileBill');
  }
};
</script>
