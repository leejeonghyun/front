<!--
Design: views/ss/SC-FO-SS-GF-MS-801
Pg id:
Uri: /cu/delivery_place_add
-->
<template>
  <div class="wrap-mypage bottom-sticky" v-bind:class="[siteClass]">
    <!-- 추가 2020.02.18 : class gsfresh, dalisalda -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="배송지 추가" :tabbar="false" />
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <DeliveryPlaceAdd @endEvent="endAction" :paramAddr="addrNm" />
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer'; // 푸터
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import Config from '@/common/Config.js';
import JwtUtils from '@/common/JwtUtils';
import CookieUtils from '@/common/CookieUtils';
// 지도
import PopupFindAddress from '@/views/ss/address/PopupFindAddress.vue';
import DeliveryPlaceAdd from '@/components/mypage/DeliveryPlaceAdd';

export default {
  name: 'ChangeNewAddress',
  data() {
    return {
      siteClass: '',
      addrNm: this.$route.query.paramQueryString, // this.$route.params.id,
      prevRoute: {},
      returnUrl: '',
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '배송지 추가 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '새 배송지 추가',
      },
    ],
  },
  props: ['type'],
  mixins: [LayerPopupMixin],
  components: {
    SubDefaultHeader,
    Footer,
    DeliveryPlaceAdd,
  },
  methods: {
    endAction(mbrDlvpSeqno) {
      if (!StringUtils.isEmpty(StringUtils.trim(this.returnUrl))) {
        // 배송지 추가에서 돌아오면 배송지 선택 팝업 열기 /* Market For의 주문결제화면 포함 (20210205 yiko 추가함.) */
        if (
          this.prevRoute.path.indexOf('/od/ordersheet/') > -1 ||
          this.prevRoute.path.indexOf('/od/mf/ordersheet/') > -1
        ) {
          localStorage.setItem('mbrDlvpSeqnoMax', mbrDlvpSeqno);
        }

        if (
          this.returnUrl.startsWith('http://') ||
          this.returnUrl.startsWith('https://')
        ) {
          const url = this.returnUrl.split('/').splice(3);
          this.$router.push('/' + url.join('/'));
        } else {
          this.$router.push(this.returnUrl);
        }
      } else {
        this.$router.push('/cu/delivery_place_list');
      }
    },
  },
  destroyed() {},
  mounted() {
    this.siteClass = CookieUtils.getSiteClass();
  },
  computed: {},
  created() {
    this.returnUrl = localStorage.getItem('returnUrl');
    if (!StringUtils.isEmpty(StringUtils.trim(this.returnUrl))) {
      this.returnUrl = this.returnUrl.toLowerCase();
      localStorage.removeItem('returnUrl');
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from;
    });
  },
};
</script>
