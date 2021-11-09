<!--
views/pa/SC-FO-PA-MF-MP-008
-->
<template>
  <div id="popupTelecomInput" class="wrap-layer option-list-layer" role="dialog" aria-labelledby="popupTelecomInput" aria-modal="true" :class="{active : this.modalActive.popupTelecomInput}">
    <div class="layer-bg" @click="popupAction"></div>
    <div class="layer-bottom-fixed">
      <div class="title"><h3>{{ selectType[reqPntForm.telcoType] }}</h3></div>
      <div class="layer-content">
          <div class="mobile-type">
            <p class="select-mobile-type">
              <span class="inp-radio small" v-if="isNotEmpty(ktUsePntInfo.promId)">
                <input type="radio" name="selectMobile" id="mobile1" value="KT" v-model="reqPntForm.telcoType" @click="selectMobileTypeActioin('KT')">
                <label for="mobile1"><span class="ico-sns icon-kakaotalk"></span>{{ selectType['KT'] }}</label>
              </span>
              <span class="inp-radio small" v-if="isNotEmpty(lgUsePntInfo.promId)">
                <input type="radio" name="selectMobile" id="mobile2" value="LGU" v-model="reqPntForm.telcoType" @click="selectMobileTypeActioin('LGU')">
                <label for="mobile2"><span class="ico-sns icon-sms"></span>{{ selectType['LGU'] }}</label>
              </span>
            </p>
            <dl class="input-frm">
                <dt><label for="birth">생년월일</label></dt>
                <dd class="inp-box">
                  <input type="number" min="19000101" max="21001231" id="birth" class="inp-txt" v-model="reqPntForm.birthDay" title="생년월일" placeholder="YYYYMMDD" @keyup="checkNumberLength(reqPntForm.birthDay, 'B', 8, $event)">
                  <button class="btn-reset" @click="resetBirthDay()"><span class="hidden">입력 초기화</span></button>
                </dd>
                <dt><label for="card-number">멤버십 카드번호</label></dt>
                <dd class="input-frm_card">
                    <span><input type="number" min="0" max="9999" maxlength="4" name="cardNo1" id="cardNo1" class="inp-txt" v-model="reqPntForm.cardNo1" @keyup="checkNumberLength(reqPntForm.cardNo1, '1', 4, $event)" title="통신사 카드 첫번째 자리"></span>
                    <span><input type="password" maxlength="4" id="cardNo2" class="inp-txt" name="cardNo2" v-model="reqPntForm.cardNo2" @keyup="numberOnly(reqPntForm.cardNo2, '2', 4, $event)" title="통신사 카드 두번째 자리"></span>
                    <span><input type="password" maxlength="4" id="cardNo3" class="inp-txt" name="cardNo3" v-model="reqPntForm.cardNo3" @keyup="numberOnly(reqPntForm.cardNo3, '3', 4, $event)"  title="통신사 카드 세번째 자리"></span>
                    <span><input type="number" min="0" max="9999" maxlength="4" id="cardNo4" class="inp-txt" name="cardNo4" v-model="reqPntForm.cardNo4" @keyup="checkNumberLength(reqPntForm.cardNo4, '4', 4, $event)" title="통신사 카드 마지막 자리"></span>
                </dd>
            </dl>
          </div>
      </div>
      <div class="wrap-btn">
        <button type="button" class="btn-lg btn-bg lightgreen"  @click="reqRetrievePnt()">적용</button>
      </div>
      <button class="btn-layer-close" @click="popupAction" @keydown.9="tabFocusRemove('popupAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
        <span class="hidden">닫기</span>
      </button>
    </div>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import OrderMsg from '@/components/order/MfOrderMsg'; // 주문 메세지항목
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
export default {
  name: "MfPopupTelecomInput",
  props: {
    discountInfo: Object,
    lgUsePntInfo: Object,
    ktUsePntInfo: Object,
    reqPntForm: Object,
  },
  data() {
    return {
      selectType: { KT: 'KT 할인', LGU: 'LG U+ 할인' },
      resPntForm: {},
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    isEmpty(x) {
      const temp = StringUtils.isEmpty(x);
      return temp;
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    popupAction() {
      this.$emit('popupEvent');
      this.modalActiveEvent('popupTelecomInput');
    },
    // toastMessage 노출 함수 호출.
    popupToastMessage(strMsg) {
      this.$emit('popupToastMessage', strMsg);
    },
    showLoading(flag) {
      this.$emit('showLoading', flag);
    },
    selectMobileTypeActioin(type) {
      this.$emit('selectMobileType', type);
    },
    // 숫자만 입력 가능
    numberOnly(str, gbn, len, e) {
      const temp = str.replace(/[^0-9]/g, '');
      if (gbn === '2') {
        this.reqPntForm.cardNo2 = temp;
      } else if (gbn === '3') {
        this.reqPntForm.cardNo3 = temp;
      }
      if (str.length === len) {
        this.autoTab(e);
      }
    },
    resetBirthDay() {
      this.reqPntForm.birthDay = "";
      document.getElementById('birth').focus();
    },
    // 자리수체크
    checkNumberLength(str, gbn, len, e) {
      if (str.length > len) {
        const temp = str.substring(0, len);
        if ( gbn === '1') {
          this.reqPntForm.cardNo1 = temp;
        } else if (gbn === '4') {
          this.reqPntForm.cardNo4 = temp;
        } else if (gbn === 'B') {
          this.reqPntForm.birthDay = temp;
        }
      }
      if (str.length === len) {
        if ( gbn != 'B') {
          this.autoTab(e);
        }
      }
    },
    autoTab(e) {
      if (e.keyCode >= 16 && e.keyCode <= 18) return; // Ctrl, shift, alt 제외
      if (e.keyCode >= 37 && e.keyCode <= 40) return; // 방향키 제외
      let id = e.target.id;
      let idx = id.charAt(id.length-1);
      id = id.substring(0, id.length-1);
      idx = parseInt(idx)+1;
      const el = document.querySelector('#'+id+idx);
      if (el) {
        el.focus();
        el.select();
      }
    },
    // 통신카드 할인 보유포인트 조회(KT, LGU+)
    async reqRetrievePnt() {
      const formData = this.reqPntForm;

      if (StringUtils.isEmpty(formData.telcoType)) {
        this.$gsdialog.alert(OrderMsg.editTel);
        return;
      }
      if (StringUtils.isEmpty(formData.gid)) {
        this.$gsdialog.alert(OrderMsg.editGid);
        return;
      }
      if (StringUtils.isEmpty(formData.mid)) {
        this.$gsdialog.alert(OrderMsg.editMid);
        return;
      }
      if (StringUtils.isEmpty(formData.birthDay)) {
        this.popupToastMessage(OrderMsg.editBirth);
        return;
      }
      if (formData.birthDay.length < 8) {
        this.popupToastMessage('생년월일을 모두 입력해주세요.');
        return;
      }
      if (StringUtils.isEmpty(formData.cardNo1) || StringUtils.isEmpty(formData.cardNo2) || StringUtils.isEmpty(formData.cardNo3) || StringUtils.isEmpty(formData.cardNo4)) {
        this.popupToastMessage(OrderMsg.editCardNo);
        return;
      }
      if ((formData.cardNo1.length + formData.cardNo2.length + formData.cardNo3.length + formData.cardNo4.length) < 16) {
        this.popupToastMessage('카드번호를 모두 입력해주세요.');
        return;
      }

      let deviceType = "";
      if (formData.deviceType === "PC") {
        deviceType = "WEB";
      } else {
        deviceType = "MOB";
      }

      let url = "";
      if (formData.telcoType === "KT") {
        url = "/fo/pa/retrieveKtDcPnt" + ((this.reqPntForm.deviceType === "PC") ? "Pc" : "Mob");
      } else {
        url = "/fo/pa/retrieveLguplusDcPnt" + ((this.reqPntForm.deviceType === "PC") ? "Pc" : "Mob");
      }

      this.showLoading(true);
      const data = {
        deviceType: deviceType,
        userId: formData.userId,
        telcoType: formData.telcoType,
        cardNo: formData.cardNo1 + formData.cardNo2 + formData.cardNo3 + formData.cardNo4,
        amt: formData.amt,
        discountAmt: formData.discountAmt,
        payMethod: formData.payMethod,
        goodsName: formData.goodsName,
        taxFreeAmt: this.discountInfo.totTaxfreeAmt,
        taxableAmt: this.discountInfo.totTaxableAmt,
        tax: this.discountInfo.totVatAmt,
        birthDay: formData.birthDay,
      };

      await ApiUtils.post(url, data).then(res => {
        if (res.data === null || res.data.resultCode !== '0000') {
          const strMsg = `입력하신 정보와 일치하는 고객정보를 찾지 못했습니다. 해당 고객센터로 문의해주세요.</br></br>
                          · KT고객센터 : 무선 114(무료), 유선 100(유료)</br>
                          · LG U+ 고객센터 : 무선114(무료), 유선 1544-0010(유료)`;
          this.$gsdialog.alert(strMsg, { html: true });
          return;
        }
        this.resPntForm = res.data;
        // 조회한 포인트에 따라 사용금액 처리
        if (Number(this.reqPntForm.pntUseAmt) > Number(this.reqPntForm.standAmt)) {
          if (Number(this.resPntForm.remainLimit) < Number(this.reqPntForm.pntDcAmt)) {
            this.resPntForm.discountAmt = 0;
            const strMsg = `보유하신 포인트가 부족합니다.</br>
                            - 보유포인트: ${NumberUtils.toComma(this.resPntForm.remainLimit)}점</br>
                            - ${NumberUtils.toComma(this.reqPntForm.pntDcAmt)}원 이상 보유 시 사용가능`;
            this.$gsdialog.alert(strMsg, { html: true });
            return;
          } else if (Number(this.resPntForm.remainLimit) < Number(this.reqPntForm.pntDcAmt)) {
            this.resPntForm.discountAmt = 0;
            this.$gsdialog.alert(OrderMsg.morePoint);
            return;
          } else if (Number(this.discountInfo.curTotAmt) < Number(this.reqPntForm.pntDcAmt)) {
            this.resPntForm.discountAmt = 0;
            this.$gsdialog.alert(OrderMsg.pointPayMore);
            return;
          } else {
            this.resPntForm.discountAmt = this.reqPntForm.pntDcAmt;
          }
        } else {
          this.resPntForm.discountAmt = 0;
          this.$gsdialog.alert(OrderMsg.pntFailStandAmt(this.reqPntForm.standAmt));
        }
        this.resPntForm.telcoType = this.reqPntForm.telcoType;
        this.resPntForm.mid = this.reqPntForm.mid;
        this.resPntForm.gid = this.reqPntForm.gid;
        this.resPntForm.deviceType = this.reqPntForm.deviceType;
        this.resPntForm.birthDay = this.reqPntForm.birthDay;
        this.resPntForm.payMethod = "TELMBRPAY";
        this.resPntForm.promId = this.reqPntForm.promId;
        this.resPntForm.promTypeCd = this.reqPntForm.promTypeCd;
        this.resPntForm.promDtlTypeCd = this.reqPntForm.promDtlTypeCd;
        if (this.reqPntForm.telcoType === 'KT') {
          this.resPntForm.payCompanyCd = '08';
        } else {
          this.resPntForm.payCompanyCd = '07';
        }
        this.$emit('setResPntFormTelcoInfo', this.resPntForm);
        this.$emit('popupEvent');
      });
      this.showLoading(false);
    },
  },
  mounted() {
    this.modalActiveEvent('popupTelecomInput');
  },
};
</script>
