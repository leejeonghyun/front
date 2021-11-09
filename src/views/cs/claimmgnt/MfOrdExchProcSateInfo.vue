<template>
  <div class="wrap public_domain" :class="siteClass">
    <!-- 유입위치 클래스 추가 -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="교환신청완료" :onlyTitleType="true" :tabbar="false" />
    <!-- END : 헤더 -->
    <!-- START : 본문 -->
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <section class="gift-receive-complete return-complete exchange">
        <div class="msg-complete">
          <h2 class="msg-complete-txt">교환 신청이 접수되었습니다.</h2>
        </div>
        <!-- START : 당일/새벽에서 시간을 선택한 경우에만 노출 -->
        <div class="return-info-wrap">
          <dl class="return-info">
            <dt>방문 예정</dt>
            <dd>1~3일내로 고객님께 직접 방문합니다.</dd>
            <dt>회수 위치</dt>
            <dd v-show="this.mfClaimDtlCustReqPont.mfItemDlvrMethoCd">
              <p
                v-if="this.mfClaimDtlCustReqPont.mfItemDlvrMethoCd =='01' || this.mfClaimDtlCustReqPont.mfItemDlvrMethoCd == '02'"
              >{{getCommText(this.mfClaimDtlCustReqPont.mfItemDlvrMethoCd, 'OD0101')}}</p>
              <section v-if="this.mfClaimDtlCustReqPont.mfItemDlvrMethoAddCd">
                <p
                  class="info"
                  v-show="this.mfClaimDtlCustReqPont.mfItemDlvrMethoAddCd == 1"
                >공동현관출입번호: {{this.mfClaimDtlCustReqPont.itemDlvrMethoDtlCnts | itemDlvrMethoDtlCntsMask}}</p>
                <p
                  class="info"
                  v-show="this.mfClaimDtlCustReqPont.mfItemDlvrMethoAddCd == 2 || this.mfClaimDtlCustReqPont.mfItemDlvrMethoAddCd == 3"
                >{{getCommText(this.mfClaimDtlCustReqPont.mfItemDlvrMethoAddCd, 'OD0102')}}</p>
                <p
                  class="info"
                  v-show="this.mfClaimDtlCustReqPont.mfItemDlvrMethoAddCd == 4"
                >{{this.mfClaimDtlCustReqPont.itemDlvrMethoDtlCnts}}</p>
              </section>
              <section v-else>{{this.mfClaimDtlCustReqPont.itemDlvrMethoDtlCnts}}</section>
            </dd>
          </dl>
          <!-- START : 전국, 업체 택배 반품 신청 완료인 경우 -->
          <p class="txt-notice">배송 운행 및 차량 배정으로 인해 방문 시간이 달라질 수 있습니다.</p>
          <!-- END : 전국, 업체 택배 반품 신청 완료인 경우 -->
        </div>
        <!-- END : 당일/새벽에서 시간을 선택한 경우에만 노출 -->
        <!-- START : 최종 결제금액 -->
        <div class="section" v-if="this.tdrAmt > 0">
          <div class="sub-title border">
            <h3>
              <span class="bg-line-brush">결제정보</span>
            </h3>
          </div>
          <div class="sub-inner-box">
            <ul class="price-list-type">
              <li>
                배송비
                <button
                  type="button"
                  aria-label="배송비 안내(고객부담) 팝업 활성화"
                  aria-haspopup="dialog"
                  class="btn-infomation"
                  @click="popupAction('popupDeliveryPersonal')"
                >
                  <span class="hidden">배송비 안내(고객부담)</span>
                </button>
                <!-- 팝업 - 배송비 안내 -->
                <MfPopupDeliveryPersonal
                  @popupEvent="popupAction"
                  v-if="this.popup.popupDeliveryPersonal"
                />
                <!-- START : 배송비 안내 -->
                <ul class="price-list-detail">
                  <li>
                    <span class="hidden">결제금액</span>
                    <span class="price color-gr">{{this.tdrAmt | currency}}원</span>
                  </li>
                  <li v-for="(claimTdrList, index) in this.mfClaimDtlTdrList" :key="index">
                    <span class="hidden">결제수단</span>
                    <span class="price color-gr">{{claimTdrList.tdrMeansNm}}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <!-- END : 최종 결제금액 -->
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area">
          <a
            href="javascript:void(0);"
            type="button"
            class="btn-md btn-bg darkgray"
            @click="goPageOrdExchDtl"
          >신청내역보기</a>
          <a
            href="javascript:void(0);"
            type="button"
            class="btn-md btn-bg lightgreen"
            @click="goHome"
          >쇼핑하러 가기</a>
        </div>
        <!-- START : 하단 버튼 -->
      </section>
    </main>
    <!-- START : footer -->
    <Footer />
    <!-- END : footer -->
  </div>
</template>

<script>
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import Footer from '@/components/common/Footer'; // 푸터
import MfPopupDeliveryPersonal from '@/views/cs/claimmgnt/MfPopupDeliveryPersonal'; // 팝업 - 배송비 안내
import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import SiteUtils from '@/common/SiteUtils';
export default {
  name: 'ReturnCompelete',
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '교환신청 완료 < 마이페이지 < %s',
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      popup: {
        open: false,
        popupDeliveryPersonal: false,
      },
      ordId: this.$route.params.ordId, // 주문ID
      mfClaimDtlCustReqPont: {},
      commGrpCdOD0101List: [],
      commGrpCdOD0102List: [],
      ordExchInfo: {},
      mfOrdDlvpInfo: {},
      itemRetpInfo: {}, // 상품 회수지 정보
      mfClaimDtlTdrList: [],
      tdrAmt: 0,
    };
  },
  components: {
    SubDefaultHeader,
    Footer,
    MfPopupDeliveryPersonal,
  },
  filters: {
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    itemDlvrMethoDtlCntsMask: function(value, maskStr = '*') {
      if (value != null) {
        return maskStr.repeat(value.length);
      }
    },
  },
  methods: {
    // 팝업 활성/비활성
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    popupDeliveryInfoAction() {
      this.popupAction('popupDeliveryPersonal');
    },
    goPageOrdExchDtl() {
      this.$router.push('/cs/mf/claimmgnt/ord_exch_dtl/' + this.ordId);
    },
    goHome() {
      // this.$router.push({ path: '/' });
      location.href = SiteUtils.marketformo('/');
    },
    getCommText(mfItemDlvrMethoCd, commGrpCd) {
      let data = '';
      if (mfItemDlvrMethoCd) {
        if (commGrpCd == 'OD0101') {
          this.commGrpCdOD0101List
            .filter(x => x.commCd == mfItemDlvrMethoCd)
            .map(value => {
              data = value.commCdNm;
            });
        } else if (commGrpCd == 'OD0102') {
          this.commGrpCdOD0102List
            .filter(x => x.commCd == mfItemDlvrMethoCd)
            .map(value => {
              data = value.commCdNm;
            });
        }
        return data;
      }
    },
    async retrieveOrdExchProcSateInfo() {
      // 교환 신청 결과 정보 조회
      const params = {
        ordId: this.ordId,
      };
      await ApiUtils.get('/fo/cs/mf/exchange-detail', {
        ...params,
      })
        .then(res => {
          if (res.data === null || !res.data.success) {
            return;
          }
          const ordExchInfo = res.data.data;
          if (ordExchInfo) {
            this.mfClaimDtlCustReqPont = ordExchInfo.mfClaimDtlDlvpList[0];
            // this.mfClaimDtlCustReqPont = ordExchInfo.mfClaimDtlCustReqPont; // 요청사항
            this.mfClaimDtlTdrList = ordExchInfo.mfClaimDtlTdrList; // 클레임상세결제리스트
            if (this.mfClaimDtlTdrList) {
              this.mfClaimDtlTdrList.map(tdrValue => {
                this.tdrAmt += tdrValue.tdrAmt;
              });
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    async init() {
      this.commGrpCdOD0101List = await this.$store.dispatch(
        'commCdSearch',
        'OD0101'
      );
      this.commGrpCdOD0102List = await this.$store.dispatch(
        'commCdSearch',
        'OD0102'
      );
    },
  },
  async mounted() {
    await this.init();
    // 교환 신청 결과 정보 조회
    await this.retrieveOrdExchProcSateInfo();
  },
};
/* 4월수정 END : UI변경으로 인한 마크업 추가 */
</script>
