  <template>
  <div id="popupMobileBill" class="wrap-full-popup active" role="dialog" aria-modal="true">
    <!-- : 실사용 소스 -->
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
            <button type="button" class="btn-border btn-small">이미지저장</button>-->
          </div>
          <!-- 4월 수정 : class 추가 -->
          <dl class="detail-breakdown order-top">
            <dt>주문 번호</dt>
            <dd>{{this.mfOrdInfo.ordId}}</dd>
            <dt class="order-date">주문 일자</dt>
            <dd>{{this.mfOrdInfo.ordDttm}}</dd>
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
              <dd>
                {{this.mfOrdInfoRslt.ordpsNm}}
                <span class="line">{{this.mfOrdInfoRslt.webId}}</span>
              </dd>
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
              <!-- START : 당일배송 -->
              <table
                class="tbl-type-col"
                v-for="(mallList, index) in this.mfOrdInfo.mfOrdMallList"
                :key="index"
              >
                <caption>당일배송 주문상품 상세내용</caption>
                <colgroup>
                  <col style="width:auto" />
                  <col style="width:20%" />
                  <col style="width:25%" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">
                      <span class="point">{{mallList.mallNm}}</span> 상품명/옵션
                    </th>
                    <th scope="col">수량</th>
                    <th scope="col">구매금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="ordProductList in mallList.mfOrdDtlList"
                    :key="ordProductList.ordDtlSeqno"
                  >
                    <td>
                      <p :class="ordProductList.itemTaxTypeCd != '0'? 'asterisk' : ''">
                        <span class="hidden">비과세 상품</span>
                        {{ordProductList.itemNm}}
                      </p>
                    </td>
                    <td class="center">{{ordProductList.ordQty}}</td>
                    <td class="right">{{ordProductList.salesAmt | currency}} 원</td>
                  </tr>
                </tbody>
              </table>
              <!-- END : 당일배송 -->
            </div>
            <!-- START : 최종 결제금액 -->
            <div class="popup-bill" v-if="this.mfOrdInfoRslt">
              <div class="total-payment bill-payment">
                <ul class="accordion-payment border">
                  <li>
                    <p class="tit-accordion">
                      면세품 가액
                      <span class="price">
                        <strong>{{this.mfOrdInfoRslt.ftaxSalesAmt | currency}}</strong> 원
                      </span>
                    </p>
                  </li>
                  <li>
                    <p class="tit-accordion">
                      과세물품 가액
                      <span class="price">
                        <strong>{{this.mfOrdInfoRslt.taxSalesAmt | currency}}</strong> 원
                        <em>(부가세 {{this.mfOrdInfoRslt.taxSalesVatAmt | currency}} 원 포함)</em>
                      </span>
                    </p>
                  </li>
                  <li>
                    <p class="tit-accordion">
                      상품구매합계
                      <span class="price">
                        <strong>{{this.mfOrdInfoRslt.itemSalesAmt | currency}}</strong> 원
                        <em>(부가세 {{this.mfOrdInfoRslt.taxSalesVatAmt | currency}} 원 포함)</em>
                      </span>
                    </p>
                  </li>
                  <li>
                    <p class="tit-accordion">
                      총 배송비
                      <span class="price">
                        <strong>{{this.mfOrdInfoRslt.dlfeeAmt | currency}}</strong> 원
                        <em>(부가세 {{this.mfOrdInfoRslt.dlfeeVatAmt | currency}} 원 포함)</em>
                      </span>
                    </p>
                  </li>
                  <li>
                    <p class="tit-accordion total-price">
                      최종결제금액
                      <!-- 4월 수정 : class 삭제 -->
                      <span class="price">
                        <strong>{{this.mfOrdInfoRslt.itemSalesAmt + this.mfOrdInfoRslt.dlfeeAmt | currency}}</strong> 원
                        <em>(부가세 {{this.mfOrdInfoRslt.taxSalesVatAmt + this.mfOrdInfoRslt.dlfeeVatAmt | currency}} 원 포함)</em>
                      </span>
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
        <section class="section" v-if="this.mfTdrMeansInfoDto.length > 0">
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>결제내역</h2>
            </div>
            <div v-for="(tdrMeansInfo, index) in this.mfTdrMeansInfoDto" :key="index">
              <p class="info-detail">
                <span class="date">{{tdrMeansInfo.tdrDt}}</span>
                {{tdrMeansInfo.lastTdrMeansNm}}{{tdrMeansInfo.lastSubTdrNm}}
              </p>
              <!-- START : 결제내역 -->
              <table class="tbl-type-col">
                <caption>결제내역 상세내용</caption>
                <colgroup>
                  <col style="width:auto" />
                  <col style="width:23%" />
                  <col style="width:25%" />
                  <col style="width:33%" />
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
                  <tr v-for="(tdrSateData, index) in tdrMeansInfo.tdrSateList" :key="index">
                    <td>{{tdrSateData.supplFirmNm}}</td>
                    <td>{{tdrSateData.fcNm}}</td>
                    <td
                      class="center"
                    >{{defaultNumber(tdrSateData.tdrShareAmt)| currency}} {{tdrSateData.amtSpNm}}</td>
                    <td class="center" v-if="tdrSateData.tdrMeansCd == '02'">
                      <button
                        type="button"
                        class="btn-border btn-small"
                        @click="popupCardStatementAction(tdrMeansInfo.ordId,tdrSateData.supplFirmCd, tdrSateData.tdrShareAmt)"
                      >신용카드매출전표</button>
                    </td>
                    <td
                      class="center"
                      v-else-if="(tdrSateData.tdrMeansCd == '01' && tdrSateData.tdrMeansDtlCd != '20' && tdrSateData.cashRecptIssuYn == 'Y') || (tdrSateData.tdrMeansCd == '13' && tdrSateData.cashRecptIssuYn == 'Y')"
                    >
                      <button
                        type="button"
                        class="btn-border btn-small"
                        aria-label="현금영수증 팝업활성화"
                        @click="popupCashReceiptAction(tdrMeansInfo.ordId,tdrSateData.supplFirmCd, tdrSateData.tdrShareAmt)"
                      >현금영수증</button>
                    </td>
                    <td class="center" v-else>비대상</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <!-- START : 수기환불내역 -->
        <section v-if="this.mfHandRefndInfoDto.length > 0">
          <div class="sub-inner-box">
            <div class="sub-title">
              <h2>수기환불내역</h2>
            </div>
            <div v-for="(handRefndInfo, index) in this.mfHandRefndInfoDto" :key="index">
              <p class="info-detail">
                <span class="date">{{handRefndInfo.refndDt}}</span>
                {{handRefndInfo.refndTitle}}
              </p>
              <!-- START : 수기환불내역 -->
              <table class="tbl-type-col">
                <caption>수기환불내역 상세내용</caption>
                <colgroup>
                  <col style="width:auto" />
                  <col style="width:23%" />
                  <col style="width:25%" />
                  <col style="width:33%" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">판매자</th>
                    <th scope="col">가맹점</th>
                    <th scope="col">금액</th>
                    <th scope="col">증빙발급</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{handRefndInfo.fcNm}}</td>
                    <td>{{handRefndInfo.supplFirmNm}}</td>
                    <td
                      class="center"
                    >-{{handRefndInfo.refndAmt | currency}} {{handRefndInfo.amtSpNm}}</td>
                    <td class="center">비대상</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <!-- END : 수기환불내역 -->
        <PopupCardStatement
          :tdrStatRslt="tdrStatRslt"
          @popupEvent="popupAction('popupCardStatement')"
          v-if="this.popup.popupCardStatement"
        />
        <!-- 팝업 - 신용카드 매출전표 -->
        <PopupCashReceipt
          :tdrStatRslt="tdrStatRslt"
          @popupEvent="popupAction('popupCashReceipt')"
          v-if="this.popup.popupCashReceipt"
        />
        <!-- END : 결제내역 -->
        <ul class="list-type-dot-bg mg0">
          <!-- 4월 수정 : 내용 변경 -->
          <li>본 영수증은 증빙용으로 활용할 수 없으므로 법적 증빙서류가 필요하신 경우는 현금영수증, 신용카드 매출전표를 확인해주세요.</li>
        </ul>
        <!-- 4월 수정 : 하단 버튼 추가 -->
        <div class="bottom-btn-area">
          <gs-link to="/cs/orddeliv/ord_deliv_list" class="btn-md btn-bg darkgray">주문/배송조회</gs-link>
          <!-- 4월수정 START : 버튼 텍스트 수정 -->
          <button type="button" class="btn-md btn-bg lightgreen" @click="sendEmail">이메일 전송</button>
          <!-- 4월수정 END : 버튼 텍스트 수정 -->
        </div>
        <!-- // 4월 수정 : 하단 버튼 추가 -->
      </div>
      <!-- START : 2020.02.20 태그 변경 -->
      <!--
      <a href="/dp/ssevnt_detail?ssevntId=2030" class="link-banner">
        <img src="@/assets/images/_temp/_img_banner_bill.jpg" alt="회원가입하면 베스트 상품 100원 부터!" />
      </a>
      -->
      <!-- END : 2020.02.20 태그 변경 -->
    </div>
    <button
      class="btn-layer-close"
      @click="popupCloseAction"
      @keydown.9="tabFocusRemove('popupCloseAction')"
      aria-label="포커스 아웃 시 팝업 닫기"
    >
      <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import PopupCardStatement from '@/views/cs/recptmgnt/MfPopupCardStatement'; //  팝업 - 신용카드 매출전표
import PopupCashReceipt from '@/views/cs/recptmgnt/MfPopupCashReceipt'; //  팝업 - 현금영수증

import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import ClaimMsg from '@/components/mypage/cs/ClaimMsg.vue';

export default {
  name: 'PopupMobileBill',
  metaInfo: {
    title: 'MarketFor:',
    /* 4월수정 START : 페이지명 변경 */
    titleTemplate: '전자영수증 < 마이페이지 < %s',
    /* 4월수정 END : 페이지명 변경 */
  },
  mixins: [LayerPopupMixin],
  data() {
    return {
      popup: {
        // 팝업
        open: false,
        popupCardStatement: false,
        popupCashReceipt: false,
      },
      ordId: this.$route.params.ordId, // 주문ID
      mfOrdInfoRslt: {
        ftaxSalesAmt: 0,
        taxSalesAmt: 0,
        itemSalesAmt: 0,
        dlfeeAmt: 0,
        taxSalesVatAmt: 0,
        dlfeeVatAmt: 0,
      },
      tdrStatRslt: {},
      mfOrdInfo: {},
      // 마켓포결제수단정보
      mfTdrMeansInfoDto: [],
      // 마켓포업체결제수단정보
      mfFirmTdrMeansInfoDto: [],
      // 수기환불정보
      mfHandRefndInfoDto: [],
    };
  },
  filters: {
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  components: {
    PopupCardStatement, // 팝업 - 신용카드 매출전표
    PopupCashReceipt, // 팝업 - 현금영수증
  },
  methods: {
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    popupCloseAction() {
      this.$emit('popupEvent', 'popupMobileBill');
      this.modalActiveEvent('popupMobileBill');
    },
    popupCardStatementAction(ordId, supplFirmCd, tdrShareAmt) {
      // 2021.04.02 수정
      if (tdrShareAmt == null || tdrShareAmt == 0) {
        this.$gsdialog.alert('결제가 모두 취소되었습니다.');
        return;
      }
      this.tdrStatRslt.ordId = ordId;
      this.tdrStatRslt.supplFirmCd = supplFirmCd;
      this.popupAction('popupCardStatement');
    },
    // 현금 영수증
    popupCashReceiptAction(ordId, supplFirmCd, tdrShareAmt) {
      // 2021.04.02 수정
      if (tdrShareAmt == null || tdrShareAmt == 0) {
        this.$gsdialog.alert('결제가 모두 취소되었습니다.');
        return;
      }
      this.tdrStatRslt.ordId = ordId;
      this.tdrStatRslt.supplFirmCd = supplFirmCd;
      this.popupAction('popupCashReceipt');
    },
    defaultNumber(number) {
      return StringUtils.isEmpty(number) ? 0 : number;
    },
    async sendEmail() {
      const $vm = this;
      const params = {
        ordId: this.ordId,
      };
      await ApiUtils.post('/fo/cs/mf/electron-receipt-email-transmission', {
        ...params,
      })
        .then(res => {
          if (res.data === null) {
            $vm.$gsdialog.alert(ClaimMsg.errSendEmail);
            return;
          }
          if (res.data.statusCode === '6000') {
            $vm.$gsdialog
              .confirm(ClaimMsg.mfConfirmEmail, { html: true })
              .then(function(dialog) {
                $vm.$router.push('/cu/password_re_check');
              });
          } else {
            $vm.$gsdialog.alert(ClaimMsg.sendEmail);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    async retrieveMobilRecptInfo() {
      const params = {
        ordId: this.ordId,
      };
      await ApiUtils.get('/fo/cs/mf/electron-receipt-information', {
        ...params,
      })
        .then(res => {
          if (res.data === null || !res.data.success) {
            return;
          }
          // 마켓포 주문 정보
          this.mfOrdInfo = res.data.data.mfOrd;
          this.mfOrdInfoRslt = res.data.data.mfOrdInfoRslt;
          // 마켓포결제수단정보
          this.mfTdrMeansInfoDto = res.data.data.mfTdrMeansInfoDto;
          // 수기환불정보
          this.mfHandRefndInfoDto = res.data.data.mfHandRefndInfoDto;
        })
        .catch(err => {
          console.error(err);
        });
    },
  },
  mounted() {
    this.modalActiveEvent('popupMobileBill');
    // 모바일영수정(전자영수증) 상세 정보 조회
    this.retrieveMobilRecptInfo();
  },
};
</script>
