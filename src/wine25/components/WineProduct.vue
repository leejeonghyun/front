<template>
  <div class="wine-product">
    <div class="check-item">
      <span class="inp-chk-wine small">
        <input type="checkbox" :id="inpId" checked="checked">
        <label :for="inpId">레드</label>
      </span>
    </div>
    <div class="pickup-item">
      <!-- 8월수정 START : 팝업 활성화를 위한 이벤트 연결 및 접근성 버튼 연결 -->
      <a href="#" aria-haspopup="dialog" @click="popupAction">
        <img src="@/wine25/assets/images/_temp/a_2800100020773.png" alt="루벤 앤 플로라 리제르바">
      </a>
      <!-- 8월수정 END : 팝업 활성화를 위한 이벤트 연결 및 접근성 버튼 연결 -->
      <div class="item-txt">
        <p class="production-origin"><strong title="원산지">칠레</strong><em title="와인 종류">카베르네 소비뇽,까르미네르</em></p>
        <p class="production-tit" title="와인 명">루벤 앤 플로라 리제르바 플로라 리제르바플로라 리제르바</p>
        <p class="production-desc" title="와인 설명">부부의 애칭을 와인 이름에 담았으며 남편이 양조, 아내가 라벨을 디자인한 와인으로 유명</p>
        <p class="production-price" title="와인 가격"><strong>19,000</strong>원</p>
        <div class="item-bottom-btn">
          <div class="option-number">
            <button type="button" class="btn-minus" @click="decreaseCount"><span class="hidden">선택수량 빼기</span></button>
            <input type="number" name="" value="1" class="txt-number" title="선택 수량">
            <button type="button" class="btn-plus" @click="increaseCount"><span class="hidden">선택수량 더하기</span></button>
          </div>
          <button class="direct-reserv">예약</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WineProduct',
  props: ['inpId'],
  methods: {
    // change value
    decreaseCount(event) {
      const $target = event.currentTarget;
      if ( $target.nextSibling.value > 0 ) {
        $target.nextSibling.value --;
      }
    },
    increaseCount(event) {
      const $target = event.currentTarget;
      if ( $target.previousSibling.value < 999 ) {
        $target.previousSibling.value ++;
      }
    },
    /* 8월수정 START : 팝업 활성화를 위한 이벤트 연결 */
    popupAction() {
      this.$emit('popupEvent', 'popupWineDefault');
    }
    /* 8월수정 END : 팝업 활성화를 위한 이벤트 연결 */
  }
};
</script>
