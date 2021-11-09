<!--
views/od/SC-FO-PA-GS-MP-034
-->
<template>
  <div id="popupPersonalAgreeDetail" class="wrap-full-popup" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupPersonalAgreeDetail}, siteClass]">
    <div class="header-popup">
      <strong>개인정보 수집 및 이용 동의</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <section class="section-area">
          <div class="sub-inner-box liquor-agree-cont safe-agree-cont">
            <table class="delivery-time-table align-left" summary="개인정보 수집 및 이용 동의 상세내용 표">
              <caption>개인정보 수집 및 이용 동의 상세내용 표</caption>
              <colgroup>
                <col style="width: *">
                <col style="width: 45%;">
                <col style="width: 45%;">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">목적</th>
                  <th scope="col">항목</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" rowspan="3">주문</th>
                  <td>
                    계약사항 및 주문내역 관리
                    <ul class="list-dash">
                      <li>구매한 물품의 배송/설치 등 계약의 이행</li>
                      <li>주문/배송/거래 내역 조회 서비스</li>
                      <li>이전 배송지 조회 서비스</li>
                    </ul>
                  </td>
                  <td>
                    고객 정보(ID, CI, 성명, 주소, 연락처, 이메일주소)
                  </td>
                </tr>
                <tr>
                  <td>
                    상품 배송 및 배송지 관리
                    <ul class="list-dash">
                      <li>상품 및 경품(포인트, 쿠폰) 발송, 제품 설치</li>
                      <li>배송(반품/환불/취소) 관리, 배송지 확인</li>
                    </ul>
                  </td>
                  <td>
                    수취인 정보(성명, 주소, 연락처), 공동현관 출입번호(입력 시), 개인통관고유부호(해외직구 시)
                  </td>
                </tr>
                <tr>
                  <td>
                    전통주 구매관리(국세청 신고)
                  </td>
                  <td>
                    생년월일
                  </td>
                </tr>
                <tr>
                  <th scope="row" rowspan="3">결제</th>
                  <td>
                    주문 및 예약 상품 결제
                    <ul class="list-dash">
                      <li>대금 결제 및 포인트 적립/사용</li>
                    </ul>
                  </td>
                  <td>
                    계좌정보(은행명, 예금주, 계좌번호), 신용카드정보(카드사명, 카드번호), 포인트카드정보(제휴사명, 카드번호), 휴대폰정보(통신사, 휴대폰번호), 일반정보(가맹점명, 결제금액, 결제일시, 승인번호), GS포인트정보(GS&#38;Point, 더팝 리워즈), 이메일 주소(요청 시)
                  </td>
                </tr>
                <tr>
                  <td>
                    소득공제 서비스(현금영수증 발행)
                  </td>
                  <td>
                    휴대폰번호, 신용카드번호, 현금영수증카드번호, 사업자번호
                  </td>
                </tr>
                <tr>
                  <td>
                    결제 취소 금액 환불
                  </td>
                  <td>
                    계좌 정보(은행명, 예금주명, 계좌번호)
                  </td>
                </tr>
                <tr>
                  <th scope="row" rowspan="3">고객 불만 대응</th>
                  <td>
                    고객 불만 대응 및 오배송 처리
                    <ul class="list-dash">
                      <li>상품 구매 관련 문의사항과 반품 · 환불 등 상품 구매 관련 민원사항 상담</li>
                      <li>소비자 불만 또는 분쟁처리, 계약내용 확인</li>
                    </ul>
                  </td>
                  <td>
                    ID, CI, 성명, 연락처, 이메일 주소, 신용카드번호, 계좌정보, 서비스 이용기록(방문일시, IP, 불량 이용 기록 등), GS포인트정보(GS&#38;Point, 더팝 리워즈)
                  </td>
                </tr>
              </tbody>
            </table>
            <dl class="info-detail">
              <dt>보유 및 이용기간</dt>
              <dd>관계 법령에 의하여 일정기간 보유(5년)</dd>
              <dt>※ 동의 거부권 등에 대한 고지</dt>
              <dd>고객님께서는 개인정보 수집 및 이용에 동의를 거부하실 수 있습니다. 다만, 동의 거부시 서비스 이용이 제한됩니다.</dd>
            </dl>
          </div>
        </section>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupPersonalAgreeDetail",
  metaInfo: {
    title: 'GS 프레시몰',
    titleTemplate: '개인정보 수집 및 이용 동의 < 주문결제 < %s'
  },
  mixins: [LayerPopupMixin],
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
  },
  methods: {
    popupCloseAction() {
      this.$emit('popupAction', 'popupPersonalAgreeDetail');
      this.modalActiveEvent('popupPersonalAgreeDetail');
    },
  },
  mounted() {
    this.modalActiveEvent('popupPersonalAgreeDetail');
  }
};
</script>
