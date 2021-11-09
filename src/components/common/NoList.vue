<template>
  <div class="wrap-nolist" :class="ListType">
    <div v-if="SearchText === undefined">
      <!-- 4월수정 START : p 태그 수정 및 slot 추가 -->
      <p v-if="ListType !== 'giftnolist'">{{ NoListText }}
        <br v-if="NoListTextNextLine">{{ NoListTextNextLine }}
      </p>
      <slot name="txt-giftnolist"></slot>
      <!-- 4월수정 END : p 태그 수정 및 slot 추가 -->
      <slot name="nolist-button"></slot>
    </div>
    <div v-else>
      <!-- 수정 : 2020.03.02 마크업 수정 -->
      <p>
        <strong>
          <span>{{SearchText}}</span>
        </strong>
        {{ NoListText }}
        <br v-if="NoListTextNextLine"> {{ NoListTextNextLine }}
      </p>
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoList",
  props: ['NoListText', 'ListType', 'SearchText', 'NoListTextNextLine'],
};
</script>
