<!--
views/ev/SC-FO-EV-GF-MS-009.vue
-->
<template>
  <section>
    <!-- START : 배송지 입력 레이어 -->
    <div id="popupEventGvwyAddr" class="wrap-full-popup active" role="dialog" aria-modal="true">
      <div class="header-popup">
        <h2>경품 배송지 입력하기</h2>
      </div>
      <div class="full-popup-body scroll-area">
        <div class="change-address-wrap">
          <div class="tbl-area sub-inner-box">
            <div class="tbl-top">
              <span class="inp-chk small">
                <input type="checkbox" id="member-default" @click="fnCopyInfo">
                <label for="member-default">회원정보와 동일</label>
              </span>
            </div>
            <h2 class="hidden">배송지 추가 입력 폼</h2>
            <dl class="form-layout-address">
              <dt class="hidden"><label for="name">받는분</label></dt>
              <dd>
                <input type="text" id="name" class="inp-txt h40 w100" placeholder="받는분" v-model="gvwyInfo.name" maxlength="30">
              </dd>
              <dt class="hidden"><label for="mobile01">휴대전화</label></dt>
              <dd class="tel">
                <span class="wrap-select">
                  <select id="mobile01" class="w-small h40" title="휴대폰 번호 앞자리" v-model="gvwyInfo.mobile01">
                    <template v-for="(mobile01,index) in mobile01List" v-bind="mobile01List">
                      <option v-bind:value="mobile01.commCd" v-bind:key="`mobile01`+index">{{mobile01.commCd}}</option>
                    </template>
                  </select>
                </span>
                <label for="mobile02" class="hidden">휴대전화 뒷자리</label>
                <input type="tel" id="mobile02" class="inp-txt h40" v-model="gvwyInfo.mobile02" placeholder="휴대전화" title="휴대폰 번호 뒷자리" maxlength="9" :change="fnInputPhone()">
              </dd>
              <dt class="hidden">
                <label for="adrsAddr">배송지</label>
              </dt>
              <dd class="address-code">
                <input type="text" id="adrsAddr" title="주소" v-model="queryString" class="inp-txt h40" placeholder="주소를 입력해주세요. ex)판교역로 235" maxlength="150" />
                <button type="button" id="searchAddr" class="btn-border btn-bg"
                        aria-label="주소검색팝업활성화"
                        aria-haspopup="dialog"
                        @click="popupFindAction('popupFindAddress', 'A')">주소검색</button>
              </dd>
              <dd>
                <button type="button" id="searchAddr2" class="btn-border btn-bg ico-addr"
                        aria-label="현위치로주소검색팝업활성화"
                        aria-haspopup="dialog"
                        @click="popupFindAction('popupFindAddress', 'G')">
                  <span>현 위치로 주소 검색</span>
                </button>
              </dd>
              <dt class="none-hidden" v-show="gvwyInfo.adrsZipcd">도로명</dt>
              <dd v-show="gvwyInfo.adrsZipcd">{{ addrInfo("road") }}</dd>
              <dt class="none-hidden" v-show="gvwyInfo.adrsZipcd">지번</dt>
              <dd v-show="gvwyInfo.adrsZipcd">{{ addrInfo("jibun") }}</dd>
            </dl>
          </div>
          <PopupFindAddress
                  v-if="popup.popupFindAddress"
                  :slideMargin="22"
                  :slideShow="4.5"
                  :paramFindType="findType"
                  :paramQueryString="queryString"
                  :paramX="gps.x"
                  :paramY="gps.y"
                  @popupEvent="popupFindAction"
                  @callbackAddress="callbackAddress"
          />
          <div class="bottom-fixed-btn-area wrap-btn">
            <button type="button" class="btn-lg btn-bg lightgreen" @click="fnGvwyAddr"><span>등록</span></button>
          </div>
        </div>
      </div>
      <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기">
        <span class="hidden">닫기</span>
      </button>
    </div>
    <!-- END : 배송지 입력 레이어 -->
  </section>
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import PopupFindAddress from './PopupFindAddress.vue';
import ApiUtils from '@/common/ApiUtils';
import Config from '@/common/Config.js';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'PopupEventGvwyAddr',
  mixins: [LayerPopupMixin],
  components: {
    PopupFindAddress
  },
  props: {
    popupEvent: Function,
    type: String,
  },
  data() {
    return {
      popup: {
        popupFindAddress: false,
      },
      mobile01List: [],
      gvwyInfo: {
        name: "",
        mobile01: "010",
        mobile02: "",
        adrsZipcd: "",
        adrsAddrJibun: "",
        adrsAddrRoad: "",
        adrsAddrJibunDtl: "",
        adrsAddrRoadDtl: "",
      },
      gps: {
        x: Config.address.home.gps.x,
        y: Config.address.home.gps.y
      },
      queryString: "",
      findType: "A",
      copyYn: false
    };
  },
  methods: {
    fnInputPhone() {
      if (this.gvwyInfo.mobile02) {
        const number = this.gvwyInfo.mobile02.replace(/[^0-9]/g, "");
        let phone = "";
        if (number.length <= 4) {
          phone += number.substr(0, 4);
        } else if (number.length < 7) {
          phone += number.substr(0, 4);
          phone += "-";
          phone += number.substr(4);
        } else {
          phone += number.substr(0, 4);
          phone += "-";
          phone += number.substr(4);
        }
        this.gvwyInfo.mobile02 = phone;
      }
    },
    fnCopyInfo(el) {
      if (el.currentTarget.checked) {
        ApiUtils.get('/fo/cu/mypgmgnt/deliveryplace')
        .then(res => {
          if (res.data && res.data.success && res.data.data && res.data.data.length > 0) {
            let baseDlvpYn = "N";
            this.copyYn = true;
            for (let i=0; i<res.data.data.length; i++) {
              const mem = res.data.data[i];
              if (mem.baseDlvpYn == "Y") {
                baseDlvpYn = mem.baseDlvpYn;
                this.gvwyInfo.name = mem.adrsNm;
                this.gvwyInfo.mobile01 = mem.moblTelNo01;
                this.gvwyInfo.mobile02 = mem.moblTelNo;
                this.gvwyInfo.adrsZipcd = mem.zipcd;
                this.gvwyInfo.adrsAddrJibun = mem.lotnoBaseAddr;
                this.gvwyInfo.adrsAddrRoad = mem.stnmBaseAddr;
                this.gvwyInfo.adrsAddrJibunDtl = mem.lotnoDtlAddr;
                this.gvwyInfo.adrsAddrRoadDtl = mem.stnmDtlAddr;
              }
            }
            if (baseDlvpYn == "N") {
              this.$gsdialog.alert("등록된 배송지 정보가 없습니다.");
            }
          } else {
            this.$gsdialog.alert("등록된 배송지 정보가 없습니다.");
          }
        })
        .catch(e => {
          // if (e.response) {
          //   this.$gsdialog.alert(e.message);
          // } else {
          //   this.$gsdialog.alert(e.response.data.statusMessage);
          // }
        });
      }
    },
    async fnGvwyAddr() {
      if (!this.gvwyInfo.name || this.gvwyInfo.name == "") {
        this.$gsdialog.alert("받는 분 이름을 입력해 주세요.");
        return false;
      }
      if (!this.gvwyInfo.mobile01 || this.gvwyInfo.mobile01 == "") {
        this.$gsdialog.alert("휴대폰번호를 확인해 주세요.");
        return false;
      }
      if (!this.gvwyInfo.mobile02 || this.gvwyInfo.mobile02 == "") {
        this.$gsdialog.alert("휴대폰번호를 확인해 주세요.");
        return false;
      }
      if (!this.gvwyInfo.adrsZipcd || this.gvwyInfo.adrsZipcd == "") {
        this.$gsdialog.alert("주소를 입력해 주세요.");
        return false;
      }
      if ( (!this.gvwyInfo.adrsAddrJibunDtl || this.gvwyInfo.adrsAddrJibunDtl == "") && !this.copyYn) {
        this.$gsdialog.alert("주소를 입력해 주세요.");
        return false;
      }
      const addrParams = {
        "adrsNm": this.gvwyInfo.name,
        "adrsMoblTelNo": this.gvwyInfo.mobile01 + "-" + this.gvwyInfo.mobile02,
        "adrsZipcd": this.gvwyInfo.adrsZipcd,
        "adrsBaseAddr": this.gvwyInfo.adrsAddrJibun,
        "adrsDtlAddr": this.gvwyInfo.adrsAddrJibunDtl,
        "adrsStnmBaseAddr": this.gvwyInfo.adrsAddrRoad,
        "adrsStnmDtlAddr": this.gvwyInfo.adrsAddrRoadDtl
      };
      this.$emit('fnPopupEventGvwyAddr', addrParams);
    },
    popupCloseAction() {
      this.$emit('popupEvent', 'popupEventGvwyAddr');
    },
    popupFindAction(type, findType) {
      this.popup[`${type}`] = !this.popup[`${type}`];

      if (findType) {
        this.findType = findType;
      }
      this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false;
    },
    callbackAddress(rtn) {
      // 모달 숨김
      this.popup['popupFindAddress'] = false;
      this.gvwyInfo.adrsZipcd = rtn['zonecode'];
      this.gvwyInfo.adrsAddrJibun = rtn['jibunAddress'];
      this.gvwyInfo.adrsAddrRoad = rtn['roadAddress'];
      this.gvwyInfo.adrsAddrJibunDtl = rtn['detailAddress'];
      this.gvwyInfo.adrsAddrRoadDtl = rtn['detailAddress'];
    },
    addrInfo(type) {
        let addr = "";
        if (this.gvwyInfo.adrsZipcd) {
          addr += '(' + this.gvwyInfo.adrsZipcd + ') ';
        }
      if (type == "jibun") {
        addr += ((this.gvwyInfo.adrsAddrJibun) ? this.gvwyInfo.adrsAddrJibun : "") + " " + ((this.gvwyInfo.adrsAddrJibunDtl) ? this.gvwyInfo.adrsAddrJibunDtl : "");
      } else {
        addr += ((this.gvwyInfo.adrsAddrRoad) ? this.gvwyInfo.adrsAddrRoad : "") + " " + ((this.gvwyInfo.adrsAddrRoadDtl) ? this.gvwyInfo.adrsAddrRoadDtl : "");
      }
      return addr;
    }
  },
  computed: {
  },
  watch: {
  },
  async mounted() {
    ApiUtils.get('/fo/cm/commcdmgnt/common-codes', { commGrpCd: 'CU0005' })
    .then(res => {
      if (res.data === null) {
        this.mobile01List = [{ commCd: "010" }];
        return;
      } else {
        this.mobile01List = res.data.data;
      }
    })
    .catch(e => {
      this.mobile01List = [{ commCd: "010" }];
    });
  },
};
</script>

<style>
</style>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
