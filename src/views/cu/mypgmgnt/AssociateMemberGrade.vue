<template>
  <div class="wrap-mypage member" v-bind:class="[siteClass]">
    <!-- 4월 수정 START: 헤더 타입 변경 -->
    <SubDefaultHeader headerText="회원 등급"/>
    <!-- END : 헤더 -->
    <main id="main" tabindex="0"><!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
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
          <!-- 9월 수정 START : 추가 -->
          <p class="member-grade-info">
            쿠폰, 카드행사, THE POP 리워즈 GS&POINT, 배송비를 제외한 결제 금액으로 산정됩니다. (배송 완료일 기준)
          </p>
          <!-- 9월 수정 END : 추가 -->
        </div>
      </section>
      <!-- 수정 END : 2020.02.13 텍스트 수정 -->
      <!-- 수정 START : 2020.02.13 마크업 변경 -->
      <section class="section-area">
        <div class="wrap-grade">
          <div class="inner">
            <h2 class="title">등급 안내</h2>
            <!-- 4월 수정 START : txt-grade 각 등급별로 듀얼 클래스 추가, span으로 텍스트 감싸기 -->
            <ul class="list-grade">
              <li>
                <p class="txt-grade vvip"><span class="bg-line-brush">VVIP</span></p>
                <p class="desc">
                  직전 3개월<br/>
                  구매실적<br/>
                  90만원 이상
                </p>
              </li>
              <li>
                <p class="txt-grade vip"><span class="bg-line-brush">VIP</span></p>
                <p class="desc">
                  직전 3개월<br/>
                  구매실적<br/>
                  60만원 이상
                </p>
              </li>
              <li>
                <p class="txt-grade fam"><span class="bg-line-brush">FAMILY</span></p><!-- 수정 2020.03.02 텍스트 수정 -->
                <p class="desc">
                  직전 3개월<br/>
                  구매실적<br/>
                  3만원 이상
                </p>
              </li>
              <li>
                <p class="txt-grade wel"><span class="bg-line-brush">WELCOME</span></p><!-- 수정 2020.03.02 텍스트 수정 -->
                <p class="desc">
                  직전 3개월<br/>
                  구매실적<br/>
                  3만원 미만
                </p>
              </li>
            </ul>
            <!-- 4월 수정 END : txt-grade 각 등급별로 듀얼 클래스 추가, span으로 텍스트 감싸기 -->
            <ul class="list-grade-benefit">
              <li>
                <div class="grade">
                  <h3 class="title">VVIP 혜택</h3>
                  <p class="desc">직전 3개월 구매실적 90만원 이상</p>
                </div>
                <ul class="list-benefit">
                  <li>
                    <i class="ico gspoint" aria-label="GS&POINT 포인트 아이콘"></i>
                    <p class="desc">
                      GS&POINT<br/>
                      0.1% 적립
                    </p>
                  </li>
                  <li>
                    <i class="ico rewards" aria-label="THE POP 리워즈 아이콘"></i>
                    <p class="desc">
                      THE POP 리워즈<br/>
                      2,500점
                    </p>
                  </li>
                  <li>
                    <i class="ico coupon vvip" aria-label="VVIP 할인쿠폰 아이콘"></i>
                    <p class="desc">
                      할인쿠폰<br/>
                      3천원 X 2매
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                <div class="grade">
                  <h3 class="title">VIP 혜택</h3>
                  <p class="desc">직전 3개월 구매실적 60만원 이상</p>
                </div>
                <ul class="list-benefit">
                  <li>
                    <i class="ico gspoint" aria-label="GS&POINT 포인트 아이콘"></i>
                    <p class="desc">
                      GS&POINT<br/>
                      0.1% 적립
                    </p>
                  </li>
                  <li>
                    <i class="ico rewards" aria-label="THE POP 리워즈 아이콘"></i>
                    <p class="desc">
                      THE POP 리워즈<br/>
                      1,000점
                    </p>
                  </li>
                  <li>
                    <i class="ico coupon vip" aria-label="VIP 할인쿠폰 아이콘"></i>
                    <p class="desc">
                      할인쿠폰<br/>
                      2천원 X 2매
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                <div class="grade">
                  <h3 class="title">FAMILY 혜택</h3> <!-- 수정 2020.03.02 텍스트 수정 -->
                  <p class="desc">직전 3개월 구매실적 3만원 이상</p>
                </div>
                <ul class="list-benefit">
                  <li>
                    <i class="ico gspoint" aria-label="GS&POINT 포인트 아이콘"></i>
                    <p class="desc">
                      GS&POINT<br/>
                      0.1% 적립
                    </p>
                  </li>
                  <!-- 수정 START : 2020.03.10 혜택 변경으로 인한 마크업 수정 -->
                  <li>
                    <i class="ico rewards" aria-label="THE POP 리워즈 아이콘"></i>
                    <p class="desc">
                      THE POP 리워즈<br/>
                      1,000점
                      <span>(최초 1회)</span>
                    </p>
                  </li>
                  <!-- 수정 END : 2020.03.10 혜택 변경으로 인한 마크업 수정 -->
                </ul>
              </li>
              <li>
                <div class="grade">
                  <h3 class="title">WELCOME 혜택</h3> <!-- 수정 2020.03.02 텍스트 수정 -->
                  <p class="desc">직전 3개월 구매실적 3만원 미만</p>
                </div>
                <ul class="list-benefit">
                  <li>
                    <i class="ico gspoint" aria-label="GS&POINT 포인트 아이콘"></i>
                    <p class="desc">
                      GS&POINT<br/>
                      0.1% 적립
                    </p>
                  </li>
                </ul>
              </li>
              <!-- 9월 수정 START : 컨텐츠 추가 -->
              <li>
                <div class="grade">
                  <h3 class="title">스타 등급 혜택 안내</h3>
                  <p class="desc">
                    THE POP 등급과 별개로, 해당 채널 실적 기준 충족 시
                    <br/>THE POP VIP의 쿠폰/리워즈 혜택을 드립니다.
                  </p>
                </div>
                <dl class="grade-start">
                  <dt>
                    <div class="grade star gsstar">
                      <h3 class="title">GS25 스타 등급 혜택</h3>
                      <p class="desc">
                        직전 3개월 GS25 구매일 수 30일 이상
                        <br/>(1회 구매 1,000원 이상, 1일 다 회 이용 시, 1회 이용으로 인정)
                      </p>
                    </div>
                  </dt>
                  <dd>
                    <ul class="list-benefit">
                      <li>
                        <i class="ico rewards" aria-label="THE POP 리워즈 아이콘"></i>
                        <p class="desc">
                          THE POP 리워즈<br/>
                          1,000점
                        </p>
                      </li>
                      <li>
                        <i class="ico coupon vip" aria-label="VIP 할인쿠폰 아이콘"></i>
                        <p class="desc">
                          할인쿠폰<br/>
                          2천원 X 2매
                        </p>
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl class="grade-start">
                  <dt>
                    <div class="grade star lalavla">
                      <h3 class="title">lalavla 스타 등급 혜택</h3>
                      <p class="desc">
                        직전 3개월 랄라블라 구매금액 8만원 이상
                      </p>
                    </div>
                  </dt>
                  <dd>
                    <ul class="list-benefit">
                      <li>
                        <i class="ico rewards" aria-label="THE POP 리워즈 아이콘"></i>
                        <p class="desc">
                          THE POP 리워즈<br/>
                          1,000점
                        </p>
                      </li>
                      <li>
                        <i class="ico coupon vip" aria-label="VIP 할인쿠폰 아이콘"></i>
                        <p class="desc">
                          할인쿠폰<br/>
                          2천원 X 2매
                        </p>
                      </li>
                    </ul>
                  </dd>
                </dl>
              </li>
              <!-- 9월 수정 END : 컨텐츠 추가 -->
              <!-- 4월 수정 START : bottom-info 추가 -->
              <li class="bottom-info">
                <strong class="info-title">GS&amp;POINT와 THE POP 리워즈는 어떻게 다른가요?</strong>
                <p>GS&POINT는 구매 금액에 따라 적립 받는 포인트이며<br/>THE POP 리워즈는 등급제 혜택이나 이벤트 참여 시 지급해<br/>드리는 보상형 리워즈로 GS리테일 모든 브랜드에서<br/>현금처럼 사용할 수 있습니다. </p>
              </li>
              <!-- 4월 수정 END : bottom-info 추가 -->
            </ul>
            <!-- 9월 수정 START : 컨텐츠 추가 -->
            <ul class="wrap-list-dot mypage-grade">
              <li class="list-dot">등급 업데이트는 매월 1일자로 이루어집니다.</li>
              <li class="list-dot">고객등급은 GS 프레시몰, GS25, GS THE FRESH, lalavla 에서 직전 3개월 누적 구매 실적을 기준으로 선정됩니다.</li>
              <li class="list-dot">등급별 쿠폰은 매월 1회에 한해서 제공됩니다. (유효기간은 해당 월말까지이며, 미사용 쿠폰은 재발행 되지 않습니다.)</li>
              <li class="list-dot">쿠폰은 장바구니 쿠폰으로 지급됩니다. (3만원 이상 결제 시 사용가능)</li>
              <li class="list-dot">행사내용 및 혜택은 사전 고지 없이 변경될 수 있습니다.</li>
              <li class="list-dot">쿠폰, 카드행사할인, 포인트/리워즈, 배송비는 고객등급 산정기준에서 제외됩니다.</li>
            </ul>
            <!-- 9월 수정 END : 컨텐츠 추가 -->
          </div>
        </div>
      </section>
      <!-- 수정 START : 2020.02.13 마크업 변경 -->
       <PopupDaliMemberOverlap @popupEvent="popupAction" v-if="this.popup.popupDaliMemberOverlap" :popup="popup"/> <!-- 팝업 - 달리드림 멤버십 가입하기 -->
    </main>
      <!-- START : 푸터 -->
    <Footer/>
    <!-- END : 푸터 -->
  <form id="subKmc" name="subKmc" method="post" action>
              <input type="hidden" id="tr_cert" name="tr_cert" v-model="form.trCert" class="form-control" />
              <input type="hidden" id="tr_url" name="tr_url" v-model="form.trUrl" class="form-control" />
              <input type="hidden" id="tr_add" name="tr_add" v-model="form.trAdd" class="form-control" />
  </form>
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
import PopupDaliMemberOverlap from '@/views/cu/pmbsmgnt/PopupDaliMemberOverlap'; // 팝업 - 통합회원 아님
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import CuUtils from '@/common/cu/CuUtils';
export default {
  name: "AssociateMemberGrade",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '회원등급 < 회원정보 < 마이페이지 < %s'
  },
  components: {
    SubDefaultHeader,
    PopupDaliMemberOverlap,
    Footer, // 푸터
  },
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
        certNum: strCertNum,
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
                                  console.log(
                                  'uesrChk ' + JSON.stringify(uesrChk)
                                );
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
                           //     }
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
              this.$gsdialog.alert(res.data.data.resultMessage);
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
            this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.');
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
              localStorage.setItem('reUrl', '/cu/associate_member_grade');
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
