<template>
  <dl>
    <dt>
      <!-- <span class="qna-label green" aria-label="문의상태">답변준비중</span> -->
      <span aria-label="문의유형">택배상품</span>
      <span class="name-date">
        <span aria-label="작성자">이*름</span>
        <span aria-label="작성일자">2019-11-29</span>
      </span>
    </dt>
    <!-- :비밀글 케이스 secret class 추가
    <dd aria-label="질문" class="qna-q secret">
      <p>비밀글입니다.</p>
    </dd>
     -->
    <dd aria-label="질문" class="qna-q">
      <p>물건 언제 받아요? 빨리 써야하는데요. 배송 출발했다고 하는데 원래 이렇게 오래걸립니까?</p>
      <!-- :답변 없으면 버튼 불러오지 않기 -->
      <button id="qna-q1" :class="{active: this.qna}" aria-controls="qna-a1" :aria-expanded="this.qna" @click="activeToggle">
        <span class="hidden">답변보기</span>
      </button>
    </dd>
    <!-- :답변 없으면 전체 hidden -->
    <dd id="qna-a1" class="qna-a" aria-labelledby="qna-q1" :hidden="!qna">
      <span class="qna-a-date" aria-label="작성자">관리자 / <span aria-label="작성날짜">2019.12.02</span></span>
      <p aria-label="답변">
        안녕하세요.<br/>
        신선함의 시작, GS 프레시몰 상품 담당자입니다.<br/>
        문의하신 상품 이미지가 잘못되어 수정진행중입니다.<br/>
        이용에 불편을 드려 죄송합니다.<br/>
        항상 저희 GS 프레시몰을 이용해주셔서 감사합니다.
      </p>
    </dd>
  </dl>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "ProductDetailViewQnA",
  mixins: [AccordionMixin],
  data() {
    return {
      qna: false,
    };
  },
  methods: {
    // toggle
    activeToggle() {
      this.accordionEvent();
      this.qna = !this.qna;
    },
  },
};
</script>
