<template>
  <span>
    <div class="wrap-brand-search">
      <div class="wrap-searchbar-dali">
        <div class="wrap-input search">
          <label for="search-input-brand-tap" class="hidden">검색어 입력</label>
          <input
            id="search-input-brand-tap"
            ref="textOverId"
            type="text"
            v-model="searchABC"
            placeholder="브랜드를 찾아보세요."
          />
          <button class="btn-reset" @click="resetOverBtn" aria-label="검색어 초기화"></button>
        </div>
        <button class="btn-searchbar-search-dali" aria-label="검색" @click="goSearch">
          <span class="hidden">검색</span>
        </button>
      </div>
    </div>
    <div class="dali-section-area type02">
      <ul class="search-brand-list" v-for="(list, index) in filteredList" :key="index">
        <li>
          <span class="sorting-text" v-if="list.rk == 1">{{list.fst}}</span>
          <figure>
            <gs-link :to="{ path: '/dp/brand/' + list.dspCtgId, params: { id: list.dspCtgId}}">
              <img
                :src="getImg(list.brandImgPathNm)"
              />
            </gs-link>
          </figure>
          <gs-link :to="{ path: '/dp/brand/' + list.dspCtgId, params: { id: list.dspCtgId}}">
            <em class="brand-name">{{list.dspCtgNm}}</em>
          </gs-link>
        </li>
      </ul>
    </div>
  </span>
</template>

<script>
import ItemTemplete from '@/common/ItemTemplete';
import DateUtils from '@/common/DateUtils';

export default {
  name: 'SideBarBrandABC',
  data() {
    return {
      searchABC: '',
    };
  },
  async created() {
    try {
      const params = {
        linkSsevntId: 'Y',
      };
      this.$store.dispatch('getBaseBrandList', params); // BestBrand 목록
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  computed: {
    filteredList() {
      return this.$store.state.dp.abcBrandList.filter(e => {
        return e.dspCtgNm.toLowerCase().includes(this.searchABC.toLowerCase());
      });
    },
  },
  methods: {
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    resetOverBtn() {
      this.$refs.textOverId.value = '';
    },
    goSearch() {
      // 검색결과 이동
      const params2 = {
        keyword: this.searchABC,
        mall: this.$store.state.dp.cookieInfo.mallId,
        t: Date.now(),
      };
      this.$router.push({ name: 'SearchResult', query: params2 });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>
