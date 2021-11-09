<template>
  <!-- 4월 수정 : class 삭제 -->
  <div id="popupCardStatement " class="wrap-full-popup active" role="dialog" aria-modal="true">
    <!-- : 실사용 소스 -->
    <div class="header-popup">
      <strong>신용카드 매출전표</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <!-- 4월 수정 : 내용 추가 -->
        <div class="sub-inner-box">
          <table class="tbl-type-row mt20">
            <caption>현금신용카드 매출전표영수증 상세내용</caption>
            <colgroup>
              <col style="width:62px" />
              <col style="width:auto" />
              <col style="width:62px" />
              <col style="width:auto" />
            </colgroup>
            <tbody>
              <tr>
                <!-- 4월수정 START : 클래스명 삭제 -->
                <th scope="row">승인번호</th>
                <td colspan="3">{{this.mfCardTdrRslt.pytcDealNo}}</td>
                <!-- 4월수정 END : 클래스명 삭제 -->
              </tr>
              <tr>
                <th scope="row">결제방법</th>
                <td>{{this.mfCardTdrRslt.tdrMeansNm}}</td>
                <th scope="row">거래유형</th>
                <td>승인</td>
              </tr>
              <tr>
                <th scope="row">카드종류</th>
                <td>{{this.mfCardTdrRslt.pytcCardNm}}</td>
                <th scope="row">할부유형</th>
                <td>{{this.mfCardTdrRslt.instlTypeNm}}</td>
              </tr>
              <tr>
                <!-- 4월수정 START : 클래스명 삭제 -->
                <th scope="row">카드번호</th>
                <td colspan="3">{{this.mfCardTdrRslt.cardNo}}</td>
                <!-- 4월수정 END : 클래스명 삭제 -->
              </tr>
              <tr>
                <th scope="row">주문번호</th>
                <td>{{this.mfCardTdrRslt.ordId}}</td>
                <th scope="row">거래일시</th>
                <td>{{this.mfCardTdrRslt.pytcDealApprDttm}}</td>
              </tr>
              <tr>
                <th scope="row">주문상품</th>
                <td colspan="3">{{this.mfCardTdrRslt.itemNm}}</td>
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
              <col style="width:62px" />
              <col style="width:auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">금액</th>
                <td class="txt-right">{{this.mfCardTdrRslt.supplAmt | currency}}원</td>
              </tr>
              <tr>
                <th scope="row">세금</th>
                <td class="txt-right">{{this.mfCardTdrRslt.vatAmt | currency}}원</td>
              </tr>
              <!-- 4월수정 START : 봉사료 삭제 -->
              <!-- 4월수정 END : 봉사료 삭제 -->
              <tr>
                <th scope="row">합계</th>
                <td class="txt-right bold">{{this.mfCardTdrRslt.tdrAmt | currency}}원</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="sub-inner-box">
          <div class="sub-title">
            <h2>판매자정보</h2>
          </div>
          <table class="tbl-type-row">
            <caption>판매자정보 상세내용</caption>
            <colgroup>
              <col style="width:62px" />
              <col style="width:auto" />
              <col style="width:62px" />
              <col style="width:auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">상호</th>
                <td>{{this.mfSelrInfoRslt.selrSiteNm}}</td>
                <th scope="row">
                  사업자
                  <br />등록번호
                </th>
                <td>{{this.mfSelrInfoRslt.selrTaxno}}</td>
              </tr>
              <tr>
                <th scope="row">대표자</th>
                <td>{{this.mfSelrInfoRslt.selrSiteRprpsNm}}</td>
                <th scope="row">전화번호</th>
                <td>{{this.mfSelrInfoRslt.selrTelNo}}</td>
              </tr>
              <tr>
                <th scope="row">주소</th>
                <td colspan="3">{{this.mfSelrInfoRslt.selrRoadNm}}</td>
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
              <col style="width:62px" />
              <col style="width:auto" />
              <col style="width:62px" />
              <col style="width:auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">상호</th>
                <td>{{this.mfFcInfoRslt.fcConmNm}}</td>
                <th scope="row">
                  사업자
                  <br />등록번호
                </th>
                <td>{{this.mfFcInfoRslt.fcTaxno}}</td>
              </tr>
              <tr>
                <th scope="row">대표자</th>
                <td>{{this.mfFcInfoRslt.fcRprpsNm}}</td>
                <th scope="row">전화번호</th>
                <td>{{this.mfFcInfoRslt.fcTelNo}}</td>
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
    <button class="btn-layer-close" @click="popupCloseAction" aria-label="포커스 아웃 시 팝업 닫기">
      <!-- @keydown.9="tabFocusRemove('popupCloseAction')" -->
      <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import SiteUtils from '@/common/SiteUtils';
export default {
  name: 'PopupCardStatement',
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '신용카드 매출전표 < 마이페이지 < %s',
  },
  props: {
    tdrStatRslt: Object,
  },
  filters: {
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  mixins: [LayerPopupMixin],
  data() {
    return {
      ordId: this.$route.params.ordId, // 주문ID
      supplFirmCd: this.$route.params.supplFirmCd, // 주문일
      // 마켓포카드결제결과
      mfCardTdrRslt: {
        supplAmt: 0,
        vatAmt: 0,
        tdrAmt: 0,
      },
      // 마켓포판매자정보결과
      mfSelrInfoRslt: {},
      // 마켓포가맹점정보결과
      mfFcInfoRslt: {},
    };
  },
  components: {},
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupCardStatement');
      this.modalActiveEvent('popupCardStatement');
    },
    async retrieveSalesSlipInfo() {
      const params = {
        ordId: this.tdrStatRslt != null ? this.tdrStatRslt.ordId : this.ordId,
        supplFirmCd:
          this.tdrStatRslt != null
            ? this.tdrStatRslt.supplFirmCd
            : this.supplFirmCd,
      };
      const res = await ApiUtils.get('/fo/cs/mf/ccard-sales-slip-information', {
        ...params,
      });
      if (res.data === null || res.data.data.mfCardTdrRslt === null) {
        this.$gsdialog.alert('잘못된 접근 입니다.');
        location.href = SiteUtils.marketformo('/');
        return;
      }
      const cardInfo = res.data.data;
      if (cardInfo) {
        // 마켓포카드결제결과
        this.mfCardTdrRslt = cardInfo.mfCardTdrRslt;
        // 마켓포판매자정보결과
        this.mfSelrInfoRslt = cardInfo.mfSelrInfoRslt;
        // 마켓포가맹점정보결과
        this.mfFcInfoRslt = cardInfo.mfFcInfoRslt;
      }
    },
    init() {
      this.retrieveSalesSlipInfo();
    },
  },
  mounted() {
    this.init();
    // this.modalActiveEvent('popupCardStatement');
  },
};
</script>
