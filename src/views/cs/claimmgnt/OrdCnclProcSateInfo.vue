<!--
Design: views/ss/SC-FO-SS-GF-MP-862.vue
Pg id: PG_FO-CS-O012
Uri: /cs/claimmgnt/ord_cncl_proc_sate_info/:ordId/:claimSeqno
-->
<template>
  <!-- 4월수정 START : UI변경으로 인한 마크업 추가 -->
  <div class="wrap" v-bind:class="[siteClass]">
    <Header headerText="취소신청완료" />
    <!-- START : 본문 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <section class="gift-receive-complete return-complete cancel">
        <div class="msg-complete">
          <h2 class="msg-complete-txt">취소신청이 정상적으로<br>처리되었습니다.</h2>
        </div>
        <!-- START : 최종 결제금액 -->
        <div class="section">
          <div class="sub-title send-total-price">
            <h2>결제정보</h2>
          </div>
          <div class="sub-inner-box">
            <ul class="price-list-type">
              <li v-if="refndInfoRslt != null">환불예정금액
                  <span class="price color-gr">{{refndInfoRslt != null ? toComma(refndInfoRslt.refndSchedAmt) : '0'}}원</span>
              </li>
              <li v-if="refndMeansRslt != null && refndMeansRslt.length > 0">환불수단<button type="button" aria-label="환불 수단 안내 팝업 활성화" aria-haspopup="dialog" class="btn-infomation" @click="popupReturnInfoAction"><span class="hidden">환불 수단 안내</span></button>
                <!-- START : 환불처리 안내 -->
                <PopupReturnInfo @popupEvent="popupAction" v-if="this.popup.popupReturnInfo" /> <!-- 팝업 - 환불 처리안내 -->
                <!-- END : 환불처리 안내 -->
                <ul class="price-list-detail">
                  <li v-for="(refndMeans, inx) in refndMeansRslt" :key="inx">
                    <span class="payment-type" v-if="refndMeans.refndMeansDtlCd == '23'">THE POP 리워즈 </span>
                    <span class="payment-type" v-else-if="refndMeans.refndMeansDtlCd == '06'">GS&amp;POINT </span>
                    <span class="payment-type" v-else>{{refndMeans.refndMeansNm}} </span>
                    <span class="price color-gr" v-if="refndMeans.refndMeansDtlCd == '23'">{{toComma(refndMeans.refndMeansAmt)}}점</span>
                    <span class="price point" v-else-if="refndMeans.refndMeansDtlCd == '06'">{{toComma(refndMeans.refndMeansAmt)}}P</span>
                    <span class="price color-gr" v-else>{{toComma(refndMeans.refndMeansAmt)}}원</span>
                  </li>
                </ul>
              </li>
              <li v-if="addTdrRslt != null && addTdrRslt.length > 0">추가결제금액
                <ul class="price-list-detail" v-for="(addTdr, inx) in addTdrRslt" :key="inx">
                  <li>
                    <span class="hidden">결제금액</span>
                    <span v-if="addTdr.addTdrMeansCd == '06' && addTdr.addTdrMeansDtlCd == '06'" class="price color-gr">
                      {{toComma(addTdr.addTdrAmt)}}P
                    </span>
                    <span v-else-if="addTdr.addTdrMeansCd == '06' && addTdr.addTdrMeansDtlCd == '23'" class="price color-gr">
                      {{toComma(addTdr.addTdrAmt)}}점
                    </span>
                    <span v-else class="price color-gr">
                      {{toComma(addTdr.addTdrAmt)}}원
                    </span>
                  </li>
                  <li>
                    <span class="hidden">결제수단</span>
                    <span v-if="addTdr.addTdrMeansCd == '01' || addTdr.addTdrMeansCd == '02'" class="price color-gr">
                      {{addTdr.addTdrMeansNm}}
                    </span>
                    <span v-else-if="addTdr.addTdrMeansCd == '06' && addTdr.addTdrMeansDtlCd == '06'" class="price color-gr">
                      GS&amp;POINT
                    </span>
                    <span v-else-if="addTdr.addTdrMeansCd == '06' && addTdr.addTdrMeansDtlCd == '23'" class="price color-gr">
                      THE POP 리워즈
                    </span>
                    <span v-else-if="addTdr.addTdrMeansCd == '18'" class="price color-gr">
                      {{addTdr.addTdrMeansNm}} <strong class="mobile">{{addTdr.addTdrMeansDtlNm}}</strong>
                    </span>
                    <span v-else class="price color-gr">
                      {{addTdr.addTdrMeansNm}}|{{addTdr.pytcNm}}
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
            <p class="point-list" v-for="(savgRet, inx) in savgRetRslt" :key="inx">
                {{savgRet.ordExpnsTypeDtlNm}}
                <span class="price color-gr">{{toComma(savgRet.savgRetAmt)}}{{savgRet.unitNm}}</span>
            </p>
          </div>
        </div>
        <!-- END : 최종 결제금액 -->
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area">
          <a href="#" type="button" class="btn-md btn-bg darkgray" @click="goPageOrdCnclDtl">신청내역보기</a>
          <a href="#" type="button" class="btn-md btn-bg lightgreen" @click="goHome">쇼핑하러 가기</a>
        </div>
        <!-- START : 하단 버튼 -->
      </section>
    </main>
  </div>
</template>

<script>
import Header from '@/components/common/header/Header1'; // 헤더
import PopupReturnInfo from '@/views/cs/claimmgnt/PopupReturnInfo'; // 팝업 - 환불 처리안내
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';
export default {
  name: "CancelCompelete",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '취소신청 완료 < 마이페이지 < %s'
  },
  mixins: [LayerPopupMixin],
  data() {
    return {
      popup: {
        open: false,
        popupReturnInfo: false, // 환불 처리안내
      },
      ordCnclRslt: {}, // 취소 신청 결과 정보 List
      refndInfoRslt: {}, // 환불정보결과
      refndMeansRslt: [], // 환불수단결과
      addTdrRslt: [], // 추가결제결과
      savgRetRslt: [], // 적립금회수결과
      ordId: this.$route.params.ordId,
      claimSeqno: this.$route.params.claimSeqno,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    Header,
    PopupReturnInfo, // 팝업 - 환불 처리안내
  },
  created () {
    this.retrieveOrdCnclProcSateInfo();
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
    async retrieveOrdCnclProcSateInfo() { // 취소 신청 결과 정보 조회
      const params = {
        ordId: this.ordId,
        claimSeqno: this.claimSeqno
      };
      const res = await ApiUtils.get('/fo/cs/claimmgnt/order-cancellation-statement-info', params);
      console.log(res);
      this.ordCnclRslt = res.data.data;
      this.refndInfoRslt = this.ordCnclRslt.refndInfoRslt;
      this.refndMeansRslt = this.ordCnclRslt.refndMeansRslt;
      this.addTdrRslt = this.ordCnclRslt.addTdrRslt;
      this.savgRetRslt = this.ordCnclRslt.savgRetRslt;
    },
    goPageOrdCnclDtl() {
      this.$router.push('/cs/claimmgnt/ord_cncl_dtl/'+this.ordId+'/'+this.claimSeqno);
    },
    goHome() {
      // 공통 화면이면 home으로 이동 시 location.href;
      if (SiteUtils.isCommonSite()) {
        if (CookieUtils.getMallId() === '11') {
          // 달리살다
          location.href = SiteUtils.dalimo('/');
        } else {
          // gsfresh
          location.href = SiteUtils.freshmo('/');
        }
      } else {
        this.$router.push(
          { path: '/' },
        );
      }
    },
  },
  mounted() {

  }
};
</script>
