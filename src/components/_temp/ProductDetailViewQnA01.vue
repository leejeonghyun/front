<template>
  <div class="wrap-list-qna">
    <dl>
      <dt>
        <span aria-label="문의유형">택배상품</span>
        <span class="name-date">
          <span aria-label="작성자">이*름</span>
          <span aria-label="작성일자">2019.11.29</span>
        </span>
      </dt>
      <dd aria-label="질문" class="qna-q">
        <p>물건 언제 받아요? 빨리 써야하는데요. 배송 출발했다고 하는데 원래 이렇게 오래걸립니까?</p>
      </dd>
    </dl>
    <dl>
      <dt>
        <span aria-label="문의유형">택배상품</span>
        <span class="name-date">
          <span aria-label="작성자">이*름</span>
          <span aria-label="작성일자">2019.11.29</span>
        </span>
      </dt>
      <dd aria-label="질문" class="qna-q">
        <p>물건 언제 받아요? 빨리 써야하는데요. 배송 출발했다고 하는데 원래 이렇게 오래걸립니까?</p>
      </dd>
    </dl>
    <dl>
      <dt>
        <span aria-label="문의유형">상품관련 기타</span>
        <span class="name-date">
          <span aria-label="작성자">홍*동</span>
          <span aria-label="작성일자">2019.11.29</span>
        </span>
      </dt>
      <dd aria-label="질문" class="qna-q">
        <p>물건 언제 받아요? 빨리 써야하는데요. 배송 출발했다고 하는데 원래 이렇게 오래걸립니까?</p>
        <!-- :답변 없으면 버튼 불러오지 않기 -->
        <button id="qna-q1" :class="{active: qna.qna01}" aria-controls="qna-a1" :aria-expanded="qna.qna01" @click="activeToggle('qna01')">
          <span class="hidden">답변보기</span>
        </button>
      </dd>
      <!-- :답변 없으면 전체 hidden -->
      <dd id="qna-a1" class="qna-a" aria-labelledby="qna-q1" :hidden="!qna.qna01">
        <span class="qna-a-date" aria-label="작성자">관리자 / <span aria-label="작성날짜">2019.12.02</span></span>
        <p aria-label="답변">
          안녕하세요.<br/>
          신선함의 시작, GS fresh 상품 담당자입니다.<br/><br/>
          문의하신 상품 이미지가 잘못되어 수정진행중입니다.<br/>
          이용에 불편을 드려 죄송합니다.<br/><br/>
          항상 저희 GS fresh를 이용해주셔서 감사합니다.
        </p>
      </dd>
    </dl>
    <dl>
      <dt>
        <span aria-label="문의유형">상품관련 기타</span>
        <span class="name-date">
          <span aria-label="작성자">홍*동</span>
          <span aria-label="작성일자">2019.11.29</span>
        </span>
      </dt>
      <!-- :비밀글 일 경우 -->
      <dd aria-label="질문" class="qna-q secret"><!-- secret class 추가 -->
        <p>비밀글입니다.</p>
      </dd>
    </dl>
    <dl>
      <dt>
        <span aria-label="문의유형">택배상품</span>
        <span class="name-date">
          <span aria-label="작성자">이*름</span>
          <span aria-label="작성일자">2019.11.29</span>
        </span>
      </dt>
      <dd aria-label="질문" class="qna-q">
        <p>320개와400개짜리 같이 구입했어요. 오늘 320개짜리만 배송왔는데..사은품 20개는 없어요. 확인 좀 해주세요.</p>
        <!-- :답변 없으면 버튼 불러오지 않기 -->
        <button id="qna-q4" :class="{active: qna.qna02}" aria-controls="qna-a4" :aria-expanded="qna.qna02" @click="activeToggle('qna02')">
          <span class="hidden">답변보기</span>
        </button>
      </dd>
      <!-- :답변 없으면 전체 hidden -->
      <dd id="qna-a4" class="qna-a" aria-labelledby="qna-q4" :hidden="!qna.qna02">
        <span class="qna-a-date" aria-label="작성자">관리자 / <span aria-label="작성날짜">2019.12.02</span></span>
        <p aria-label="답변">
          안녕하세요.<br/>
          신선함의 시작, GS fresh 상품 담당자입니다.<br/><br/>
          문의하신 상품 이미지가 잘못되어 수정진행중입니다.<br/>
          이용에 불편을 드려 죄송합니다.<br/><br/>
          항상 저희 GS fresh를 이용해주셔서 감사합니다.
        </p>
      </dd>
    </dl>
    <!-- 6번째 qna부터는 아래 속성 추가 v-if="moreDetail" -->
    <dl v-if="moreDetail">
      <dt>
        <span aria-label="문의유형">택배상품</span>
        <span class="name-date">
          <span aria-label="작성자">이*름</span>
          <span aria-label="작성일자">2019.11.29</span>
        </span>
      </dt>
      <dd aria-label="질문" class="qna-q">
        <p>320개와400개짜리 같이 구입했어요. 오늘 320개짜리만 배송왔는데..사은품 20개는 없어요. 확인 좀 해주세요.</p>
        <!-- :답변 없으면 버튼 불러오지 않기 -->
        <button id="qna-q5" :class="{active: qna.qna03}" aria-controls="qna-a5" :aria-expanded="qna.qna03" @click="activeToggle('qna03')">
          <span class="hidden">답변보기</span>
        </button>
      </dd>
      <!-- :답변 없으면 전체 hidden -->
      <dd id="qna-a5" class="qna-a" aria-labelledby="qna-q5" :hidden="!qna.qna03">
        <span class="qna-a-date" aria-label="작성자">관리자 / <span aria-label="작성날짜">2019.12.02</span></span>
        <p aria-label="답변">
          안녕하세요.<br/>
          신선함의 시작, GS fresh 상품 담당자입니다.<br/><br/>
          문의하신 상품 이미지가 잘못되어 수정진행중입니다.<br/>
          이용에 불편을 드려 죄송합니다.<br/><br/>
          항상 저희 GS fresh를 이용해주셔서 감사합니다.
        </p>
      </dd>
    </dl>
  </div>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: "ProductDetailViewQnA01",
  mixins: [AccordionMixin],
  props: ['moreDetail'],
  data() {
    return {
      qna: {
        qna01: false,
        qna02: false,
        qna03: false,
      },
    };
  },
  methods: {
    // toggle
    activeToggle(el) {
      this.accordionEvent();
      this.qna[el] = !(this.qna[el] != false);
    },
  },
};
</script>
