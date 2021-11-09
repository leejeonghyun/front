<!--
views/od/SC-FO-PA-GS-MP-001
-->
<template>
  <!-- : 실사용 소스 -->
  <div id="popupDeliveryList" class="wrap-full-popup" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupDeliveryList}, siteClass]">
    <div class="header-popup">
      <strong>배송지 목록</strong>
    </div>
    <div class="full-popup-body scroll-area has-fixed-bottom">
      <div class="inner-full-popup">
        <div class="delivery-management">
          <div class="title">
            <h3 class="hidden">배송지 목록</h3><a @click="dlvpAdd()" class="btn-border btn-small right">배송지 추가</a>
          </div>
          <!-- START : 배송지 리스트 -->
          <div class="delivery-list">
            <ul class="addr-list">
              <li v-for="(mbrDeliv, idx) in mbrDelivList" :key="mbrDeliv.mbrDlvpSeqno">
                <p class="inp-radio small">
                  <input type="radio" name="mbrDlvpSeqno" :id="'mbrDlvpSeqno_'+idx" :value="mbrDeliv.mbrDlvpSeqno" v-model="newMbrDlvpSeqno">
                  <label :for="'mbrDlvpSeqno_'+idx">
                    <span class="name wb-a">
                      <strong>{{mbrDeliv.adrsNm}}</strong>[{{mbrDeliv.dlvpNm}}]
                      <span class="default" v-show="checkBaseDlvpYn(mbrDeliv.baseDlvpYn)">기본배송지</span>
                    </span>
                  </label>
                </p>
                <p class="addr-txt">
                  <span class="code">{{mbrDeliv.adrsZipcd}}</span>{{mbrDeliv.adrsStnmBaseAddr}} {{mbrDeliv.adrsStnmDtlAddr}}
                  <span class="lot-number">지번 : {{mbrDeliv.adrsBaseAddr}}{{mbrDeliv.adrsDtlAddr}}</span>
                  <span class="cell-num">{{(mbrDeliv.adrsMoblTelNo).substring(0, 3)}} - {{(mbrDeliv.adrsMoblTelNo).substring(3, 7)}} - {{(mbrDeliv.adrsMoblTelNo).substring(7)}}</span>
                </p>
               <span class="branch">{{mbrDeliv.supplFirmNm}}</span>
              </li>
            </ul>
          </div>
          <!-- END : 배송지 리스트 -->
        </div>
        <PopupDeliveryAddr @popupEvent="popupAction" @bsktMbrDlvp="bsktMbrDlvp" :mbrDlvpSeqno="newMbrDlvpSeqno" v-if="this.popup.PopupDeliveryAddr" />
        <div class="popup-btns-fixed-bottom">
          <button class="btn-lg btn-bg lightgreen" @click="mbrDlvpAddrChoiceEvent()">변경</button>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupDelivAction">
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>
<script>
  import LayerPopupMixin from '@/mixins/LayerPopupMixin';
  import PopupDeliveryAddr from '@/components/order/PopupDeliveryAddr';
  import ApiUtils from '@/common/ApiUtils';
  import CookieUtils from '@/common/CookieUtils';
  export default {
    props: {
      ordsDlvpInfo: Object,
      ordsItemList: Object
    },
    name: "PopupDeliveryList",
    mixins: [LayerPopupMixin],
    metaInfo: {
      title: CookieUtils.getMetaInfoTitle(),
      titleTemplate: '배송지 목록 < %s'
    },
    data() {
      return {
        mbrDelivList: null,
        ordId: null,
        ordsDlvpSeqno: 0,
        mbrDlvpSeqno: 0,
        supplFirmCd: '',
        delivPolcId: '',
        todayItemExist: false,
        newMbrDlvpSeqno: 0,
        popup: { // 팝업
          open: false,
          PopupDeliveryAddr: false,
        },
        siteClass: CookieUtils.getSiteClass(),
        mbrDlvpSeqnoMax: '',
      };
    },
    components: {
      PopupDeliveryAddr,
    },
    methods: {
      dlvpAdd() {
        localStorage.setItem('returnUrl', location.href);
        this.$router.push({path: '/cu/delivery_place_add'});
      },
      popupAction(type) { // 팝업 활성/비활성
        this.popup[`${type}`] = !this.popup[`${type}`];
        this.popup.open = !this.popup.open;
      },
      popupDelivAction() {
        this.$emit('popupEvent', 'popupDeliveryList');
      },
      popupCartAction() {
        this.popupAction('PopupDeliveryAddr');
      },
      async retrievelistMbrDlvp() {
        // 회원 배송지 목록 조회
        const iMbrDlvpListInq = {
          ordId: this.ordId,
          ordsDlvpSeqno: this.ordsDlvpSeqno,
        };
        const response = await ApiUtils.get('/fo/od/ordsmgnt/member-delivery-place-list', iMbrDlvpListInq);
        console.log("response", response.data.data);
        this.mbrDelivList = response.data.data.mbrDlvpInfoList;
      },
      checkBaseDlvpYn(baseDlvpYn) {
        if (baseDlvpYn === "Y") {
          return true;
        } else {
          return false;
        }
      },
      mbrDlvpAddrChoiceEvent() {
        // 부모창으로 선택된 배송지를 전송한다.
        for (let i = 0; i < this.mbrDelivList.length; i++) {
          if (this.newMbrDlvpSeqno === this.mbrDelivList[i].mbrDlvpSeqno) {
            /*
            if ('Y' === this.mbrDelivList[i].delivAreaChgYn ) { // 기존 배송지와 변경된 배송지의 권역을 비교한다.
              this.popupCartAction('PopupDeliveryAddr');
            } else { // 객체 전송
              // 배송지 업데이트
              this.processOrdsDlvpChg(this.mbrDelivList[i]);
            }
            */
           // 당일배송 상품이 존재하며, 공급업체 코드가 다른 경우 배송권역이 다르다고 판단
           // if (this.todayItemExist && this.supplFirmCd != this.mbrDelivList[i].supplFirmCd) {
           // 당일배송 상품이 존재하며, 배송정책 ID가 다른 경우 배송권역이 다르다고 판단
           // if (this.todayItemExist && this.delivPolcId != this.mbrDelivList[i].delivPolcId) {
           // 배송권역으로만 판단
           if (this.delivPolcId != this.mbrDelivList[i].delivPolcId) {
             this.popupCartAction('PopupDeliveryAddr');
           } else {
             // 배송지 업데이트
              this.processOrdsDlvpChg(this.mbrDelivList[i]);
           }
            break;
          }
        }
      },
      async processOrdsDlvpChg(ordsDelivInfo) {
        const iOrdsDlvpChgProc = {
          ordId: this.ordId, // 주문서 ID
          ordsDlvpSeqno: this.ordsDlvpSeqno, // 주문서배송지일련번호
          ordsDlvpInfo: {
            ordId: this.ordId, // 주문서 ID
            ordsDlvpSeqno: this.ordsDlvpSeqno, // 주문서배송지일련번호
            mbrDlvpSeqno: ordsDelivInfo.mbrDlvpSeqno, // 회원배송지일련번호
          }
        };
        const response = await ApiUtils.put('/fo/od/ordsmgnt/delivery-place', iOrdsDlvpChgProc);
        const newOrdsDlvpInfo = response.data.data.ordsDlvpInfo;
        this.$emit('checkMbrDlvpInfoEvent', newOrdsDlvpInfo);
        this.$emit('popupEvent', 'popupDeliveryList');
      },
      bsktMbrDlvp() {
        localStorage.setItem("ordsMbrDlvpSeqno", this.newMbrDlvpSeqno);
        this.$router.push({path: '/od/bskt'});
      },
    },
    mounted() {
      this.ordId = this.ordsDlvpInfo.ordId; // 부모창에서 전달된 주문서배송지일련번호를 자식컴포넌트의 변수에 세팅.
      this.ordsDlvpSeqno = this.ordsDlvpInfo.ordsDlvpSeqno; // 부모창에서 전달된 주문서배송지일련번호를 자식컴포넌트의 변수에 세팅.
      this.mbrDlvpSeqno = this.ordsDlvpInfo.mbrDlvpSeqno; // 부모창에서 전달된 회원배송지일련번호를 자식컴포넌트의 변수에 세팅.
      this.supplFirmCd = this.ordsDlvpInfo.supplFirmCd; // 부모창에서 전달된 공급업체코드
      this.delivPolcId = this.ordsDlvpInfo.delivPolcId; // 부모창에서 전달된 배송정책 ID
      if (this.ordsItemList.ordsDelivGrpInfoList) {
        const ordsDelivGrpInfoList = this.ordsItemList.ordsDelivGrpInfoList;
        for (let i = 0; i < ordsDelivGrpInfoList.length; i++) {
          const ordsDelivSupplGrpInfoList = ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList;
          if (ordsDelivSupplGrpInfoList) {
            for (let j = 0; j < ordsDelivSupplGrpInfoList.length; j++) {
              if (ordsDelivSupplGrpInfoList[j].delivTypeCd === '01') {
                this.todayItemExist = true; // 당일배송 상품존재여부
                break;
              }
            }
          }
        }
      }
      this.newMbrDlvpSeqno = this.ordsDlvpInfo.mbrDlvpSeqno; // 부모창에서 전달된 회원배송지일련번호를 자식컴포넌트의 변수에 세팅.
      this.retrievelistMbrDlvp();
      // this.modalActiveEvent('popupDeliveryList');

      // 주문시 배송지를 추가하면 아래 값이 셋팅되어 있음
      this.mbrDlvpSeqnoMax = localStorage.getItem("mbrDlvpSeqnoMax");
      if (this.mbrDlvpSeqnoMax) {
        localStorage.removeItem("mbrDlvpSeqnoMax");
        this.newMbrDlvpSeqno = this.mbrDlvpSeqnoMax - 0;
      }
    }
  };
</script>
