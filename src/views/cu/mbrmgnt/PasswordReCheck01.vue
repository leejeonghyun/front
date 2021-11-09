<!--
views/ss/SC-FO-SS-GF-MS-904
-->
<template>
  <div class="wrap-mypage member-info" v-bind:class="[siteClass]">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="비밀번호 확인" prevType="true" />
    <!-- END : 헤더 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="wrap-input-info">
        <div class="inner">
          <div class="wrap-box">
            <div class="txt-desc">
              개인정보 보호와 본인 확인을 위해<br/>
              비밀번호를 한 번 더 입력해주세요
            </div>
            <div class="wrap-input">
              <div class="inp-id">
                <span class="label">아이디</span>
                <span class="txt-id" >{{userIdSubStr}}********</span>
              </div>
              <div class="inp-box"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label class="hidden" for="">비밀번호</label>
                <input type="password" id= "password" class="inp-txt" placeholder="비밀번호">
                <span class="txt-error">비밀번호를 입력해주세요.</span> <!-- 미입력시 MSG -->
                <span class="txt-error">비밀번호가 일치하지 않습니다. 다시 입력해주세요.</span> <!-- 불일치시 MSG -->
              </div>
            </div>
            <div class="btn-area">
              <button class="btn-lg btn-bg lightgreen" aria-label="비밀번호 확인" @click="onConfirm();">확인</button>
            </div>
          </div>
          <div class="wrap-box">
            <div class="wrap-sns">
              <p class="txt-desc">
                SNS 계정과 연결하신 경우,<br/>
                SNS 계정으로 한번 더 로그인해주세요
              </p>
              <!-- START : sns 로그인 간편확인 -->
              <ul class="list-link-login">
                <li>
                  <a href="#" class="ico naver" title="네이버 로그인으로 이동"><span>네이버 로그인</span></a>
                </li>
                <li>
                  <a href="#" class="ico kakaotalk" title="카카오톡 로그인으로 이동"><span>카카오톡 로그인</span></a>
                </li>
                <li>
                  <a href="#" class="ico facebook" title="페이스북 로그인으로 이동"><span>페이스북 로그인</span></a>
                </li>
                <li>
                  <a href="#" class="ico payco" title="페이코 로그인으로 이동"><span>페이코 로그인</span></a>
                </li>
              </ul>
              <!-- END : sns 로그인 간편확인 -->
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import CookieUtils from '@/common/CookieUtils';
import StringUtils from '@/common/StringUtils';
import ApiUtils from '@/common/ApiUtils';
import JwtUtils from '@/common/JwtUtils';
export default {
  name: "PasswordReconfirm",
  data() {
    return {
      popupAddrChange: false,
      userId: "",
      userIdSubStr: "",
      mbrTypeCd: "", // 회원구분유형
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '비밀번호 재확인 < 회원정보 수정 < 회원정보 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '비밀번호 확인',
      },
    ],
  },
  mixins: [],
  components: {
    SubDefaultHeader,
  },
  methods: {
    onConfirm: function() {
      const success = this.isValidation();
    if (success) {
      const PswChkInputDto = {passwd: document.getElementById("password").value};
      ApiUtils.post('/fo/cu/loginmgnt/password-check', PswChkInputDto)
      .then(res => {
        if (!res.data.success) {
            let mssg = "";
            if (res.data.success) {
              mssg = "비밀번호가 일치하지 않습니다. 다시 입력해주세요";
            } else {
              mssg = res.data.statusMessage;
            }
            document.getElementById("password").value = "";
            console.error(mssg);
            this.$gsdialog.alert(mssg);
            return;
        } else {
              // 정회원, 준회원인지 판단
                if (this.mbrTypeCd == "01") {
                    this.$router.push('/cu/regular_member_modify'); // 정회원
                } else if (this.mbrTypeCd == "02") {
                    this.$router.push('/cu/associate_member_modify'); // 준회원
                } else {
                  alert("정보가 존재하지 않습니다.");
                }
        }
      });
      }
    },
    isValidation: function() {
      let success = true;
      const pwd = document.getElementById("password").value;
      if (StringUtils.isEmpty(StringUtils.trim(pwd))) {
        this.$gsdialog.alert("비밀번호를 입력해 주세요.");
        success = false;
      }
      return success;
    },
  },
  destroyed() {
  },
  mounted() {
    this.mbrTypeCd = "01"; // TODO 토큰에서 회원유형가져오기
    this.userId = CookieUtils.getCookie("WEB_ID"); // 쿠키에서 아이디정보 가져오기;
    this.userIdSubStr = this.userId.substring(0, 3);
  },
};
</script>
