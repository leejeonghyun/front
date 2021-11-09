<template>
  <!-- 팝업이 붙는 페이지 최상단에 몰 구분 class가 있어야 함 -->
  <div id="popupFindAddress" class="wrap-full-popup" role="dialog" aria-modal="true">
    <div class="header-popup">
      <h2>주소검색</h2>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="inner-padding">
          <dl class="form-layout-address">
            <dt class="none-hidden">도로명</dt>
            <dd>{{ roadInfo }}</dd>
            <dt class="none-hidden">지번</dt>
            <dd>{{ jibunInfo }}</dd>
            <dt class="hidden"><label for="adresss-detail">상세주소</label></dt>
            <dd><input type="text" id="adresss-detail" class="inp-txt h40 w100" placeholder="상세 주소를 직접 입력해주세요." v-model="address.detail" /></dd>
          </dl>
          <!-- START : 하단 버튼 -->
          <div class="bottom-fixed-btn-area btns-several">
            <button type="button" @click="popupAction('popupFindAddress')" class="btn-bg btn-lg darkgray"><span>취소</span></button>
            <button type="button" @click="callbackAddress" class="btn-bg btn-lg lightgreen"><span>확인</span></button>
          </div>
          <!-- END : 하단 버튼 -->
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupAction('popupFindAddress')" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
    <!-- 주소검색 -->
    <PopupKakaoPost
            :paramQueryString="queryString"
            v-if="popup.popupKakaoPost"
            :slideMargin="22"
            :slideShow="4.5"
            @popupEvent="popupAction"
            @callbackAddressPost="callbackAddressPost"
    />
  </div>
</template>
<script>
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  import PopupKakaoPost from '@/views/ss/address/component/PopupKakaoPost.vue';
  import Config from '@/common/Config';
  import CookieUtils from '@/common/CookieUtils';
  export default {
    name: "PopupFindAddress",
    mixins: [LayerPopupMixin],
    metaInfo: {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '주소검색 팝업 < 결제 < %s'
    },
    props: {
      type: null,
      paramFindType: {type: String, default: "A", required: false},
      paramQueryString: {type: String, default: "", required: false},
    },
    data() {
      return {
        popup: {
          popupKakaoPost: false,
        },
        queryString: "",
        address: {
          jibun: "",
          road: "",
          zonecode: "",
          detail: ""
        },
        returnInfo: {},
      };
    },
    components: {
      PopupKakaoPost,
    },
    methods: {
      callbackAddressPost(rtn) {
        this.popup['popupKakaoPost'] = false;
        this.address.zonecode = rtn['zonecode'];
        this.address.jibun = rtn['jibunAddress'];
        this.address.road = rtn['roadAddress'];
        this.returnInfo = rtn;
        // 모달 숨김
        // console.log(rtn);
      },
      callbackAddress() { // 주소검색 호출 창 callback
        this.returnInfo['detailAddress'] = this.address.detail;
        this.$emit('callbackAddress', this.returnInfo);
      },
      popupAction(type) {
        this.popup[`${type}`] = !this.popup[`${type}`];
        this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false;
        if ( !this.popup[`${type}`] ) {
          this.$emit('popupEvent', "popupFindAddress");
        }
      },
    },
    created() {
      this.queryString = this.paramQueryString;
      this.popupAction('popupKakaoPost');
    },
    mounted() {
    },
    computed: {
      jibunInfo() {
        return this.address.zonecode ? '(' + this.address.zonecode + ')' + this.address.jibun : this.address.jibun;
      },
      roadInfo() {
        return this.address.zonecode ? '(' + this.address.zonecode + ')' + this.address.road : this.address.road;
      }
    }
  };
</script>
