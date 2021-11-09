<template>
  <section class="section-area">
    <div class="sub-title">
      <h2>상품 수령 위치 <span class="required" aria-label="필수 항목">*</span></h2>
    </div>
    <div class="sub-inner-box select-location">
      <p>
        <span id="" class="wrap-select w100">
          <select id="" title="상품 수령 위치 선택">
            <option value="">문 앞에 놓아주세요.</option>
          </select>
        </span>
      </p>
      <p class="check-area">
        <span class="inp-radio small">
          <input type="radio" name="doorlock" id="delivery-doorlock1" value="" checked>
          <label for="delivery-doorlock1" class="w125">공동현관출입번호</label>
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
  </section>
</template>

<script>
export default {
  name: "GiftDeliveryLocation",
  data() {
    return {
    };
  },
  mixins: [],
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
