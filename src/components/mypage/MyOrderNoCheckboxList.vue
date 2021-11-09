<template>
  <!-- START : list -->
  <!-- 4월 수정 START : 컴포넌트 전체 수정 -->
  <li :class="{plus: plus}">
    <dl>
      <dt>
        <p class="tit">
          <span class="wrap-title">
            <span class="prd-name">[말랭이여사] 가지말랭이가지말랭이가지말랭이가지말랭이가지말랭이가지말랭이</span>
            <!-- 합배송이 있을 경우 -->
            <i class="plus-badge">합배송</i>
          </span>
        </p>
      </dt>
      <dd class="thumb">
        <a href="#">
          <figure>
            <span v-if="plus" aria-label="혜택" class="ico-benefit">1+1</span>
            <img src="@/assets/images/_temp/_img_gift03.jpg" alt="[말랭이여사] 가지말랭이">
          </figure>
        </a>
      </dd>
      <dd class="option">
        <p class="option-info">옵션 : 선택한 옵션명 노출</p>
      </dd>
      <dd class="shop">GS 프레시몰</dd>
      <dd class="count">
        <p class="option-info">수량 1</p>
      </dd>
      <!-- 4월수정 START : 교환 상세일 경우 가격 삭제 -->
      <dd class="sale-price" aria-label="판매가격" v-if="detail !== 'exchange'">
        <span class="number-sale-price">12,680</span>
        <span class="unit-won">원</span>
      </dd>
      <!-- 4월수정 END : 교환 상세일 경우 가격 삭제 -->
    </dl>
    <!-- 4월수정 START : 옵션 이미지 있는 버전 추가, 전체 수정-->
    <!-- 심플리쿡 (checkbox 있는 경우) -->
    <div v-if="option" class="option-list include-img">
      <div class="wrap-opt">
        <figure>
          <img src="@/assets/images/_temp/_img_gift03.jpg" alt="당면 사리">
        </figure>
        <dl>
          <dt>
            <p class="tit">당면 사리</p>
          </dt>
          <dd class="option-number txt">수량 1</dd>
          <!-- 4월수정 START : 가격 삭제 -->
          <dd class="sale-price" v-if="detail !== 'exchange'">
            <span class="number-sale-price" aria-label="판매가격">500</span>
            <span class="unit-won">원</span>
          </dd>
          <!-- 4월수정 END : 가격 삭제 -->
        </dl>
      </div>
    </div>
    <!-- 증정 -->
    <div v-if="option" class="option-list include-img">
      <div class="wrap-opt">
        <a href="#">
          <figure>
            <span aria-label="혜택" class="ico-benefit gift">증정</span>
            <img src="@/assets/images/_temp/_img_gift03.jpg" alt="시금치 수제비">
          </figure>
        </a>
        <dl>
          <dt>
            <p class="tit">시금치 수제비</p>
          </dt>
          <dd class="option-number txt">수량 1</dd>
          <!-- 4월수정 START : 가격 삭제 -->
          <!-- <dd class="sale-price">
            <span class="number-sale-price" aria-label="판매가격">500</span>
            <span class="unit-won">원</span>
          </dd> -->
          <!-- 4월수정 END : 가격 삭제 -->
        </dl>
      </div>
    </div>
    <!-- 패키지 -->
    <div v-if="option" class="option-list include-img">
      <div class="wrap-opt">
        <figure>
          <img src="@/assets/images/_temp/_img_gift03.jpg" alt="선풍기">
        </figure>
        <dl>
          <dt>
            <p class="tit">선풍기</p>
          </dt>
          <dd class="option-number txt">수량 1</dd>
          <!-- 4월수정 START : 가격 삭제 -->
          <!-- <dd class="sale-price">
            <span class="number-sale-price" aria-label="판매가격">500</span>
            <span class="unit-won">원</span>
          </dd> -->
          <!-- 4월수정 END : 가격 삭제 -->
        </dl>
      </div>
    </div>
    <!-- 4월수정 END : 옵션 이미지 있는 버전 추가, 전체 수정-->
  </li>
  <!-- 4월 수정 END : 컴포넌트 전체 수정 -->
  <!-- END : list -->
</template>

<script>
export default {
  name: "MyOrderNoCheckboxList",
  data() {
    return {
    };
  },
  // 4월 수정 START : props 추가
  //  option: 옵션 타입, plus: n+1일때
  props: ['option', 'plus', 'detail'],
  // 4월 수정 END : props 추가
  mixins: [],
  components: {
  },
  methods: {
  },
  mounted() {
  },
};
</script>
