<!--
Design: views\ss\SC-FO-SS-GF-MS-801.vue
Pg id: PG-FO-SS-O017
Uri: /sample/address_sample
-->
<template>
  <!-- 팝업이 붙는 페이지 최상단에 몰 구분 class 가 있어야 함 -->
  <div id="popupKakaoPost"
       class="wrap-full-popup"
       role="dialog"
       aria-modal="true"
       v-bind:class="[siteClass]"
  >
    <!-- : 실사용 소스 -->
    <!-- <div id="popupKakaoPost" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupKakaoPost}"> -->
    <div class="header-popup">
      <h2>주소검색</h2>
    </div>
    <div class="full-popup-body scroll-area">
      <div id="kakaoPost" class="inner-full-popup">
        <VueDaumPostcode
                :q="paramQueryString"
                :no-auto-mapping="true"
                @complete="callback"/>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction('popupKakaoPost')" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>
<script>
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  import { VueDaumPostcode } from "vue-daum-postcode";
  import CookieUtils from '@/common/CookieUtils';
  export default {
    name: 'PopupKakaoPost',
    mixins: [LayerPopupMixin],
    metaInfo: {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '주소검색 팝업 < 마이페이지 < %s'
    },
    props: {
      paramQueryString: {type: String, default: '', required: false}
    },
    data() {
      return {
        queryString: '',
        popup: {
          popupKakaoPost: false
        },
        siteClass: CookieUtils.getSiteClass(),
      };
    },
    components: {
      VueDaumPostcode,
    },
    methods: {
      callback(rtn) {
        if (!rtn['jibunAddress']) {
          this.$gsdialog.alert('지번주소를 선택해주세요.'); // 200709 kyg 기획요청반영: 해당 도로명주소에 다수 지번 존재시 지번 선택유도
          return;
        }
        this.$emit('callbackAddressPost', rtn);
      },
      popupCloseAction() {
        this.$emit('popupEvent', 'popupKakaoPost');
      }
    },
    mounted() {

    }
  };
</script>
