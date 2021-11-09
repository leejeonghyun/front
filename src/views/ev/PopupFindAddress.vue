<template>
  <!-- 팝업이 붙는 페이지 최상단에 몰 구분 class가 있어야 함 -->
  <div id="popupFindAddress" class="wrap-full-popup" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
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
            <dd><input type="text" id="adresss-detail" class="inp-txt h40 w100" placeholder="상세주소를 입력해주세요." v-model="address.detail" /></dd>
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
    <button class="btn-layer-close" @click="popupAction('popupFindAddress')" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기">
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
    <!-- 위치검색 -->
    <PopupKakaoMap
            :paramY="y"
            :paramX="x"
            v-if="popup.popupKakaoMap"
            :slideMargin="22"
            :slideShow="4.5"
            @popupEvent="popupAction"
            @callbackAddressMap="callbackAddressMap"
    />
  </div>
</template>
<script>
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  import PopupKakaoPost from '@/views/ss/address/component/PopupKakaoPost.vue';
  import PopupKakaoMap from '@/views/ss/address/component/PopupKakaoMap.vue';
  import Config from '@/common/Config';
  import CookieUtils from '@/common/CookieUtils';
  export default {
    name: "PopupFindAddress",
    mixins: [LayerPopupMixin],
    props: {
      type: null,
      paramFindType: {type: String, default: "A", required: false},
      paramQueryString: {type: String, default: "", required: false},
      paramY: {type: Number, default: undefined, required: false},
      paramX: {type: Number, default: undefined, required: false}
    },
    data() {
      return {
        popup: {
          popupKakaoPost: false,
          popupKakaoMap: false
        },
        y: Config.address.home.gps.y,
        x: Config.address.home.gps.x,
        queryString: "",
        address: {
          jibun: "",
          road: "",
          zonecode: "",
          detail: ""
        },
        returnInfo: {},
        siteClass: CookieUtils.getSiteClass(),
      };
    },
    components: {PopupKakaoPost, PopupKakaoMap},
    methods: {
      callbackAddressPost(rtn) {
        this.popup['popupKakaoPost'] = false;
        this.address.zonecode = rtn['zonecode'];
        this.address.jibun = rtn['jibunAddress'];
        this.address.road = rtn['roadAddress'];
        this.returnInfo = rtn;
      },
      callbackAddressMap(rtn) {
        // 모달 숨김
        this.popup['popupKakaoMap'] = false;
        if (!rtn.zonecode) {
          this.popup['popupKakaoPost'] = true;
        } else {
          this.popup['popupKakaoPost'] = false;
          this.returnInfo = rtn;
          this.address.zonecode = rtn['zonecode'];
          this.address.jibun = rtn['jibun'];
          this.address.road = rtn['road'];
          this.returnInfo['jibunAddress'] = rtn['jibun'];
          this.returnInfo['roadAddress'] = rtn['road'];
        }
      },
      callbackAddress() { // 주소검색 호출 창 callback
        this.returnInfo['detailAddress'] = this.address.detail;
        if (this.address.detail == '') {
          this.$gsdialog.alert("상세주소를 입력해주세요.");
          return;
        }
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
      if (this.paramFindType == 'G') {
        this.popupAction('popupKakaoMap');
        this.y = this.paramY;
        this.x = this.paramX;
        this.queryString = "";
      } else {
        this.popupAction('popupKakaoPost');
      }
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
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
