<template>
  <div class="wrap-dalidream" v-bind:class="[siteClass]">
    <!-- 4월 수정 START : 헤더 타입 변경 -->
    <MainHeader headerText="달리드림 멤버십" v-if="cmmSiteId === '3'"/>
    <SubDefaultHeader headerText="달리드림 멤버십" v-else />
    <!-- 4월 수정 END : 헤더 타입 변경 -->
    <main id="main" tabindex="0">
      <!-- 접근성: 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <div class="dali-dream-wrap">
        <div class="inner-wrap">
          <strong class="tit-sub">나의 내역</strong>
          <div class="my-breakdown">
            <!-- 4월수정 START : 마크업 수정 -->
            <table>
              <caption>내 유료멤버십 이용 내역표</caption>
              <colgroup>
                <col style="width:100px" />
                <col style="width:auto" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">이용 기간</th>
                  <td>
                    <span v-if="this.rcvJoinInfo.pmbsJoinTypeCd === '04'" class="trial">무료체험중</span>
                    {{ dateFormat(rcvJoinInfo.validDurBeginDt) }} ~ {{ dateFormat(rcvJoinInfo.maxValidDurEndDt) }}
                  </td>
                </tr>
                <!-- START : 무료체험 소진 후 -->
                <tr v-if="this.rcvTdrInfo.pmbsSvcTdrAmt > 0">
                  <th>최근 결제내역</th>
                  <td>
                    {{ comma(this.rcvTdrInfo.pmbsSvcTdrAmt) }} 원
                    <span>{{ this.rcvTdrInfo.fstRegDttm }}</span>
                  </td>
                </tr>
                <tr>
                  <th>다음 결제 예정일</th>
                  <td v-if="this.perdTdr == 'Y'">{{ dateFormat(rcvJoinInfo.maxValidDurEndDt) }}</td>
                  <td
                    v-if="this.perdTdr == 'N'"
                  >해지완료 ({{ dateFormat(rcvJoinInfo.perdTdrTermDttm) }})</td>
                </tr>
                <tr v-if="this.perdTdr == 'Y'">
                  <th>결제 예정 금액</th>
                  <td>3,900 원/월</td>
                </tr>
                <tr>
                  <th>결제 수단</th>
                  <!-- <th>결제 수단</th> -->
                  <td>
                    <span v-text="this.cardIssuerName"></span>
                    <!-- <span class="card-num">1234 - **** - **** -1234</span> -->
                    <span class="card-num" v-text="this.displayCardNo"></span>
                    <button
                      v-if="this.perdTdr == 'Y'"
                      class="btn-border btn-change-card"
                      @click="reqBillingKey"
                    >결제카드변경</button>
                    <button
                      v-if="this.perdTdr == 'N'"
                      class="btn-border btn-change-card"
                      @click="reqBillingKey"
                    >재가입하기</button>
                    <p class="payment-failed" v-if="this.perdTdr == 'N'">재가입하시려면 결제수단을 다시 등록해주세요.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="txt-bottom">선택하신 결제수단으로 매월 자동 결제됩니다.</p>
        </div>
        <div class="btn-area">
          <button type="button" class="btn-dali daligreen" @click="goUrl('/cu/my_page')">확인</button>
        </div>
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
      </div>
    </main>
    <Footer />
  </div>
</template>
<script>
import MainHeader from '@/components/common/SubDefaultHeader';
import SubDefaultHeader from '@/components/common/header/Header5';
import Footer from '@/components/common/Footer'; // 푸터
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'DaliUsageDetails',
  mixins: [],
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '나의 멤버십 내역 < 달리살다 멤버십 < 마이페이지 < %s',
  },
  data() {
    return {
      freeTrial: true,
      bgGray: true,
      rcvJoinInfo: [],
      rcvTdrInfo: [],
      userId: '',
      payCompany: 'SMARTROPG',
      deviceType: 'Mob',
      price: '',
      mid: 'gsstore10m',
      channelCd: '',
      custNo: '',
      custNm: '',
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
      cardStart: '',
      cardEnd: '',
      perdTdr: '',
      ordId: '',
      rcvOrdData: [],
      siteClass: CookieUtils.getSiteClass(),
      cmmSiteId: CookieUtils.getCmmSteId(),
    };
  },
  components: {
    MainHeader,
    SubDefaultHeader,
    Footer, // 푸터
  },
  methods: {
    dateFormat(dateStr) {
      if (!StringUtils.isEmpty(dateStr)) {
        return DateUtils.format(dateStr, 'YYYY.MM.DD');
      }
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    goUrl(url) {
      location.href = url;
    },
    finalReg: async function () {
      const InputDto = { encTdrKeyVal: this.billingKey };
      const result = await ApiUtils.post(
        '/fo/cu/pmbsmgnt/periodical-tender-card',
        InputDto
      );
      if (result.data.success == true) {
        this.retrievePmbsJoin();
      } else {
        this.$gsdialog.alert('오류가 발생했습니다.');
      }
    },
    async retrievePmbsJoin() {
      const receiveJoinInqInputDto = { searchType: 'BILLING' };
      const receiveJoinData = await ApiUtils.get(
        '/fo/cu/pmbsmgnt/paidmembership-join',
        receiveJoinInqInputDto
      );
      if (
        receiveJoinData.data.data !== null &&
        receiveJoinData.data.data.length >= 1
      ) {
        this.rcvJoinInfo = receiveJoinData.data.data[0];
        this.custNo = this.rcvJoinInfo.custNo;
        this.userId = this.rcvJoinInfo.custNo;
        this.cmmMbrNo = this.rcvJoinInfo.cmmMbrNo;
        this.myKey = this.rcvJoinInfo.encTdrKeyVal;
        this.perdTdr = this.rcvJoinInfo.perdTdrStngYn;
        this.retrievePmbsTdr();
        this.init();
      }
    },
    async retrievePmbsTdr() {
      const receivePmbsTdr = await ApiUtils.get(
        '/fo/cu/pmbsmgnt/paidmembership-tender',
        null
      );
      if (
        receivePmbsTdr.data.data !== null &&
        receivePmbsTdr.data.data.length >= 1
      ) {
        this.rcvTdrInfo = receivePmbsTdr.data.data[0];
      }
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
        mid: this.mid,
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
            this.$gsdialog.alert('결제가 완료되었습니다.');
          }
        }
      );
    },
    async init() {
      // const formData = this.form;
      // const mid = formData.mid;
      const data = {
        authType: 'BILLING',
        cmmMbrNo: this.cmmMbrNo,
        pytcTrmnCallTypeCd: 'BO', // 유료맴버쉽 정기결제는 BO
      };
      const that = this;
      await ApiUtils.post(
        '/fo/pa/cardInitAuthByLogin' +
          (this.deviceType === 'PC' ? 'Pc' : 'Mob'),
        data
      ).then((res) => {
        if (res.data === null || res.data.resultCode !== '0000') {
          console.error(res.data);
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
        this.getBillingKey();
      });
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
      billingForm.method = 'post';
      window.open('', title, option);
      billingForm.target = title;
      billingForm.submit();
    },
    async getBillingKey() {
      const data = {
        userId: this.userId,
        payCorpCd: 'SMARTROPG',
        // payCorpCd: this.payCompany
      };
      const that = this;
      await ApiUtils.post(
        '/fo/pa/retrieveCardBillingKeyList' +
          (this.deviceType === 'PC' ? 'Pc' : 'Mob'),
        data
      ).then((res) => {
        that.rsform = res.data;
        let isFail = false;
        if (res.data === null || res.data.resultCode !== '0000') {
          isFail = true;
        }
        if (res.data !== null) {
          if (
            res.data.billingKeyList !== null &&
            res.data.billingKeyList.length >= 1
          ) {
            this.billingKeyList = res.data.billingKeyList.filter((item) =>
              item.billingKey.includes(this.myKey)
            );
            if (
              this.billingKeyList !== null &&
              this.billingKeyList.length >= 1
            ) {
              this.userId = this.billingKeyList[0].userId;
              this.billingKey = this.billingKeyList[0].billingKey;
              this.cardIssuer = this.billingKeyList[0].cardIssuer;
              this.cardIssuerName = this.billingKeyList[0].cardIssuerName;
              this.displayCardNo = this.billingKeyList[0].displayCardNo;
              this.cardStart = this.displayCardNo.substring(0, 4);
              this.cardEnd = this.displayCardNo.substring(12);
              this.displayCardNo = this.cardStart + '********' + this.cardEnd;
            }
          }
        }
        if (isFail) {
          if (res.data !== null && res.data.resultCode === 'U999') {
            this.$gsdialog.alert('카드등록을 취소하였습니다.');
          } else {
            this.$gsdialog.alert('billing key 조회 중 오류가 발생하였습니다. ');
          }
        }
      });
    },
  },
  async mounted() {
    // 테스트/운영 mid 구분
    if (process.env.VUE_APP_MODE !== 'production') {
      this.mid = 'gsmemstt2m'; // 테스트용
    } else {
      this.mid = 'gsstore10m'; // 운영용
    }
    // 배경 컬러 넣기
    const that = this;
    const daliCont = document.querySelector('.wrap-dalidream');
    if (this.bgGray) {
      daliCont.classList.add('bg-gray');
    }
    this.retrievePmbsJoin();
    window.callbackFnc = async function (hashKey) {
      await ApiUtils.post('/fo/pa/billingAuthCallback', {
        hashKey: hashKey,
      }).then((res) => {
        if (res.data === null || res.data.resultCode !== '0000') {
          if (res.data !== null && res.data.resultCode === 'U999') {
            this.$gsdialog.alert('카드등록을 취소하였습니다.');
          } else {
            this.$gsdialog.alert('빌링키 발급 시 오류가 발생하였습니다.');
          }
          return;
        } else {
          that.billingKey = res.data.billingKey;
          that.finalReg();
        }
      });
    };
  },
};
</script>
