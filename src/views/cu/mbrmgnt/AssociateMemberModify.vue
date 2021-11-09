<!--
SC-FO-SS-GF-MS-905.vue
-->
<template>
  <!-- 수정 START : 2020.02.13 wrap-setting 클래스 추가 -->
  <div class="wrap-mypage member-info wrap-setting" v-bind:class="[siteClass, {'integrate-member__wrap' : siteClass == 'marketfor'}]">
  <!-- 수정 END : 2020.02.13 wrap-setting 클래스 추가 -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="회원정보수정"/>
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
                <i class="ico naver" id = "naver" aria-label="SNS 연동 네이버" v-if="naver"></i>
                <i class="ico facebook" id = "facebook" aria-label="SNS 연동 페이스북" v-if="facebook"></i>
                <i class="ico kakaotalk" id = "kakaotalk" aria-label="SNS 연동 카카오" v-if="kakao"></i>
                <i class="ico payco" id = "payco" aria-label="SNS 연동 페이코" v-if="payco"></i>
                <i class="ico apple" id = "apple" aria-label="SNS 연동 애플" v-if="apple"></i>
                <!-- 2020.03.30 START 아이콘 코드 수정 -->
              </div>
            </td>
          </tr>
          <!-- 수정 START : 2020.04.01 마크업 수정 -->
          <tr v-if="!snsLogin">
            <th scope="row">아이디<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <span class="data">{{userInfo.webId}}</span>
              <!-- 수정 START : 2020.03.05 팝업 이벤트 추가 -->
              <button class="btn-modify" aria-haspopup="dialog" aria-label="수정" @click="popupAction('popupPasswordChange')">비밀번호 변경</button>
              <!-- 수정 END : 2020.03.05 팝업 이벤트 추가 -->
            </td>
          </tr>
          <tr>
            <th scope="row">휴대폰번호<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <div class="area-number" :class="{hide : isAuth === true}">
                <span class="data">{{userInfo.hp1}}-{{userInfo.hp2}}-{{userInfo.hp3}}</span>
                <button class="btn-modify" @click="numberChange">번호 변경</button>
              </div>
              <!-- START : 점유인증 -->
              <div class="wrap-insert-number" :class="{show : isAuth === true}">
                <div class="inp-box wrap-inp-btn">
                  <label for="tel" class="hidden">휴대폰번호</label>
                  <input type="text" id="tel" class="inp-txt" placeholder="‘-’ 없이 숫자만" value="" maxlength="11" @keyup="chkAuth($event)" @blur="getChkValue($event)" v-model=form.hpend>
                  <button id="auth" class="btn-gray" aria-label="재전송" v-bind:disabled="disabledEv.isButtonAuth" @click="getHpAuthentication()">{{hpCertiChk.autChk}}</button>
                  <span class="txt-notice">{{certSend}}</span>
                </div>
                <div class="inp-box error"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                  <div class="inp-box-time">
                    <label for="tel1" class="hidden">인증번호</label>
                    <input type="text" id="tel1" class="inp-number" value="" maxlength="6" placeholder="인증번호 입력" @keyup="chkAuth($event)" v-bind:disabled="disabledEv.isButtonAuthChk" v-model=form.chkKey>
                    <p class="txt-time"><!--남은 시간--><span>{{setTime.resTimeData}}</span></p>
                  </div>
                  <span class="txt-error" aria-label="입력 오류 메시지">{{certContent}}</span>
                  <button class="btn-gray" id="authChk" v-bind:disabled="disabledEv.isButtonAuthChk" @click="getAuthentication()">인증번호 확인</button>
                </div>
              </div>
              <!-- END : 점유인증 -->
            </td>
          </tr>
          <!-- START : SNS 가입회원 -->
          <tr>
            <th scope="row">이메일<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <div class="inp-box wrap-inp-select error"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label for="email" class="hidden">이메일</label>
                <input type="email" id="email" class="inp-txt" v-model="userInfo.email" placeholder="이메일을 입력해주세요">
                <span class="at">@</span>
                <SelectUIInput :type="'list'" :selectData="select.list" @selectEvent="selectAction" @changeEvent="changeSelectAction"/>
                <span class="txt-error" aria-label="입력 오류 메시지" v-if="userInfo.email == ''">이메일을 입력해주세요</span>
              </div>
            </td>
          </tr>
          <!-- END : SNS 가입회원 -->
          <!-- 수정 END : 2020.04.01 마크업 수정 -->
          <!-- 수정 : 2020.02.21 SNS 가입회원이 점유인증 시 또는 이메일아이디로 가입 시 마크업 삭제 -->
          </tbody>
        </table>
      </section>
      <!-- 수정 START : 2020.03.30 마크업 변경 -->
      <section class="section-area">
        <ul class="wrap-list-setting type02">
          <li>
            <div class="inner">
              <div class="inner-title">
                <h2 class="txt-title">혜택 정보수신 여부</h2>
              </div>
              <div class="inner-setting" v-if="false">
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
          <li>
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <span>SMS</span>
                  <span class="required" aria-label="필수 항목">*</span>
                </div>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="smsYn" class="inp-setting" @click="sendChk('smsYn','smsRcvYn');"/>
                  <label for="smsYn"><span class="hidden">동의함</span></label>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <span>E-MAIL</span>
                  <span class="required" aria-label="필수 항목">*</span>
                </div>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="emailYn" class="inp-setting"  @click="sendChk('emailYn','emailRcvYn');"/>
                  <label for="emailYn"><span class="hidden">동의함</span></label>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <!-- 수정 END : 2020.03.30 마크업 변경 -->
      <!-- START : 하단 버튼 -->
      <!-- 수정 START : 2020.02.13 bg-gray 클래스 삭제 -->
      <div class="btn-area">
      <!-- 수정 END : 2020.02.13 bg-gray 클래스 삭제 -->
        <button type="button" class="btn-lg btn-bg lightgreen" @click="onUpdate()"><span>수정하기</span></button>
        <div class="wrap-link-area">
          <gs-link to="/cu/member_withdrawal">회원 탈퇴</gs-link>
         <!-- <a href="#" class="link-underbar" title="회원탈퇴 링크 이동">회원 탈퇴</a> -->
        </div>
      </div>
      <!-- END : 하단 버튼 -->
      <PopupPasswordChange @popupEvent="popupAction" v-if="this.popup.popupPasswordChange" /> <!-- 비밀번호변경 안내 팝업 / 수정 : 2020.03.05 추가 -->
    </main>
    <!-- 4월 수정 START : 푸터 추가 -->
    <Footer />
    <!-- 4월 수정 END : 푸터 추가 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // '@/components/common/SubDefaultHeader';
import PopupPasswordChange from '@/views/cu/mbrmgnt/PopupPasswordChange'; // from '@/views/cu/SC-FO-CU-GF-MP-022'; // 비밀번호변경 안내 팝업 / 수정 : 2020.03.05 추가
import SelectUIInput from '@/components/common/SelectUIInput'; // 이메일 selectbox / 수정 : 2020.04.01 추가
import StringUtils from '@/common/StringUtils';
import ApiUtils from '@/common/ApiUtils';
import Footer from '@/components/common/Footer'; // 푸터
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "AssociateMemberModify",
  data() {
    return {
    // 수정 START : 2020.04.01 추가
      isAuth: false, // 점유인증 form
      select: {
        list: { // 정렬 - 상품정보
          open: false,
          selected: 'naver.com'
        },
      },
    // 수정 END : 2020.04.01 추가
      // 수정 START : 2020.03.05 추가
      popup: { // 팝업
        open: false,
        popupPasswordChange: false, // 비밀번호변경 안내 팝업
      },
      // 수정 END : 2020.03.05 추가
    userInfo: {},
      form: {
        hpend: '',
        chkKey: ''
      },
        setTime: {
        timeCounter: 180,
        polling: null,
        chkTime: 'Y',
        resTimeData: ''
      },
      hpCertiChk: {
        hpCerti: false,
        autChk: '인증번호 전송'
      },
      disabledEv: {
        isButtonAuthChk: true,
        isButtonAuth: false,
      },
      custNm: "",
      mobileNo: "",
      eMailAddr: "",
      certContent: "",
      certSend: "",
      naver: false,
      kakao: false,
      facebook: false,
      payco: false,
      apple: false,
      snsLogin: false,
      // 수정 END : 2020.03.05 추가
      crmHpDupRsltList: [],
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '회원정보 수정 < 회원정보 < 마이페이지 < %s',
    meta: [
      // 앱 트래커 메타정보
      {
        property: 'aa:page',
        content: '회원정보수정',
      },
    ],
  },
  mixins: [],
  components: {
    SubDefaultHeader,
    PopupPasswordChange, // 수정 : 2020.03.05 추가
    SelectUIInput, // 수정 : 2020.04.01 추가
    Footer,
  },
  methods: {
    // 수정 START : 2020.04.01 추가
    selectAction(type) { // 리스트, 이메일 selectbox 활성화
      if (!this.select[type].open) {
        Object.keys(this.select).map( (select) => {
          this.select[select].open = false;
        });
      }
      this.select[type] = Object.assign({}, this.select[type], {open: !this.select[type].open});
    },
    changeSelectAction(type, selectedData) { // 리스트, 이메일 selectbox 정렬 변경
      this.select[type] = Object.assign({}, this.select[type], {open: false, selected: selectedData});
    },
    // 수정 END : 2020.04.01 추가
    // 수정 START : 2020.03.05 추가
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`]; // popup
      this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false; // view - body
      if (this.popup.popupAgreement) {
        this.popup.open = true;
      };
    },
    // 수정 END : 2020.03.05 추가
    numberChange() { // 번호변경 버튼 클릭시 점유인증 활성화 // 수정 2020.04.01 추가
      this.isAuth = true;
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
    this.select['list'].selected = this.userInfo.emailSite;
      console.log("===="+JSON.stringify(this.userInfo)+"::::");
    this.getSendYn(); // 정보수신여부
  },
    // 수정 END : 2020.03.05 추가
    getHpAuthentication: async function() {
      const tmpHp = this;
      const mobileNo = tmpHp.form.hpend;
      if (StringUtils.isEmpty(mobileNo)) {
        tmpHp.certSend = '휴대폰번호 입력해주세요.';
        return false;
      } else {
        tmpHp.certSend= '';
      }
      const email = this.userInfo.emailAddr1 + this.userInfo.emailAddr2;
      const hp = mobileNo;
        const hpAuth = {
              hp: hp
        };
       const retDup = await ApiUtils.get('/fo/cu/mbrmgnt/hp-duplication', hpAuth);
       this.crmHpDupRsltList = retDup.data.data.crmHpDupRsltList;
        if (!StringUtils.isEmpty(this.crmHpDupRsltList)) {
        for (let i=0; i < this.crmHpDupRsltList.length; i++) {
          // console.log(this.userInfo.custNo +"::" + this.crmHpDupRsltList[i].custNo);
          if (this.userInfo.custNo != this.crmHpDupRsltList[i].custNo) {
              tmpHp.certSend = '이미 가입되어 있는 휴대폰번호입니다. 다시 확인해주세요.';
              return false;
          }
        }
        }
        const ret = await ApiUtils.get('/fo/cu/mbrmgnt/hp-certification', hpAuth);
        if (ret.data.data.chkKey !=null || ret.data.data.chkKey !='') {
          sessionStorage.setItem('chkKey', ret.data.data.chkKey);
          // this.$gsdialog.alert('인증번호가 전송되었습니다.');
         // this.$gsdialog.alert('인증번호가 전송되었습니다.<br\>'+ret.data.data.hpCode, { html: true }).then(dialog => {
            this.$gsdialog.alert('인증번호가 전송되었습니다.<br\>', { html: true }).then(dialog => {
            this.certSend = "입력하신 휴대폰번호로 인증번호가 발송되었습니다.";
            this.certContent = "";
            const timeCnt = this.setTime.timeCounter;
            if (timeCnt === 180) {
              this.hpCertiChk.autChk = '재전송';
              this.disabledEv.isButtonAuthChk = false;
              this.hpCertiChk.hpCerti = false;
              this.form.chkKey = '';
              tmpHp.start();
            } else {
              this.hpCertiChk.autChk = '재전송';
              this.form.chkKey = '';
              this.disabledEv.isButtonAuthChk = false;
              this.hpCertiChk.hpCerti = false;
              tmpHp.smsReset();
            }
          });
        } else {
          this.$gsdialog.alert(ret.data.data.resultMessage, { html: true });
        }
    },
    // 인증번호 확인
    async getAuthentication() {
      const timeCnt = this.setTime.timeCounter;
      const oldkey = sessionStorage.getItem('chkKey');
      const authen = {
        oldChkKey: oldkey,
        chkKey: this.form.chkKey + document.getElementById("tel").value
      };
      if (timeCnt > 0 && !StringUtils.isEmpty(authen.chkKey)) {
        const ret = await ApiUtils.get('/fo/cu/mbrmgnt/hp-certification-check', authen);
        const mobileNo = document.getElementById("tel").value;
        if (ret.data.data.resultCode == '00000') {
          this.smsClear();
          this.setTime.resTimeData = '';
          this.form.chkKey = '';
          this.hpCertiChk.hpCerti = true;
          this.disabledEv.isButtonAuthChk = true;
          this.$gsdialog.alert(ret.data.data.resultMessage, { html: true });
          this.certContent = "인증이 완료되었습니다";
          this.userInfo.hp1 = mobileNo.substr(0, 3);
          this.userInfo.hp2 = mobileNo.length > 10 ? mobileNo.substr(3, 4) : mobileNo.substr(3, 3);
          this.userInfo.hp3 = mobileNo.length > 10 ? mobileNo.substr(7, 4) : mobileNo.substr(6, 4);
          this.isAuth = false;
        } else {
          this.hpCertiChk.hpCerti = false;
          this.form.chkKey = '';
          this.certContent = "인증번호가 올바르지 않습니다. 다시 확인해주세요.";
        }
      } else {
        this.hpCertiChk.hpCerti = false;
        this.form.chkKey = '';
        this.certContent = "인증시간이 지났습니다.<br\> 다시 휴대폰 인증을 진행해주세요.";
        sessionStorage.removeItem('chkKey');
      }
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
   onUpdate: async function() {
     // this.userInfo.emailSite = this.select['list'].selected;
      console.log(JSON.stringify( this.userInfo));
      this.userInfo.emailSite = this.select['list'].selected;
      const MbrInfoModInputDto = {
        pswRechkToken: this.$route.params.pswRechkToken,
        custNm: this.userInfo.custNm, // 고객명
        emailAddr: this.userInfo.email+"@"+this.userInfo.emailSite, // 이메일주소
        emailRcvYn: this.userInfo.emailRcvYn, // 이메일수신여부
        moblTelNo: this.userInfo.hp1 + this.userInfo.hp2 + this.userInfo.hp3, // 휴대전화번호
        smsRcvYn: this.userInfo.smsRcvYn, // SMS수신여부
        genCd: this.userInfo.genCd, // 성별코드
        bthym: this.userInfo.bthym, // 생년월일
        dmRcvYn: this.userInfo.dmRcvYn, // DM수신여부
        telRcvYn: this.userInfo.telRcvYn, // 전화수신여부
        ofsItemProcSpCd: this.userInfo.ofsItemProcSpCd, // 결품상품처리구분코드
        cashRecptIssuTypeCd: this.userInfo.cashRecptIssuTypeCd, // 현금영수증발행유형코드
        cashRecptInputNo: this.userInfo.cashRecptInputNo, // 현금영수증입력번호
        tdrMeansCd: this.userInfo.tdrMeansCd, // 결제수단코드
        crcoCd: this.userInfo.crcoCd, // 카드사코드
        adltCertDttm: this.userInfo.adltCertDttm, // 성인인증일시
        upasVal: this.userInfo.upasVal, // 개인통관고유부호값
        uhpHeadTelNo: this.userInfo.hp1, // 휴대폰 앞 전화번호
        uhpMidTelNo: this.userInfo.hp2, // 휴대폰 중간 전화번호
        uhpTailTelNo: this.userInfo.hp3, // 휴대폰 끝 전화번호
      };
        console.log("=32sdfasdf==="+JSON.stringify(MbrInfoModInputDto)+"::::");
      const success = this.isValidation();
      if (success) {
        const resultMbrInfo= await ApiUtils.put('/fo/cu/mbrmgnt/member-information-token', MbrInfoModInputDto); // 회원정보수정하기
        // alert(JSON.stringify( resultMbrInfo));
        if (resultMbrInfo.success) { // TODO CRM API 호출하는 기능 구현 전이므로 현재는 false떨어진다.
         this.$gsdialog.alert('정상적으로 수정되었습니다.', { html: true }).then(dialog =>{
            scroll(0, 0);
            this.getMbrInfo();
            this.getSnsMng();
         });
         } else {
          this.$gsdialog.alert('정보 수정 시 오류가 발생했습니다.', { html: true }).then(dialog =>{
          //  this.getMbrInfo();
          //  this.getSnsMng();
          });
         }
      }
    },
    isValidation() {
      let success = true;
        if (StringUtils.isEmpty(this.userInfo.email) ) {
         this.$gsdialog.alert('이메일을 입력해주세요.', { html: true });
        // document.getElementById("email").focus();
         success = false;
      }
      if (StringUtils.isEmpty(this.userInfo.emailSite) ) {
          this.$gsdialog.alert('이메일을 입력해주세요', { html: true });
         //  document.getElementById("emailSite").focus();
          success = false;
      }
      if ((this.hpCertiChk.hpCerti !== true) && this.isAuth === true) {
          this.$gsdialog.alert('변경하실 휴대폰번호를 확인해주세요.', { html: true });
         //  document.getElementById("emailSite").focus();
          success = false;
      }
      /*
      if (!document.getElementById("emailYn").checked && !document.getElementById("smsYn").checked && !document.getElementById("dmYn").checked && !document.getElementById("telYn").checked) {
          this.$gsdialog.alert('광고성 정보수신여부를 설정해주세요.');
          success = false;
      }
      */

      return success;
    },
     getSnsMng: async function() { //  sns연결관리
        const result = await ApiUtils.get('/fo/cu/loginmgnt/sns-connection-list', null);
        this.snsConMngs = result.data.data.snsConListDto;
        console.log("==1=="+JSON.stringify(result.data.data.snsConListDto)+"::::");
     // if (this.snsConMngs != null) { // list가 null일경우
        for (let i = 0; i < this.snsConMngs.length; i++) {
          if (this.snsConMngs[i].snsType == '01') { // 네이버
            if (this.snsConMngs[i].snsConYn == 'Y') {
               // document.getElementById("naver").style.display = "block";
                this.naver = true;
            } else {
             //   document.getElementById("naver").style.display ="none";
             this.naver = false;
             }
          } else if (this.snsConMngs[i].snsType == '02') { // 카카오톡
             if (this.snsConMngs[i].snsConYn == 'Y') {
               // document.getElementById("kakaotalk").style.display = "block";
                 this.kakao = true;
             } else {
              //  document.getElementById("kakaotalk").style.display = "none";
              this.kakao = false;
             }
          } else if (this.snsConMngs[i].snsType == '03') { // 페이스북
             if (this.snsConMngs[i].snsConYn == 'Y') {
               // document.getElementById("facebook").style.display = "block";
                  this.facebook = true;
             } else {
                // document.getElementById("facebook").style.display = "block";
                this.facebook = false;
             }
          } else if (this.snsConMngs[i].snsType == '04') { // 페이코
             if (this.snsConMngs[i].snsConYn == 'Y') {
               // document.getElementById("payco").style.display = "block";
                  this.payco = true;
             } else {
               // document.getElementById("payco").style.display = "none";
                this.payco = false;
             }
              console.log("==2=="+JSON.stringify(result.data.data.snsConListDto)+"::::");
          } else if (this.snsConMngs[i].snsType == '05') { // 애플
             if (this.snsConMngs[i].snsConYn == 'Y') {
               // document.getElementById("apple").style.display = "block";
                  this.apple = true;
             } else {
               // document.getElementById("apple").style.display = "none";
                this.apple = false;
             }
              console.log("==2=="+JSON.stringify(result.data.data.snsConListDto)+"::::");
          }
          if (this.naver || this.kakao || this.facebook || this.payco || this.apple) {
            this.snsLogin = true;
          } else {
            this.snsLogin = false;
          }
        }
     // } else {
     //   alert("ddd");
     //    document.getElementById("naver").style.display = "block";
    //     document.getElementById("kakaotalk").style.display = "none";
     //    document.getElementById("payco").style.display = "none";
    //     document.getElementById("facebook").style.display = "none";
    //  }
    },
    /*
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
    */
    getSendYn() {
      if (this.userInfo.emailRcvYn == "Y") {
         document.getElementById("emailYn").checked = true;
      } else {
         document.getElementById("emailYn").checked= false;
      }
      if (this.userInfo.smsRcvYn == "Y") {
         document.getElementById("smsYn").checked = true;
      } else {
         document.getElementById("smsYn").checked= false;
      }
         // this.changeSelectAction('list', 'daum.net');
    },
    sendChk: function(div, pdiv) { // 혜택정보수신체크
      if (document.getElementById(div).checked) {
         document.getElementById(div).checked = true;
        eval("this.userInfo."+pdiv+" = 'Y'");
      } else {
         document.getElementById(div).checked = false;
        eval("this.userInfo."+pdiv+" = 'N'");
      }
       console.log("===="+JSON.stringify(this.userInfo)+"::::");
    },
    checkRegularMember: async function(url) {
       const MbrInfoInqInputDto = {locationURL: url};
       const result = await ApiUtils.get('/fo/cu/mbrmgnt/checkURL', MbrInfoInqInputDto); // 회원탈퇴하기
       localStorage.removeItem("reqUrl");
       if (!result.data.success) {
         this.$gsdialog.alert('해당페이지에 접근권한이 없습니다.', { html: true }).then(dialog =>{
            history.back();
        });
       } else {
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
        this.select['list'].selected = this.userInfo.emailSite;
        console.log("===="+JSON.stringify(this.userInfo)+"::::");

        this.getSendYn(); // 정보수신여부
       }
     },
    chkAuth(e) {
      // 점유인증 버튼 활성화
      const value = e.target.value;
      const id = e.target.id;
      const telChk = /(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
      // const telChk2 = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
      if (StringUtils.isEmpty(value)) {
        if (id == 'tel') {
          this.hpCertiChk.autChk = '인증번호 전송';
          this.certSend = '휴대폰번호 입력해주세요.';
          this.disabledEv.isButtonAuth = true;
        }
        if (id == 'tel1') {
        }
      } else {
        if (id == 'tel') {
          const reg = /[^0-9]/gi;
          e.target.value = value.replace(reg, '');
          this.form.hpend = value.replace(reg, '');
          if (telChk.test(value) == false) {
            this.disabledEv.isButtonAuth = true;
            this.certSend = '올바른 휴대폰 번호를 입력해주세요.';
          } else {
            this.disabledEv.isButtonAuth = false;
            this.certSend = '';
          }
        }
        if (id == 'tel1') {
          this.disabledEv.isButtonAuthChk = false;
          const reg = /[^0-9]/gi;
          e.target.value = value.replace(reg, '');
          this.form.chkKey = value.replace(reg, '');
        }
      }
    },
    // ValidationCheck
    getChkValue(e) {
      const vm = this;
      const value = e.target.value;
      const id = e.target.id;
      if (id == 'tel') {
        // 이름
        if (StringUtils.isEmpty(value)) {
          vm.certSend = '휴대폰번호 입력해주세요.';
          return false;
        }
      }
      return true;
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
    //  clearAllBodyScrollLocks(this);
    }
  },
  // 수정 END : 2020.03.05 추가
  destroyed() {
  },
  mounted() {
    const pswRechkToken = this.$route.params.pswRechkToken;
    this.checkRegularMember(pswRechkToken); //   console.log('step2,', JSON.stringify(window.d));
    // this.getMbrInfo(); // 회원정보조회
    this.getSnsMng(); // SNS여부
  },
};
</script>
