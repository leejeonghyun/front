<template>
  <div class="detail-view required">
    <button id="required-info" class="detail-view-toggle-heading" :class="{active: requiredInfo}" aria-controls="required-info-contents" :aria-expanded="requiredInfo" @click="accordionEventAction">
      <span role="heading" aria-level="4">상품필수정보</span>
    </button>
    <div id="required-info-contents" class="detail-view-toggle-contents" aria-labelledby="required-info" :hidden="!requiredInfo">
      <dl>
        <dt>상품코드</dt>
        <dd>2345001641516</dd>
      </dl>
      <dl>
        <dt>상품구성</dt>
        <dd>연시 5~6(팩)</dd>
      </dl>
      <dl>
        <dt>생산자/수입자</dt>
        <dd>서울청과</dd>
      </dl>
      <dl>
        <dt>원산지</dt>
        <dd>국산</dd>
      </dl>
      <dl>
        <dt>재고수량</dt>
        <dd>24</dd>
      </dl>
      <dl>
        <dt>쇼핑대행료</dt>
        <dd>2,500원 (30,000원 이상 구매시 무료)<br/>단, 쇼핑대행료 기준은 배송지역에 따라 상이함</dd>
      </dl>
      <dl>
        <dt>제조연월일</dt>
        <dd>
          <p>GS 프레시몰 상품은 매장별로 매입기간이 상이하므로, 제조년원일, 유통기한 또는 품질유지기한이 파악</p>
          <p>정확한 내용을 확인하시려면 구매하실 매장으로 문의주시기 바랍니다.</p>
        </dd>
      </dl>
      <dl>
        <dt>유통기한 또는 품질유지기한</dt>
        <dd>
          <p>GS 프레시몰 상품은 매장별로 매입기간이 상이하므로, 제조년원일, 유통기한 또는 품질유지기한이 파악되지 않습니다.</p>
          <p>정확한 내용을 확인하시려면 구매하실 매장으로 문의주시기 바랍니다.</p>
        </dd>
      </dl>
      <dl>
        <dt>관련법상<br/>표시사항</dt>
        <dd>해당사항 없음</dd>
      </dl>
      <dl>
        <dt>보관방법 또는<br/>취급방법</dt>
        <dd>서늘한 곳에 보관</dd>
      </dl>
      <dl>
        <dt>소비자상담<br/>관련 전화번호</dt>
        <dd>GS 프레시몰 1661-2562</dd>
      </dl>
    </div>
  </div>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "ProductDetailViewRequired",
  mixins: [AccordionMixin],
  data() {
    return {
      requiredInfo: false,
    };
  },
  methods: {
    accordionEventAction() {
      this.accordionEvent();
      this.requiredInfo = !this.requiredInfo;
    },
  }
};
</script>
