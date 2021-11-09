<template>
  <div class="wrap-search-header">
    <div class="wrap-headerbar">
      <form @submit.prevent="onSubmit">
      <div class="wrap-headerbar__1st">
        <button type="button" class="btn-searchbar-prev" @click="searchbarCloseAction">
          <span class="hidden">뒤로가기</span>
        </button>
        <input type="hidden" id="tmp_keyword" name="tmp_keyword">
        <SelectUINormal :selectedMallId="selectedMallId" @changeSelectList="changeSelectList"/>
        <template v-if="!isSubmit">
          <div class="wrap-input search">
            <div class="textinput-field">
              <label for="search-input" class="hidden">검색어 입력</label>
                <!-- <input id="search_keyword" ref="searchkeyword" type="search" v-model.trim="keyquery" @keyup="onkeyup" placeholder="검색어를 입력하세요"> -->
                <input
                  id="search_keyword"
                  type="search"
                  @focus="inputFocusIn"
                  @blur="inputFocusOut"
                  v-model="$store.state.search.searchKeyword"
                  v-on:input="$store.state.search.searchKeyword = $event.target.value"
                  :placeholder="marketingInfo?marketingInfo.ctnsTitle:'검색어를 입력하세요'"
                  @keyup="keywordChange"
                  autocomplete="off"
                  ref="searchInput"
                />
            </div>
          </div>
          <button class="btn-reset" type="reset" @click="onreset" v-show="$store.state.search.searchKeyword.length">
            <span class="hidden">검색어 초기화</span>
          </button>
          <button type="submit" class="btn-search-m4" v-show="$store.state.search.searchKeyword.length==0"><span class="hidden">검색</span></button>
        </template>
        <template v-else>
          <div class="wrap-input search">
            <div class="key-scroll" ref="keyscroll">
              <ul class="keyword-field">
                <li class="saved-keyword-item" v-for="(keyword, index) in keywordItem" :key="index">
                  <!-- active 결과내 재 검색으로 개발단에서 active 클래스 활성 비활성 처리 필요 (현재는 첫번째것만 처리하도록 해놓음) -->
                  <button type="button" class="search-keyword-item" :class="{'active':index===keywordItem.length-1}" @click="deleteItem(index)">{{keyword}}</button>
                </li>
              </ul>
            </div>
          </div>
          <button type="button" class="btn-search-m4" @click="viewkeyField"><span class="hidden">검색</span></button>
        </template>
      </div>
      </form>
    </div>
    <div class="input-focus-box" v-show="$store.state.search.searchKeyword !== '' && inputKeywordBoxActive">
      <div class="bg" @click="closeSearch"></div>
      <RecommendArea @keywordClick="keywordClick"/>
    </div>
  </div>
</template>
<script>
import SiteUtils from '@/common/SiteUtils';
import StringUtils from '@/common/StringUtils';
import SelectUINormal from '@/components/common/SelectUISearchMall';
import RecommendArea from '@/components/search/M4RecommendArea';
export default {
  name: "searchTopComp",
  metaInfo: {
    title: 'GS fresh',
    titleTemplate: '검색결과 < %s'
  },
  components: {
    SelectUINormal,
    RecommendArea
  },
  props: {
    pop: {
      type: Boolean,
      default: true
    },
    marketingInfo: {}
  },
  data() {
    return {
      inputIsVisible: false,
      inputKeywordBoxActive: false,
      isSubmit: false, // 최초 검색시 false
      keywordItem: [], // 동적으로 연동을 안하면 v-if 로 처리한 객체들이 모두 재생성됨
      keyquery: "",
      reaction: false,
      selectedMallId: '300',
    };
  },
  methods: {
    inputFocusIn() {
      this.inputFoucs = true;
    },
    inputFocusOut() {
      this.inputFoucs = false;
      this.scrollBanModal(false);
    },
    keywordChange(e) {
      if (e.keyCode !== 13) {
        this.searchInputHandler(e);
        const params = {
          keyword: this.$store.state.search.searchKeyword,
          mall: 'all_m4'
        };
        // 자동완성 추천단어
        this.$store.dispatch('getM4AutocompleteList', params);
        // 기획전 조회
        this.$store.dispatch('getM4EventList', params);
      } else {
        this.onSubmit();
      }
    },
    keywordClick(keyword) {
      this.scrollBanModal(false);
      this.$emit('searchKeyword', keyword, this.$store.state.m4Search.mallSearchInfoList.filter(e => e.mallId == this.selectedMallId)[0].mall);
    },
    onSubmit() {
      if (this.$refs.searchInput && this.$refs.searchInput.value=='') {
        if (this.marketingInfo !== null) {
          this.goMarketingUrl();
        } else {
          this.$gsdialog.alert('검색어를 입력해주세요').then(dialog => {
            this.$refs.searchInput.focus();
          });
        }
      } else {
        this.keywordClick(this.$store.state.search.searchKeyword);
      }
    },
    goMarketingUrl() {
      const url = this.marketingInfo.linkUrl;
      if (!url || url ==="") {
        this.$gsdialog.alert('검색어를 입력해주세요').then(dialog => {
          this.$refs.searchInput.focus();
        });
        return;
      } else {
        const isExternal = url.indexOf('http') > -1 ? true : false;
        let toUrl = url;
        if (!isExternal) {
          if (location.pathname + location.search === toUrl) {
            toUrl += '&t=' + Date.now();
          }

          if (this.selectedMallId == '1' || this.selectedMallId == '20') {
            toUrl = SiteUtils.freshmo('') + toUrl;
          } else if (this.selectedMallId == '11') {
            toUrl = SiteUtils.dalimo('') + toUrl;
          } else {
            toUrl = SiteUtils.marketformo('') + toUrl;
          }
        }
        location.href = toUrl;
      }
    },
    onreset() {
      const params = {
        keyword: '',
      };
      this.$store.commit('setSearchKeyword', params);
    },
    keyscroll() {
      setTimeout(() => {
        const keyscroll = this.$refs.keyscroll;
        keyscroll.scrollLeft = 1000;
      }, 100);
    },
    deleteItem(idx) {
      this.keywordItem.splice(idx, 1);
      this.keywordInput();
      if (this.keywordItem.length==0) {
        this.isSubmit = false;
        this.$emit('clearKeywordItem');
      } else {
        this.keywordClick(document.querySelector("#tmp_keyword").value);
      }
      // TODO: 재조회 로직 추가
    },
    keywordInput() {
      const inputItem = document.querySelector("#tmp_keyword");
      const list = this.keywordItem;
      inputItem.value = list.join(" ");
    },
    viewkeyField(e) {
      if (e == false) this.reaction = true;
      this.isSubmit = false;
    },
    closeSearch() {
      this.inputKeywordBoxActive = false;
      this.scrollBanModal(false);
    },
    searchInputHandler(e) {
      const input = e.currentTarget;
      const textValue = input.value.trim();
      if (textValue.length > 0 ) {
        this.inputKeywordBoxActive = true;
        const outText = this.checkText(textValue);
        this.remakeTag(outText);
        this.scrollBanModal(true);
      } else {
        this.inputKeywordBoxActive = false;
        this.scrollBanModal(false);
      }
    },
    scrollBanModal(boolan) {
      if (boolan) {
        this.dataY = window.pageYOffset;
        document.body.style["overflow"] = "hidden";
        document.body.style["position"] = "fixed";
        document.body.style["height"] = "100%";
        document.body.style["width"] = "100%";
        document.body.style["z-index"] = "1";
        document.body.style["top"] = -this.dataY + "px";
      } else {
        document.body.removeAttribute("style");
        window.scrollTo(0, this.dataY);
      }
    },
    remakeTag(text) {
      const list = document.querySelectorAll(".search-result-priority .item-keyword");
      const len = list.length;
      for (let i = 0; i < len; i++) {
        const li = list[i];
        const accent = li.querySelector(".accent");
        if (accent != null) {
          const intext = accent.textContent;
          const outtext = accent.outerHTML;
          li.textContent = li.textContent.replace(outtext, intext);
        }
        if (li.textContent.indexOf(text) >= 0) {
          li.innerHTML = li.textContent.replace(text, '<em class="accent">'+text+'</em>');
        }
      }
    },
    checkText(value) {
      const len = value.length;
      let txt = "";
      for ( let i = 0; i < len; i++) {
        const char = value.substr(i, 1);
        const charNum = this.getInitialSound(char);
        if (char == " ") {
          txt += char;
        } else if (charNum>=0) {
          txt += char;
        }
      }
      return txt;
    },
    getInitialSound(c) {
      const char = c.charCodeAt(0).toString();
      const HANGUL_BEGIN_UNICODE = 44032; // 한글 유니코드 시작 값
      const HANGUL_BASE_UNIT = 588; // 자음 마다 가지는 글자수
      const hanBegin = (char - HANGUL_BEGIN_UNICODE);
      const index = Math.floor(hanBegin / HANGUL_BASE_UNIT);
      return index;
    },
    searchbarCloseAction() {
      this.$parent.searchbarCloseAction();
    },
    changeSelectList(selected) {
      this.selectedMallId = selected.mallId.toString();
      this.opened = false;
      this.$emit('changeSelectList', selected);
    }
  },
  mounted() {
    if (!this.pop) {
      this.isSubmit = true; // 임시
      this.keyscroll(); // 임시
      this.inputKeywordBoxActive = false; // 임시
      this.scrollBanModal(false);

      const inputItem = StringUtils.trim(this.$route.query.keyword);
      this.keywordItem = inputItem.split(" ");
    }
    if (this.isSubmit) {
      // this.keyscroll();
      // this.keywordInput();
    }
  },
  watch: {
    isSubmit: function(tf) {
      if (!tf) {
        setTimeout(() => {
          const inputItem = document.querySelector("#search_keyword");
          inputItem.value = this.keywordItem.join(" ");
          this.keyquery = this.keywordItem.join(" ");
          inputItem.focus();
          if (this.reaction) this.onSubmit();
        }, 100);
      }
    }
  },
};
</script>
