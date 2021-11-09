<template>
  <span v-if="$store.state.search.recentItemList && $store.state.search.recentItemList.length > 0">
    <h4>최근 본 상품</h4>
    <!-- 8월수정 START : scroll-area 클래스명 원복(2020.08.27) -->
    <div v-if="$store.state.search.recentItemList" class="inner-search-slide scroll-area">
      <ProductListSimple
        v-for="(item, index) in $store.state.search.recentItemList" :key="index"
        :itemValue="item"
        :daliProduct="item.mallId==='11'?true:false"
        :daybreak="item.delivTypeCd==='04' || item.storId ==='2287'"
      />
    </div>
    <button v-if="loginYn" class="btn-text-more arrow" @click="goRecentItem">전체보기</button>
  </span>
  <span v-else>
    <h4>신상품</h4>
    <!-- 8월수정 START : scroll-area 클래스명 원복(2020.08.27) -->
    <div v-if="$store.state.search.newItemList" class="inner-search-slide scroll-area">
      <ProductListSimple
        v-for="(item, index) in $store.state.search.newItemList" :key="index"
        :itemValue="item"
        :daliProduct="item.mallId==='11'?true:false"
        :daybreak="item.delivTypeCd==='04'|| item.storId ==='2287'"
      />
    </div>
  </span>
</template>
<script>
import SiteUtils from '@/common/SiteUtils';
import LoginUtils from '@/common/LoginUtils';
import ProductListSimple from '@/components/productTemplete/ProductListSimple'; // 리스트 요약형
export default {
  components: {
    ProductListSimple
  },
  name: 'RecentItemSearch',
  data() {
    return {
      loginYn: false
    };
  },
  mounted() {
    this.chkLogin();
    this.getRecentItemList();
  },
  methods: {
    getRecentItemList () {
      // console.log("최근본상품 Test");
      this.$store.dispatch("getRecentItemList");
    },
    chkLogin() {
      // console.log("로그인시에만 전체보기 활성", LoginUtils.isLogin());
      this.loginYn = LoginUtils.isLogin();
    },
    goRecentItem() {
      const recentItemUrl = SiteUtils.commo('/cu/my_page_recent_item');
      location.href = recentItemUrl;
    },
  },
};
</script>

