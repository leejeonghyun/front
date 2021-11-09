<template>
  <section class="section-area accordion-wrap agree-info-wrap mypage block">
    <div class="sub-title tit-accordion order_agree_btnbox" style="border-bottom: none; margin-bottom: 20px;">
      <div class="agree_flex">
        <label>위 주문 내용을 확인하였으며, 회원 본인은 결제에 동의합니다.</label><!-- 2021.03.18 문구수정 -->
        <button aria-label="이용약관 팝업 활성화" aria-haspopup="dialog"  @click="popupEventActive('popupRule')">보기</button>
      </div>
    </div>
  </section>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "OrderAgreement",
  props: {
    productItems: Array,
    strInfo: Object,
    tab: Object,
  },
  data() {
    return {
      liqItemYn: 'N',
      allChecked: false,
      agreeInfos: ['agree-info3', 'agree-info4', 'agree-info6'],
      agreeInfo: [],
      liqItemChk: false,
      pkupChk: false,
    };
  },
  watch: {
    productItems: function() {
      this.agreementDo();
    },
  },
  mixins: [AccordionMixin],
  components: {},
  methods: {
    popupEventActive(popId) {
      this.$emit('popupAction', popId);
    },
  },
  destroyed() {},
  mounted() {
    // 이용약관 및 수집동의 조건은 True로 한다.
    this.$emit('orderAgreeChk', true, true, true);
  },
};
</script>
