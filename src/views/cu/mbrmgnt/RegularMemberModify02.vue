<!--
SC-FO-SS-GF-MS-906
-->
<template>
  <!-- 수정 START : 2020.02.13 bg-gray 클래스 삭제, wrap-setting 클래스 추가 -->
  <div class="wrap-mypage member-info wrap-setting" v-bind:class="[siteClass]">
  <!-- 수정 END : 2020.02.13 bg-gray 클래스 삭제, wrap-setting 클래스 추가 -->
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
              <span class="data">{{userInfo.korName}}</span>
              <button class="btn-modify" aria-label="수정">이름변경</button>
            </td>
          </tr>
          <tr>
            <th scope="row">아이디<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <span class="data">{{userInfo.id}}</span>
              <button class="btn-modify" aria-label="수정">비밀번호 변경</button>
            </td>
          </tr>
          <tr>
            <th scope="row">휴대폰번호<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <span class="data">{{userInfo.hp1}}-{{userInfo.hp2}}-{{userInfo.hp3}}</span>
              <button class="btn-modify" aria-label="수정">번호 변경</button>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="email">이메일<span class="required" aria-label="필수 항목">*</span></label>
            </th>
            <td>
              <div class="inp-box wrap-inp-select"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <input type="email" id="email" class="inp-txt" placeholder=""  v-model="userInfo.eMail">
                <!-- 수정 START : 2020.02.13 마크업 추가 -->
                <span class="at">@</span>
                <!-- 수정 END : 2020.02.13 마크업 추가 -->
                <div class="wrap-select">
                  <select id="email" class="w-small" title="이메일 사이트"  v-model="userInfo.eMailSite" >
                    <option value="">직접입력</option>
                    <option value="">naver.com</option>
                  </select>
                </div>
                <span class="txt-error">이메일을 입력해주세요</span>
              </div>
            </td>
          </tr>
          <!-- 수정 START : 2020.02.13 마크업 추가 -->
          <tr>
            <th scope="row">생년월일<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <span class="data">{{userInfo.bdate}}</span>
            </td>
          </tr>
          <!-- 수정 END : 2020.02.13 마크업 추가 -->
          <tr>
            <th scope="row">성별<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <span class="data">남성</span>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="number">개인통관<br/>고유부호</label>
            </th>
            <td>
              <div class="inp-box">
                <input type="text" id="number" class="inp-txt" placeholder=""  v-model="userInfo.upasVal">
                <button class="btn-reset"><span class="hidden">입력 초기화</span></button>
              </div>
              <div class="box-info">
                <span class="txt-info">개인통관고유부호는 관세청 전자통관시스템에서 즉시발급이 가능합니다.</span>
                <a href="#" class="link-more" title="개인통관고유부호 발급신청 링크">발급 신청하러 가기</a>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
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
                  <span class="required" aria-label="필수 항목">*</span>
                </div>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="smsYn" class="inp-setting" @click="sendChk('smsYn');"/>
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
                  <input type="checkbox" id="emailYn" class="inp-setting" @click="sendChk('emailYn');"/>
                  <label for="emailYn"><span class="hidden">동의함</span></label>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <span>우편 및 우편물</span>
                  <span class="required" aria-label="필수 항목">*</span>
                </div>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="postYn" class="inp-setting" @click="sendChk('postYn');">
                  <label for="postYn"><span class="hidden">동의함</span></label>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="inner">
              <div class="inner-title">
                <div class="txt-subtitle">
                  <span>전화</span>
                  <span class="required" aria-label="필수 항목">*</span>
                </div>
              </div>
              <div class="inner-setting">
                <div class="wrap-check">
                  <input type="checkbox" id="telYn" class="inp-setting" @click="sendChk('telYn');"/>
                  <label for="telYn"><span class="hidden">동의함</span></label>
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
        <button type="button" class="btn-lg btn-bg lightgreen" @click="onUpdate();"><span>수정하기</span></button>
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
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: "RegularMemberModify",
  data() {
    return {
       userInfo: {},
       siteClass: CookieUtils.getSiteClass(),
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
    SubDefaultHeader,
  },
  methods: {
    onUpdate: async function() {
      // TODO 회원정보 수정
      const MbrInfoModInputDto = {
      };
      const resultMbrInfo = await ApiUtils.put('/fo/cu/mbrmgnt/member-information', MbrInfoModInputDto);
    },
    getSendYn() {
      if (this.userInfo.emailYn == "Y") {
         document.getElementById("emailYn").checked = true;
      } else {
         document.getElementById("emailYn").checked= false;
      }
      if (this.userInfo.smsYn == "Y") {
         document.getElementById("smsYn").checked = true;
      } else {
         document.getElementById("smsYn").checked= false;
      }
       if (this.userInfo.postYn == "Y") {
         document.getElementById("postYn").checked = true;
      } else {
         document.getElementById("postYn").checked= false;
      }
      if (this.userInfo.telYn == "Y") {
         document.getElementById("telYn").checked = true;
      } else {
         document.getElementById("telYn").checked= false;
      }
    },
    sendChk: function(div) {
      if (document.getElementById(div).checked) {
         document.getElementById(div).checked = true;
          eval("this.userInfo."+div+" = 'Y'");
      } else {
         document.getElementById(div).checked = false;
          eval("this.userInfo."+div+" = 'N'");
      }
    }
  },
  destroyed() {
  },
  mounted: async function() {
    const MbrInfoInqInputDto = {certType: "C"};
    const result= await ApiUtils.get('/fo/cu/mbrmgnt/member-information', MbrInfoInqInputDto); // 회원정보가져오기
    this.userInfo = result.data.data;
    this.userInfo.bdate = DateUtils.format(this.userInfo.bdate, 'YYYY-MM-DD');
    this.getSendYn();
  },
};
</script>
