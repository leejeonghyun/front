<template>
  <div class="wrap public_domain" :class="siteClass">
    <!-- 유입위치 클래스 추가 -->
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="반품신청완료" :onlyTitleType="true" :tabbar="false" />
    <!-- END : 헤더 -->
    <!-- START : 본문 -->
    <main id="main" tabindex="0">
      <!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <section class="gift-receive-complete return-complete return">
        <div class="msg-complete">
          <h2 class="msg-complete-txt">반품 신청이 접수되었습니다.</h2>
        </div>
        <!-- START : 당일/새벽에서 시간을 선택한 경우에만 노출 -->
        <div class="return-info-wrap" v-if="this.mfClaimDtlCustReqPont">
          <dl class="return-info">
            <!-- START : 업체 택배 반품 신청 완료인 경우 -->
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
                >공동현관출입번호: {{this.mfClaimDtlCustReqPont.itemDlvrMethoDtlCnts | itemDlvrMethoDtlCntsMask }}</p>
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
            <!-- END : 업체 택배 반품 신청 완료인 경우 -->
            <!-- START : 픽업 반품 신청 완료인 경우
            <dt>방문 예정</dt>
            <dd>
              11/27(금)10:00~13:30
            </dd>
            END : 픽업 반품 신청 완료인 경우-->
          </dl>
          <!-- START : 전국, 업체 택배 반품 신청 완료인 경우 -->
          <p class="txt-notice">배송 운행 및 차량 배정으로 인해 방문 시간이 달라질 수 있습니다.</p>
          <!-- END : 전국, 업체 택배 반품 신청 완료인 경우 -->
        </div>
        <!-- END : 당일/새벽에서 시간을 선택한 경우에만 노출 -->
        <!-- START : 최종 결제금액 -->
        <div class="section">
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
                <!-- END : 환불처리 안내 -->
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
          <a href="#" type="button" class="btn-md btn-bg darkgray" @click="goOrdRtnDtl">신청내역보기</a>
          <a href="#" type="button" class="btn-md btn-bg lightgreen" @click="goHome">쇼핑하러 가기</a>
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
import SiteUtils from '@/common/SiteUtils';
export default {
  name: 'MfOrdRtnProcSateInfo',
  metaInfo: {
    title: 'MarketFor:',
    titleTemplate: '반품신청 완료 < 마이페이지 < %s',
  },
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      popup: {
        open: false,
        popupReturnInfo: false, // 환불 처리안내
      },
      ordId: this.$route.params.ordId, // 주문ID
      ordRtnRslt: {},
      mfClaimDtlCustReqPont: {},
      commGrpCdOD0101List: [],
      commGrpCdOD0102List: [],
      mfClaimPntInfoList: [],
      mfRefndTrdMeansInfoList: [],
      refndSchedAmt: 0,
      refndAmt: 0,
      mfRefndTdrMeansInfoSchedList: [],
      mfRefndTdrMeansInfoList: [],
      refndAmtYn: false,
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
    popupReturnInfoAction() {
      this.popupAction('popupReturnInfo');
    },
    goOrdRtnDtl() {
      this.$router.push('/cs/mf/claimmgnt/ord_rtn_dtl/' + this.ordId);
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
    goHome() {
      location.href = SiteUtils.marketformo('/');
    },
    async retrieveOrdRtnProcSateInfo() {
      // 반품 신청 결과 정보 조회
      const params = {
        ordId: this.ordId,
      };
      await ApiUtils.get('/fo/cs/mf/return-detail', {
        ...params,
      })
        .then(res => {
          if (res.data === null || !res.data.success) {
            return;
          }
          const resData = res.data.data;
          if (resData) {
            const tempObjData = {};
            tempObjData.amtSpNm = 'P';
            this.mfClaimDtlCustReqPont = resData.mfClaimDtlCustReqPont; // 요청사항
            if (
              resData.mfClaimDtlList.length > 0 &&
              resData.mfClaimDtlList.find(
                x =>
                  x.mfOrdStatCd == this.$store.state.cs.MF_ORD_STAT_CD_RTN_ACEPT
              )
            ) {
              // 예정
              this.refndAmtYn = false;
              this.refndSchedAmt = resData.mfRefndAmtInfo.refndSchedAmt;
              this.mfRefndTdrMeansInfoSchedList =
                resData.mfRefndAmtInfo.mfRefndTdrMeansInfoSchedList;
              // 환불결제수단정보 정렬 추가
              const sortingField = 'indSeq';
              this.mfRefndTdrMeansInfoSchedList.sort(function(a, b) {
                return a[sortingField] - b[sortingField];
              });
              if (resData.mfRefndAmtInfo.pntSchedAmt > 0) {
                tempObjData.tdrMeansNm = 'GS&POINT 적립 회수';
                tempObjData.refndReqAmt = resData.mfRefndAmtInfo.pntSchedAmt;
                this.mfRefndTdrPointInfo = tempObjData;
              }
            } else {
              // 확정
              this.refndAmtYn = true;
              this.refndAmt = resData.mfRefndAmtInfo.refndAmt;
              this.mfRefndTdrMeansInfoList =
                resData.mfRefndAmtInfo.mfRefndTdrMeansInfoList;
              if (resData.mfRefndAmtInfo.pntAmt > 0) {
                tempObjData.refndTdrMeansNm = 'GS&POINT 적립 회수';
                tempObjData.refndAmt = resData.mfRefndAmtInfo.pntAmt;
                this.mfRefndTdrPointInfo = tempObjData;
              }
            }

            /* console.log('반품완료 ::', resData);
            const refndAmtInfo = resData.mfRefndAmtInfo;
            if (refndAmtInfo) {
              // 환불예정금액
              this.refndAmtInfo.refndSchedAmt = refndAmtInfo.refndSchedAmt;
              // 상품예정금액
              this.refndAmtInfo.itemSchedAmt = refndAmtInfo.itemSchedAmt;
              // 혜택예정금액
              this.refndAmtInfo.beneSchedAmt = refndAmtInfo.beneSchedAmt;
              // 배송비예정금액
              this.refndAmtInfo.dlfeeSchedAmt = refndAmtInfo.dlfeeSchedAmt;
              // 환불결제수단 예정정보
              this.refndAmtInfo.mfRefndTdrMeansInfoSchedList =
                refndAmtInfo.mfRefndTdrMeansInfoSchedList;
            } */
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
    await this.retrieveOrdRtnProcSateInfo();
  },
};
/* 4월수정 END : UI변경으로 인한 마크업 추가 */
</script>
