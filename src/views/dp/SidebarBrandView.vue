<template>
  <!-- START : 브랜드 전용관 -->
  <section class="wrap-brand">
    <h2>브랜드 전용관</h2>
    <div class="wrap-searchbar">
      <div class="wrap-input search">
        <label for="search-input" class="hidden">검색어 입력</label>
        <input
          id="search-input"
          ref="textId"
          type="text"
          v-model="brandSearch"
          placeholder="브랜드를 찾아보세요"
          @keyup.13="goSearch"
        />
        <button class="btn-reset" @click="resetBtn" aria-label="검색어 초기화"></button>
      </div>
      <button class="btn-searchbar-search" aria-label="검색" @click="goSearch">
        <span class="hidden">검색</span>
      </button>
    </div>
    <!-- 수정 START : 2020.03.06 달리살다 브랜드와 스타일 통일 -->
    <ul class="my-brand">
      <li v-for="(list, index) in $store.state.dp.menuDspBrandInfo" :key="index">
        <gs-link :to="getUrl(list.dspCnts)">
          <figure>
            <img :src="getImg(list.bnrImgPathNm)" :alt="list.brandImgDescCnts" />
          </figure>
          <em class="brand-name">
            {{list.brandNm}}
            <!-- 신규입점브랜드인 경우, 아래 태그 추가 -->
            <strong class="ico-new" aria-label="신규입점브랜드" v-if="newYn(list.fstRegDttm)"></strong>
          </em>
        </gs-link>
      </li>
    </ul>
    <!-- 수정 END : 2020.03.06 달리살다 브랜드와 스타일 통일 -->
  </section>
  <!-- END : 브랜드 전용관 -->
</template>
<script>
import ItemTemplete from '@/common/ItemTemplete';
import DateUtils from '@/common/DateUtils';
import Tracker from '@/common/Tracker';
export default {
  name: 'SidebarBrandView',
  data() {
    return {
      brandList: [],
      brandSearch: '',
    };
  },
  async created() {
    try {
      this.$store.dispatch('getMenuDspBrandInfo', '');
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  methods: {
    newYn(Date) {
      const newYn = DateUtils.isAfter(
        DateUtils.add(DateUtils.format(Date, 'YYYY-MM-DD'), 30, 'day'),
        DateUtils.getToday()
      );
      return newYn;
    },
    getUrl(url) {
      if (url.indexOf('<p>') != -1) {
        const urlLen = url.length;
        url = url.replace(/<p>/gi, '').replace(/<\/p>/gi, '');
      }
      return url;
    },
    goSearch() {
      if (!this.brandSearch) {
        return this.$gsdialog.alert('브랜드명을 입력하세요.');
      }
      // 최근검색어 쿠키저장
      const params = {
        keyword: this.brandSearch,
        date: DateUtils.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      };
      this.$store.commit('addRecentSearchCookie', params);
      // 검색결과 이동.
      const baseMall = this.$store.state.search.baseMall;
      const params2 = {
        keyword: this.brandSearch,
        mall: baseMall==='gsfresh'?'all':baseMall,
        t: Date.now(),
      };
      this.$router.push({ name: 'SearchResult', query: params2 });
    },
    resetBtn() {
      this.$refs.textId.value = '';
      this.brandSearch = '';
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>
