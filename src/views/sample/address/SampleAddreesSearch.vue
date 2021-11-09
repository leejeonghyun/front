<!--
Design:
Pg id:
Uri: /sample/address_sample
-->
<template>
  <!-- 주소검색 샘플 -->
  <!-- 샘플 페이지 주소 : http://localhost:7300/sample/address_sample -->
  <div class="section-area pd-top" v-bind:class="[siteClass]">
    <div class="sub-inner-box">
      <div class="receive-delivery-info">
        <div class="form-layout-address">
<!--          <p> 주소검색 컴포넌트 Props (:paramQueryString="{{ queryString }}"):</p> -->
          <dd class="address-code">
            <input type="text" id="address" title="우편번호" v-model="queryString" class="inp-txt h40 " placeholder="주소를 입력해주세요. ex)판교역로 235"/>
            <button type="button" id="searchAddr" class="btn-border btn-bg"
                    aria-label="주소검색팝업활성화"
                    aria-haspopup="dialog"
                    @click="popupAction('popupFindAddress', 'A')">주소검색</button>
          </dd>
          <dd>
            <button type="button" id="searchAddr2" class="btn-border btn-bg ico-addr"
                    aria-label="현위치로주소검색팝업활성화"
                    aria-haspopup="dialog"
                    @click="popupAction('popupFindAddress', 'G')">
              <span>현 위치로 주소 검색</span>
            </button>
          </dd>
          <dt class="none-hidden">
            도로명
          </dt>
          <dd>
            {{ roadInfo }}
          </dd>
          <dt class="none-hidden">
            지번
          </dt>
          <dd>
            {{ jibunInfo }}
          </dd>
          <dt class="none-hidden">
            주문매장
          </dt>
          <dd>
            {{ centerInfo }}
          </dd>
        </div>
      </div>
      <PopupFindAddress
              v-if="popup.popupFindAddress"
              :slideMargin="22"
              :slideShow="4.5"
              :paramFindType="findType"
              :paramQueryString="queryString"
              :markerDraggable="true"
              @popupEvent="popupAction"
              @callbackAddress="callbackAddress"
      />
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import PopupFindAddress from '@/views/ss/address/PopupFindAddress.vue';
import Config from '@/common/Config.js';
import CookieUtils from '@/common/CookieUtils';
  export default {
    name: "SampleAddreesSearch",
    data() {
      return {
        siteClass: CookieUtils.getSiteClass(),
        popup: {
          popupFindAddress: false,
        },
        addressInfo: {
          jibun: "",
          road: "",
          zonecode: "",
          detail: "",
          centerName: "",
          centerCode: "",
        },
        address: {},
        queryString: Config.address.home.road, /* 기본 주소값 검색 시 props 전달 하세요. <PopupFindAddress :paramQueryString="queryString" */
        gps: {
          x: Config.address.home.gps.x,
          y: Config.address.home.gps.y
        },
        findType: "A"
      };
    },
    props: ['type'],
    mixins: [LayerPopupMixin],
    components: {
        PopupFindAddress
    },
    methods: {
      popupAction(type, findType) {
        this.popup[`${type}`] = !this.popup[`${type}`];

        if (findType) {
          this.findType = findType;
        }
        if (`${type}` == 'popupFindAddress') {
           // this.popup['popupSearchAddressPost'] = !this.popup[`${type}`];
        } else if (`${type}` == 'popupFindAddress') {
           // this.popup['popupSearchAddressMap'] = !this.popup[`${type}`];
        }
        this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false;
      },
      callbackAddress(rtn) {
        // 모달 숨김
        this.popup['popupFindAddress'] = false;
        this.addressInfo.zonecode = rtn['zonecode'];
        this.addressInfo.detail = rtn['detailAddress'];
        this.addressInfo.jibun = rtn['jibunAddress'];
        this.addressInfo.road = rtn['roadAddress'];
        console.log(JSON.stringify(rtn));
      }
    },
    destroyed() {
    },
    mounted() {
    },
    computed: {
      jibunInfo() {
        let info = "";
        if (this.addressInfo.zonecode) {
          info += '(' + this.addressInfo.zonecode + ')';
        }
        if (this.addressInfo.jibun) {
          info += " " + this.addressInfo.jibun + " " + this.addressInfo.detail;
        }
        return info;
      },
      roadInfo() {
        let info = "";
        if (this.addressInfo && this.addressInfo.zonecode) {
          info += '(' + this.addressInfo.zonecode + ')';
        }
        if (this.addressInfo && this.addressInfo.road) {
          info += " " + this.addressInfo.road + " " + this.addressInfo.detail;
        }
        return info;
      },
      centerInfo() {
        return this.addressInfo.centerName;
      }
    }
  };
</script>
