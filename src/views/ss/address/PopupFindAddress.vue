<template>
  <!-- 팝업이 붙는 페이지 최상단에 몰 구분 class가 있어야 함 -->
  <div
    v-show="this.ready2Render"
    id="popupFindAddress"
    class="wrap-full-popup"
    role="dialog"
    aria-modal="true"
    v-bind:class="[siteClass]"
  >
    <div class="header-popup">
      <h2>주소검색</h2>
    </div>
    <div class="full-popup-body has-fixed-bottom scroll-area">
      <div class="inner-full-popup">
        <div class="inner-padding">
          <dl class="form-layout-address">
            <dt class="none-hidden">도로명</dt>
            <dd>{{ roadInfo }}</dd>
            <dt class="none-hidden">지번</dt>
            <dd>{{ jibunInfo }}</dd>
            <dt class="hidden">
              <label for="adresss-detail">상세주소</label>
            </dt>
            <dd>
              <input
                type="text"
                id="adresss-detail"
                class="inp-txt h40 w100"
                placeholder="상세 주소를 직접 입력해주세요. (50자 이내)"
                v-model="address.detail"
                maxlength="50"
              />
            </dd>
          </dl>
        </div>
        <!-- START : 하단 버튼 -->
        <div class="bottom-fixed-btn-area btns-several">
          <button
            type="button"
            @click="popupAction('popupFindAddress')"
            class="btn-bg btn-lg darkgray"
          >
            <span>취소</span>
          </button>
          <button type="button" @click="callbackAddress" class="btn-bg btn-lg lightgreen">
            <span>완료</span>
          </button>
        </div>
        <!-- END : 하단 버튼 -->
      </div>
    </div>
    <button
      class="btn-layer-close"
      @click="popupAction('popupFindAddress')"
      @keydown.9="tabFocusRemove('popupAction')"
      aria-label="포커스 아웃 시 팝업 닫기"
    >
      <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
    <!-- 주소검색 재배포-->
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
      :markerDraggable="markerDraggable"
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
import ContextUtils from '@/common/ContextUtils';
import GeoUtils from '@/common/ss/GeoUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
export default {
  name: 'PopupFindAddress',
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '주소검색 팝업 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '주소검색',
      },
    ],
  },
  props: {
    type: null,
    paramFindType: { type: String, default: 'A', required: false },
    paramQueryString: { type: String, default: '', required: false },
    paramY: {
      type: Number,
      default: Config.address.home.gps.y,
      required: false,
    },
    paramX: {
      type: Number,
      default: Config.address.home.gps.x,
      required: false,
    },
    markerDraggable: { type: Boolean, default: false, required: false },
  },
  data() {
    return {
      popup: {
        popupKakaoPost: false,
        popupKakaoMap: false,
      },
      y: '',
      x: '',
      ready2Render: false,
      queryString: '',
      address: {
        jibun: '',
        road: '',
        zonecode: '',
        detail: '',
      },
      returnInfo: {},
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: { PopupKakaoPost, PopupKakaoMap },
  methods: {
    callbackAddressPost(rtn) {
      // 모달 숨김
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
    callbackAddress() {
      // 주소검색 호출 창 callback
      if (StringUtils.isEmpty(StringUtils.trim(this.address.detail))) {
        this.$gsdialog.alert('상세주소를 입력하세요.');
      } else {
        if (StringUtils.trim(this.address.detail).length > 50) {
          this.$gsdialog.alert('주소는 50자 이내로 입력해 주세요.');
          return false;
        }
        this.returnInfo['detailAddress'] = this.address.detail;
        this.$emit('callbackAddress', this.returnInfo);
      }
    },
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false);
      if (!this.popup[`${type}`]) {
        this.$emit('popupEvent', 'popupFindAddress');
      }
    },
    closePopup() {
      this.$emit('popupEvent', 'popupFindAddress');
    },
    getGeo() {
      GeoUtils.getGeolocation()
        .then(result => {
          if (result) {
            this.x = result.lat;
            this.y = result.lng;
            this.ready2Render = true;
            this.popupAction('popupKakaoMap');
          } else {
            this.closePopup();
          }
        })
        .catch(e => {
          console.log('popupFindAdress catch ', e);
          this.closePopup();
        });
    },
  },
  async created() {
    window.appCallAppInfo();
    this.queryString = this.paramQueryString;
    if (this.paramFindType === 'G') {
      const isNative = ContextUtils.isNative();
      if (isNative) {
        // 약관 조회 파라미터
        const params = {
          cmmSteId: CookieUtils.getCmmSteId(),
          dvcId: localStorage.getItem('deviceId'),
          appAgrmCd: '02',
        };
        const result = await ApiUtils.get(
          '/fo/cu/mbrmgnt/app-agreement-assent',
          params
        );
        if (result['data']['success'] == true) {
          const data = result['data']['data'];
          // 위치정보허용 동의 API call return success
          let isAgr = false;
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              // 위치동의 약관 02 / Y
              if (
                data[i]['appAgrmCd'] === '02' &&
                data[i]['agrmAgrYn'] === 'Y'
              ) {
                isAgr = true;
              }
            }
          }
          if (!isAgr) {
            // 등록
            this.$gsdialog
              .confirm('위치정보 수집을 허용하시겠습니까?', {
                html: true,
                header: '위치정보수집',
              })
              .then(dialog => {
                const params = {
                  cmmSteId: CookieUtils.getCmmSteId(),
                  dvcId: localStorage.getItem('deviceId'),
                  appAgrmCd: '02',
                  agrmAgrYn: 'Y',
                };
                ApiUtils.post('/fo/cu/mbrmgnt/app-agreement-assent', params)
                  .then(result => {
                    if (result['data']['success'] == true) {
                      // 위치정보허용 동의 API call return success
                      // 여부관계없이 닫음
                      // GeoUtils.getPos();
                    }
                    console.log('[위치정보 허용 동의함]');
                    this.getGeo();
                  })
                  .catch(error => {
                    console.log('[위치정보 API ERROR]');
                    this.closePopup();
                  });
              })
              .catch(error => {
                this.closePopup();
              });
          } else {
            this.getGeo();
          }
        }
      } else {
        this.getGeo();
      }
    } else {
      this.ready2Render = true;
      this.popupAction('popupKakaoPost');
    }
  },
  mounted() {},
  computed: {
    jibunInfo() {
      return this.address.zonecode
        ? this.address.zonecode + ' ' + this.address.jibun
        : this.address.jibun;
    },
    roadInfo() {
      return this.address.zonecode
        ? this.address.zonecode + ' ' + this.address.road
        : this.address.road;
    },
  },
};
</script>
