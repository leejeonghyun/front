<!--
SC-FO-SS-GF-MS-906
-->
<template>
  <!-- 수정 START : 2020.02.13 bg-gray 클래스 삭제, wrap-setting 클래스 추가 -->
  <div class="wrap-mypage member-info wrap-setting" v-bind:class="[siteClass, {'integrate-member__wrap' : siteClass == 'marketfor'}]">
  <!-- 수정 END : 2020.02.13 bg-gray 클래스 삭제, wrap-setting 클래스 추가 -->
    <!-- START : 헤더 -->
    <MainHeader ref="header" :headertype="3" headerText="회원정보수정" v-if="cmmSiteId === '3'"/>
    <SubDefaultHeader headerText="회원정보수정" :prevType="true" v-else/>
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
              <span class="data" id="org_korName">{{userInfo.custNm}}</span>
              <!-- 수정 START : 2020.02.13 마크업 추가 -->
              <span class="employees"></span>
              <!-- 수정 END : 2020.02.13 마크업 추가 -->
                <input type="hidden" id="korName" v-model="userInfo.custNm"/>
              <button class="btn-modify" aria-label="수정" @click="getAuthentication('NM')">이름변경</button>
            </td>
          </tr>
          <tr v-if="isID">
            <th scope="row">아이디<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <span class="data">{{userInfo.webId}}</span>
              <button class="btn-modify" aria-haspopup="dialog" aria-label="수정" @click="popupAction('popupPasswordChange')">비밀번호 변경</button>
            </td>
          </tr>
          <tr v-if="!isID">
            <th scope="row">아이디<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <div class="inp-box error"  id="idErr"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label for="id2" class="hidden">아이디</label>
                <input type="text" id="idNew" ref="idNew" class="inp-txt" value=""
                placeholder="아이디를 입력해주세요"
                v-model="webIdNew"
                @keyup="getPressId($event)"
                @blur="getChkValuePrm($event)">
                <span class="txt-error">{{ idMsg }}</span>
              </div>
            </td>
          </tr>
          <tr v-if="!isID">
            <th scope="row">비밀번호<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <div class="inp-box error"  id="pwErr"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label for="pass1" class="hidden">비밀번호</label>
                <input type="password" id="passNew"  ref="passNew" class="inp-txt" value=""
                 v-model="webPwdNew"
                placeholder="비밀번호를 입력해주세요"
                @blur="getChkValuePrm($event)">
                <span class="txt-error">{{ passwordMsg }}</span>
              </div>
            </td>
          </tr>
          <tr v-if="!isID">
            <th scope="row">비밀번호 확인<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <div class="inp-box error"  id="pw2Err"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <label for="pass2" class="  hidden">비밀번호 확인</label>
                <input type="password" id="passNew2" ref="passNew2" class="inp-txt" value=""
                v-model="webPwdNew2"
                placeholder="비밀번호를 한번 더 입력해주세요"
                @blur="getChkValuePrm($event)">
                <span class="txt-error">{{ password2Msg }}</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">휴대폰번호<span class="required" aria-label="필수 항목">*</span></th>
            <td>
                <input type="hidden" id="hp1"  v-model="userInfo.hp1"/>
                <input type="hidden" id="hp2"  v-model="userInfo.hp2"/>
                <input type="hidden" id="hp3"  v-model="userInfo.hp3"/>
              <span class="data" id="hp_full">{{userInfo.hp1}}-{{userInfo.hp2}}-{{userInfo.hp3}}</span>
              <button class="btn-modify" aria-label="수정"  @click="getAuthentication('TEL')">번호 변경</button>
            </td>
          </tr>
          <!-- 수정 START : 2020.02.21 마크업 수정 -->
          <tr>
            <th scope="row">
              <label for="email">이메일<span class="required" aria-label="필수 항목">*</span></label>
            </th>
            <td>
              <div class="inp-box wrap-inp-select error"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <input type="email" id="email" class="inp-txt" value="" v-model="userInfo.email">
                <span class="at">@</span>
                <SelectUIInput :type="'list'" :selectData="select.list" @selectEvent="selectAction" @changeEvent="changeSelectAction" />
                <span class="txt-error">{{ emailMsg }}</span>
              </div>
            </td>
          </tr>
          <!-- 수정 END : 2020.02.21 마크업 수정 -->
          <!-- 수정 START : 2020.02.13 마크업 추가 -->
          <tr style="display: none;">
            <th scope="row">생년월일<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <span class="data">{{userInfo.bthymBar}}</span>
            </td>
          </tr>
          <!-- 수정 END : 2020.02.13 마크업 추가 -->
          <tr style="display: none;">
            <th scope="row">성별<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <span class="data">{{userInfo.genCd == 'M' ? '남성' : '여성'}}</span>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="number">개인통관<br/>고유부호</label>
            </th>
            <td>
              <div class="inp-box">
                <input type="text" id="serialNumber" class="inp-txt" placeholder="" v-model="userInfo.upasVal" maxlength="13">
                <button class="btn-reset" @click="clear();" ><span class="hidden">입력 초기화</span></button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <!-- 5월 수정 START : 개인통관고유부호 주문결제와 동일하게 수정 -->
        <div class="box-info unipass">
          <p class="check-area">
            <span class="inp-chk bg small">
              <input type="checkbox" name="" id="agree-num" value="">
              <label for="agree-num">개인통관고유부호 수집에 동의<span class="required" aria-label="필수 항목">*</span></label>
            </span>
          </p>
          <ul class="txt-info-list">
            <li class="ico-alert2">개인통관고유부호 정보는 원활한 통관을 위해 달리살다에서 수집 및 판매자에게 제공하고, 계속 사용하도록 안전하게 저장/관리 합니다.</li>
            <li class="ico-alert2">물품가액이 $150초과할 경우 관/부가세가 발생할 수 있으며, 물품 종류와 해외공급자 관계없이 같은 날 입항하게 되면 합산과세 대상이 됩니다.</li>
          </ul>
          <p class="text-right"><span class="btn-arr">
              <a href="https://unipass.customs.go.kr/csp/persIndex.do" target="_blank" title="새 창 열림">발급 신청하러 가기</a>
            </span></p>
        </div>
        <!-- 5월 수정 END : 개인통관고유부호 주문결제와 동일하게 수정 -->
      </section>
      <!-- 수정 : 2020.02.13 추가정보 영역 삭제 -->
      <!-- 수정 START : 2020.02.13 마크업 변경 -->
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
                <!--  <span class="required" aria-label="필수 항목">*</span> -->
                </div>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="smsRcvYn" class="inp-setting"  @click="sendChk('smsRcvYn');"/>
                  <label for="smsRcvYn"><span class="hidden">동의함</span></label>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <span>E-MAIL</span>
                <!--  <span class="required" aria-label="필수 항목">*</span> -->
                </div>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="emailRcvYn" class="inp-setting"  @click="sendChk('emailRcvYn');"/>
                  <label for="emailRcvYn"><span class="hidden">동의함</span></label>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <span>우편 및 우편물</span>
                <!--  <span class="required" aria-label="필수 항목">*</span> -->
                </div>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="dmRcvYn" class="inp-setting"  @click="sendChk('dmRcvYn');"/>
                  <label for="dmRcvYn"><span class="hidden">동의함</span></label>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <span>전화</span>
                <!--  <span class="required" aria-label="필수 항목">*</span> -->
                </div>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="telRcvYn" class="inp-setting"  @click="sendChk('telRcvYn');"/>
                  <label for="telRcvYn"><span class="hidden">동의함</span></label>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <!-- 수정 END : 2020.02.13 마크업 변경 -->
      <!-- START : 하단 버튼 -->
      <!-- 수정 START : 2020.02.13 bg-gray 클래스 삭제 -->
      <div class="btn-area">
      <!-- 수정 END : 2020.02.13 bg-gray 클래스 삭제 -->
        <button type="button" class="btn-lg btn-bg lightgreen"  @click="onUpdate();"><span>수정하기</span></button>
        <div class="wrap-link-area">
         <gs-link to="/cu/member_withdrawal">회원 탈퇴</gs-link>
         <br><br><br><br><br>
         <!--<a href="#" class="link-underbar" title="회원탈퇴 링크 이동" @click="mbrDropoutCheck();">회원 탈퇴</a> -->
        </div>
      </div>
     <form class="form-horizontal" id="subKmc" name="subKmc" method="post" action>
        <input type="hidden" id="tr_cert" name="tr_cert" v-model="form.trCert" />
        <input type="hidden" id="tr_url" name="tr_url" v-model="form.trUrl"/>
        <input type="hidden" id="tr_add" name="tr_add" v-model="form.trAdd" />
        <input type="hidden" id="rec_cert" name="rec_cert" value />
        <input type="hidden" id="certNum" name="certNum" value />
        <input type="hidden" id="chgNmOrTel" name="chgNmOrTel" value />
      </form>
      <!-- END : 하단 버튼 -->
    </main>
    <!-- 4월 수정 START : 푸터 추가 -->
    <Footer />
    <!-- 4월 수정 END : 푸터 추가 -->
    <PopupPasswordChange @popupEvent="popupAction" v-if="this.popup.popupPasswordChange" /> <!-- 비밀번호변경 안내 팝업 / 수정 : 2020.03.05 추가 -->
  </div>
</template>

<script>
import MainHeader from '@/components/common/SubDefaultHeader';
import SubDefaultHeader from '@/components/common/header/Header5';
import SelectUIInput from '@/components/common/SelectUIInput'; // 이메일 selectbox / 수정 : 2020.02.21 추가
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import PopupPasswordChange from '@/views/cu/mbrmgnt/PopupPasswordChange'; // 비밀번호변경 안내 팝업 / 수정 : 2020.03.05 추가
import Footer from '@/components/common/Footer'; // 푸터
import CuUtils from '@/common/cu/CuUtils';
export default {
  name: "RegularMemberModify",
  data() {
    return {
    // 수정 START : 2020.02.21 추가
      select: {
        list: { // 정렬 - 상품정보
          open: false,
          selected: 'naver.com'
        },
      },
      userInfo: {},
    //  userPreInfo: {},
      emailRcvYn: "",
      telRcvYn: "",
      dmRcvYn: "",
      smsRcvYn: "",
    // 수정 END : 2020.02.21 추가
    // 수정 START : 2020.03.05 추가
      popup: { // 팝업
        open: false,
        popupPasswordChange: false, // 비밀번호변경 안내 팝업
      },
    // 수정 END : 2020.03.05 추가
     form: {
        trCert: '',
        trUrl: '',
        trAdd: 'N',
        rec_cert: '',
        certNum: '',
      },
      chgNmOrTel: '', // 이름 : NM /  전화번호 : TEL
      isID: false,
      webIdNew: '',
      webPwdNew: '',
      webPwdNew2: '',
      idMsg: '',
      passwordMsg: '',
      password2Msg: '',
      emailMsg: '',
      intgrWebId: '', // 통합웹ID
      intgrWebPwd: '', // 통합웹비밀번호(암호화)
      cmmSiteId: null,
      siteClass: '',
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '회원정보 수정 < 회원정보 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '회원정보수정',
      },
    ],
  },
  mixins: [],
  components: {
    MainHeader,
    SubDefaultHeader,
    SelectUIInput, // 수정 : 2020.02.21 추가
    PopupPasswordChange, // 수정 : 2020.03.05 추가
    Footer,
  },
  methods: {
    // 수정 START : 2020.02.21 추가
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
      // document.getElementById("eMailSite").value = selectedData;
    },
    // 수정 END : 2020.02.21 추가
    // 수정 START : 2020.03.05 추가
    popupAction(type) { // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`]; // popup
      this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false; // view - body
      if (this.popup.popupAgreement) {
        this.popup.open = true;
      };
    },
    getPressId: async function(e) {
      const vm = this;
      const value = e.target.value;
      const id = e.target.id;
      const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi;
      // const reg = /[a-zA-Z0-9<>(){}[\]\-_=+|\/\\'\;.:\"`~!?@#$%^&*]/gi;
      if (id == 'idNew') {
        e.target.value = value.replace(reg, '');
        vm.webIdNew = value.replace(reg, '');
     // } else if (id == 'email') {
     //   e.target.value = value.replace(reg, '');
     //   vm.form.email = value.replace(reg, '');
      }
    },
getChkValuePrm: async function(e) {
      const vm = this;
      const value = e.target.value;
      const id = e.target.id;
      const tmpId = document.getElementById('idNew').value;
      const pwd = document.getElementById('passNew').value;
      const tmpPwd2 = document.getElementById('passNew2').value;
     // alert(id);
      if (id == 'idNew') {
        // 아이디
        if (StringUtils.isEmpty(tmpId)) {
         // document.getElementById('idErr').className = 'inp-box error';
          vm.idMsg = '아이디를 입력해주세요.';
         // document.getElementById('idNew').focus;
         // this.$gsdialog.alert(vm.idMsg);
         vm.$refs.idNew.focus();
        return;
        } else {
           const ConfirmUniWebIdDupInputDto = {
              webId: value,
            };
             ApiUtils.get('/fo/cu/loginmgnt/united-web-id-duplicate-check', ConfirmUniWebIdDupInputDto)
            .then(res => {
            if (res.data.data.resultCode == "00000") {
              // alert(resultCheck.data.data.resultMessage);
               vm.idMsg = '';// '사용가능한 아이디입니다.'; // this.idMessage = "사용가능한 아이디입니다.";
              // document.getElementById("emptyId").focus();
              return;
             // return true;
            } else {
              // this.idMessage = resultCheck.data.data.resultMessage;// alert(resultCheck.data.data.resultMessage);
              vm.idMsg = res.data.data.resultMessage;// "이미 사용중인 아이디입니다. 다시 확인해주세요.";
             // this.$gsdialog.alert("==="+r  es.data.data.resultMessage);
              vm.$refs.idNew.focus();
              return;
            }
         });
        }
      } else if (id == 'passNew') {
        // 비밀번호
        if (StringUtils.isEmpty(pwd)) {
         // document.getElementById('pwErr').className = 'inp-box error';
          vm.passwordMsg = '비밀번호를 입력해주세요.';
          // this.$gsdialog.alert(vm.passwordMsg);
         // this.$refs.passNew.focus();
          return;
        } else if (pwd.length < 8) {
         // document.getElementById('pwErr').className = 'inp-box error';
          vm.passwordMsg = '비밀번호는 최소 8자리 이상 입력하여 주십시오.';
         // this.$gsdialog.alert(vm.passwordMsg);
        //  this.$refs.passNew.focus();
          return;
        } else if (pwd.length > 16) {
         // document.getElementById('pwErr').className = 'inp-box error';
          vm.passwordMsg =
            '영문, 숫자, 특수문자 조합으로 8~16자로 입력해주세요.';
          // this.$gsdialog.alert(vm.passwordMsg);
        //  this.$refs.passNew.focus();
          return;
        }
        // 111,222... 3자리 중복체크
        let isThreeDigitOverlapPw = true;
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
         // document.getElementById('pwErr').className = 'inp-box error';
          vm.passwordMsg =
            '3자리 이상 동일한 비밀번호는 사용할 수 없습니다.';
         // this.$gsdialog.alert(vm.passwordMsg);
         // this.$refs.passNew.focus();
          return;
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
         // document.getElementById('pwErr').className = 'inp-box error';
          vm.passwordMsg =
            '연속된 3자리 이상의 비밀번호는 사용할 수 없습니다.';
         //  this.$refs.passNew.focus();
         // this.$gsdialog.alert(vm.passwordMsg);
          return;
        } else if (!StringUtils.isEmpty(guidePwdText)) {
        // document.getElementById('pwErr').className = 'inp-box error';
          vm.passwordMsg = '영문, 숫자, 특수문자 조합으로 8~16자로 입력해주세요.';
         // this.$gsdialog.alert(vm.passwordMsg);
        //  this.$refs.passNew.focus();
          return;
        } else {
        //  document.getElementById('pwErr').className = 'inp-box';
          vm.passwordMsg = '';
        // this.$gsdialog.alert(vm.passwordMsg);
        }
      } else if (id == 'passNew2') {
        if (StringUtils.isEmpty(tmpPwd2)) {
        //  document.getElementById('pw2Err').className = 'inp-box error';
          vm.password2Msg = '비밀번호를 다시 한번 입력해주세요.';
         // this.$gsdialog.alert(vm.password2Msg);
         // this.$refs.passNew2.focus();
          return;
        } else if (pwd != tmpPwd2) {
          // document.getElementById('pw2Err').className = 'inp-box error';
          vm.password2Msg = '입력하신 비밀번호와 동일하지 않습니다.';
         // this.$gsdialog.alert(vm.password2Msg);
         // this.$refs.passNew2.focus();
          return;
        } else {
         // document.getElementById('pw2Err').className = 'inp-box';
          vm.password2Msg = '';
         // this.$gsdialog.alert(vm.password2Msg);
        }
      }
    },
getChkValue() {
      const vm = this;
      const tmpId = document.getElementById('idNew').value;
      const pwd = document.getElementById('passNew').value;
      const tmpPwd2 = document.getElementById('passNew2').value;
    //  if (id == 'idNew') {
        // 아이디
        if (StringUtils.isEmpty(tmpId)) {
         // document.getElementById('idErr').className = 'inp-box error';
          vm.idMsg = '아이디를 입력해주세요.';
          vm.$refs.idNew.focus();
         // vm.$gsdialog.alert(vm.idMsg);
          return false;
        } else {
         // document.getElementById('idErr').className = 'inp-box';
          vm.idMsg = '';
            const ConfirmUniWebIdDupInputDto = {
              webId: tmpId,
            };
             ApiUtils.get('/fo/cu/loginmgnt/united-web-id-duplicate-check', ConfirmUniWebIdDupInputDto)
            .then(res => {
            if (res.data.data.resultCode != "00000") {
              // this.idMessage = resultCheck.data.data.resultMessage;// alert(resultCheck.data.data.resultMessage);
              vm.idMsg = res.data.data.resultMessage;// "이미 사용중인 아이디입니다. 다시 확인해주세요.";
             // this.$gsdialog.alert("==="+r  es.data.data.resultMessage);
              vm.$refs.idNew.focus();
              return false;
            }
         });
        }
    //  } else if (id == 'passNew') {
        // 비밀번호
        if (StringUtils.isEmpty(pwd)) {
         // document.getElementById('pwErr').className = 'inp-box error';
          vm.passwordMsg = '비밀번호를 입력해주세요.';
          vm.$refs.passNew.focus();
        //  vm.$gsdialog.alert(vm.passwordMsg);
          return false;
        } else if (pwd.length < 8) {
         // document.getElementById('pwErr').className = 'inp-box error';
          vm.passwordMsg = '비밀번호는 최소 8자리 이상 입력하여 주십시오.';
          vm.$refs.passNew.focus();
         // vm.$gsdialog.alert(vm.passwordMsg);
          return false;
        } else if (pwd.length > 16) {
         // document.getElementById('pwErr').className = 'inp-box error';
          vm.passwordMsg =
            '영문, 숫자, 특수문자 조합으로 8~16자로 입력해주세요.';
          vm.$refs.passNew.focus();
         // vm.$gsdialog.alert(vm.passwordMsg);
          return false;
        }
        // 111,222... 3자리 중복체크
        let isThreeDigitOverlapPw = true;
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
         // document.getElementById('pwErr').className = 'inp-box error';
          vm.passwordMsg =
            '3자리 이상 동일한 비밀번호는 사용할 수 없습니다.';
          vm.$refs.passNew.focus();
        //  vm.$gsdialog.alert(vm.passwordMsg);
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
         // document.getElementById('pwErr').className = 'inp-box error';
          vm.passwordMsg =
            '연속된 3자리 이상의 비밀번호는 사용할 수 없습니다.';
          vm.$refs.passNew.focus();
         // vm.$gsdialog.alert(vm.passwordMsg);
          return false;
        } else if (!StringUtils.isEmpty(guidePwdText)) {
        // document.getElementById('pwErr').className = 'inp-box error';
          vm.passwordMsg = '영문, 숫자, 특수문자 조합으로 8~16자로 입력해주세요.';
          vm.$refs.passNew.focus();
        //  vm.$gsdialog.alert(vm.passwordMsg);
          return false;
        } else {
        //  document.getElementById('pwErr').className = 'inp-box';
          vm.passwordMsg = '';
        // this.$gsdialog.alert(vm.passwordMsg);
        }
     // } else if (id == 'passNew2') {
        if (StringUtils.isEmpty(tmpPwd2)) {
        //  document.getElementById('pw2Err').className = 'inp-box error';
          vm.password2Msg = '비밀번호를 다시 한번 입력해주세요.';
          vm.$refs.passNew2.focus();
         // vm.$gsdialog.alert(vm.password2Msg);
          return false;
        } else if (pwd != tmpPwd2) {
          // document.getElementById('pw2Err').className = 'inp-box error';
          vm.password2Msg = '입력하신 비밀번호와 동일하지 않습니다.';
          vm.$refs.passNew2.focus();
         // vm.$gsdialog.alert(vm.password2Msg);
          return false;
        } else {
         // document.getElementById('pw2Err').className = 'inp-box';
          vm.password2Msg = '';
         // this.$gsdialog.alert(vm.password2Msg);
          return true;
        }
     // }
      return true;
    },
    // 수정 END : 2020.03.05 추가
    onUpdate: async function() {
      this.userInfo.emailSite = this.select['list'].selected;
    if (!this.isID) {
    const chekSuccess = this.getChkValue();
     if (!chekSuccess) {
       scroll(0, 0);
       return;
     }
      this.intgrWebId = this.webIdNew;
      this.intgrWebPwd = this.webPwdNew;
    } else {
      this.intgrWebId = '';
      this.intgrWebPwd = '';
    }
    const success = this.isValidation();

       this.userInfo.hp1 = document.getElementById('hp1').value;
       this.userInfo.hp2 = document.getElementById('hp2').value;
       this.userInfo.hp3 = document.getElementById('hp3').value;

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
        intgrWebId: this.intgrWebId,
        intgrWebPwd: this.intgrWebPwd,
      };
       console.log("=32sdfasdf==="+JSON.stringify(MbrInfoModInputDto)+"::::");
      // return;

      if (success) {
        const resultMbrInfo= await ApiUtils.put('/fo/cu/mbrmgnt/member-information-token', MbrInfoModInputDto); // 회원정보수정하기
        // alert(JSON.stringify( resultMbrInfo));
        if (resultMbrInfo.data.success) {
       //  this.$gsdialog.alert('정상적으로 수정되었습니다.').then(dialog =>{
        console.log(this.userInfo.emailRcvYn + "::emailRcvYn::" + this.emailRcvYn);
        console.log(this.userInfo.telRcvYn + "::telRcvYn::" + this.telRcvYn);
        console.log(this.userInfo.dmRcvYn + "::dmRcvYn::" + this.dmRcvYn);
        console.log(this.userInfo.smsRcvYn + "::smsRcvYn::" + this.smsRcvYn);
        const txtDefault = "정상적으로 수정되었습니다";
        let txtDt = "";
        let txt = "";
        if (this.userInfo.emailRcvYn != this.emailRcvYn) {
            txt = txt + (this.userInfo.emailRcvYn == 'Y'?'E-MAIL : 수신동의':'E-MAIL : 수신거부')+'<br/>';
            txtDt = "<br/><br/>GS 리테일 "+ DateUtils.getToday()+'<br/>';
        }
        if (this.userInfo.telRcvYn != this.telRcvYn) {
          txt = txt + (this.userInfo.telRcvYn == 'Y'?'전화 : 수신동의':'전화 : 수신거부')+'<br/>';
          txtDt = "<br/><br/>GS 리테일 "+ DateUtils.getToday()+'<br/>';
        }
        if (this.userInfo.dmRcvYn != this.dmRcvYn) {
          txt = txt + (this.userInfo.dmRcvYn == 'Y'?'우편 및 우편물 : 수신동의':'우편 및 우편물 : 수신거부')+'<br/>';
          txtDt = "<br/><br/>GS 리테일 "+ DateUtils.getToday()+'<br/>';
        }
        if (this.userInfo.smsRcvYn != this.smsRcvYn) {
          txt = txt + (this.userInfo.smsRcvYn == 'Y'?'SMS : 수신동의':'SMS : 수신거부')+'<br/>';
          txtDt = "<br/><br/>GS 리테일 "+ DateUtils.getToday()+'<br/>';
        }
          this.$gsdialog.alert(txtDefault + txtDt + txt, { html: true }).then(dialog =>{
            // scroll(0, 0);
            // this.getMbrInfo();
            this.$router.go(-1);
          });
          scroll(0, 0);
       //  });
         } else {
          // this.$gsdialog.alert('정보 수정 시 오류가 발생했습니다.');
          this.$gsdialog.alert('정보 수정 시 오류가 발생했습니다.', { html: true }).then(dialog =>{
            // this.getMbrInfo();
          });
         }
      }
    },
    isValidation() {
      if (StringUtils.isEmpty(this.userInfo.email) ) {
         this.emailMsg = '이메일을 입력해주세요.';
         this.$gsdialog.alert('이메일을 입력해주세요.', { html: true });
        // document.getElementById("email").focus();
         return false;
      } else
      if (StringUtils.isEmpty(this.userInfo.emailSite)) {
          this.emailMsg = '이메일을 입력해주세요.';
          this.$gsdialog.alert('이메일을 입력해주세요', { html: true });
        //  document.getElementById("emailSite").focus();
          return false;
    //  } else
    //  if (!document.getElementById("emailRcvYn").checked && !document.getElementById("smsRcvYn").checked && !document.getElementById("dmRcvYn").checked && !document.getElementById("telRcvYn").checked) {
    //       alert('광고성 정보수신여부를 설정해주세요.');
    //      return false;
      } else {
        const regExpHp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (!regExpHp.test(this.userInfo.email +'@'+ this.userInfo.emailSite)) {
            this.emailMsg = "올바른 이메일을 입력해주세요.";
            this.$gsdialog.alert("올바른 이메일을 입력해주세요.", { html: true });
            return false;
        }
          // 개인통관고유부호 앞자리 P, 숫자 12자
        const reg = /^(P)[0-9]{12}$/; // /\bp\d{12}\b/i;
        const regp = /^(p)[0-9]{12}$/;
        if (document.getElementById("agree-num").checked) {
          if (!StringUtils.isEmpty(this.userInfo.upasVal)) {
              if (regp.test(this.userInfo.upasVal)) {
                const upasVal = this.userInfo.upasVal.replace('p', 'P');
                this.userInfo.upasVal = upasVal;
              }
            if (!reg.test(this.userInfo.upasVal)) {
                //  alert("입력하신 개인통관고유번호를 다시 확인해주세요." );
                  this.$gsdialog.alert("P로 시작하는 13자의 개인통관고유부호를 <br/>입력해주세요.", { html: true });
                  document.getElementById("serialNumber").focus();
                  return false;
            }
          } else {
            this.$gsdialog.alert("개인통관고유부호룰 입력해 주세요", { html: true });
            document.getElementById("serialNumber").focus();
            return false;
          }
        } else {
          if (!StringUtils.isEmpty(this.userInfo.upasVal)) {
            this.$gsdialog.alert("개인통관고유부호 수집에 동의해 주세요", { html: true });
            return false;
          }
        }
      }
      this.emailMsg = '';
      return true;
    },
    getAuthentication: function(div) { // 핸드폰인증
      document.getElementById("chgNmOrTel").value = div;
      localStorage.setItem('chgNmOrTel', div);
       // KMC 본인확인 호출
      if (div == "NM") {
     // alert('개명하신 경우만 변경가능하며, \n개명된 이름으로 가입된 휴대폰으로 본인 확인 후 변경가능합니다.');
        this.$gsdialog.alert('개명하신 경우만 변경가능하며, <br/>개명된 이름으로 가입된 휴대폰으로 본인 확인 후 변경가능합니다.', { html: true }).then(dialog =>{
         this.kmcsiView(div);
         });
      } else {
      // alert('본인 확인을 위하여\n휴대폰 본인인증을 진행합니다');
        this.$gsdialog.alert('본인 확인을 위하여<br/>휴대폰 본인인증을 진행합니다.', { html: true }).then(dialog =>{
          this.kmcsiView(div);
         });
      }
    },
    kmcsiView(div) {
     const mall = CookieUtils.getMallId();
      const cmmSteId = CookieUtils.getCmmSteId();
      const certType = { certType: 'C', mallId: mall, mobType: 'M', cmmSteId: cmmSteId}; // 모바일 화면은 M , PC 화면은 P
      ApiUtils
        .get('/fo/cu/loginmgnt/self-certification-check', certType)
        .then(res => {
          if (res.data === null) {
            console.error(res.data.msg);
            this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.', { html: true });
            return;
          } else {
            this.form = res.data.data;
          }
        })
        .then(res => {
          const UserAgent = window.navigator.userAgent;
          const dvcId = localStorage.getItem("deviceId");
          // 모바일 접근 체크 //
          // 모바일일 경우 (변동사항 있을경우 추가 필요)
          if (!StringUtils.isEmpty(dvcId)) {
              const popupX = CuUtils.popupX('500');
              const popupY = CuUtils.popupY('600');
              window.open(
                '',
                'kmcIsWindow',
                'width=500, height=600, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no, left=' +
                  popupX +
                  ', top=' +
                  popupY
              );
               document.getElementById("subKmc").target = 'kmcIsWindow';
          } else {
            if (
              UserAgent.match(
                /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
              ) != null ||
              UserAgent.match(/LG|SAMSUNG|Samsung/) != null
            ) {
              // 모바일웹 리턴 URL 추가
              localStorage.setItem('reUrl', '/cu/regular_member_modify');
              document.getElementById("subKmc").target = '';
            } else {
              const popupX = CuUtils.popupX('500');
              const popupY = CuUtils.popupY('600');
              window.open(
                '',
                'kmcIsWindow',
                'width=500, height=600, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no, left=' +
                  popupX +
                  ', top=' +
                  popupY
              );
              document.getElementById("subKmc").target = 'kmcIsWindow';
            }
          }
         // subKmc.action = 'https://www.kmcert.com/kmcis/web/kmcisReq.jsp';
         // subKmc.submit();
          document.getElementById("subKmc").action = 'https://www.kmcert.com/kmcis/web/kmcisReq.jsp';
          document.getElementById("subKmc").submit();
        });
    },
    getSendYn() {
      if (this.userInfo.emailRcvYn == "Y") {
         document.getElementById("emailRcvYn").checked = true;
      } else {
         document.getElementById("emailRcvYn").checked= false;
      }
      if (this.userInfo.smsRcvYn == "Y") {
         document.getElementById("smsRcvYn").checked = true;
      } else {
         document.getElementById("smsRcvYn").checked= false;
      }
       if (this.userInfo.dmRcvYn == "Y") {
         document.getElementById("dmRcvYn").checked = true;
      } else {
         document.getElementById("dmRcvYn").checked= false;
      }
      if (this.userInfo.telRcvYn == "Y") {
         document.getElementById("telRcvYn").checked = true;
      } else {
         document.getElementById("telRcvYn").checked= false;
      }
          console.log("==22=="+JSON.stringify(this.userInfo)+"::::");
         // this.changeSelectAction('list', 'daum.net');
    },
    getMbrInfo: async function() {
      const hp1 = document.getElementById('hp1').value;
      const hp2 = document.getElementById('hp2').value;
      const hp3 = document.getElementById('hp3').value;
      const custNm = document.getElementById('org_korName').innerText;

      const MbrInfoInqInputDto = {certType: "C"};
      const result= await ApiUtils.get('/fo/cu/mbrmgnt/member-information', MbrInfoInqInputDto); // 회원정보가져오기
      //  console.log("===="+JSON.stringify(this.userInfo)+"::::");
      this.userInfo = result.data.data;
      this.emailRcvYn = this.userInfo.emailRcvYn;
      this.telRcvYn = this.userInfo.telRcvYn;
      this.dmRcvYn = this.userInfo.dmRcvYn;
      this.smsRcvYn = this.userInfo.smsRcvYn;
      this.userInfo.email = result.data.data.emailAddr1;
      this.userInfo.emailSite = result.data.data.emailAddr2;
      this.userInfo.hp1 = result.data.data.moblTelNo1;
      this.userInfo.hp2 = result.data.data.moblTelNo2.length > 7 ? result.data.data.moblTelNo2.substr(0, 4) : result.data.data.moblTelNo2.substr(0, 3);
      this.userInfo.hp3 = result.data.data.moblTelNo2.length > 7 ? result.data.data.moblTelNo2.substr(4, 4) : result.data.data.moblTelNo2.substr(3, 4);

      if (document.getElementById("chgNmOrTel").value == "NM") {
        this.userInfo.custNm = custNm;
      } else if (document.getElementById("chgNmOrTel").value == "TEL") {
        this.userInfo.hp1 = hp1;
        this.userInfo.hp2 = hp2;
        this.userInfo.hp3 = hp3;
      }
      this.userInfo.bthym = result.data.data.bthym;
      if (result.data.success) {
        console.log("===="+JSON.stringify(this.userInfo)+"::::");
        if (StringUtils.isEmpty(this.userInfo.emailSite) || this.userInfo.emailSite == null || this.userInfo.emailSite == 'null') {
          this.select['list'].selected = "naver.com";
        } else {
          this.select['list'].selected = this.userInfo.emailSite;
        }
        this.userInfo.bthymBar = StringUtils.isEmpty(this.userInfo.bthym) ? '-' : DateUtils.format(this.userInfo.bthym, 'YYYY-MM-DD');
        if (StringUtils.isEmpty(this.userInfo.webId)) {
          this.isID = false;
        } else {
          this.isID = true;
        }
        this.getSendYn();
      } else {
        location.href ='/cu/password_re_check';// 비밀번호 확인화면으로 이동
      }
    },
    sendChk: function(div) {
     // alert(div);
      console.log(document.getElementById(div).checked);
      if (document.getElementById(div).checked) {
         document.getElementById(div).checked = true;
          eval("this.userInfo."+div+" = 'Y'");
      } else {
         document.getElementById(div).checked = false;
          eval("this.userInfo."+div+" = 'N'");
      }
       console.log(eval("this.userInfo."+div));
    },
    mbrDropout: async function() {
      const MbrDrptProcInputDto = {
        pmbsJoinPrcnCd: '' // 변경요청 자사코드
      };
      const resultMbrDrp= await ApiUtils.put('/fo/cu/mbrmgnt/member-dropout', MbrDrptProcInputDto); // 회원탈퇴하기
      if (resultMbrDrp.data.success) {
         this.$gsdialog.alert('회원탈퇴가 완료되었습니다.', { html: true }).then(dialog =>{
          this.$router.push('/cu/login');
         });
      } else {
         this.$gsdialog.alert(resultMbrDrp.data.data.resultMessage, { html: true });
         this.getMbrInfo();
      }
    },
    mbrDropoutCheck() {
     // const pmbsJoinPrcnCd = CookieUtils.getCookie("pmbsJoinPrcnCd");
      if (!StringUtils.isEmpty(this.userInfo.pmbsJoinPrcnCd)) {
        if (this.userInfo.pmbsJoinPrcnCd == "0001") { // 0000:미가입 0001:달리드림 멤버십가입
           this.$gsdialog.confirm('회원님은 현재 달리드림 멤버십 이용 중입니다<br/>탈퇴하시면 잔여 이용기간이 모두 삭제됩니다.<br/>그래도 탈퇴 하시겠습니까?', { html: true }).then(() => {
           this.mbrDropout();
          });
        } else {
            this.mbrDropout();
        }
      } else {
         this.$gsdialog.alert('정보가 존재하지 않습니다.', { html: true });
      }
     },
    checkRegularMember: async function(url) {
      const MbrInfoInqInputDto = {locationURL: url};
      const result = await ApiUtils.get('/fo/cu/mbrmgnt/checkURL', MbrInfoInqInputDto); // 회원탈퇴하기
      localStorage.removeItem("reqUrl");
      if (!result.data.success) {
          this.$gsdialog.alert('해당페이지에 접근권한이 없습니다.', { html: true }).then(() => {
            history.back();
          });
      } else {
        this.userInfo = result.data.data;
        this.emailRcvYn = this.userInfo.emailRcvYn;
        this.telRcvYn = this.userInfo.telRcvYn;
        this.dmRcvYn = this.userInfo.dmRcvYn;
        this.smsRcvYn = this.userInfo.smsRcvYn;
        this.userInfo.email = result.data.data.emailAddr1;
        this.userInfo.emailSite = result.data.data.emailAddr2;
        this.userInfo.hp1 = result.data.data.moblTelNo1;
        this.userInfo.hp2 = result.data.data.moblTelNo2.length > 7 ? result.data.data.moblTelNo2.substr(0, 4) : result.data.data.moblTelNo2.substr(0, 3);
        this.userInfo.hp3 = result.data.data.moblTelNo2.length > 7 ? result.data.data.moblTelNo2.substr(4, 4) : result.data.data.moblTelNo2.substr(3, 4);

        if (document.getElementById("chgNmOrTel").value == "NM") {
          this.userInfo.custNm = custNm;
        } else if (document.getElementById("chgNmOrTel").value == "TEL") {
          this.userInfo.hp1 = hp1;
          this.userInfo.hp2 = hp2;
          this.userInfo.hp3 = hp3;
        }
        this.userInfo.bthym = result.data.data.bthym;
        if (result.data.success) {
          console.log("===="+JSON.stringify(this.userInfo)+"::::");
          if (StringUtils.isEmpty(this.userInfo.emailSite) || this.userInfo.emailSite == null || this.userInfo.emailSite == 'null') {
            this.select['list'].selected = "naver.com";
          } else {
            this.select['list'].selected = this.userInfo.emailSite;
          }
          this.userInfo.bthymBar = StringUtils.isEmpty(this.userInfo.bthym) ? '-' : DateUtils.format(this.userInfo.bthym, 'YYYY-MM-DD');
          if (StringUtils.isEmpty(this.userInfo.webId)) {
            this.isID = false;
          } else {
            this.isID = true;
          }
          this.getSendYn();
        }
      }
    },
    clear: function() {
      document.getElementById("serialNumber").value = "";
    },
    // 인증팝업 콜백 함수
    getSelfCertif: function(strRecCert, strCertNum, callBack) {
        document.getElementById("chgNmOrTel").value = localStorage.getItem("chgNmOrTel");
       // alert(localStorage.getItem("chgNmOrTel"));
       // alert(document.getElementById("chgNmOrTel").value);
         localStorage.removeItem("chgNmOrTel");
      const date = {
        certType: 'B',
        rec_cert: strRecCert,
        certNum: strCertNum
      };
      ApiUtils
        .get('/fo/cu/loginmgnt/self-certification-check', date)
        .then(res => {
          if (res.data === null) {
            console.error(res.data.data.resultMessage);
            this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.', { html: true });
            return;
          } else {
            const resultDt = res.data.data;
           console.log("+++++"+JSON.stringify(resultDt));
             console.log("+resultCode+++"+resultDt.resultCode);
            if (res.data.data.resultCode === "00000") {
               console.log("+chgNmOrTel+++"+document.getElementById("chgNmOrTel").value);
              if (document.getElementById("chgNmOrTel").value == 'TEL') {
                console.log("==========================");
                document.getElementById("hp1").value = resultDt.phoneNo.substr(0, 3);
                console.log("==========res.data.data.phoneNo.substr(0, 3)================" + resultDt.phoneNo.substr(0, 3));
                document.getElementById("hp2").value = resultDt.phoneNo.substr(3, 4);
                console.log("==========res.data.data.phoneNo.substr(0, 3)================" +resultDt.phoneNo.substr(3, 4));
                document.getElementById("hp3").value = resultDt.phoneNo.substr(7, 4);
                console.log("==========res.data.data.phoneNo.substr(0, 3)================" + resultDt.phoneNo.substr(3, 4));
                document.getElementById("hp_full").innerText = resultDt.phoneNo.substr(0, 3)+"-"+ resultDt.phoneNo.substr(3, 4)+"-"+ resultDt.phoneNo.substr(7, 4);
                } else {
                // alert(JSON.stringify(res.data.data));
                document.getElementById("korName").value = resultDt.name;
                document.getElementById("org_korName").innerText = resultDt.name;
                this.userInfo.custNm = resultDt.name;
                }
            } else {
              this.$gsdialog.alert(res.data.data.resultMessage, { html: true });
            }

            if (callBack) {
              callBack();
            }
          }
        });
    },
  },
  destroyed() {
  },
  mounted: async function() {
    const ti = this;
    ti.siteClass = CookieUtils.getSiteClass();
    ti.cmmSiteId = CookieUtils.getCmmSteId();

    // PC KMC인증
    window.getSelfCertification = function(strRecCert, strCertNum, callBack) {
      ti.getSelfCertif(strRecCert, strCertNum, callBack);
    };
    // 모바일 인증
    const strRecCert = localStorage.getItem("strRecCert");
    const strCertNum = localStorage.getItem("strCertNum");
    // ti.form.strRecCert = strRecCert;
    if (!StringUtils.isEmpty(strRecCert)) {
      localStorage.removeItem("strRecCert");
      localStorage.removeItem("strCertNum");
      localStorage.removeItem("reUrl");
      this.getSelfCertif(strRecCert, strCertNum);
    } else {
      const pswRechkToken = this.$route.params.pswRechkToken;
      // await this.checkRegularMember(localStorage.getItem("reqUrl")); //   console.log('step2,', JSON.stringify(window.d));
      await this.checkRegularMember(pswRechkToken);
    }
  },
};
</script>
