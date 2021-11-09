<template>
  <div>
    <div>
      <div :class="{ 'form-group--error': $v.formData.name.$error }">
        <label>이름</label>
        <input v-model.trim="$v.formData.name.$model" />
      </div>
      <div v-if="!$v.formData.name.required">필수항목입니다.</div>
      <div v-if="!$v.formData.name.minLength">이름은 {{$v.formData.name.$params.minLength.min}} 자 이상이어야 합니다.</div>
      <div :class="{ 'form-group--error': $v.formData.age.$error }">
        <label>나이</label>
        <input v-model.trim.lazy="$v.formData.age.$model" />
      </div>
      <div
        v-if="!$v.formData.age.between"
      >{{$v.formData.age.$params.between.min}} 과 {{$v.formData.age.$params.between.max}} 사이이어야 합니다.</div>
    </div>
  </div>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      formData: {
        name: '',
        age: 0,
      },
    };
  },
  validations: {
    formData: {
      name: {
        required,
        minLength: minLength(4),
      },
      age: {
        between: between(20, 30),
      },
    }
  },
};
</script>
