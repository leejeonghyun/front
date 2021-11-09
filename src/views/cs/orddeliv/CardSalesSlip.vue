<!--
Design: views\ss\SC-FO-SS-GF-MP-857.vue
Pg id: PG-FO-CS-O009
#Uri: /cs/orddeliv/card_sales_slip
-->
<!--
마이페이지  주문배송조회  주문배송 상세 SC-FO-SS-GF-MP-857  PG-FO-CS-O009 CardSalesSlip  신용카드매출전표(팝업)<--!!!이게클레임인가??
-->
<template>
<!-- 4월 수정 : class 삭제 -->
  <div id="popupCardStatement " class="wrap-full-popup active" role="dialog" aria-modal="true">
    <!-- : 실사용 소스 -->
    <!-- <div id="popupCardStatement" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupCardStatement}"> -->
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
                <th scope="row">결제방법</th>
                <td>카드결제</td>
                <th scope="row">발급유형</th>
                <td>자진발급분</td>
              </tr>
              <tr>
                <th scope="row">카드종류</th>
                <td>롯데카드</td>
                <th scope="row">할부유형</th>
                <td>일시불</td>
              </tr>
              <tr>
                <th scope="row" class="bold">카드번호</th>
                <td colspan="3" class="bold">1234-1234-****-1234</td>
              </tr>
              <tr>
                <th scope="row">주문번호</th>
                <td>12313456546A</td>
                <th scope="row">발급유형</th>
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
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupCardStatement",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '신용카드 매출전표 < 마이페이지 < %s'
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
