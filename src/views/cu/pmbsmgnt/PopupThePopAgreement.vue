<template>
  <!-- <div id="popupThePopAgreement" class="wrap-full-popup active" role="dialog" aria-modal="true"> -->
  <!-- : 실사용 소스 -->
  <div id="popupThePopAgreement" class="wrap-full-popup" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupThePopAgreement}, siteClass]">
    <div class="header-popup">
      <strong>THE POP+ 이용약관 동의</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="wrap-terms-type">
          <section class="terms-section">
            <h6>제1조(목적)</h6>
            <p>본 약관은 주식회사 GS리테일(이하 회사)에서 제공하는 더팝플러스(이하 THE POP+) 서비스를 이용함에 있어 회원과 회사 사이의 권리, 의무 및 책임사항 등을 규정하는데 그 목적이 있습니다.</p>
          </section>
          <section class="terms-section">
            <h6>제2조(용어의 정의)</h6>
            <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
            <ul class="terms-list depth1">
              <li>
                ① &apos;회원&apos;이란 GS리테일 멤버십(THE POP) 약관에 동의하고 가입한 회원을 말합니다.
              </li>
              <li>
                ② &apos;THE POP+ 서비스&apos;란 이용자가 이 약관에 동의하고 회사에 소정의 이용료를 결제하여 가입할 수 있는 서비스 제도를 말합니다.
                <ul class="terms-list depth2">
                  <li>- 달리살다 채널에서 운영되는 THE POP+ 서비스는 '달리드림 멤버십'란 명칭으로 운영됩니다.</li>
                </ul>
              </li>
              <li>
                ③ &apos;THE POP+ 회원&apos;이란 GS리테일 회원 중 본 약관에 동의하고 THE POP+ 서비스에 대한 이용료를 납부한 회원을 말합니다.
              </li>
              <li>
                ④ &apos;이용료&apos;란 THE POP+ 서비스 이용을 위한 결제 금액으로 THE POP+ 서비스 상품에 따라 이용료는 상이합니다.
              </li>
              <li>
                ⑤ &apos;THE POP+ 서비스 상품&apos;은 GS리테일에서 제공하는 재화 중 THE POP+ 회원 대상으로 혜택을 제공하는 특정 상품 혹은 카테고리를 지칭하며, THE POP+ 서비스 상품별로 서비스는 다르게 운영됩니다.
              </li>
              <li>
                ⑥ &apos;선물하기&apos;란 회원의 이용료 부담으로 THE POP+ 서비스를 제 3자에게 제공할 수 있는 서비스를 말합니다.
              </li>
            </ul>
          </section>
          <section class="terms-section">
            <h6>제3조(약관의 효력 및 변경)</h6>
            <ul class="terms-list depth1">
              <li>
                ① 본 약관은 회사의 모바일 어플리케이션 내 게시하는 방법으로 회원에게 제시, 설명되고 회원이 본 약관에 동의함으로써 그 효력이 발생됩니다.
              </li>
              <li>
                ② 회사는 법률에 위배되지 않는 범위 내에서 약관을 개정할 수 있으며 개정된 약관의 적용일자 및 개정사유를 적용일 7일전(회원에게 불리한 내용으로 변경하는 경우 30일전)까지 서비스화면을 통하여 공지합니다.
              </li>
              <li>
                ③ 본 조의 규정에 의하여 개정된 약관 및 변경된 서비스는 효력 발생일로부터 적용됩니다.
              </li>
            </ul>
          </section>
          <section class="terms-section">
            <h6>제4조(회원가입)</h6>
            <ul class="terms-list depth1">
              <li>
                ① GS리테일 회원에 한하여 회사의 서비스화면을 통하여 가입할 수 있습니다. 다만, 일부 고객의 경우 THE POP+ 서비스 가입 및 이용이 제한될 수 있습니다.
              </li>
              <li>
                ② GS리테일 회원에 한하여 본 약관에 동의하고, THE POP+ 서비스 이용료를 결제함으로써 가입할 수 있습니다. 단, 2개 이상의 THE POP+ 서비스 상품을 이용하고자하는 경우에는 상품별로 이용료를 결제해야합니다.
              </li>
              <li>
                ③ 회원은 THE POP+ 서비스 상품별 월 1회에 한하여 서비스를 가입하여야 하며, 이를 위반한 경우 계약해지 등 불이익이 생길 수 있습니다. (동일 상품 중복 가입 불가)
              </li>
            </ul>
          </section>
          <section class="terms-section">
            <h6>제5조(서비스 혜택)</h6>
            <ul class="terms-list depth1">
              <li>
                ① THE POP+ 회원에게는 서비스 상품 구매 시 할인 등의 혜택을 제공합니다. 단, 서비스 혜택은 회사 정책에 따라 추후 실시, 변경될 수 있습니다.
              </li>
              <li>
                ② THE POP+ 서비스 혜택은 결제일 기준 30일 단위로 제공되며 기간 내 잔여 혜택은 이월되지 않습니다.
              </li>
              <li>
                ③ THE POP+ 서비스 상품별 혜택은 서비스화면을 통해 고지합니다.
              </li>
            </ul>
          </section>
          <section class="terms-section">
            <h6>제6조(서비스 이용 기간)</h6>
            <ul class="terms-list depth1">
              <li>
                ① 회사는 회원에게 THE POP+ 서비스 무료 이용 기간을 제공할 수 있으며 상품별로 상이하게 운영됩니다. 상품별 상세 내용에 대한 안내는 서비스화면을 통해 확인할 수 있습니다. (단, THE POP+ 서비스 상품별로 무료 이용 기간이 제공되지 않을 수도 있습니다.)
              </li>
              <li>
                ② THE POP+ 회원은 THE POP+ 서비스 상품 이용료를 결제한 즉시 이용 가능하며, 이용료 결제일을 기준으로 이용 기간이 산정됩니다.
              </li>
              <li>
                ③ THE POP+ 서비스는 30일 이용권과 정기결제형으로 구분됩니다.
                <ul class="terms-list depth2">
                  <li>
                      1. 30일 이용권 : 30일 이용 기간에 대한 이용료를 결제 후 해당 기간이 지나면 THE POP+ 이용이 종료되는 서비스
                  </li>
                  <li>
                    2. 정기결제형 : 회원이 등록한 결제수단을 통하여 30일 단위로 이용료가 자동 결제되고 이용 기간이 자동 갱신되는 서비스
                  </li>
                </ul>
              </li>
              <li>
                ④ 2개 이상의 THE POP+ 서비스 상품을 이용하는 경우, 3항에 의거하여 상품별 서비스 이용 기간이 개별 적용됩니다.
              </li>
              <li>
                ⑤ 회원이 정기결제형을 선택하였더라도 결제가 정상적으로 이루어지지 않을 경우에는 THE POP+ 서비스 이용 기간이 갱신되지 않습니다.
              </li>
            </ul>
          </section>
          <section class="terms-section">
            <h6>제7조(이용료 결제)</h6>
            <ul class="terms-list depth1">
              <li>
                ① 회원은 회사가 정한 절차에 따라 결제 정보를 등록하여 이용료를 결제합니다.
              </li>
              <li>
                ② THE POP+ 서비스 상품 가입 시 THE POP+ 전용 할인쿠폰 및 GS리테일이 지급한 포인트(GS&amp;POINT, 리워즈 등) 사용이 가능합니다.
                <ul class="terms-list depth2">
                  <li>- 단, 포인트의 경우 정기결제형은 최초 1회에 한해 사용이 가능하며, 일부 THE POP+ 서비스는 포인트 사용이 불가할 수 있습니다.</li>
                </ul>
              </li>
              <li>
                ③ 기타 할인쿠폰, 통신사 할인, GS&amp;POINT 적립 등은 불가합니다.
              </li>
            </ul>
          </section>
          <section class="terms-section">
            <h6>제8조(선물하기)</h6>
            <ul class="terms-list depth1">
              <li>
                ① 회원은 선물하기를 통해 THE POP+ 서비스를 원하는 수신인에게 선물할 수 있습니다. 단, 정기결제형은 선물하기 서비스 이용이 불가합니다.
              </li>
              <li>
                ② 수신인이 선물을 수령하여 이용하고자 할 시에는 본 약관에 동의하여 &apos;THE POP+ 회원&apos;으로 가입하여야 합니다. 단, 수신인이 선물을 거절하거나 선물 발송 후 14일 경과 후에도 등록 혹은 거절하지 않은 경우 자동 환불 처리됩니다. (달리드림 멤버십의 경우 7일 경과 시 환불)
              </li>
            </ul>
          </section>
          <section class="terms-section">
            <h6>제9조(회원의 의무)</h6>
            <ul class="terms-list depth1">
              <li>
                ① THE POP+ 회원은 이 약관에 따른 권리·의무의 전부 또는 일부를 타인에게 대여, 양도, 위임할 수 없습니다.
              </li>
              <li>
                ② THE POP+ 회원은 타인의 개인정보 및 결제정보를 사용하여 서비스를 이용할 수 없습니다.
              </li>
              <li>
                ③ THE POP+ 회원은 이용료 정기결제를 위해 회원 본인의 개인정보를 최신으로 유지하여야 합니다.
              </li>
              <li>
                ④ THE POP+ 회원은 THE POP+ 서비스 혜택을 악용(영리 목적 및 판매 목적 등)하는 행위를 하여서는 안됩니다.
              </li>
              <li>
                ⑤ 회원이 본 조 또는 본 약관을 위반하는 경우, 회사는 회원의 서비스 이용을 제한할 수 있습니다.
              </li>
            </ul>
          </section>
          <section class="terms-section">
            <h6>제10조(서비스 해지 및 환불)</h6>
            <ul class="terms-list depth1">
              <li>
                ① 회원이 THE POP+ 서비스 이용계약을 해지하고자 할 때에는 서비스앱 또는 회사의 고객센터 등을 통해 회사에 해지 요청을 할 수 있습니다.
              </li>
              <li>
                ② THE POP+ 서비스 이용 해지는 가입 상품별로 가능하며, 이용료 환불은 본 조항 3항에 의거하여 적용됩니다.
              </li>
              <li>
                ③ 고객은 이용료 결제일로부터 7일 이내로 환불을 요청할 수 있습니다. 단, 아래의 경우에는 환불이 불가합니다.
                <ul class="terms-list depth2">
                  <li>
                    1. 고객이 무상으로 취득하거나 직접 비용을 지불하지 않은 경우(선물 포함)
                  </li>
                  <li>
                    2. 환불 요청 전 THE POP+ 서비스 혜택을 사용 한 경우(무료 증정분 포함)
                  </li>
                </ul>
              </li>
              <li>
                ④ 회사는 환불 가능하다고 판단되는 경우, 동일 결제수단으로 회원에게 환불함을 원칙으로 합니다. 단, 회사의 리워즈 사용을 통해 결제한 경우 결제시 사용한 포인트의 유효기간 만료일이 환불 신청일 이전인 경우 복원되지 않습니다.
              </li>
              <li>
                ⑤ 회원이 THE POP+ 서비스 이용 기간 중 GS리테일 멤버십(THE POP) 서비스에서 탈퇴하는 경우, THE POP+ 서비스 혜택은 즉시 중단되며, 탈퇴 후 재가입시 THE POP+ 서비스 혜택은 복구되지 않습니다.
              </li>
            </ul>
          </section>
          <section class="terms-section">
            <h6>제11조(서비스 중단)</h6>
            <ul class="terms-list depth1">
              <li>
                ① 회사는 경영환경의 변화, 정책 변경 등의 사유로 서비스를 중단할 수 있으며, 중단일 30일 전에 회원에게 공지합니다.
              </li>
              <li>
                ② 회사는 이용료 납부가 완료된 회원에 대해서는 잔여 이용 기간 동안 서비스 혜택을 제공합니다.
              </li>
              <li>
                ③ 서비스 중단 공지 후에는 추가 가입이 불가하며, 정기결제형 서비스 이용 고객의 경우 갱신이 중단됩니다.
              </li>
            </ul>
          </section>
          <section class="terms-section">
            <h6>제12조(기타)</h6>
            <p>본 약관에 규정되지 않은 사항에 관하여는 회원이 이용하는 GS리테일 멤버십(THE POP) 이용약관에 따릅니다. 단, 성격상 THE POP+ 회원에 대하여 적용될 수 없는 내용은 제외됩니다.</p>
          </section>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" aria-haspopup="dialog" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>

import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "PopupThePopAgreement",
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: 'THE POP+ 이용약관 동의 < 달리드림 멤버십 이용약관 동의 < 마이페이지 < %s'
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
  },
  methods: {
    popupCloseAction() {// closed
      this.$parent.popupAction('popupDalidreamAgree');
      this.$emit('popupEvent', 'popupThePopAgreement');
      this.modalActiveEvent('popupThePopAgreement');
    }
  },
  mounted() {
    this.modalActiveEvent('popupThePopAgreement');
  }
};
</script>
