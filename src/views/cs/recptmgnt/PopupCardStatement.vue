<!--
Design: views/ss/SC-FO-SS-GF-MP-857
Pg Id: PG-FO-CS-I014
Uri: /cs/claimmgnt/mobile_bill/:ordId/:claimSeqno
-->
<template>
<!-- 4월 수정 : class 삭제 -->
  <!-- : 실사용 소스 -->
  <div id="popupCardStatement" class="wrap-full-popup active" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
    <div class="header-popup">
      <strong>신용카드 매출전표</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <!-- 4월 수정 : 내용 추가 -->
        <div class="sub-inner-box">
          <table class="tbl-type-row mt20">
            <caption>신용카드 매출전표영수증 상세내용</caption>
            <colgroup>
              <col style="width:62px">
              <col style="width:auto">
              <col style="width:62px">
              <col style="width:auto">
            </colgroup>
            <tbody>
              <tr>
                <!-- 4월수정 START : 클래스명 삭제 -->
                <th scope="row">승인번호</th>
                <td colspan="3">{{cardTdrRslt!=null ? cardTdrRslt.pytcDealNo : ''}}</td>
                <!-- 4월수정 END : 클래스명 삭제 -->
              </tr>
              <tr>
                <th scope="row">결제방법</th>
                <td>{{cardTdrRslt!=null ? cardTdrRslt.tdrMeansNm : ''}}</td>
                <th scope="row">거래유형</th>
                <td>{{cardTdrRslt!=null ? cardTdrRslt.isseTypeNm : ''}}</td>
              </tr>
              <tr>
                <th scope="row">카드종류</th>
                <td>{{cardTdrRslt!=null ? cardTdrRslt.pytcCardNm : ''}}</td>
                <th scope="row">할부유형</th>
                <td>{{cardTdrRslt!=null ? cardTdrRslt.instlTypeNm : ''}}</td>
              </tr>
              <tr>
                <!-- 4월수정 START : 클래스명 삭제 -->
                <th scope="row">카드번호</th>
                <td colspan="3">{{cardTdrRslt!=null ? cardTdrRslt.cardNo : ''}}</td>
                <!-- 4월수정 END : 클래스명 삭제 -->
              </tr>
              <tr>
                <th scope="row">주문번호</th>
                <td>{{cardTdrRslt!=null ? cardTdrRslt.ordId : ''}}</td>
                <th scope="row">거래일시</th>
                <td>{{cardTdrRslt!=null ? toFormat(cardTdrRslt.pytcDealApprDttm, 'YYYY.MM.DD HH:mm') : ''}}</td>
              </tr>
              <tr>
                <th scope="row">주문상품</th>
                <td colspan="3">{{cardTdrRslt!=null ? cardTdrRslt.itemNm : ''}}</td>
                <!-- 4월수정 START : 문구 수정
                  스팸 클래식 200g 외 n건
                4월수정 END : 문구 수정 -->
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
                <td class="txt-right">{{cardTdrRslt!=null ? toComma(cardTdrRslt.supplAmt) : ''}}원</td>
              </tr>
              <tr>
                <th scope="row">세금</th>
                <td class="txt-right">{{cardTdrRslt!=null ? toComma(cardTdrRslt.vatAmt) : ''}}원</td>
              </tr>
              <!-- 4월수정 START : 봉사료 삭제 -->
              <!-- 4월수정 END : 봉사료 삭제 -->
              <tr>
                <th scope="row">합계</th>
                <td class="txt-right bold">{{cardTdrRslt!=null ? toComma(cardTdrRslt.tdrAmt) : ''}}원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 4월수정 START : 결제이력 내용 추가 -- >
        ------- 09.17 오픈 후 결제이력은 우선은 숨김처리함 ---------
        <div class="sub-inner-box">
          <div class="sub-title">
            <h2>결제이력</h2>
          </div>
          <table class="tbl-type-row">
            <caption>결제이력 상세내용</caption>
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              < !-- col width="25%" / -- >
              <col width="25%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">결제일시</th>
                <th scope="col">금액</th>
                < !-- th scope="col">세금</th -- >
                <th scope="col">합계</th>
              </tr>
            </thead>
            <tbody>
              <tr v -for="(payItem, inx) in cardPayHistory" :key="inx">
                <td class="txt-center"> { { payItem.pytcDealApprDttm != null ? payItem.pytcDealApprDttm : '' } } </td>
                <td class="txt-right"> { { payItem.priceFlag}}{{toComma(payItem.supplSalesAmt) } } 원</td>
                < !-- td class="txt-right"> { { payItem.priceFlag}} { { toComma(payItem.taxAmt) } } 원</td -- >
                <td class="txt-right"> { { payItem.priceFlag}}{{toComma(payItem.tdrShareAmt) } } 원</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td class="txt-right"> { { toComma(sumSupplSalesAmt) } } 원</td>
                < !-- td class="txt-right"> { { toComma(sumTaxAmt) } }원</td -- >
                <td class="txt-right bold"> { { toComma(sumTdrShareAmt) } } 원</td >
              </tr>
            </tfoot>
          </table>
        </div>
        < !-- 4월수정 END : 결제이력 내용 추가 -->
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
                <td>{{selrInfoRslt!=null ? selrInfoRslt.selrSiteNm : ''}}</td>
                <th scope="row">사업자 <br>등록번호</th>
                <td>{{selrInfoRslt!=null ? selrInfoRslt.selrTaxno : ''}}</td>
              </tr>
              <tr>
                <th scope="row">대표자</th>
                <td>{{selrInfoRslt!=null ? selrInfoRslt.selrSiteRprpsNm : ''}}</td>
                <th scope="row">전화번호</th>
                <td>{{selrInfoRslt!=null ? selrInfoRslt.selrTelNo : ''}}</td>
              </tr>
              <tr>
                <th scope="row">주소</th>
                <td colspan="3">{{selrInfoRslt!=null ? selrInfoRslt.selrRoadNm : ''}}</td>
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
                <td>{{fcInfoRslt.fcConmNm}}</td>
                <th scope="row">사업자 <br>등록번호</th>
                <td>{{fcInfoRslt.fcTaxno}}</td>
              </tr>
              <tr>
                <th scope="row">대표자</th>
                <td>{{fcInfoRslt.fcRprpsNm}}</td>
                <th scope="row">전화번호</th>
                <td>{{fcInfoRslt.fcTelNo}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="sub-inner-box">
          <ul class="txt-info-list">
            <li>과세여부에 따라 세금 변동될 수 있으며, 최종 세액 정보를 노출합니다.</li>
          </ul>
        </div>
        <!-- // 4월 수정 : 내용 추가 -->
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
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupCardStatement",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '신용카드 매출전표 < 마이페이지 < %s'
  },
  props: {
    tdrStatRslt: Object,
  },
  mixins: [LayerPopupMixin],
  data() {
    return {
      cardTdrRslt: {},
      cardPayHistory: {},
      selrInfoRslt: {},
      fcInfoRslt: {},
      sumSupplSalesAmt: 0,
      sumTaxAmt: 0,
      sumTdrShareAmt: 0,
      paramData: this.$route.params.paramData, // 결제수단코드(2)+결제수단상세코드(2)+공급업체코드
      urlParam: {
        ordId: this.$route.params.ordId, // 주문ID
        ordDt: this.$route.params.ordDt, // 주문일
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
      if (this.paramData !== undefined || this.paramData !== null) {
        this.urlParam.tdrMeansCd = StringUtils.trim(this.paramData).substring(0, 2);
        this.urlParam.tdrMeansDtlCd = StringUtils.trim(this.paramData).substring(2, 4);
        this.urlParam.supplFirmCd = StringUtils.trim(this.paramData).substring(4);
      } else {
        this.modalActiveEvent('popupCardStatement');
      }
      // 신용카드사 별 매출전표 정보 조회
      this.retrieveSalesSlipInfo();
    },
    popupCloseAction() {
      this.$emit('popupEvent', 'popupCardStatement');
      this.modalActiveEvent('popupCardStatement');
    },
    toComma(x) {
      return NumberUtils.toComma(Math.floor(Number(x)));
    },
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    toFormat(x, y) {
      return ( DateUtils.format(x, y) == 'Invalid Date' ? '' : DateUtils.format(x, y) );
    },
    async retrieveSalesSlipInfo() { // 신용카드사 별 매출전표 정보 조회
      const params = {
        ordId: (this.tdrStatRslt != null ? this.tdrStatRslt.ordId : this.urlParam.ordId), // 주문ID
        ordDt: (this.tdrStatRslt != null ? this.tdrStatRslt.ordDt : this.urlParam.ordDt), // 주문일시
        // storId: this.tdrStatRslt.storId, // 매장ID
        supplFirmCd: (this.tdrStatRslt != null ? this.tdrStatRslt.supplFirmCd : this.urlParam.supplFirmCd), // 공급업체코드
        tdrMeansCd: (this.tdrStatRslt != null ? this.tdrStatRslt.tdrMeansCd : this.urlParam.tdrMeansCd), // 결제수단코드
        tdrMeansDtlCd: (this.tdrStatRslt != null ? this.tdrStatRslt.tdrMeansDtlCd : this.urlParam.tdrMeansDtlCd), // 결제수단상세코드
      };
      console.log('input param');
      console.log(params);
      const res = await ApiUtils.get('/fo/cs/recptmgnt/net-sale-slip-info', params);
      if (res.data === null || !res.data.success) {
        return;
      }
      console.log('응답 메시지');
      console.log(res.data);
      this.cardTdrRslt = res.data.data.cardTdrRslt; // 카드결제결과
      this.cardPayHistory = res.data.data.cardPayHistoryList; // 카드결제이력
      this.selrInfoRslt = res.data.data.selrInfoRslt; // 판매자정보결과
      this.fcInfoRslt = res.data.data.fcInfoRslt; // 가맹점정보결과

      // 카드결제이력 정보 가공
      // 09.17 오픈 후 결제이력은 우선은 숨김처리함
      // if (this.cardPayHistory != null) {
      //   this.cardPayHistory.forEach( el => {
      //     console.log("계산 :: ");
      //     console.log(el);
      //     if (el.priceFlag == '-') {
      //       this.sumSupplSalesAmt -= Number(el.supplSalesAmt);
      //       this.sumTaxAmt -= Number(el.taxAmt);
      //       this.sumTdrShareAmt -= Number(el.tdrShareAmt);
      //     } else {
      //       this.sumSupplSalesAmt += Number(el.supplSalesAmt);
      //       this.sumTaxAmt += Number(el.taxAmt);
      //       this.sumTdrShareAmt += Number(el.tdrShareAmt);
      //     }
      //   });
      // }
    }
  },
  mounted() {
    this.init();
    // this.modalActiveEvent('popupCardStatement');
    // // 신용카드사 별 매출전표 정보 조회
    // this.retrieveSalesSlipInfo();
  }
};
</script>
