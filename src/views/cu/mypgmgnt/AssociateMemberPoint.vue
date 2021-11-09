<!--
view/ss/SC-FO-SS-GF-MS-930
-->
<template>
  <div class="wrap-mypage member" v-bind:class="[siteClass]">
    <!-- START : Header -->
    <SubDefaultHeader headerText="GS&POINT"/>
    <!-- END : 헤더 -->
    <!-- 수정 START : 2020.02.13 bg-gray 클래스 삭제 -->
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
    <!-- 수정 END : 2020.02.13 bg-gray 클래스 삭제 -->
      <!-- 수정 START : 2020.02.13 텍스트 수정 -->
      <section class="section-area">
        <h2 class="hidden">준회원 THE POP 리워즈 통합회원 가입 안내</h2>
        <div class="inner">
          <div class="wrap-certify">
            <!-- 수정 START : 2020.02.17 텍스트 수정 -->
            <p class="txt-subtitle"><span>{{custNm}}</span>님은 통합회원이 아닙니다</p>
            <!-- 수정 END : 2020.02.17 텍스트 수정 -->
            <div class="box-desc">
              GS&POINT 적립 및 등급 쿠폰 혜택을 위해서는<br/>
              통합회원 가입이 필요해요
            </div>
            <div class="btn-area">
              <button type="button" class="btn-lg btn-bg lightgreen" @click="getAuthentication()"><span>통합회원 가입하러 가기</span></button>
            </div>
          </div>
        </div>
      </section>
      <!-- 수정 END : 2020.02.13 텍스트 수정 -->
      <!-- 수정 START : 2020.02.13 마크업 및 텍스트 수정 -->
      <section class="section-area">
        <h2 class="hidden">GS&amp;POINT 안내</h2>
        <ul class="list-accordion type02">
          <li>
            <button id="info1" class="btn-accordion" aria-controls="info1-contents" aria-expanded="false" @click="accordionEvent">
              GS&amp;POINT 안내
            </button>
            <div id="info1-contents" class="cont-accordion" aria-labelledby="info1" hidden="hidden">
              <ul class="list-info">
                <li>포인트 1P는 현금 1원이며, 상품 구매시 현금처럼 이용하실 수 있습니다.
                상품 반품 시 포인트는 회수되며, 회수 전 이미 사용하신 포인트는 현금
                으로 보상해주셔야 합니다. </li>
                <li>회원의 잔여포인트 중 5년이 경과하는 동안 사용하지 않은 잔여포인트는
                최초 발생한 월부터 월 단위로 매월 1일 자동 소멸됩니다. 단 등록하지
                않은 멤버십 카드에 적립된 포인트는 적립 후 1년 후 소멸됩니다.</li>
              </ul>
            </div>
          </li>
        </ul>
      </section>
      <!-- 4월 수정 END : 텍스트 수정 -->
      <!-- 수정 END : 2020.02.13 마크업 변경 -->
    <PopupDaliMemberOverlap @popupEvent="popupAction" v-if="this.popup.popupDaliMemberOverlap" :popup="popup"/> <!-- 팝업 - 달리드림 멤버십 가입하기 -->
    </main>
    <!-- START : 푸터 -->
    <Footer/>
  <form id="subKmc" name="subKmc" method="post" action>
              <input type="hidden" id="tr_cert" name="tr_cert" v-model="form.trCert" class="form-control" />
              <input type="hidden" id="tr_url" name="tr_url" v-model="form.trUrl" class="form-control" />
              <input type="hidden" id="tr_add" name="tr_add" v-model="form.trAdd" class="form-control" />
  </form>
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import AccordionMixin from '@/mixins/AccordionMixin'; // 2020.02.13 추가
import Footer from '@/components/common/Footer'; // 푸터
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import CuUtils from '@/common/cu/CuUtils';
import PopupDaliMemberOverlap from '@/views/cu/pmbsmgnt/PopupDaliMemberOverlap'; // 팝업 - 통합회원 아님
export default {
  name: "AssociateMemberPoint",
  data() {
    return {
      popup: { // 팝업
        open: false,
        infoArr: [],
        popupDaliMemberOverlap: false,
      },
      custNm: '',
      // 수정 2020.02.13 tab 삭제
    form: {
        trCert: '',
        trUrl: '',
        trAdd: 'N',
        rec_cert: '',
        certNum: '',
        recCert: '',
        apiURL: '',
        date: '',
        ci: '',
        phoneNo: '',
        phoneCorp: '',
        birthDay: '',
        gender: '',
        nation: '',
        name: '',
        result: '',
        certMet: '',
        ip: '',
        Mname: '',
        MbirthDay: '',
        MGender: '',
        Mnation: '',
        plusInfo: '',
        di: ''
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '포인트 < 마이페이지 < %s'
  },
  mixins: [AccordionMixin], // 2020.02.13 추가
  components: {
    SubDefaultHeader, // 헤더
    PopupDaliMemberOverlap,
    Footer, // 푸터
  },
  methods: {
    // 수정 2020.02.13 tab 삭제
   popupAction(type) { // 팝업 활성/비활성
      // this.popup.infoArr = msg;
       console.log('type ' + type);
        this.popup[`${type}`] = !this.popup[`${type}`]; // popup
        this.popup[`${type}`] ? this.popup.open = true : this.popup.open = false; // view - body
    },
     getSelfCertif: function(strRecCert, strCertNum, callBack) {
      const date = {
        certType: 'B',
        rec_cert: strRecCert,
        certNum: strCertNum
      };
      ApiUtils
        .get('/fo/cu/loginmgnt/self-certification-check', date)
        .then(res => {
          if (res.data === null) {
            console.error(res.data.msg);
            this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.');
            return;
          } else {
            if (res.data.data.resultCode === "00000") {
              if (res.data.data.gender == '1') {
                this.genderStr = "F";
              } else {
                this.genderStr = "M";
              }
                    const uesrChk = {
                      mbrJoinPosbType: 'M',
                      korName: res.data.data.name,
                      bdate: res.data.data.birthDay,
                      gender: this.genderStr,
                      ipinCiCode: res.data.data.ci,
                      foreignYn: res.data.data.nation,
                      hp: res.data.data.phoneNo,
                      phoneCorp: res.data.data.phoneCorp
                    };
              ApiUtils.get('/fo/cu/mbrmgnt/cust-information', uesrChk) // 회원가입
                        .then(res => {
                          console.log(res.data);
                              if (res.data === null) {
                                console.error(res.data.msg);
                                vm.$gsdialog.alert('본인 확인을 불러올 수 없습니다.');
                                return;
                              } else {
                                this.rcvJoCertInfo = res.data.data;
                                const hplen = uesrChk.hp.length - 4;
                                console.log('hplen ' + hplen);
                              //  if (this.rcvJoCertInfo.resultCode == '30018') {
                                  if (
                                    uesrChk.phoneCorp == 'SKT' ||
                                    uesrChk.phoneCorp == 'SKM'
                                  ) {
                                    this.rcvJoCertInfo.comCoDivCode = '01';
                                  } else if (
                                    uesrChk.phoneCorp == 'KTF' ||
                                    uesrChk.phoneCorp == 'KTM'
                                  ) {
                                    this.rcvJoCertInfo.comCoDivCode = '02';
                                  } else if (
                                    uesrChk.phoneCorp == 'LGT' ||
                                    uesrChk.phoneCorp == 'LGM'
                                  ) {
                                    this.rcvJoCertInfo.comCoDivCode = '03';
                                  } else {
                                    this.rcvJoCertInfo.comCoDivCode = '01';
                                  }
                                  this.rcvJoCertInfo.ipinCiCode = uesrChk.ipinCiCode;
                                  this.rcvJoCertInfo.korName = uesrChk.korName;
                                  this.rcvJoCertInfo.gender = uesrChk.gender;
                                  this.rcvJoCertInfo.hp1 = uesrChk.hp.substring(0, 3);
                                  this.rcvJoCertInfo.hp2 = uesrChk.hp.substring(3, hplen);
                                  this.rcvJoCertInfo.hp3 = uesrChk.hp.substring(hplen);
                                  this.rcvJoCertInfo.bdate = uesrChk.bdate;
                                  this.rcvJoCertInfo.foreignYn =
                                    uesrChk.foreignYn === '0' ? 'N' : 'Y';
                                  this.rcvJoCertInfo.smsYn = 'Y';
                                  this.rcvJoCertInfo.emailYn = 'Y';
                             //   }
                                console.log(
                                  '본인인증정보 ' + JSON.stringify(this.rcvJoCertInfo)
                                );
                                this.popup.infoArr = this.rcvJoCertInfo;
                                console.log('id ' + this.rcvJoCertInfo.id);
                                console.log('wedDate ' + this.rcvJoCertInfo.wedDate);
                                this.popupAction('popupDaliMemberOverlap');
                              }
                            });
            } else {
              alert(res.data.data.resultMessage);
            }

            if (callBack) {
              callBack();
            }
          }
        });
    },
   easyJoin() {
      this.$router.push('/cu/my_page'); // 정회원 mbrTypeCd : 01 this.$parent.easyJoin();
    },
  getAuthentication: function() {
      // KMC 본인확인 호출
      this.$gsdialog.alert('본인 확인을 위하여</br>휴대폰 본인인증을 진행합니다', { html: true }).then(dialog =>{
      const mall = CookieUtils.getMallId();
      const cmmSteId = CookieUtils.getCmmSteId();
      const certType = { certType: 'C', mallId: mall, mobType: 'M', cmmSteId: cmmSteId}; // 모바일 화면은 M , PC 화면은 P
      ApiUtils
        .get('/fo/cu/loginmgnt/self-certification-check', certType)
        .then(res => {
          if (res.data === null) {
            console.error(res.data.msg);
            alert('본인 확인을 불러올 수 없습니다.');
            return;
          } else {
            this.form = res.data.data;
          }
        })
        .then(res => {
          const kmcIsWindow = '';
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
              subKmc.target = 'kmcIsWindow';
          } else {
            if (
              UserAgent.match(
                /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
              ) != null ||
              UserAgent.match(/LG|SAMSUNG|Samsung/) != null
            ) {
              // 모바일웹 리턴 URL 추가
              localStorage.setItem('reUrl', '/cu/associate_member_point');
              subKmc.target = '';
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
              subKmc.target = 'kmcIsWindow';
            }
          }
          subKmc.action = 'https://www.kmcert.com/kmcis/web/kmcisReq.jsp';
          subKmc.submit();
        });
      });
    },
  },
  destroyed() {
  },
  mounted: async function() {
    const resultMemInfo = await ApiUtils.get('/fo/cu/mbrmgnt/member-information', null); // await ApiUtils.get('/fo/cu/mbrmgnt/member-information', null);
    this.custNm = resultMemInfo.data.data.custNm;

    const vm = this;
    // PC KMC인증
    window.getSelfCertification = function(strRecCert, strCertNum, callBack) {
      vm.getSelfCertif(strRecCert, strCertNum, callBack);
    };
    // 모바일 인증
    const strRecCert = localStorage.getItem("strRecCert");
    const strCertNum = localStorage.getItem("strCertNum");
    vm.form.strRecCert = strRecCert;
    if (!StringUtils.isEmpty(strRecCert)) {
      localStorage.removeItem("strRecCert");
      localStorage.removeItem("strCertNum");
      localStorage.removeItem("reUrl");
      vm.getSelfCertif(strRecCert, strCertNum);
    }
  },
};
</script>
