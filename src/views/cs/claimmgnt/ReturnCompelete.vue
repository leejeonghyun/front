<!--
Design: views/ss/SC-FO-SS-GF-MS-824.vue
Pg id:
Uri: /cs/claimmgnt/ord_rtn_sate_info/:ordId/:claimSeqno
-->
<template>
<!-- 4월수정 START : UI변경으로 인한 마크업 추가 -->
  <div class="wrap">
    <!-- START : 헤더 -->
    <SubDefaultHeader headerText="반품신청완료" prevType="false" />
    <!-- END : 헤더 -->
    <!-- START : 본문 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <section class="gift-receive-complete return-complete return">
        <div class="msg-complete">
          <h2 class="msg-complete-txt">반품 신청이 접수되었습니다.</h2>
        </div>
        <div class="return-info-wrap" v-if="ordDlvpRslt != null">
          <dl class="return-info">
            <dt>방문 예정</dt>
            <dd>{{isEmpty(ordDlvpRslt.retSchedDt) ? '' : toFormat(ordDlvpRslt.retSchedDt, 'MM-DD(dd)')}}
              {{isEmpty(ordDlvpRslt.retSchedBeginTm) ? '' : toFormat(ordDlvpRslt.retSchedDt+ordDlvpRslt.retSchedBeginTm, 'HH:mm')}}
              {{isEmpty(ordDlvpRslt.retSchedEndTm) ? '' : ' ~ ' + toFormat(ordDlvpRslt.retSchedDt+ordDlvpRslt.retSchedEndTm, 'HH:mm')}}
            </dd>
            <dt v-if="!isEmpty(ordDlvpRslt.itemDlvrMethoNm)">회수 위치</dt>
            <dd v-if="!isEmpty(ordDlvpRslt.itemDlvrMethoNm)">
              {{ordDlvpRslt.itemDlvrMethoNm}}
              <p class="info">
                {{!isEmpty(ordDlvpRslt.itemDlvrMethoAddNm) ? ordDlvpRslt.itemDlvrMethoAddNm + ' : ' : '' }}
                {{!isEmpty(ordDlvpRslt.itemDlvrMethoDtlCnts) ? ordDlvpRslt.itemDlvrMethoDtlCnts : '' }}
              </p>
            </dd>
          </dl>
          <!-- START : 당일, 새벽, 전국, 업체 택배 반품 신청 완료인 경우 -->
          <p class="txt-notice" >배송 운행 및 차량 배정으로 인해 방문 시간이 달라질 수 있습니다.</p>
          <!-- END : 당일, 새벽, 전국, 업체 택배 반품 신청 완료인 경우 -->
        </div>
        <!-- START : 최종 결제금액 -->
        <div class="section" v-if="refndInfoRslt != null && (refndMeansRslt != null && refndMeansRslt.length > 0) && (addTdrRslt != null && addTdrRslt.length > 0) && (savgRetRslt != null && savgRetRslt.length > 0)">
          <div class="sub-title send-total-price">
            <h2>결제정보</h2>
          </div>
          <div class="sub-inner-box">
            <ul class="price-list-type">
              <li v-if="refndInfoRslt != null">환불예정금액
                  <span class="price color-gr">{{toComma(refndInfoRslt.refndSchedAmt)}}원</span>
              </li>
              <li v-if="refndMeansRslt != null && refndMeansRslt.length > 0">환불수단<button type="button" aria-label="환불 수단 안내 팝업 활성화" aria-haspopup="dialog" class="btn-infomation" @click="popupReturnInfoAction"><span class="hidden">환불 수단 안내</span></button>
                <!-- START : 환불처리 안내 -->
                <PopupReturnInfo @popupEvent="popupAction" v-if="this.popup.popupReturnInfo" /> <!-- 팝업 - 환불 처리안내 -->
                <!-- END : 환불처리 안내 -->
                <ul class="price-list-detail">
                  <li v-for="(refndMeans, inx) in refndMeansRslt" :key="inx">
                    <span class="payment-type" v-if="refndMeans.refndMeansDtlCd == '23'">THE POP 리워즈</span>
                    <span class="payment-type" v-if="refndMeans.refndMeansDtlCd == '06'">GS&amp;POINT</span>
                    <span class="payment-type" v-else>{{refndMeans.refndMeansNm}}</span>
                    <span class="price color-gr" v-if="refndMeans.refndMeansDtlCd == '23'">{{toComma(this.ordCnclRslt.refndRwds)}}점</span>
                    <span class="price point" v-if="refndMeans.refndMeansDtlCd == '06'">{{toComma(this.ordCnclRslt.refndGsPnt)}}P</span>
                    <span class="price color-gr" v-else>{{toComma(this.refndMeans.refndMeansAmt)}}원</span>
                  </li>
                </ul>
              </li>
              <li v-if="addTdrRslt != null && addTdrRslt.length > 0">추가결제금액
                <ul class="price-list-detail" v-for="(addTdr, inx) in addTdrRslt" :key="inx">
                  <li>
                    <span class="hidden">결제금액</span>
                    <span class="price color-gr">{{toComma(addTdr.addTdrAmt)}}원</span>
                  </li>
                  <li>
                    <span class="hidden">결제수단</span>
                    <span class="price color-gr">{{addTdr.addTdrMeansNm}}</span>
                  </li>
                </ul>
              </li>
            </ul>
            <p class="point-list" v-for="(savgRet, inx) in savgRetRslt" :key="inx">
                {{savgRet.ordExpnsTypeDtlNm}}
                <span class="price color-gr">{{toComma(this.savgRet.savgRetAmt)}}{{savgRet.unitNm}}</span>
            </p>
          </div>
        </div>
        <!-- END : 최종 결제금액 -->
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area">
          <a href="#" type="button" class="btn-md btn-bg darkgray" @click="goPageOrdRtnDtl">신청내역보기</a>
          <a href="#" type="button" class="btn-md btn-bg lightgreen" @click="goHome">쇼핑하러 가기</a>
        </div>
        <!-- START : 하단 버튼 -->
      </section>
    </main>
  </div>
  <!-- 4월수정 END : UI변경으로 인한 마크업 추가 -->
</template>

<script>
/* 4월수정 START : UI변경으로 인한 마크업 추가 */
import SubDefaultHeader from '@/components/common/SubDefaultHeader'; // 헤더
import PopupReturnInfo from '@/views/cs/claimmgnt/PopupReturnInfo'; // 팝업 - 환불 처리안내
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "ReturnCompelete",
  metaInfo: {
    title: 'GS fresh',
    titleTemplate: '반품신청 완료 < 마이페이지 < %s'
  },
  data() {
    return {
      popup: {
        open: false,
        popupReturnInfo: false, // 환불 처리안내
      },
      ordRtnRslt: {}, // 반품 신청 결좌 정보
      refndInfoRslt: {}, // 환불정보결과
      refndMeansRslt: [], // 환불수단결과
      addTdrRslt: [], // 추가결제결과
      savgRetRslt: [], // 적립금회수결과
      ordDlvpRslt: {}, // 주문배송지(회수지)결과
      ordId: this.$route.params.ordId, // 주문ID
      claimSeqno: this.$route.params.claimSeqno, // 클레임일련번호
    };
  },
  components: {
    SubDefaultHeader,
    PopupReturnInfo, // 팝업 - 환불 처리안내
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
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    toFormat(x, y) {
      return DateUtils.format(x, y);
    },
    async retrieveOrdRtnProcSateInfo() { // 반품 신청 결과 정보 조회
      const params = {
        ordId: this.ordId,
        claimSeqno: this.claimSeqno
      };
      const res = await ApiUtils.get('/fo/cs/claimmgnt/order-return-statement-info', params);
      this.ordRtnRslt = res.data.data;
      this.refndInfoRslt = this.ordRtnRslt.refndInfoRslt;
      this.refndMeansRslt = this.ordRtnRslt.refndMeansRslt;
      this.addTdrRslt = this.ordRtnRslt.addTdrRslt;
      this.savgRetRslt = this.ordRtnRslt.savgRetRslt;
      this.ordDlvpRslt = this.ordRtnRslt.ordDlvpRslt;
    },
    goPageOrdRtnDtl() {
      this.$router.push('/cs/claimmgnt/ord_rtn_dtl/'+this.ordId+'/'+this.claimSeqno);
    },
    goHome() {
      const homeCode = 'fr_' + CookieUtils.getMallId() + '_' + CookieUtils.getMdaType();
      location.href = CookieUtils.getDomain(homeCode);
    },
  },
  mounted() {
    // 반품 신청 결과 정보 조회
    this.retrieveOrdRtnProcSateInfo();
  }
};
/* 4월수정 END : UI변경으로 인한 마크업 추가 */
</script>
