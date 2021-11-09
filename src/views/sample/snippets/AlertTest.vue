<template>
  <div class="wrap-common">
    <ol>
      <button @click="alertPop">alert</button>
      <hr />
      <button @click="confirmPop">confirm</button>
      <hr />
      <button @click="confirmHtmlPop">confirm html</button>
      <hr />
    </ol>
    <hr />
    <h1>Error Test</h1>
    <ol>
      <button @click="call401">401</button>
      <hr />
      <button @click="call403">403</button>
      <hr />
    </ol>

  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';

export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    alertPop() {
      this.$gsdialog.alert('문의가 취소 되었습니다.', {header: ''})
      .then(dialog => {
        console.log('done');
      });
    },
    confirmPop() {
      this.$gsdialog.confirm('문의를 저장할까요?', {header: ''})
      .then(dialog => {
        console.log('done');
      })
      .catch(e => {
        console.log('canceled');
      });
    },
    async confirmHtmlPop() {
      const confirmMsg = `<div>
          <ul>
            <li>모든 상품이 결제완료 단계일 경우에만 전체 주문 취소가 가능합니다.</li>
            <li>주문 시 사용하신 장바구니 쿠폰은 재사용 가능합니다. (단 쿠폰 기간에 한함)</li>
            <li>취소 후 재구매 시 상품 가격은 변동될 수 있습니다.</li>
          </ul>
        </div>`;
      const response = await this.$gsdialog.confirm(confirmMsg, {html: true, header: '주문을 취소하시겠습니까?'});
      console.log(response);
    },
    async call401() {
      const response = await ApiUtils.get('/fo/cu/example/err401');
      console.log(response);
    },
    async call403() {
      const response = await ApiUtils.get('/fo/cu/example/err403');
      console.log(response);
    },

  },
};
</script>
