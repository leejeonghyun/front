<!--
Design: views/ss/SC-FO-SS-GF-MP-858.vue
Pg Id: TODO
Uri: n/a
-->
<template>
  <!-- : 실사용 소스 -->
  <div id="popupCashReceipt" class="wrap-full-popup" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupCashReceipt}, siteClass]">
    <div class="header-popup">
      <strong>현금영수증</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="sub-inner-box">
          <table class="tbl-type-row mt20">
            <caption>현금영수증 상세내용</caption>
            <colgroup>
              <!-- 4월 수정 : col width 전체 수정 -->
              <col style="width:62px">
              <col style="width:auto">
              <col style="width:62px">
              <col style="width:auto">
            </colgroup>
            <tbody>
              <tr>
                <th scope="row" class="bold">승인번호</th>
                <td colspan="3" class="bold">{{(cashTdrRslt !== null) ? cashTdrRslt.pytcDealNo : ''}}</td>
              </tr>
              <tr>
                <th scope="row">증빙용도</th>
                <td>{{(cashTdrRslt !== null) ? cashTdrRslt.cashRecptIssuUsg : ''}}</td>
                <th scope="row">발급유형</th>
                <td v-html="(cashTdrRslt !== null) ? cashTdrRslt.isseTypeNm : ''"></td>
              </tr>
              <tr>
                <th scope="row">주문번호</th>
                <td>{{(cashTdrRslt !== null) ? cashTdrRslt.ordId : ''}}</td>
                <th scope="row">거래일시</th>
                <td>{{(cashTdrRslt !== null) ? cashTdrRslt.dealApprDttm : ''}}</td>
              </tr>
              <tr>
                <th scope="row">주문상품</th>
                <td colspan="3">{{(cashTdrRslt !== null) ? cashTdrRslt.itemNm : ''}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="sub-inner-box">
          <div class="sub-title">
            <h2>결제금액</h2>
          </div>
          <table class="tbl-type-row">
            <caption>결제금액 상세내용</caption>
            <colgroup>
              <col style="width:62px">
              <col style="width:auto">
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">금액</th>
                <td class="txt-right">{{toComma(sumSupplAmt)}}원</td>
              </tr>
              <tr>
                <th scope="row">세금</th>
                <td class="txt-right">{{toComma(sumVatAmt)}}원</td>
              </tr>
              <!-- 4월수정 START : 봉사료 삭제 -->
              <!-- 4월수정 END : 봉사료 삭제 -->
              <tr>
                <th scope="row">합계</th>
                <td class="txt-right bold">{{toComma(sumTdrAmt)}}원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 4월수정 START : 결제이력 내용 추가 -->
        <div class="sub-inner-box">
          <div class="sub-title">
            <h2>결제이력</h2>
          </div>
          <table class="tbl-type-row">
            <caption>결제이력 상세내용</caption>
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">결제일시</th>
                <th scope="col">금액</th>
                <th scope="col">세금</th>
                <th scope="col">합계</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(payItem, inx) in cashTdrRsltList" :key="inx">
                <td class="txt-center">{{payItem.dealApprDttm != null ? payItem.dealApprDttm : ''}}</td>
                <td class="txt-right">{{toComma(payItem.supplAmt)}}원</td>
                <td class="txt-right">{{toComma(payItem.vatAmt)}}원</td>
                <td class="txt-right">{{toComma(payItem.tdrAmt)}}원</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td class="txt-right">{{toComma(sumSupplAmt)}}원</td>
                <td class="txt-right">{{toComma(sumVatAmt)}}원</td>
                <td class="txt-right bold">{{toComma(sumTdrAmt)}}원</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <!-- 4월수정 END : 결제이력 내용 추가 -->
        <div class="sub-inner-box">
          <div class="sub-title">
            <h2>판매자 정보</h2>
          </div>
          <table class="tbl-type-row">
            <caption>판매자정보 상세내용</caption>
            <colgroup>
              <col style="width:62px">
              <col style="width:auto">
              <col style="width:62px">
              <col style="width:auto">
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">상호</th>
                <td>{{(selrInfoRslt !== null) ? selrInfoRslt.selrSiteNm : ''}}</td>
                <th scope="row">사업자 <br>등록번호</th>
                <td>{{(selrInfoRslt !== null) ? selrInfoRslt.selrTaxno : ''}}</td>
              </tr>
              <tr>
                <th scope="row">대표자</th>
                <td>{{(selrInfoRslt !== null) ? selrInfoRslt.selrSiteRprpsNm : ''}}</td>
                <th scope="row">전화번호</th>
                <td>{{(selrInfoRslt !== null) ? selrInfoRslt.selrTelNo : ''}}</td>
              </tr>
              <tr>
                <th scope="row">주소</th>
                <td colspan="3">{{(selrInfoRslt !== null) ? selrInfoRslt.selrRoadNm : ''}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="sub-inner-box">
          <div class="sub-title">
            <h2>가맹점 정보</h2>
          </div>
          <table class="tbl-type-row">
            <caption>가맹점 정보 상세내용</caption>
            <colgroup>
              <col style="width:62px">
              <col style="width:auto">
              <col style="width:62px">
              <col style="width:auto">
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">상호</th>
                <td>{{(fcInfoRslt !== null) ? fcInfoRslt.fcConmNm : ''}}</td>
                <th scope="row">사업자 <br>등록번호</th>
                <td>{{(fcInfoRslt !== null) ? fcInfoRslt.fcTaxno : ''}}</td>
              </tr>
              <tr>
                <th scope="row">대표자</th>
                <td>{{(fcInfoRslt !== null) ? fcInfoRslt.fcRprpsNm : ''}}</td>
                <th scope="row">전화번호</th>
                <td>{{(fcInfoRslt !== null) ? fcInfoRslt.fcTelNo : ''}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="sub-inner-box">
          <ul class="txt-info-list">
            <li>현금영수증 확인 및 자진발급분 소비자 등록은 국세청 현금영수증 홈페이지 (<a href="http://www.taxsave.go.kr" target="_blank" class="point underline" title="새 창 열림">http://www.taxsave.go.kr</a>)에서 신청하실 수 있습니다.</li>
            <li>현금영수증 관련 궁금한 사항은 국번없이 126번 국세상담센터에서 상담 받으실 수 있습니다. </li>
          </ul>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import dayjs from 'dayjs';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupCashReceipt",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '현금영수증 < 마이페이지 < %s'
  },
  props: {
    tdrStatRslt: Object
  },
  mixins: [LayerPopupMixin],
  data() {
    return {
      cashTdrRsltList: {},
      selrInfoRslt: {},
      fcInfoRslt: {},
      cashTdrRslt: {},
      sumSupplAmt: 0,
      sumVatAmt: 0,
      sumTdrAmt: 0,
      paramData: this.$route.params.paramData, // 결제수단코드(2)+결제수단상세코드(2)+공급업체코드
      urlParam: {
        ordId: this.$route.params.ordId, // 주문ID
        ordDt: this.$route.params.ordDt, // 주문일
        storId: this.$route.params.storId, // 매장ID
        tdrMeansCd: '', // 결제수단코드
        tdrMeansDtlCd: '', // 결제수단상세코드
        supplFirmCd: '', // 공급업체코드
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
  },
  methods: {
    init() {
      console.log("--------------------------------------------");
      console.log(this.paramData);
      if (this.tdrStatRslt != null) {
        this.modalActiveEvent('popupCashReceipt');
      } else {
        this.urlParam.tdrMeansCd = StringUtils.trim(this.paramData).substring(0, 2);
        this.urlParam.tdrMeansDtlCd = StringUtils.trim(this.paramData).substring(2, 4);
        this.urlParam.supplFirmCd = StringUtils.trim(this.paramData).substring(4);
      }
      // 현금영수증 정보 조회
      this.retrieveCashRecptInfo();
    },
    popupCloseAction() {
      this.$emit('popupEvent', 'popupCashReceipt');
      this.modalActiveEvent('popupCashReceipt');
    },
    toComma(x) {
      return NumberUtils.toComma(Math.floor(Number(x)));
    },
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    toFormat(x, y) {
      return DateUtils.format(x, y);
    },
    async retrieveCashRecptInfo() { // 현금영수증 정보 조회
      console.log("팝업시 전달받는 값 확인");
      console.log(this.tdrStatRslt);
      const params = {
        ordId: (this.tdrStatRslt != null ? this.tdrStatRslt.ordId : this.urlParam.ordId), // 주문ID
        ordDt: (this.tdrStatRslt != null ? this.tdrStatRslt.ordDt : this.urlParam.ordDt), // 주문일시
        storId: (this.tdrStatRslt != null ? this.tdrStatRslt.storId : this.urlParam.storId), // 매장ID
        supplFirmCd: (this.tdrStatRslt != null ? this.tdrStatRslt.supplFirmCd : this.urlParam.supplFirmCd), // 공급업체코드
        tdrMeansCd: (this.tdrStatRslt != null ? this.tdrStatRslt.tdrMeansCd : this.urlParam.tdrMeansCd), // 결제수단코드
        tdrMeansDtlCd: (this.tdrStatRslt != null ? this.tdrStatRslt.tdrMeansDtlCd : this.urlParam.tdrMeansDtlCd), // 결제수단상세코드
      };
      const res = await ApiUtils.get('/fo/cs/recptmgnt/cash-recpt-info', params);
      if (res.data === null || !res.data.success) {
        return;
      }
      console.log("cash-recpt-info 응답 후 데이터 확인");
      console.log(res.data);
      this.cashTdrRsltList = res.data.data.cashRecptRsltList; // 현금영수증정보결과
      this.selrInfoRslt = res.data.data.selrInfoRslt; // 판매자정보결과
      this.fcInfoRslt = res.data.data.fcInfoRslt; // 가맹점정보결과

      // 현금영수증정보 가공 (이력정보에서 대표값 및 sum 처리)
      if (this.cashTdrRsltList != null) {
        let indx = 0;
        this.cashTdrRsltList.forEach( el => {
          if (indx === 0) {
            this.cashTdrRslt.pytcDealNo = el.pytcDealNo;
            this.cashTdrRslt.cashRecptIssuUsg = el.cashRecptIssuUsg;
            this.cashTdrRslt.isseTypeNm = el.isseTypeNm;
            this.cashTdrRslt.ordId = el.ordId;
            this.cashTdrRslt.dealApprDttm = el.dealApprDttm;
            this.cashTdrRslt.itemNm = el.itemNm;

            this.sumSupplAmt += Number(el.supplAmt);
            this.sumVatAmt += Number(el.vatAmt);
            this.sumTdrAmt += Number(el.tdrAmt);
            indx++;
          } else {
            this.sumSupplAmt += Number(el.supplAmt);
            this.sumVatAmt += Number(el.vatAmt);
            this.sumTdrAmt += Number(el.tdrAmt);
          }
        });
      }
    }
  },
  mounted() {
    this.init();
    // this.modalActiveEvent('popupCashReceipt');
    // // 현금영수증 정보 조회
    // this.retrieveCashRecptInfo();
  }
};
</script>
