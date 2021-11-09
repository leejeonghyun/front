<template>
  <section class="content-keyword-popular">
    <h2 class="content-title">인기 검색어</h2>
    <p v-if="$store.getters.getM4PopularMakeTime" class="date-text"><time v-html="makeTime()"></time></p>
    <div class="wrap-popular-keyword">
      <ol class="popular-keyword-list">
        <li v-for="(pop, index) in $store.getters.getM4PopularList('list').slice(0,limit)" :key="index" >
          <a nohref :class="`popular-keyword-item${pop.updown == 'N' ? ' new' : ''}`" v-on:click.prevent="keywordClick(pop)">
            <span class="cardinal-number">{{index + 1}}</span>{{searchWordEllipsis(pop.content)}}</a>
        </li>
      </ol>
    </div>
  </section>
</template>
<script>
import ItemTemplete from '@/common/ItemTemplete';
export default {
  components: {
  },
  name: 'PopularSearch',
  props: {
    limit: {
      type: Number,
      default: 10
    },
    mall: {
      type: String,
      default: 'all_m4'
    }
  },
  data() {
    return {
    };
  },
  mounted() {
    this.$store.dispatch("getM4PopularList", {mall: 'all_m4'});
  },
  updated() {
  },
  methods: {
    makeTime() {
      const dateTime = this.$store.getters.getPopularMakeTime();
      if (dateTime) {
        return dateTime.split(' ')[0] + ' <span>' + dateTime.split(' ')[1] + ' 기준</span>';
      }
    },
    // 말줄임표 처리
    searchWordEllipsis (word) {
      const length = 20;
      if (!word) {
        return '';
      }
      if (word.length > length) {
        return word.substr(0, length) + '...';
      }
      return word;
    },
    keywordClick(item) {
      this.$emit('searchKeyword', item.content);
    }
  }
};
</script>
