<!--
Design: views/cu/SC-FO-CU-GF-MP-024
Pg id:
Uri: /cu/pop_offline_member
-->
<template>
  <!-- 새벽배송 : 20.04.10 몰 컬러 구분이 필요한 경우, 팝업을 호출하는 페이지 안 최상위 요소에 클래스 추가 (GSfresh - gsfresh, 달리살다 - dalisalda, 새벽배송 - daybreak) -->
  <!-- <div id="popupOfflineMember" class="wrap-full-popup active" role="dialog" aria-modal="true"> -->
  <!-- : 실사용 소스 -->
  <div
    id="popupOfflineMember"
    class="wrap-full-popup"
    role="dialog"
    aria-modal="true"
    :class="[{active : this.modalActive.popupOfflineMember}, siteClass]"
  >
    <div class="header-popup">
      <strong>아이디 생성</strong>
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="wrap-user-form offline">
          <div class="inner">
            <p class="txt-title">
              서비스 이용을 위해
              <br />
              <span class="txt-point">아이디</span>를
              <span class="txt-point">생성</span>해주세요
            </p>
            <fieldset class="warp-input-txt">
              <legend>아이디생성 정보 입력</legend>
              <div class="inp-box" id="idErr">
                <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label for="id" class="hidden">아이디를 입력해주세요</label>
                <input
                  type="text"
                  id="id"
                  class="inp-txt w100"
                  ref="id"
                  v-model="form.webId"
                  placeholder="아이디를 입력해주세요"
                  @blur="getChkValue($event)"
                  @keyup="getPressId($event)"
                  @change="eachChangeChk()"
                />
                <span class="txt-error">{{form.idMsg}}</span>
              </div>
              <div class="inp-box" id="pwErr">
                <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label for="password" class="hidden">비밀번호를 입력해주세요</label>
                <input
                  type="password"
                  id="password"
                  class="inp-txt w100"
                  ref="password"
                  v-model="form.webPwd"
                  @blur="getChkValue($event)"
                  placeholder="비밀번호를 입력해주세요"
                  @change="eachChangeChk()"
                />
                <span class="txt-error">{{form.passwordMsg}}</span>
              </div>
              <div class="inp-box" id="pw2Err">
                <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label for="password2" class="hidden">비밀번호를 한번 더 입력해주세요</label>
                <input
                  type="password"
                  id="password2"
                  class="inp-txt w100"
                  ref="password2"
                  v-model="form.webPwd2"
                  @blur="getChkValue($event)"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  @change="eachChangeChk()"
                />
                <span class="txt-error">{{form.password2Msg}}</span>
              </div>
            </fieldset>
            <!-- START : 약관동의 -->
            <!-- 5월수정 START : 약관 내용 변경 -->
            <div class="wrap-agreement"  v-show="form.gsAgree !='Y'">
              <div class="wrap-inp-chk area-top">
                <p class="inp-chk all">
                  <input
                    type="checkbox"
                    name="chkList"
                    id="chkList011"
                    v-model="form.allChk"
                    value
                    @change="allCheckedBox(this)"
                  />
                  <label for="chkList011">약관 전체동의</label>
                </p>
                <button
                  id="agreement"
                  class="btn-accordion"
                  aria-controls="agreementContents"
                  aria-expanded="false"
                  @click="accordionEvent"
                >
                  <span class="hidden">아코디언 버튼</span>
                </button>
              </div>
              <div
                id="agreementContents"
                class="wrap-input-chk cont-accordion"
                aria-labelledby="agreement"
                hidden="hidden"
              >
                <div class="wrap-inp-chk" id="agree1Err">
                  <!-- 미동의일 경우 error 클래스 추가 -->
                  <div class="inp-chk type02 small">
                    <input
                      type="checkbox"
                      name="chkList"
                      id="chkList022"
                      ref="agree1"
                      v-model="form.agree1"
                      value
                      @change="eachChangeChk()"
                    />
                    <label for="chkList022">GS리테일 회원약관 동의 (필수)</label>
                  </div>
                  <span class="txt-error">{{form.agree1Msg}}</span>
                  <ul class="wrap-list-agree">
                    <li>
                      <button
                        type="button"
                        class="btn-arrow gray right"
                        @click="popupAction('popupGSfreshMemberTerms', 'GS리테일 멤버십(THE POP) 회원약관', 'R011')"
                      >GS리테일 멤버십(THE POP) 회원약관</button>
                    </li>
                    <li>
                      <button
                        type="button"
                        class="btn-arrow gray right"
                        @click="popupAction('popupGSfreshMemberTerms', 'GS리테일 쇼핑몰 이용약관', 'R012')"
                      >GS리테일 쇼핑몰 이용약관</button>
                    </li>
                  </ul>
                </div>
                <div class="wrap-inp-chk" id="agree2Err">
                  <!-- 미동의일 경우 error 클래스 추가 -->
                  <div class="inp-chk type02 small">
                    <input
                      type="checkbox"
                      name="chkList"
                      id="chkList033"
                      ref="agree2"
                      v-model="form.agree2"
                      value
                      @change="eachChangeChk()"
                    />
                    <label for="chkList033">개인정보 수집, 이용동의 (필수)</label>
                  </div>
                  <span class="txt-error">{{form.agree2Msg}}</span>
                  <ul class="wrap-list-agree">
                    <li>
                      <button
                        type="button"
                        class="btn-arrow gray right"
                        @click="popupAction('popupGSfreshMemberTerms', '수집하는 개인정보 항목 및 이용목적', 'R021')"
                      >수집하는 개인정보 항목 및 이용목적</button>
                    </li>
                    <li>
                      <button
                        type="button"
                        class="btn-arrow gray right"
                        @click="popupAction('popupGSfreshMemberTerms', '보유기간 및 파기', 'R022')"
                      >보유기간 및 파기</button>
                    </li>
                    <li>
                      <button
                        type="button"
                        class="btn-arrow gray right"
                        @click="popupAction('popupGSfreshMemberTerms', '개인정보 처리위탁 동의', 'R031')"
                      >개인정보 처리위탁 동의</button>
                    </li>
                  </ul>
                </div>
                <div class="wrap-inp-chk" id="agree3Err">
                  <!-- 미동의일 경우 error 클래스 추가 -->
                  <div class="inp-chk type02 small">
                    <input
                      type="checkbox"
                      name="chkList"
                      id="chkList044"
                      ref="agree3"
                      v-model="form.agree3"
                      value
                      @change="eachChangeChk()"
                    />
                    <label for="chkList044">개인정보 제3자 제공동의 (선택)</label>
                    <button
                      type="button"
                      class="btn-arrow right gray"
                      @click="popupAction('popupGSfreshMemberTerms', '개인정보 제3자 제공동의', 'R041')"
                    >
                      <span class="hidden">약관자세히보기</span>
                    </button>
                  </div>
                </div>
                <div class="wrap-inp-chk" id="agree4Err">
                  <!-- 미동의일 경우 error 클래스 추가 -->
                  <div class="inp-chk type02 small">
                    <input
                      type="checkbox"
                      name="chkList"
                      id="chkList055"
                      ref="agree4"
                      v-model="form.agree4"
                      value
                      @change="allEvChkBox()"
                    />
                    <label for="chkList055">할인쿠폰, 이벤트 등 혜택 광고 정보수신 (선택)</label>
                  </div>
                </div>
                <div class="wrap-inp-chk">
                  <div class="wrap-inp-chk-type02">
                    <div class="inp-chk small">
                      <input
                        type="checkbox"
                        name="chkList"
                        id="chkList099"
                        v-model="form.smsYn"
                        value
                        @change="eachChangeChk()"
                      />
                      <label for="chkList099">SMS</label>
                    </div>
                    <div class="inp-chk small">
                      <input
                        type="checkbox"
                        name="chkList"
                        id="chkList100"
                        v-model="form.emailYn"
                        value
                        @change="eachChangeChk()"
                      />
                      <label for="chkList100">이메일</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 5월수정 END : 약관 내용 변경 -->
            <!-- END : 약관동의 -->
          </div>
          <PopupGSfreshMemberTerms
            @popupEvent="popupAction"
            v-if="this.popup.popupGSfreshMemberTerms"
            :title="popup.title"
            :code="popup.code"
          />
          <!-- 팝업 GS fresh 회원약관 -->
          <!-- START : 하단 버튼 -->
          <div class="btn-area">
            <button
              type="button"
              class="btn-lg btn-bg lightgreen"
              @click="getJoinMember"
              v-bind:disabled="disabledEv.isButtonJoin"
            >확인</button>
          </div>
          <!-- START : 하단 버튼 -->
        </div>
      </div>
    </div>
    <button
      class="btn-layer-close"
      @click="popupCloseAction"
      @keydown.9="tabFocusRemove('popupCloseAction')"
      aria-label="포커스 아웃 시 팝업 닫기"
    >
      <span class="hidden">닫기</span>
    </button>
  </div>
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import PopupGSfreshMemberTerms from '@/views/cu/mbrmgnt/PopupGSfreshMemberTerms'; // GS fresh 회원약관
import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import JwtUtils from '@/common/JwtUtils';
import Tracker from '@/common/Tracker';
import CuUtils from '@/common/cu/CuUtils';
export default {
  name: 'PopupOfflineMember',
  mixins: [LayerPopupMixin, AccordionMixin],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '오프라인 회원 아이디 생성 팝업 < 회원가입 < %s',
  },
  data() {
    return {
      form: {
        webId: '',
        webPwd: '',
        webPwd2: '',
        allChk: false,
        agree1: false,
        agree2: false,
        agree3: false,
        agree4: false,
        smsYn: false,
        emailYn: false,
        idMsg: '',
        passwordMsg: '',
        password2Msg: '',
        agree1Msg: '',
        agree2Msg: '',
        custNo: '',
        gsAgree: '',
      },
      tmpForm: {},
      chkList: {
        isCheckAll: false,
      },
      popup: {
        // 팝업
        title: '',
        code: '',
        open: false,
        popupGSfreshMemberTerms: false,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      disabledEv: {
        isButtonJoin: true,
        isButtonAuthChk: true,
        isButtonAuth: false,
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    PopupGSfreshMemberTerms,
  },
  methods: {
    popupAction(type, title, code) {
      // 팝업 활성/비활성
      this.popup.title = title;
      this.popup.code = code;
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    popupCloseAction() {
      // closed
      this.$emit('popupEvent', 'popupOfflineMember');
      this.modalActiveEvent('popupOfflineMember');
    },
    // 수정 END : 2020.02.21 추가
    // 회원정보 수정
    async getJoinMember() {
      const vm = this;
      if (!this.getValidationCheck()) {
        return;
      }
      if (StringUtils.isEmpty(this.form.gsAgree)) {
        if (!this.getValidationAgreeCheck()) {
          return;
        }
      }
      const member = {
        custNo: this.form.custNo,
        intgrWebId: this.form.webId,
        intgrWebPwd: encodeURI(this.form.webPwd),
        gsrContract1: this.form.agree1,
        gsrContract4: this.form.agree3,
        smsRcvYn: this.form.smsYn,
        emailRcvYn: this.form.emailYn,
        gsAgree: this.form.gsAgree,
        chanlId: CookieUtils.getChanlId(),
        mdaType: CookieUtils.getMdaType(),
        mallId: CookieUtils.getMallId(),
        cmmSteId: CookieUtils.getCmmSteId(),
      };
      const res = await ApiUtils.post(
        '/fo/cu/mbrmgnt/member-information-encryption-key',
        member,
        this.headers
      );

      if (res.data === null) {
        this.$gsdialog.alert('아이디 생성 중 오류가 발생하였습니다.', { html: true });
        return;
      } else {
        if (res.data.success === true) {
          /*
          * 00000   정상
          * 50002   의 값이 유효하지 않습니다.( 필수 파라메터 체크)
          * 60003   이미 사용중인 아이디 입니다.
          * R7999   시스템오류가 발생하였습니다.
          * R7007   입력하신 정보와 일치하는 회원이 있습니다. (CI 중복 회원 존재)
          * 90002   그룹 서비스 호출시 에러가 발생하였습니다.
          */
          if (res.data.data.resultCode === '00000') {
            this.$gsdialog.alert("아이디가 생성되었습니다.\n다시 로그인해주세요.", { html: true }).then(dialog => {
              const returnUrl = vm.$route.query.returnUrl;
              if (!StringUtils.isEmpty(returnUrl)) {
                location.href = returnUrl;
              } else {
                vm.$router.push('/cu/login');
              }
            });
          } else if (res.data.data.resultCode === '60003' || res.data.data.resultCode === '50002') {
            this.$gsdialog.alert(res.data.data.resultMessage, { html: true });
          } else if (res.data.data.resultCode === 'R7007') {
            this.$gsdialog.alert(res.data.data.resultMessage, { html: true });
            vm.$router.push('/cu/login');
          } else {
            this.$gsdialog.alert('오류가 발생하였습니다. 고객센터로 문의하시기 바랍니다.', { html: true });
          }
        } else {
          this.$gsdialog.alert(res.data.data.resultMessage, { html: true }); // 아이디 생성 중 오류가 발생하였습니다.
        }
      }
    },
    allCheckedBox() {
      if (this.form.allChk == true) {
        this.form.agree1 = true;
        this.form.agree2 = true;
        this.form.agree3 = true;
        this.form.agree4 = true;
        this.form.smsYn = true;
        this.form.emailYn = true;
        document.getElementById('agreement').click();
      } else if (this.form.allChk == false) {
        this.form.agree1 = false;
        this.form.agree2 = false;
        this.form.agree3 = false;
        this.form.agree4 = false;
        this.form.smsYn = false;
        this.form.emailYn = false;
        document.getElementById('agreement').click();
      }
      this.eachChangeChk();
    },
    allEvChkBox() {
      if (this.form.agree4 == true) {
        this.form.smsYn = true;
        this.form.emailYn = true;
      } else if (this.form.agree4 == false) {
        this.form.smsYn = false;
        this.form.emailYn = false;
      }
      this.eachChangeChk();
    },
    eachChangeChk() {
      // 항목 입력 확인 이벤트
      if (this.form.gsAgree === 'Y') {
        if (
          !StringUtils.isEmpty(this.form.webId) &&
          !StringUtils.isEmpty(this.form.webPwd) &&
          !StringUtils.isEmpty(this.form.webPwd2) &&
          StringUtils.isEmpty(this.form.idMsg) &&
          StringUtils.isEmpty(this.form.passwordMsg) &&
          StringUtils.isEmpty(this.form.password2Msg) &&
          StringUtils.isEmpty(this.form.agree1Msg) &&
          StringUtils.isEmpty(this.form.agree2Msg) &&
          (this.form.webPwd == this.form.webPwd2)
        ) {
          this.disabledEv.isButtonJoin = false;
        } else {
          this.disabledEv.isButtonJoin = true;
        }
      } else {
        if (
          !StringUtils.isEmpty(this.form.webId) &&
          !StringUtils.isEmpty(this.form.webPwd) &&
          !StringUtils.isEmpty(this.form.webPwd2) &&
          StringUtils.isEmpty(this.form.idMsg) &&
          StringUtils.isEmpty(this.form.passwordMsg) &&
          StringUtils.isEmpty(this.form.password2Msg) &&
          StringUtils.isEmpty(this.form.agree1Msg) &&
          StringUtils.isEmpty(this.form.agree2Msg) &&
          (this.form.webPwd == this.form.webPwd2) &&
          this.form.agree1 &&
          this.form.agree2
        ) {
          this.disabledEv.isButtonJoin = false;
        } else {
          this.disabledEv.isButtonJoin = true;
        }
        // 약관 전체동의 체크 변경 2
        if (!this.form.smsYn || !this.form.emailYn) {
          this.form.agree4 = false;
        }
        if (this.form.smsYn && this.form.emailYn) {
          this.form.agree4 = true;
        }
        // 약관 전체동의 체크 변경 3
        if (
          !this.form.agree1 ||
          !this.form.agree2 ||
          !this.form.agree3 ||
          !this.form.agree4 ||
          !this.form.smsYn ||
          !this.form.emailYn
        ) {
          this.form.allChk = false;
        }
        if (
          this.form.agree1 &&
          this.form.agree2 &&
          this.form.agree3 &&
          this.form.agree4 &&
          this.form.smsYn &&
          this.form.emailYn
        ) {
          this.form.allChk = true;
        }
      }
    },
    getChkValue(e) {
      const vm = this;
      const value = e.target.value;
      const id = e.target.id;
      const tmpId = document.getElementById('id').value;
      const pwd = document.getElementById('password').value;
      const tmpPwd2 = document.getElementById('password2').value;
      if (id == 'id') {
        // 아이디
        if (StringUtils.isEmpty(value)) {
          document.getElementById('idErr').className = 'inp-box error';
          vm.form.idMsg = '아이디를 입력해주세요.';
          vm.$refs.id.focus();
          return false;
        } else {
           const ConfirmUniWebIdDupInputDto = {
              webId: value,
            };
            ApiUtils.get('/fo/cu/loginmgnt/united-web-id-duplicate-check', ConfirmUniWebIdDupInputDto).then(res => {
              if (res.data.data.resultCode == "00000") {
                vm.form.idMsg = ''; // '사용가능한 아이디입니다.';
                document.getElementById('idErr').className = 'inp-box';
              } else {
                document.getElementById('idErr').className = 'inp-box error';
                vm.form.idMsg = res.data.data.resultMessage;// "이미 사용중인 아이디입니다. 다시 확인해주세요.";
                vm.$refs.id.focus();
                vm.disabledEv.isButtonJoin = true;
                return false;
              }
            });
        }
      } else if (id == 'password') {
        // 비밀번호
        if (StringUtils.isEmpty(value)) {
          document.getElementById('pwErr').className = 'inp-box error';
          vm.form.passwordMsg = '비밀번호를 입력해주세요.';
          return false;
        } else if (value.length < 8) {
          document.getElementById('pwErr').className = 'inp-box error';
          vm.form.passwordMsg = '비밀번호는 최소 8자리 이상 입력하여 주십시오.';
          return false;
        } else if (value.length > 16) {
          document.getElementById('pwErr').className = 'inp-box error';
          vm.form.passwordMsg =
            '영문, 숫자, 특수문자 조합으로 8~16자로 입력해주세요.';
          return false;
        } else if (value === tmpId) {
          document.getElementById('pwErr').className = 'inp-box error';
          vm.form.passwordMsg =
            '아이디와 동일한 비밀번호는 사용할 수 없습니다.';
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
          vm.form.passwordMsg =
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
          vm.form.passwordMsg =
            '연속된 3자리 이상의 비밀번호는 사용할 수 없습니다.';
          return false;
        } else if (!StringUtils.isEmpty(guidePwdText)) {
          document.getElementById('pwErr').className = 'inp-box error';
          vm.form.passwordMsg =
            '영문, 숫자, 특수문자 조합으로 8~16자로 입력해주세요.';
          return false;
        } else {
          vm.form.passwordMsg = '';
          document.getElementById('pwErr').className = 'inp-box';
        }
      } else if (id == 'password2') {
        if (StringUtils.isEmpty(value)) {
          document.getElementById('pw2Err').className = 'inp-box error';
          vm.form.password2Msg = '비밀번호를 다시 한번 입력해주세요.';
          return false;
        } else if (pwd != value) {
          document.getElementById('pw2Err').className = 'inp-box error';
          vm.form.password2Msg = '입력하신 비밀번호와 동일하지 않습니다.';
          return false;
        } else {
          vm.form.password2Msg = '';
          document.getElementById('pw2Err').className = 'inp-box';
        }
      }
      this.eachChangeChk();
    },
    getValidationAgreeCheck() {
      const vm = this;
      const agree1 = vm.form.agree1;
      const agree2 = vm.form.agree2;
      // 약관 동의
      if (!agree1) {
        document.getElementById('agree1Err').className = 'wrap-inp-chk error';
        vm.form.agree1Msg = 'GS리테일 회원약관에 동의해주세요.';
        return false;
      } else {
        document.getElementById('agree1Err').className = 'wrap-inp-chk';
        vm.form.agree1Msg = '';
      }
      if (!agree2) {
        document.getElementById('agree2Err').className = 'wrap-inp-chk error';
        vm.form.agree2Msg = '개인정보 수집, 이용동의에 동의해주세요.';
        return false;
      } else {
        document.getElementById('agree2Err').className = 'wrap-inp-chk';
        vm.form.agree2Msg = '';
      }
      return true;
    },
    // 가입 유효성검사
    getValidationCheck() {
      const vm = this;
      const webId = vm.form.webId;
      const pwd = vm.form.webPwd;
      const pwd2 = vm.form.webPwd2;
      // 이름
      if (StringUtils.isEmpty(StringUtils.trim(webId))) {
        document.getElementById('idErr').className = 'inp-box error';
        vm.form.idMsg = '아이디를 입력해주세요.';
        return false;
      } else {
          const ConfirmUniWebIdDupInputDto = {
            webId: webId,
          };
          ApiUtils.get('/fo/cu/loginmgnt/united-web-id-duplicate-check', ConfirmUniWebIdDupInputDto).then(res => {
            if (res.data.data.resultCode == "00000") {
              document.getElementById('idErr').className = 'inp-box';
              vm.form.idMsg = ''; // '사용가능한 아이디입니다.';
              return true;
            } else {
              document.getElementById('idErr').className = 'inp-box error';
              vm.form.idMsg = res.data.data.resultMessage;// "이미 사용중인 아이디입니다. 다시 확인해주세요.";
              vm.$refs.id.focus();
              return false;
            }
         });
      }
      // 비밀번호
      if (StringUtils.isEmpty(StringUtils.trim(pwd))) {
        document.getElementById('pwErr').className = 'inp-box error';
        vm.form.passwordMsg = '비밀번호를 입력해주세요.';
        return false;
      } else if (pwd.length < 8) {
        document.getElementById('pwErr').className = 'inp-box error';
        vm.form.passwordMsg = '비밀번호는 최소 8자리 이상 입력하여 주십시오.';
        return false;
      } else if (pwd.length > 16) {
        document.getElementById('pwErr').className = 'inp-box error';
        vm.form.passwordMsg =
          '영문, 숫자, 특수문자 조합으로 8~16자로 입력해주세요.';
        return false;
      } else if (pwd === webId) {
        document.getElementById('pwErr').className = 'inp-box error';
        vm.form.passwordMsg = '아이디와 동일한 비밀번호는 사용할 수 없습니다.';
        return false;
      } else {
        document.getElementById('pwErr').className = 'inp-box';
        vm.form.passwordMsg = '';
      }
      if (StringUtils.isEmpty(StringUtils.trim(pwd2))) {
        document.getElementById('pw2Err').className = 'inp-box error';
        vm.form.password2Msg = '비밀번호를 다시 한번 입력해주세요.';
        return false;
      } else if (pwd != pwd2) {
        document.getElementById('pw2Err').className = 'inp-box error';
        vm.form.password2Msg = '입력하신 비밀번호와 동일하지 않습니다.';
        return false;
      } else {
        document.getElementById('pw2Err').className = 'inp-box';
        vm.form.password2Msg = '';
      }
      // 111,222... 3자리 중복체크
      const isThreeDigitOverlapPw = true;
      let j = 1;
      let be = '';
      let tm = '';
      for (let i = 0; i < pwd.length; i++) {
        tm = pwd.substring(i, i + 1);
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
        vm.form.msg = '3자리 이상 동일한 비밀번호는 사용할 수 없습니다.';
        return false;
      }
      // 123,234... 3자리 연속
      let isThreeRangePw = true;
      const geStr =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < geStr.length; i++) {
        if (i + 3 > pwd.length) {
          break;
        }
        tm = pwd.substring(i, i + 3);
        if (geStr.indexOf(tm) > 0) {
          isThreeRangePw = false;
        }
      }
      // 알파벳
      let isAlphaPw = false;
      const alphaStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      for (let i = 0; i < alphaStr.length; i++) {
        tm = pwd.substring(i, i + 1);
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
        for (let j = 0; j < pwd.length; j++) {
          tm = pwd.substring(j, j + 1);
          if (!StringUtils.isEmpty(tm) && numberStr.indexOf(tm) >= 0) {
            isNumber = true;
            break;
          }
        }
      }
      if (pwd.search(/[`~!@@#$%^&*()|\\\'\";:\/?]/gi) == -1) {
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
        vm.form.passwordMsg =
          '연속된 3자리 이상의 비밀번호는 사용할 수 없습니다.';
        return false;
      } else if (!StringUtils.isEmpty(guidePwdText)) {
        document.getElementById('pwErr').className = 'inp-box error';
        vm.form.passwordMsg =
          '영문, 숫자, 특수문자 조합으로 8~16자로 입력해주세요.';
        return false;
      }
      return true;
    },
    getPressId(e) {
      this.disabledEv.isButtonJoin = true;
      const vm = this;
      const value = e.target.value;
      const id = e.target.id;
      const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi;
      // const reg = /[a-zA-Z0-9<>(){}[\]\-_=+|\/\\'\;.:\"`~!?@#$%^&*]/gi;
      if (id == 'id') {
        e.target.value = value.replace(reg, '');
        vm.form.webId = value.replace(reg, '');
      } else if (id == 'email') {
        e.target.value = value.replace(reg, '');
        vm.form.email = value.replace(reg, '');
      }
      this.getChkValue(e);
    },
  },
  updated() {},
  mounted: async function() {
    this.form.custNo = this.$store.state.cu.custNo;
    this.form.gsAgree = this.$store.state.cu.gsrContract1;
    if (this.form.gsAgree != 'Y') {
      document.getElementById('agreement').click();
    }
  },
};
</script>
