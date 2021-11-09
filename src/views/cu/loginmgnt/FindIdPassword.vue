<!--
Design: views/cu/SC-FO-CU-GF-MS-019
Pg id:
Uri: /cu/find_id_password
-->
<template>
<div class="wrap-login" v-bind:class="[siteClass, {'integrate-member__wrap' : siteClass == 'marketfor'}]">
    <SubDefaultHeader headerText="아이디/비밀번호 찾기" :searchBtnBottom="true" :prevHomeType="true" :tabbar="false" />
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="login-wrap find">
        <div class="wrap-tab">
          <!-- START : 아이디/비밀번호 찾기 탭 -->
          <!-- 수정 START : 2020.02.13 marketfor 클래스 삭제 추가 -->
          <ul ref="tabList" class="tablist type02">
            <!-- 수정 END : 2020.02.13 marketfor 클래스 삭제 추가 -->
            <li>
              <button
                type="button"
                id="tabFindId"
                aria-controls="tabFindId-contents"
                @click="tabAction('tabFindId')"
                :class="{active: this.tab.tabFindId}"
              >아이디 찾기</button>
            </li>
            <li>
              <button
                type="button"
                id="tabFindPw"
                aria-controls="tabFindPw-contents"
                @click="tabAction('tabFindPw')"
                :class="{active: this.tab.tabFindPw}"
              >비밀번호 찾기</button>
            </li>
          </ul>
          <!-- END : 아이디/비밀번호 콘텐츠 -->
          <div ref="tabContents">
            <!-- START : 아이디 찾기 콘텐츠 -->
            <div
              id="tabFindId-contents"
              class="tabcontents"
              aria-labelledby="tabFindId"
              v-if="this.tab.tabFindId"
            >
              <div class="wrap-radio">
                <div class="inp-radio small">
                  <input
                    type="radio"
                    name="radio"
                    id="idChkMemberInfo"
                    value
                    checked
                    aria-controls="idChkMemberInfo-contents"
                    @click="idRadioChkAction('idChkMemberInfo')"
                    :class="{active: this.idRadioChk.idChkMemberInfo}"
                  />
                  <label for="idChkMemberInfo">회원정보로 찾기</label>
                </div>
                <div class="inp-radio small">
                  <input
                    type="radio"
                    name="radio"
                    id="idChkVerification"
                    value
                    aria-controls="idChkVerification-contents"
                    @click="idRadioChkAction('idChkVerification')"
                    :class="{active: this.idRadioChk.idChkVerification}"
                  />
                  <label for="idChkVerification">본인인증으로 찾기</label>
                </div>
              </div>
              <!-- START : 회원정보로 찾기 -->
              <div
                id="idChkMemberInfo-contents"
                class="tabcontents"
                aria-labelledby="idChkMemberInfo"
                v-if="this.idRadioChk.idChkMemberInfo"
              >
                <section class="section-area">
                  <div class="inner">
                    <h2 class="title hidden">회원정보로 찾기</h2>
                    <fieldset class="warp-input-txt">
                      <legend>회원정보로 아이디 찾기</legend>
                      <div class="inp-box" id="idNameErr">
                        <!-- 입력 오류일 경우 error 클래스 추가 -->
                        <label for="name" class="hidden">이름을 입력해주세요</label>
                        <input
                          type="text"
                          id="name"
                          ref="name"
                          class="inp-txt w100"
                          value
                          v-model="form.custNm"
                          placeholder="이름을 입력해주세요"
                          @keyup="getPressName($event)"
                          @blur="getChkValue('01',$event)"
                        />
                        <span class="txt-error">{{form.idNameMsg}}</span>
                      </div>
                      <div class="wrap-inp-btn selectbox" id="idNum1Err">
                        <div class="wrap-select">
                          <label for="phoneNumber" class="hidden">휴대폰번호 앞자리 선택</label>
                          <select id="phoneNumber" v-model="form.hpsta">
                            <option
                              v-for="CU0005 in CU0005S"
                              v-bind:key="CU0005.commCd"
                              v-bind:CU0005="CU0005"
                              v-bind:value="CU0005.commCd"
                            >{{CU0005.commCd}}</option>
                          </select>
                        </div>
                        <div class="inp-box">
                          <!-- 입력 오류일 경우 error 클래스 추가 -->
                          <label for="num1" class="hidden">휴대전화번호'-'없이 입력</label>
                          <input
                            type="text"
                            id="num1"
                            ref="num1"
                            class="inp-txt w100"
                            value
                            v-model="form.hpendId"
                            placeholder="휴대전화번호'-'없이 입력"
                            maxlength="8"
                            @keyup="chkAuth($event)"
                            v-bind:disabled="disabledEv.isButtonAuthId"
                            @blur="getChkValue('01',$event)"
                          />
                        </div>
                        <button
                          id="auth1"
                          class="btn-input lightgreen"
                          @click="getHpAuthentication('01')"
                          v-bind:disabled="disabledEv.isButtonAuthId"
                        >{{hpCertiChk.autChkId}}</button>
                        <!-- active 클래스 추가시 활성화 -->
                        <span class="txt-error">{{form.idNumMsg}}</span>
                        <!-- 미입력시 MSG -->
                      </div>
                      <div class="wrap-inp-btn">
                        <div class="inp-box time">
                          <!-- 입력 오류일 경우 error 클래스 추가 -->
                          <label for="num2" class="hidden">인증번호를 입력해주세요</label>
                          <input
                            type="text"
                            id="num2"
                            ref="num2"
                            class="inp-txt w100"
                            v-bind:disabled="disabledEv.isButtonAuthChkId"
                            value
                            v-model="form.chkKey"
                            placeholder="인증번호를 입력해주세요"
                            maxlength="6"
                            @keyup="chkAuth($event)"
                          />
                          <p class="txt-time">
                            <span aria-label="인증번호 입력 남은 시간">{{setTime.resTimeData}}</span>
                          </p>
                        </div>
                        <button
                          id="authChk1"
                          class="btn-input lightgreen"
                          @click="getAuthentication('01')"
                          v-bind:disabled="disabledEv.isButtonAuthChkId"
                        >인증</button>
                        <!-- active 클래스 추가시 활성화 -->
                      </div>
                    </fieldset>
                  </div>
                </section>
              </div>
              <!-- END : 회원정보로 찾기 -->
              <!-- START : 휴대폰 번호본인인증으로 찾기 -->
              <div
                id="idChkVerification-contents"
                class="tabcontents"
                aria-labelledby="idChkVerification"
                v-if="this.idRadioChk.idChkVerification"
              >
                <section class="section-area">
                  <div class="inner">
                    <form class="form-horizontal" id="subKmc" name="subKmc" method="post" action>
                      <h2 class="title">본인인증으로 찾기</h2>
                      <p class="desc">
                        회원가입 시 입력한 정보가 변경되어 확인이 불가능한 경우
                        <br />휴대폰 본인인증을 이용해주세요.
                      </p>
                      <!-- START : 하단 버튼 -->
                      <div class="btn-area">
                        <button
                          type="button"
                          class="btn-border"
                          @click="getSelfAuthentication()"
                        >
                          <span>본인명의 휴대폰 인증</span>
                        </button>
                      </div>
                      <!-- END :하단 버튼 -->
                      <input
                        type="hidden"
                        id="tr_cert"
                        name="tr_cert"
                        v-model="self.trCert"
                        class="form-control"
                      />
                      <input
                        type="hidden"
                        id="tr_url"
                        name="tr_url"
                        v-model="self.trUrl"
                        class="form-control"
                      />
                      <input
                        type="hidden"
                        id="tr_add"
                        name="tr_add"
                        v-model="self.trAdd"
                        class="form-control"
                      />
                    </form>
                  </div>
                </section>
              </div>
              <!-- END : 회원정보로 찾기 -->
            </div>
          </div>
          <!-- END : 아이디 찾기 콘텐츠 -->
          <!-- START : 비밀번호 찾기 콘텐츠 -->
          <div
            id="tabFindPw-contents"
            class="tabcontents"
            aria-labelledby="tabFindPw"
            v-if="this.tab.tabFindPw"
          >
            <div class="wrap-radio" v-if="form.id ==''">
              <div class="inp-radio small">
                <input
                  type="radio"
                  name="radio"
                  id="pwChkMemberInfo"
                  value
                  checked
                  aria-controls="pwChkMemberInfo-contents"
                  @click="pwRadioChkAction('pwChkMemberInfo')"
                  :class="{active: this.pwRadioChk.pwChkMemberInfo}"
                />
                <label for="pwChkMemberInfo">회원정보로 찾기</label>
              </div>
              <div class="inp-radio small">
                <input
                  type="radio"
                  name="radio"
                  id="pwChkVerification"
                  value
                  aria-controls="pwChkVerification-contents"
                  @click="pwRadioChkAction('pwChkVerification')"
                  :class="{active: this.pwRadioChk.pwChkVerification}"
                />
                <label for="pwChkVerification">본인인증으로 찾기</label>
              </div>
            </div>
            <div class="wrap-radio" v-else-if="form.id =='1'">
              <div class="inp-radio small">
                <input
                  type="radio"
                  name="radio"
                  id="pwChkMemberInfo"
                  value
                  checked
                  aria-controls="pwChkMemberInfo-contents"
                  @click="pwRadioChkAction('pwChkMemberInfo')"
                  :class="{active: this.pwRadioChk.pwChkMemberInfo}"
                />
                <label for="pwChkMemberInfo">회원정보로 찾기</label>
              </div>
              <div class="inp-radio small">
                <input
                  type="radio"
                  name="radio"
                  id="pwChkVerification"
                  value
                  aria-controls="pwChkVerification-contents"
                  @click="pwRadioChkAction('pwChkVerification')"
                  :class="{active: this.pwRadioChk.pwChkVerification}"
                />
                <label for="pwChkVerification">본인인증으로 찾기</label>
              </div>
            </div>
            <div class="wrap-radio" v-else-if="form.id =='2'">
              <div class="inp-radio small">
                <input
                  type="radio"
                  name="radio"
                  id="pwChkMemberInfo"
                  value
                  aria-controls="pwChkMemberInfo-contents"
                  @click="pwRadioChkAction('pwChkMemberInfo')"
                  :class="{active: this.pwRadioChk.pwChkMemberInfo}"
                />
                <label for="pwChkMemberInfo">회원정보로 찾기</label>
              </div>
              <div class="inp-radio small">
                <input
                  type="radio"
                  name="radio"
                  id="pwChkVerification"
                  value
                  checked
                  aria-controls="pwChkVerification-contents"
                  @click="pwRadioChkAction('pwChkVerification')"
                  :class="{active: this.pwRadioChk.pwChkVerification}"
                />
                <label for="pwChkVerification">본인인증으로 찾기</label>
              </div>
            </div>
            <!-- START : 회원정보로 찾기 -->
            <div
              id="pwChkMemberInfo-contents"
              class="tabcontents"
              aria-labelledby="pwChkMemberInfo"
              v-if="this.pwRadioChk.pwChkMemberInfo"
            >
              <section class="section-area">
                <div class="inner">
                  <h2 class="title hidden">회원정보로 찾기</h2>
                  <p class="text-desc">회원정보 확인 후 새로운 비밀번호로 변경해주세요</p>
                  <fieldset class="warp-input-txt">
                    <legend>회원정보로 비밀번호 찾기</legend>
                    <div class="inp-box" id="pwEmailErr">
                      <!-- 입력 오류일 경우 error 클래스 추가 -->
                      <label for="email" class="hidden">아이디(이메일)을 입력해주세요</label>
                      <input
                        type="email"
                        id="email"
                        ref="email"
                        class="inp-txt w100"
                        value
                        v-model="form.webId"
                        placeholder="아이디(이메일)을 입력해주세요"
                        @keyup="getPressId($event)"
                        @blur="getChkValue('02',$event)"
                      />
                      <span class="txt-error">{{form.pwEmailMsg}}</span>
                    </div>
                    <div class="inp-box" id="pwNameErr">
                      <!-- 입력 오류일 경우 error 클래스 추가 -->
                      <label for="nameRef" class="hidden">이름을 입력해주세요</label>
                      <input
                        type="text"
                        id="nameRef"
                        ref="nameRef"
                        class="inp-txt w100"
                        value
                        v-model="form.custNm2"
                        placeholder="이름을 입력해주세요"
                        @keyup="getPressName($event)"
                        @blur="getChkValue('02',$event)"
                      />
                      <span class="txt-error">{{form.pwNameMsg}}</span>
                    </div>
                    <div class="wrap-inp-btn selectbox" id="pwNum1Err">
                      <div class="wrap-select">
                        <select id="phoneNumber" v-model="form.hpsta">
                          <option
                            v-for="CU0005 in CU0005S"
                            v-bind:key="CU0005.commCd"
                            v-bind:CU0005="CU0005"
                            v-bind:value="CU0005.commCd"
                          >{{CU0005.commCd}}</option>
                        </select>
                      </div>
                      <div class="inp-box">
                        <!-- 입력 오류일 경우 error 클래스 추가 -->
                        <label for="num1" class="hidden">휴대전화번호'-'없이 입력</label>
                        <input
                          type="text"
                          id="num1Ref"
                          ref="num1Ref"
                          class="inp-txt w100"
                          value
                          v-model="form.hpendPw"
                          placeholder="휴대전화번호'-'없이 입력"
                          maxlength="8"
                          @keyup="chkAuth($event)"
                          v-bind:disabled="disabledEv.isButtonAuthPw"
                          @blur="getChkValue('02',$event)"
                        />
                      </div>
                      <button
                        id="auth2"
                        class="btn-input lightgreen"
                        @click="getHpAuthentication('02')"
                        v-bind:disabled="disabledEv.isButtonAuthPw"
                      >{{hpCertiChk.autChkPw}}</button>
                      <!-- active 클래스 추가시 활성화 -->
                      <span class="txt-error">{{form.pwNum1Msg}}</span>
                      <!-- 미입력시 MSG -->
                    </div>
                    <div class="wrap-inp-btn">
                      <div class="inp-box time">
                        <!-- 입력 오류일 경우 error 클래스 추가 -->
                        <label for="num2" class="hidden">인증번호를 입력해주세요</label>
                        <input
                          type="text"
                          id="num2Ref"
                          ref="num2Ref"
                          class="inp-txt w100"
                          value
                          v-model="form.chkKey"
                          v-bind:disabled="disabledEv.isButtonAuthChkPw"
                          placeholder="인증번호를 입력해주세요"
                          maxlength="6"
                          @keyup="chkAuth($event)"
                        />
                        <p class="txt-time">
                          <span aria-label="인증번호 입력 남은 시간">{{setTime.resTimeData}}</span>
                        </p>
                      </div>
                      <button
                        id="authChk2"
                        class="btn-input lightgreen"
                        @click="getAuthentication('02')"
                        v-bind:disabled="disabledEv.isButtonAuthChkPw"
                      >인증</button>
                      <!-- active 클래스 추가시 활성화 -->
                    </div>
                  </fieldset>
                </div>
              </section>
              <!-- END : 회원정보로 찾기 -->
            </div>
            <!-- END : 회원정보로 찾기 -->
            <!-- START : 본인인증으로 찾기 -->
            <div
              id="pwChkVerification-contents"
              class="tabcontents"
              aria-labelledby="pwChkVerification"
              v-if="this.pwRadioChk.pwChkVerification"
            >
              <section class="section-area verification">
                <div class="inner">
                  <h2 class="title hidden">본인인증으로 찾기</h2>
                  <p class="text-desc">본인 명의의 휴대폰 본인인증 후 새로운 비밀번호로 변경해주세요</p>
                  <fieldset class="warp-input-txt">
                    <legend>본인인증으로 찾기</legend>
                    <div class="inp-box" id="pwScEmailErr">
                      <!-- 입력 오류일 경우 error 클래스 추가 -->
                      <label for="email" class="hidden">아이디(이메일)을 입력해주세요</label>
                      <input
                        type="email"
                        id="email2"
                        ref="email2"
                        class="inp-txt w100"
                        v-model="form.webId"
                        value
                        placeholder="아이디(이메일)을 입력해주세요"
                        @keyup="getPressId($event)"
                        @blur="getChkValue('02',$event)"
                      />
                      <span class="txt-error">{{form.pwScEmailMsg}}</span>
                    </div>
                  </fieldset>
                  <!-- START : 하단 버튼 -->
                  <div class="btn-area">
                    <form
                      class="form-horizontal"
                      id="subKmcPw"
                      name="subKmcPw"
                      method="post"
                      action
                    >
                      <button
                        type="button"
                        class="btn-border"
                        @click="getSelfAuthentication('subKmcPw')"
                      >
                        <span>휴대폰 본인인증</span>
                      </button>
                      <input
                        type="hidden"
                        id="tr_cert"
                        name="tr_cert"
                        v-model="self.trCert"
                        class="form-control"
                      />
                      <input
                        type="hidden"
                        id="tr_url"
                        name="tr_url"
                        v-model="self.trUrl"
                        class="form-control"
                      />
                      <input
                        type="hidden"
                        id="tr_add"
                        name="tr_add"
                        v-model="self.trAdd"
                        class="form-control"
                      />
                    </form>
                  </div>
                  <!-- END :하단 버튼 -->
                </div>
              </section>
            </div>
            <!-- END : 본인인증으로 찾기 -->
          </div>
          <!-- END : 비밀번호 찾기 콘텐츠 -->
        </div>
      </div>
    </main>
    <!-- 4월 수정 START : 푸터 추가 -->
    <Footer />
    <!-- 4월 수정 END : 푸터 추가 -->
    <PopupTemporaryPasswordChange
      @popupEvent="popupAction"
      v-if="this.popup.popupTemporaryPasswordChange"
      :userCustNo="userCustNo"
    />
    <!-- 비밀번호변경 안내 팝업 / 수정 : 2020.03.05 추가 -->
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import Footer from '@/components/common/Footer'; // 푸터
import PopupTemporaryPasswordChange from '@/views/cu/loginmgnt/PopupTemporaryPasswordChange'; // 비밀번호변경 안내 팝업 / 수정 : 2020.03.05 추가
import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import CuUtils from '@/common/cu/CuUtils';

export default {
  name: 'FindId',
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
    PopupTemporaryPasswordChange, // 수정 : 2020.03.05 추가
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '아이디/비밀번호 찾기 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '아이디/비밀번호 찾기',
      },
    ],
  },
  data() {
    return {
      findTyp: '01',
      isidResult: false, // 아이디 결과
      form: {
        custNm: '',
        custNm2: '',
        webId: '',
        hpsta: '010',
        hpendId: '',
        hpendPw: '',
        chkKey: '',
        trCert: '',
        trUrl: '',
        trAdd: 'N',
        id: '',
        idNumMsg: '',
        idNameMsg: '',
        pwEmailMsg: '',
        pwNameMsg: '',
        pwNum1Msg: '',
        pwScEmailMsg: '',
      },
      self: {
        trCert: '',
        trUrl: '',
        trAdd: 'N',
        certNum: '',
        apiUrl: '',
      },
      smplJoinData: {
        webId: '',
        custNm: '',
        moblTelNo: '',
      },
      tab: {
        tabFindId: true,
        tabFindPw: false,
      },
      idRadioChk: {
        idChkMemberInfo: true,
        idChkVerification: false,
      },
      pwRadioChk: {
        pwChkMemberInfo: true,
        pwChkVerification: false,
      },
      webIdList: [],
      pwIdList: [],
      CU0005S: [],
      hpCertiChk: {
        hpCerti: false,
        autChkId: '인증번호 전송',
        autChkPw: '인증번호 전송',
      },
      setTime: {
        timeCounter: 180,
        polling: null,
        chkTime: 'Y',
        resTimeData: '',
      },
      popup: {
        // 팝업
        open: false,
        popupTemporaryPasswordChange: false, // 비밀번호변경 안내 팝업
      },
      disabledEv: {
        isButtonAuthChkId: true,
        isButtonAuthId: false,
        isButtonAuthChkPw: true,
        isButtonAuthPw: false,
      },
      userCustNo: {
        custNo: '',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      siteClass: CookieUtils.getSiteClass(),
      cmmSteId: CookieUtils.getCmmSteId(),
    };
  },
  created() {},
  mounted() {
    const vm = this;
    // PC KMC인증
    window.getSelfCertification = function(strRecCert, strCertNum, callBack) {
      vm.getSelfCertif(strRecCert, strCertNum, callBack);
    };
    // 모바일 인증
    const strRecCert = localStorage.getItem('strRecCert');
    const strCertNum = localStorage.getItem('strCertNum');
    vm.form.strRecCert = strRecCert;
    if (!StringUtils.isEmpty(strRecCert)) {
      localStorage.removeItem('strRecCert');
      localStorage.removeItem('strCertNum');
      localStorage.removeItem('reUrl');
      vm.getSelfCertif(strRecCert, strCertNum);
    }
    const CU0005Input = {
      commGrpCd: 'CU0005',
    };
    ApiUtils.get('/fo/cm/commcdmgnt/common-codes', CU0005Input).then(CU0005 => {
      if (CU0005.data === null) {
        this.$gsdialog.alert('공통함수 오류', { html: true });
        return;
      } else {
        this.CU0005S = CU0005.data.data;
      }
    });
    this.findTyp = sessionStorage.getItem('typ');
    sessionStorage.clear();
    if (this.findTyp === '02') {
      this.tab.tabFindId = false;
      this.tab.tabFindPw = true;
      // this.$refs.email.input.focus();
    } else {
      this.tab.tabFindId = true;
      this.tab.tabFindPw = false;
      document.getElementById('name').focus();
    }

    // kixx 본인인증
    const $this = this;
    // this.$nextTick(() => {
    const id = $this.$route.params.id;
    if (!StringUtils.isEmpty(id)) {
      $this.form.id = id;
      $this.tab.tabFindId = false;
      $this.tab.tabFindPw = true;
      if (id === '1') {
        $this.pwRadioChkAction('pwChkMemberInfo');
      } else if (id === '2') {
        $this.pwRadioChkAction('pwChkVerification');
      }
    }
    // });
  },
  methods: {
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`]; // popup
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false); // view - body
    },
    tabAction(type) {
      // tab
      for (let i = 0; i < Object.keys(this.tab).length; i++) {
        this.tab[Object.keys(this.tab)[i]] = false;
      }
      this.tab[type] = true;
      this.$refs.tabContents.focus();
      this.idRadioChkAction('idChkMemberInfo');
      this.pwRadioChkAction('pwChkMemberInfo');
      this.form.custNm = '';
      this.form.custNm2 = '';
      this.form.hpendId = '';
      this.form.hpendPw = '';
      this.form.chkKey = '';
      this.form.webId = '';
      this.smsClear();
    },
    idRadioChkAction(type) {
      // idRadioChk
      this.form.hpsta = '010';
      for (let i = 0; i < Object.keys(this.idRadioChk).length; i++) {
        this.idRadioChk[Object.keys(this.idRadioChk)[i]] = false;
      }
      this.idRadioChk[type] = true;
      this.$refs.tabContents.focus();
    },
    pwRadioChkAction(type) {
      // pwRadioChk
      this.form.hpsta = '010';
      for (let i = 0; i < Object.keys(this.pwRadioChk).length; i++) {
        this.pwRadioChk[Object.keys(this.pwRadioChk)[i]] = false;
      }
      this.pwRadioChk[type] = true;
      this.$refs.tabContents.focus();
    },
    // 점유인증 시작
    start: function() {
      // 1초에 한번씩 start 호출
      this.setTime.polling = setInterval(() => {
        let setCount = this.setTime.timeCounter;
        setCount = setCount - 1;
        this.setTime.timeCounter = setCount;
        const settime = setCount / 60;
        const minutes = parseInt(settime);
        const secondes = Math.round((settime - minutes) * 60);
        const ret = this.pad(minutes, 1) + ':' + this.pad(secondes, 2);
        this.setTime.resTimeData = ret;
        if (setCount <= 0) {
          this.timeStop();
        }
      }, 1000);
    },
    pad: function(n, width) {
      n = n + '';
      return n.length >= width
        ? n
        : new Array(width - n.length + 1).join('0') + n;
    },
    timeStop: function() {
      clearInterval(this.setTime.polling);
      this.setTime.chkTime = 'N';
    },
    smsClear: function() {
      clearInterval(this.setTime.polling);
      this.setTime.chkTime = 'Y';
      this.setTime.timeCounter = 180;
      this.setTime.resTimeData = '';
    },
    smsReset: function() {
      clearInterval(this.setTime.polling);
      this.setTime.chkTime = 'Y';
      this.setTime.timeCounter = 180;
      this.start();
    },
    // 점유인증 끝
    getChkValue(type, e) {
      const tmpHp = this;
      const value = e.target.value;
      const id = e.target.id;
      const emailRule = /^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*.[a-z]{2,3}$/i;
      if (type == '01') {
        if (id == 'name') {
          // 이름
          if (StringUtils.isEmpty(value)) {
            document.getElementById('idNameErr').className = 'inp-box error';
            tmpHp.form.idNameMsg = '이름을 입력해주세요.';
            return false;
          } else {
            document.getElementById('idNameErr').className = 'inp-box ';
            tmpHp.form.idNameMsg = '';
          }
        } else if (id == 'num1') {
          // 휴대폰번호
          if (StringUtils.isEmpty(value)) {
            document.getElementById('idNum1Err').className =
              'wrap-inp-btn selectbox error';
            tmpHp.form.idNumMsg = '휴대폰번호를 입력해주세요.';
            return false;
          } else if (value.length > 8 || value.length < 7) {
            document.getElementById('idNum1Err').className =
              'wrap-inp-btn selectbox error';
            tmpHp.form.idNumMsg = '휴대폰번호 형식이 올바르지 않습니다.';
            return false;
          } else {
            document.getElementById('idNum1Err').className =
              'wrap-inp-btn selectbox';
            tmpHp.form.idNumMsg = '';
          }
        }
        return true;
      } else {
        if (id == 'email') {
          if (StringUtils.isEmpty(value)) {
            document.getElementById('pwEmailErr').className = 'inp-box error';
            tmpHp.form.pwEmailMsg = '아이디(이메일)를 입력해주세요.';
            return false;
          } else if (!StringUtils.isEmpty(value)) {
            const tmpWebId = value;
            if (tmpWebId.indexOf('@') != -1) {
              const regExpHp = /^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*.[a-z]{2,3}$/i;
              if (regExpHp.test(value) == false) {
                document.getElementById('pwEmailErr').className =
                  'inp-box error';
                tmpHp.form.pwEmailMsg = '이메일 형식이 올바르지 않습니다.';
                return false;
              } else {
                document.getElementById('pwEmailErr').className = 'inp-box';
                tmpHp.form.pwEmailMsg = '';
              }
            } else {
              document.getElementById('pwEmailErr').className = 'inp-box';
              tmpHp.form.pwEmailMsg = '';
            }
          }
        } else if (id == 'email2') {
          if (StringUtils.isEmpty(value)) {
            document.getElementById('pwScEmailErr').className = 'inp-box error';
            tmpHp.form.pwScEmailMsg = '아이디(이메일)를 입력해주세요.';
            return false;
          } else if (!StringUtils.isEmpty(value)) {
            const tmpWebId = value;
            // 값은 있으나 이메일 형식일경우
            if (tmpWebId.indexOf('@') != -1) {
              const regExpHp = /^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*.[a-z]{2,3}$/i;
              if (regExpHp.test(value) == false) {
                document.getElementById('pwScEmailErr').className =
                  'inp-box error';
                tmpHp.form.pwScEmailMsg = '이메일 형식이 올바르지 않습니다.';
                return false;
              } else {
                document.getElementById('pwScEmailErr').className = 'inp-box';
                tmpHp.form.pwScEmailMsg = '';
              }
            } else {
              document.getElementById('pwScEmailErr').className = 'inp-box';
              tmpHp.form.pwScEmailMsg = '';
            }
          }
        } else if (id == 'nameRef') {
          // 이름
          if (StringUtils.isEmpty(value)) {
            document.getElementById('pwNameErr').className = 'inp-box error';
            tmpHp.form.pwNameMsg = '이름을 입력해주세요.';
            return false;
          } else {
            document.getElementById('pwNameErr').className = 'inp-box';
            tmpHp.form.pwNameMsg = '';
          }
        } else if (id == 'num1Ref') {
          // 휴대폰번호
          if (StringUtils.isEmpty(value)) {
            document.getElementById('pwNum1Err').className =
              'wrap-inp-btn selectbox error';
            tmpHp.form.pwNum1Msg = '휴대폰번호를 입력해주세요.';
            return false;
          } else if (value.length > 8 || value.length < 7) {
            document.getElementById('pwNum1Err').className =
                'wrap-inp-btn selectbox error';
            tmpHp.form.pwNum1Msg = '휴대폰번호 형식이 올바르지 않습니다.';
            return false;
          } else {
            document.getElementById('pwNum1Err').className =
              'wrap-inp-btn selectbox';
            tmpHp.form.pwNum1Msg = '';
          }
        }
        return true;
      }
    },
    // 인증번호 전송
    async getHpAuthentication(type) {
      const tmpHp = this;
      if (type == '01') {
        // 이름
        if (StringUtils.isEmpty(tmpHp.form.custNm)) {
          document.getElementById('idNameErr').className = 'inp-box error';
          tmpHp.form.idNameMsg = '이름을 입력해주세요.';
          return false;
        } else {
          document.getElementById('idNameErr').className = 'inp-box ';
          tmpHp.form.idNameMsg = '';
        }
        if (StringUtils.isEmpty(tmpHp.form.hpendId)) {
          document.getElementById('idNum1Err').className =
            'wrap-inp-btn selectbox error';
          tmpHp.form.idNumMsg = '휴대폰번호 입력해주세요.';
          return false;
        } else {
          document.getElementById('idNum1Err').className =
            'wrap-inp-btn selectbox';
          tmpHp.form.idNumMsg = '';
        }
        const hp = tmpHp.form.hpsta + tmpHp.form.hpendId;
        const custNm = tmpHp.form.custNm;
        tmpHp.smplJoinData.custNm = custNm;
        tmpHp.smplJoinData.moblTelNo = hp;
        const hpAuth = {
          hp: hp,
        };
        const ret = await ApiUtils.get(
          '/fo/cu/mbrmgnt/hp-certification',
          hpAuth,
          this.headers
        );
        if (!StringUtils.isEmpty(ret.data.data.chkKey)) {
          sessionStorage.setItem('chkKey', ret.data.data.chkKey);
          // this.$gsdialog.alert('인증번호를 발송하였습니다.' + ret.data.data.hpCode, { html: true }).then(dialog =>{
          this.$gsdialog.alert('인증번호를 발송하였습니다', { html: true }).then(dialog =>{
            const timeCnt = this.setTime.timeCounter;
            if (timeCnt === 180) {
              this.hpCertiChk.autChkId = '재전송';
              this.disabledEv.isButtonAuthChkId = false;
              this.hpCertiChk.hpCerti = false;
              this.form.chkKey = '';
              document.getElementById('authChk1').className =
                'btn-input lightgreen active';
              tmpHp.start();
            } else {
              this.hpCertiChk.autChkId = '재전송';
              this.form.chkKey = '';
              this.disabledEv.isButtonAuthChkId = false;
              this.hpCertiChk.hpCerti = false;
              document.getElementById('authChk1').className =
                'btn-input lightgreen active';
              tmpHp.smsReset();
            }
          });
        } else {
          this.$gsdialog.alert('시스템 오류', { html: true });
        }
      } else {
        if (StringUtils.isEmpty(tmpHp.form.webId)) {
          document.getElementById('pwEmailErr').className = 'inp-box error';
          tmpHp.form.pwEmailMsg = '아이디(이메일)를 입력해주세요.';
          return false;
        } else if (!StringUtils.isEmpty(tmpHp.form.webId)) {
          const tmpWebId = tmpHp.form.webId;
          // 값은 있으나 이메일 형식일경우
          if (tmpWebId.indexOf('@') != -1) {
            const regExpHp = /^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*.[a-z]{2,3}$/i;
            if (regExpHp.test(tmpWebId) == false) {
              document.getElementById('pwEmailErr').className =
                'inp-box error';
              tmpHp.form.pwEmailMsg = '이메일 형식이 올바르지 않습니다.';
              return false;
            } else {
              document.getElementById('pwEmailErr').className = 'inp-box';
              tmpHp.form.pwEmailMsg = '';
            }
          } else {
            document.getElementById('pwEmailErr').className = 'inp-box';
            tmpHp.form.pwEmailMsg = '';
          }
        }
        // 이름
        if (StringUtils.isEmpty(tmpHp.form.custNm2)) {
          document.getElementById('pwNameErr').className = 'inp-box error';
          tmpHp.form.pwNameMsg = '이름을 입력해주세요.';
          return false;
        } else {
          document.getElementById('pwNameErr').className = 'inp-box ';
          tmpHp.form.pwNameMsg = '';
        }
        if (StringUtils.isEmpty(tmpHp.form.hpendPw)) {
          document.getElementById('pwNum1Err').className =
            'wrap-inp-btn selectbox error';
          tmpHp.form.pwNum1Msg = '휴대폰번호 입력해주세요.';
          return false;
        } else {
          document.getElementById('pwNum1Err').className =
            'wrap-inp-btn selectbox';
          tmpHp.form.pwNum1Msg = '';
        }
        const webId = tmpHp.form.webId;
        const custNm = tmpHp.form.custNm2;
        const hp = tmpHp.form.hpsta + tmpHp.form.hpendPw;
        tmpHp.smplJoinData.webId = webId;
        tmpHp.smplJoinData.custNm = custNm;
        tmpHp.smplJoinData.moblTelNo = hp;
        const hpAuth = {
          hp: hp,
        };
        const ret = await ApiUtils.get(
          '/fo/cu/mbrmgnt/hp-certification',
          hpAuth,
          this.headers
        );
        if (ret.data.data.chkKey != null || ret.data.data.chkKey != '') {
          sessionStorage.setItem('chkKey', ret.data.data.chkKey);
          // this.$gsdialog.alert('인증번호를 발송하였습니다.' + ret.data.data.hpCode, { html: true }).then(dialog =>{
          this.$gsdialog.alert('인증번호를 발송하였습니다.', { html: true }).then(dialog =>{
            const timeCnt = this.setTime.timeCounter;
            if (timeCnt === 180) {
              this.hpCertiChk.autChkPw = '재전송';
              this.disabledEv.isButtonAuthChkPw = false;
              this.hpCertiChk.hpCerti = false;
              document.getElementById('authChk2').className =
                'btn-input lightgreen active';
              tmpHp.start();
            } else {
              this.form.chkKey = '';
              this.disabledEv.isButtonAuthChkPw = false;
              this.hpCertiChk.hpCerti = false;
              document.getElementById('authChk2').className =
                'btn-input lightgreen active';
              tmpHp.smsReset();
            }
          });
        } else {
          this.$gsdialog.alert('시스템 오류', { html: true });
        }
      }
    },
    // 인증번호 확인
    async getAuthentication(type) {
      if (type == '01') {
        const timeCnt = this.setTime.timeCounter;
        const oldkey = sessionStorage.getItem('chkKey');
        const authen = {
          oldChkKey: oldkey,
          chkKey: this.form.chkKey + this.form.hpsta + this.form.hpendId,
        };
        if (timeCnt > 0 && !StringUtils.isEmpty(authen.chkKey)) {
          const ret = await ApiUtils.get(
            '/fo/cu/mbrmgnt/hp-certification-check',
            authen,
            this.headers
          );
          if (ret.data.data.resultCode == '00000') {
            // 점유 인증 확인 완료
            const retSmplJoin = await ApiUtils.get(
              '/fo/cu/loginmgnt/web-id',
              this.smplJoinData
            );
            if (retSmplJoin.data.data.resultCode == '00000') {
              // 점유 인증 확인 완료
              this.smsClear();
              const retdata = retSmplJoin.data.data;
              this.webIdList = retdata.webIdInqListDto;
              const webId = this.webIdList[0].webId;
              const snsTypeNm = this.webIdList[0].snsTypeNm;
              if (this.webIdList.length > 0 && !StringUtils.isEmpty(webId)) {
                this.$gsdialog.alert('인증이 완료되었습니다.', { html: true }).then(dialog =>{
                  sessionStorage.setItem('webIdList', JSON.stringify(this.webIdList));
                  this.form.chkKey = '';
                  this.smsClear();
                  this.setTime.resTimeData = '';
                  this.disabledEv.isButtonAuthChkId = true;
                  document.getElementById('authChk1').className =
                    'btn-input lightgreen';
                  this.$router.push('/cu/find_id_reslt');
                });
              } else {
                sessionStorage.removeItem('chkKey');
                this.disabledEv.isButtonAuthChkId = true;
                this.hpCertiChk.autChkId = '인증번호 전송';
                this.form.custNm = '';
                this.form.hpendId = '';
                this.form.chkKey = '';
                this.smsClear();
                this.setTime.resTimeData = '';
                this.disabledEv.isButtonAuthId = true;
                document.getElementById('auth1').className =
                  'btn-input lightgreen';
                document.getElementById('authChk1').className =
                  'btn-input lightgreen';
                this.$gsdialog.alert(
                  '고객님은 아이디 등록이 필요합니다.<br/>회원가입 > 휴대폰본인인증으로 아이디를 등록해주세요.', { html: true }
                );
              }
            } else {
              this.smsClear();
              sessionStorage.removeItem('chkKey');
              this.disabledEv.isButtonAuthChkId = true;
              this.form.chkKey = '';
              document.getElementById('authChk1').className =
                'btn-input lightgreen';
              this.$gsdialog.alert(
                '고객님의 정보가 없습니다.<br/>입력하신 정보가 맞는지 확인해주세요.', { html: true }
              );
            }
          } else {
            this.hpCertiChk.hpCerti = false;
            this.form.chkKey = '';
            this.$gsdialog.alert('인증번호가 올바르지 않습니다. 다시 확인해주세요.', { html: true });
          }
        } else {
          this.hpCertiChk.hpCerti = false;
          this.form.chkKey = '';
          this.$gsdialog.alert('인증시간이 지났습니다.<br/> 다시 휴대폰 인증을 진행해주세요.', { html: true });
          sessionStorage.removeItem('chkKey');
        }
      } else {
        const timeCnt = this.setTime.timeCounter;
        const oldkey = sessionStorage.getItem('chkKey');
        const authen = {
          oldChkKey: oldkey,
          chkKey: this.form.chkKey + this.form.hpsta + this.form.hpendPw,
        };
        if (timeCnt > 0 && !StringUtils.isEmpty(authen.chkKey)) {
          const ret = await ApiUtils.get(
            '/fo/cu/mbrmgnt/hp-certification-check',
            authen,
            this.headers
          );
          if (ret.data.data.resultCode == '00000') {
            // 점유 인증 확인 완료
            const retSmplJoin = await ApiUtils.get(
              '/fo/cu/loginmgnt/web-id',
              this.smplJoinData
            );
            if (retSmplJoin.data.data.resultCode == '00000') {
              // 점유 인증 확인 완료
              this.smsClear();
              const retdata = retSmplJoin.data.data;
              this.webIdList = retdata.webIdInqListDto;
              const webId = this.webIdList[0].webId;
              const sWebId = this.form.webId;
              const snsTypeNm = this.webIdList[0].snsTypeNm;
              if (this.webIdList.length > 0 && !StringUtils.isEmpty(webId)) {
                this.$gsdialog.alert('인증이 완료되었습니다.', { html: true }).then(dialog =>{
                  this.$store.state.cu.custNo = this.webIdList[0].custNo;
                  this.$store.state.cu.webId = sWebId;
                  sessionStorage.setItem('tmpWebId', webId);
                  this.form.chkKey = '';
                  this.smsClear();
                  this.setTime.resTimeData = '';
                  this.disabledEv.isButtonAuthChkPw = true;
                  document.getElementById('authChk2').className =
                    'btn-input lightgreen';
                  this.popupAction('popupTemporaryPasswordChange');
                });
              } else {
                sessionStorage.removeItem('chkKey');
                this.disabledEv.isButtonAuthChkPw = true;
                this.hpCertiChk.autChkPw = '인증번호 전송';
                this.form.custNm2 = '';
                this.form.hpendPw = '';
                this.form.chkKey = '';
                this.form.webId = '';
                this.smsClear();
                this.setTime.resTimeData = '';
                this.disabledEv.isButtonAuthPw = true;
                document.getElementById('auth2').className =
                  'btn-input lightgreen';
                document.getElementById('authChk2').className =
                  'btn-input lightgreen';
                this.$gsdialog.alert(
                  '고객님은 아이디 등록이 필요합니다.<br/>회원가입 > 휴대폰본인인증으로 아이디를 등록해주세요.', { html: true }
                );
              }
            } else {
              this.smsClear();
              sessionStorage.removeItem('chkKey');
              this.disabledEv.isButtonAuthChkPw = true;
              this.form.chkKey = '';
              document.getElementById('authChk2').className =
                'btn-input lightgreen';
              this.$gsdialog.alert(
                '고객님의 정보가 없습니다.<br/>입력하신 정보가 맞는지 확인해주세요', { html: true }
              );
            }
          } else {
            this.hpCertiChk.hpCerti = false;
            this.form.chkKey = '';
            this.$gsdialog.alert('인증번호가 올바르지 않습니다. 다시 확인해주세요.', { html: true });
          }
        } else {
          this.hpCertiChk.hpCerti = false;
          this.form.chkKey = '';
          this.$gsdialog.alert('인증시간이 지났습니다.<br/>다시 휴대폰 인증을 진행해주세요.', { html: true });
          sessionStorage.removeItem('chkKey');
        }
      }
    },
    chkAuth(e) {
      // 점유인증 버튼 활성화
      const value = e.target.value;
      const id = e.target.id;
      if (StringUtils.isEmpty(value)) {
        if (id == 'num1') {
          document.getElementById('auth1').className = 'btn-input lightgreen';
          this.hpCertiChk.autChkId = '인증번호 전송';
        }
        if (id == 'num2') {
          document.getElementById('authChk1').className =
            'btn-input lightgreen';
        }
        if (id == 'num1Ref') {
          document.getElementById('auth2').className = 'btn-input lightgreen';
          this.hpCertiChk.autChkPw = '인증번호 전송';
        }
        if (id == 'num2Ref') {
          document.getElementById('authChk2').className =
            'btn-input lightgreen';
        }
      } else {
        if (id == 'num1') {
          document.getElementById('auth1').className =
            'btn-input lightgreen active';
          this.disabledEv.isButtonAuthId = false;
          const reg = /[^0-9]/gi;
          e.target.value = value.replace(reg, '');
          this.form.hpendId = value.replace(reg, '');
          if (StringUtils.isEmpty(this.form.hpendId)) {
            document.getElementById('auth1').className = 'btn-input lightgreen';
          }
        }
        if (id == 'num2') {
          document.getElementById('authChk1').className =
            'btn-input lightgreen active';
          this.disabledEv.isButtonAuthChkId = false;
          const reg = /[^0-9]/gi;
          e.target.value = value.replace(reg, '');
          this.form.chkKey = value.replace(reg, '');
          if (StringUtils.isEmpty(this.form.chkKey)) {
            document.getElementById('authChk1').className =
              'btn-input lightgreen';
          }
        }
        if (id == 'num1Ref') {
          document.getElementById('auth2').className =
            'btn-input lightgreen active';
          this.disabledEv.isButtonAuthIdPw = false;
          const reg = /[^0-9]/gi;
          e.target.value = value.replace(reg, '');
          this.form.hpendPw = value.replace(reg, '');
          if (StringUtils.isEmpty(this.form.hpendPw)) {
            document.getElementById('auth2').className = 'btn-input lightgreen';
            this.hpCertiChk.autChkPw = '인증번호 전송';
          }
        }
        if (id == 'num2Ref') {
          document.getElementById('authChk2').className =
            'btn-input lightgreen active';
          this.disabledEv.isButtonAuthChkIdPw = false;
          const reg = /[^0-9]/gi;
          e.target.value = value.replace(reg, '');
          this.form.chkKey = value.replace(reg, '');
          if (StringUtils.isEmpty(this.form.chkKey)) {
            document.getElementById('authChk2').className =
              'btn-input lightgreen';
          }
        }
      }
    },
    getSelfAuthentication: function (type) {
      // 본인 인증 호출 로직 추가
      if (type == 'subKmcPw') {
          if (StringUtils.isEmpty(this.form.webId)) {
            document.getElementById('pwScEmailErr').className = 'inp-box error';
            this.form.pwScEmailMsg = '아이디(이메일)를 입력해주세요.';
            return false;
          } else if (!StringUtils.isEmpty(this.form.webId)) {
            const tmpWebId = this.form.webId;
            // 값은 있으나 이메일 형식일경우
            if (tmpWebId.indexOf('@') != -1) {
              const regExpHp = /^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*.[a-z]{2,3}$/i;
              if (regExpHp.test(tmpWebId) == false) {
                document.getElementById('pwScEmailErr').className =
                  'inp-box error';
                this.form.pwScEmailMsg = '이메일 형식이 올바르지 않습니다.';
                return false;
              } else {
                document.getElementById('pwScEmailErr').className = 'inp-box';
                this.form.pwScEmailMsg = '';
              }
            } else {
              document.getElementById('pwScEmailErr').className = 'inp-box';
              this.form.pwScEmailMsg = '';
            }
          }
      }
      // KMC 본인확인 호출
      this.$gsdialog.alert('본인 확인을 위하여</br>휴대폰 본인인증을 진행합니다', { html: true }).then(dialog =>{
      sessionStorage.setItem('webId', this.form.webId);
      const mall = CookieUtils.getMallId();
      const cmmSteId = CookieUtils.getCmmSteId();
      const certType = { certType: 'C', mallId: mall, mobType: 'M', cmmSteId: cmmSteId }; // 모바일 화면은 M , PC 화면은 P
      ApiUtils.get('/fo/cu/loginmgnt/self-certification-check', certType)
        .then(res => {
          if (res.data === null) {
            console.error(res.data.msg);
            this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.', { html: true });
            return;
          } else {
            this.self = res.data.data;
          }
        })
        .then(res => {
          const kmcIsWindow = '';
          const UserAgent = window.navigator.userAgent;
          const dvcId = localStorage.getItem('deviceId');
          console.log('UserAgent', UserAgent);

          // 모바일 접근 체크
          // 모바일일 경우 (변동사항 있을경우 추가 필요)
          if (!StringUtils.isEmpty(dvcId)) {
            const popupX = CuUtils.popupX('500');
            const popupY = CuUtils.popupY('600');
            window.open(
              '',
              'kmcIsWindow',
              'width=500, height=600, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=' +
                popupX +
                ', top=' +
                popupY
            );

            if (type != 'subKmcPw') {
              subKmc.target = 'kmcIsWindow';
            } else {
              subKmcPw.target = 'kmcIsWindow';
            }
          } else {
            if (
              UserAgent.match(
                /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
              ) != null ||
              UserAgent.match(/LG|SAMSUNG|Samsung/) != null
            ) {
              // 모바일웹 리턴 URL 추가
              if (type != 'subKmcPw') {
                subKmc.target = '';
                localStorage.setItem('reUrl', '/cu/find_id_password/1');
              } else {
                subKmcPw.target = '';
                localStorage.setItem('reUrl', '/cu/find_id_password/2');
              }
            } else {
              const popupX = CuUtils.popupX('500');
              const popupY = CuUtils.popupY('600');
              window.open(
                '',
                'kmcIsWindow',
                'width=500, height=600, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=' +
                  popupX +
                  ', top=' +
                  popupY
              );
              if (type != 'subKmcPw') {
                subKmc.target = 'kmcIsWindow';
              } else {
                subKmcPw.target = 'kmcIsWindow';
              }
            }
          }
          if (type != 'subKmcPw') {
            subKmc.action = 'https://www.kmcert.com/kmcis/web/kmcisReq.jsp';
            subKmc.submit();
          } else {
            subKmcPw.action = 'https://www.kmcert.com/kmcis/web/kmcisReq.jsp';
            subKmcPw.submit();
          }
        });
      });
    },
    getSelfCertif: function(strRecCert, strCertNum, callBack) {
      const date = {
        certType: 'B',
        rec_cert: strRecCert,
        certNum: strCertNum,
      };
      const sWebId = sessionStorage.getItem('webId');
      const sReqGbn = sessionStorage.getItem('reqGbn');
      const vm = this;
      ApiUtils.get('/fo/cu/loginmgnt/self-certification-check', date, {
        'Content-Type': 'application/json',
      }).then(res => {
        if (res.data === null) {
          console.error(res.data.msg);
          this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.', { html: true });
          return;
        } else {
          if (res.data.data.resultCode === '00000') {
            // KMC 인증 완료
            const uesrChk = {
              webId: sWebId,
              ipinCiCode: res.data.data.ci,
              custNm: res.data.data.name,
              moblTelNo: res.data.data.phoneNo,
              mallId: CookieUtils.getMallId(),
              cmmSteId: CookieUtils.getCmmSteId(),
              mdaType: CookieUtils.getMdaType(),
              domail: CookieUtils.getDomain(),
              chanlId: CookieUtils.getChanlId(),
            };
            ApiUtils.get('/fo/cu/loginmgnt/web-id', uesrChk, {
              'Content-Type': 'application/json',
            }) // 본인인증 아이디찾기
              .then(res => {
                if (res.data === null) {
                  console.error(res.data.msg);
                  this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.', { html: true });
                  return;
                } else {
                  if (res.data.data.resultCode == '00000') {
                    // 정상 회원
                    this.$gsdialog.alert('인증이 완료되었습니다.', { html: true }).then(dialog =>{
                      const retdata = res.data.data;
                      this.webIdList = retdata.webIdInqListDto;
                      const webId = this.webIdList[0].webId;
                      if (this.webIdList.length > 0) {
                        if (StringUtils.isEmpty(sWebId)) {
                          // 아이디 찾기
                          sessionStorage.removeItem('webId');
                          sessionStorage.setItem(
                            'webIdList',
                            JSON.stringify(this.webIdList)
                          );
                          this.form.chkKey = '';
                          this.smsClear();
                          this.setTime.resTimeData = '';
                          this.disabledEv.isButtonAuthChkId = true;
                          // document.getElementById('authChk1').className = 'btn-input lightgreen';
                          this.$router.push('/cu/find_id_reslt');
                        } else {
                          this.$store.state.cu.custNo = this.webIdList[0].custNo;
                          this.$store.state.cu.webId = sWebId;
                          sessionStorage.setItem('tmpWebId', webId);
                          this.form.chkKey = '';
                          this.smsClear();
                          this.setTime.resTimeData = '';
                          this.disabledEv.isButtonAuthChkPw = true;
                          // document.getElementById('authChk2').className = 'btn-input lightgreen';
                          this.popupAction('popupTemporaryPasswordChange');
                        }
                      } else {
                        this.$gsdialog.alert(
                          '고객님의 정보가 없습니다.</br>입력하신 정보가 맞는지 확인해주세요', { html: true }
                        );
                      }
                    });
                  } else if (res.data.data.resultCode == 'R7002') {
                    // 오프라인 회원
                    this.$gsdialog.alert(
                      '고객님은 아이디 등록이 필요합니다.</br>회원가입 > 휴대폰본인인증으로 아이디를 등록해주세요.', { html: true }
                    ).then(dialog =>{
                    this.$router.push('/cu/join_member');
                    // const retdata = res.data.data;
                    // this.webIdList = retdata.webIdInqListDto;
                    // this.$store.state.cu.custNo = this.webIdList[0].custNoEncKey;
                    // this.$store.state.cu.gsrContract1 = this.webIdList[0].gsrContract1;
                    // this.$router.push('/cu/pop_offline_member');
                    });
                  } else {
                    this.$gsdialog.alert(
                      '고객님의 정보가 없습니다.</br>입력하신 정보가 맞는지 확인해주세요', { html: true }
                    );
                  }

                  if (callBack) {
                    callBack();
                  }
                }
              });
          } else {
            this.$gsdialog.alert(res.data.data.resultMessage, { html: true });
          }
        }
      });
    },
    getPressName(e) {
      const vm = this;
      const value = e.target.value;
      const id = e.target.id;
      // const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi;
      const reg = /[0-9<>(){}[\]\-_=+|\/\\'\;.,:\"`~!?@#$%^&*]/gi;
      const tmp = value.replace(reg, '');
      const tmpValue = tmp.slice(0, 50);
      if (id == 'name') {
        e.target.value = tmpValue;
        vm.form.custNm = tmpValue;
      } else if (id == 'nameRef') {
        e.target.value = tmpValue;
        vm.form.custNm2 = tmpValue;
      }
    },
    getPressId(e) {
      const vm = this;
      const value = e.target.value;
      const id = e.target.id;
      const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi;
      // const reg = /[a-zA-Z0-9<>(){}[\]\-_=+|\/\\'\;.:\"`~!?@#$%^&*]/gi;
      if (id == 'email') {
        e.target.value = value.replace(reg, '');
        vm.form.webId = value.replace(reg, '');
      } else if (id == 'email2') {
        e.target.value = value.replace(reg, '');
        vm.form.webId = value.replace(reg, '');
      }
    },
  },
  updated() {},
};
</script>
<style lang="scss">
</style>
