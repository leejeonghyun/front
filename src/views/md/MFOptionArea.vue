<template>
  <div :class="{'btn-fixed-bottom active': dispType === 'MD'}" >
    <PopupOptionDefault v-if="this.popup.optionDefault" v-bind:itemData="itemData" v-bind:dispType="dispType" v-bind:params="params" @popupAction="popupAction" @setOrder="setOrder"/>
    <PopupOptionPackage v-if="this.popup.optionPackage" v-bind:itemData="itemData" v-bind:dispType="dispType" v-bind:params="params" @popupAction="popupAction" @setOrder="setOrder"/>
    <PopupOptionResvDefault v-if="this.popup.optionResvDefault" v-bind:itemData="itemData" v-bind:dispType="dispType" v-bind:params="params" @popupAction="popupAction" @setOrder="setOrder" @setDeliveryDate="setDeliveryDate"/>
    <PopupRstkinInfm v-if="this.popup.rstkinInfm" @popupAction="popupAction" v-on:rstkinInfmRqt="setRstkinInfmRqt" v-bind:dispType="dispType"/>
    <!-- 입고알림 -->
    <div class="wrap-btn" v-if="(itemData.ofsYn === 'Y' || itemData.sellPosbQty == 0) && dispType === 'MD'">
      <button class="btn-lg btn-bg lightgreen" :disabled="'true'" aria-label="일시품절" aria-haspopup="dialog" v-on:click="getRstkinInfmRqt">일시품절 상품입니다</button> <!--v-on:click="getRstkinInfmRqt">일시품절 상품입니다.</button> -->
    </div>
    <!-- 선물하기/조르기, 장바구니, 바로구매 -->
    <div class="wrap-btn" v-if="(itemData.ofsYn === 'N' && itemData.sellPosbQty > 0) && dispType === 'MD'">
    <!--  <button class="btn-gift lightgray" aria-label="선물하기 / 조르기 팝업 활성화" aria-haspopup="dialog" @click="setOrder('G')"><span class="hidden">선물하기 / 조르기</span></button> -->
      <button class="btn-lg  border" aria-haspopup="dialog" @click="setOrder('C')"
        data-sc-action="prod.getAtcData"
        data-dimension-name="prod.Detail"
        :data-dimension-value="itemData.itemId"
        style="display:block"
        id = "itemCart"
        v-if="!orderNowStatus"
      >
        장바구니
      </button>
      <button class="btn-lg btn-bg black" aria-haspopup="dialog" :disabled="orderNowStatus" @click="setOrder('S')">{{orderNow}}</button>
    <!--  <button class="btn-lg btn-bg lightgreen" aria-haspopup="dialog" @click="setOrder('S')">바로구매</button> -->
    </div>
    <!-- 일반형, 선택형 상품 -->
    <div class="wrap-btn-option-popup" :class="{open: this.popup.optionDefault}" v-if="this.popup.optionDefault && (itemData.ofsYn === 'N' && itemData.sellPosbQty > 0) && dispType === 'MD'">
      <button class="btn btn-option-popup" @click="popupAction('optionDefault')" @keydown.9="tabFocusRemove('optionDefault')" aria-label="포커스 아웃 시 팝업 닫기">
        <span class="hidden">옵션팝업닫기</span>
      </button>
    </div>
    <!-- 패키지 상품 -->
    <div class="wrap-btn-option-popup" :class="{open: this.popup.optionPackage}" v-if="this.popup.optionPackage && (itemData.ofsYn === 'N' && itemData.sellPosbQty > 0) && dispType === 'MD'">
      <button class="btn btn-option-popup" @click="popupAction('optionPackage')" @keydown.9="tabFocusRemove('optionPackage')" aria-label="포커스 아웃 시 팝업 닫기">
        <span class="hidden">옵션팝업닫기</span>
      </button>
    </div>
    <!-- 예약상품[일반형, 선택형] -->
    <div class="wrap-btn-option-popup" :class="{open: this.popup.optionResvDefault}" v-if="this.popup.optionResvDefault && (itemData.ofsYn === 'N' && itemData.sellPosbQty > 0) && dispType === 'MD'">
      <button class="btn btn-option-popup" @click="popupAction('optionResvDefault')" @keydown.9="tabFocusRemove('optionResvDefault')" aria-label="포커스 아웃 시 팝업 닫기">
        <span class="hidden">옵션팝업닫기</span>
      </button>
    </div>
    <DaybreakpopupPutInCart01 v-if="this.popup.dayBrkDisable" @popupEvent="popupAction"/>
    <DaybreakpopupPutInCart02 v-if="this.popup.defAddrReg" @popupEvent="popupAction"/>
    <!-- START : layer POPUP -->
    <transition name="toastPopup" v-on:after-enter="toastPopupAfterEnter" v-on:leave="toastPopupEnterLeave">
      <PopupToast :ToastMessage="toastMessage" @popupEvent="popupAction" v-if="popup.popupToastCart" :popupToast="popup.popupToastCart"  popupToastType="popupToastCart" />
    </transition>
    <!-- START : layer POPUP -->
  </div>
</template>
<script>
import {EventBus} from '../../views/md/ProductDetail';
import ApiUtils from '@/common/ApiUtils';
import LayPopupMixin from '@/mixins/LayerPopupMixin';
import PopupOptionDefault from '@/views/md/MFOptionDefault'; // 팝업 - 일반형, 선택형 상품
import PopupOptionPackage from '@/views/md/MFOptionPackage'; // 팝업 - 패키지 상품
import PopupOptionResvDefault from '@/views/md/MFOptionResvDefault'; // 팝업 - 예약상품[일반형, 선택형}
import PopupRstkinInfm from '@/views/md/RstkinInfm'; // 팝업 - 재입고 알림
import DaybreakpopupPutInCart01 from '@/views/md/DaybreakpopupPutInCart01'; // 팝업 - 새벽배송불가
import DaybreakpopupPutInCart02 from '@/views/md/DaybreakpopupPutInCart02'; // 팝업 - 기본배송지등록
import PopupToast from '@/components/common/PopupToast';
import SiteUtils from '@/common/SiteUtils';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';
import DateUtils from '@/common/DateUtils';
import Tracker from '@/common/Tracker';

export default {
  name: "OptionArea",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(), // 'GS fresh',
    // titleTemplate: '상품상세 < %s'
  },
  components: {
    PopupOptionDefault,
    PopupOptionPackage,
    PopupOptionResvDefault,
    PopupRstkinInfm,
    DaybreakpopupPutInCart01,
    DaybreakpopupPutInCart02,
    PopupToast,
  },
  props: {
    // 전시유형
    dispType: {
      type: String,
      default: 'MD'
    },
    // 배송유형
    delivType: {
      type: String,
      default: ''
    }
  },
  mixins: [LayPopupMixin],
  data() {
    return {
        popup: { // 팝업
          open: false,
          optionDefault: false, // 기본
          optionPackage: false, // 패키지
          optionResvDefault: false, // 예약
          rstkinInfm: false, // 재입고알림 팝업
          dayBrkDisable: false, // 새벽배송불가팝업
          defAddrReg: false, // 기본배송지안내팝업
          popupToastCart: false,
        },
        itemData: {}, // getOrder 에서 조회 후 set 하여 사용
        // itemId: '', // 사용하지 않음, 삭제예정
        deliveryDate: '', // 도착 예정일
        params: {}, // 넘겨받은 Param OBJ(getOrder 에서 set 하여 사용)
        cookieMallId: CookieUtils.getMallId(),
        defMallId: this.$route.query.mallId||CookieUtils.getCookie('MALL_ID'),
        isLogin: this.$store.state.md.isLogin, // 로그인 여부(true/false)
        baseDelivery: false, // 기본 배송지 유뮤(true:있음, false:없음)
        dayBraeakDeliveryRegn: false, // 새벽배송대상지 존재유무(true:있음, false:없음)
        daybreakDelivRegn: [], // 새벽배송지역 정보
        zipcd: "",
        ssevntId: this.$route.query.ssevntId,
        ssevntTimes: this.$route.query.ssevntTimes,
        orderNow: '바로구매',
        orderNowStatus: false,
        toastMessage: '',
    };
  },
  async created() {
    try {
      this.$store.state.md.itemSelectedList = [];
      const vm = this;
      vm.getBaseDeliv(); // 기본배송정보(zipcd등) 호출
      if (vm.$store.state.dp.daybreak) {
        setTimeout(fn, 500);
        // eslint-disable-next-line require-jsdoc
        async function fn() {
          vm.getDaybreakDelivRegn();
        }
      }
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  mounted() {
    const vm = this;
    EventBus.$on('setOrderAction', function(payload) {
      console.log("payload :: ", payload);
      vm.setOrder(payload);
    });
    console.log(" ==dispType== " + this.dispType);
  },
  methods: {
    /* #################### Event #################### */
    toastPopupAfterEnter(el) {
      el.style.opacity = 1;
    },
    toastPopupEnterLeave(el) {
      el.style.opacity = 0;
    },
    popupAction(type) { // 팝업 활성/비활성
      console.log("popupAction type : "+type);
      const $this = this;
      // const options = ['optionPackage ', 'optionDefault'];
      const options = ['optionDefault', 'optionPackage', 'optionResvDefault', 'dayBrkDisable', 'defAddrReg'];
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
      options.some(function(option) {
        if (type === option) {
          $this.popup.open = false;
        }
      });
      if (type === 'popupToast') {
        this.popup.optionDefault = false;
        this.popup.popupToastCart = !this.popup.popupToastCart;
      }
      if (type === 'optionDefault') {
        console.log("popupAction optionDefault : ", $this.popup.optionDefault);
        if ($this.popup.optionDefault === false) {
          this.itemSelYn = "N";
        }
      }
      if ($this.dispType == 'MDP') {
        $this.$store.commit('bkItemSelectedList');
        $this.$emit('cartCall');
      }
    },
    setDeliveryDate(p) {
      this.deliveryDate = p;
    },
    /* #################### Data Access #################### */
    /* ### [S]바로구매, 장바구니 버튼 ### */
    hideOptionDefault: async function() {
      console.log("hideOptionDefault");
      // this.popupAction('optionDefault');
      this.popup.optionDefault = false;
      this.popup.open = false;
      return;
    },
    setOrder: async function(type) {
      if ((type === 'S' || type === 'G') && !LoginUtils.isLogin()) {
        console.log("setOrder GO LOGIN!! : "+type);
        const returnUrl = encodeURIComponent(location.href);
        const loginUrl = SiteUtils.commo('/cu/login?returnUrl=' + returnUrl);
        location.href = loginUrl;
        return;
      }
      /*
      [itemCompoCd][01:일반상품, 02:패키지, 03:선택형, 04:대용량정육]
      [resvItemYn][Y:예약상품]
      [resvKind][01:날짜 지정형, 02:날짜 고정형]
      */
      if (this.itemData.itemCompoCd == '01' || this.itemData.itemCompoCd == '03') {
        if (this.itemData.resvItemYn == 'Y' && this.itemData.resvKind == '01') {
          if (this.popup.optionResvDefault == false) {
            this.popup.optionResvDefault = true;
            return;
          }
        } else if (this.itemData.resvItemYn == 'Y' && this.itemData.resvKind == '02') {
          if (this.popup.optionDefault == false) {
            this.popup.optionDefault = true;
            return;
          }
        } else {
          if (this.popup.optionDefault == false) {
            console.log("this.popup.optionDefault == false");
            this.popup.optionDefault = true;
            // this.$emit('callCart');
            return;
          }
        }
      } else if (this.itemData.itemCompoCd == '02') {
        if (this.popup.optionPackage == false) {
          this.popup.optionPackage = true;
          return;
        }
      }

      if (this.itemData.resvItemYn == 'Y' && this.itemData.resvKind == '01') {
        if (this.deliveryDate == '') {
          this.$gsdialog.alert("도착 예정일을 선택하세요.");
          return;
        }
      }

      if (this.$store.state.md.itemSelectedList.length == 0) {
        this.$gsdialog.alert("상품의 옵션을 선택하세요.");
        return;
      }
      if (this.$store.state.md.itemSelectedList.length > 0) {
        console.log("gogogogo~ cart!!!!!!!!!!" + JSON.stringify(this.$store.state.md.itemSelectedList));
        this.saveBskt(type, this.$store.state.md.itemSelectedList);
      }
    },
    async saveBskt(type, itemSelectedList) {
     // alert(encodeURIComponent(location.href));
      if (itemSelectedList.length > 0) {
        console.log("saveBskt start!!!!!!!!!!");
        const bsktPutInputDto = {};
        let itemCompoCdVal = this.itemData.itemCompoCd;
        if (itemCompoCdVal == '03') { // 선택형 상품은 주문쪽에서 일반주문과 다를바 없다하여 일반주문코드로 전달해달라고 함.
          itemCompoCdVal = "01";
        }
        let resvKindVal = "10";
        if (this.itemData.resvItemYn == 'Y' && this.itemData.resvKind == '01') {
          resvKindVal = "50";
        }
        let grpItemId = "";
        if (this.itemData.itemCompoCd == '03' || this.itemData.itemCompoCd == '02' ) {
          grpItemId = this.itemData.itemId;
        }

        let storIdVal = "";
        let supplFirmCdVal = "";
        if (type != 'G') { // 선물하기시에는 아래 값 빈값
          storIdVal = this.params.storId;
          supplFirmCdVal = this.params.supplFirmCd;
        }
        // bsktPutInputDto.ordTypeCd = resvKindVal;
        // bsktPutInputDto.delivTypeCd = "03";
        bsktPutInputDto.mallId = this.defMallId;
        if (bsktPutInputDto.mallId != '1' && bsktPutInputDto.mallId != '11') { // 추가
          grpItemId = this.itemData.itemId;
        }
        const odBsktUuid = CookieUtils.getOdBsktUuid(); // 비로그인시 장바구니ID값
        bsktPutInputDto.sessnId = odBsktUuid;

        let bsktTypeCdVal = "1"; // 장바구니:1, 바로구매:2, 선물하기:3
        if (type == 'S') {
          bsktTypeCdVal = "2";
        } else if (type == 'G') {
          bsktTypeCdVal = "3";
        }
        bsktPutInputDto.bsktTypeCd = bsktTypeCdVal;

        bsktPutInputDto.zipcd = this.zipcd;

        const itemSelectedListVal = itemSelectedList;
        console.log("itemSelectedListVal :: ", itemSelectedListVal[0].addCompo);

        const chanlIdVal = '';
        console.log("this.$route.query.chanlId :: "+ this.$route.query.chanlId);
        if (this.$route.query.chanlId != null && this.$route.query.chanlId != undefined ) {
          chanlIdVal = this.$route.query.chanlId;
        }
        const deliveryDateVal = this.deliveryDate;
        const deliveryDateRep = deliveryDateVal.split('-').join('');
        const bsktPutDtoListTmp = [];
        let giftUnableCnt = 0;
        for (let i = 0; i < itemSelectedListVal.length; i++) {
          if (itemSelectedListVal[i].delivTypeCd != '01' && itemSelectedListVal[i].delivTypeCd != '02' && itemSelectedListVal[i].delivTypeCd != '03') {
            console.log("giftUnableCnt ++ :: "+itemSelectedListVal[i].itemId+" : "+itemSelectedListVal[i].delivTypeCd);
            giftUnableCnt++;
          }
          let itemGrpSeqnoVal = "";
          // if (this.itemData.itemCompoCd == '03' || this.itemData.itemCompoCd == '02' ) {
            itemGrpSeqnoVal = i;
          // }
          // let itemIdVal = "";
          // let skuIdVal = "";
          const bsktPutDto = {};
          if (this.itemData.itemCompoCd == '02' ) {
            console.log("in itemCompoCd == '02' :: "+this.itemData.itemId);
            bsktPutDto.itemId = this.itemData.itemId;
            bsktPutDto.skuId = this.itemData.skuId;
          } else {
            bsktPutDto.itemId = itemSelectedListVal[i].itemId;
            bsktPutDto.skuId = itemSelectedListVal[i].skuId;
          }

          let delivTypeCdVal = itemSelectedListVal[i].delivTypeCd;
          if (type == 'G' && delivTypeCdVal == '01') { // 선물하기일때 당일배송이면 전국택배로 변경해서 전달.
            delivTypeCdVal = '02';
          }
          // console.log("itemIdVal final :: "+itemIdVal);
          // bsktPutDto.itemId = itemIdVal;
          bsktPutDto.itemCompoCd = itemCompoCdVal;
          bsktPutDto.itemGrpSeqno = itemGrpSeqnoVal;
          bsktPutDto.relatBsktId = this.$route.query.relatBsktId;
          // bsktPutDto.dspCtgId = this.$route.query.lowDspCtgId;
          // bsktPutDto.skuId = skuIdVal;
          bsktPutDto.grpItemId = grpItemId;
          bsktPutDto.bsktQty = itemSelectedListVal[i].totQty;
          bsktPutDto.relatBsktId = '';
          bsktPutDto.chanlId = chanlIdVal;
          bsktPutDto.promList = itemSelectedListVal[i].prom,
          bsktPutDto.delivDt = deliveryDateRep;
          bsktPutDto.storId = storIdVal;
          bsktPutDto.supplFirmCd = supplFirmCdVal;
          bsktPutDto.zipcd = this.zipcd;
          bsktPutDto.ssevntId = this.ssevntId;
          bsktPutDto.ssevntTimes = this.ssevntTimes;
          bsktPutDto.delivTypeCd = delivTypeCdVal;
          bsktPutDto.ordTypeCd = resvKindVal;
          // tracker 파라미터 시작
          bsktPutDto.dspCtgId = this.itemData.dspCtgId;
          bsktPutDto.dspCtgNm = this.itemData.dspCtgNm;
          bsktPutDto.itemNm = this.itemData.itemNm;
          bsktPutDto.itemCd = itemSelectedListVal[i].itemCd;
          bsktPutDto.sellAmt = itemSelectedListVal[i].sellAmt;
          bsktPutDto.totQty = itemSelectedListVal[i].totQty;
          bsktPutDto.mallId = this.defMallId;
          // tracker 파라미터 종료
          bsktPutDtoListTmp.push(bsktPutDto);
          if (this.itemData.itemCompoCd == '02' ) {
            for (let j = 0; j < itemSelectedListVal[i].itemId.length; j++) {
              console.log("in itemSelectedListVal :: "+itemSelectedListVal[i].itemId[j]);
              const bsktPkgDto = {};
              bsktPkgDto.itemId = itemSelectedListVal[i].itemId[j];
              bsktPkgDto.skuId = itemSelectedListVal[i].skuId[j];
              bsktPkgDto.itemCompoCd = itemCompoCdVal;
              bsktPkgDto.itemGrpSeqno = itemGrpSeqnoVal;
              bsktPkgDto.relatBsktId = this.$route.query.relatBsktId;
              // bsktPkgDto.dspCtgId = this.$route.query.lowDspCtgId;
              bsktPkgDto.dspCtgId = this.itemData.dspCtgId;
              bsktPkgDto.dspCtgNm = this.itemData.dspCtgNm;
              bsktPkgDto.grpItemId = grpItemId;
              bsktPkgDto.bsktQty = itemSelectedListVal[i].totQty;
              bsktPkgDto.relatBsktId = '';
              bsktPkgDto.chanlId = chanlIdVal;
              bsktPkgDto.promList = itemSelectedListVal[i].prom,
              bsktPkgDto.delivDt = deliveryDateRep;
              bsktPkgDto.storId = storIdVal;
              bsktPkgDto.supplFirmCd = supplFirmCdVal;
              bsktPkgDto.zipcd = this.zipcd;
              bsktPkgDto.ssevntId = this.ssevntId;
              bsktPkgDto.ssevntTimes = this.ssevntTimes;
              bsktPkgDto.delivTypeCd = delivTypeCdVal;
              bsktPkgDto.ordTypeCd = resvKindVal;
              bsktPkgDto.mallId = this.defMallId;
              bsktPutDtoListTmp.push(bsktPkgDto);
            }
          }
          // 추가구성품 선택시
          if (itemSelectedListVal[i].addCompo != null) {
            for (let k = 0; k < itemSelectedListVal[i].addCompo.length; k++) {
              const bsktAddDto = {};
                bsktAddDto.itemId = itemSelectedListVal[i].addCompo[k].itemId;
                bsktAddDto.skuId = itemSelectedListVal[i].addCompo[k].skuId;
                bsktAddDto.itemCompoCd = itemCompoCdVal;
                bsktAddDto.itemGrpSeqno = itemGrpSeqnoVal;
                bsktAddDto.relatBsktId = this.$route.query.relatBsktId;
                // bsktAddDto.dspCtgId = this.$route.query.lowDspCtgId;
                bsktAddDto.dspCtgId = this.itemData.dspCtgId;
                bsktAddDto.dspCtgNm = this.itemData.dspCtgNm;
                bsktAddDto.grpItemId = grpItemId;
                bsktAddDto.bsktQty = itemSelectedListVal[i].addCompo[k].totQty;
                bsktAddDto.relatBsktId = '';
                bsktAddDto.promList = itemSelectedListVal[i].addCompo[k].prom,
                bsktAddDto.delivDt = deliveryDateRep;
                bsktAddDto.storId = storIdVal;
                bsktAddDto.supplFirmCd = supplFirmCdVal;
                bsktAddDto.zipcd = this.zipcd;
                bsktAddDto.ssevntId = this.ssevntId;
                bsktAddDto.ssevntTimes = this.ssevntTimes;
                bsktAddDto.delivTypeCd = delivTypeCdVal;
                bsktAddDto.ordTypeCd = resvKindVal;
                bsktAddDto.mallId = this.defMallId;
                bsktPutDtoListTmp.push(bsktAddDto);
            }
          }
        }
        console.log("giftUnableCnt :: "+giftUnableCnt);
        // if (type == 'G' && (giftUnableCnt > 0 || deliveryDateRep != '')) {
        //   this.$gsdialog.alert("예약, 해외, 새벽, 무배송 상품은 선물이 불가합니다. 선물할 상품을 다시 확인 해 주세요.");
        //   return;
        // }

        bsktPutInputDto.bsktPutDtoList = bsktPutDtoListTmp;
      // bsktPutInputDto.addPutDtoList = itemSelectedListVal[0].addCompo;
        console.log("bsktPutInputDto data:: ", JSON.stringify(bsktPutInputDto));

        try {
          let apiUrl = "";
          if (type == 'C' || type == 'G') {
            apiUrl = "/fo/od/mf/bsktmgnt/basket-item";
            if (this.params.mallId === '1' || this.params.mallId === '11' || this.params.mallId === '20') {
              apiUrl = "/fo/od/bsktmgnt/basket-item";
            }
          } else if (type == 'S') {
            apiUrl = "/fo/od/mf/bsktmgnt/ordersheet";
            if (this.params.mallId === '1' || this.params.mallId === '11' || this.params.mallId === '20') {
              apiUrl = "/fo/od/bsktmgnt/ordersheet";
            }
          }
          const response = await ApiUtils.post(apiUrl, bsktPutInputDto);
          console.log(apiUrl + "response.data :: ", JSON.stringify(response));
          if (response.data.success === true) {
            if (type === 'C') {
              const odBsktUuid = CookieUtils.getOdBsktUuid();
              const params = {
                odBsktUuid: odBsktUuid,
              };
              this.$store.dispatch('getBsktQtyInfo', params);
              // this.$gsdialog.alert('장바구니에 등록되었습니다.').then(goNext);
              const bsktIds = response.data.data.bsktIds;
              console.log("bsktIds :: ", bsktIds);
              if (this.$store.state.dp.daybreak && (LoginUtils.isLogin() && !this.dayBraeakDeliveryRegn)) {
                const pupCookie = CookieUtils.getCookie('BSKT_POPUP');
                if (pupCookie != 'daybrkno') {
                  this.popup.dayBrkDisable = true;
                } else {
                  // this.$gsdialog.alert('장바구니에 상품이 담겼습니다.');
                  this.popup.optionDefault = false;
                  this.toastMessage = '장바구니에 상품이 담겼습니다.';
                  this.popup.popupToastCart = true;
                }
                // this.$gsdialog.alert('새벽배송이며 비로그인이거나 새벽배송불가지역.032');
              } else if (this.$store.state.dp.daybreak && this.baseDelivery == false) {
                this.popup.defAddrReg = true;
                // this.$gsdialog.alert('새벽배송이며 기본배송지 없음.031');
              } else {
                // this.$gsdialog.alert('장바구니에 상품이 담겼습니다.');
                this.popup.optionDefault = false;
                this.toastMessage = '장바구니에 상품이 담겼습니다.';
                this.popup.popupToastCart = true;
              }
              Tracker.prodAddToCart(bsktPutInputDto.bsktPutDtoList);
              // this.toBskt();
            } else if (type === 'S') {
              const ordId = response.data.data.ordId;
              console.log("ordId :: ", ordId);
              this.toBuy(ordId);
            } else if (type === 'G') {
              const bsktIds = response.data.data.bsktIds;
              console.log("bsktIds :: ", bsktIds);
              this.toGiftBskt();
            }
          } else {
            if (response.data.statusCode == '402') {
            // this.$gsdialog.alert('처리실패 1: '+response.data.statusMessage);
           // this.popupAction('optionDefault');
            this.popup.optionDefault = false;
           // this.orderNow = response.data.statusMessage;
           // this.orderNowStatus = true;
            this.soldOut();
           // document.getElementById('itemCart').style.display = 'none';
            } else {
              const $this = this;
              if (response.data.statusCode == '' ) {
                this.$gsdialog.alert(response.data.statusMessage + "<br>배송지를 등록해 주세요", { html: true }).then( () => {
                  // this.$router.push('/cu/delivery_place_list');
                // location.href = SiteUtils.commo('/cu/delivery_place_list');
                  $this.$emit('popupEvent', 'popupAddrList');
              });
              } else {
                this.$gsdialog.alert(response.data.statusMessage);
              }
            }
          }
        } catch (e) {
          this.$gsdialog.alert('등록중 오류가 발생했습니다.\n' + e);
        }
        /**
        * 다음 페이지
        */
        function goNext() {
        }
        console.log("bsktPutInputDto :: ", bsktPutInputDto);
      }
    },
    soldOut() { // 품절상태
      this.orderNow = "일시품절 상품입니다";
      this.orderNowStatus = true;
    },
    toBskt() {
      const bsktUrl = SiteUtils.commo('/od/bskt');
      location.href = bsktUrl;
    },
    toGiftBskt() {
      const bsktUrl = SiteUtils.commo('/od/gift_give_cart');
      location.href = bsktUrl;
    },
    toBuy(ordId) {
      const ordUrl = SiteUtils.commo('/od/mf/ordersheet/'+ordId);
      location.href = ordUrl;
    },
    /* ### [S]바로구매, 장바구니 버튼 ### */
    getOrder: async function(obj) {
      console.log('getOrder obj : ', obj);
      if (obj.itemId == "" || obj.itemId == undefined || obj.storId == "" || obj.storId == undefined || obj.supplFirmCd == "" || obj.supplFirmCd == undefined) {
        this.$gsdialog.alert('상품 정보가 없습니다. itemId : '+obj.itemId+', storId : '+obj.storId+', supplFirmCd : '+obj.supplFirmCd);
        return;
      }
      if (obj.ofsYn == "Y" || obj.sellPosbQty == 0) {
        this.$gsdialog.alert('일시품절 상품 입니다.');
        return;
      }
      if (obj.ssevntId != "" && obj.ssevntId != undefined && obj.ssevntTimes != "" && obj.ssevntTimes != undefined) {
        this.ssevntId = obj.ssevntId;
        this.ssevntTimes = obj.ssevntTimes;
      }
      if (obj.deliveryDate) {
        this.deliveryDate = obj.deliveryDate;
      }
      // this.itemId = obj.itemId;
      this.params = obj;
      try {
        // const param = {
        //   itemId: obj.itemId,
        //   mallId: obj.mallId,
        //   storId: obj.storId,
        //   supplFirmCd: obj.supplFirmCd
        // };
        console.log('/fo/md/mf/iteminfomgnt/item-info' + JSON.stringify(obj));
        const itemInfoUrl = obj.mallId === '1' || obj.mallId === '11' || obj.mallId === '20'? '/fo/md/iteminfomgnt/item-info' : '/fo/md/mf/iteminfomgnt/item-info';
        const result = await ApiUtils.get(itemInfoUrl, obj);
        console.log('result', result);
        if (result.data.data != null) {
          this.itemData = result.data.data;
          this.itemData.mallId = obj.mallId;
          if (this.itemData.delivTypeCd == '') {
            this.$gsdialog.alert('배송 정보가 없습니다.');
            console.error('배송 정보가 없습니다.', this.itemData);
            return;
          }
          if (this.itemData.storId == '') {
            this.$gsdialog.alert('매장 정보가 없습니다.');
            console.error('매장 정보가 없습니다.', this.itemData);
            return;
          }
          if (this.itemData.supplFirmCd == '') {
            this.$gsdialog.alert('공급업체 정보가 없습니다.');
            console.error('공급업체 정보가 없습니다.', this.itemData);
            return;
          }
          // 성인인증처리
          if (this.itemData.sellAgeRestrCd == '19') {
            // this.adultCert = false;
            let locationUrl = location.href;
            if (locationUrl.indexOf("?") > -1) locationUrl = locationUrl+"&";
            else locationUrl = locationUrl+"?";
            const returnUrl = encodeURIComponent(locationUrl+"refLogin=Y");
            if (!LoginUtils.isLogin()) { // 미로그인시 성인인증 페이지로 이동
              this.$gsdialog.confirm('성인인증이 필요한 상품입니다. 로그인 페이지로 이동하시겠습니까?').then(async function () {
                // console.log("confirm yes :: "+returnUrl);
                const loginUrl = SiteUtils.commo('/cu/login?returnUrl=' + returnUrl);
                location.href = loginUrl;
              }).catch(function() {
                // 액션없음
              });
              return;
            } else { // 로그인시
              const nowYmd = DateUtils.getToday();
              const nowYmdInt = nowYmd.replace(/-/gi, '');
              const lastYmdInt = nowYmdInt - 10000;
              console.log("lastYmdInt :: ", lastYmdInt);
              const aad = CookieUtils.getCookie('ADULT_AUTH_DATE').substr(0, 8);
              if (aad == undefined || aad == null || aad == '' || aad < lastYmdInt) {
                // console.log("in aad nullcase:: |"+aad+"|");
                this.$gsdialog.confirm('성인인증이 필요한 상품입니다. 인증 페이지로 이동하시겠습니까?').then(async function () {
                  const adultCertUrl = SiteUtils.commo('/cu/product_adult_certify?returnUrl=' + returnUrl);
                  location.href = adultCertUrl;
                }).catch(function() {
                  // 액션없음
                });
                return;
              } else {
                // vm.adultCert = true;
              }
            }
          }
        } else {
          console.error('item-info is null : ', obj);
          this.itemData = {};
          this.$gsdialog.alert('상품정보가 없습니다.');
          return;
        }
      } catch (e) {
        this.$gsdialog.alert('상품정보 조회중 오류가 발생했습니다.').then(dialog => {
        console.error(e);
        return;
        });
      }
      if (this.$props.dispType == 'MDP') { // 상품상세에서 추천상품같은 유닛 통해서 들어왔을때 상품상세의 선택옵션저장
          this.$store.commit('copyItemSelectedList');
      }
      if (this.$props.dispType !== 'MD') {
        this.$store.commit('delItemSelectedList');
        /*
        [itemCompoCd][01:일반상품, 02:패키지, 03:선택형, 04:대용량정육]
        [resvItemYn][Y:예약상품]
        [resvKind][01:날짜 지정형, 02:날짜 고정형]
        */
        if (this.itemData.itemCompoCd == '01' || this.itemData.itemCompoCd == '03') {
          if (this.itemData.ofsYn == 'Y' || this.itemData.sellPosbQty == 0) {
            if (this.popup.rstkinInfm == false) {
              this.getRstkinInfmRqt();
              // this.popup.rstkinInfm = true;
              return;
            }
          } else if (this.itemData.resvItemYn == 'Y' && this.itemData.resvKind == '01') {
            if (this.popup.optionResvDefault == false) {
              this.popup.optionResvDefault = true;
              return;
            }
          } else if (this.itemData.resvItemYn == 'Y' && this.itemData.resvKind == '02') {
            if (this.popup.optionDefault == false) {
              this.popup.optionDefault = true;
              return;
            }
          } else {
            if (this.itemData.itemCompoCd == '01') {
              let showCart = false;
              const url = obj.mallId === '1' || obj.mallId === '11' ? "/fo/md/iteminfomgnt/normal-item-list" : "/fo/md/mf/iteminfomgnt/normal-item-list";
              try {
                const result = await ApiUtils.get(url, obj);
                if (result.data.data != null) {
                  if (result.data.data.length == 1) {
                    const result2 = await ApiUtils.get(obj.mallId === '1' || obj.mallId === '11' ? '/fo/md/iteminfomgnt/add-component-item-list': '/fo/md/mf/iteminfomgnt/add-component-item-list', obj);
                    if (result2.data.data != null && result2.data.data.length > 0) {
                      showCart = true;
                    } else {
                      const result3 = await ApiUtils.get(obj.mallId === '1' || obj.mallId === '11' ? '/fo/md/iteminfomgnt/prom-info': '/fo/md/mf/iteminfomgnt/prom-info', obj);
                      if (result3.data.data != null) {
                        if (result3.data.data.itemProm.length > 0 || result3.data.data.fitmPromItem.length > 0) {
                          showCart = true;
                        }
                      }
                    }
                    // this.getAddCompoItemList(); // 추가구성 상품 조회
                    // this.getPromInfo(obj); // 프로모션 조회
                  } else {
                     showCart = true;
                  }
                  if (showCart) { // 장바구니 선택창 띄우기
                    if (this.popup.optionDefault == false) {
                      this.popup.optionDefault = true;
                      return;
                    }
                  } else { // normal-item-list 가 1개 존재하고 추가구성상품과 프로모션이 존재하지 않는 경우에만 장바구니 바로담기
                    const obj = result.data.data[0];
                    obj.itemNm = this.itemData.itemNm;
                    obj.dispItemNm = this.itemData.itemNm;
                    obj.delivTypeCd = CookieUtils.isDayBreak()?'04':this.itemData.delivTypeCd;
                    const itemSelectedListLocal = [];
                    itemSelectedListLocal.push(obj);
                    itemSelectedListLocal[0].prom = [];
                    console.log("itemSelectedListLocal", itemSelectedListLocal);
                    this.saveBskt('C', itemSelectedListLocal);
                  }
                } else {
                  console.error('normal-item-list is null : ', obj);
                  this.$gsdialog.alert('상품정보가 존재하지 않습니다.');
                }
              } catch (e) {
                // this.$gsdialog.alert('상품정보 조회시 오류가 발생했습니다.').then(dialog => {
                  console.error("상품정보 조회시 오류가 발생했습니다[getOptItemList]", e);
                  this.$gsdialog.alert('상품정보 조회 오류.');
                // });
              }
            } else {
              if (this.popup.optionDefault == false) {
                this.popup.optionDefault = true;
                return;
              }
            }
          }
        } else if (this.itemData.itemCompoCd == '02') {
          if (this.popup.optionPackage == false) {
            this.popup.optionPackage = true;
            return;
          }
        }
      }
    },
    // 입고알림신청조회
    getRstkinInfmRqt: async function() {
      // this.popup[`${'rstkinInfm'}`] = !this.popup[`${'rstkinInfm'}`];
      try {
        if (!LoginUtils.isLogin()) {
          this.popup.rstkinInfm = false;
          this.$gsdialog.alert("로그인 후에 이용 가능합니다.");
        } else {
          const request = await ApiUtils.get('/fo/md/iteminfomgnt/restock-inform-retrieve', this.params);
          if (request.data.success === true ) {
            if (request.data.data.length > 0) {
              this.popup.rstkinInfm = false;
              this.$gsdialog.alert("이미 재입고 알림을 신청 하셨습니다.");
            } else {
              this.popup.rstkinInfm = true;
            }
          }
        }
      } catch (e) {
        this.$gsdialog.alert('재입고알림 신청중 오류가 발생했습니다.').then(dialog => {
          console.error(e);
        });
      }
    },
    // 입고알림신청
    setRstkinInfmRqt: async function() {
      try {
        if (!LoginUtils.isLogin()) {
          this.popup.rstkinInfm = false;
          this.$gsdialog.alert("로그인 후에 이용 가능합니다.");
        } else {
          const request = await ApiUtils.get('/fo/md/iteminfomgnt/restock-inform-retrieve', this.params);
          if (request.data.success === true ) {
            if (request.data.data.length == 0) {
              const response = await ApiUtils.post('/fo/md/iteminfomgnt/restock-inform', this.params);
              if (response.data.success === true) {
                this.$gsdialog.alert('재입고 알림이 신청 되었습니다.\n입고 시 안내 드리겠습니다.').then(dialog => {
                  this.popup.rstkinInfm = false;
                });
              } else {
                this.$gsdialog.alert('재입고알림 신청중 오류가 발생했습니다.').then(dialog => {
                  console.log(e);
                });
              }
            } else {
              this.$gsdialog.alert('이미 재입고 알림을 신청 하셨습니다.');
            }
          }
        }
      } catch (e) {
        this.$gsdialog.alert('재입고알림 신청중 오류가 발생했습니다.').then(dialog => {
          console.error(e);
        });
      }
    },
    // 기본배송지 조회
    getBaseDeliv: async function() {
      // 기본 배송지 정보
      if (this.isLogin == false) {
        return;
      }
      const vm = this;
      try {
        const result = await ApiUtils.get('/fo/cu/mypgmgnt/deliveryplace');
        if (result.data.data != null) {
          result.data.data.forEach(function(data, idx) {
            if (data.baseDlvpYn == 'Y') {
              vm.baseDelivery = true;
              vm.zipcd = data.zipcd;
              return;
            }
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
    // 새벽배송지역 조회
    getDaybreakDelivRegn: async function() {
      if (this.isLogin == false) {
        return;
      }
      const params = {
        delivTypeCd: '04',
        mallId: CookieUtils.getMallId(),
        zipCd: this.zipcd,
      };
      try {
        const result = await ApiUtils.get('/fo/md/iteminfomgnt/display-day-break-deliv-regn', params);
        if (result.data.data != null) {
          const daybreakDelivRegn = result.data.data;
          console.log("daybreakDelivRegn.length : "+daybreakDelivRegn.length);
          if (daybreakDelivRegn.length > 0) {
            this.dayBraeakDeliveryRegn = true;
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, // End Methods
  filters: {
    toCurrency(value) {
      return new Intl.NumberFormat().format(value);
    }
  }
};
</script>
