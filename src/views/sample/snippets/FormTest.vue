<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input v-model="formData.message" placeholder="input message here." />
      <p>메시지: {{ formData.message }}</p>
      <hr />
      <textarea v-model="formData.text" placeholder="여러줄을 입력해보세요"></textarea>
      <p style="white-space: pre-line">{{ formData.text }}</p>
      <hr />
      <div>
        <span class="inp-chk">
          <input type="checkbox" id="jack" value="Jack" v-model="formData.checkedNames" />
          <label for="jack">Jack</label>
          <input type="checkbox" id="john" value="John" v-model="formData.checkedNames" />
          <label for="john">John</label>
          <input type="checkbox" id="mike" value="Mike" v-model="formData.checkedNames" />
          <label for="mike">Mike</label>
        </span>
        <br />
        <span>체크한 이름: {{ formData.checkedNames }}</span>
      </div>
      <hr />
      <span class="inp-radio small">
        <input type="radio" id="one" value="One" v-model="formData.picked" />
        <label for="one">One</label>
        <br />
        <input type="radio" id="two" value="Two" v-model="formData.picked" />
        <label for="two">Two</label>
      </span>
      <br />
      <span>선택: {{ formData.picked }}</span>
      <hr />
      <select v-model="formData.selected">
        <option disabled value>Please select one</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <span>선택함: {{ formData.selected }}</span>
      <hr />
      <div v-if="errors.length" id="error-area">
        다음 항목을 확인하세요:
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </div>
      <hr />
      <button>Submit</button>
    </form>
  </div>
</template>
<script>
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';

export default {
  data() {
    return {
      formData: {
        checkedNames: [],
        selected: '',
      },
      errors: [],
    };
  },
  created() {
    ApiUtils.loadScript('https://code.jquery.com/jquery-3.4.1.min.js');
    ApiUtils.loadScript('/js/legacy/common.app.js');
    setTimeout(() => {
      console.log($('form'));
    }, 300);
  },
  methods: {
    onSubmit: function() {
      console.log($('select').val());
      this.errors = [];
      if (StringUtils.isEmpty(this.formData.message)) {
        this.errors.push('message required');
      }
      if (this.formData.checkedNames.length === 0) {
        this.errors.push('check required');
      }
      if (this.errors.length > 0) {
        return;
      }
      console.log(JSON.stringify(this.formData));
    },
  },
};
</script>
<style scoped>
input {
  border: 1px solid #999;
  margin: 3px;
}
#error-area {
  background-color: lavenderblush;
}
</style>
