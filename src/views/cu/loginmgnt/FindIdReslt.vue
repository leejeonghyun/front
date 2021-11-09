<!--
Design: views/cu/SC-FO-CU-GF-MS-020
Pg id: .
Uri: /cu/find_id_reslt
-->
<template>
  <div class="wrap-login" v-bind:class="[siteClass, {'integrate-member__wrap' : siteClass == 'marketfor'}]">
    <SubDefaultHeader headerText="아이디/비밀번호 찾기" searchBtnBottom="true" :prevHomeType="true" :tabbar="false" />
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="login-wrap find">
        <div class="wrap-tab">
          <!-- START : 아이디/비밀번호 찾기 탭 -->
          <ul ref="tabList" class="tablist type02">
            <li>
              <button
                type="button"
                id="tabFindId"
                aria-controls="tabFindId-contents"
                @click="tabAction('tabFindId')"
                :class="{active: this.tab.tabFindId}"
              >아이디 찾기</button>
            </li>
            <li>
              <button
                type="button"
                id="tabFindPw"
                aria-controls="tabFindPw-contents"
                @click="tabAction('tabFindPw')"
                :class="{active: this.tab.tabFindPw}"
              >비밀번호 찾기</button>
            </li>
          </ul>
          <!-- END : 아이디/비밀번호 콘텐츠 -->
          <div ref="tabContents">
            <!-- START : 아이디 찾기 콘텐츠 -->
            <div
              id="tabFindId-contents"
              class="tabcontents"
              aria-labelledby="tabFindId"
              v-if="this.tab.tabFindId"
            >
              <!-- START : 아이디 결과 -->
              <div class="wrap-id-result" v-if="isidResult">
                <div class="inner">
                  <h2 class="hidden">아이디 결과</h2>
                  <h3 v-if="titleShow">고객님의 아이디를 안내해드립니다</h3>
                  <div class="box-user-info">
                    <p
                      v-for="retFindId in retFindIdList"
                      v-bind:key="retFindId.num"
                    >{{ commentAdd(retFindId.webId)}}</p>
                  </div>
                  <div class="id-result-info" id="loginArr">
                  </div>
                  <!-- START : 하단 버튼 -->
                  <div class="sub-btn-area">
                    <button
                      type="button"
                      class="btn-bg lightgreen btn-login"
                      @click="getLogingPg()"
                    >
                      <span>{{loginText}}</span>
                    </button>
                  </div>
                  <!-- END :하단 버튼 -->
                </div>
              </div>
              <!-- END : 아이디 결과 -->
            </div>
          </div>
          <!-- END : 아이디 찾기 콘텐츠 -->
          <!-- START : 비밀번호 찾기 콘텐츠 -->
          <div
            id="tabFindPw-contents"
            class="tabcontents"
            aria-labelledby="tabFindPw"
            v-if="this.tab.tabFindPw"
          ></div>
          <!-- END : 비밀번호 찾기 콘텐츠 -->
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
import Footer from '@/components/common/Footer'; // 푸터
import CookieUtils from '@/common/CookieUtils';
import StringUtils from '@/common/StringUtils';

export default {
  name: 'FindId',
  components: {
    SubDefaultHeader, // 헤더
    Footer, // 푸터
  },
  data() {
    return {
      isidResult: true, // 아이디 결과
      tab: {
        tabFindId: true,
        tabFindPw: false,
      },
      retFindIdList: [],
      siteClass: CookieUtils.getSiteClass(),
      titleShow: true,
      isExistsSnsData: false,
      loginText: '로그인',
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '아이디/비밀번호 찾기 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '아이디/비밀번호 찾기',
      },
    ],
  },
  methods: {
    tabAction(type) {
      // tab
      if (type == 'tabFindPw') {
        this.$router.push('/cu/find_id_password/1');
      }
    },
    getLogingPg() {
      if (this.isExistsSnsData) {
        this.$router.push('/cu/snslogin');
      } else {
        this.$router.push('/cu/login');
      }
    },
    commentAdd(txt) {
      const idx = txt.indexOf('연결');
      if (idx > 0) {
        document.querySelector('#loginArr').innerHTML = '* 간편 로그인 (' + txt.replace('로그인으로 연결', '') + ')으로 </br> 로그인 하신 후, 마이페이지 > 회원정보수정에서</br>아이디 확인/변경도 사용 할 수 있습니다.';
        return ''; // ' <p>* 간편 로그인 (' + txt + ')으로 <br/>로그인 하신 후, 마이페이지 > 회원정보수정에서 <br/>아이디 확인/변경도 사용 할 수 있습니다.</p>';
      } else {
        return txt;
      }
    },
    getSnsData() {
      // retUrl : SNS 계정 연동 페이지 여부
      if (!StringUtils.isEmpty(JSON.parse(localStorage.getItem('snsDate') || null))) {
        this.isExistsSnsData = true;
        this.loginText = "SNS 계정 연동 하기";
      }
    }
  },
  updated() {},
  mounted() {
    this.getSnsData();
    this.retFindIdList = JSON.parse(sessionStorage.getItem('webIdList') || '[]');
    sessionStorage.removeItem('webIdList');

    if (this.retFindIdList && this.retFindIdList.length > 0) {
      const id = this.retFindIdList.filter(e => e.webId.indexOf('연결') > 0);
      if (this.retFindIdList.length == id.length) {
        this.titleShow = false;
      }
    }
  },
};
</script>
<style lang="scss">
</style>
