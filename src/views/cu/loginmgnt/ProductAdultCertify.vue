<template>
<div class="wrap-sub-detail" v-bind:class="[siteClass, {'integrate-member__wrap' : siteClass == 'marketfor'}]">
    <!-- START : Header -->
    <SubDefaultHeader headerText="성인인증" />
    <!-- END : Header -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="adult-certify">
        <figure>
          <img src="@/assets/images/img/img_adult_certify.png" alt="19세 이하 금지 아이콘" />
        </figure>
        <p class="desc">연 1회 성인 인증을 하시면<br/>청소년 유해매체물에 접근하실 수 있습니다.</p>
        <ul class="wrap-btn">
          <li>
            <!-- <a href="javascript:void(0);" class="btn-phone" @click="getAuthentication()" target="_blank" title="새창">휴대폰 인증</a> -->
            <form class="form-horizontal" id="subKmc" name="subKmc" method="post" action>
              <a
                href="javascript:void(0);"
                class="btn-phone"
                title="휴대폰 인증"
                @click="getAuthentication()"
                data-sc-action="signup.click"
                data-dimension-name="signup.intg"
              >휴대폰 인증</a>
              <input
                type="hidden"
                id="tr_cert"
                name="tr_cert"
                v-model="self.trCert"
                class="form-control"
              />
              <input
                type="hidden"
                id="tr_url"
                name="tr_url"
                v-model="self.trUrl"
                class="form-control"
              />
              <input
                type="hidden"
                id="tr_add"
                name="tr_add"
                v-model="self.trAdd"
                class="form-control"
              />
            </form>
          </li>
        </ul>
        <div class="wrap-info">
          <div class="list-info">
            <ul>
              <li>
                입력된 정보는 본인 확인을 위해 본인인증기관에 제공되며, 본인 확인 외에 사용되거나 저장되지 않습니다.
              </li>
              <li>
                본인 인증이 잘 되지 않을 경우, 본인인증기관 고객센터로 문의해 주시기 바랍니다.
              </li>
            </ul>
          </div>
          <strong>본인인증기관 고객센터<a href="tel:16612562" class="btn-tel">1661-2562</a></strong>
        </div>
      </div>
    </main>
    <!-- START : 푸터 -->
    <Footer />
    <!-- END : 푸터 -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader';
import CookieUtils from '@/common/CookieUtils';
import JwtUtils from '@/common/JwtUtils';
import ApiUtils from '@/common/ApiUtils';
import Footer from '@/components/common/Footer';
import CuUtils from '@/common/cu/CuUtils';
import StringUtils from '@/common/StringUtils';
export default {
  name: "ProductAdultCertify",
  metaInfo: {
    title: 'GS 프레시몰',
    titleTemplate: '성인인증 < 상품목록 < %s'
  },
  components: {
    SubDefaultHeader,
    Footer,
  },
  data() {
    return {
      self: {
        trCert: '',
        trUrl: '',
        trAdd: 'N',
        certNum: '',
        apiUrl: '',
        result: '',
      },
      temp: {},
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    getAuthentication: function() {
      // this.$router.push('/cu/pop_offline_member');
      // KMC 본인확인 호출
      this.$gsdialog.alert('본인 확인을 위하여<br/>휴대폰 본인인증을 진행합니다', { html: true }).then(dialog => {
      const UserAgent = window.navigator.userAgent;
      const mall = CookieUtils.getMallId();
      const cmmSteId = CookieUtils.getCmmSteId();
      const certType = { certType: 'C', mallId: mall, mobType: 'M', cmmSteId: cmmSteId }; // 모바일 화면은 M , PC 화면은 P
      ApiUtils.get('/fo/cu/loginmgnt/self-certification-check', certType, {
        'Content-Type': 'application/json',
      })
        .then(res => {
          if (res.data === null) {
            console.error(res.data.msg);
            this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.', { html: true });
            return;
          } else {
            this.self = res.data.data;
          }
        })
        .then(res => {
          const kmcIsWindow = '';
          const UserAgent = window.navigator.userAgent;
          const dvcId = localStorage.getItem('deviceId');
          // 모바일 접근 체크
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
              localStorage.setItem('reUrl', '/cu/product_adult_certify');
              subKmc.target = '';
            } else {
              const popupX = CuUtils.popupX('500');
              const popupY = CuUtils.popupY('600');
              window.open(
                '',
                'kmcIsWindow',
                'width=500, height=600, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=' +
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
    getSelfCertif: function(strRecCert, strCertNum, callBack) {
      const data = {
        certType: 'B',
        rec_cert: strRecCert,
        certNum: strCertNum,
      };
      const vm = this;
      ApiUtils.get('/fo/cu/loginmgnt/self-certification-check', data, {
        'Content-Type': 'application/json',
      }).then(res => {
        if (res.data === null) {
          console.error(res.data.msg);
          this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.', { html: true });
          // 홈으로 경로 이동
          return;
        } else {
          if (res.data.data.resultCode === '00000') {
            const bYear = (res.data.data.birthDay).substr(0, 4);
            const thisYear = new Date().getFullYear();

            if (thisYear - bYear >= 19) {
              ApiUtils.put('/fo/cu/mbrmgnt/member-adult-certification').then(response => {
                JwtUtils.saveEncVal(response.data.data.ENC_VAL);
                const user = response.data.data.userRslt;
                CookieUtils.setLoginCookies(user);
                const returnUrl = vm.$route.query.returnUrl;
                if (!StringUtils.isEmpty(returnUrl)) {
                  location.href = returnUrl;
                } else {
                  const string = CuUtils.getLink();
                  location.href = string;
                }
              });
            } else {
              location.href = location.hostname;
            }
          } else {
            this.$gsdialog.alert(res.data.data.resultMessage, { html: true });
            // 홈으로 경로 이동
          }

          if (callBack) {
            callBack();
          }
        }
      });
    },
  },
  mounted() {
    const vm = this;
    // PC KMC인증
    window.getSelfCertification = function(strRecCert, strCertNum, callBack) {
      vm.getSelfCertif(strRecCert, strCertNum, callBack);
    };
    // 모바일 KMC인증
    const strRecCert = localStorage.getItem('strRecCert');
    const strCertNum = localStorage.getItem('strCertNum');
    if (!StringUtils.isEmpty(strRecCert)) {
      localStorage.removeItem('strRecCert');
      localStorage.removeItem('strCertNum');
      localStorage.removeItem('reUrl');
      vm.getSelfCertif(strRecCert, strCertNum,);
    }
  }
};
</script>

<style>

</style>
