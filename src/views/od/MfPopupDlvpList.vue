<!--
views/od/SC-FO-OD-MF-MP-001
-->
<template>
  <!-- START : 배송지 목록 레이어 -->
  <div id="popupDeliveryList" class="wrap-layer addr-layer" role="dialog" aria-labelledby="popupDeliveryList" aria-modal="true" :class="{active : this.modalActive.popupDeliveryList}">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-bottom-fixed">
      <div class="title">
        <h3 class="left">배송지 목록</h3>
        <p class="btn-right"><a href="javascript:;" class="btn-border btn-small" @click="goMbrDlvpAdd">새 배송지 추가</a></p>
      </div>
      <div class="scroll-area">
        <ul class="addr-list inner-box">
          <li v-for="(mbrDeliv, idx) in mbrDelivList" :key="`MBR_DLVP_${idx}`">
            <p class="inp-radio small">
              <input type="radio" name="addrList" :id="`mbrDeliv${idx}`" :value="mbrDeliv.mbrDlvpSeqno" v-model="newMbrDlvpSeqno">
              <label :for="`mbrDeliv${idx}`">
                <span class="name">
                  <strong>{{mbrDeliv.adrsNm}}</strong>[{{mbrDeliv.dlvpNm}}]
                  <span class="default" v-if="checkBaseDlvpYn(mbrDeliv.baseDlvpYn)">기본배송지</span>
                </span>
              </label>
            </p>
            <p class="addr-txt"><span class="code">{{mbrDeliv.adrsZipcd}}</span> {{mbrDeliv.adrsStnmBaseAddr}} {{mbrDeliv.adrsStnmDtlAddr}}</p>
          </li>
        </ul>
      </div>
      <div class="wrap-btn">
        <button type="button" class="btn-lg btn-bg lightgreen" aria-haspopup="dialog" @click="mbrDlvpAddrChoiceEvent">변경</button> <!-- 수정 : 2020.03.05 팝업 포커스 오류로 aria-haspopup="dialog" 추가 -->
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
  <!-- END : 배송지 목록 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import OrderMsg from '@/components/order/MfOrderMsg'; // 주문 메세지항목
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "MfPopupDeliveryList",
  props: {
    ordsDlvpInfo: Object,
    ordsItemList: Object
  },
  data() {
    return {
      mbrDelivList: null, // 회원배송지 목록
      ordId: null, // 주문ID
      ordsDlvpSeqno: 0, // 주문서 배송지 일련번호
      mbrDlvpSeqno: 0, // 회원 배송지 일련번호
      newMbrDlvpSeqno: 0, // 새 회원 배송지 일련번호
      mbrDlvpSeqnoMax: '',
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupDeliveryList');
      this.modalActiveEvent('popupDeliveryList');
    },
    goMbrDlvpAdd() {
      // 배송지 최대 추가 갯수 체크
      if (this.mbrDelivList.length >= 20) {
        this.$gsdialog.alert(OrderMsg.dlvpMaxAddCnt);
        return;
      }
      localStorage.setItem('returnUrl', location.href);
      this.$router.push('/cu/delivery_place_add');
    },
    // 기본배송지 체크 여부
    checkBaseDlvpYn(baseDlvpYn) {
      if (baseDlvpYn === "Y") {
        return true;
      } else {
        return false;
      }
    },
    // 회원 배송지 주소 선택 이벤트 처리 함수
    mbrDlvpAddrChoiceEvent() {
      // 부모창으로 선택된 배송지를 전송한다.
      const changeMbrDlvp = this.mbrDelivList.find(dlvpInfo => dlvpInfo.mbrDlvpSeqno === this.newMbrDlvpSeqno);
      this.processOrdsDlvpChg(changeMbrDlvp);
    },
    // 주문서 배송지 변경 처리 함수
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
      this.$emit('checkMbrDlvpInfo', newOrdsDlvpInfo);
      this.$emit('popupEvent', 'popupDeliveryList');
    },
    async retrievelistMbrDlvp() {
      // 회원 배송지 목록 조회
      const iMbrDlvpListInq = {
        ordId: this.ordId,
        ordsDlvpSeqno: this.ordsDlvpSeqno,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/member-delivery-place-list', iMbrDlvpListInq);
      this.mbrDelivList = response.data.data.mbrDlvpInfoList;
    },
    // 배송지목록 팝업을 호출 하기 위한 기존 modalActiveEvent함수를 재정의하여 처리
    modalActiveEvent(key) {
      const $target = document.querySelector('#popupDlvpChangeBtn');
      if (this.modalActive[key] === undefined) {
        this.$set(this.modalActive, [key], true);
        this.openedModal = true;
      } else {
        if ($target.getAttribute('aria-haspopup')) {
          this.$set(this.modalActive, [key], true);
          this.openedModal = true;
        } else {
          this.$set(this.modalActive, [key], false);
          this.openedModal = false;
        }
      }
      if ($target) {
        this.modalFocusEvent($target, key);
      }
    }
  },
  mounted() {
    this.modalActiveEvent('popupDeliveryList');

    // 부모창에서 전달된 자식컴포넌트의 변수에 세팅.
    this.ordId = this.ordsDlvpInfo.ordId; // 주문서배송지일련번호
    this.ordsDlvpSeqno = this.ordsDlvpInfo.ordsDlvpSeqno; // 주문서배송지일련번호
    this.mbrDlvpSeqno = this.ordsDlvpInfo.mbrDlvpSeqno; // 회원배송지일련번호
    this.newMbrDlvpSeqno = this.ordsDlvpInfo.mbrDlvpSeqno; // 회원배송지일련번호

    // 회원배송지목록 조회
    this.retrievelistMbrDlvp();

    // 주문시 배송지를 추가하면 아래 값이 셋팅되어 있음
    this.mbrDlvpSeqnoMax = localStorage.getItem("mbrDlvpSeqnoMax");
    if (!!this.mbrDlvpSeqnoMax) {
      localStorage.removeItem("mbrDlvpSeqnoMax");
      this.newMbrDlvpSeqno = this.mbrDlvpSeqnoMax - 0;
    }
  }
};
</script>
