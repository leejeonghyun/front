<!--
views/ss/SC-FO-SS-GF-MS-908.vue
-->
<template>
  <div class="wrap-dalidream" v-bind:class="[siteClass]">
    <SubDefaultHeader headerText="달리드림 멤버십" />
    <!-- ENd : 헤더 -->
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="dali-dream-wrap">
        <div class="dali-member-top">
          <div class="member-top-box">
            <p v-if="this.reJoin == 'N'">
              달리드림 회원으로 가입하고 여러가지 혜택을
              <br />
              <em>60일 동안 무료체험</em> 해보세요
            </p>
            <p v-if="this.reJoin == 'Y'">
              달리드림 회원으로 가입하고 여러가지 혜택을
              <br />
              <em>경험</em> 해보세요
            </p>
          </div>
          <div class="btn-area">
            <button
              type="type"
              class="btn-dali daligreen"
              title="상세 내용 보기"
              aria-haspopup="dialog"
              aria-label="팝업활성화"
              @click="joinFunc()"
            >달리드림패스 가입하기</button>
          </div>
        </div>
        <div class="links-group">
          <ul>
            <li>
              <gs-link to="/cu/pbms_gift">달리드림패스 회원권 선물함</gs-link>
            </li>
            <li>
              <gs-link to="/cu/pbms_coupon">달리드림패스 회원권 등록하기</gs-link>
            </li>
            <li>
              <gs-link to="/cs/claimmgnt/claimMain">자주 묻는 질문</gs-link>
            </li>
          </ul>
        </div>
      </div>
      <PopupOverseasAgreement
        @popupEvent="popupAction"
        v-if="this.popup.popupOverseasAgreement"
        :popup="popup"
      />
      <!-- 팝업 - 달리드림패스 가입하기 -->
      <PopupThePopAgreement
        @popupEvent="popupAction"
        v-if="this.popup.popupThePopAgreement"
        :popup="popup"
      />
      <!-- 팝업 - 달리드림패스 가입하기 -->
      <PopupDalidreamAgree
        @popupEvent="popupAction"
        v-if="this.popup.popupDalidreamAgree"
        :popup="popup"
      />
      <!-- 팝업 - 달리드림패스 가입하기 -->
      <PopupDaliJoin @popupEvent="popupAction" v-if="this.popup.popupDaliJoin" :popup="popup" />
      <!-- 팝업 - 달리드림패스 가입하기 -->
      <PopupDaliMemberOverlap
        @popupEvent="popupAction"
        v-if="this.popup.popupDaliMemberOverlap"
        :popup="popup"
      />
      <!-- 팝업 - 달리드림패스 가입하기 -->
    </main>
    <form id="subKmc" name="subKmc" method="post" action>
      <input type="hidden" id="tr_cert" name="tr_cert" v-model="form.trCert" class="form-control" />
      <input type="hidden" id="tr_url" name="tr_url" v-model="form.trUrl" class="form-control" />
      <input type="hidden" id="tr_add" name="tr_add" v-model="form.trAdd" class="form-control" />
    </form>
    <form class="form-horizontal" id="billingForm" name="billingForm" method="post">
      <!-- custNo  -->
      <input type="hidden" id="userId" name="userId" v-model="this.userId" />
      <input type="hidden" id="payCorpCd" name="payCorpCd" v-model="this.payCompany" />
      <input type="hidden" name="mid" v-model="this.mid" />
      <input type="hidden" name="channelCd" v-model="this.channelCd" />
      <input type="hidden" name="custNo" v-model="this.custNo" />
      <input type="hidden" name="cmmMbrNo" v-model="this.cmmMbrNo" />
      <input type="hidden" name="price" v-model="this.price" />
      <input type="hidden" name="actionUrl" v-model="this.actionUrl" />
      <input type="hidden" name="returnUrl" v-model="this.returnUrl" />
      <input type="hidden" name="retrieveUrl" v-model="this.retrieveUrl" />
      <input type="hidden" name="deleteUrl" v-model="this.deleteUrl" />
      <input type="hidden" name="registNo" v-model="this.registNo" />
      <input type="hidden" name="checkRegistNoYn" v-model="this.checkRegistNoYn" />
      <input type="hidden" name="gid" v-model="this.gid" />
      <input type="hidden" name="requestDate" v-model="this.requestDate" />
      <input type="hidden" name="encodingType" v-model="this.encodingType" />
    </form>
    <!-- START : 푸터 -->
    <Footer />
  </div>
</template>
<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
import PopupDaliJoin from '@/views/cu/pmbsmgnt/PopupDaliJoin'; // 팝업 - 달리드림 멤버십 가입하기
import PopupDalidreamAgree from '@/views/cu/pmbsmgnt/PopupDalidreamAgree'; // 팝업 - 달리드림 멤버십 가입하기
import PopupDaliMemberOverlap from '@/views/cu/pmbsmgnt/PopupDaliMemberOverlap'; // 팝업 - 통합회원 아님
import PopupOverseasAgreement from '@/views/cu/pmbsmgnt/PopupOverseasAgreement';
import PopupThePopAgreement from '@/views/cu/pmbsmgnt/PopupThePopAgreement';
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import StringUtils from '@/common/StringUtils';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';
import CuUtils from '@/common/cu/CuUtils';
import Tracker from '@/common/Tracker';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
export default {
  props: {
    id: String,
    mbrJoinMethod: String,
  },
  name: 'DaliMembershipBefore',
  mixins: [],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '달리드림 멤버십 < 마이페이지 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '달리드림 멤버십',
      },
    ],
  },
  data() {
    return {
      popup: {
        // 팝업
        open: false,
        infoArr: [],
        memArr: [],
        popupDaliJoin: false,
        popupDaliMemberOverlap: false,
        popupDalidreamAgree: false,
        popupOverseasAgreement: false,
        popupThePopAgreement: false,
      },
      loginYn: LoginUtils.isLogin(),
      // 카드 등록 관련
      freeTrial: false,
      bgGray: true,
      // rcvJoinInfo: [],
      // userId: "E000007602410",
      userId: '',
      payCompany: 'SMARTROPG',
      deviceType: 'Mob',
      price: '',
      mid: 'gsstore10m',
      channelCd: '',
      // custNo: 'E000007602410',
      custNo: '',
      giftCpnList: '',
      newPinNo: '',
      custNm: '',
      moblTelNo: '',
      emailAddr1: '',
      emailAddr2: '',
      cmmMbrNo: '',
      actionUrl: '',
      returnUrl: '',
      retrieveUrl: '',
      deleteUrl: '',
      registNo: '',
      checkRegistNoYn: 'N',
      gid: '',
      requestDate: '',
      encodingType: 'UTF-8',
      hashKey: '',
      billingKey: '',
      cardIssuer: '',
      cardIssuerName: '',
      displayCardNo: '',
      billingKeyList: [],
      dataList: [],
      myKey: '',
      reJoin: '',
      //
      mallTyp: '',
      rcvJoinInfo: [],
      genderStr: '',
      rcvJoCertInfo: [],
      rcvMemInfo: [],
      mbrTypeCd: '',
      ordId: '',
      rcvOrdData: [],
      form: {
        trCert: '',
        trUrl: '',
        trAdd: 'N',
        recCert: '',
        rec_cert: '',
        apiURL: '',
        certNum: '',
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
        di: '',
      },
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    SubDefaultHeader,
    Footer, // 푸터
    PopupDalidreamAgree,
    PopupDaliJoin,
    PopupDaliMemberOverlap,
    PopupOverseasAgreement,
    PopupThePopAgreement,
  },
  methods: {
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`]; // popup
      this.popup[`${type}`]
        ? (this.popup.open = true)
        : (this.popup.open = false); // view - body
    },
    async joinComp() {
      const PmbsJoinRegInputDto = {
        pmbsJoinTypeCd: '01',
        encTdrKeyVal: this.billingKey,
        pmbsTdrNo: this.ordId,
      };
      const result = await ApiUtils.post(
        '/fo/cu/pmbsmgnt/paidmembership-join',
        PmbsJoinRegInputDto
      );
      if (result.data.statusCode === '0000') {
        if (this.newPinNo != '') {
          this.cpnReg();
        } else {
          const jsonObject = {
            cardIssuerName: this.cardIssuerName,
            custGrdNm: this.rcvMemInfo.custGrdNm,
            mbsTypeCd: this.popup.popupDaliJoin,
          };
          console.log("달리드림 멤버십 PbmsJoin", jsonObject);
          this.$router.push({ path: '/cu/pbms_join_complete', query: jsonObject });
          /**
          Tracker.joinMemberShip(jsonObject);
          // 앱 통신을 위한 시간 필요 >> 300시간을 늘려서 수집 처리를 할 수 있으나 화면 전환 페이지에서 처리
          setTimeout(() => {
            location.href = '/cu/pbms_join_complete';
          }, 300);
          */
        }
      } else {
        this.$gsdialog.alert('오류가 발생했습니다.</br>고객센터로 문의 주세요.', {html: true});
      }
    },
    chkQa() {
      this.$gsdialog.alert('FAQ > 달리드림 멤버십 카테고리로 <br/>이동 예정입니다', {
        html: true,
      });
    },
    async doPay() {
      let deviceType = '';
      if (this.deviceType === 'PC') {
        deviceType = 'WEB';
      } else {
        deviceType = 'MOB';
      }
      const that = this;
      const sendDto = {};
      const rslt = await ApiUtils.post(
        '/fo/cu/pmbsmgnt/paidmembership-tender',
        sendDto
      );
      if (rslt.data.success != true) {
        this.$gsdialog.alert('주문생성에 오류가 발생하였습니다.');
        return;
      }
      this.rcvOrdData = rslt.data.data;
      this.ordId = this.rcvOrdData.ordId;
      const data = {
        payCorp: this.payCompany,
        deviceType: deviceType,
        payMethod: 'BILLING',
        billingKey: this.billingKey,
        callBatchYn: 'N',
        skuId: '23450017464950001',
        goodsCode: '2345001746495',
        goodsName: '유료멤버십회원권',
        goodsCnt: '1',
        chanlId: '7',
        storId: '3010',
        mallId: '11',
        mid: this.mid,
        amt: '3900',
        buyerName: this.custNm,
        buyerTel: this.moblTelNo,
        buyerEmail: this.emailAddr1 + this.emailAddr2,
        cmmMbrNo: this.cmmMbrNo,
        mallUserID: this.custNo,
        ordId: this.rcvOrdData.ordId,
        callbackUrl: '#',
      };
      this.dataList = [];
      this.dataList.push(data);
      await ApiUtils.post('/fo/pa/reqApprPeriodicalPay', this.dataList).then(
        (res) => {
          let isFail = false;
          if (
            res.data === null ||
            (res.data.resultCode !== '3001' &&
              res.data.resultCode !== '7001' &&
              res.data.resultCode !== '0000')
          ) {
            isFail = true;
          }
          if (isFail) {
            this.$gsdialog.alert('결제시 오류가 발생하였습니다.');
          } else {
            that.rsform = res.data;
            this.joinComp();
          }
        }
      );
    },
    async reqBillingKey() {
      let title = '';
      let option = '';

      if (this.payCompany === 'PAYNOW') {
        title = 'MPI_FRAME';
        option =
          'width=370, height=430, menubar=no, status=no, resizable=no, scrollbars=no, fullscreen=no';
      } else {
        title = 'payWindow';
        option = 'width=500, height=500';
      }
      // billingForm.userId = this.custNo;
      billingForm.action = this.actionUrl;
      window.open('', title, option);
      billingForm.target = title;
      billingForm.submit();
    },
    cpnReg: async function () {
      if (this.newPinNo.length > 0) {
        const PmbsGiftCpnIsseRegInputDto = { giftTrcPinNo: this.newPinNo };
        const result = await ApiUtils.post(
          '/fo/cu/pmbsmgnt/paidmembership-gift-coupon-issue',
          PmbsGiftCpnIsseRegInputDto
        );
        if (result.data.success) {
          location.href = '/cu/pbms_join_complete';
        } else {
          this.$gsdialog.alert('쿠폰등록시 오류가 발생했습니다.');
        }
      }
    },
    finalReg: async function () {
      if (this.reJoin == 'Y') {
        this.doPay();
      } else {
        this.joinComp();
      }
    },
    stepTwo: async function () {
      if (this.rcvMemInfo.mbrTypeCd === '01') {
        this.popupAction('popupDalidreamAgree');
      } else {
        // SNS 로그인일 경우 본인인증
        this.getAuthentication();
      }
    },
    easyJoin: async function () {
      const rcvMemInfoData = await ApiUtils.get(
        '/fo/cu/mbrmgnt/member-information',
        null
      );
      this.rcvMemInfo = rcvMemInfoData.data.data;
      this.custNo = this.rcvMemInfo.custNo;
      this.custNm = this.rcvMemInfo.custNm;
      this.moblTelNo = this.rcvMemInfo.moblTelNo;
      this.emailAddr1 = this.rcvMemInfo.emailAddr1;
      this.emailAddr2 = this.rcvMemInfo.emailAddr2;
      this.userId = this.rcvMemInfo.custNo;
      this.cmmMbrNo = this.rcvMemInfo.cmmMbrNo;
      this.popup.memArr = this.rcvJoCertInfo;
      this.popup.infoArr = { korName: this.rcvMemInfo.custNm };
      if (this.rcvMemInfo.pmbsJoinPrcnCd == '0001') {
        if (this.newPinNo != '') {
          this.cpnReg();
        } else {
          this.$router.push('/cu/pbms_info');
        }
      } else {
        this.popupAction('popupDalidreamAgree');
      }
    },
    joinFunc: async function () {
      // 회원정보 호출
      if (
        this.rcvJoinInfo.length === 0 ||
        this.rcvJoinInfo.pmbsBfexpCount === 0
      ) {
        // 유료멤버십 가입 이력이 없을때
        if (!this.popup.popupDaliJoin) {
          this.popupAction('popupDaliJoin');
        }
      } else {
        if (this.popup.popupDaliJoin) {
          this.popupAction('popupDaliJoin');
        }
        this.popupAction('popupDalidreamAgree');
      }
      const rcvMemInfoData = await ApiUtils.get(
        '/fo/cu/mbrmgnt/member-information',
        null
      );
      this.rcvMemInfo = rcvMemInfoData.data.data;
      this.custNo = this.rcvMemInfo.custNo;
      this.custNm = this.rcvMemInfo.custNm;
      this.moblTelNo = this.rcvMemInfo.moblTelNo;
      this.emailAddr1 = this.rcvMemInfo.emailAddr1;
      this.emailAddr2 = this.rcvMemInfo.emailAddr2;
      this.userId = this.rcvMemInfo.custNo;
      this.cmmMbrNo = this.rcvMemInfo.cmmMbrNo;
      this.popup.memArr = this.rcvJoCertInfo;
      this.popup.infoArr = { korName: this.rcvMemInfo.custNm };
      // 카드 등록 관련 정보 세팅
      this.init();
    },
    retrievePmbsJoin: async function () {
      const receiveJoinInqInputDto = {
        searchType: 'HISTORY'
      };
      const receiveJoinData = await ApiUtils.get(
        '/fo/cu/pmbsmgnt/paidmembership-join',
        receiveJoinInqInputDto
      );
      if (receiveJoinData.data.data.length > 0) {
        this.rcvJoinInfo = receiveJoinData.data.data[0];

        if (this.rcvJoinInfo.pmbsCurrentCount != 0) {
          this.$router.push('/cu/pbms_info');
        }

        if (this.rcvJoinInfo.pmbsBfexpCount != 0) {
          this.reJoin = 'Y';
        } else {
          this.reJoin = 'N';
        }
      } else {
        this.reJoin = 'N';
      }
      if (
        sessionStorage.getItem('newPinNo') != '' &&
        sessionStorage.getItem('newPinNo') != null
      ) {
        this.newPinNo = sessionStorage.getItem('newPinNo', this.cpnNo);
        sessionStorage.setItem('newPinNo', '');
      } else {
        this.newPinNo = '';
      }
      if (this.newPinNo != '' || this.mallTyp === '11') {
        this.joinFunc();
      }
    },
    memInfo: async function () {
      // 회원정보 호출
      const rcvMemInfoData = await ApiUtils.get(
        '/fo/cu/mbrmgnt/member-information',
        null
      );
      this.rcvMemInfo = rcvMemInfoData.data.data;
      this.custNo = this.rcvMemInfo.custNo;
      this.custNm = this.rcvMemInfo.custNm;
      this.moblTelNo = this.rcvMemInfo.moblTelNo;
      this.emailAddr1 = this.rcvMemInfo.emailAddr1;
      this.emailAddr2 = this.rcvMemInfo.emailAddr2;
      this.userId = this.rcvMemInfo.custNo;
      this.cmmMbrNo = this.rcvMemInfo.cmmMbrNo;
      this.popup.memArr = this.rcvJoCertInfo;
      this.popup.infoArr = { korName: this.rcvMemInfo.custNm };
    },
    pmbsReg: async function () {
      if (this.rcvMemInfo.mbrTypeCd === '01') {
        // 정기 카드 등록
        this.reqBillingKey();
      } else {
        // SNS 로그인일 경우 본인인증
        this.getAuthentication();
      }
    },
    getSelfCertif: function (strRecCert, strCertNum, callBack) {
      const date = {
        certType: 'B',
        rec_cert: strRecCert,
        certNum: strCertNum,
      };
      ApiUtils.get('/fo/cu/loginmgnt/self-certification-check', date).then(
        (res) => {
          if (res.data === null) {
            this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.');
            return;
          } else {
            if (res.data.data.resultCode === '00000') {
              if (res.data.data.gender == '1') {
                this.genderStr = 'F';
              } else {
                this.genderStr = 'M';
              }
              const uesrChk = {
                mbrJoinPosbType: 'M',
                korName: res.data.data.name,
                bdate: res.data.data.birthDay,
                gender: this.genderStr,
                ipinCiCode: res.data.data.ci,
                foreignYn: res.data.data.nation,
                hp: res.data.data.phoneNo,
                phoneCorp: res.data.data.phoneCorp,
              };
              ApiUtils.get('/fo/cu/mbrmgnt/cust-information', uesrChk) // 회원가입
                .then((res) => {
                  if (res.data === null) {
                    vm.$gsdialog.alert('회원 정보를 불러 올 수 없습니다.');
                    return;
                  } else {
                    this.rcvJoCertInfo = res.data.data;
                    const hplen = uesrChk.hp.length - 4;
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
                    if (
                      this.rcvJoCertInfo.custNo != '' &&
                      this.rcvJoCertInfo.custNo != null &&
                      this.rcvJoCertInfo.payMemberYn == 'Y'
                    ) {
                      this.rcvJoCertInfo.dalli = 'Y';
                    }
                    this.popup.infoArr = this.rcvJoCertInfo;
                    this.popupAction('popupDaliMemberOverlap');
                  }
                });
            } else {
              vm.$gsdialog.alert(res.data.data.resultMessage);
            }

            if (callBack) {
              callBack();
            }
          }
        }
      );
    },
    async init() {
      const data = {
        authType: 'BILLING',
        cmmMbrNo: this.cmmMbrNo,
        pytcTrmnCallTypeCd: 'BO', // 유료맴버쉽 정기결제는 BO
      };
      await ApiUtils.post(
        '/fo/pa/cardInitAuthByLogin' +
          (this.deviceType === 'PC' ? 'Pc' : 'Mob'),
        data
      ).then((res) => {
        if (res.data === null || res.data.resultCode !== '0000') {
          this.$gsdialog.alert('인증정보를 불러올 수 없습니다.');
          return;
        }
        if (this.deviceType === 'PC') {
          this.actionUrl = res.data.billingPcReqUrl;
          this.returnUrl =
            res.data.billingPcReqCallbackUrl + '.hashKey_' + res.data.hashKey;
          this.retrieveUrl = res.data.billingPcRetrieveUrl;
          this.deleteUrl = res.data.billingPcDeleteUrl;
        } else {
          this.actionUrl = res.data.billingMobReqUrl;
          this.returnUrl =
            res.data.billingMobReqCallbackUrl + '.hashKey_' + res.data.hashKey;
          this.retrieveUrl = res.data.billingMobRetrieveUrl;
          this.deleteUrl = res.data.billingMobDeleteUrl;
        }

        this.requestDate = res.data.requestDate;
        this.gid = res.data.pgId;
        this.channelCd = res.data.billingChannelCd;
      });
    },
    getAuthentication: function () {
      // KMC 본인확인 호출
      this.$gsdialog.alert('본인 확인을 위하여</br>휴대폰 본인인증을 진행합니다', { html: true })
        .then((res) => {
          const mall = CookieUtils.getMallId();
          const cmmSteId = CookieUtils.getCmmSteId();
          const certType = { certType: 'C', mallId: mall, mobType: 'M', cmmSteId: cmmSteId }; // 모바일 화면은 M , PC 화면은 P
          ApiUtils.get('/fo/cu/loginmgnt/self-certification-check', certType)
            .then((res) => {
              if (res.data === null) {
                // console.error(res.data.msg);
                this.$gsdialog.alert('본인 확인을 불러올 수 없습니다.', { html: true });
                return;
              } else {
                this.form = res.data.data;
              }
            })
            .then((res) => {
              const kmcIsWindow = '';
              const UserAgent = window.navigator.userAgent;
              const dvcId = localStorage.getItem('deviceId');
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
                  localStorage.setItem('reUrl', '/cu/pbms_join/0');
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
    getEmailAuthentication: function () {
      // this.$router.push('/cu/join_member_emaildetail');
    },
  },
  mounted() {
    // 테스트/운영 mid 구분
    if (process.env.VUE_APP_MODE !== 'production') {
      this.mid = 'gsmemstt2m'; // 테스트용
    } else {
      this.mid = 'gsstore10m'; // 운영용
    }

    if (this.loginYn === true) {
      this.custNm = CookieUtils.getCookie('CUST_NM');
      this.mbrTypeCd = CookieUtils.getCookie('MBR_TYPE_CD');
      this.popup.infoArr = {
        korName: this.custNm
      };

      if (this.id != null && this.id != '') {
        this.mallTyp = this.id;

        if (this.mallTyp === '11') {
          this.popupAction('popupDaliJoin');
        }
      }

      this.retrievePmbsJoin();
    } else {
      this.$router.push('/cu/login');
    }
    const vm = this;
    // PC KMC인증
    window.getSelfCertification = function (strRecCert, strCertNum, callBack) {
      vm.getSelfCertif(strRecCert, strCertNum, callBack);
    };
    // 모바일 인증
    const strRecCert = localStorage.getItem('strRecCert');
    const strCertNum = localStorage.getItem('strCertNum');
    vm.form.strRecCert = strRecCert;
    if (!StringUtils.isEmpty(strRecCert)) {
      localStorage.removeItem('strRecCert');
      localStorage.removeItem('strCertNum');
      localStorage.removeItem('reUrl');
      vm.getSelfCertif(strRecCert, strCertNum);
    }
    // 카드 등록
    const that = this;
    window.callbackFnc = async function (hashKey) {
      await ApiUtils.post('/fo/pa/billingAuthCallback', {
        hashKey: hashKey,
      }).then((res) => {
        if (
          res.data === null ||
          !(res.data.resultCode === '0000' || res.data.resultCode === '3001')
        ) {
          if (res.data.resultCode === 'U999') {
            that.$gsdialog.alert('카드등록을 취소하였습니다.');
          } else {
            that.$gsdialog.alert('빌링키 발급 시 오류가 발생하였습니다.');
          }
          return;
        } else {
          that.cardIssuer = res.data.cardIssuer;
          that.cardIssuerName = res.data.cardIssuerName;
          that.displayCardNo = res.data.displayCardNo;
          that.billingKey = res.data.billingKey;
          that.finalReg();
        }
      });
    };
  },
  updated() {
    // 팝업 딤드 시 스크롤 막기
    if (this.popup.open) {
      const scrollYContents = document.querySelectorAll('.scroll-area');
      if (scrollYContents.length > 0) {
        for (let i = 0; i < scrollYContents.length; i++) {
          disableBodyScroll(scrollYContents[i]);
        }
      } else {
        disableBodyScroll(this);
      }
    } else {
      clearAllBodyScrollLocks(this);
    }
  },
};
</script>
