<!--
Design: SC-FO-CU-GF-MS-011
Pg id:
Uri: /cu/join_member_detail
-->
<template>
  <div class="wrap-signup" v-bind:class="[siteClass, {'integrate-member__wrap' : siteClass == 'marketfor'}]">
    <SubDefaultHeader headerText="회원가입" :searchBtnBottom="true" :toBskt="true" :tabbar="false" :prevHomeType="true" />
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="signup-wrap">
        <div class="inner">
          <fieldset class="warp-input-txt">
            <legend>회원가입정보 입력</legend>
            <div class="inp-box disabled">
              <!-- disabled일 경우 disabled 클래스 추가 -->
              <label for="name" class="hidden">이름</label>
              <input type="text" id="name" class="inp-txt w100" v-model="form.korName" disabled />
            </div>
            <div class="inp-box disabled">
              <!-- disabled일 경우 disabled 클래스 추가 -->
              <label for="tel" class="hidden">휴대폰번호</label>
              <input type="text" id="tel" class="inp-txt w100" v-model="form.hp" disabled />
            </div>
            <div class="inp-box disabled" style="display:none;">
              <!-- disabled일 경우 disabled 클래스 추가 -->
              <label for="birth" class="hidden">생년월일</label>
              <input type="text" id="birth" class="inp-txt w100" v-model="form.bdate" disabled />
            </div>
            <div class="wrap-checked" v-if="form.gender != 'M'" style="display:none;">
              <p class="row active" aria-label="성별">
                <span>여자</span>
              </p>
              <p class="row" aria-label="성별">
                <span>남자</span>
              </p>
            </div>
            <div class="wrap-checked" v-else-if="form.gender === 'M'" style="display:none;">
              <p class="row" aria-label="성별">
                <span>여자</span>
              </p>
              <p class="row active" aria-label="성별">
                <span>남자</span>
              </p>
            </div>
            <div class="inp-box" id="idErr" style="margin-top:10px;">
              <!-- 입력 오류일 경우 error 클래스 추가 -->
              <label for="id" class="hidden">아이디를 입력해주세요</label>
              <input
                type="text"
                id="id"
                class="inp-txt w100"
                autocapitalize="off"
                ref="id"
                v-model="form.webId"
                placeholder="아이디를 입력해주세요"
                @blur="getChkValue($event)"
                @keyup="getPressId($event)"
                @change="eachChangeChk()"
              />
              <span class="txt-error">{{ form.idMsg }}</span>
              <!-- 미입력시 MSG -->
              <!-- <span class="txt-error" v-if="false">이미 사용중인 아이디입니다. 다시 확인해주세요.</span> 중복 체크 MSG -->
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
              <span class="txt-error">{{ form.passwordMsg }}</span>
              <!-- 미입력시 MSG -->
              <!-- <span class="txt-error" v-if="false">영문/숫자/특수문자 조합으로 8~16자리 이내로 입력하여 주십시오.</span> 입력규칙 오류시 MSG -->
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
              <span class="txt-error">{{ form.password2Msg }}</span>
              <!-- 미입력시 MSG -->
              <!-- <span class="txt-error" v-if="false">비밀번호를 다시 한번 입력해주세요.</span> 미입력시 MSG -->
              <!-- <span class="txt-error" v-if="false">입력하신 비밀번호와 동일하지 않습니다.</span> 비밀번호와 불일치시 MSG -->
            </div>
            <!-- 수정 START : 2020.02.21 마크업 수정 -->
            <div class="inp-box wrap-inp-select" id="emailErr">
              <!-- 입력 오류일 경우 error 클래스 추가 -->
              <label for="email" class="hidden">이메일을 입력해주세요</label>
              <input
                type="email"
                id="email"
                autocapitalize="off"
                class="inp-txt"
                ref="email"
                v-model="form.email"
                placeholder="이메일을 입력해주세요"
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
                v-model="form.emailSite"
                @selectEvent="selectAction"
                @changeEvent="changeSelectAction"
              />
              <span class="txt-error">{{ form.emailMsg }}</span>
              <!-- 미입력시 MSG -->
              <!-- <span class="txt-error" v-if="false">이메일을 입력해주세요.</span>  미입력시 MSG -->
              <!-- <span class="txt-error" v-if="false">올바른 이메일 주소를 입력해주세요.</span> 입력규칙 오류시 MSG -->
              <!-- <span class="txt-error" v-if="false">이미 사용중인 이메일입니다. 다시 확인해주세요.</span> 중복 이메일 MSG -->
            </div>
            <!-- 수정 END : 2020.02.21 마크업 수정 -->
          </fieldset>
          <!-- START : 약관동의 -->
          <div class="wrap-agreement">
            <div class="wrap-inp-chk area-top">
              <p class="inp-chk bg all">
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
                <!-- <span class="txt-error">GS리테일 회원약관에 동의해주세요.</span> -->
                <span class="txt-error">{{ form.agree1Msg }}</span>
                <ul class="wrap-list-agree">
                  <li>
                    <button
                      type="button"
                      class="btn-arrow gray right"
                      @click="
                        popupAction(
                          'popupGSfreshMemberTerms',
                          'GS리테일 멤버십(THE POP) 회원약관',
                          'R011'
                        )
                      "
                    >GS리테일 멤버십(THE POP) 회원약관</button>
                  </li>
                  <!-- <li>
                    <button type="button" class="btn-arrow gray right" @click=" popupAction('popupGSfreshMemberTerms', 'GS리테일 서비스 앱 이용약관', 'R101')">GS리테일 서비스 앱 이용약관</button>
                  </li> -->
                  <li>
                    <button
                      type="button"
                      class="btn-arrow gray right"
                      @click="
                        popupAction(
                          'popupGSfreshMemberTerms',
                          'GS리테일 쇼핑몰 이용약관',
                          'R012'
                        )
                      "
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
                <!-- <span class="txt-error">개인정보 수집, 이용동의에 동의해주세요.</span> -->
                <span class="txt-error">{{ form.agree2Msg }}</span>
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
                    @click="
                      popupAction(
                        'popupGSfreshMemberTerms',
                        '개인정보 제3자 제공동의',
                        'R041'
                      )
                    "
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
            <PopupGSfreshMemberTerms
              @popupEvent="popupAction"
              v-if="this.popup.popupGSfreshMemberTerms"
              :title="popup.title"
              :code="popup.code"
            />
            <!-- 팝업 GS fresh 회원약관 -->
            <PopupSignUpGSfinish @popupEvent="popupAction" v-if="this.popup.popupSignUpGSfinish" mbrJoinMethod="일반회원가입"/>
            <!-- 팝업 회원가입완료-->
          </div>
          <!-- END : 약관동의 -->
          <div class="btn-area">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label="바로가기"
              class="btn-lg btn-bg lightgreen btn-login"
              @click="getJoinMember"
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
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import AccordionMixin from '@/mixins/AccordionMixin';
import Footer from '@/components/common/Footer'; // 푸터
// import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import SelectUIInput from '@/components/common/SelectUIInput'; // 이메일 selectbox / 수정 : 2020.02.21 추가
import PopupGSfreshMemberTerms from '@/views/cu/mbrmgnt/PopupGSfreshMemberTerms'; // GS fresh 회원약관
import PopupSignUpGSfinish from '@/views/cu/mbrmgnt/PopupSignUpGSfinish'; // 회원가입 팝업
import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import JwtUtils from '@/common/JwtUtils';
import Tracker from '@/common/Tracker';
import CuUtils from '@/common/cu/CuUtils';

export default {
  name: 'SignUp',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '간편회원 < 회원가입 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '회원가입^통합회원',
      },
    ],
  },
  components: {
    SubDefaultHeader, // 헤더
    Footer,
    SelectUIInput, // 수정 : 2020.02.21 추가
    PopupGSfreshMemberTerms,
    PopupSignUpGSfinish,
  },
  mixins: [AccordionMixin],
  data() {
    return {
      form: {
        mbrJoinPosbType: '',
        korName: '',
        bdate: '',
        gender: '',
        hp: '',
        hp1: '',
        hp2: '',
        hp3: '',
        ipinCiCode: '',
        foreignYn: '',
        phoneCorp: '',
        webId: '',
        webPwd: '',
        webPwd2: '',
        tmpHp: '',
        email: '',
        emailSite: 'naver.com',
        chkList011: false,
        agree1: false,
        agree2: false,
        agree3: false,
        agree4: false,
        smsYn: false,
        emailYn: false,
        idMsg: '',
        emailMsg: '',
        passwordMsg: '',
        password2Msg: '',
        agree1Msg: '',
        agree2Msg: '',
        allChk: false,
      },
      tmpForm: {},
      chkList: {
        isCheckAll: false,
      },
      // 수정 START : 2020.02.21 추가
      select: {
        list: {
          // 정렬 - 상품정보
          open: false,
          selected: 'naver.com',
        },
      },
      popup: {
        // 팝업
        title: '',
        code: '',
        open: false,
        popupGSfreshMemberTerms: false,
        popupSignUpGSfinish: false,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      disabledEv: {
        isButtonJoin: true,
        isButtonAuthChk: true,
        isButtonAuth: false,
      },
      // 수정 END : 2020.02.21 추가
      siteClass: '',
    };
  },
  methods: {
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
    // 회원가입
    async getJoinMember() {
      this.disabledEv.isButtonJoin = true;
      if (!StringUtils.isEmpty(sessionStorage.getItem('rcmd'))) {
        this.tmpForm.joinRcmdName = sessionStorage.getItem('rcmd');
        sessionStorage.removeItem('rcmd');
      } else {
        this.tmpForm.joinRcmdName = '';
      }
      if (!this.getValidationCheck()) {
        return false;
      }
      if (!this.getValidationAgreeCheck()) {
        return false;
      }
      const member = {
        mbrJoinPosbType: this.form.mbrJoinPosbType,
        webId: this.form.webId,
        webPwd: encodeURI(this.form.webPwd),
        tmpHp: this.form.tmpHp,
        certname: this.form.korName,
        nation: this.form.foreignYn,
        foreignYn: this.form.foreignYn,
        birthDay: this.form.bdate,
        gender: this.form.gender,
        phoneNo: this.form.hp,
        hp1: this.form.hp1,
        hp2: this.form.hp2,
        hp3: this.form.hp3,
        phoneCorp: this.form.phoneCorp,
        ipinCiCode: this.form.ipinCiCode,
        agree1: this.form.agree1,
        agree2: this.form.agree2,
        agree3: this.form.agree3,
        agree4: this.form.agree4,
        smsYn: this.form.smsYn,
        emailYn: this.form.emailYn,
        email: this.form.email,
        emailSite: this.form.emailSite,
        chanlId: CookieUtils.getChanlId(),
        mdaType: CookieUtils.getMdaType(),
        mallId: CookieUtils.getMallId(),
        cmmSteId: CookieUtils.getCmmSteId(),
        joinRcmdName: this.tmpForm.joinRcmdName,
      };
      const res = await ApiUtils.post(
        '/fo/cu/mbrmgnt/member',
        member,
        this.headers
      );
      if (res.data === null) {
        this.disabledEv.isButtonJoin = false;
        this.$gsdialog.alert('회원 가입 실패', { html: true });
        return;
      } else {
        if (res.data.success === true) {
          this.disabledEv.isButtonJoin = false;
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
            vm.storeItemsData = storeItems;
            for (let i = 0; i < storeItemsData.length; i++) {
              const params = {
                itemId: vm.storeItemsData[i].itemId,
                mallId: CookieUtils.getMallId(),
              };
              try {
                const response = await ApiUtils.post(
                  '/fo/md/itemaddinfomgnt/mbr-inquire-item',
                  params
                );
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
            const resDev = await ApiUtils.put('/fo/cm/appmgnt/device', devData);
            if (resDev.data === null) {
              this.$gsdialog.alert('오류', { html: true });
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
            const resAuto = await ApiUtils.post('/fo/cu/loginmgnt/app-auto-login-registration', autoData);
            if (resAuto.data === null) {
              this.$gsdialog.alert('오류', { html: true });
              return;
            }
          }
          // 비로그인 장바구니.
          try {
            const response = await ApiUtils.post(
              '/fo/od/bsktmgnt/bskt-merge',
              this.odBsktUuid
            );
            console.log(
              '/fo/od/bsktmgnt/bskt-merge :: ' + response.data.success
            );
          } catch (e) {
            console.log(e);
          }

          // 회원혜택지급처리
          try {
            const mbrBenedata = {
              custNo: data.userRslt.custNo,
              cmmMbrNo: data.userRslt.cmmMbrNo,
            };
            ApiUtils.post(
              '/fo/cu/mbrmgnt/member-benefit-provide',
              mbrBenedata
            ).then((response) => {
              console.log(
                '/fo/cu/mbrmgnt/member-benefit-provide:: ' +
                  response.data.success
              );
            });
          } catch (e) {
            console.log(e);
          }

          const mall = CookieUtils.getMallId();
          if (mall === '1') {
            // 1:gsfresh, 11:dalisalda
            this.$store.state.cu.recCert = 'join';
            this.popupAction('popupSignUpGSfinish');
          } else {
            // this.$router.push('/cu/pbms_join/11');
            this.$router.push({
              path: '/cu/pbms_join/11',
              query: { mbrJoinMethod: '일반회원가입' }
            });
          }
        } else if (res.data.data.resultCode === '60003') {
          this.disabledEv.isButtonJoin = false;
          document.getElementById('idErr').className = 'inp-box error';
          this.form.idMsg = '이미 사용중인 아이디입니다. 다시 확인해주세요.';
          return;
        } else {
          this.disabledEv.isButtonJoin = false;
          this.$gsdialog.alert(res.data.data.resultMessage, { html: true });
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
    eachChangeChk(e) {
      this.form.emailSite = this.select['list'].selected;
      // 항목 입력 확인 이벤트
      if (
        !StringUtils.isEmpty(this.form.webId) &&
        !StringUtils.isEmpty(this.form.hp) &&
        !StringUtils.isEmpty(this.form.webPwd) &&
        !StringUtils.isEmpty(this.form.webPwd2) &&
        !StringUtils.isEmpty(this.form.email) &&
        !StringUtils.isEmpty(this.form.emailSite) &&
        StringUtils.isEmpty(this.form.idMsg) &&
        StringUtils.isEmpty(this.form.emailMsg) &&
        StringUtils.isEmpty(this.form.passwordMsg) &&
        StringUtils.isEmpty(this.form.password2Msg) &&
        StringUtils.isEmpty(this.form.agree1Msg) &&
        StringUtils.isEmpty(this.form.agree2Msg) &&
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
    },
    getChkValue(e) {
      const vm = this;
      const value = e.target.value;
      const id = e.target.id;
      const emailRule = /^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*.[a-z]{2,3}$/i;
      const emailfull =
        document.getElementById('email').value +
        '@' +
        document.getElementsByClassName('inp-email')[0].value;
      const emailSite = vm.select['list'].selected;
      const tmpId = document.getElementById('id').value;
      const pwd = document.getElementById('password').value;
      const tmpPwd2 = document.getElementById('password2').value;
      const tmpEmail = document.getElementById('email').value;
      if (id == 'id') {
        // 아이디
        if (StringUtils.isEmpty(value)) {
          document.getElementById('idErr').className = 'inp-box error';
          vm.form.idMsg = '아이디를 입력해주세요.';
          return false;
        } else {
          document.getElementById('idErr').className = 'inp-box';
          vm.form.idMsg = '';
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
      }
      this.eachChangeChk();
      return true;
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
      const email = vm.form.email;
      const emailSite = vm.form.emailSite;
      // 이름
      if (StringUtils.isEmpty(StringUtils.trim(webId))) {
        document.getElementById('idErr').className = 'inp-box error';
        vm.form.idMsg = '아이디를 입력해주세요.';
        return false;
      } else {
        document.getElementById('idErr').className = 'inp-box';
        vm.form.idMsg = '';
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
      return true;
    },
    getPressId(e) {
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
    },
    getPressName(e) {
      const vm = this;
      const value = e.target.value;
      // const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi;
      const reg = /[a-zA-Z0-9<>(){}[\]\-_=+|\/\\'\;.,:\"`~!?@#$%^&*]/gi;
      e.target.value = value.replace(reg, '');
    },
  },
  updated() {},
  mounted: async function() {
    this.siteClass = CookieUtils.getSiteClass();
    this.tmpForm = JSON.parse(localStorage.getItem('uesrChk'));
    this.form.bdate = this.tmpForm.bdate;
    this.form.foreignYn = this.tmpForm.foreignYn;
    this.form.gender = this.tmpForm.gender;
    this.form.hp = this.tmpForm.hp;
    this.form.hp1 = this.tmpForm.hp1;
    this.form.hp2 = this.tmpForm.hp2;
    this.form.hp3 = this.tmpForm.hp3;
    this.form.ipinCiCode = this.tmpForm.ipinCiCode;
    this.form.korName = this.tmpForm.korName;
    this.form.mbrJoinPosbType = this.tmpForm.mbrJoinPosbType;
    this.form.phoneCorp = this.tmpForm.phoneCorp;
    localStorage.removeItem('uesrChk');
    // 정회원 가입 약관 확장
    document.getElementById('agreement').click();
    const form = document.getElementsByClassName('inp-email')[0];
    form.addEventListener('blur', event => {
      const vm = this;
      const emailRule = /^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*.[a-z]{2,3}$/i;
      const emailfull =
        document.getElementById('email').value +
        '@' +
        document.getElementsByClassName('inp-email')[0].value;
      const emailSite = document.getElementsByClassName('inp-email')[0].value;
      // 이메일
      if (StringUtils.isEmpty(emailSite)) {
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
    });
  },
};
</script>
<style lang="scss"></style>
