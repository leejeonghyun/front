<template>
  <!-- START : list -->
  <li>
    <dl>
      <dt>
        <!-- 4월 수정 START : checkbox 추가 -->
        <span class="inp-chk">
          <input type="checkbox" name="" :id="type+ckIdx" :disabled="gift === 'sample'">
          <label :for="type+ckIdx">엔네이처 빅그릴비엔나엔네이처 빅그릴비엔나 260G+260G기획</label>
        </span>
        <!-- 4월 수정 END : checkbox 추가 -->
      </dt>
      <dd class="thumb">
        <a href="#">
          <figure>
            <img src="@/assets/images/_temp/_img_gift03.jpg" alt="[말랭이여사] 가지말랭이">
          </figure>
        </a>
      </dd>
      <!-- 4월 수정 START : 옵션 삭제, 사은품 내용 추가, 반품/취소 삭제 -->
      <!-- <dd class="option">
        <p class="option-info">옵션 : 선택한 옵션명 노출</p>
      </dd> -->
      <dd class="gift">
        <p class="point" v-if="gift === 'first'">첫 구매 혜택 사은품</p>
        <p class="point" v-else>맛보기 사은품</p>
      </dd>
      <dd class="count">
        <p class="option-info">수량 1</p>
      </dd>
      <!-- 4월 수정 END : 옵션 삭제, 사은품 내용 추가, 반품/취소 삭제 -->
      <dd class="shop">달리살다</dd>
      <!-- 4월 수정 : 삭제 -->
      <!-- <dd class="list-price" aria-label="정상가격">
        <del>7,560</del>원
      </dd> -->
      <dd class="sale-price" aria-label="판매가격" v-if="gift === 'first' && detail !== 'exchange'">
        <span class="number-sale-price">12,680</span>
        <span class="unit-won">원</span>
      </dd>
    </dl>
  </li>
  <!-- END : list -->
</template>

<script>
export default {
  name: "MyfirstBenefit",
  data() {
    return {
    };
  },
  // 4월수정 START : props 추가
  // ckIdx: input id, type: 배송유형, gift: 사은품유형
  props: ['type', 'detail', 'ckIdx', 'gift'],
  // 4월수정 END : props 추가
  mixins: [],
  components: {
  },
  methods: {
  },
  mounted() {
  },
};
</script>
