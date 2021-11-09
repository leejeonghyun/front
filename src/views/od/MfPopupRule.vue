<template>
    <div id="popupRule" class="wrap-layer description-layer" role="dialog" aria-labelledby="popupRule" aria-modal="true" :class="{active : this.modalActive.popupRule}">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="inner-box">
          <div class="title">
            <h3>이용약관 동의</h3>
          </div>
          <!-- 2021.03.16 탭제거, 내용추가, 2021.04.02 scroll-area class 추가 -->
          <div class="layer-content order-rule-pop scroll-area">
            <div class="order_agree_btnbox rule_pop__box">
                <div class="agree_flex">
                    <span class="agree_txt">상품, 가격, 할인, 배송정보 동의</span>
                    <button type="button" id="rule1_acc" aria-controls="rule1_acc_cont" aria-expanded="false" @click="accordionEvent">보기</button>
                </div>
                <div id="rule1_acc_cont" class="rule_cont__box" hidden="hidden">
                    <div class="rule_scroll__box">
                        <div class="rule_scrollin__box">
                            <p class="rule_txt">주문할 상품의 상품명, 상품가격, 배송정보를 확인하였으며, 구매에 동의합니다.(전자상거래법 제8조 젤2항)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order_agree_btnbox rule_pop__box">
                <div class="agree_flex">
                    <span class="agree_txt">개인정보 수집 및 이용 동의</span>
                    <button type="button" id="rule2_acc" aria-controls="rule2_acc_cont" aria-expanded="false" @click="accordionEvent">보기</button>
                </div>
                <div id="rule2_acc_cont" class="rule_cont__box" hidden="hidden">
                    <div class="rule_scroll__box scroll-area">
                        <div class="rule_scrollin__box">
                            <p class="rule_tit">1) 목적</p>
                            <table class="rule_table">
                              <colgroup>
                                <col style="width: 20%;">
                                <col>
                              </colgroup>
                              <thead>
                                <tr>
                                  <th scope="col"></th>
                                  <th scope="col">목적</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row" rowspan="3">주문</th>
                                  <td>
                                    <dl>
                                      <dt>계약사항 및 주문내역 관리</dt>
                                      <dd>- 구매한 물품의 배송/설치 등 계약의 이행</dd>
                                      <dd>- 주문/배송/거래 내역 조회 서비스</dd>
                                      <dd>- 이전 배송지 조회 서비스</dd>
                                    </dl>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <dl>
                                      <dt>상품 배송 및 배송지 관리</dt>
                                      <dd>- 상품 및 경품(포인트, 쿠폰)발송, 제품 설치</dd>
                                      <dd>- 배송(반품/환불/취소)관리, 배송지 확인</dd>
                                      <dd>- 전통주 구매 관리(국세청 신고)</dd>
                                    </dl>
                                  </td>
                                </tr>
                                <tr>
                                  <td>전통주 구매 관리(국세청 신고)</td>
                                </tr>
                                <tr>
                                  <th scope="row" rowspan="3">결제</th>
                                  <td>
                                    <dl>
                                      <dt>주문 및 예약상품 결제</dt>
                                      <dd>- 대금 결제 및 포인트 적립/사용</dd>
                                    </dl>
                                  </td>
                                </tr>
                                <tr>
                                  <td>소득공제 서비스(현금영수증 발행)</td>
                                </tr>
                                <tr>
                                  <td>결제 취소 금액 환불</td>
                                </tr>
                                <tr>
                                  <th scope="row">고객불만대응</th>
                                  <td>
                                    <dl>
                                      <dt>고객 불만 대응 및 오배송 처리</dt>
                                      <dd>- 상품 구매 관련 문의사항과 반품•환불 등 상품구매 관련 민원사항 상담</dd>
                                      <dd>- 소비자 불만 또는 분뱅처리, 계약내용 확인</dd>
                                    </dl>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p class="rule_tit">2) 항목</p>
                            <table class="rule_table">
                              <colgroup>
                                <col style="width: 20%;">
                                <col>
                              </colgroup>
                              <thead>
                                <tr>
                                  <th scope="col"></th>
                                  <th scope="col">항목</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row" rowspan="3">주문</th>
                                  <td>고객정보(ID, CI, 성명, 주소, 연락처, 이메일 주소)</td>
                                </tr>
                                <tr>
                                  <td>수취인 정보(성명, 주소, 연락처), 공동현관 출입번호(입력시), 개인통관고유부호(해외직구 시)</td>
                                </tr>
                                <tr>
                                  <td>생년월일</td>
                                </tr>
                                <tr>
                                  <th scope="row" rowspan="3">결제</th>
                                  <td>계좌정보(은행명, 예금주, 계좌번호), 신용카드정보(카드사명, 카드번호), 포인트카드 정보(제휴사명, 카드번호), 휴대폰정보(통신사, 휴대폰번호), 일반정보(가맹점명, 결제금액, 결제일시, 승인번호), GS포인트정보(GS&Point, 더팝 리워즈), 이메일 주소(요청 시)</td>
                                </tr>
                                <tr>
                                  <td>휴대폰번호, 신용카드번호, 현금영수증카드번호, 사업자번호</td>
                                </tr>
                                <tr>
                                  <td>계좌 정보(은행명, 예금주명, 계좌번호)</td>
                                </tr>
                                <tr>
                                  <th scope="row">고객불만대응</th>
                                  <td>ID, CI, 성명, 연락처, 이메일주소, 신용카드번호, 계좌정보, 서비스 이용기록(방문일시, IP, 불량 이용 기록 등), GS포인트정보(GS&Point, 더팝 리워즈)</td>
                                </tr>
                              </tbody>
                            </table>
                            <p class="rule_tit">3) 보유 및 이용기간</p>
                            <p class="rule_txt">관계 법령에 의하여 일정기간 보유(5년)</p>
                            <p class="rule_tit">※ 동의 거부권 등에 대한 고지</p>
                            <p class="rule_txt">고객님께서는 개인정보 수집 및 이용에 동의를 거부하실 수 있습니다. 다만, 동의 거부시 서비스 이용이 제한됩니다.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order_agree_btnbox rule_pop__box">
                <div class="agree_flex">
                    <span class="agree_txt">개인정보 제3자 제공동의</span>
                    <button type="button" id="rule3_acc" aria-controls="rule3_acc_cont" aria-expanded="false" @click="accordionEvent">보기</button>
                </div>
                <div id="rule3_acc_cont" class="rule_cont__box" hidden="hidden">
                    <div class="rule_scroll__box scroll-area">
                        <div class="rule_scrollin__box">
                            <p class="rule_txt">회원의 개인정보는 당사의 개인정보취급방침에 따라  안전하게 보호됩니다.</p>
                            <ul class="rule_list">
                              <li>회사는 서비스 제공을 위하여 당사의 개인정보 취급방침의 개인정보의 수집 및 이용목적에서 고지한 범위 내에서 수집, 활용하며 그 밖의 인권침해 및 사생활 침해가 우려되는 개인정보는 일제 수집하지 않습니다.</li>
                              <li>회사가 제공하는 서비스를 통하여 주문 및 결제가 이루어진 경우 구매자 확인 및 해피콜 등 거래이행을 위하여 관련된 정보를 필요한 범위 내에서 거래 업체에게 제공합니다. </li>
                            </ul>
                            <table class="rule_table">
                              <colgroup>
                                <col>
                                <col>
                              </colgroup>
                              <thead>
                                <tr>
                                  <th scope="col">상품명</th>
                                  <th scope="col">제공받는 자</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(item, idx) in productItems" :key="`PRODUCT_ITEM_${idx}`">
                                  <td>{{item.name}}</td>
                                  <td><em>{{item.supplFirmNm}}</em></td><!-- 2021.03.18 태그 추가 -->
                                </tr>
                              </tbody>
                            </table>
                            <p class="rule_tit">제공목적</p>
                            <p class="rule_txt"><em>서비스 제공, 구매자 확인, 해피콜, 구매한 상품의 배송</em></p><!-- 2021.03.18 태그 추가 -->
                            <p class="rule_tit">제공정보</p>
                            <p class="rule_txt">주문정보, 주문자 정보(성명/연락처/주소), 고객요청사항, 상품정보, 구매자와 수취인이 다를 경우에는 수취인의 정보가 제공될 수 있습니다.</p>
                            <p class="rule_tit">3) 보유 및 이용기간</p>
                            <p class="rule_txt"><em>서비스 제공 완료 1년 후 삭제</em></p><!-- 2021.03.18 태그 추가 -->
                            <p class="rule_tit">※ 동의 거부권 등에 대한 고지</p>
                            <p class="rule_txt">개인정보 제공은 서비스 이용을 위해 꼭 필요합니다. 개인정보 제공을 거부하실 수 있으마, 이 경우 서비스 이용이 제한될 수 있습니다.</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <!-- // 2021.03.16 탭제거, 내용추가 -->
          <div class="btn-alert-bottom"><button class="btn-confirm" @click="popupAction">확인</button></div>
        </div>
        <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupRule')" aria-label="포커스 아웃 시 팝업 닫기">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
export default {
  name: "PopupRule",
  props: {
    productItems: Array,
  },
  data() {
    return {
        tab1: 0,
        tab2: 0,
        tab3: 0,
    };
  },
  mixins: [AccordionMixin, LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupRule');
      this.modalActiveEvent('popupRule');
    },
    accordionEvent() {
      const $target = event.currentTarget;
      const controls = $target.getAttribute('aria-controls');
      const expanded = $target.getAttribute('aria-expanded') === "true" ? true : false;
      if (expanded) {
        document.getElementById(controls).setAttribute('hidden', true);
        $target.innerHTML = "보기";
      } else {
        document.getElementById(controls).removeAttribute('hidden');
        $target.innerHTML = "닫기";
      }
      $target.setAttribute('aria-expanded', !expanded);
    },
  },
  mounted() {
    this.modalActiveEvent('popupRule');
  }
};
</script>
