<template>
  <!-- START : list -->
  <!-- 4월 수정 : class 추가 -->
  <li :class="{plus: plus}">
    <dl>
      <dt>
        <span class="inp-chk">
          <!-- 4월 수정 : input id, label for 변경 -->
          <input type="checkbox" name="" :id="type + ckIdx" value="" checked="checked">
          <label :for="type + ckIdx">일리윤 히알루론 모이스춰 수분크림일리윤 히알루론 모이스춰 수분크림</label>
          <!-- 4월 수정 : 합배송 추가 -->
          <!-- 합배송이 있을 경우 -->
          <i class="plus-badge">합배송</i>
        </span>
      </dt>
      <dd class="thumb">
        <a href="#">
          <figure>
            <!-- 4월 수정 : 1+1, 2+1 추가 -->
            <span v-if="plus" aria-label="혜택" class="ico-benefit">1+1</span>
            <img src="@/assets/images/_temp/_img_gift03.jpg" alt="[말랭이여사] 가지말랭이">
          </figure>
        </a>
      </dd>
      <dd class="option">
        <!-- 4월 수정 : 예약배송일 경우 도착예정 날짜 노출 -->
        <p class="option-info" v-if="type === 'reservation'">11/30(토)도착예정</p>
        <p class="option-info">옵션 : 선택한 옵션명 노출</p>
      </dd>
      <!-- 4월 수정 START : 취소, 교환, 반품 위치 수정 -->
      <dd class="return">
        <span class="point">취소 1, 교환 1, 반품 5</span>
      </dd>
      <dd class="count">
        <!-- 4월 수정 : 문구 수정 -->
        <p class="option-info">수량 1</p>
      </dd>
      <!-- 4월 수정 END : 취소, 교환, 반품 위치 수정 -->
      <dd class="shop">달리살다</dd>
      <dd class="list-price" aria-label="정상가격">
        <del>7,560</del>원
      </dd>
      <dd class="sale-price" aria-label="판매가격">
        <span class="number-sale-price">12,680</span>
        <span class="unit-won">원</span>
      </dd>
    </dl>
    <!-- 4월 수정 : 증정 사은품 삭제 -->
    <!-- <p class="free-gift-cont">증정 사은품 : 휴대용 위생장갑 5입</p> -->
    <!-- 4월수정 START : simplycook-option 이미지 있는 버전, 전체 수정-->
    <!-- 심플리쿡 (checkbox 있는 경우) -->
    <div v-if="option" class="option-list include-img simply">
      <div class="wrap-opt">
        <span class="inp-chk">
          <input type="checkbox" name="" :id="type + ckIdx + '_01'" value="">
        </span>
        <figure>
          <img src="@/assets/images/_temp/_img_gift03.jpg" alt="당면 사리">
        </figure>
        <dl>
          <dt>
            <p class="tit"><label :for="type + ckIdx + '_01'">당면 사리</label></p>
          </dt>
          <dd class="option-number txt">수량 1</dd>
          <dd class="sale-price">
            <span class="number-sale-price" aria-label="판매가격">500</span>
            <span class="unit-won">원</span>
          </dd>
        </dl>
      </div>
      <div class="wrap-opt">
        <span class="inp-chk">
          <input type="checkbox" name="" :id="type + ckIdx + '_02'" value="">
        </span>
        <figure>
          <img src="@/assets/images/_temp/_img_gift03.jpg" alt="소고기 500g">
        </figure>
        <dl>
          <dt>
           <p class="tit"><label :for="type + ckIdx + '_02'">소고기 500g</label></p>
          </dt>
          <dd class="option-number txt">수량 1</dd>
          <dd class="sale-price">
            <span class="number-sale-price" aria-label="판매가격">500</span>
            <span class="unit-won">원</span>
          </dd>
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
          <dd class="sale-price">
            <span class="number-sale-price" aria-label="판매가격">500</span>
            <span class="unit-won">원</span>
          </dd>
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
          <dd class="sale-price">
            <span class="number-sale-price" aria-label="판매가격">500</span>
            <span class="unit-won">원</span>
          </dd>
        </dl>
      </div>
    </div>
    <!-- 4월수정 END : simplycook-option 이미지 있는 버전, 전체 수정-->
  </li>
  <!-- END : list -->
</template>

<script>
export default {
  name: "MyOrderDetails",
  data() {
    return {
    };
  },
  // 4월 수정 START : props 추가
  // option: 옵션 타입, type: 배송 타입, plus: n+1 일때, ckIdx: input id
  props: ['option', 'type', 'plus', 'ckIdx'],
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
