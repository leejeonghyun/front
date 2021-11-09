<!--
Design: views/cu/SC-FO-CU-GF-MS-012
Pg id:
Uri: /cu/join_member_emaildetail
-->
<template>
  <div class="wrap-signup" v-bind:class="[siteClass, {'integrate-member__wrap' : siteClass == 'marketfor'}]">
    <SubDefaultHeader headerText="회원가입" searchBtnBottom="true" :toBskt="true" :tabbar="false" :prevHomeType="true" />
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="signup-wrap">
        <div class="inner">
          <fieldset class="warp-input-txt">
            <legend>회원가입정보 입력</legend>
            <div class="inp-box" id="nameErr">
              <!-- 입력 오류일 경우 error 클래스 추가 -->
              <label for="name" class="hidden">이름</label>
              <input
                type="text"
                id="name"
                ref="name"
                class="inp-txt w100"
                value
                v-model="form.custNm"
                placeholder="이름"
                @blur="getChkValue($event)"
                @change="eachChangeChk()"
                @keyup="getPressName($event)"
              />
              <!-- <button class="btn-reset" @click="getBtnClear('name')" ><span class="hidden">입력 초기화</span></button> -->
              <span class="txt-error">{{ form.nameMsg }}</span>
              <!-- 미입력시 MSG -->
            </div>
            <!-- 수정 START : 2020.02.21 마크업 수정 -->
            <div class="inp-box wrap-inp-select" id="emailErr">
              <!-- 입력 오류일 경우 error 클래스 추가 -->
              <label for="id" class="hidden">아이디(이메일주소)</label>
              <input
                type="email"
                id="email"
                ref="email"
                class="inp-txt"
                autocapitalize="off"
                value
                v-model="form.email"
                placeholder="아이디(이메일주소)"
                @blur="getChkValue($event)"
                @change="eachChangeChk()"
                @keyup="getPressId($event)"
              />
              <span class="at">@</span>
              <SelectUIInput
                id="emailSite"
                ref="emailSite"
                :type="'list'"
                :selectData="select.list"
                @selectEvent="selectAction"
                v-model="form.emailSite"
                @changeEvent="changeSelectAction"
              />
              <span class="txt-error">{{ form.emailMsg }}</span>
              <!-- 미입력시 MSG -->
              <!-- <span class="txt-error">이메일을 입력해주세요.</span>  미입력시 MSG -->
              <!-- <span class="txt-error">올바른 이메일 주소를 입력해주세요.</span> 입력규칙 오류시 MSG -->
              <!-- <span class="txt-error">이미 사용중인 이메일입니다. 다시 확인해주세요.</span> 중복 이메일 MSG -->
            </div>
            <!-- 수정 END : 2020.02.21 마크업 수정 -->
            <div class="inp-box" id="pwErr">
              <!-- 입력 오류일 경우 error 클래스 추가 -->
              <label for="password" class="hidden">비밀번호를 입력해주세요</label>
              <input
                type="password"
                id="password"
                ref="password"
                class="inp-txt w100"
                value
                v-model="form.webPwd"
                @blur="getChkValue($event)"
                placeholder="비밀번호를 입력해주세요"
                @change="eachChangeChk()"
              />
              <!-- <button class="btn-reset" @click="getBtnClear('password')" ><span class="hidden">입력 초기화</span></button> -->
              <span class="txt-error">{{ form.passwordMsg }}</span>
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
                v-model="form.webPwd2"
                @blur="getChkValue($event)"
                placeholder="비밀번호를 한번 더 입력해주세요"
                @change="eachChangeChk()"
              />
              <!-- <button class="btn-reset" @click="getBtnClear('password2')" ><span class="hidden">입력 초기화</span></button> -->
              <span class="txt-error">{{ form.password2Msg }}</span>
              <!-- 미입력시 MSG -->
              <!-- <span class="txt-error">비밀번호를 다시 한번 입력해주세요.</span> 미입력시 MSG -->
              <!-- <span class="txt-error">입력하신 비밀번호와 동일하지 않습니다.</span> 비밀번호와 불일치시 MSG -->
            </div>
            <div class="wrap-inp-btn selectbox" id="num1Err">
              <div class="wrap-select">
                <label for="phoneNumber" class="hidden">휴대폰번호 앞자리 선택</label>
                <select
                  id="phoneNumber"
                  v-model="form.hpsta"
                  v-bind:disabled="disabledEv.isButtonAuth"
                >
                  <option
                    v-for="CU0005 in CU0005S"
                    v-bind:key="CU0005.commCd"
                    v-bind:CU0005="CU0005"
                    v-bind:value="CU0005.commCd"
                  >{{ CU0005.commCd }}</option>
                </select>
              </div>
              <div class="inp-box">
                <label for="num1" class="hidden">휴대전화번호'-'없이 입력</label>
                <input
                  type="text"
                  id="num1"
                  ref="num1"
                  class="inp-txt w100"
                  value
                  maxlength="8"
                  v-model="form.hpend"
                  placeholder="휴대전화번호'-'없이 입력"
                  @keyup="chkAuth($event)"
                  @blur="getChkValue($event)"
                  v-bind:disabled="disabledEv.isButtonAuth"
                />
                <!-- <button class="btn-reset" @click="getBtnClear('hp')"><span class="hidden">입력 초기화</span></button> -->
              </div>
              <button
                id="auth"
                class="btn-input lightgreen"
                @click="getHpAuthentication()"
                v-bind:disabled="disabledEv.isButtonAuth"
              >{{ hpCertiChk.autChk }}</button>
              <!-- 수정 : 2020.02.20 gsfresh class 수정 gray-->
              <span class="txt-error">{{ form.num1Msg }}</span>
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
                  v-bind:disabled="disabledEv.isButtonAuthChk"
                  value
                  v-model="form.chkKey"
                  placeholder="인증번호를 입력해주세요"
                  maxlength="6"
                  @change="eachChangeChk()"
                  @keyup="chkAuth($event)"
                />
                <p class="txt-time">
                  <span aria-label="인증번호 입력 남은 시간">{{ setTime.resTimeData }}</span>
                </p>
                <span class="txt-error">{{ form.num2Msg }}</span>
                <!-- 미입력시 MSG -->
              </div>
              <button
                id="authChk"
                class="btn-input lightgreen"
                @click="getAuthentication()"
                v-bind:disabled="disabledEv.isButtonAuthChk"
              >인증번호 확인</button>
              <!-- 수정 : 2020.02.20 gsfresh class 수정 -->
            </div>
          </fieldset>
          <!-- START : 약관동의 -->
          <div class="wrap-agreement">
            <div class="wrap-inp-chk" id="age14Err">
              <!-- 미동의일 경우 error 클래스 추가 -->
              <div class="inp-chk bg">
                <input
                  type="checkbox"
                  name
                  id="chkList0221"
                  ref="age14"
                  value
                  v-model="form.age14"
                  @change="eachChangeChk()"
                />
                <!-- 수정 START : 2020.02.20 마침표 삭제 -->
                <label for="chkList0221">만 14세 이상입니다</label>
                <!-- 수정 END : 2020.02.20 마침표 삭제 -->
              </div>
              <span class="txt-error">동의해주세요.</span>
            </div>
            <div class="wrap-inp-chk area-top">
              <p class="inp-chk all bg">
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
                  <label for="chkList022">Market For 간편회원 이용약관 (필수)</label>
                  <button
                    type="button"
                    class="btn-arrow right gray"
                    @click="
                      popupAction(
                        'popupGSfreshMemberTerms',
                        'Market For 간편회원 이용약관 (필수)',
                        'R081'
                      )
                    "
                  >
                    <span class="hidden">약관자세히보기</span>
                  </button>
                </div>
                <span class="txt-error">{{ form.agree1Msg }}</span>
                <!-- <span class="txt-error">GS 프레시몰 간편회원 이용약관에 동의해주세요.</span> -->
              </div>
              <div class="wrap-inp-chk" id="agree2Err">
                <!-- 미동의일 경우 error 클래스 추가 -->
                <div class="inp-chk type02 small error">
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
                <span class="txt-error">{{ form.agree2Msg }}</span>
                <!-- <span class="txt-error">개인정보 수집, 이용동의에 동의해주세요.</span> -->
                <ul class="wrap-list-agree">
                  <li>
                    <button
                      type="button"
                      class="btn-arrow gray right"
                      @click="
                        popupAction(
                          'popupGSfreshMemberTerms',
                          '수집하는 개인정보 항목 및 이용목적',
                          'R021'
                        )
                      "
                    >수집하는 개인정보 항목 및 이용목적</button>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="btn-arrow gray right"
                      @click="
                        popupAction(
                          'popupGSfreshMemberTerms',
                          '보유기간 및 파기',
                          'R022'
                        )
                      "
                    >보유기간 및 파기</button>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="btn-arrow gray right"
                      @click="
                        popupAction(
                          'popupGSfreshMemberTerms',
                          '개인정보 처리위탁 동의',
                          'R031'
                        )
                      "
                    >개인정보 처리위탁 동의</button>
                  </li>
                </ul>
              </div>
              <div class="wrap-inp-chk">
                <div class="inp-chk type02 small">
                  <input
                    type="checkbox"
                    name="chkList"
                    id="chkList077"
                    v-model="form.agree3"
                    value
                    @change="eachChangeChk()"
                  />
                  <label for="chkList077">개인정보 제3자 제공동의 (선택)</label>
                  <button
                    type="button"
                    class="btn-arrow right gray"
                    @click="
                      popupAction(
                        'popupGSfreshMemberTerms',
                        '개인정보 제3자 제공동의 (선택)',
                        'R041'
                      )
                    "
                  >
                    <span class="hidden">약관자세히보기</span>
                  </button>
                </div>
              </div>
              <div class="wrap-inp-chk">
                <div class="inp-chk type02 small">
                  <input
                    type="checkbox"
                    name="chkList"
                    id="chkList088"
                    v-model="form.agree4"
                    value
                    @change="allEvChkBox()"
                  />
                  <label for="chkList088">할인쿠폰, 이벤트 등 혜택 광고 정보수신 (선택)</label>
                </div>
              </div>
              <div class="wrap-inp-chk">
                <div class="wrap-inp-chk-type02">
                  <div class="inp-chk small bg">
                    <input
                      type="checkbox"
                      name="chkList"
                      id="chkList099"
                      v-model="form.smsRcvYn"
                      value
                      @change="eachChangeChk()"
                    />
                    <label for="chkList099">SMS</label>
                  </div>
                  <div class="inp-chk small bg">
                    <input
                      type="checkbox"
                      name="chkList"
                      id="chkList01010"
                      v-model="form.emailRcvYn"
                      value
                      @change="eachChangeChk()"
                    />
                    <label for="chkList01010">이메일</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PopupGSfreshMemberTerms
            @popupEvent="popupAction"
            v-if="this.popup.popupGSfreshMemberTerms"
            :title="popup.title"
            :code="popup.code"
          />
          <!-- 팝업 GS 프레시몰 회원약관 -->
          <PopupSignUpGSfinish @popupEvent="popupAction" v-if="this.popup.popupSignUpGSfinish" mbrJoinMethod="email" />
          <!-- 팝업 회원가입완료-->
          <!-- END : 약관동의 -->
          <div class="btn-area">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label="바로가기"
              class="btn-lg btn-bg lightgreen btn-login"
              @click="getSmplJoinMember"
              v-bind:disabled="disabledEv.isButtonJoin"
            >
              <span>가입하기</span>
            </button>
          </div>
        </div>
      </div>
    </main>
    <!-- 4월 수정 START : 푸터 추가 -->
    <Footer />
    <!-- 4월 수정 END : 푸터 추가 -->
    <Loading v-show="loading > 0" />
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import AccordionMixin from '@/mixins/AccordionMixin';
import Footer from '@/components/common/Footer'; // 푸터
// import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import SelectUIInput from '@/components/common/SelectUIInput'; // 이메일 selectbox / 수정 : 2020.02.21 추가
import PopupGSfreshMemberTerms from '@/views/cu/mbrmgnt/PopupGSfreshMemberTerms'; // GS 프레시몰 회원약관
import PopupSignUpGSfinish from '@/views/cu/mbrmgnt/PopupSignUpGSfinish'; // 회원가입팝업
import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import JwtUtils from '@/common/JwtUtils';
import Tracker from '@/common/Tracker';
import CuUtils from '@/common/cu/CuUtils';
import Loading from '@/components/common/Loading';

export default {
  name: 'SignUpEmail',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '간편회원 < 회원가입 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '회원가입^이메일 간편회원',
      },
    ],
  },
  components: {
    SubDefaultHeader, // 헤더.
    Footer,
    SelectUIInput, // 수정 : 2020.02.21 추가
    PopupGSfreshMemberTerms,
    PopupSignUpGSfinish,
    Loading,
  },
  mixins: [AccordionMixin],
  data() {
    return {
      form: {
        custNm: '',
        hpsta: '010',
        hpend: '',
        tmpHp: '',
        webPwd: '',
        webPwd2: '',
        email: '',
        emailSite: 'naver.com',
        age14: false,
        chkList011: false,
        chkList088: false,
        agree1: false,
        agree2: false,
        agree3: false,
        agree4: false,
        smsRcvYn: false,
        emailRcvYn: false,
        popYn: false,
        chkKey: '',
        agree: '',
        nameMsg: '',
        emailMsg: '',
        passwordMsg: '',
        password2Msg: '',
        num1Msg: '',
        num2Msg: '',
        agree1Msg: '',
        agree2Msg: '',
        allChk: false,
      },
      CU0005S: [],
      tmpForm: {
        joinRcmdName: '',
      },
      hpCertiChk: {
        hpCerti: false,
        autChk: '인증번호 전송',
      },
      setTime: {
        timeCounter: 180,
        polling: null,
        chkTime: 'Y',
        resTimeData: '',
      },
      // 수정 START : 2020.02.21 추가
      select: {
        list: {
          // 정렬 - 상품정보
          open: false,
          selected: 'naver.com',
        },
      },
      // 수정 END : 2020.02.21 추가.
      popup: {
        // 팝업
        open: false,
        popupGSfreshMemberTerms: false,
        popupSignUpGSfinish: false,
        title: '',
        code: '',
      },
      disabledEv: {
        isButtonJoin: true,
        isButtonAuthChk: true,
        isButtonAuth: false,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      storeItemsData: [],
      siteClass: '',
      disabledEntry: false, // 인증
      doubleClickFlag: true,
      odBsktUuid: CookieUtils.getOdBsktUuid(),
      loading: 0,
    };
  },
  methods: {
    doubleClickCheck: function() {
      if (this.doubleClickFlag) {
        this.doubleClickFlag = false;
        return true;
      } else {
        return false;
      }
    },
    setDisabledEntry(disabledEntry) {
      this.disabledEntry = disabledEntry;
    },
    popupAction(type, title, code) {
      // 팝업 활성/비활성
      this.popup.title = title;
      this.popup.code = code;
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    // 수정 START : 2020.02.21 추가
    selectAction(type) {
      // 리스트, 이메일 selectbox 활성화
      if (!this.select[type].open) {
        Object.keys(this.select).map(select => {
          this.select[select].open = false;
        });
      }
      this.select[type] = Object.assign({}, this.select[type], {
        open: !this.select[type].open,
      });
    },
    changeSelectAction(type, selectedData) {
      // 리스트, 이메일 selectbox 정렬 변경
      this.select[type] = Object.assign({}, this.select[type], {
        open: false,
        selected: selectedData,
      });
    },
    // 수정 END : 2020.02.21 추가
    // 간편회원가입
    async getSmplJoinMember() {
      if (!this.doubleClickCheck()) {
        console.log('double click!');
        return;
      }

      if (!StringUtils.isEmpty(sessionStorage.getItem('rcmd'))) {
        this.tmpForm.joinRcmdName = sessionStorage.getItem('rcmd');
        sessionStorage.removeItem('rcmd');
      }
      if (!this.getValidationCheck()) {
        this.doubleClickFlag = true;
        return;
      }
      if (!this.getValidationAgreeCheck()) {
        this.doubleClickFlag = true;
        return;
      }

      const member = {
        custNm: this.form.custNm,
        hpsta: this.form.hpsta,
        hpend: this.form.hpend,
        tmpHp: this.form.tmpHp,
        webPwd: encodeURI(this.form.webPwd),
        webPwd2: encodeURI(this.form.webPwd2),
        email: this.form.email,
        emailSite: this.form.emailSite,
        chkList011: this.form.chkList011,
        agree1: this.form.agree1,
        agree2: this.form.agree2,
        agree3: this.form.agree3,
        smsRcvYn: this.form.smsRcvYn,
        emailRcvYn: this.form.emailRcvYn,
        chkKey: this.form.chkKey,
        chanlId: CookieUtils.getChanlId(),
        mdaType: CookieUtils.getMdaType(),
        mallId: CookieUtils.getMallId(),
        cmmSteId: CookieUtils.getCmmSteId(),
        joinRcmdName: this.tmpForm.joinRcmdName,
      };
      this.loading++;
      const res = await ApiUtils.post('/fo/cu/mbrmgnt/commerce-simple-member-web-id', member, { 'Content-Type': 'application/json' });
      this.loading--;
      if (res.data === null) {
        console.error(res.data.msg);
        this.$gsdialog.alert('죄송합니다. 회원 가입이 처리되지 않았습니다.</br>고객센터로 문의주세요.', { html: true });
        this.doubleClickFlag = true;
        return;
      } else {
        if (res.data.success === true) {
          const data = res.data.data;
          const refreshToken = data.jwtRslt.refreshToken;
          JwtUtils.saveRefreshToken(refreshToken);
          JwtUtils.saveIdToken(data.jwtRslt.idToken);
          JwtUtils.saveEncVal(res.data.data.ENC_VAL);

          Tracker.loginSuccess(data.userRslt.custNo);
          const user = res.data.data.userRslt;
          CookieUtils.setLoginCookies(user);

          // 최근본상품 등록
          const storeItems = JSON.parse(localStorage.getItem('mbrInqItemList'));
          if (!StringUtils.isEmpty(storeItems)) {
            this.storeItemsData = storeItems;
            for (let i = 0; i < this.storeItemsData.length; i++) {
              const params = {
                itemId: this.storeItemsData[i].itemId,
                mallId: CookieUtils.getMallId(),
              };
              try {
                this.loading++;
                const response = await ApiUtils.post(
                  '/fo/md/itemaddinfomgnt/mbr-inquire-item',
                  params
                );
                this.loading--;
                console.log(
                  'mbr-inquire-item response.data :: ' + response.data.success
                );
                storeItems.splice(rowSeq, i + 1);
                localStorage.setItem(
                  'mbrInqItemList',
                  JSON.stringify(storeItems)
                );
              } catch (e) {
                console.log(e);
              }
            }
          }
          // APP 로그인 경우
          const dvcId = localStorage.getItem("deviceId");
          if (!StringUtils.isEmpty(dvcId)) {
            const autoLoginGbn = 'N';
            let autoLoginCertValChk = '';
            const devData = {
              cmmSteId: CookieUtils.getCmmSteId(),
              dvcId: dvcId,
              autoLoginYn: autoLoginGbn
            };
            this.loading++;
            const resDev = await ApiUtils.put('/fo/cm/appmgnt/device', devData);
            this.loading--;
            if (resDev.data === null) {
              this.$gsdialog.alert('앱 정보 저장 오류', { html: true });
              this.doubleClickFlag = true;
              return;
            } else {
              if (resDev.data.success === true) {
                const data = resDev.data.data;
                autoLoginCertValChk = data.autoLoginCertVal;
                const certData = {
                  dvcId: dvcId,
                  autoLoginCertVal: data.autoLoginCertVal,
                  autoLoginYn: autoLoginGbn,
                  refreshToken: refreshToken,
                };
                window.appCallLoginComplete(certData);
              }
            }
            const autoData = {
                dvcId: dvcId,
                autoLoginCertVal: autoLoginCertValChk,
                cmmSteId: CookieUtils.getCmmSteId(),
                autoLoginYn: autoLoginGbn,
            };
            this.loading++;
            const resAuto = await ApiUtils.post('/fo/cu/loginmgnt/app-auto-login-registration', autoData);
            this.loading--;
            if (resAuto.data === null) {
              this.$gsdialog.alert('오류', { html: true });
              this.doubleClickFlag = true;
              return;
            }
          }
          // 비로그인 장바구니
          try {
            this.loading++;
            const response = await ApiUtils.post(
              '/fo/od/bsktmgnt/bskt-merge',
              this.odBsktUuid
            );
            this.loading--;
            console.log('/fo/od/bsktmgnt/bskt-merge :: ' + response.data.success);
          } catch (e) {
            console.log(e);
          }

          // 회원혜택지급처리
          try {
            const mbrBenedata = {
              custNo: data.userRslt.custNo,
              cmmMbrNo: data.userRslt.cmmMbrNo,
            };
            this.loading++;
            ApiUtils.post(
              '/fo/cu/mbrmgnt/member-benefit-provide',
              mbrBenedata
            ).then((response) => {
              console.log(
                '/fo/cu/mbrmgnt/member-benefit-provide:: ' +
                  response.data.success
              );
            });
            this.loading--;
          } catch (e) {
            console.log(e);
          }

          const mall = CookieUtils.getMallId();
          if (mall === '1') {
            // 1:gsfresh, 11:dalisalda
            this.popupAction('popupSignUpGSfinish');
            // } else if (mall === '11') {
          } else {
            // this.$router.push('/cu/pbms_join/11');
            this.$router.push({
              path: '/cu/pbms_join/11',
              query: { mbrJoinMethod: 'email' }
            });
          }
        } else {
          this.doubleClickFlag = true;
          this.$gsdialog.alert(res.data.data.resultMessage, { html: true });
          return;
        }
      }
    },
    allCheckedBox() {
      if (this.form.allChk == true) {
        this.form.agree1 = true;
        this.form.agree2 = true;
        this.form.agree3 = true;
        this.form.agree4 = true;
        this.form.smsRcvYn = true;
        this.form.emailRcvYn = true;
        document.getElementById('agreement').click();
      } else if (this.form.allChk == false) {
        this.form.agree1 = false;
        this.form.agree2 = false;
        this.form.agree3 = false;
        this.form.agree4 = false;
        this.form.smsRcvYn = false;
        this.form.emailRcvYn = false;
        document.getElementById('agreement').click();
      }
      this.eachChangeChk();
    },
    allEvChkBox() {
      if (this.form.agree4 == true) {
        this.form.smsRcvYn = true;
        this.form.emailRcvYn = true;
      } else if (this.form.agree4 == false) {
        this.form.smsRcvYn = false;
        this.form.emailRcvYn = false;
      }
      this.eachChangeChk();
    },
    eachChangeChk() {
      this.form.emailSite = this.select['list'].selected;
      // 항목 입력 확인 이벤트
      if (
        !StringUtils.isEmpty(this.form.custNm) &&
        !StringUtils.isEmpty(this.form.hpsta) &&
        !StringUtils.isEmpty(this.form.hpend) &&
        !StringUtils.isEmpty(this.form.webPwd) &&
        !StringUtils.isEmpty(this.form.webPwd2) &&
        !StringUtils.isEmpty(this.form.email) &&
        !StringUtils.isEmpty(this.form.emailSite) &&
        StringUtils.isEmpty(this.form.nameMsg) &&
        StringUtils.isEmpty(this.form.emailMsg) &&
        StringUtils.isEmpty(this.form.passwordMsg) &&
        StringUtils.isEmpty(this.form.password2Msg) &&
        StringUtils.isEmpty(this.form.num1Msg) &&
        StringUtils.isEmpty(this.form.num2Msg) &&
        StringUtils.isEmpty(this.form.agree1Msg) &&
        StringUtils.isEmpty(this.form.agree2Msg) &&
        this.hpCertiChk.hpCerti &&
        this.form.age14 &&
        this.form.agree1 &&
        this.form.agree2
      ) {
        this.disabledEv.isButtonJoin = false;
      } else {
        this.disabledEv.isButtonJoin = true;
      }
      // 약관 전체동의 체크 변경 2
      if (!this.form.smsRcvYn || !this.form.emailRcvYn) {
        this.form.agree4 = false;
      }
      if (this.form.smsRcvYn && this.form.emailRcvYn) {
        this.form.agree4 = true;
      }
      // 약관 전체동의 체크 변경 3
      if (
        !this.form.agree1 ||
        !this.form.agree2 ||
        !this.form.agree3 ||
        !this.form.agree4 ||
        !this.form.smsRcvYn ||
        !this.form.emailRcvYn
      ) {
        this.form.allChk = false;
      }
      if (
        this.form.agree1 &&
        this.form.agree2 &&
        this.form.agree3 &&
        this.form.agree4 &&
        this.form.smsRcvYn &&
        this.form.emailRcvYn
      ) {
        this.form.allChk = true;
      }
    },
    chkAuth(e) {
      // 점유인증 버튼 활성화
      const value = e.target.value;
      const id = e.target.id;
      if (StringUtils.isEmpty(value)) {
        if (id == 'num1') {
          document.getElementById('auth').className = 'btn-input lightgreen';
          this.hpCertiChk.autChk = '인증번호 전송';
        }
        if (id == 'num2') {
          document.getElementById('authChk').className = 'btn-input lightgreen';
        }
      } else {
        if (id == 'num1') {
          document.getElementById('auth').className =
            'btn-input lightgreen active';
          this.disabledEv.isButtonAuth = false;
          const reg = /[^0-9]/gi;
          e.target.value = value.replace(reg, '');
          this.form.hpend = value.replace(reg, '');
          if (StringUtils.isEmpty(this.form.hpend)) {
            document.getElementById('auth').className = 'btn-input lightgreen';
          }
        }
        if (id == 'num2') {
          document.getElementById('authChk').className =
            'btn-input lightgreen active';
          this.disabledEv.isButtonAuthChk = false;
          const reg = /[^0-9]/gi;
          e.target.value = value.replace(reg, '');
          this.form.chkKey = value.replace(reg, '');
          if (StringUtils.isEmpty(this.form.chkKey)) {
            document.getElementById('authChk').className =
              'btn-input lightgreen';
          }
        }
      }
      this.eachChangeChk();
    },
    // 인증번호 전송
    async getHpAuthentication() {
      const tmpHp = this;
      if (StringUtils.isEmpty(tmpHp.form.hpend)) {
        document.getElementById('num1Err').className =
          'wrap-inp-btn selectbox error';
        tmpHp.form.num1Msg = '휴대폰번호 입력해주세요.';
        return false;
      } else {
        document.getElementById('num1Err').className = 'wrap-inp-btn selectbox';
        tmpHp.form.num1Msg = '';
      }

      const email = tmpHp.form.email + '@' + tmpHp.form.emailSite;
      const hp = tmpHp.form.hpsta + tmpHp.form.hpend;
      const smplJoinData = {
        webId: email,
        custNm: tmpHp.form.custNm,
        moblTelNo: hp,
      };

      // const retSmplJoin = await ApiUtils.get('/fo/cu/mbrmgnt/commerce-simple-member-join-possible-yesorno', smplJoinData, this.headers);
      // if (retSmplJoin.data.data.resultCode === '00000') {
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
        let msg = '인증번호를 발송하였습니다.';

        if (process.env.VUE_APP_MODE !== 'production') {
          msg += ret.data.data.hpCode;
        }

        this.$gsdialog.alert(msg, { html: true }).then(dialog => {
        const timeCnt = this.setTime.timeCounter;
        if (timeCnt === 180) {
          this.hpCertiChk.autChk = '재전송';
          this.disabledEv.isButtonAuthChk = false;
          this.hpCertiChk.hpCerti = false;
          this.form.chkKey = '';
          document.getElementById('authChk').className =
            'btn-input lightgreen active';
          tmpHp.start();
        } else {
          this.hpCertiChk.autChk = '재전송';
          this.form.chkKey = '';
          this.disabledEv.isButtonAuthChk = false;
          this.hpCertiChk.hpCerti = false;
          document.getElementById('authChk').className =
            'btn-input lightgreen active';
          tmpHp.smsReset();
        }
        });
      } else {
        this.$gsdialog.alert(ret.data.data.resultMessage, { html: true });
      }
    },
    // 인증번호 확인
    async getAuthentication() {
      if (StringUtils.isEmpty(this.form.chkKey)) {
        this.hpCertiChk.hpCerti = false;
        this.form.chkKey = '';
        this.$gsdialog.alert('인증번호를 입력해주세요.', { html: true });
        return;
      }

      const timeCnt = this.setTime.timeCounter;
      if (timeCnt <= 0) {
        this.hpCertiChk.hpCerti = false;
        this.form.chkKey = '';
        this.$gsdialog.alert('인증시간이 지났습니다.<br/> 다시 휴대폰 인증을 진행해주세요.', { html: true });
        sessionStorage.removeItem('chkKey');
        return;
      }

      const oldkey = sessionStorage.getItem('chkKey');
      const authen = {
        oldChkKey: oldkey,
        chkKey: this.form.chkKey + this.form.hpsta + this.form.hpend,
      };

      const ret = await ApiUtils.get(
        '/fo/cu/mbrmgnt/hp-certification-check',
        authen,
        this.headers
      );

      if (ret.data.data.resultCode !== '00000') {
        this.hpCertiChk.hpCerti = false;
        this.form.chkKey = '';
        this.$gsdialog.alert('인증번호가 올바르지 않습니다. 다시 확인해주세요.', {html: true});
        return;
      }

      this.smsClear();
      this.setTime.resTimeData = '';
      this.form.chkKey = '';
      this.form.tmpHp = this.form.hpsta + this.form.hpend;
      this.hpCertiChk.hpCerti = true;
      this.disabledEv.isButtonAuth = true;
      this.disabledEv.isButtonAuthChk = true;
      document.getElementById('num2').placeholder="인증이 완료되었습니다";
      document.getElementById('auth').className = 'btn-input lightgreen';
      document.getElementById('authChk').className = 'btn-input lightgreen';
      this.eachChangeChk();
      this.$gsdialog.alert(ret.data.data.resultMessage, { html: true });
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
        // const ret = this.pad(minutes, 2) + ':' + this.pad(secondes, 2);
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
      this.setTime.resTimeData = '3:00';
    },
    smsReset: function() {
      clearInterval(this.setTime.polling);
      this.setTime.chkTime = 'Y';
      this.setTime.timeCounter = 180;
      this.start();
    },
    // 점유인증 끝
    // ValidationCheck
    getChkValue(e) {
      const vm = this;
      const value = e.target.value;
      const id = e.target.id;
      const emailRule = /^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*.[a-z]{2,3}$/i;
      // const emailRule = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$/i;
      if (id == 'num1') {
        // 이름
        if (StringUtils.isEmpty(value)) {
          document.getElementById('num1Err').className =
            'wrap-inp-btn selectbox error';
          vm.form.num1Msg = '휴대폰번호 입력해주세요.';
          return false;
        } else {
          document.getElementById('num1Err').className =
            'wrap-inp-btn selectbox';
          vm.form.num1Msg = '';
        }
      }
      const emailfull =
        document.getElementById('email').value +
        '@' +
        document.getElementsByClassName('inp-email')[0].value;
      const emailSite = vm.select['list'].selected;
      const pwd = document.getElementById('password').value;
      if (id == 'name') {
        // 이름
        if (StringUtils.isEmpty(value)) {
          document.getElementById('nameErr').className = 'inp-box error';
          vm.form.nameMsg = '이름을 입력해주세요.';
          return false;
        } else {
          document.getElementById('nameErr').className = 'inp-box';
          vm.form.nameMsg = '';
        }
      } else if (id == 'email') {
        // 이메일
        if (StringUtils.isEmpty(value)) {
          document.getElementById('emailErr').className =
            'inp-box wrap-inp-select error';
          vm.form.emailMsg = '이메일주소를 입력해주세요.';
          return false;
        } else {
          document.getElementById('emailErr').className =
            'inp-box wrap-inp-select';
          vm.form.emailMsg = '';
        }
        if (emailRule.test(emailfull) == false) {
          document.getElementById('emailErr').className =
            'inp-box wrap-inp-select error';
          vm.form.emailMsg = '올바른 이메일 주소를 입력해주세요.';
          return false;
        } else {
          document.getElementById('emailErr').className =
            'inp-box wrap-inp-select';
          vm.form.emailMsg = '';
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
        } else if (value === emailfull) {
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
          document.getElementById('pwErr').className = 'inp-box';
          vm.form.passwordMsg = '';
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
          document.getElementById('pw2Err').className = 'inp-box';
          vm.form.password2Msg = '';
        }
      }
      this.eachChangeChk();
      return true;
    },
    getValidationAgreeCheck() {
      const vm = this;
      const age14 = vm.form.age14;
      const agree1 = vm.form.agree1;
      const agree2 = vm.form.agree2;
      // 약관 동의
      if (!age14) {
        this.$gsdialog.alert('만 14세 이상에 동의해주세요.', { html: true });
        vm.$refs.age14.focus();
        return false;
      }
      if (!agree1) {
        document.getElementById('agree1Err').className = 'wrap-inp-chk error';
        vm.form.agree1Msg = 'Market For 간편회원 이용약관에 동의해주세요.';
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
      const custNm = vm.form.custNm;
      const pwd = vm.form.webPwd;
      const pwd2 = vm.form.webPwd2;
      const email = vm.form.email;
      const emailSite = vm.form.emailSite;
      // 이름
      if (StringUtils.isEmpty(StringUtils.trim(custNm))) {
        document.getElementById('nameErr').className = 'inp-box error';
        vm.form.nameMsg = '이름을 입력해주세요.';
        return false;
      } else {
        document.getElementById('nameErr').className = 'inp-box';
        vm.form.nameMsg = '';
      }
      // 이메일
      if (StringUtils.isEmpty(StringUtils.trim(email))) {
        document.getElementById('emailErr').className =
          'inp-box wrap-inp-select error';
        vm.form.emailMsg = '아이디(이메일주소)를 입력해주세요.';
        return false;
      } else if (StringUtils.isEmpty(StringUtils.trim(emailSite))) {
        document.getElementById('emailErr').className =
          'inp-box wrap-inp-select error';
        vm.form.emailMsg = '아이디(이메일주소)를 입력해주세요.';
        return false;
      } else {
        document.getElementById('emailErr').className =
          'inp-box wrap-inp-select';
        vm.form.emailMsg = '';
      }
      const emailRule = /^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*.[a-z]{2,3}$/i;
      const emailfull = email + '@' + emailSite;
      if (!emailRule.test(emailfull)) {
        document.getElementById('emailErr').className =
          'inp-box wrap-inp-select error';
        vm.form.emailMsg = '올바른 이메일 주소를 입력해주세요.';
        return false;
      } else {
        document.getElementById('emailErr').className =
          'inp-box wrap-inp-select';
        vm.form.emailMsg = '';
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
      } else if (pwd === emailfull) {
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
        vm.form.passwordMsg = '3자리 이상 동일한 비밀번호는 사용할 수 없습니다.';
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
    getPressName(e) {
      const vm = this;
      const value = e.target.value;
      const id = e.target.id;
      const reg = /[0-9<>(){}[\]\-_=+|\/\\'\;.,:\"`~!?@#$%^&*]/gi;
      const tmp = value.replace(reg, '');
      const tmpValue = tmp.slice(0, 50);
      if (id == 'name') {
        e.target.value = tmpValue;
        vm.form.custNm = tmpValue;
      }
    },
    getPressId(e) {
      const vm = this;
      const value = e.target.value;
      const id = e.target.id;
      const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi;
      if (id == 'email') {
        e.target.value = value.replace(reg, '');
        vm.form.email = value.replace(reg, '');
      }
    },
  },
  updated() {},
  mounted: function() {
    this.siteClass = CookieUtils.getSiteClass();
    const CU0005Input = {
      commGrpCd: 'CU0005',
    };
    ApiUtils.get('/fo/cm/commcdmgnt/common-codes', CU0005Input).then(CU0005 => {
      if (CU0005.data === null) {
        console.log('공통함수 오류');
        return;
      } else {
        this.CU0005S = CU0005.data.data;
      }
    });

    // 간편회원 가입 약관 확장
    document.getElementById('agreement').click();
    const form = document.getElementsByClassName('inp-email')[0];
    form.addEventListener('blur', event => {
      const vm = this;
      // const emailRule = /^[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
      const emailRule = /^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*.[a-z]{2,3}$/i;
      const emailfull = document.getElementById('email').value + '@' + document.getElementsByClassName('inp-email')[0].value;
      const emailSite = document.getElementsByClassName('inp-email')[0].value;

      // 이메일
      if (StringUtils.isEmpty(emailSite)) {
        document.getElementById('emailErr').className = 'inp-box wrap-inp-select error';
        vm.form.emailMsg = '이메일주소를 입력해주세요.';
        return false;
      } else {
        document.getElementById('emailErr').className = 'inp-box wrap-inp-select';
        vm.form.emailMsg = '';
      }

      if (emailRule.test(emailfull) === false) {
        document.getElementById('emailErr').className = 'inp-box wrap-inp-select error';
        vm.form.emailMsg = '올바른 이메일 주소를 입력해주세요.';
        return false;
      } else {
        document.getElementById('emailErr').className = 'inp-box wrap-inp-select';
        vm.form.emailMsg = '';
      }
    });
  },
  beforeDestroy() {
    // this.clearInterval(this.polling);
  },
};
</script>
<style lang="scss"></style>
