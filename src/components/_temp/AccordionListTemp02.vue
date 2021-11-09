<template>
<ul class="list-accordion">
  <li>
    <button id="faq02" class="btn-accordion" aria-controls="faqContent02" aria-expanded="false" @click="accordionEvent">
      <p class="wrap-title" aria-label="질문">
        <span class="title">여러가지 결제수단으로 결제할 수 있나요.</span>
      </p>
    </button>
    <div id="faqContent02" class="cont-accordion" aria-labelledby="faq02" hidden="hidden">
      <p class="dsec" aria-label="답변">
        답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변
      </p>
      <a href="#" class="link-more" title="링크 바로가기">링크 바로가기</a>
    </div>
  </li>
  <li>
    <button id="faq03" class="btn-accordion" aria-controls="faqContent03" aria-expanded="false" @click="accordionEvent">
      <p class="wrap-title" aria-label="질문">
        <span class="title">여러가지 결제수단으로 결제할 수 있나요.</span>
      </p>
    </button>
    <div id="faqContent03" class="cont-accordion" aria-labelledby="faq03" hidden="hidden">
      <p class="dsec" aria-label="답변">
        답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변
      </p>
      <a href="#" class="link-more" title="링크 바로가기">링크 바로가기</a>
    </div>
  </li>
  <li>
    <button id="faq04" class="btn-accordion" aria-controls="faqContent04" aria-expanded="false" @click="accordionEvent">
      <p class="wrap-title" aria-label="질문">
        <span class="title">신용카드 무이자할부로 결제하고 싶어요.</span>
      </p>
    </button>
    <div id="faqContent04" class="cont-accordion" aria-labelledby="faq04" hidden="hidden">
      <p class="dsec" aria-label="답변">
        답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변
      </p>
      <a href="#" class="link-more" title="링크 바로가기">링크 바로가기</a>
    </div>
  </li>
  <li>
    <button id="faq05" class="btn-accordion" aria-controls="faqContent05" aria-expanded="false" @click="accordionEvent">
      <p class="wrap-title" aria-label="질문">
        <span class="title">신용카드 무이자할부로 결제하고 싶어요.</span>
      </p>
    </button>
    <div id="faqContent05" class="cont-accordion" aria-labelledby="faq05" hidden="hidden">
      <p class="dsec" aria-label="답변">
        답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변 답변
      </p>
      <a href="#" class="link-more" title="링크 바로가기">링크 바로가기</a>
    </div>
  </li>
  <li>
    <button id="faq06" class="btn-accordion" aria-controls="faqContent06" aria-expanded="false" @click="accordionEvent">
      <p class="wrap-title" aria-label="질문">
        <span class="title">여러가지 결제수단으로 결제할 수 있나요.<br/>여러가지 결제수단으로 결제할 수 있나요.</span>
      </p>
    </button>
    <div id="faqContent06" class="cont-accordion" aria-labelledby="faq06" hidden="hidden">
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
  name: "AccordionList",
  mixins: [AccordionMixin],
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>
