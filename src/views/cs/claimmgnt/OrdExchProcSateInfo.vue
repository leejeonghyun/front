<!--
Design: views/ss/SC-FO-SS-GF-MS-825.vue
Pg id:
Uri: /cs/claimmgnt/ord_exch_sate_info/:ordId/:claimSeqno
-->
<template>
  <!-- 4월수정 START : UI변경으로 인한 마크업 추가 -->
  <div class="wrap" v-bind:class="[siteClass]">
    <Header headerText="교환신청완료" />
    <!-- START : 본문 -->
    <main id="main" tabindex="0"><!-- 접근성 : 본문 바로가기 위해서 id 값 필요, 변경 시 App.vue 파일의 본문바로가기 링크도 변경 -->
      <section class="gift-receive-complete return-complete exchange">
        <div class="msg-complete">
          <h2 class="msg-complete-txt">교환 신청이 접수되었습니다. </h2>
        </div>
        <!-- START : 당일/새벽에서 시간을 선택한 경우에만 노출 -->
        <div class="return-info-wrap" v-for="(ordDlvp, inx) in ordDlvpRslt" :key="inx">
          <dl class="return-info">
            <dt v-if="isNotEmpty(ordDlvp.retSchedDt) || ordDlvp.delivTypeCd == '03'">방문 예정</dt>
            <dd v-if="ordDlvp.delivTypeCd == '03'">1~3일내로 고객님께 직접 방문합니다.</dd>
            <dd v-else-if="isNotEmpty(ordDlvp.retSchedDt)">{{isEmpty(ordDlvp.retSchedDt) ? '' : toFormat(ordDlvp.retSchedDt, 'MM-DD(dd)')}}
              {{isEmpty(ordDlvp.retSchedBeginTm) ? '' : toFormat(ordDlvp.retSchedDt+ordDlvp.retSchedBeginTm, 'HH:mm')}}
              {{isEmpty(ordDlvp.retSchedEndTm) ? '' : ' ~ ' + toFormat(ordDlvp.retSchedDt+ordDlvp.retSchedEndTm, 'HH:mm')}}
            </dd>
            <dt v-if="!isEmpty(ordDlvp.itemDlvrMethoNm)">회수 위치</dt>
            <dd v-if="!isEmpty(ordDlvp.itemDlvrMethoNm)">
              {{ordDlvp.itemDlvrMethoNm}}
              <p class="info">
                {{!isEmpty(ordDlvp.itemDlvrMethoAddNm) ? ordDlvp.itemDlvrMethoAddNm + ' : ' : '' }}
                {{!isEmpty(ordDlvp.itemDlvrMethoDtlCnts) ? ordDlvp.itemDlvrMethoDtlCnts : '' }}
              </p>
            </dd>
          </dl>
          <!-- START : 업체 택배 반품 신청 완료인 경우 -->
          <p class="txt-notice">배송 운행 및 차량 배정으로 인해 방문 시간이 달라질 수 있습니다.</p>
          <!-- END : 업체 택배 반품 신청 완료인 경우 -->
        </div>
        <!-- END : 당일/새벽에서 시간을 선택한 경우에만 노출 -->
        <!-- START : 최종 결제금액 -->
        <div class="section" v-if="addTdrRslt != null && addTdrRslt.length > 0">
          <div class="sub-title send-total-price">
            <h2>결제정보</h2>
          </div>
          <div class="sub-inner-box">
            <ul class="price-list-type">
              <li>배송비<button type="button" aria-label="배송비 안내(고객부담) 팝업 활성화" aria-haspopup="dialog" class="btn-infomation" @click="popupDeliveryInfoAction"><span class="hidden">배송비 안내(고객부담)</span></button>
                <!-- START : 배송비 안내 -->
                <PopupDeliveryPersonal @popupEvent="popupAction" v-if="this.popup.popupDeliveryPersonal" />
                <!-- START : 배송비 안내 -->
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
          </div>
        </div>
        <!-- END : 최종 결제금액 -->
        <!-- START : 하단 버튼 -->
        <div class="bottom-btn-area">
          <a href="#" type="button" class="btn-md btn-bg darkgray" @click="goPageOrdExchDtl">신청내역보기</a>
          <a href="#" type="button" class="btn-md btn-bg lightgreen" @click="goHome">쇼핑하러 가기</a>
        </div>
        <!-- START : 하단 버튼 -->
      </section>
    </main>
    <!-- END : 본문 -->
  </div>
  <!-- 4월수정 START : UI변경으로 인한 마크업 추가 -->
</template>

<script>
import Header from '@/components/common/header/Header1'; // 헤더
import PopupDeliveryPersonal from '@/views/cs/claimmgnt/PopupDeliveryPersonal'; // 팝업 - 배송비(개인부담) 안내
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
import NumberUtils from '@/common/NumberUtils';
import DateUtils from '@/common/DateUtils';
import SiteUtils from '@/common/SiteUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "ChangeCompelete",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '교환신청 완료 < 마이페이지 < %s'
  },
  data() {
    return {
      popup: {
        open: false,
        popupDeliveryPersonal: false, // 배송비(개인부담)
      },
      ordExchRslt: {}, // 교환 신청 결과 정보
      addTdrRslt: [], // 추가결제결과
      ordDlvpRslt: [], // 주문배송지(회수지)결과
      ordId: this.$route.params.ordId, // 주문ID
      claimSeqno: this.$route.params.claimSeqno, // 클레임일련번호
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  components: {
    Header,
    PopupDeliveryPersonal
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
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    isEmpty(x) {
      return StringUtils.isEmpty(x);
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    toFormat(x, y) {
      return DateUtils.format(x, y);
    },
    async retrieveOrdExchProcSateInfo() { // 교환 신청 결과 정보 조회
      const params = {
        ordId: this.ordId,
        claimSeqno: this.claimSeqno
      };
      const res = await ApiUtils.get('/fo/cs/claimmgnt/order-exchange-statement-info', params);
      this.ordExchRslt = res.data.data;
      this.addTdrRslt = this.ordExchRslt.addTdrRslt;
      this.ordDlvpRslt = this.ordExchRslt.ordDlvpRslt;
    },
    goPageOrdExchDtl() {
      this.$router.push('/cs/claimmgnt/ord_exch_dtl/'+this.ordId+'/'+this.claimSeqno);
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
    // 교환 신청 결과 정보 조회
    this.retrieveOrdExchProcSateInfo();
  }
};
/* 4월수정 END : UI변경으로 인한 마크업 추가 */
</script>
