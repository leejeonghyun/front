<template>
  <div class="wrap public_domain" :class="siteClass">
    <!-- 유입위치 클래스 추가 -->
    <SubDefaultHeader headerText="취소신청완료" :onlyTitleType="true" :tabbar="false" />
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <section class="gift-receive-complete return-complete cancel">
        <div class="msg-complete">
          <h2 class="msg-complete-txt">
            취소 신청이 정상적으로
            <br />처리되었습니다.
          </h2>
        </div>
        <!-- START : 최종 결제금액 -->
        <div class="section" v-if="refndYn">
          <div class="sub-title border">
            <h3>
              <span class="bg-line-brush">결제정보</span>
            </h3>
          </div>
          <div class="sub-inner-box" v-if="this.refndAmtYn">
            <ul class="price-list-type">
              <li>
                환불완료금액
                <span class="price total">{{this.refndAmt | currency}}원</span>
              </li>
              <li v-if="this.mfRefndTdrMeansInfoList && this.mfRefndTdrMeansInfoList.length > 0">
                환불수단
                <button
                  type="button"
                  aria-label="환불 수단 안내 팝업 활성화"
                  aria-haspopup="dialog"
                  class="btn-infomation"
                  @click="popupReturnInfoAction"
                >
                  <span class="hidden">환불 수단 안내</span>
                </button>
                <!-- START : 환불처리 안내 -->
                <PopupReturnInfo @popupEvent="popupAction" v-if="this.popup.popupReturnInfo" />
                <!-- 팝업 - 환불 처리안내 -->
                <ul class="price-list-detail">
                  <li v-for="(list, index) in this.mfRefndTdrMeansInfoList" :key="index">
                    <span class="payment-type">{{list.refndTdrMeansNm}}</span>
                    <span
                      class="price color-gr"
                      v-if="list.tdrMeansCd != '06'"
                    >{{(list.refndAmt == null)? 0 : list.refndAmt | currency}}{{list.amtSpNm}}</span>
                    <span
                      class="price point"
                      v-else
                    >{{(list.refndAmt == null)? 0 : list.refndAmt | currency}}{{list.amtSpNm}}</span>
                  </li>
                </ul>
              </li>
            </ul>
            <p class="point-list" v-if="Object.keys(this.mfRefndTdrPointInfo).length > 0">
              {{this.mfRefndTdrPointInfo.refndTdrMeansNm}}
              <span
                class="price color-gr"
              >{{this.mfRefndTdrPointInfo.refndAmt | currency}}{{this.mfRefndTdrPointInfo.amtSpNm}}</span>
            </p>
          </div>
          <div class="sub-inner-box" v-else>
            <ul class="price-list-type">
              <li>
                환불예정금액
                <span class="price total">{{this.refndSchedAmt | currency}}원</span>
              </li>
              <li
                v-if="this.mfRefndTdrMeansInfoSchedList && this.mfRefndTdrMeansInfoSchedList.length > 0"
              >
                환불수단
                <button
                  type="button"
                  aria-label="환불 수단 안내 팝업 활성화"
                  aria-haspopup="dialog"
                  class="btn-infomation"
                  @click="popupReturnInfoAction"
                >
                  <span class="hidden">환불 수단 안내</span>
                </button>
                <!-- START : 환불처리 안내 -->
                <PopupReturnInfo @popupEvent="popupAction" v-if="this.popup.popupReturnInfo" />
                <!-- 팝업 - 환불 처리안내 -->
                <!-- END : 환불처리 안내 -->
                <ul class="price-list-detail">
                  <li v-for="(list, index) in this.mfRefndTdrMeansInfoSchedList" :key="index">
                    <span class="payment-type">{{list.tdrMeansNm}}</span>
                    <span
                      class="price color-gr"
                      v-if="list.tdrMeansCd != '06'"
                    >{{(list.refndReqAmt == null)? 0 : list.refndReqAmt | currency}}{{list.amtSpNm}}</span>
                    <span
                      class="price point"
                      v-else
                    >{{(list.refndReqAmt == null)? 0 : list.refndReqAmt | currency}}{{list.amtSpNm}}</span>
                  </li>
                </ul>
              </li>
            </ul>
            <p class="point-list" v-if="Object.keys(this.mfRefndTdrPointInfo).length > 0">
              {{this.mfRefndTdrPointInfo.tdrMeansNm}}
              <span
                class="price color-gr"
              >{{this.mfRefndTdrPointInfo.refndReqAmt | currency}}{{this.mfRefndTdrPointInfo.amtSpNm}}</span>
            </p>
          </div>
        </div>
        <!-- END : 최종 결제금액 -->
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area">
          <a
            href="javascript:void(0);"
            type="button"
            class="btn-md btn-bg darkgray"
            @click="goPageOrdCnclDtl"
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
import PopupReturnInfo from '@/views/cs/claimmgnt/PopupReturnInfo'; // 팝업 - 환불 처리안내

import CookieUtils from '@/common/CookieUtils';
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import SiteUtils from '@/common/SiteUtils';
export default {
  name: 'CancelCompelete',
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '취소신청 완료 < 마이페이지 < %s',
  },
  data() {
    return {
      ordId: this.$route.params.ordId,
      siteClass: CookieUtils.getSiteClass(),
      popup: {
        open: false,
        popupReturnInfo: false, // 환불 처리안내
      },
      ordCnclRslt: {},
      refndSchedAmt: 0,
      refndAmt: 0,
      mfRefndTdrMeansInfoSchedList: [],
      mfRefndTdrMeansInfoList: [],
      mfClaimPntInfoList: [],
      refndAmtYn: false,
      refndYn: false,
      mfRefndTdrPointInfo: {},
    };
  },
  components: {
    SubDefaultHeader,
    Footer,
    PopupReturnInfo,
  },
  filters: {
    currency: function(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  methods: {
    // 팝업 활성/비활성
    popupAction(type) {
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    popupReturnInfoAction() {
      this.popupAction('popupReturnInfo');
    },
    // 취소 신청 결과 정보 조회
    async retrieveOrdCnclProcSateInfo() {
      const params = {
        ordId: this.ordId,
      };
      await ApiUtils.get('/fo/cs/mf/order-cancellation-detail', {
        ...params,
      })
        .then(res => {
          if (res.data === null || !res.data.success) {
            return;
          }
          const resData = res.data.data;
          if (resData) {
            this.refndYn = true;
            const tempObjData = {};
            tempObjData.amtSpNm = 'P';
            if (
              resData.mfClaimDtlList.length > 0 &&
              resData.mfClaimDtlList.find(
                x =>
                  x.mfOrdStatCd ==
                  this.$store.state.cs.MF_ORD_STAT_CD_CNCL_ACEPT
              )
            ) {
              // 예정
              this.refndSchedAmt = resData.mfRefndAmtInfo.refndSchedAmt;
              this.mfRefndTdrMeansInfoSchedList =
                resData.mfRefndAmtInfo.mfRefndTdrMeansInfoSchedList;
              // 환불결제수단정보 정렬 추가
              const sortingField = 'indSeq';
              this.mfRefndTdrMeansInfoSchedList.sort(function(a, b) {
                return a[sortingField] - b[sortingField];
              });
              // 포인트 회수 정보 info
              if (resData.mfRefndAmtInfo.pntSchedAmt > 0) {
                tempObjData.tdrMeansNm = 'GS&POINT 적립 회수';
                tempObjData.refndReqAmt = resData.mfRefndAmtInfo.pntSchedAmt;
                this.mfRefndTdrPointInfo = tempObjData;
              }
              this.refndAmtYn = false;
            } else {
              // 확정
              this.refndAmt = resData.mfRefndAmtInfo.refndAmt;
              this.mfRefndTdrMeansInfoList =
                resData.mfRefndAmtInfo.mfRefndTdrMeansInfoList;
              // 포인트 회수 정보 info
              if (resData.mfRefndAmtInfo.pntAmt > 0) {
                tempObjData.refndTdrMeansNm = 'GS&POINT 적립 회수';
                tempObjData.refndAmt = resData.mfRefndAmtInfo.pntAmt;
                this.mfRefndTdrPointInfo = tempObjData;
              }
              this.refndAmtYn = true;
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    goHome() {
      // this.$router.push({ path: '/' });
      location.href = SiteUtils.marketformo('/');
    },
    goPageOrdCnclDtl() {
      this.$router.push('/cs/mf/claimmgnt/ord_cncl_dtl/' + this.ordId);
    },
  },
  async mounted() {
    await this.retrieveOrdCnclProcSateInfo();
  },
};
</script>

<style>
</style>
