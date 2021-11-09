<template>
  <div class="wrap-select-popup" :class="type">
    <!-- 수정 START : 2020.03.05 마크업 수정 -->
    <input type="text" class="inp-email" v-model="selectData.selected" aria-label="이메일 도메인" :readonly="readonly">
    <button class="btn-select" aria-haspopup="dialog" @click="openSelectList">
      <span class="hidden">이메일 주소 정렬</span>
    </button>
    <!-- 수정 END : 2020.03.05 마크업 수정 -->
    <div id="modalList" class="wrap-modal-select" role="dialog" aria-modal="true" @click="openSelectList" v-if="selectData.open">
      <ul class="wrap-list-select">
        <li>
          <button @click="changeSelectList" value="naver.com">naver.com</button>
        </li>
        <li>
          <button @click="changeSelectList" value="daum.net">daum.net</button>
        </li>
        <li>
          <button @click="changeSelectList" value="nate.com">nate.com</button>
        </li>
        <li>
          <button @click="changeSelectList" value="gmail.com">gmail.com</button>
        </li>
      <!--  <li>
          <button @click="changeSelectList" value="dreamwiz.com">dreamwiz.com</button>
        </li>
      -->
        <li>
          <button @click="changeSelectList" value="hanmail.net">hanmail.net</button>
        </li>
        <li>
          <button @click="changeSelectList" value="hotmail.com">hotmail.com</button>
        </li>
        <li>
          <button @click="changeSelectList" value="msn.com">msn.com</button>
        </li>
        <li>
          <button @click="changeSelectList" value="yahoo.co.kr">yahoo.co.kr</button>
        </li>
        <li>
          <button @click="changeSelectList" value="직접 입력" data-readonly="readonly">직접 입력</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  /* 수정 START : 2020.03.05 data값 삭제 */
  name: 'Select',
  props: ['type', 'selectData'],
  data() {
    return {
      readonly: false,
    };
  },
  methods: {
    openSelectList() {
      this.$emit('selectEvent', this.type);
    },
    changeSelectList() {
      event.stopPropagation();
      const $target = event.currentTarget;
      const changed = $target.getAttribute('value');
      const inpEmail = document.querySelector('.inp-email'); // 수정 : 2020.03.02 추가
      this.selectData.selected = changed;
      if ($target.dataset.readonly) {
        this.readonly = false;
        this.selectData.selected = '';
        inpEmail.focus();
      } else {
        this.readonly = true;
      }
      this.$emit('changeEvent', this.type, this.selectData.selected);
    }
  }
  /* 수정 END : 2020.03.05 data값 삭제 */
};
</script>

<style>

</style>
