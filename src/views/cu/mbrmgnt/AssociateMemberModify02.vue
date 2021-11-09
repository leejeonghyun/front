<template>
  <!-- 수정 START : 2020.02.13 wrap-setting 클래스 추가 -->
  <div class="wrap-mypage member-info wrap-setting" v-bind:class="[siteClass]">
  <!-- 수정 END : 2020.02.13 wrap-setting 클래스 추가 -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="회원정보수정" prevType="true" />
    <!-- END : 헤더 -->
    <!-- 수정 START : 2020.02.13 bg-gray 클래스 삭제 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
    <!-- 수정 END : 2020.02.13 bg-gray 클래스 삭제 -->
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
              <span class="data">{{this.custNm}}</span>
              <!-- <button class="btn-modify" aria-label="수정">이름변경</button> -->
              <div class="wrap-icon">
                <!-- 2020.03.30 START 아이콘 코드 수정 -->
                <i class="ico naver" aria-label="SNS 연동 네이버"></i>
                <!-- <i class="ico facebook" aria-label="SNS 연동 페이스북"></i>
                <i class="ico kakaotalk" aria-label="SNS 연동 카카오"></i>
                <i class="ico payco" aria-label="SNS 연동 페이코"></i> -->
                <!-- 2020.03.30 START 아이콘 코드 수정 -->
              </div>
            </td>
          </tr>
          <!-- 수정 START : 2020.03.31 마크업 추가 -->
          <tr>
            <th scope="row">휴대폰번호<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <span class="data">010 -1234 -5678</span>
              <button class="btn-modify" aria-label="수정" >번호 변경</button>
            </td>
          </tr>
          <!-- 수정 END : 2020.03.31 마크업 추가 -->
          <!-- START : SNS 가입회원 -->
          <tr>
            <th scope="row">
              <label for="tel">휴대폰번호<span class="required" aria-label="필수 항목">*</span></label>
            </th>
            <td>
              <div class="inp-box wrap-inp-btn">
                <input type="tel" id="tel" class="inp-txt" placeholder="‘-’ 없이 숫자만" v-model=form.hpend>
                <button class="btn-gray" aria-label="재전송" @click="getHpAuthentication()">{{hpCertiChk.autChk}}</button>
                <span class="txt-notice">{{certSend}}</span>
              </div>
              <div class="inp-box error"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <div class="inp-box-time">
                   <!-- 수정 START : 2020.03.17 placeholder에 텍스트 추가 -->
                  <input type="number" id="" class="inp-number" value=""  v-model=form.chkKey>
                  <!-- 수정 END : 2020.03.17 placeholder에 텍스트 추가 -->
                  <p class="txt-time">남은 시간 <span>{{setTime.resTimeData}}</span></p>
                </div>
                <span class="txt-error">{{certContent}}</span>
                <button class="btn-gray" aria-label="인증번호 확인"  @click="getAuthentication()">인증번호 확인</button>
              </div>
            </td>
          </tr>
          <!-- 수정 START : 2020.02.21 마크업 수정 -->
          <tr>
            <th scope="row">
              <label for="email">이메일<span class="required" aria-label="필수 항목">*</span></label>
            </th>
            <td>
              <span class="data">{{this.eMailAddr}}</span>
              <!-- 수정 START : 2020.03.05 팝업 이벤트 추가 -->
              <button class="btn-modify" aria-haspopup="dialog" aria-label="수정" @click="popupAction('popupPasswordChange')">비밀번호 변경</button> <!-- 이메일 가입시 버튼 노출 -->
              <!-- 수정 END : 2020.03.05 팝업 이벤트 추가 -->
            </td>
          </tr>
          <!-- 수정 END : 2020.02.21 마크업 수정 -->
          <!-- END : SNS 가입회원 -->
          <!-- 수정 : 2020.02.21 SNS 가입회원이 점유인증 시 또는 이메일아이디로 가입 시 마크업 삭제 -->
          </tbody>
        </table>
      </section>
      <!-- 수정 START : 2020.02.13 마크업 변경 -->
      <section class="section-area">
        <ul class="wrap-list-setting">
          <li>
            <div class="inner">
              <div class="inner-title">
                <h2 class="txt-title">혜택 정보수신 여부</h2>
              </div>
              <div class="inner-setting" v-if="true">
                <div class="wrap-check">
                  <input type="checkbox" id="smartLogin" class="inp-setting" />
                  <label for="smartLogin"><span class="hidden">동의함</span></label>
                </div>
              </div>
            </div>
            <!-- 수정 START : 2020.02.17 텍스트 수정 -->
            <p class="txt-desc">
              이벤트 소식 및 다양한 혜택 안내 수신 여부를 선택해주세요.<br/>
              수신거부하시면 쇼핑 정보 제공이 제한될 수 있습니다.
            </p>
            <!-- 수정 END : 2020.02.17 텍스트 수정 -->
          </li>
        </ul>
      </section>
      <!-- 수정 END : 2020.02.13 마크업 변경 -->
      <!-- START : 하단 버튼 -->
      <!-- 수정 START : 2020.02.13 bg-gray 클래스 삭제 -->
      <div class="btn-area">
      <!-- 수정 END : 2020.02.13 bg-gray 클래스 삭제 -->
        <button type="button" class="btn-lg btn-bg lightgreen" @click="onUpdate()"><span>수정하기</span></button>
        <div class="wrap-link-area">
          <a href="#" class="link-underbar" title="회원탈퇴 링크 이동">회원 탈퇴</a>
        </div>
      </div>
      <!-- END : 하단 버튼 -->
      <PopupPasswordChange @popupEvent="popupAction" v-if="this.popup.popupPasswordChange" /> <!-- 비밀번호변경 안내 팝업 / 수정 : 2020.03.05 추가 -->
    </main>
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import PopupPasswordChange from '@/views/cu/mbrmgnt/PopupPasswordChange';// 비밀번호변경 안내 팝업 / 수정 : 2020.03.05 추가
import StringUtils from '@/common/StringUtils';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "AssociateMemberModify",
  data() {
    return {
      // 수정 START : 2020.03.05 추가
      popup: { // 팝업
        open: false,
        popupPasswordChange: false, // 비밀번호변경 안내 팝업
      },
     userInfo: {},
      form: {
        hpend: '',
      },
        setTime: {
        timeCounter: 180,
        polling: null,
        chkTime: 'Y',
        resTimeData: '03:00'
      },
     hpCertiChk: {
        hpCerti: '',
        autChk: '인증번호 전송'
      },
      custNm: "",
      mobileNo: "",
      eMailAddr: "",
      certContent: "",
      certSend: "",
      // 수정 END : 2020.03.05 추가
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
    PopupPasswordChange // 수정 : 2020.03.05 추가
  },
  methods: {
    // 수정 START : 2020.03.05 추가
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`]; // popup
      this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false; // view - body
      if (this.popup.popupAgreement) {
        this.popup.open = true;
      };
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
        this.custNm = this.userInfo.custNm;
        this.mobileNo = this.userInfo.hp1 + this.userInfo.hp2 + this.userInfo.hp3;
        this.eMailAddr = this.userInfo.email +"@"+ this.userInfo.emailSite;
     },
    // 수정 END : 2020.03.05 추가
    getHpAuthentication: async function() {
      const tmpHp = this;
      const mobileNo = document.getElementById("tel").value;
      if (StringUtils.isEmpty(mobileNo)) {
        this.$gsdialog.alert("인증번호를 입력해주세요.");
        // tmpHp.form.hpend.setfocus();
      }
      const email = this.userInfo.emailAddr1 + this.userInfo.emailAddr2;
      const hp = mobileNo;
        const hpAuth = {
              hp: hp
        };
        const ret = await ApiUtils.get('/fo/cu/mbrmgnt/hp-certification', hpAuth);
        if (ret.data.data.chkKey !=null || ret.data.data.chkKey !='') {
          sessionStorage.setItem('chkKey', ret.data.data.chkKey);
          // this.$gsdialog.alert('인증번호가 전송되었습니다.');
          this.$gsdialog.alert('인증번호가 전송되었습니다.\n'+ret.data.data.hpCode);
          this.certSend = "입력하신 휴대폰번호로 인증번호가 발송되었습니다.";
          this.certContent = "";
          const timeCnt = this.setTime.timeCounter;
          if (timeCnt === 180) {
            this.hpCertiChk.autChk = '재전송';
            tmpHp.start();
          } else {
            tmpHp.smsReset();
          }
        } else {
          this.$gsdialog.alert('시스템 오류');
        }
    },
     async getAuthentication() {
      const timeCnt = this.setTime.timeCounter;
      const oldkey = sessionStorage.getItem('chkKey');
      const authen = {
        oldChkKey: oldkey,
        chkKey: this.form.chkKey
      };
      if (timeCnt > 0) {
        const ret = await ApiUtils.get('/fo/cu/mbrmgnt/hp-certification-check', authen);
        const mobileNo = document.getElementById("tel").value;
        if (ret.data.data.resultCode =="00000") {
          this.$gsdialog.alert(ret.data.data.resultMessage);
          this.userInfo.hp1 = mobileNo.substr(0, 3);
          this.userInfo.hp2 = mobileNo.length > 10 ? mobileNo.substr(3, 4) : mobileNo.substr(3, 3);
          this.userInfo.hp3 = mobileNo.length > 10 ? mobileNo.substr(7, 4) : mobileNo.substr(6, 4);
         // console.log(JSON.stringify( this.userInfo));
        } else {
          this.$gsdialog.alert('인증번호가 올바르지 않습니다. 다시 확인해주세요.');
          this.certContent = "인증번호가 올바르지 않습니다. 다시 확인해주세요.";
        }
        // this.$gsdialog.alert('인증번호를 입력해주세요');
      } else {
        this.$gsdialog.alert('인증시간이 지났습니다.\n 다시 휴대폰 인증을 진행해주세요.');
        this.certContent = "인증시간이 지났습니다.\n 다시 휴대폰 인증을 진행해주세요.";
      }
    },
    // 점유인증 시작
    start: function() { // 1초에 한번씩 start 호출
      this.setTime.polling = setInterval(() => {
        let setCount = this.setTime.timeCounter;
        setCount = setCount-1;
        this.setTime.timeCounter = setCount;
        const settime = setCount/60;
        const minutes = parseInt(settime);
        const secondes = Math.round((settime - minutes)*60);
        const ret = this.pad(minutes, 2) + ":" + this.pad(secondes, 2);
        this.setTime.resTimeData = ret;
        if (setCount <= 0) {
          this.timeStop();
        }
      }, 1000 );
    },
    pad: function(n, width) {
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    },
    timeStop: function() {
      clearInterval(this.setTime.polling);
      this.setTime.chkTime = 'N';
    },
    smsReset: function() {
      clearInterval(this.setTime.polling);
      this.setTime.chkTime = 'Y';
      this.setTime.timeCounter = 180;
      this.start();
    },
    // 점유인증 끝
   onUpdate: async function() {
     // this.userInfo.emailSite = this.select['list'].selected;
      // console.log(JSON.stringify( this.userInfo));
      const MbrInfoModInputDto = {
        reqSubCoCode: '1', // 변경요청 자사코드
        subCoCustNo: '', // 자사 고객번호
        intgrCustNo: '', // 통합 고객번호
        intgrWebId: this.userInfo.webId, // 통합 웹ID
        custDivCode: '', // 고객 구분 코드
        sexCode: this.userInfo.genCd, // 성별 코드
        custName: this.userInfo.custNm, // 고객 명
        emUseAgreeInd: this.userInfo.emailRcvYn, // em 활용 동의 여부
        tmUseAgreeInd: this.userInfo.telRcvYn, // tm 활용 동의 여부
        smsUseAgreeInd: this.userInfo.smsRcvYn, // sms 활용 동의 여부
        dmUseAgreeInd: this.userInfo.dmRcvYn, // dm 활용 동의 여부
        email: this.userInfo.email+"@"+this.userInfo.emailSite, // 이 메일주소
        hpHeadTelNo: this.userInfo.hp1, // 휴대폰 앞 전화번호
        hpMidTelNo: this.userInfo.hp2, // 휴대폰 중간 전화번호
        hpTailTelNo: this.userInfo.hp3, // 휴대폰 끝 전화번호
        upasVal: this.userInfo.upasVal, // 개인통관고유부호
        ofsItemProcSpCd: this.userInfo.ofsItemProcSpCd,
        cashRecptIssuTypeCd: this.userInfo.cashRecptIssuTypeCd,
        cashRecptInputNo: this.userInfo.cashRecptInputNo,
        tdrMeansCd: this.userInfo.tdrMeansCd,
        crcoCd: this.userInfo.crcoCd,
        adltCertDttm: this.userInfo.adltCertDttm,
      };
      const success = this.isValidation();
      if (success) {
        const resultMbrInfo= await ApiUtils.put('/fo/cu/mbrmgnt/member-information', MbrInfoModInputDto); // 회원정보수정하기
        // alert(JSON.stringify( resultMbrInfo));
        if (resultMbrInfo.data.success) { // TODO CRM API 호출하는 기능 구현 전이므로 현재는 false떨어진다.
         this.$gsdialog.alert('정상적으로 수정되었습니다.').then(dialog =>{
       //  this.$gsdialog.alert('정상적으로 처리되었습니다.<BR><BR>GS 리테일 '+ DateUtils.getToday() + '<br>'+(this.userInfo.emailRcvYn == 'Y'?'E-MAIL : 수신동의':'E-MAIL : 수신거부')+'<br>'+(this.userInfo.telRcvYn == 'Y'?'전화 : 수신동의':'전화 : 수신거부')+'<br>'+(this.userInfo.dmRcvYn == 'Y'?'우편 및 우편물 : 수신동의':'우편 및 우편물 : 수신거부')+'<br>'+(this.userInfo.smsRcvYn == 'Y'?'SMS : 수신동의':'SMS : 수신거부')+'<br>');
         this.getMbrInfo();
        this.getSnsMng();
         });
         } else {
           this.$gsdialog.alert('정보 수정 시 오류가 발생했습니다.');
          //  this.getMbrInfo();
          //  this.getSnsMng();
         }
      }
    },
    isValidation() {
      const success = true;
      /*    if (StringUtils.isEmpty(this.userInfo.email) ) {
         this.$gsdialog.alert('이메일을 입력해주세요.');
         document.getElementById("email").focus();
         success = false;
      }
      if (StringUtils.isEmpty(this.userInfo.emailSite) ) {
          this.$gsdialog.alert('이메일을 입력해주세요');
           document.getElementById("emailSite").focus();
          success = false;
      }
      if (!document.getElementById("emailYn").checked && !document.getElementById("smsYn").checked && !document.getElementById("dmYn").checked && !document.getElementById("telYn").checked) {
          this.$gsdialog.alert('광고성 정보수신여부를 설정해주세요.');
          success = false;
      }
      */
      return success;
    },
      getSnsMng: async function() { // TODO : sns연결관리
        const result = await ApiUtils.get('/fo/cu/loginmgnt/sns-connection-list', null);
        this.snsConMngs = result.data.data.snsConListDto;
      if (this.snsConMngs != null) { // list가 null일경우
        for (let i = 0; i < this.snsConMngs.length; i++) {
          if (this.snsConMngs[i].snsType == '01') { // 네이버
            if (this.snsConMngs[i].snsConYn == 'Y') {
                document.getElementById("naver").checked = true;
                this.snsNaverMsg = this.snsConMngs[i].snsConMsg;
                this.snsNaverSnsId = this.snsConMngs[i].snsId;
            } else {
                document.getElementById("naver").checked = false;
                this.snsNaverMsg = "";
                this.snsNaverSnsId = this.snsConMngs[i].snsId;
             }
          } else if (this.snsConMngs[i].snsType == '02') { // 카카오톡
             if (this.snsConMngs[i].snsConYn == 'Y') {
                document.getElementById("kakaotalk").checked = true;
                this.snsKakaoMsg = this.snsConMngs[i].snsConMsg;
                this.snsKakaoSnsId = this.snsConMngs[i].snsId;
             } else {
                document.getElementById("kakaotalk").checked = false;
                this.snsKakaoMsg = "";
                this.snsKakaoSnsId = this.snsConMngs[i].snsId;
             }
          } else if (this.snsConMngs[i].snsType == '03') { // 페이스북
             if (this.snsConMngs[i].snsConYn == 'Y') {
                document.getElementById("facebook").checked = true;
                this.snsFacebookMsg = this.snsConMngs[i].snsConMsg;
                this.snsFacebookSnsId = this.snsConMngs[i].snsId;
             } else {
                document.getElementById("facebook").checked = false;
                this.snsFacebookMsg = "";
                this.snsFacebookSnsId = this.snsConMngs[i].snsId;
             }
          } else if (this.snsConMngs[i].snsType == '04') { // 페이코
             if (this.snsConMngs[i].snsConYn == 'Y') {
                document.getElementById("payco").checked = true;
                this.snsPaycoMsg = this.snsConMngs[i].snsConMsg;
                this.snsPaycoSnsId = this.snsConMngs[i].snsId;
             } else {
                document.getElementById("payco").checked = false;
                this.snsPaycoMsg = "";
                this.snsPaycoSnsId = this.snsConMngs[i].snsId;
             }
              console.log("===="+JSON.stringify(result.data.data.snsConListDto)+"::::");
          }
        }
      } else {
         document.getElementById("naver").checked = false;
         document.getElementById("kakaotalk").checked = false;
         document.getElementById("payco").checked = false;
         document.getElementById("facebook").checked = false;
      }
    },
  },
  // 수정 START : 2020.03.05 추가
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++ ) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
     // clearAllBodyScrollLocks(this);
    }
  },
  // 수정 END : 2020.03.05 추가
  destroyed() {
  },
  mounted() {
    this.getMbrInfo();
    this.getSnsMng();
  },
};
</script>
