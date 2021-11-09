<template>
  <section class="section-area accordion-wrap">
    <div class="sub-title tit-accordion" v-if="isTitle !='hide'"> <!-- 수정 START : 2020.02.24 아코디언 타이틀 노출여부 'hide'일 경우 숨김(다중배송에서 숨김/배송요청사항 별도 팝업 경우에도 숨김) -->
      <h2>
        <button type="button" id="requestAccordion" class="tit" :aria-controls="'requestAccordionContent' + ordsDlvpInfo.ordsDlvpSeqno" aria-expanded="true" @click="accordionEvent">
          <strong class="bg-line-brush">배송 요청사항</strong>
        </button>
      </h2>
    </div>
    <!-- 수정 START : 2020.02.12 마크업 변경 (옵션 변경에 따른 마크업 및 하단 스크립트 변경)) -->
    <div :id="'requestAccordionContent' + ordsDlvpInfo.ordsDlvpSeqno" class="sub-inner-box accordion-content" aria-labelledby="requestAccordion">
      <!-- START : 이전 주문에서 저장한 방법이 없는 경우 -->
      <div>
        <div class="inner" v-if="popupTypeDelivery != 'hide' && !pickupCenterFlag">
          <div class="sub-title">
            <h3>상품 수령 위치 <span class="required" aria-label="필수 항목">*</span></h3>
          </div>
          <div class="select-location">
            <p>
              <span class="wrap-select w100">
                <select id="location" title="상품 수령 위치 선택" v-model="delivRequest.selectedLocation" v-on:change="checkDlvpReqForm('1', $event)" :disabled="disableInput()">
                  <option v-for="commGrpCdOd0033Info in commGrpCdOd0033List" v-bind:key="commGrpCdOd0033Info.commCd" v-bind:value="commGrpCdOd0033Info.commCd" v-show="commGrpCdOd0033Info.useYn === 'Y'">{{commGrpCdOd0033Info.commCdNm}}</option> <!-- value="값" 에따라 하단 v-if="this.selectedLocation === '값'" 내용 변경 -->
                </select>
              </span>
            </p>
            <div id="agreeDeliveryType" class="location-content" v-if="this.delivRequest.selectedLocation != '99' && parcelDisabled === false">
              <div class="check-area">
                <span v-for="commGrpCdOd0034Info in commGrpCdOd0034List" v-bind:key="commGrpCdOd0034Info.commCd">
                  <div class="entrance-num" v-if="commGrpCdOd0034Info.commCd === '1'">
                    <span class="inp-radio mid">
                      <!--<input v-if="parcelDisabled === true" type="radio" :name="'selectedOptionValue' + ordsDelivGrpInfo.ordsDlvpSeqno" v-bind:id="'selectedOptionValue'+ ordsDelivGrpInfo.ordsDlvpSeqno + commGrpCdOd0034Info.commCd" v-bind:value="commGrpCdOd0034Info.commCd" v-model="delivRequest.selectedOptionValue" :disabled="true">-->
                      <input type="radio" :name="'selectedOptionValue' + ordsDelivGrpInfo.ordsDlvpSeqno" v-bind:id="'selectedOptionValue'+ ordsDelivGrpInfo.ordsDlvpSeqno + commGrpCdOd0034Info.commCd" v-bind:value="commGrpCdOd0034Info.commCd" v-model="delivRequest.selectedOptionValue" v-on:change="checkDlvpReqForm('2', $event)" :disabled="disableInput()">
                      <label v-bind:for="'selectedOptionValue' + ordsDelivGrpInfo.ordsDlvpSeqno + commGrpCdOd0034Info.commCd">{{commGrpCdOd0034Info.commCdNm}}</label>
                    </span>
                    <button type="button" class="btn icon-question" aria-label="공동현관출입번호안내 팝업 활성화" aria-haspopup="dialog" @click="popupPublicDoorNoInfoActive">
                      <span class="hidden">공동현관출입번호안내</span>
                    </button>
                  </div>
                  <span class="inp-radio mid w125" v-else>
                    <input type="radio" :name="'selectedOptionValue' + ordsDelivGrpInfo.ordsDlvpSeqno" v-bind:id="'selectedOptionValue'+ ordsDelivGrpInfo.ordsDlvpSeqno + commGrpCdOd0034Info.commCd" v-bind:value="commGrpCdOd0034Info.commCd" v-model="delivRequest.selectedOptionValue" v-on:change="checkDlvpReqForm('2', $event)" :disabled="disableInput()">
                    <label v-bind:for="'selectedOptionValue' + ordsDelivGrpInfo.ordsDlvpSeqno + commGrpCdOd0034Info.commCd">{{commGrpCdOd0034Info.commCdNm}}</label>
                  </span>
                </span>
              </div>
              <!-- START : 공동현관출입번호 -->
              <div><!-- v-model="selectedOptionValue" value="door"일 (공동현관출입번호) 경우 노출 -->
                <p v-if="this.delivRequest.selectedOptionValue === '1'">
                  <input class="inp-txt w100" :name="`${'itemDlvrMethoDtlCnts'+ ordsDelivGrpInfo.ordsDlvpSeqno}`" :id="`${'itemDlvrMethoDtlCnts'+ ordsDelivGrpInfo.ordsDlvpSeqno}`" v-model="delivRequest.itemDlvrMethoDtlCnts" type="text" value="" v-on:blur="checkDlvpReqForm('3', $event)" placeholder="자세히 입력해주세요 예) #1234 호출버튼" title="공동현관출입번호 입력" :disabled="disableInput()">
                </p>
                <div class="check-area" v-if="loginYn">
                  <span class="inp-chk bg">
                    <input type="checkbox" name="'agreeDeliveryType'" id="'agreeDeliveryType'" v-model="delivRequest.agreeDeliveryType" @change="agreeDeliveryChange" :disabled="disableInput()">
                    <label for="'agreeDeliveryType'">다음 주문에도 사용 동의</label>
                  </span>
                </div>
                <!-- <div class="txt-info-list">
                  <p class="ico-alert2">입력된 공동현관 출입번호는 원활한 배송을 위해 계속 사용하도록 안전하게 저장/관리합니다.</p>
                </div> -->
              </div>
              <!-- END : 공동현관출입번호 -->
              <!-- START : 경비실호출, 필요없음 --> <!-- v-model="selectedOptionValue" value="door" 외일 (경비실 호출, 필요없음) 경우 노출 -->
              <div v-if="this.delivRequest.selectedOptionValue != '1'">
                <div class="txt-info-list">
                  <p class="ico-alert2">출입이 불가능할 경우 반송될 수 있으니 반드시 상품 수령 위치를 확인바랍니다.</p>
                </div>
              </div>
            </div>
            <!-- START : 기타 -->
            <div class="location-content" v-if="this.delivRequest.selectedLocation == '99'">
              <div class="write-wrap">
                <textarea
                :id="'itemDlvrMethoDtlCnts' + ordsDelivGrpInfo.ordsDlvpSeqno"
                :name="'itemDlvrMethoDtlCnts' + ordsDelivGrpInfo.ordsDlvpSeqno"
                v-model="delivRequest.itemDlvrMethoDtlCnts"
                cols="" rows=""
                title="배송 요청사항 메시지 입력"
                placeholder="내용을 입력해 주세요."
                v-on:blur="checkDlvpReqForm('5', $event)"
                :onkeyup="itemDlvrMethoDtlCntsChk(null, 'direct', 'etc')"></textarea> <!-- 실시간수정으로 변경 -->
                <span class="txt-byte"><span class="hidden">현재 작성한 글자 수</span><em>{{etcTxtLen}}</em><span>/</span>
                <span class="hidden">최대 작성 글자 수</span><span>50</span></span>
              </div>
            </div>
            <div class="sub-title" v-if="deliveryRequest.deliveryRequestYn === 'Y'">
              <h3>택배배송 요청사항</h3>
            </div>
            <div class="location-content" v-if="deliveryRequest.deliveryRequestYn === 'Y'">
              <div class="write-wrap">
                <textarea
                :id="'itemDlvrMethoDtlCnts' + ordsDelivGrpInfo.ordsDlvpSeqno"
                :name="'itemDlvrMethoDtlCnts' + ordsDelivGrpInfo.ordsDlvpSeqno"
                v-model="deliveryRequest.delivMsgCnts"
                cols="" rows=""
                title="배송 요청사항 메시지 입력"
                placeholder="택배기사님께 요청할 사항이 있으신 경우 작성해주세요 (최대 100자 이내)"
                v-on:blur="checkDlvpReqForm('9', $event)"
                :onkeyup="itemDlvrMethoDtlCntsChk(null, 'direct', 'delivery')"></textarea> <!-- 실시간수정으로 변경 -->
                <span class="txt-byte"><span class="hidden">현재 작성한 글자 수</span><em>{{deliveryTxtLen}}</em><span>/</span>
                <span class="hidden">최대 작성 글자 수</span><span>100</span></span>
              </div>
            </div>
            <!-- END : 기타 -->
          </div>
          <PopupPublicDoorNoInfo @popupEvent="popupAction" v-if="this.popup.popupPublicDoorNoInfo" /> <!-- 팝업 - 공동현관출입번호 안내 -->
        </div>
        <div class="inner" id="soldoutTypeR">
          <div class="sub-title">
            <h3>결품발생 시 처리 방법 <span class="required" aria-label="필수 항목">*</span></h3>
          </div>
          <p class="check-area">
            <span class="inp-radio mid w125" v-for="commGrpCdOd0005Info in commGrpCdOd0005List" v-bind:key="commGrpCdOd0005Info.commCd">
              <input type="radio" :name="'soldoutType' + ordsDelivGrpInfo.ordsDlvpSeqno" v-bind:id="'soldoutType'+ ordsDelivGrpInfo.ordsDlvpSeqno + commGrpCdOd0005Info.commCd" v-model="bSelectedSoldoutValue" v-bind:value="commGrpCdOd0005Info.commCd" v-on:change="checkDlvpReqForm('6', $event)" :disabled="disableInput()">
              <label v-bind:for="'soldoutType'+ ordsDelivGrpInfo.ordsDlvpSeqno + commGrpCdOd0005Info.commCd">{{commGrpCdOd0005Info.commCdNm}}</label><!-- 수정 : 2020.02.13 텍스트 수정 -->
            </span>
          </p>
          <ul class="txt-info-list" v-if="bSelectedSoldoutValue == 'C'"> <!-- v-model="selectedSoldoutValue" value="2" 부분 취소일 경우 노출  -->
            <li class="ico-alert2">부분 취소가 불가능한 결제수단으로 이용하신 경우 포인트로 환불처리 됩니다.</li>
          </ul>
          <div class="check-area" v-if="loginYn">
            <span class="inp-chk bg">
              <input type="checkbox" :name="'agreeSoldout' + ordsDelivGrpInfo.ordsDlvpSeqno" :id="'agreeSoldout' + ordsDelivGrpInfo.ordsDlvpSeqno" v-model="delivRequest.agreeSoldout" @change="agreeSoldoutChange" :disabled="disableInput()">
              <label :for="'agreeSoldout' + ordsDelivGrpInfo.ordsDlvpSeqno">선택한 처리 방법 저장</label>
            </span>
          </div>
          <div class="txt-info-list">
            <p class="ico-alert2">고객님이 선택한 결품처리방법으로 유선 통화 없이 진행됩니다.</p>
          </div>
        </div>
        <div class="inner">
          <div class="sub-title">
            <h3>환경보호 실천하기</h3>
          </div>
          <p class="check-area">
            <span class="inp-chk bg">
              <input type="checkbox" :name="'paperBill' + ordsDelivGrpInfo.ordsDlvpSeqno" :id="'paperBill' + ordsDelivGrpInfo.ordsDlvpSeqno" v-model="delivRequest.RecptGetMetho" v-on:change="checkDlvpReqForm('8', $event)" :disabled="disableInput()">
              <label :for="'paperBill' + ordsDelivGrpInfo.ordsDlvpSeqno">종이영수증 안주셔도 돼요</label>
            </span>
          </p>
          <ul class="txt-info-list mt0">
            <li class="ico-alert2 point">전자영수증은 주문 즉시 발행됩니다.</li>
          </ul>
        </div>
      </div>
      <!-- END : 이전 주문에서 저장한 방법이 없는 경우 -->
    </div>
    <!-- 수정 END : 2020.02.12 마크업 변경 (옵션 변경에 따른 마크업 및 하단 스크립트 변경)) -->
    <!-- START : 이전 주문에서 저장한 방법이 있는 경우 -->
    <div class="sub-inner-box delivery" v-if="popupTypeDelivery != 'hide' && !pickupCenterFlag"><!-- 8월 추가 (배송요청사항 별도 팝업 케이스 추가 popupTypeDelivery props 값으로 hide) -->
      <ul class="info-request" v-if="bDelivRequest != null">
        <li v-if="isNotEmpty(bItemDlvrMethoCdNm)">상품 수령 위치<span aria-label="필수 항목" class="required">*</span> : {{bItemDlvrMethoCdNm}}</li>
        <li v-if="delivRequest.selectedOptionValue === '1' && isNotEmpty(delivRequest.itemDlvrMethoDtlCnts) && !parcelDisabled" >공동현관 출입번호 : <span aria-label="필수 항목" class="required">*</span>{{delivRequest.itemDlvrMethoDtlCnts}}</li>
        <li v-if="isNotEmpty(deliveryRequest.delivMsgCnts)">택배요청사항<span aria-label="필수 항목" class="required">*</span> : <span v-html="deliveryRequest.delivMsgCnts.replace(/(?:\r\n|\r|\n)/g, '<br />')"></span></li>
        <li v-if="isNotEmpty(bOfsItemProcSpCdNm)">결품발생 시 처리 방법<span aria-label="필수 항목" class="required">*</span> : {{bOfsItemProcSpCdNm}}</li>
      </ul>
    </div>
    <!-- END : 이전 주문에서 저장한 방법이 있는 경우 -->
  </section>
</template>

<script>
import PopupPublicDoorNoInfo from '@/views/od/PopupPublicDoorNoInfo'; // 팝업 - 무이자 할부 안내
import AccordionMixin from '@/mixins/AccordionMixin';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import LoginUtils from '@/common/LoginUtils';
import OrderMsg from '@/components/order/OrderMsg';
export default {
  props: {
    ordsDelivGrpInfo: Object,
    ordsDlvpInfo: Object,
    multiYn: String, // 다중배송시사용
    bundlDelivOrdId: String,
    ordsItemList: Object,
    isTitle: String,
    popupTypeDelivery: String,
    pickupCenterFlag: Boolean,
      ordsInfo: Object,
  },
  name: "DeliveryRequest",
  data() {
    return {
      etcTxtLen: 0,
      deliveryTxtLen: 0,
      commGrpCdOd0033List: null, // 상품수령위치목록
      commGrpCdOd0005List: null, // 영수증 수령방법
      commGrpCdOd0034List: null, // 상품전달방법추가코드
      commGrpCdOd0038List: null, // 영수증 수령방법
      bDelivRequest: {},
      bItemDlvrMethoCdNm: '',
      bOfsItemProcSpCdNm: '',
      delivRequest: { // 배송요청사항 DVLP
        ordId: this.ordsDelivGrpInfo.ordId,
        ordsDlvpSeqno: this.ordsDelivGrpInfo.ordsDlvpSeqno,
        selectedLocation: '01', // 상품 수령 위치 옵션
        selectedOptionValue: '1', // 상품 수령 위치 - 공동현관 선택
        selectedSoldoutValue: 'P', // 결품발생 처리방법 옵션
        RecptGetMetho: true, // 영수증수령방법
        itemDlvrMethoDtlCnts: '', // 배송 요청사항 메시지
        soldoutType: 'R', // 결품발생시 처리방법
        agreeDeliveryType: false, // 배송요청사항저장여부
        agreeSoldout: false, // 결품처리방법저장여부
      },
      deliveryRequest: { // 택배요청사항 DELIV
        deliveryRequestYn: 'N',
        ordId: this.ordsDelivGrpInfo.ordId,
        ordsDlvpSeqno: this.ordsDelivGrpInfo.ordsDlvpSeqno,
        delivMsgCnts: '', // 배송 요청사항 메시지
      },
      popup: { // 팝업
        open: false,
        popupPublicDoorNoInfo: false, // 공동현관출입번호안내
      },
      cuMbrInfo: {},
      cuMbrDlvp: {},
      parcelDisabled: false,
      fpurchItemYn: false,
      bSelectedSoldoutValue: 'P',
      loginYn: LoginUtils.isLogin(),
    };
  },
  mixins: [AccordionMixin],
  components: {
    PopupPublicDoorNoInfo,
  },
  methods: {
    popupAction(type) { // 팝업 활성/비활성
      this.popup[type] = !this.popup[type];
      this.popup.open = !this.popup.open;
    },
    popupPublicDoorNoInfoActive() {
      this.popupAction('popupPublicDoorNoInfo');
    },
    // 공통코드 조회
    async commCdSearch(commGrpCd) {
      const params = {
        commGrpCd: commGrpCd,
      };
      const result = await ApiUtils.get('/fo/cm/commcdmgnt/common-codes', params);
      return result.data.data;
    },
    // 배송메세지 체크
    async checkDlvpReqForm(gbn, e) {
      this.bItemDlvrMethoCdNm = this.delivRequest.selectedLocation ? this.commGrpCdOd0033List.filter(it=> it.commCd.includes(this.delivRequest.selectedLocation))[0].commCdNm : '';
      this.bOfsItemProcSpCdNm = this.bSelectedSoldoutValue ? this.commGrpCdOd0005List.filter(it=> it.commCd.includes(this.bSelectedSoldoutValue))[0].commCdNm : '';
      if (gbn === '1') {
        if (this.delivRequest.selectedLocation == '99') {
          this.delivRequest.selectedOptionValue = '';
          this.delivRequest.itemDlvrMethoDtlCnts = '';
          this.delivRequest.agreeDeliveryType = false;
          this.agreeDeliveryChange();
        } else {
          this.delivRequest.itemDlvrMethoDtlCnts = "";
          if (this.parcelDisabled) {
            this.delivRequest.selectedOptionValue = '3';
          } else {
            this.delivRequest.selectedOptionValue = this.delivRequest.selectedOptionValue ? this.delivRequest.selectedOptionValue : '1'; // 상품수령위치 리셋 20200527 유현석
          }
        }
      }
      if (gbn === '2') {
        if (this.delivRequest.selectedOptionValue != '1') {
          this.delivRequest.itemDlvrMethoDtlCnts = '';
          this.delivRequest.agreeDeliveryType = false;
          this.agreeDeliveryChange();
        }
      }
      if (gbn === '6') {
        if (this.fpurchItemYn && this.bSelectedSoldoutValue === 'C') {
          return;
        }
        if (this.delivRequest.agreeSoldout === true) {
          this.agreeSoldoutChange();
        }
      }
      /*
      if (gbn === '8') {
        if (this.delivRequest.RecptGetMetho) {
          this.delivRequest.RecptGetMetho = 'P';
        } else {
          this.delivRequest.RecptGetMetho = 'M';
        }
      }
      */
      if (gbn === '5') {
        this.delivRequest.itemDlvrMethoDtlCnts = this.itemDlvrMethoDtlCntsChk(this.delivRequest.itemDlvrMethoDtlCnts, null, 'etc');
      }
      if (gbn === '9') {
        this.deliveryRequest.delivMsgCnts = this.itemDlvrMethoDtlCntsChk(this.deliveryRequest.delivMsgCnts, null, 'delivery');
      }
      if (gbn === '3') {
        this.delivRequest.itemDlvrMethoDtlCnts = this.delivMsgCntsChk(this.delivRequest.itemDlvrMethoDtlCnts);
        if (this.delivRequest.agreeDeliveryType) {
          this.agreeDeliveryChange();
        }
      }
      this.deliveryRequestProc();
    },
    async deliveryRequestProc() {
      // 디폴트로 정의된 배송요청사항 DB 업데이트
      const iOrdsDelivDlvpInq = {
        cmmMbrNo: this.ordsDlvpInfo.cmmMbrNo,
        mbrDlvpSeqno: this.ordsDlvpInfo.mbrDlvpSeqno,
        ordId: this.ordsDelivGrpInfo.ordId,
        ordsDlvpSeqno: this.ordsDelivGrpInfo.ordsDlvpSeqno,
        itemDlvrMethoCd: this.delivRequest.selectedLocation,
        itemDlvrMethoAddCd: this.delivRequest.selectedOptionValue,
        itemDlvrMethoDtlCnts: this.delivRequest.itemDlvrMethoDtlCnts,
        delivMsgCnts: this.deliveryRequest.delivMsgCnts,
        ofsItemProcSpCd: this.bSelectedSoldoutValue,
        // deliveryItemDlvrMethoDtlCnts: this.deliveryRequest.itemDlvrMethoDtlCnts,
        ordRecptIssuYn: this.delivRequest.RecptGetMetho ? 'N' : 'Y',
      };
      const result = await ApiUtils.put('/fo/od/ordsmgnt/delivery-request-proc', iOrdsDelivDlvpInq);
      this.$emit('delivReqEvent', this.delivRequest);
    },
    itemDlvrMethoDtlCntsChk(newVal, gbn, gbn2) {
      if (newVal === null && gbn !== null && gbn === 'direct') {
        if (gbn2 === 'etc') {
          newVal = this.delivRequest.itemDlvrMethoDtlCnts;
        } else if (gbn2 === 'delivery') {
          newVal = this.deliveryRequest.delivMsgCnts;
        }
      }
      const len = newVal.length; // StringUtils.getByteLength(newVal);
      if (len <= 100) {
        if (gbn !== null && gbn === 'direct') {
          if (gbn2 === 'etc') {
            this.etcTxtLen = len;
            this.delivRequest.itemDlvrMethoDtlCnts = newVal;
          } else if (gbn2 === 'delivery') {
            this.deliveryTxtLen = len;
            this.deliveryRequest.delivMsgCnts = newVal;
          }
        } else {
          return newVal;
        }
      } else {
        /* let strLength = 0;
        let strTitle = "";
        let strPiece = "";

        for (let i = 0; i < len; i++) {
          let code = newVal.charCodeAt(i);
          const ch = newVal.substr(i, 1).toUpperCase();
          // 체크 하는 문자를 저장
          strPiece = newVal.substr(i, 1);
          code = parseInt(code);

          if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && ((code > 255) || (code < 0))) {
            strLength = strLength + 3; // UTF-8 3byte 로 계산
          } else {
            strLength = strLength + 1;
          }
          if (strLength >= 50) { // 제한 길이 확인
            break;
          } else {
            strTitle = strTitle+strPiece; // 제한길이 보다 작으면 자른 문자를 붙여준다.
          }
        } */
        this.alertMessage();
        const strTitle = newVal.substring(0, 100);
        const strLength = strTitle.length;
        if (gbn !== null && gbn === 'direct') {
          if (gbn2 === 'etc') {
            this.etcTxtLen = strLength;
            this.delivRequest.itemDlvrMethoDtlCnts = strTitle;
          } else if (gbn2 === 'delivery') {
            this.deliveryTxtLen = strLength;
            this.deliveryRequest.delivMsgCnts = strTitle;
          }
        } else {
          return strTitle;
        }
      }
    },
    alertMessage() {
        this.$gsdialog.alert('최대 100글자 까지 가능합니다.').then(dialog => {});
    },
    delivMsgCntsChk(newVal) {
      const len = StringUtils.getByteLength(newVal);
      if (len > 100) {
        let strLength = 0;
        let strTitle = "";
        let strPiece = "";

        for (let i = 0; i < newVal.length; i++) {
          let code = newVal.charCodeAt(i);
          const ch = newVal.substr(i, 1).toUpperCase();
          // 체크 하는 문자를 저장
          strPiece = newVal.substr(i, 1);
          code = parseInt(code);

          if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && ((code > 255) || (code < 0))) {
            strLength = strLength + 3; // UTF-8 3byte 로 계산
          } else {
            strLength = strLength + 1;
          }

          if (strLength > 100) { // 제한 길이 확인
            break;
          } else {
            strTitle = strTitle+strPiece; // 제한길이 보다 작으면 자른 문자를 붙여준다.
          }
        }
        return strTitle;
      }
      return newVal;
    },
    isNotEmpty(x) {
      return !StringUtils.isEmpty(x);
    },
    disableInput() {
      if ( this.bundlDelivOrdId == null || this.bundlDelivOrdId == '') {
        return false;
      } else {
        return true;
      }
    },
    async delivRequestSort(delivRequest) { // 다중배송 모두 동일 요청 적용시 사용
      if (this.multiYn === 'Y' && this.delivRequest != undefined && this.delivRequest != null) {
        this.delivRequest.RecptGetMetho = delivRequest.RecptGetMetho;
        this.delivRequest.agreeDeliveryType = delivRequest.agreeDeliveryType;
        this.delivRequest.agreeSoldout = delivRequest.agreeSoldout;
        this.delivRequest.delivMsgCnts = delivRequest.delivMsgCnts;
        this.delivRequest.itemDlvrMethoDtlCnts = delivRequest.itemDlvrMethoDtlCnts;
        this.delivRequest.ordId = delivRequest.ordId;
        this.delivRequest.ordsDlvpSeqno = delivRequest.ordsDlvpSeqno;
        this.delivRequest.selectedLocation = delivRequest.selectedLocation;
        this.delivRequest.selectedOptionValue = delivRequest.selectedOptionValue;
        this.bSelectedSoldoutValue = delivRequest.selectedSoldoutValue;
        this.delivRequest.soldoutType = delivRequest.soldoutType;
        this.deliveryRequestProc();
      }
    },
    async agreeDeliveryChange() {
      // 배송요청사항 저장
      const iput = {
        cmmMbrNo: this.ordsDlvpInfo.cmmMbrNo,
        mbrDlvpSeqno: this.ordsDlvpInfo.mbrDlvpSeqno,
        itemDlvrMethoCd: (this.cuMbrDlvp[0] && this.cuMbrDlvp[0].itemDlvrMethoCd) ? this.cuMbrDlvp[0].itemDlvrMethoCd : '',
        itemDlvrMethoAddCd: (this.cuMbrDlvp[0] && this.cuMbrDlvp[0].itemDlvrMethoAddCd) ? this.cuMbrDlvp[0].itemDlvrMethoAddCd : '',
        itemDlvrMethoDtlCnts: this.cuMbrDlvp[0].itemDlvrMethoDtlCnts ? this.cuMbrDlvp[0].itemDlvrMethoDtlCnts : '',
      };
      if (this.delivRequest.agreeDeliveryType === true) {
        iput.itemDlvrMethoCd = this.delivRequest.selectedLocation ? this.delivRequest.selectedLocation : '';
        iput.itemDlvrMethoAddCd = this.delivRequest.selectedOptionValue ? this.delivRequest.selectedOptionValue : '';
        iput.itemDlvrMethoDtlCnts = this.delivRequest.itemDlvrMethoDtlCnts ? this.delivRequest.itemDlvrMethoDtlCnts : '';
      }
      if (this.loginYn) {
        const result = await ApiUtils.put('/fo/cu/mypgmgnt/deliveryplace-customer-request', iput);
      }
      this.$emit('delivReqEvent', this.delivRequest);
    },
    async agreeSoldoutChange() {
      // 결품처리방법 저장
      const iput = {
        ofsItemProcSpCd: this.cuMbrInfo.ofsItemProcSpCd ? this.cuMbrInfo.ofsItemProcSpCd : '',
      };
      if (this.delivRequest.agreeSoldout === true) {
        iput.ofsItemProcSpCd = this.bSelectedSoldoutValue ? this.bSelectedSoldoutValue : '';
      }
      if (this.loginYn) {
        const result = await ApiUtils.put('/fo/cu/mbrmgnt/member-order-information', iput);
      }
      this.$emit('delivReqEvent', this.delivRequest);
    },
    async retrieveCuMbrInfo() {
      const iMbrDlvpInfoInq = {
        cmmMbrNo: this.ordsDlvpInfo.cmmMbrNo,
      };
      const response = await ApiUtils.get('/fo/cu/mbrmgnt/member-information', iMbrDlvpInfoInq);
      this.cuMbrInfo = response.data.data;
    },
    async retrieveCuMbrDlvp() {
      const iMbrDlvpInfoInq = {
        cmmMbrNo: this.ordsDlvpInfo.cmmMbrNo,
        mbrDlvpSeqno: this.ordsDlvpInfo.mbrDlvpSeqno,
      };
      const response = await ApiUtils.get('/fo/cu/mypgmgnt/deliveryplace', iMbrDlvpInfoInq);
      this.cuMbrDlvp = response.data.data;
    },
  },
  watch: {
    // 수령 위치 선택
    selectedLocation(newVal) {
      if (newVal === '01' || newVal === '02') {
        this.selectedOptionValue = '1';
        this.delivRequest.selectedOptionValue = '1';
      } else if (newVal === '99') {
        this.selectedOptionValue = '';
        this.delivRequest.selectedOptionValue = '';
      } else {
        this.selectedOptionValue = '3';
        this.delivRequest.selectedOptionValue = '3';
      }
    },
    ordsItemList: function() {
      let todayCnt = 0;
      let supplParcelCnt = 0;
      let owncoParcelCnt = 0;
      let abrdCnt = 0;
      if (this.ordsItemList.fpurchItemAmt > 0) {
        this.fpurchItemYn = true;
      }
      if (this.ordsItemList.ordsDelivGrpInfoList) {
        for (let i = 0; i < this.ordsItemList.ordsDelivGrpInfoList.length; i++) {
          if (this.ordsItemList.ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList) {
            for (let j = 0; j < this.ordsItemList.ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList.length; j++) {
              const ordsDelivSupplGrpInfo = this.ordsItemList.ordsDelivGrpInfoList[i].ordsDelivSupplGrpInfoList[j];
              if (ordsDelivSupplGrpInfo) {
                /*
                if ((ordsDelivSupplGrpInfo.ordTypeCd !== '50' && ordsDelivSupplGrpInfo.delivTypeCd === '02')
                    || (ordsDelivSupplGrpInfo.ordTypeCd !== '50' && ordsDelivSupplGrpInfo.delivTypeCd === '05')
                    || ordsDelivSupplGrpInfo.delivTypeCd === '03') { // 전택, 해외, (예약)업택, 업택
                      this.deliveryRequest.deliveryRequestYn = 'Y';
                      this.deliveryRequest.itemDlvrMethoDtlCnts = this.bDelivRequest.deliveryItemDlvrMethoDtlCnts ? this.bDelivRequest.deliveryItemDlvrMethoDtlCnts : '';
                      break;
                }
                */
                if (ordsDelivSupplGrpInfo.delivTypeCd === '01' || ordsDelivSupplGrpInfo.delivTypeCd === '04') {
                  todayCnt++;
                } else if (ordsDelivSupplGrpInfo.delivTypeCd === '02') {
                  owncoParcelCnt++;
                } else if (ordsDelivSupplGrpInfo.delivTypeCd === '03') {
                  supplParcelCnt++;
                } else if (ordsDelivSupplGrpInfo.delivTypeCd === '05') {
                  abrdCnt++;
                }
              }
            }
          }
        }
      }
      // 택배요청사항
      if (owncoParcelCnt > 0 || supplParcelCnt > 0 || abrdCnt > 0) { // 전택, 업택, 해외직구 존재할 경우
        this.deliveryRequest.deliveryRequestYn = 'Y';
        if (this.deliveryRequest.deliveryRequestYn === 'Y') {
          if (this.bDelivRequest) {
            this.deliveryRequest.delivMsgCnts = this.bDelivRequest.delivMsgCnts ? this.bDelivRequest.delivMsgCnts : '';
          }
        }
      }
      // 공동현관 출입번호
      if ((owncoParcelCnt > 0 || supplParcelCnt > 0 || abrdCnt > 0) && todayCnt === 0) { // 전택, 업택, 해외직구만 존재할 경우
        this.parcelDisabled = true;
        this.delivRequest.selectedOptionValue = '3';
        this.delivRequest.itemDlvrMethoDtlCnts = '';
        this.deliveryRequestProc();
        /*
        this.commGrpCdOd0034List.splice(this.commGrpCdOd0034List.findIndex(i=>i.commCd === '1'), 1);
        if (this.delivRequest.selectedOptionValue === '1') {
          this.delivRequest.selectedOptionValue = '2';
        }
        */
      }
    },
    bSelectedSoldoutValue: function(newVal, oldVal) {
      if (this.fpurchItemYn && newVal === 'C') {
        this.$gsdialog.alert(OrderMsg.fpurchItemSoldout, {html: true});
        this.$nextTick(() => {
          this.bSelectedSoldoutValue = oldVal;
          this.bOfsItemProcSpCdNm = this.bSelectedSoldoutValue ? this.commGrpCdOd0005List.filter(it=> it.commCd.includes(this.bSelectedSoldoutValue))[0].commCdNm : '';
        });
      }
      this.delivRequest.selectedSoldoutValue = this.bSelectedSoldoutValue;
    },
  },
  async mounted() {
    this.commGrpCdOd0033List = await this.commCdSearch('OD0033'); // 상품수령위치
    this.commGrpCdOd0005List = await this.commCdSearch('OD0005'); // 결품상품처리구분코드
    this.commGrpCdOd0034List = await this.commCdSearch('OD0034'); // 상품전달방법추가코드
    this.commGrpCdOd0038List = await this.commCdSearch('OD0038'); // 영수증 수령방법
    const iMbrDlvpInfoInq = {
      mbrDlvpSeqno: this.ordsDlvpInfo.mbrDlvpSeqno,
      ordId: (this.bundlDelivOrdId!==null && this.bundlDelivOrdId!=="")?this.bundlDelivOrdId:this.ordsDlvpInfo.ordId
    };
    const response = await ApiUtils.post('/fo/od/ordsmgnt/cust-request-info', iMbrDlvpInfoInq);
    this.bDelivRequest = response.data.data;
    if (this.bDelivRequest != null) {
      if ( this.bundlDelivOrdId == null || this.bundlDelivOrdId == '') {
        // this.bItemDlvrMethoCdNm = this.bDelivRequest.lastItemDlvrMethoCd ? this.commGrpCdOd0033List.filter(it=> it.commCd.includes(this.bDelivRequest.lastItemDlvrMethoCd))[0].commCdNm : '';
        if (this.bDelivRequest.itemDlvrMethoCd || this.bDelivRequest.itemDlvrMethoAddCd || this.bDelivRequest.itemDlvrMethoDtlCnts) {
          this.delivRequest.agreeDeliveryType = true;
        }
        this.delivRequest.selectedLocation = this.bDelivRequest.itemDlvrMethoCd ? this.bDelivRequest.itemDlvrMethoCd : this.delivRequest.selectedLocation;
        this.delivRequest.selectedOptionValue = this.bDelivRequest.itemDlvrMethoAddCd ? this.bDelivRequest.itemDlvrMethoAddCd : this.delivRequest.selectedOptionValue;
        this.delivRequest.itemDlvrMethoDtlCnts = this.bDelivRequest.itemDlvrMethoDtlCnts ? this.bDelivRequest.itemDlvrMethoDtlCnts : this.delivRequest.itemDlvrMethoDtlCnts;
        this.deliveryRequest.delivMsgCnts = this.bDelivRequest.delivMsgCnts ? this.bDelivRequest.delivMsgCnts : '';
        // this.bOfsItemProcSpCdNm = this.bDelivRequest.lastOfsItemProcSpCd ? this.commGrpCdOd0005List.filter(it=> it.commCd.includes(this.bDelivRequest.lastOfsItemProcSpCd))[0].commCdNm : '';
        if (this.bDelivRequest.ofsItemProcSpCd) {
          this.delivRequest.agreeSoldout = true;
        }
        this.bSelectedSoldoutValue = this.bDelivRequest.ofsItemProcSpCd ? this.bDelivRequest.ofsItemProcSpCd : this.bSelectedSoldoutValue;
      } else {
        // this.bItemDlvrMethoCdNm = this.bDelivRequest.lastItemDlvrMethoCd ? this.commGrpCdOd0033List.filter(it=> it.commCd.includes(this.bDelivRequest.lastItemDlvrMethoCd))[0].commCdNm : '';
        this.delivRequest.selectedLocation = this.bDelivRequest.lastItemDlvrMethoCd ? this.bDelivRequest.lastItemDlvrMethoCd : this.delivRequest.selectedLocation;
        this.delivRequest.selectedOptionValue = this.bDelivRequest.lastItemDlvrMethoAddCd ? this.bDelivRequest.lastItemDlvrMethoAddCd : this.delivRequest.selectedOptionValue;
        this.delivRequest.itemDlvrMethoDtlCnts = this.bDelivRequest.lastItemDlvrMethoDtlCnts ? this.bDelivRequest.lastItemDlvrMethoDtlCnts : this.delivRequest.itemDlvrMethoDtlCnts;
        this.deliveryRequest.delivMsgCnts = this.bDelivRequest.lastDelivMsgCnts ? this.bDelivRequest.lastDelivMsgCnts : '';
        // this.bOfsItemProcSpCdNm = this.bDelivRequest.lastOfsItemProcSpCd ? this.commGrpCdOd0005List.filter(it=> it.commCd.includes(this.bDelivRequest.lastOfsItemProcSpCd))[0].commCdNm : '';
        this.bSelectedSoldoutValue = this.bDelivRequest.lastOfsItemProcSpCd ? this.bDelivRequest.lastOfsItemProcSpCd : this.bSelectedSoldoutValue;
        this.delivRequest.RecptGetMetho = this.ordsInfo.recptIssuSpCd === 'M' ? true : false;
        // this.delivRequest.RecptGetMetho = this.bDelivRequest.lastRecptIssuSpCd === 'P' ? true : false;
      }
    }
    // 회원정보 조회
    if (this.loginYn) {
      this.retrieveCuMbrInfo(); // 저장된 결품처리방법
      this.retrieveCuMbrDlvp(); // 저장된 배송요청사항
    }
    // this.itemDlvrMethoDtlCntsChk((this.bDelivRequest !== null && this.bDelivRequest.itemDlvrMethoDtlCnts !== null) ? this.bDelivRequest.itemDlvrMethoDtlCnts : this.delivRequest.itemDlvrMethoDtlCnts, null);
    this.deliveryRequestProc();
    this.bItemDlvrMethoCdNm = this.delivRequest.selectedLocation ? this.commGrpCdOd0033List.filter(it=> it.commCd.includes(this.delivRequest.selectedLocation))[0].commCdNm : '';
    this.bOfsItemProcSpCdNm = this.bSelectedSoldoutValue ? this.commGrpCdOd0005List.filter(it=> it.commCd.includes(this.bSelectedSoldoutValue))[0].commCdNm : '';
  },
  destroyed() {
  },
};
</script>
