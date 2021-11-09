<template>
  <section class="section-area accordion-wrap">
    <div class="sub-title tit-accordion">
      <h2>
        <button type="button" id="dicountAccordion" class="tit" aria-controls="dicountAccordionContent" aria-expanded="true" @click="accordionEvent">
          상품권 사용
        </button>
      </h2>
    </div>
    <div id="dicountAccordionContent" class="accordion-content" aria-labelledby="dicountAccordion">
      <div class="sub-inner-box">
        <ul class="discount-list">
          <li>
            <p>
              <span class="discount-tit">
                <strong>해피머니 상품권</strong>
              </span>
              <span class="discount-point">
                <span class="txt-use">
                  <input type="number" value="0" class="inp-txt" title="해피머니 상품권 사용할 포인트">
                  <span class="txt-p">원</span>
                </span>
                <button type="button" class="btn-border btn-bg" aria-label="결제수단 인증 팝업 활성화" aria-haspopup="dialog" @click="popupHapppyMoneyActive">사용</button>
              </span>
            </p>
          </li>
          <li>
            <p>
              <span class="discount-tit">
                <strong>도서문화 상품권</strong>
              </span>
              <span class="discount-point">
                <span class="txt-use">
                  <input type="number" value="0" class="inp-txt" title="도서문화 상품권 사용할 포인트">
                  <span class="txt-p">원</span>
                </span>
                <button type="button" class="btn-border btn-bg" aria-label="결제수단 인증 팝업 활성화" aria-haspopup="dialog" @click="popupBookActive">사용</button>
              </span>
            </p>
          </li>
        </ul>
        <p class="txt-info-list ico-alert2 point mt0">상품권 적용 시 카드 할인 및 팝할인 사용은 불가능합니다.</p>
      </div>
    </div>
  </section>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "DiscountPaper",
  data() {
    return {
    };
  },
  mixins: [AccordionMixin],
  components: {
  },
  methods: {
    // 팝업
    popupHapppyMoneyActive() {
      this.$emit('popupEvent', 'popupHapppyMoney');
    },
    popupBookActive() {
      this.$emit('popupEvent', 'popupBookLife');
    },
  },
  destroyed() {
  },
  mounted() {
  },
};
</script>
