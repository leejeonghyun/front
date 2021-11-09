<template>
  <section class="section-area" v-if="abrdDelivInfoList !== null && abrdDelivInfoList.ordId !== null">
    <div class="sub-title border">
      <h2><strong class="bg-line-brush">해외직구배송 <span aria-label="필수 항목" class="required">*</span></strong></h2>
    </div>
    <div class="sub-inner-box">
      <div v-for="(abrdDelivTypeGrpInfo, idx) in abrdDelivInfoList ? abrdDelivInfoList.abrdDelivTypeGrpInfoList ? abrdDelivInfoList.abrdDelivTypeGrpInfoList : [] : []" :key="idx">
        <!-- START : 업체 택배 -->
        <div class="wrap-branch-title">
          <h2><strong class="branch">{{abrdDelivTypeGrpInfo.abrdDelivGrpNm}}</strong></h2>
        </div>
        <fieldset>
          <legend>해외직구배송 업체명과 상품목록</legend>
          <ul class="delivery-product">
            <li v-for="(abrdDelivItemSmmrInfo, idx1) in abrdDelivTypeGrpInfo ? abrdDelivTypeGrpInfo.abrdDelivItemSmmrInfoList ? abrdDelivTypeGrpInfo.abrdDelivItemSmmrInfoList : [] : []" :key="idx1">
              <span class="product-name"><span class="name">{{abrdDelivItemSmmrInfo.repItemNm}}</span><span v-if="abrdDelivItemSmmrInfo.otherItemCnt > 0"> 외 <span class="point">{{abrdDelivItemSmmrInfo.otherItemCnt}}</span>개</span></span>
            </li>
          </ul>
        </fieldset>
        <!-- END : 업체 택배 -->
      </div>
      <!-- START : 개인통관고유부호 -->
      <div class="sub-title">
        <h2>개인통관고유부호</h2>
      </div>
      <fieldset>
        <legend>개인통관고유부호 입력</legend>
        <div>
          <p>
            <input type="text" name="upasVal" id="upasVal" value="" maxlength="13" placeholder="P로 시작하는 13자리 입력" title="개인통관고유부호" class="inp-txt w100" v-model="abrdDelivInfor.upasVal" v-on:blur="checkUpasVal()">
          </p>
          <p class="check-area">
            <span class="inp-chk mid">
              <input type="checkbox" name="agreeUpas" id="agree-upas" value="Y" v-model="abrdDelivInfor.agreeUpas">
              <label for="agree-upas">개인통관고유부호 수집에 동의<span class="required" aria-label="필수 항목">*</span></label>
            </span>
          </p>
          <p class="txt-11">개인통관고유부호 정보는 원활한 통관을 위해 달리살다에서 수집 및 판매자에게 제공합니다. 반드시 받는 사람(수령인)의 개인통관고유부호를 입력해 주세요.</p>
          <ul class="txt-info-list">
            <li class="ico-alert2">물품가액이 $150초과할 경우 관/부가세가 발생할 수 있으며, 물품 종류와 해외공급자 관계없이 같은 날 입항하게 되면 합산과세 대상이 됩니다.</li>
          </ul>
          <p class="text-right"><span class="btn-arr"><a href="https://m.customs.go.kr/pms/html/mos/extr/MOS0101053S.do" target="_blank" title="새 창 열림">발급 신청하러 가기</a></span></p>
        </div>
      </fieldset>
      <!-- END : 개인통관고유부호 -->
    </div>
    <transition name="toastPopup" v-on:after-enter="toastPopupAfterEnter" v-on:leave="toastPopupEnterLeave">
    <PopupToast :ToastMessage="toastMessage" @popupEvent="popupAction" v-if="popup.popupToastAlarm" :popupToast="popup.popupToastAlarm" popupToastType="popupToastAlarm" /> <!-- 팝업 - toast -->
    </transition>
  </section>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
import Config from '@/common/Config.js';
import axios from 'axios';
import PopupToast from '@/components/common/PopupToast'; // 팝업 - toast

export default {
  props: {
    abrdDelivInfor: Object,
    ordsDlvpInfo: Object,
  },
  name: "DeliveryOverseas",
  data() {
    return {
      abrdDelivInfoList: null,
      toastMessage: '',
      popup: {
        popupToastAlarm: false, // 토스트 팝업
      },
    };
  },
  mixins: [],
  components: {
    PopupToast,
  },
  methods: {
    toastPopupAfterEnter(el) {
      el.style.opacity = 1;
    },
    toastPopupEnterLeave(el) {
      el.style.opacity = 0;
    },
    popupAction(type) {
      // 팝업 활성 / 비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    // 주문서해외배송안내조회
    async retrieveAbrdDelivInfor() {
      const iAbrdDelivInforInq = {
        ordId: this.abrdDelivInfor.ordId,
        ordsDlvpSeqno: this.abrdDelivInfor.ordsDlvpSeqno,
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/abroad-delivery-info', iAbrdDelivInforInq);
      // console.log(response);
      this.abrdDelivInfoList = response.data.data;
    },
    // 개인통관고유부호 validation
    // 첫글자는 대문자 P, 자리수 13자리
    async checkUpasVal() {
      if (this.validUpasVal()) {
        const iAbrdDelivInforInq = {
          ordId: this.abrdDelivInfor.ordId,
          ordsDlvpSeqno: this.abrdDelivInfor.ordsDlvpSeqno,
          upasVal: this.abrdDelivInfor.upasVal,
        };
        const response = await ApiUtils.put('/fo/od/ordsmgnt/abroad-delivery-info', iAbrdDelivInforInq);
      }
    },
    async validUpasVal() {
      if (this.abrdDelivInfor.upasVal && this.abrdDelivInfor.upasVal.length > 0) {
        const reg = /^(P)[0-9]{12}/;

        if (!reg.test(this.abrdDelivInfor.upasVal)) {
          this.$gsdialog.alert(OrderMsg.abrdDelivInforChk); // 입력하신 개인통관고유부호를 다시 확인해주세요.
          return false;
        }

        const params = {
          persEcm: this.abrdDelivInfor.upasVal,
          pltxNm: this.ordsDlvpInfo.adrsNm,
        };

        try {
          await ApiUtils.post('/fo/od/personal-customs-code', params).then(res => {
            console.log('RES', res.data);
            const xmlDOM = new DOMParser().parseFromString(res.data, "text/xml");
            const tCnt = xmlDOM.getElementsByTagName("tCnt")[0].childNodes[0].nodeValue;

            if (tCnt === '1') { // 일치
              this.toastMessage = OrderMsg.abrdDelivInforSuccess; // 개인통관고유부호 인증이 완료되었습니다.
              this.popup.popupToastAlarm = true;
            } else if (tCnt === '0') { // 불일치
              this.$gsdialog.alert(OrderMsg.abrdDelivInforFail); // 개인통관고유부호가 유효하지 않습니다.
            } else if (tCnt === '-1') { // 시스템 장애
              this.$gsdialog.alert(OrderMsg.abrdDelivInforError); // 개인통관고유부호 조회에 실패하였습니다.
            }
            this.chkTCnt(tCnt);
          }).catch(error => {
            // this.$gsdialog.alert(error).then(dialog => {});
            console.log(error);
          });
        } catch (e) {
          console.error(e);
        }
      } else {
        this.$gsdialog.alert(OrderMsg.abrdDelivInforEmpty); // 개인통관고유부호를 입력해주세요.
        this.abrdDelivInfor.upasVal = 'P';
        return false;
      }
      return true;
    },
    chkTCnt(tCnt) {
      this.$emit('chkTCnt', tCnt);
    }
  },
  destroyed() {
  },
  mounted() {
    // console.log(this.abrdDelivInfor);
    this.retrieveAbrdDelivInfor();
    if (this.abrdDelivInfoList != null) {
      this.validUpasVal();
    }
  },
};
</script>
