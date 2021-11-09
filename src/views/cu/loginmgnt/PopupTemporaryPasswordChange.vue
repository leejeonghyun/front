<!--
SC-FO-SS-GF-MP-900
-->
<template>
    <!-- : 실사용 소스 -->
   <div id="popupTemporaryPasswordChange" class="wrap-full-popup active" role="dialog" aria-modal="true" :class="[{active : this.modalActive.popupTemporaryPasswordChange}, siteClass]">
    <div class="header-popup">
      <strong>비밀번호 변경 안내</strong>
    </div>
    <div class="full-popup-body scroll-area login">
      <div class="inner-full-popup">
        <div class="wrap-user-form">
          <div class="inner">
            <p class="txt-title">비밀번호를 변경해주세요</p>
            <fieldset class="warp-input-txt">
              <legend>비밀번호 변경 폼</legend>
              <div class="inp-box" id="pwErr">
                <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label for="password" class="hidden">비밀번호를 입력해주세요</label>
                <input
                  type="password"
                  id="password"
                  ref="password"
                  class="inp-txt w100"
                  value
                  v-model="userInfo.webPwd"
                  @keyup="getChkValue($event)"
                  placeholder="비밀번호를 입력해주세요"
                  @change="eachChangeChk()"
                />
                <!-- <button class="btn-reset" @click="getBtnClear('password')" ><span class="hidden">입력 초기화</span></button> -->
                <span class="txt-error">{{ userInfo.passwordMsg }}</span>
                <!-- 미입력시 MSG -->
                <!-- <span class="txt-error">비밀번호를 입력해주세요.</span> 미입력시 MSG -->
                <!-- <span class="txt-error">영문, 숫자 조합 8~16자로 입력해주세요.</span> 입력규칙 오류시 MSG -->
              </div>
              <div class="inp-box" id="pw2Err">
                <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label for="password2" class="hidden">비밀번호를 한번 더 입력해주세요</label>
                <input
                  type="password"
                  id="password2"
                  ref="password2"
                  class="inp-txt w100"
                  value
                  v-model="userInfo.webPwd2"
                  @keyup="getChkValue($event)"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  @change="eachChangeChk()"
                />
                <!-- <button class="btn-reset" @click="getBtnClear('password2')" ><span class="hidden">입력 초기화</span></button> -->
                <span class="txt-error">{{ userInfo.password2Msg }}</span>
                <!-- 미입력시 MSG -->
                <!-- <span class="txt-error">비밀번호를 다시 한번 입력해주세요.</span> 미입력시 MSG -->
                <!-- <span class="txt-error">입력하신 비밀번호와 동일하지 않습니다.</span> 비밀번호와 불일치시 MSG -->
              </div>
            </fieldset>
            <!-- START : 하단 버튼 -->
            <div class="sub-btn-area">
              <!-- 수정 START : 2020.03.02 버튼 순서 변경 -->
              <button type="button" class="btn-bg darkgray btn-md" @click="popupAction">취소</button>
              <button
                type="button"
                class="btn-bg lightgreen btn-md"
                @click="popupChgAction"
                v-bind:disabled="disabledEv.isButtonJoin"
              >비밀번호 변경하기</button>
              <!-- 수정 END : 2020.03.02 버튼 순서 변경 -->
            </div>
            <!-- START : 하단 버튼 -->
          </div>
        </div>
      </div>
    </div>
    <button
      class="btn-layer-close"
      @click="popupAction"
      @keydown.9="tabFocusRemove('popupAction')"
      aria-label="포커스 아웃 시 팝업 닫기"
    >
      <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import CuUtils from '@/common/cu/CuUtils';
export default {
  name: 'PopupPasswordChange',
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '비밀번호 변경 안내 팝업 < 로그인 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '비밀번호 변경',
      },
    ],
  },
  data() {
    return {
      userInfo: {
        webPwd: '',
        webPwd2: '',
        custNo: '',
        webId: '',
        reqGbn: '',
        passwordMsg: '',
        password2Msg: '',
        chkVal1: '',
        chkVal2: '',
        tmpWebId: '',
      },
      disabledEv: {
        isButtonJoin: true,
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  props: {
    userCustNo: {
      type: Object,
    },
  },
  components: {},
  methods: {
    popupAction() {
      // closed
      this.$emit('popupEvent', 'popupTemporaryPasswordChange');
      this.modalActiveEvent('popupTemporaryPasswordChange');
    },
    popupChgAction() {
      const vm = this;
      // chg
      const data = {
        reqGbn: this.userInfo.reqGbn,
        intgrCustNo: '',
        subCoCustNo: this.userInfo.custNo,
        intgrWebPwd: this.userInfo.webPwd,
        certiCd: '',
        userId: this.userInfo.webId,
      };
      ApiUtils.put('/fo/cu/loginmgnt/login-password', data).then(resultPwd => {
       // alert(resultPwd.data.success + "::" + JSON.stringify(resultPwd));
        if (!resultPwd.data.success) {
            if (resultPwd.data.data.resultCode === '50012') {
             // this.$gsdialog.alert('변경하실 비밀번호가 <br/>이전 비밀번호와 동일합니다.', { html: true });
              this.$gsdialog.alert('고객 변경비밀번호가 동일합니다.', { html: true });
            } else {
              this.$gsdialog.alert(resultPwd.data.data.resultMessage, { html: true });
            }
          return;
        } else {
          // 비밀번호 수정
          if (resultPwd.data.data.resultCode === '00000') {
            this.$gsdialog.alert(
              '비밀번호가 변경되었습니다.<br/>새로운 비밀번호로 로그인해주세요.', { html: true }
            ).then(dialog =>{
            this.$router.push('/cu/login');
            });
          } else {
             if (resultPwd.data.data.resultCode === '50012') {
                // this.$gsdialog.alert('변경하실 비밀번호가 <br/>이전 비밀번호와 동일합니다.', { html: true });
                  this.$gsdialog.alert('고객 변경비밀번호가 동일합니다.', { html: true });
             } else {
              this.$gsdialog.alert(resultPwd.data.data.resultMessage, { html: true });
            }
          }
        }
      });
    },
    // ValidationCheck
    getChkValue(e) {
      const vm = this;
      const value = e.target.value;
      const id = e.target.id;
      const pwd = document.getElementById('password').value;
      if (id == 'password') {
        // 비밀번호
        if (StringUtils.isEmpty(value)) {
          document.getElementById('pwErr').className = 'inp-box error';
          vm.userInfo.passwordMsg = '비밀번호를 입력해주세요.';
          return false;
        } else if (value.length < 8) {
          document.getElementById('pwErr').className = 'inp-box error';
          vm.userInfo.passwordMsg =
            '비밀번호는 최소 8자리 이상 입력하여 주십시오.';
          return false;
        } else if (value.length > 16) {
          document.getElementById('pwErr').className = 'inp-box error';
          vm.userInfo.passwordMsg =
            '영문, 숫자, 특수문자 조합으로 8~16자로 입력해주세요.';
          return false;
        }
        // 111,222... 3자리 중복체크
        let isThreeDigitOverlapPw = true;
        let j = 1;
        let be = '';
        let tm = '';
        for (let i = 0; i < value.length; i++) {
          tm = value.substring(i, i + 1);
          if (be == tm) {
            j = j + 1;
          } else {
            j = 1;
          }
          if (j > 2) {
            isThreeDigitOverlapPw = false;
          }
          be = tm;
        }
        if (!isThreeDigitOverlapPw) {
          document.getElementById('pwErr').className = 'inp-box error';
          vm.userInfo.passwordMsg =
            '3자리 이상 동일한 비밀번호는 사용할 수 없습니다.';
          return false;
        }
        // 123,234... 3자리 연속
        let isThreeRangePw = true;
        const geStr =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < geStr.length; i++) {
          if (i + 3 > value.length) {
            break;
          }
          tm = value.substring(i, i + 3);
          if (geStr.indexOf(tm) > 0) {
            isThreeRangePw = false;
          }
        }
        // 알파벳
        let isAlphaPw = false;
        const alphaStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < alphaStr.length; i++) {
          tm = value.substring(i, i + 1);
          if (!StringUtils.isEmpty(tm) && alphaStr.indexOf(tm) >= 0) {
            isAlphaPw = true;
            break;
          }
        }
        let guidePwdText = '';
        let isSpecChar = true;
        // 숫자
        let isNumber = false;
        const numberStr = '0123456789';
        for (let i = 0; i < numberStr.length; i++) {
          for (let j = 0; j < value.length; j++) {
            tm = value.substring(j, j + 1);
            if (!StringUtils.isEmpty(tm) && numberStr.indexOf(tm) >= 0) {
              isNumber = true;
              break;
            }
          }
        }
        if (value.search(/[`~!@@#$%^&*()|\\\'\";:\/?]/gi) == -1) {
          isSpecChar = false;
        }
        if (!isAlphaPw) guidePwdText += ',영문';
        if (!isNumber) guidePwdText += ',숫자';
        if (!isSpecChar) guidePwdText += ',특수문자';
        if (!StringUtils.isEmpty(guidePwdText)) {
          guidePwdText = guidePwdText.substring(1, guidePwdText.length);
        }
        if (!isThreeRangePw) {
          document.getElementById('pwErr').className = 'inp-box error';
          vm.userInfo.passwordMsg =
            '연속된 3자리 이상의 비밀번호는 사용할 수 없습니다.';
          return false;
        } else if (!StringUtils.isEmpty(guidePwdText)) {
          document.getElementById('pwErr').className = 'inp-box error';
          vm.userInfo.passwordMsg =
            '영문, 숫자, 특수문자 조합으로 8~16자로 입력해주세요.';
          return false;
        } else {
          document.getElementById('pwErr').className = 'inp-box';
          vm.userInfo.passwordMsg = '';
        }
      } else if (id == 'password2') {
        if (StringUtils.isEmpty(value)) {
          document.getElementById('pw2Err').className = 'inp-box error';
          vm.userInfo.password2Msg = '비밀번호를 다시 한번 입력해주세요.';
          return false;
        } else if (pwd != value) {
          document.getElementById('pw2Err').className = 'inp-box error';
          vm.userInfo.password2Msg = '입력하신 비밀번호와 동일하지 않습니다.';
          return false;
        } else {
          document.getElementById('pw2Err').className = 'inp-box';
          vm.userInfo.password2Msg = '';
        }
      }
      this.eachChangeChk();
      return true;
    },
    eachChangeChk() {
      // 항목 입력 확인 이벤트
      if (
        !StringUtils.isEmpty(this.userInfo.webPwd) &&
        !StringUtils.isEmpty(this.userInfo.webPwd2) &&
        (this.userInfo.webPwd == this.userInfo.webPwd2)
      ) {
        this.disabledEv.isButtonJoin = false;
      } else {
        this.disabledEv.isButtonJoin = true;
      }
    },
  },
  mounted() {
    const vm = this;
    const custNo = vm.$store.state.cu.custNo;
    const webId = vm.$store.state.cu.webId;
    const tmpWebId = sessionStorage.getItem('tmpWebId');
    if (StringUtils.isEmpty(sessionStorage.getItem('reqGbn'))) {
      this.userInfo.reqGbn = '1';
    } else {
      this.userInfo.reqGbn = sessionStorage.getItem('reqGbn');
    }
    this.userInfo.custNo = custNo;
    this.userInfo.webId = webId;
    this.userInfo.tmpWebId = tmpWebId;
    sessionStorage.removeItem('reqGbn');
    sessionStorage.removeItem('tmpWebId');
    this.modalActiveEvent('popupTemporaryPasswordChange');
  },
};
</script>
<style lang="scss">
</style>
