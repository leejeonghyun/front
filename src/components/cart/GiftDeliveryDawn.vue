<template>
  <div>
    <div class="border-bottom">
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
            <th scope="col">11/27(수)</th>
            <th scope="col">11/28(목)</th>
            <th scope="col">11/29(금)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">01:00~07:00</th>
            <td>
              <span class="inp-radio small">
                <input type="radio" name="time" id="delivery-time1" value="" title="11/27(수) 01:00~07:00" checked>
              </span>
            </td>
            <td>
              <span class="inp-radio small">
                <input type="radio" name="time" id="delivery-time2" value="" title="11/28(목) 01:00~07:00">
              </span>
            </td>
            <td>
              <span class="inp-radio small">
                <input type="radio" name="time" id="delivery-time3" value="" title="11/29(금) 01:00~07:00">
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="delivery-msg">
        <p>
          <span id="" class="wrap-select w100">
            <select id="" required title="배송기사님께 전달할 메시지를 선택">
              <option value="" disabled selected>배송기사님께 전달할 메시지를 선택해주세요</option>
              <option value="1">메세지 1</option>
            </select>
          </span>
        </p>
        <ul class="txt-info-list">
          <li class="ico-alert2">일요일은 배송이 불가합니다.</li>
          <li class="ico-alert2">병원/시장/학교 및 기숙사/관공서는 배송이 불가합니다.</li>
          <li class="ico-alert2">23시 이후 결제시 익일 새벽배송이 불가능하며, 익일 또는 영업 휴일 다음날 배송됩니다.</li>
        </ul>
      </div>
    </div>
    <div class="border-bottom">
      <div class="sub-title">
        <h3>새벽배송 완료 알림 <span class="required" aria-label="필수 항목">*</span></h3>
      </div>
      <p class="check-area">
        <span class="inp-radio small w125">
          <input type="radio" name="dawnTime" id="dawnTime1" value="">
          <label for="dawnTime1">오전 7시 이후</label>
        </span>
        <span class="inp-radio small">
          <input type="radio" name="dawnTime" id="dawnTime2" value="">
          <label for="dawnTime2">배송 직후</label>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "GiftDeliveryDawn",
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
