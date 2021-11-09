<template>
  <ul class="option-add">
    <li>
      <a href="javascript:;" role="button" @click="selectItem">
        <figure> <!-- :이미지 없을 경우 figure 전체 hidden -->
          <img src="@/assets/images/_temp/_img_cart01_01.jpg">
        </figure>
        <span class="option-title">사은품1</span>
      </a>
    </li>
    <li>
      <a href="javascript:;" role="button" @click="selectItem">
        <figure> <!-- :이미지 없을 경우 figure 전체 hidden -->
          <img src="@/assets/images/_temp/_img_cart01_01.jpg">
        </figure>
        <span class="option-title">사은품2</span>
      </a>
    </li>
    <li>
      <a href="javascript:;" role="button" @click="selectItem">
        <figure> <!-- :이미지 없을 경우 figure 전체 hidden -->
          <img src="@/assets/images/_temp/_img_cart01_01.jpg">
        </figure>
        <span class="option-title">사은품3</span>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'OptionList',
  data() {
    return {
      selectedOption: '',
    };
  },
  methods: {
    selectItem() {
      const $target = event.target;
      this.selectedOption = $target.childNodes[1].textContent;
      this.$emit('optionUpdate', this.selectedOption);
    },
  },
};
</script>
