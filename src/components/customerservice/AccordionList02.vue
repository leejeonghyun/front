<template>
  <ul class="list-accordion" :data-group="paramGroupId">
    <li v-for="item in paramList" v-bind:key="item.notiSeqno">
      <button
        :id="'list' + item.notiSeqno"
        class="btn-accordion"
        :aria-controls="'listContent' + item.notiSeqno"
        aria-expanded="false"
        @click="accordionGroupEvent02(paramGroupId)"
      >
        <p class="wrap-title" aria-label="질문">
          <span class="title">
            <span aria-label="카테고리명" v-if="getViewYn()">{{
              item.annceTypeNm
            }}</span>
            <span v-html="getTitle(item.notiTitle)"></span>
          </span>
        </p>
      </button>
      <div
        :id="'listContent' + item.notiSeqno"
        class="cont-accordion"
        :aria-labelledby="'list' + item.notiSeqno"
        v-if="accodionActive[`listContent${item.notiSeqno}`]"
      >
        <p class="dsec" aria-label="답변" v-html="item.notiCnts"></p>
        <a
          :href="item.linkUrl"
          class="link-more"
          title="링크 바로가기"
          v-if="item.linkUrl"
          >링크 바로가기</a
        >
      </div>
    </li>
  </ul>
</template>

<script>
import AccordionMixin from '@/mixins/AccordionMixin';
export default {
  name: 'AccordionList02',
  mixins: [AccordionMixin],
  props: {
    paramList: {
      type: Array,
    },
    paramGroupId: { type: String, required: false },
    paramSearchCondition: { type: String, required: false },
    paramSearchYn: { type: Boolean, required: false },
  },
  data() {
    return {};
  },
  methods: {
    getViewYn: function() {
      return this.paramSearchYn;
    },
    getTitle: function(pTitle) {
      if (this.paramSearchCondition != null) {
        const rTitle = pTitle.replace(
          this.paramSearchCondition,
          '<strong>' + this.paramSearchCondition + '</strong>'
        );
        return rTitle;
      } else {
        return pTitle;
      }
    },
    initAccordion: function(pGroupId) {
      this.accordionInit(pGroupId);
    },
  },
  created: async function() {},

  mounted() {
    // 6월 수정 : 아코디언 액션 그룹핑 수정
    // this.accordionInit('listGroup');
  },
};
</script>
