<template>
  <!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 팝업을 호출하는 페이지 안 최상위 요소에 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
  <div id="popupCardStatement " class="wrap-full-popup active" role="dialog" aria-modal="true">
    <!-- : 실사용 소스 -->
    <!-- <div id="popupCardStatement" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupCardStatement}"> -->
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
              <col style="width:62px" />
              <col style="width:auto" />
              <col style="width:62px" />
              <col style="width:auto" />
            </colgroup>
            <tbody>
              <tr>
                <!-- 4월수정 START : 클래스명 삭제 -->
                <th scope="row">승인번호</th>
                <td colspan="3">{{this.mfCashRecptInfoRslt.pytcDealNo}}</td>
                <!-- 4월수정 END : 클래스명 삭제 -->
              </tr>
              <tr>
                <th scope="row">증빙용도</th>
                <td>{{this.mfCashRecptInfoRslt.cashRecptIssuUsg}}</td>
                <th scope="row">발급유형</th>
                <td>
                  {{ (this.mfCashRecptInfoRslt.cashRecptIssuUsgSpCd == '0') ? '휴대폰번호' : '사업자번호'}}
                  <br />
                  {{this.mfCashRecptInfoRslt.isseTypeNm}}
                </td>
              </tr>
              <tr>
                <th scope="row">주문번호</th>
                <td>{{this.mfCashRecptInfoRslt.ordId}}</td>
                <th scope="row">거래일시</th>
                <td>{{this.mfCashRecptInfoRslt.dealApprDttm}}</td>
              </tr>
              <tr>
                <th scope="row">주문상품</th>
                <td colspan="3">{{this.mfCashRecptInfoRslt.itemNm}}</td>
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
                <td class="txt-right">{{this.mfCashRecptInfoRslt.supplAmt | currency}}원</td>
              </tr>
              <tr>
                <th scope="row">세금</th>
                <td class="txt-right">{{this.mfCashRecptInfoRslt.vatAmt | currency}}원</td>
              </tr>
              <tr>
                <th scope="row">합계</th>
                <td class="txt-right bold">{{this.mfCashRecptInfoRslt.tdrAmt | currency}}원</td>
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
            <li>
              현금영수증 확인 및 자진발급분 소비자 등록은 국세청 현금영수증 홈페이지 (
              <a
                href="http://www.taxsave.go.kr"
                target="_blank"
                class="point underline"
                title="새 창 열림"
              >http://www.taxsave.go.kr</a>)에서 신청하실 수 있습니다.
            </li>
            <li>현금영수증 관련 궁금한 사항은 국번없이 126번 국세상담센터에서 상담 받으실 수 있습니다.</li>
          </ul>
        </div>
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
  name: 'PopupCashReceipt',
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '현금영수증 < 마이페이지 < %s',
  },
  mixins: [LayerPopupMixin],
  props: {
    tdrStatRslt: Object,
  },
  data() {
    return {
      ordId: this.$route.params.ordId, // 주문ID
      supplFirmCd: this.$route.params.supplFirmCd, // 주문일
      mfCashRecptInfoRslt: {
        supplAmt: 0,
        vatAmt: 0,
        tdrAmt: 0,
      },
      mfSelrInfoRslt: {},
      mfFcInfoRslt: {},
    };
  },
  filters: {
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  components: {},
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupCardStatement');
      this.modalActiveEvent('popupCardStatement');
    },
    async retrieveMfCashRecptInfo() {
      const params = {
        ordId: this.tdrStatRslt != null ? this.tdrStatRslt.ordId : this.ordId,
        supplFirmCd:
          this.tdrStatRslt != null
            ? this.tdrStatRslt.supplFirmCd
            : this.supplFirmCd,
      };
      const res = await ApiUtils.get('/fo/cs/mf/cash-receipt-information', {
        ...params,
      });
      if (res.data === null || res.data.data.mfCashRecptInfoRslt === null) {
        this.$gsdialog.alert('잘못된 접근 입니다.');
        location.href = SiteUtils.marketformo('/');
        return;
      }
      const cashRecptInfo = res.data.data;
      if (cashRecptInfo) {
        this.mfCashRecptInfoRslt = cashRecptInfo.mfCashRecptInfoRslt;
        this.mfSelrInfoRslt = cashRecptInfo.mfSelrInfoRslt;
        this.mfFcInfoRslt = cashRecptInfo.mfFcInfoRslt;
      }
    },
    init() {
      this.retrieveMfCashRecptInfo();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
