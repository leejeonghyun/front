<template>
  <!-- START : list -->
  <li>
    <dl>
      <dt>
        <p class="tit">
          <span class="inp-chk">
            <!-- 4월 수정 : input id, label for 매칭 -->
            <input type="checkbox" name="" :id="type + ckIdx" value="" checked="checked">
            <label :for="type + ckIdx">일리윤 히알루론 모이스춰 수분크림</label>
          </span>
        </p>
      </dt>
      <dd class="thumb">
        <a href="#">
          <figure>
            <img src="@/assets/images/_temp/_img_gift03.jpg" alt="[말랭이여사] 가지말랭이">
          </figure>
        </a>
      </dd>
      <dd class="option">
        <p class="option-info">옵션 : 중과 + 소과 혼합</p>
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
  </li>
  <!-- END : list -->
</template>

<script>
export default {
  name: "MyOrderNoSimplyCook",
  data() {
    return {
    };
  },
  // 4월 수정 START : props 추가
  // type: 배송 타입, ckIdx: input id
  props: ['type', 'ckIdx'],
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
