<template>
  <div>
    <div class="border-bottom">
      <div class="sub-title">
        <h3>상품 수령 위치 <span class="required" aria-label="필수 항목">*</span></h3>
      </div>
      <div class="select-location">
        <p>
          <span class="wrap-select w100">
            <select id="" title="상품 수령 위치 선택">
              <option value="">문 앞에 놓아주세요.</option>
            </select>
          </span>
        </p>
        <p class="check-area">
          <span class="inp-radio small w125">
            <input type="radio" name="doorlock" id="delivery-doorlock1" value="" checked>
            <label for="delivery-doorlock1">공동현관출입번호</label>
          </span>
          <span class="inp-radio small">
            <input type="radio" name="doorlock" id="delivery-doorlock2" value="">
            <label for="delivery-doorlock2">필요 없음</label>
          </span>
        </p>
        <p>
          <input class="inp-txt w100" type="text" value="" placeholder="자세히 입력해주세요 예) #1234 호출버튼" title="공동현관출입번호 입력">
        </p>
        <div class="agreement-area">
          <p class="ico-alert2 point">입력하신 정보는 부재시 또는 비대면 배송에 사용되며 배송 완료 후 파기 됩니다.</p>
        </div>
      </div>
    </div>
    <div class="border-bottom">
      <div class="sub-title">
        <h3>결품발생 시 처리 방법 <span class="required" aria-label="필수 항목">*</span></h3>
      </div>
      <p class="check-area">
        <span class="inp-radio small w125">
          <input type="radio" name="soldoutType" id="soldout1" value="">
          <label for="soldout1">포인트로 환불</label>
        </span>
        <span class="inp-radio small w125">
          <input type="radio" name="soldoutType" id="soldout2" value="">
          <label for="soldout2">대체상품 발송</label>
        </span>
        <span class="inp-radio small">
          <input type="radio" name="soldoutType" id="soldout3" value="">
          <label for="soldout3">부분 취소</label>
        </span>
      </p>
      <ul class="txt-info-list">
        <li class="ico-alert2">부분 취소가 불가능한 결제수단으로 이용하신 경우 포인트로 환불처리 됩니다.</li>
      </ul>
      <div class="agreement-area">
        <span class="inp-chk small">
          <input type="checkbox" name="" id="agree-soldout" value="">
          <label for="agree-soldout">선택한 처리 방법 저장</label>
        </span>
      </div>
    </div>
    <div class="border-bottom">
      <div class="sub-title">
        <h3>영수증 수령 방법</h3>
      </div>
      <p class="check-area">
        <span class="inp-radio small w125">
          <input type="radio" name="bill" id="bill1" value="" checked>
          <label for="bill1">모바일 영수증 </label>
        </span>
        <span class="inp-radio small">
          <input type="radio" name="bill" id="bill2" value="">
          <label for="bill2">종이 영수증</label>
        </span>
      </p>
      <ul class="txt-info-list">
        <li class="ico-alert2 point">마지막으로 선택한 유형으로 자동으로 저장됩니다.</li>
        <li class="ico-alert2">모바일 영수증 제공으로 환경보호를 실천하고 있습니다.</li>
      </ul>
    </div>
  </div>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "GiftDeliveryRequest",
  data() {
    return {
    };
  },
  mixins: [AccordionMixin],
  components: {
  },
  methods: {
  },
  destroyed() {
  },
  mounted() {
  },
};
</script>
