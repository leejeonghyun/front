<!--
Design: views\ss\SC-FO-SS-GF-MP-858.vue
Pg id: PG-FO-CS-O010
#Uri: /cs/orddeliv/cash_recpt
-->
<!--
마이페이지  주문배송조회  주문배송 상세 SC-FO-SS-GF-MP-858  PG-FO-CS-O010 CashRecpt       현금영수증
-->

<template>
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
              <col style="width:62px">
              <col style="width:auto">
              <col style="width:62px">
              <col style="width:auto">
            </colgroup>
            <tbody>
              <tr>
                <th scope="row" class="bold">승인번호</th>
                <td colspan="3" class="bold">12313456546</td>
              </tr>
              <tr>
                <th scope="row">증빙용도</th>
                <td>개인소득공제</td>
                <th scope="row">발급유형</th>
                <td>자진발급분</td>
              </tr>
              <tr>
                <th scope="row">주문번호</th>
                <td>20132569A</td>
                <th scope="row">거래일시</th>
                <td>2019.12.31 09:40</td>
              </tr>
              <tr>
                <th scope="row">주문상품</th>
                <td colspan="3">
                  상품명 전체 노출<br>
                  상품명 전체 노출<br>
                  상품명 전체 노출
                </td>
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
                <td class="txt-right">50,0000원</td>
              </tr>
              <tr>
                <th scope="row">세금</th>
                <td class="txt-right">5,000원</td>
              </tr>
              <tr>
                <th scope="row">봉사료</th>
                <td class="txt-right">0원</td>
              </tr>
              <tr>
                <th scope="row">합계</th>
                <td class="txt-right bold">55,000원</td>
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
              <col style="width:62px">
              <col style="width:auto">
              <col style="width:62px">
              <col style="width:auto">
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">상호</th>
                <td>㈜잇츠어스</td>
                <th scope="row">사업자 <br>등록번호</th>
                <td>123-81-00095</td>
              </tr>
              <tr>
                <th scope="row">대표자</th>
                <td>김대표</td>
                <th scope="row">전화번호</th>
                <td>055 - 1670 - 4747</td>
              </tr>
              <tr>
                <th scope="row">주소</th>
                <td colspan="3">대구 달성군 다 사읍 대실역남로 16층 </td>
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
                <td>㈜GS 리테일</td>
                <th scope="row">사업자 <br>등록번호</th>
                <td>116-81-18745</td>
              </tr>
              <tr>
                <th scope="row">대표자</th>
                <td>허연수</td>
                <th scope="row">전화번호</th>
                <td>1833 - 9779</td>
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
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupCashReceipt",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '현금영수증 < 마이페이지 < %s'
  },
  mixins: [LayerPopupMixin],
  data() {
    return {
    };
  },
  components: {
  },
  methods: {
    popupCloseAction() {
      this.$emit('popupEvent', 'popupCardStatement');
      this.modalActiveEvent('popupCardStatement');
    },
  },
  mounted() {
    this.modalActiveEvent('popupCardStatement');
  }
};
</script>
