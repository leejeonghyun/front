<!--
SC-FO-SS-GF-MS-906
-->
<template>
  <div class="wrap-mypage member-info bg-gray" v-bind:class="[siteClass]">
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
                <input type="email" id="email" class="inp-txt" v-value="userInfo.eMail">
                <div class="wrap-select">
                  <select id="email" class="w-small" title="이메일"  v-model="userInfo.eMailSite" >
                    <option value="">직접입력</option>
                    <option value="">naver.com</option>
                  </select>
                </div>
                <span class="txt-error">이메일을 입력해주세요</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">생년월일<span class="required" aria-label="필수 항목">*</span></th>
            <td>
              <span class="data">{{userInfo.bdate}}</span>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="number">개인통관<br/>고유부호</label>
            </th>
            <td>
              <div class="inp-box">
                <input type="text" id="number" class="inp-txt" placeholder="" value="P12312312312">
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
      <section class="section-area">
        <h2 class="txt-title">추가정보</h2>
        <table class="tbl-member">
          <caption>추가정보 수정</caption>
          <colgroup>
            <col style="width: 90px">
            <col style="width: auto">
          </colgroup>
          <tbody>
          <tr>
            <th scope="row">
              <label for="etc01">직장명</label>
            </th>
            <td>
              <div class="inp-box">
                <input type="text" id="etc01" class="inp-txt" placeholder="" value="">
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="etc02">부서명</label>
            </th>
            <td>
              <div class="inp-box">
                <input type="text" id="etc02" class="inp-txt" placeholder="" value="">
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="etc03">실제생일</label>
            </th>
            <td>
              <div class="inp-box">
                <input type="text" id="etc03" class="inp-txt" placeholder="" value="19821104">
              </div>
              <div class="radio-box">
                <div class="inp-radio small">
                  <input type="radio" name="info" id="info1" value="" checked>
                  <label for="info1">양력</label>
                </div>
                <div class="inp-radio small">
                  <input type="radio" name="info" id="info2" value="">
                  <label for="info2">음력</label>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </section>
      <section class="section-area">
        <h2 class="txt-title">혜택 정보수신 여부</h2>
        <p class="txt-desc">
          이벤트 소식, 포인트 정보, SALE, 행사쿠폰, 특가상품, 신상품 소개 등
          다양한 쇼핑정보안내 수신 여부를 선택해주세요.
          ‘아니오’를 선택하실 경우, 정보수신동의 거부처리와 더불어 다양한
          쇼핑정보 제공이 제한됩니다.
        </p>
        <table class="tbl-member">
          <caption>혜택 정보수신 여부 수정</caption>
          <colgroup>
            <col style="width: 90px">
            <col style="width: auto">
          </colgroup>
          <tbody>
          <tr>
            <th scope="row">
              <label for="etc02">SMS<span class="required" aria-label="필수 항목">*</span></label>
            </th>
            <td>
              <div class="radio-box inp-box"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <div class="inp-radio small">
                  <input type="radio" name="info2" id="info3" value="">
                  <label for="info3">예</label>
                </div>
                <div class="inp-radio small">
                  <input type="radio" name="info2" id="info4" value="">
                  <label for="info4">아니오</label>
                </div>
                <span class="txt-error">광고성 정보수신여부를 설정해주세요 (SMS, E-MAIL, 우편 및 우편물, 전화)</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="etc02">E-MAIL<span class="required" aria-label="필수 항목">*</span></label>
            </th>
            <td>
              <div class="radio-box inp-box"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <div class="inp-radio small">
                  <input type="radio" name="info3" id="info5" value="">
                  <label for="info5">예</label>
                </div>
                <div class="inp-radio small">
                  <input type="radio" name="info3" id="info6" value="">
                  <label for="info6">아니오</label>
                </div>
                <span class="txt-error">광고성 정보수신여부를 설정해주세요 (SMS, E-MAIL, 우편 및 우편물, 전화)</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="etc02">우편 및 우편물<span class="required" aria-label="필수 항목">*</span></label>
            </th>
            <td>
              <div class="radio-box inp-box"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <div class="inp-radio small">
                  <input type="radio" name="info4" id="info7" value="">
                  <label for="info7">예</label>
                </div>
                <div class="inp-radio small">
                  <input type="radio" name="info4" id="info8" value="">
                  <label for="info8">아니오</label>
                </div>
                <span class="txt-error">광고성 정보수신여부를 설정해주세요 (SMS, E-MAIL, 우편 및 우편물, 전화)</span>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <label for="etc02">전화<span class="required" aria-label="필수 항목">*</span></label>
            </th>
            <td>
              <div class="radio-box inp-box"> <!-- 입력 오류일 경우 error 클래스 추가 -->
                <div class="inp-radio small">
                  <input type="radio" name="info5" id="info9" value="">
                  <label for="info9">예</label>
                </div>
                <div class="inp-radio small">
                  <input type="radio" name="info5" id="info10" value="">
                  <label for="info10">아니오</label>
                </div>
                <span class="txt-error">광고성 정보수신여부를 설정해주세요 (SMS, E-MAIL, 우편 및 우편물, 전화)</span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
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
import ApiUtils from '@/common/ApiUtils';
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
  },
  destroyed() {
  },
  mounted: async function() {
    const MbrInfoInqInputDto = {certType: "C"};
    const result= await ApiUtils.get('/fo/cu/mbrmgnt/member-information', MbrInfoInqInputDto); // 회원정보가져오기
    this.userInfo = result.data.data;
  },
};
</script>
