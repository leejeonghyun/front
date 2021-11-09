<!--
SC-FO-CU-GF-MP-022
-->
<template>
  <div id="popupPasswordChange" class="wrap-full-popup active" v-bind:class="[siteClass]" role="dialog" aria-modal="true">
  <!-- : 실사용 소스 -->
  <!-- <div id="popupPasswordChange" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupPasswordChange}"> -->
    <div class="header-popup">
      <strong>비밀번호 변경 안내</strong>
    </div>
    <div class="full-popup-body scroll-area login">
      <div class="inner-full-popup">
        <div class="wrap-user-form">
          <div class="inner">
            <p class="txt-title">
              <span class="txt-name">{{userInfo.custNm}}</span>님 비밀번호를 변경해주세요
            </p>
            <p class="txt-desc">
              회원님의 개인정보보호를 위해 주기적으로<br/>
              비밀번호를 변경하는 것이 안전합니다
            </p>
            <fieldset class="warp-input-txt">
              <legend>비밀번호 변경 폼</legend>
              <div class="inp-box" id="ORG"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label for="" class="hidden">현재 비밀번호 입력</label>
                <input type="password" id="passwordOrg" class="inp-txt w100" value="" placeholder="현재 비밀번호 입력">
                <span class="txt-error">{{errMsg}}</span> <!-- 미입력시 MSG -->
              <!--   <span class="txt-error">현재 비밀번호가 맞지 않습니다. 다시 입력해주세요.</span> 불일치시 MSG -->
              </div>
              <div class="inp-box" id="ONE"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label for="" class="hidden">새 비밀번호입력 (8~16자리 영문/숫자/특수문자 조합)</label>
                <input type="password" id="passwordOne" class="inp-txt w100" value="" placeholder="새 비밀번호입력 (8~16자리 영문/숫자 조합)">
                <span class="txt-error">{{errMsg}}</span> <!-- 미입력시 MSG -->
                <!--<span class="txt-error">영문, 숫자, 특수문자 조합 8~16자로 입력해주세요.</span>  비밀번호 규칙 오류시 MSG -->
              </div>
              <div class="inp-box" id="TWO"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label for="" class="hidden">비밀번호를 한번 더 입력해주세요</label>
                <input type="password" id="passwordTwo" class="inp-txt w100" value="" placeholder="비밀번호를 한번 더 입력해주세요">
                <span class="txt-error">{{errMsg}}</span> <!-- 미입력시 MSG -->
               <!--  <span class="txt-error">비밀번호가 다릅니다. 다시 입력해주세요.</span> 새 비밀번호와 불일치시MSG -->
              </div>
            </fieldset>
            <!-- START : 하단 버튼 -->
            <div class="sub-btn-area">
              <!-- 수정 START : 2020.03.02 버튼 순서 변경 -->
              <button type="button" class="btn-bg darkgray btn-md" @click="popupCloseAction">다음에 변경하기</button>
              <button type="button" class="btn-bg lightgreen btn-md" @click="popupChgAction">비밀번호 변경하기</button>
              <!-- 수정 END : 2020.03.02 버튼 순서 변경 -->
            </div>
            <!-- START : 하단 버튼 -->
          </div>
        </div>
      </div>
    </div>
    <button class="btn-layer-close" @click="popupCloseAction" @keydown.9="tabFocusRemove('popupCloseAction')" aria-label="포커스 아웃 시 팝업 닫기"> <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>

<script>

import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PopupPasswordChange",
  mixins: [LayerPopupMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '비밀번호 변경 안내 팝업 < 로그인 < %s'
  },
  data() {
    return {
      userInfo: {},
      errMsg: '',
      siteClass: '',
      webId: '',
    };
  },
  components: {
  },
  methods: {
    popupCloseAction() {// closed
      this.$emit('popupEvent', 'popupPasswordChange');
     // this.modalActiveEvent('popupPasswordChange');
    },
    popupChgAction: async function() {// chg
      if (this.isValidation()) {
      const MbrInfoInqInputDto = {certType: "C"};
      const result= await ApiUtils.get('/fo/cu/mbrmgnt/member-information', MbrInfoInqInputDto); // 회원정보가져오기
      this.webId = result.data.data.webId;
      // const PswChkInputDto = {
      //     psw: document.getElementById("passwordOrg").value,
      //     webId: this.userInfo.webId, // CookieUtils.getCookie("WEB_ID")
      //   };
      // const res= await ApiUtils.post('/fo/cu/loginmgnt/password-check', PswChkInputDto); // 회원정보가져오기
      //   if (!res.data.success) {
      //       document.getElementById('ORG').className = 'inp-box error';
      //       document.getElementById('ONE').className = 'inp-box';
      //       document.getElementById('TWO').className = 'inp-box';
      //       this.errMsg = "비밀번호가 일치하지 않습니다. 다시 입력해주세요";

      //       document.getElementById("passwordOrg").value = "";
      //       console.error(this.errMsg);
      //       // this.$gsdialog.alert(mssg);
      //       this.$gsdialog.alert(this.errMsg, { html: true });
      //       return;
      //   } else {
          const pawd = document.getElementById("passwordTwo").value;
          const WebIdPswModInputDto = {
            pwd: document.getElementById("passwordOrg").value,
            pwd2: encodeURI(pawd), // pwd: encodeURI(document.getElementById("passwordTwo").value),
            webId: this.webId
            };
          console.log(JSON.stringify(WebIdPswModInputDto));
          const resultPwd= await ApiUtils.put('/fo/cu/loginmgnt/web-id-password', WebIdPswModInputDto); // 비밀번호 수정
           if (resultPwd.data.data.resultCode == "00000") {
            this.$gsdialog.alert('비밀번호가 변경되었습니다.', { html: true });
            this.popupCloseAction();
          } else {
            this.$gsdialog.alert(resultPwd.data.statusMessage, { html: true });
          }
         }
      // }
    },
    isValidation() { // chg
      // let success = true;
      const passwordOrg = document.getElementById("passwordOrg").value;
      const passwordOne = document.getElementById("passwordOne").value;
      const passwordTwo = document.getElementById("passwordTwo").value;
      if (StringUtils.isEmpty(passwordOrg)) {
        document.getElementById('ORG').className = 'inp-box error';
        document.getElementById('ONE').className = 'inp-box';
        document.getElementById('TWO').className = 'inp-box';
        this.errMsg = '현재 비밀번호를 입력해주세요.';
        // alert('현재 비밀번호를 입력해주세요.');
        return false;
      } else if (StringUtils.isEmpty(passwordOne)) {
        document.getElementById('ONE').className = 'inp-box error';
        document.getElementById('ORG').className = 'inp-box';
        document.getElementById('TWO').className = 'inp-box';
        this.errMsg = '새 비밀번호를 입력해주세요.';
        // alert('새 비밀번호를 입력해주세요.');
        return false;
      } else if (StringUtils.isEmpty(passwordTwo)) {
        document.getElementById('TWO').className = 'inp-box error';
        document.getElementById('ONE').className = 'inp-box';
        document.getElementById('ORG').className = 'inp-box';
        this.errMsg = '새 비밀번호 확인을 입력해주세요.';
        // alert('새 비밀번호 확인을 입력해주세요.');
        return false;
      }
     // const regExpPw = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,12}$/; // /^[A-Za-z0-9]{6,12}$/;
      const regExpPw = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[`~!@#$%^&*()|\\\'\";:\/?])[a-zA-Z0-9`~!@#$%^&*()|\\\'\";:\/?]{8,16}$/;
      if (!regExpPw.test(passwordOne)) {
        document.getElementById('ONE').className = 'inp-box error';
        document.getElementById('ORG').className = 'inp-box';
        document.getElementById('TWO').className = 'inp-box';
        this.errMsg = "영문, 숫자, 특수문자 조합 8~16자로 입력해주세요.";
         document.getElementById("passwordOne").focus();
        return false;
      }
       if (passwordOne != passwordTwo) {
          document.getElementById('ONE').className = 'inp-box';
          document.getElementById('ORG').className = 'inp-box';
          document.getElementById('TWO').className = 'inp-box';
          this.$gsdialog.alert("비밀번호가 다릅니다. 다시 입력해주세요.");
          document.getElementById("passwordOne").value = "";
          document.getElementById("passwordTwo").value = "";
          return false;
       }
         // start
        // 111,222... 3자리 중복체크
        let isThreeDigitOverlapPw = true;
        let j = 1;
        let be = '';
        let tm = '';
        for (let i = 0; i < passwordOne.length; i++) {
          tm = passwordOne.substring(i, i + 1);
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
          // alert('3자리 이상 동일한 비밀번호는 사용할 수 없습니다.');
        document.getElementById('ONE').className = 'inp-box error';
        document.getElementById('ORG').className = 'inp-box';
        document.getElementById('TWO').className = 'inp-box';
        this.errMsg = "3자리 이상 동일한 비밀번호는 사용할 수 없습니다.";
         document.getElementById("passwordOne").focus();
          return false;
        }
        // 123,234... 3자리 연속
        let isThreeRangePw = true;
        const geStr =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < geStr.length; i++) {
          if (i + 3 > passwordOne.length) {
            break;
          }
          tm = passwordOne.substring(i, i + 3);
          if (geStr.indexOf(tm) > 0) {
            isThreeRangePw = false;
          }
        }
        if (!isThreeRangePw) {
         // document.getElementById('pwErr').className = 'inp-box error';
        //  alert('연속된 3자리 이상의 비밀번호는 사용할 수 없습니다.');
        document.getElementById('ONE').className = 'inp-box error';
        document.getElementById('ORG').className = 'inp-box';
        document.getElementById('TWO').className = 'inp-box';
        this.errMsg = "연속된 3자리 이상의 비밀번호는 사용할 수 없습니다.";
        document.getElementById("passwordOne").focus();
          return false;
        }
       // end
       if (passwordOrg == passwordOne) {
         this.$gsdialog.alert("사용할 수 없는 비밀번호입니다.\n새로운 비밀번호로 설정해주세요.");
          return false;
       }
      return true;
    },
    getMbrInfo: async function() {
     // const MbrInfoInqInputDto = {certType: "C"};
      const result= await ApiUtils.get('/fo/cu/mbrmgnt/member-information', null); // 회원정보가져오기
      this.userInfo = result.data.data;
      this.webId = this.userInfo.webId;
      console.log(JSON.stringify(result.data.data));
    },
  },
  mounted() {
    this.siteClass = CookieUtils.getSiteClass();
    // modalActiveEvent('popupPasswordChange');
    this.getMbrInfo();
  }
};
</script>
