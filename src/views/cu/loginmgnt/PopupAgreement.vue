<!--
Design: views/cu/SC-FO-CU-GF-MP-021
Pg id:
Uri:
-->
<template>
  <!-- START : 미동의회원 로그인 레이어 -->
  <div
    id="popupAgreement"
    class="wrap-layer agreement-layer"
    :class="[{active : this.modalActive.popupAgreement}, siteClass]"
  >
    <!--  role="dialog" aria-modal="true" :class="{active : this.modalActive.popupAgreement}" -->
    <div class="layer-bg"></div>
    <!--  @click="popupAction" -->
    <div class="layer-inner">
      <div class="inner-box">
        <div class="title">
          <h5>
            <!-- 5월수정 START : 문구 수정 -->
            <span>고객</span>님은 GS&amp;POINT 회원입니다
            <!-- 4월수정 : 문구수정 홍길동님 -> 고객님 -->
            <!-- 5월수정 END : 문구 수정 -->
          </h5>
        </div>
        <div class="layer-content">
          <div class="desc">약관 동의만 하시면 서비스를 이용할 수 있습니다</div>
          <!-- START : 약관동의 -->
          <div class="wrap-agreement">
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
                id="agreementPop"
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
                        popupInnerAction(
                          'popupGSfreshMemberTerms',
                          'GS리테일 멤버십(THE POP) 회원약관',
                          'R011'
                        )
                      "
                    >GS리테일 멤버십(THE POP) 회원약관</button>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="btn-arrow gray right"
                      @click="
                        popupInnerAction(
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
                        popupInnerAction(
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
                        popupInnerAction(
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
                        popupInnerAction(
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
                      popupInnerAction(
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
              @popupEvent="popupInnerAction"
              v-if="this.popupall.popupGSfreshMemberTerms"
              :title="popupall.title"
              :code="popupall.code"
            />
          </div>
          <!-- END : 약관동의 -->
        </div>
      </div>
      <!-- START : 하단 버튼 -->
      <div class="sub-btn-area">
        <button type="button" @click="popupAction" class="btn-md btn-bg darkgray">
          <span>취소</span>
        </button>
        <button
          type="button"
          class="btn-md btn-bg lightgreen"
          @click="agreeMent()"
          v-bind:disabled="disabledEv.isButtonJoin"
          @keydown.9="tabFocusRemove('popupAction')"
          aria-label="포커스 아웃 시 팝업 닫기"
        >
          <!-- 수정 : 2020.03.04 팝업 닫기 포커스 아웃 시 팝업 닫기 (접근성) -->
          <span>확인</span>
        </button>
      </div>
      <!-- END : 하단 버튼 -->
      <!-- <button class="btn-layer-close" @click="popupAction">
        <span class="hidden">닫기</span>
      </button>-->
    </div>
  </div>
  <!-- END : 미동의회원 로그인 레이어 -->
</template>
<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import PopupGSfreshMemberTerms from '@/views/cu/mbrmgnt/PopupGSfreshMemberTerms'; // GS fresh 회원약관
import ApiUtils from '@/common/ApiUtils';
import Tracker from '@/common/Tracker';
import CuUtils from '@/common/cu/CuUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'PopupAgreement',
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '로그인 < %s',
  },
  props: ['popup'],
  mixins: [LayerPopupMixin, AccordionMixin],
  components: {
    PopupGSfreshMemberTerms,
  },
  data() {
    return {
      form: {
        allChk: false,
        agree1: false,
        agree2: false,
        agree3: false,
        agree4: false,
        smsYn: false,
        emailYn: false,
        agree1Msg: '',
        agree2Msg: '',
        custNo: '',
      },
      popupall: {
        // 팝업
        open: false,
        popupGSfreshMemberTerms: false,
        title: '',
        code: '',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      disabledEv: {
        isButtonJoin: true,
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupAgreement');
      // Adobe Analytics 약관동의확인 완료
      Tracker.termsAgree();
      this.modalActiveEvent('popupAgreement');
    },
    popupInnerAction(type, title, code) {
      this.popupall.code = code;
      this.popupall.title = title;
      this.popupall[`${type}`] = !this.popupall[`${type}`];
      this.popupall.open = !this.popupall.open;
    },
    allCheckedBox() {
      if (this.form.allChk == true) {
        this.form.agree1 = true;
        this.form.agree2 = true;
        this.form.agree3 = true;
        this.form.agree4 = true;
        this.form.smsYn = true;
        this.form.emailYn = true;
        document.getElementById('agreementPop').click();
      } else if (this.form.allChk == false) {
        this.form.agree1 = false;
        this.form.agree2 = false;
        this.form.agree3 = false;
        this.form.agree4 = false;
        this.form.smsYn = false;
        this.form.emailYn = false;
        document.getElementById('agreementPop').click();
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
      // 항목 입력 확인 이벤트
      if (this.form.agree1 && this.form.agree2) {
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
    // 약관 동의
    agreeMent: async function() {
      const vm = this;
      const data = {
        custNo: vm.$store.state.cu.custNo,
        gsrContract1: 'Y',
        gsrContract2: 'Y',
        gsrContract3: 'Y',
        gsrContract6: 'Y',
        gsrContract4: vm.form.agree3,
        emailRcvYn: vm.form.emailYn,
        smsRcvYn: vm.form.smsYn,
        gsAgree: 'N',
      };
      const response = await ApiUtils.post(
        '/fo/cu/mbrmgnt/member-information-encryption-key',
        data,
        { 'Content-Type': 'application/json' }
      );
      if (response.data.success === true) {
        const returnUrl = this.$route.query.returnUrl;
        if (!StringUtils.isEmpty(returnUrl)) {
          location.href = returnUrl;
        } else {
          const string = CuUtils.getLink();
          location.href = string;
        }
        this.popupAction();
      } else {
        this.$gsdialog.alert(response.data.data.resultMessage, { html: true });
      }
    },
  },
  mounted() {
    document.getElementById('agreementPop').click();
    this.modalActiveEvent('popupAgreement');
  },
};
</script>
<style lang="scss">
</style>
