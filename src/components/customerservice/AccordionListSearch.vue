<template>
  <ul class="list-accordion">
    <li>
      <button id="faq01" class="btn-accordion" aria-controls="faqContent01" aria-expanded="false" @click="accordionEvent">
        <p class="wrap-title" aria-label="질문">
          <span class="title">
            <span aria-label="카테고리명">주문결제</span>주문한 상품을 <strong>취소</strong>하려면 이렇게 하면 됩니다.</span>
        </p>
      </button>
      <div id="faqContent01" class="cont-accordion" aria-labelledby="faq01" hidden="hidden">
        <p class="dsec" aria-label="답변">
          답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변
        </p>
        <a href="#" class="link-more" title="링크 바로가기">링크 바로가기</a>
      </div>
    </li>
  </ul>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "AccordionList02",
  mixins: [AccordionMixin],
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>
