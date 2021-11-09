<template>
  <div>
    <div class="sub-title">
      <h2>GS fresh 전국택배 <span class="required" aria-label="필수 항목">*</span></h2>
    </div>
    <div>
      <table class="delivery-time-table" summary="배송 날짜 및 배송 시간을 지정하는 표">
        <caption>배송 날짜 및 배송 시간 지정</caption>
        <colgroup>
          <col style="width: 28%;">
          <col style="width: 24%;">
          <col style="width: 24%;">
          <col style="width: 24%;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">배송시간</th>
            <th scope="col">11/25(월)</th>
            <th scope="col">11/26(화)</th>
            <th scope="col">12/27(수)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">10:00~22:00</th>
            <td>
              <span class="inp-radio small">
                <input type="radio" name="time" id="delivery-time1" value="" title="11/25(월) 10:00" checked>
              </span>
            </td>
            <td>
              <span class="inp-radio small">
                <input type="radio" name="time" id="delivery-time2" value="" title="11/26(화) 10:00">
              </span>
            </td>
            <td>
              <span class="inp-radio small">
                <input type="radio" name="time" id="delivery-time3" value="" title="11/27(수) 10:00">
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <span id="" class="wrap-select w100">
        <select id="" required title="배송기사님께 전달할 메시지를 선택">
          <option value="" disabled selected>배송기사님께 전달할 메시지를 선택해주세요.</option>
          <option value="1">메세지 1</option>
        </select>
      </span>
    </div>
    <div class="sub-title">
      <h2>심플리쿡</h2>
    </div>
    <ul class="delivery-product">
      <li><span class="date">11/30(토)도착예정</span><span class="product-name">심플리쿡) 사천식 돼지고기 숙주 볶음</span></li>
      <li><span class="date">11/30(토)도착예정</span><span class="product-name">심플리쿡) 스트립로인스테이크 스트립로인스테이크</span></li>
    </ul>
    <div class="sub-title">
      <h2>알레르망</h2>
    </div>
    <div>
      <ul class="delivery-product">
        <li>알레르망 루카스 양면차렵이불 외 <strong class="point">N</strong>개</li>
      </ul>
      <span id="" class="wrap-select w100">
        <select id="" required title="배송기사님께 전달할 메시지를 선택">
          <option value="" disabled selected>배송기사님께 전달할 메시지를 선택해주세요.</option>
          <option value="1">메세지 1</option>
        </select>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GiftDeliveryTime2",
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
