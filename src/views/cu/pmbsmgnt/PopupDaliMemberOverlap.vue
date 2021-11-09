<template>
  <!-- 수정 START : 2020.02.11 마크업 변경 (팝업 형태 및 디자인 변경으로 인한 마크업 전체 수정) -->
  <!-- <div id="popupDaliMemberOverlap" class="wrap-full-popup" role="dialog" aria-modal="true"> -->
  <div
    id="popupDaliMemberOverlap"
    class="wrap-full-popup"
    role="dialog"
    aria-modal="true"
    :class="[{active : this.modalActive.popupDaliMemberOverlap}, siteClass]"
  >
    <div class="header-popup">
      <h5>
        <strong>통합회원 안내</strong>
      </h5>
      <!-- 6월 수정 : 텍스트 변경 -->
    </div>
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <div class="wrap-signup-change integrate">
          <div class="inner">
            <!-- 6월 수정 START -->
            <div class="area-text">
              <h6
                class="title"
                v-if="this.isDuplicates == 'Y' && isDalli == 'Y'"
              >고객님은 이미 달리드림 멤버십 이용중입니다. 아이디 통합하신 후 이용해주세요.</h6>
              <h6
                class="title"
                v-if="this.isDuplicates == 'Y' && isDalli == 'N'"
              >고객님은 이미 통합회원으로 가입하셨습니다. 아이디 통합하신 후 이용해주세요</h6>
              <h6 class="title" v-if="this.isDuplicates == 'N'">통합회원으로 전환하신 후 이용해주세요</h6>
            </div>
            <!-- START : 회원 아이디 정보 -->
            <div
              class="wrap-memberinfo"
              v-if="this.isDuplicates == 'Y' && this.popup.infoArr.id != '' && this.popup.infoArr.id != null"
            >
              <p class="user-id">
                <span class="label">아이디</span>
                <span class="id">{{this.popup.infoArr.id}}</span>
                <span class="tag" v-if="1==2">[휴면]</span>
              </p>
              <p
                class="date"
                v-if="this.popup.infoArr.wedDate != '' && this.popup.infoArr.wedDate != null"
              >({{this.popup.infoArr.wedDate}} 가입)</p>
            </div>
            <ul class="list-info">
              <li v-if="this.isDuplicates == 'Y' && isDalli == 'Y'">
                GS 프레시몰 통합회원 아이디로 달리드림 가입, GS&amp;POINT, THE POP 리워즈를 적립/사용하실 수 있습니다.
                <br />(이미 달리드림 가입하신 경우, 중복으로 가입하실 수 없습니다.)
              </li>
              <li
                v-if="this.isDuplicates == 'Y' && isDalli == 'N'"
              >GS 프레시몰 통합회원 아이디로 달리드림 가입, GS&amp;POINT, THE POP 리워즈를 적립/사용하실 수 있습니다.</li>
              <li
                v-if="this.isDuplicates == 'N'"
              >GS 프레시몰 통합회원 아이디로 달리드림 가입, GS&amp;POINT, THE POP 리워즈를 적립/사용하실 수 있습니다.</li>
              <li v-if="this.isDuplicates == 'Y'">통합 후 본인인증 정보로 회원정보가 업데이트됩니다.</li>
              <li v-if="this.isDuplicates == 'N'">전환 후 본인인증 정보로 회원정보가 업데이트됩니다.</li>
              <!-- 6월수정 START : 문구 추가 -->
              <li>아래 필수 약관 외 선택 약관은 고객님의 현재 동의 여부가 유지됩니다.</li>
              <!-- 6월수정 END : 문구 추가 -->
            </ul>
            <!-- END : 회원 아이디 정보 -->
            <!-- 6월 수정 END -->
            <!-- START : 약관 -->
            <!-- 5월수정 START : 약관 내용 변경 -->
            <div class="wrap-agreement">
              <div class="wrap-input-chk">
                <div class="inp-chk small">
                  <p class="subtitle">[필수] GS리테일 회원약관 동의</p>
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
                <div class="inp-chk small">
                  <p class="subtitle">[필수] 개인정보 수집, 이용동의</p>
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
              </div>
              <PopupGSfreshMemberTerms
                @popupEvent="popupInnerAction"
                v-if="this.popupall.popupGSfreshMemberTerms"
                :title="popupall.title"
                :code="popupall.code"
              />
            </div>
            <!-- 5월수정 END : 약관 내용 변경 -->
            <div class="btn-area">
              <button
                class="btn-lg btn-bg lightgreen"
                v-if="this.isDuplicates == 'Y'"
                @click="pmbsSwtch()"
              >동의 후 아이디 통합하기</button>
              <button
                class="btn-lg btn-bg lightgreen"
                v-if="this.isDuplicates == 'N'"
                @click="pmbsSwtch()"
              >동의 후 아이디 전환하기</button>
            </div>
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
  <!-- 수정 END : 2020.02.11 마크업 변경 (팝업 형태 및 디자인 변경으로 인한 마크업 전체 수정) -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import AccordionMixin from '@/mixins/AccordionMixin';
import PopupGSfreshMemberTerms from '@/views/cu/mbrmgnt/PopupGSfreshMemberTerms'; // GS fresh 회원약관
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import Tracker from '@/common/Tracker';
import JwtUtils from '@/common/JwtUtils';
export default {
  name: 'PopupDaliMemberOverlap',
  props: ['popup'],
  mixins: [LayerPopupMixin, AccordionMixin],
  components: {
    PopupGSfreshMemberTerms,
  },
  data() {
    return {
      popupall: {
        // 팝업
        open: false,
        popupGSfreshMemberTerms: false,
        title: '',
        code: '',
      },
      isDuplicates: '', // 정회원 중복
      isIntegrate: '', // 아이디 통합
      isDalli: '',
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupDaliMemberOverlap');
      this.modalActiveEvent('popupDaliMemberOverlap');
    },
    popupInnerAction(type, title, code) {
      this.popupall.code = code;
      this.popupall.title = title;
      this.popupall[`${type}`] = !this.popupall[`${type}`];
      this.popupall.open = !this.popupall.open;
    },
    pmbsSwtch: async function() {
      const CmmSmplMbrSwtchInputDto = {
        // divCode: "6",
        // reqSubCoCode: "7100",
        custDivCode: '01',
        subCoCode: '01',
        storeCd: 'E0001',
        ciVlue: this.popup.infoArr.ipinCiCode,
        custName: this.popup.infoArr.korName,
        hp1: this.popup.infoArr.hp1,
        hp2: this.popup.infoArr.hp2,
        hp3: this.popup.infoArr.hp3,
        email: this.popup.infoArr.eMail,
        comCoDivCode: this.popup.infoArr.comCoDivCode,
        bdate: this.popup.infoArr.bdate,
        agreeYn: '01,02,03,06',
        sexCode: this.popup.infoArr.gender,
        foreignYn: this.popup.infoArr.foreignYn,
        emailYn: this.popup.infoArr.emailYn,
        smsYn: this.popup.infoArr.smsYn,
        mallId: CookieUtils.getMallId(),
        cmmSteId: CookieUtils.getCmmSteId(),
        mdaType: CookieUtils.getMdaType(),
        domail: CookieUtils.getDomain(),
      };
      const rslt = await ApiUtils.post(
        '/fo/cu/mbrmgnt/commerce-simple-member-gs-member-switch',
        CmmSmplMbrSwtchInputDto
      );
      if (rslt.data.success) {
        const data = rslt.data.data;
        JwtUtils.setAutoLogin(false);
        JwtUtils.saveRefreshToken(data.jwtRslt.refreshToken);
        JwtUtils.saveIdToken(data.jwtRslt.idToken);
        JwtUtils.saveEncVal(rslt.data.data.ENC_VAL);
        Tracker.loginSuccess(data.userRslt.custNo);
        const user = rslt.data.data.userRslt;
        CookieUtils.setLoginCookies(user);
        // this.$router.push('/cu/pbms_coupon_registration');
        if (this.isDuplicates == 'Y') {
            await this.$gsdialog.alert('통합이 완료되었습니다.');
        } else {
            await this.$gsdialog.alert('전환이 완료되었습니다.');
        }
        // 전환이 완료되었습니다
        this.$parent.easyJoin();
        this.$emit('popupEvent', 'popupDaliMemberOverlap');
      } else {
        // this.$gsdialog.alert('오류가 발생했습니다. ' + rslt.data.statusCode);
        await this.$gsdialog.alert(rslt.data.data.resultMessage || '오류가 발생하였습니다. 고객센터로 문의하시기 바랍니다.');
      }
    },
  },
  mounted() {
    if (this.popup.infoArr.custNo != '' && this.popup.infoArr.custNo != null) {
      this.isDuplicates = 'Y';
    } else {
      this.isDuplicates = 'N';
    }
    if (
      this.isDuplicates == 'Y' &&
      this.popup.infoArr.dalli != null &&
      this.popup.infoArr.dalli != ''
    ) {
      this.isDalli = 'Y';
    } else {
      this.isDalli = 'N';
    }
    this.modalActiveEvent('popupDaliMemberOverlap');
  },
  updated() {},
};
</script>
