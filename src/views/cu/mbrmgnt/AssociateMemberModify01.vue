<!--
SC-FO-SS-GF-MS-905
-->
<template>
  <div class="wrap-mypage member-info" v-bind:class="[siteClass]">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="회원정보수정" prevType="true" />
    <!-- END : 헤더 -->
    <main id="main" class="bg-gray" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <section class="section-area">
        <h2 class="txt-title">필수정보</h2>
        <p class="txt-required"><span class="required" aria-label="필수 항목">*</span>필수</p>
        <table class="tbl-member">
          <caption>회원정보 수정</caption>
          <colgroup>
            <col style="width: 90px">
            <col style="width: auto">
          </colgroup>
          <tbody>
          <tr>
            <th scope="row">이름<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <span class="data">{{cuName}}</span>
              <button class="btn-modify" aria-label="수정" @click="getAuthentication('NM')">이름변경</button>
            </td>
          </tr>
          <!-- START : SNS 가입회원 -->
          <tr v-if="currScreen == 'Y'">
            <th scope="row">
              <label for="tel">휴대폰번호<span class="required" aria-label="필수 항목">*</span></label>
            </th>
            <td>
              <div class="inp-box wrap-inp-btn">
                <input type="tel" id="tel" class="inp-txt" placeholder="‘-’ 없이 숫자만" v-model="mobileNo">
                <button class="btn-gray" aria-label="인증번호요청" v-if="certifyNum == ''" @click="certifyNumReq('R');">인증번호요청</button>
                <button class="btn-gray" aria-label="재전송" v-if="certifyNum != ''">재전송</button>
                <span class="txt-notice"  v-if="certifyNumSend == 'Y'">입력하신 휴대폰번호로 인증번호가 발송되었습니다.</span>
              </div>
              <div class="inp-box error"  v-if="certifyNum != ''"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <div class="inp-box-time">
                  <input type="number" id="certifyNumInput" name="certifyNumInput" class="inp-number" placeholder="">
                  <p class="txt-time">남은 시간 <span>02:33</span></p>
                </div>
                <span class="txt-error">{{certifyNumRtTxt}}</span>
                <button class="btn-gray" aria-label="인증번호 확인" @click="certifyNumConfirm();">인증번호 확인</button>
              </div>
            </td>
          </tr>
          <tr v-if="currScreen == 'Y'">
            <th scope="row">
              <label for="email">이메일<span class="required" aria-label="필수 항목">*</span></label>
            </th>
            <td>
              <div class="wrap-icon">
                <i class="ico naver" aria-label="네이버 아이콘"></i>
                <i class="ico payco" aria-label="페이코 아이콘"></i>
                <i class="ico facebook" aria-label="페이스북 아이콘"></i>
                <i class="ico kakaotalk" aria-label="카카오톡 아이콘"></i>
              </div>
              <span class="data">{{eMailAddr}}</span>
            </td>
          </tr>
          <!-- END : SNS 가입회원 -->
          <!-- START : SNS 가입회원이 점유인증 시 또는 이메일아이디로 가입 시 -->
          <tr v-if="currScreen == 'N'">
            <th scope="row">휴대폰번호<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <span class="data">{{mobileNo}}</span>
              <button class="btn-modify" aria-label="수정" @click="screenChgYn('Y');">번호변경</button>
            </td>
          </tr>
          <tr v-if="currScreen == 'N'">
            <th scope="row">
              <label for="email">이메일<span class="required" aria-label="필수 항목">*</span></label>
            </th>
            <td>
             <div class="wrap-icon">
                <i class="ico naver" aria-label="네이버 아이콘"></i>
                <i class="ico payco" aria-label="페이코 아이콘"></i>
                <i class="ico facebook" aria-label="페이스북 아이콘"></i>
                <i class="ico kakaotalk" aria-label="카카오톡 아이콘"></i>
              </div>
              <span class="data">{{eMailAddr}}</span>
              <button class="btn-modify" aria-label="수정">비밀번호 변경</button>
            </td>
          </tr>
          <!-- END : SNS 가입회원이 점유인증 시 또는 이메일아이디로 가입 시 -->
          </tbody>
        </table>
      </section>
      <section class="section-area">
        <h2 class="txt-title">혜택 정보수신 여부</h2>
        <p class="txt-required">* 알림톡 또는 SMS 발송</p>
        <p class="txt-desc">
          이벤트 소식, 포인트 정보, SALE, 행사쿠폰, 특가상품, 신상품 소개 등
          다양한 쇼핑정보안내 수신 여부를 선택해주세요.
          ‘아니오’를 선택하실 경우, 정보수신동의 거부처리와 더불어 다양한
          쇼핑정보 제공이 제한됩니다.
        </p>
        <div class="area-radio">
          <div class="radio-box">
            <div class="inp-radio small">
              <input type="radio" name="info" id="info1" value="" checked>
              <label for="info1">예</label>
            </div>
            <div class="inp-radio small">
              <input type="radio" name="info" id="info2" value="">
              <label for="info2">아니오</label>
            </div>
          </div>
        </div>
      </section>
      <!-- START : 하단 버튼 -->
      <div class="btn-area bg-gray">
        <button type="button" class="btn-lg btn-bg lightgreen"><span>수정하기</span></button>
        <div class="wrap-link-area">
          <a href="#" class="link-underbar" title="회원탈퇴 링크 이동">회원 탈퇴</a>
        </div>
      </div>
      <!-- END : 하단 버튼 -->
    </main>
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import StringUtils from '@/common/StringUtils';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "AssociateMemberModify",
  data() {
    return {
      currScreen: "N",
      certifyNum: "",
      certifyNumSend: "N",
      certifyNumRt: "X",
      certifyNumRtTxt: "",
      cuName: "",
      mobileNo: "",
      eMailAddr: "",
      userInfo: {},
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '회원정보 수정 < 회원정보 < 마이페이지 < %s'
  },
  mixins: [],
  components: {
    SubDefaultHeader,
  },
  methods: {
    certifyNumReq: function(status) {
      if (this.mobileValidation()) {
        // TODO 인증번호발송
        const PswChkInputDto = {passwd: "aaaa"};
        ApiUtils.post('/fo/cu/loginmgnt/password-check', PswChkInputDto)
        .then(res => {
          if (res.data.success) { // 인증번호 발송성공
              this.certifyNum = status;
              this.certifyNumSend = "Y";
          } else {
            this.$gsdialog.alert("인증번호 발송 실패");
          }
        });
       }
    },
    screenChgYn: function(status) {
      this.currScreen = status;
      this.certifyNum = "";
    },
     mobileValidation: function() {
     const phoneJ = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
      if (StringUtils.isEmpty(this.mobileNo)) {
        alert("휴대폰 번호를 입력해주세요.");
        return false;
      }
      if (!phoneJ.test(this.mobileNo)) {
        alert("올바른 휴대폰 번호를 입력해주세요.");
        this.mobileNo = "";
         return false;
      }
      return true;
    },
    certifyNumConfirm: function() {
      /* TODO
      인증번호 정상시: 인증이 완료되었습니다.
      인증번호 미입력시: 인증번호를 입력해주세요.
      인증번호 오류시: 인증번호가 올바르지 않습니다. 다시 확인해주세요.
      시간 종료 시: 다시 휴대폰 인증을 진행해주세요.
      */
      const certifyNumInput = document.getElementById("certifyNumInput").value;
      if (StringUtils.isEmpty(certifyNumInput)) {
        alert("인증번호를 입력해주세요.");
        document.getElementById("certifyNumInput").focus();
        return;
      }
     // this.certifyNumSend = "";
     // this.certifyNumRtTxt = "인증번호가 올바르지 않습니다. 다시 확인해주세요.";
    },
     getMbrInfo: async function() {
        const result= await ApiUtils.get('/fo/cu/mbrmgnt/member-information', null); // 회원정보가져오기
        this.userInfo = result.data.data;
        this.userInfo.email = result.data.data.emailAddr1;
        this.userInfo.emailSite = result.data.data.emailAddr2;
        this.userInfo.hp1 = result.data.data.moblTelNo1;
        this.userInfo.hp2 = result.data.data.moblTelNo2.length > 7 ? result.data.data.moblTelNo2.substr(0, 4) : result.data.data.moblTelNo2.substr(0, 3);
        this.userInfo.hp3 = result.data.data.moblTelNo2.length > 7 ? result.data.data.moblTelNo2.substr(4, 4) : result.data.data.moblTelNo2.substr(3, 4);
        this.userInfo.bthym = result.data.data.bthym;
        console.log("===="+JSON.stringify(this.userInfo)+"::::");
        this.cuName = this.userInfo.custNm;
        this.mobileNo = this.userInfo.hp1 + this.userInfo.hp2 + this.userInfo.hp3;
        this.eMailAddr = this.userInfo.email + this.userInfo.emailSite;
     },
  },
  destroyed() {
  },
  mounted() {
    this.getMbrInfo();
  },
};
</script>
