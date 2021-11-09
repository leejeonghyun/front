<template>
  <div class="wrap-search-tab">
    <div class="search-tab">
      <button v-for="item in orderTab" :key="item.tabId"
        :id="'search-tab-'+item.tabId"
        :aria-controls="'search-tabContent-'+item.tabId"
        :class="{active : tabSearch[item.tabId]}"
        @click="tabActionSearch(item.tabId)"
        aria-label="탭 활성화">
        {{item.tabName}}
      </button>
    </div>
    <!-- 8월수정 START : scroll-area 클래스명 원복(2020.08.27) -->
    <div class="search-tab-contents scroll-area" ref="tabSearchContents">
      <div v-for="item in orderTab" :key="item.tabId"
        :class="item.tabId === 'simplycook'?'tab-contents simplycook':'tab-contents'"
        :id="'search-tabContent-'+item.tabId"
        :aria-labelledby="'search-tab-' + item.tabId"
        v-show="tabSearch[item.tabId]">
        <h5 class="hidden">{{item.tabName}}</h5>
        <ul>
          <li v-for="(pop, index) in $store.getters.getPopularList('list',item.tabId).slice(0,10)" :key="index+8" >
            <button>
              <span aria-label="인기 검색어 순위">{{index + 1}}</span>
              <span aria-label="인기 검색어" @click="keywordClick(pop, item.tabId)"
                    data-sc-action="search.onsite" data-dimension-name="search.popular" :data-dimension-value="item.tabId === 'simplycook'?pop.itemNm:pop.content">
              {{searchWordEllipsis(item.tabId === 'simplycook'?pop.itemNm:pop.content)}}</span>
              <span v-if="item.tabId === 'simplycook' && pop.newItemYn === 'Y'" aria-label="심플리쿡 딱지" class="simplycook-benefit">
                신상품
              </span>
              <span v-else-if="item.tabId === 'simplycook' && pop.frgfYn === 'Y'" aria-label="심플리쿡 딱지" class="simplycook-benefit">
                사은품
              </span>
              <span v-else-if="item.tabId === 'simplycook' && pop.dbleCpn === 'Y' || pop.itemCpnApplPosbYn === 'Y'" aria-label="심플리쿡 딱지" class="simplycook-benefit">
                쿠폰
              </span>
              <span v-else-if="item.tabId === 'simplycook' && pop.cmplYn === 'Y'" aria-label="심플리쿡 딱지" class="simplycook-benefit">
                다다익선
              </span>
              <span v-else-if="item.tabId === 'simplycook' && itemValue.nplusYn !== 0 && itemValue.nplusYn > 0" aria-label="심플리쿡 딱지" class="simplycook-benefit">
                하나더드림
              </span>
              <span v-else-if="item.tabId === 'simplycook'" aria-label="심플리쿡 딱지" class="simplycook-benefit">
                <!-- 7월 수정 : 요건 변경으로 인한 값 : 혜택이 없을 경우 빈 i 값을 넣어주세요 -->
                <i></i>
              </span>
              <span v-else-if="item.tabId !== 'simplycook' && pop.updown === 'U'" aria-label="인기 검색어 상승률" class="up">
                <span class="hidden">상승</span>
              </span>
              <span v-else-if="item.tabId !== 'simplycook' && pop.updown === 'D'" aria-label="인기 검색어 상승률" class="down">
                <span class="hidden">하락</span>
              </span>
              <span v-else-if="item.tabId !== 'simplycook' && pop.updown === 'N'" aria-label="인기 검색어 상승률" class="new">
                <span>NEW</span>
              </span>
              <span v-else-if="item.tabId !== 'simplycook'" aria-label="인기 검색어 상승률" class="no-change">
                <span class="hidden">변화없음</span>
              </span>
            </button>
          </li>
        </ul>
        <span v-if="$store.getters.getPopularMakeTime(item.tabId)" class="search-date">{{$store.getters.getPopularMakeTime(item.tabId)}} 기준</span>
        <div class="wrap-tag" v-if="$store.state.search.popularTagShow">
          <strong class="title">인기 태그</strong>
          <button class="btn-hash-tag" v-for="(tag, index) in $store.getters.getPopularList('tag',item.tabId)" :key="index"
            @click="keywordClick(tag, item.tabId)"
            >{{searchWordEllipsis(item.tabId === 'simplycook'?tag.itemNm:tag.content)}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ItemTemplete from '@/common/ItemTemplete';
export default {
  components: {
  },
  name: 'PopularSearch',
  data() {
    return {
      tabSearchActive: '',
      searchTab: '',
      tabSearch: {
        gsfresh: false,
        dalisalda: false,
        daybreak: false,
        simplycook: false
      },
      orderTab: [],
    };
  },
  mounted() {
    const baseMall = this.$store.state.search.baseMall;
    this.tabSearch[baseMall] = true;
    this.searchTab = baseMall;
    this.orderTab = this.$store.getters.getOrderTab(false);
    this.getPopularList();
    // this.$store.dispatch("getPopularList", {mall: 'simplycook'});
  },
  updated() {
    // 포커스 (접근성)
    if (this.searchbarActive) {
      if (this.tabSearchActive) {
        this.$refs.tabSearchContents.setAttribute('tabindex', 0);
        this.$refs.tabSearchContents.focus();
      }
    }
  },
  methods: {
    // 인기검색어 tab
    tabActionSearch(type) {
      for (let i = 0; i < Object.keys(this.tabSearch).length; i++) {
        this.tabSearch[Object.keys(this.tabSearch)[i]] = false;
      }
      this.tabSearchActive = [type];
      this.tabSearch[type] = true;
      this.searchTab = type;
      this.getPopularList();
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
    getPopularList () {
      const params = {
        mall: this.searchTab
      };
      // console.log("params", params);
      this.$store.dispatch("getPopularList", params);
    },
    keywordClick(item, tabId) {
      if (tabId === 'simplycook') {
        this.$router.push({ path: ItemTemplete.itemDetail(item) });
      } else {
        this.$emit('searchKeyword', item.content, tabId);
      }
    },
  },
};
</script>

