<!--
@author wisehouse@gsretail.com
-->
<template>
  <div id="popupBoxShop" class="wrap-full-popup" role="dialog" aria-modal="true" v-bind:class="[siteClass]">
    <div class="header-popup">
      <strong>BOX25 픽업 매장</strong>
    </div>
    <iframe id="map" name="gsBoxMap" class="full-popup-body" style="width: 100%" :src="mapSrc" allow="geolocation" />
    <button class="btn-layer-close" @click="popupAction">
      <span class="hidden">닫기</span>
    </button>
    <BoxMapResponse />
  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
import BoxMapResponse from '@/views/od/BoxMapResponse';
import OrderMsg from '@/components/order/OrderMsg';
export default {
  props: {
    ordId: String,
    ordsDlvpSeqno: Number,
    ordsDlvpInfo: Object,
    productItems: Array,
    totAmt: Number,
  },
  name: "PopupBoxShop",
  metaInfo: {
    title: 'BOX25',
    titleTemplate: 'BOX25 픽업  매장 < %s'
  },
  data() {
    return {
      popup: {
        popupBoxShop: false,
      },
      map: {
        // src: 'https://map.gspostbox.com/box25/mobile?UID%3D'+ encodeURIComponent(process.env.VUE_APP_COMMON_FR_MO + '/html/fo/od/boxMapResCallback'),
      },
      boxMapInfo: {
        centerShortName: '',
        centerCode: '',
        centerName: '',
        codePany: '',
        distRouteCode: '',
        distRouteOrder: '',
        hoCode: '',
        storeAddress1: '',
        storeAddress2: '',
        storeCode: '',
        storeName: '',
        postNo: '',
        storeTel: '',
      },
      iBOX25PkupSvcResProc: {},
      mapSrc: '',
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    BoxMapResponse,
  },
  mixins: [LayerPopupMixin],
  watch: {
    boxMapInfo: function() {
      // this.updatePkupDlvp();
      // this.boxPkupPut();
      // this.popupAction();
    },
  },
  methods: {
    popupAction() { // 닫기
      this.$emit('popupEvent', 'popupBoxShop');
      // this.modalActiveEvent('popupBoxShop');
    },
    async callTest() {
      const form = document.querySelector('#frm');
      form.action = process.env.VUE_APP_TL_SERVER + '/html/fo/od/boxMapResCallback/FRESH/MOB';
      form.target = "gsBoxMap";
      form.submit();
    },
    async updatePkupDlvp() {
      // 픽업정보 주문서배송지 테이블에 업데이트
      const params = {
        ordId: this.ordId,
        ordsDlvpSeqno: this.ordsDlvpSeqno,
        pkuppTypeCd: '3', // 1:점포, 2:수퍼, 3:BOX(TO-DO 공통코드 추가필요)
        pkuppId: this.boxMapInfo.storeCode,
        pkuppNm: this.boxMapInfo.storeName,
        pkuppZipcd: this.boxMapInfo.postNo,
        pkuppAddr: this.boxMapInfo.storeAddress1,
        pkuppDtlAddr: this.boxMapInfo.storeAddress2,
        pkuppStnmAddr: this.boxMapInfo.storeAddress1, // TO-DO : 도로명주소 추가요청
        pkuppStnmDtlAddr: this.boxMapInfo.storeAddress2, // TO-DO : 도로명주소 추가요청
        pkuppTelNo: this.boxMapInfo.storeTel,
        itemRcptTypeCd: 'B',
        delivPolcId: this.ordsDlvpInfo.box25DelivPolcId,
      };
      const response = await ApiUtils.put('/fo/od/ordsmgnt/gs-supermarket-pickup-service', params);
      this.$emit('strInfoChoiceEvent', params);

      this.popupAction();
    },
    async clearPkupDlvp() {
      // 픽업정보 주문서배송지 테이블에 업데이트
      const params = {
        ordId: this.ordId,
        ordsDlvpSeqno: this.ordsDlvpSeqno,
        pkuppTypeCd: '3', // 1:점포, 2:수퍼, 3:BOX(TO-DO 공통코드 추가필요)
        pkuppId: '',
        pkuppNm: '',
        pkuppZipcd: '',
        pkuppAddr: '',
        pkuppDtlAddr: '',
        pkuppStnmAddr: '', // TO-DO : 도로명주소 추가요청
        pkuppStnmDtlAddr: '', // TO-DO : 도로명주소 추가요청
        pkuppTelNo: '',
        itemRcptTypeCd: 'B',
        delivPolcId: this.ordsDlvpInfo.box25DelivPolcId,
      };
      const response = await ApiUtils.put('/fo/od/ordsmgnt/gs-supermarket-pickup-service', params);
      this.$emit('strInfoChoiceEvent', null);

      this.popupAction();
    },
    async boxPkupPut() {
      // box25 booking api call
      const iBOX25PkupSvcReqProc = {
        ordId: this.ordId,
        ordsDlvpSeqno: this.ordsDlvpSeqno,
        ordsDlvpInfo: this.ordsDlvpInfo,
        ordsPkupSvcInfo: {
          pkuppId: this.boxMapInfo.storeCode,
          pkuppNm: this.boxMapInfo.storeName,
          pkuppZipcd: this.boxMapInfo.postNo,
          pkuppAddr: this.boxMapInfo.storeAddress1,
          pkuppDtlAddr: this.boxMapInfo.storeAddress2,
          pkuppStnmAddr: this.boxMapInfo.storeAddress1, // TO-DO : 도로명주소 추가요청
          pkuppStnmDtlAddr: this.boxMapInfo.storeAddress2, // TO-DO : 도로명주소 추가요청
          pkuppTelNo: this.boxMapInfo.storeTel,
          distRouteCode: this.boxMapInfo.distRouteCode,
          distRouteOrder: this.boxMapInfo.distRouteOrder,
          centerName: this.boxMapInfo.centerName,
          centerAbbrName: this.boxMapInfo.centerAbbrName,
          centerCode: this.boxMapInfo.centerCode,
        },
        keyProductName: this.productItems[0].name,
        totalPrice: this.totAmt,
        isCooling: "Y",
        boxSize: "2",
        apiType: "booking",
        orderStatus: "BOOKING",
      };
      const response = await ApiUtils.post('/fo/od/ordsmgnt/box25-pickup-service', iBOX25PkupSvcReqProc);
      console.log("===== boxPkupPut =====");
      console.log(response.data.data);
      this.iBOX25PkupSvcResProc = response.data.data;
        // 오류 또는 실패 응답 시
        if (this.iBOX25PkupSvcResProc.statusProc !== 'SUCCESS') {
            this.$gsdialog.alert(OrderMsg.boxMapFail);
            this.boxMapInfo = null;
            await this.clearPkupDlvp();
            this.popupAction();
            return;
        }

        // 사업장이 다를 경우
        if (!this.iBOX25PkupSvcResProc.supplFirmCdList.includes(this.ordsDlvpInfo.supplFirmCd)) {
            this.$gsdialog.alert(OrderMsg.boxMapNotSupportedArea);
            this.boxMapInfo = null;
            await this.clearPkupDlvp();
            this.popupAction();
            return;
        }

        iBOX25PkupSvcReqProc.orderStatus = "REQUESTED";
        this.$emit('boxPkupBooking', iBOX25PkupSvcReqProc);

        await this.updatePkupDlvp();
    }
  },
  mounted() {
    // this.modalActiveEvent('popupBoxShop');
    if (CookieUtils.getMallId() === '1') {
        this.mapSrc = 'https://map.gspostbox.com/box25/mobile?UID='+ process.env.VUE_APP_TL_SERVER + '/html/fo/od/boxMapResCallback/FRESH/MOB';
    } else if (CookieUtils.getMallId() === '11') {
        this.mapSrc = 'https://map.gspostbox.com/box25/mobile?UID='+ process.env.VUE_APP_TL_SERVER + '/html/fo/od/boxMapResCallback/DALI/MOB';
    }
    const that = this;
    window.callbackBox = function(res) {
      console.log("=====BoxMapResponse callback=====");
      console.log(res);
      if (res != null) {
        that.boxMapInfo = res;
        that.boxPkupPut();
      }
    };
  }
};
</script>
