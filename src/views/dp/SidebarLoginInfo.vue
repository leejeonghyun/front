<template>
  <div class="wrap-user">
    <div class="inner" v-if="this.$store.state.dp.isLogin">
      <dl class="wrap-user-info">
        <dt class="hidden">회원등급</dt>
        <dd
          class="user-grade"
          :class="getUserGrade"
          :aria-label="this.$store.state.dp.custGrdNm"
          @click="goMemberGrade"
        ></dd>
        <dt class="hidden">고객명</dt>
        <dd class="user-name">{{this.$store.state.dp.korName}}</dd>
        <dt class="hidden">배송지명</dt>
        <dd class="user-address">
          <a
            href="javascript:void(0)"
            title="배송지 등록 페이지로 이동"
            class="address"
            @click="getDelivery"
            v-if="$store.state.dp.dlvpInqInputDto.dlvpNm == ''"
          >배송지 등록</a>
          <a
            href="javascript:void(0)"
            class="address"
            @click="goDeliverySelect"
            v-else
          >{{this.$store.state.dp.dlvpInqInputDto.dlvpNm}}</a>
        </dd>
        <p class="delivery-desc" v-if="this.$store.state.dp.sidebarDeliveTimeInfo.toDayStr !== null && this.$store.state.dp.sidebarDeliveTimeInfo.toDayStr !== ''">
          지금 주문하면
          <strong class="time" aria-live="assertive" aria-atomic="true">
            <a
            href="javascript:void(0)"
            class="time"
            @click="goDeliveryTime">
              {{this.$store.state.dp.sidebarDeliveTimeInfo.toDayStr}}
              {{this.$store.state.dp.sidebarDeliveTimeInfo.deliveTime}}
              도착
            </a>
          </strong>
        </p>
        <p class="delivery-desc" v-else>
            <a
            href="javascript:void(0)"
            class="btn-delivery-time"
            @click="goDeliveryTime">
              배송시간 보기
            </a>
        </p>
      </dl>
    </div>
    <!-- 3. 비로그인 (로그인 X) -->
    <a href="javascript:void(0)" @click="toLogin" class="guide-login" title="로그인 페이지로 이동" v-else>
      <em>로그인</em> 해 주세요
    </a>
    <!-- 4월수정 : 마침표 제거 -->
    <!-- 4월수정 END : 회원상태별 노출 정보, 회원등급 표기 변경 -->
    <!-- START : 앱에서만 노출 -->
    <gs-link v-if = "isApp" to="/ss/setting" class="router-link-active btn-setting app-only" aria-label="앱설정"></gs-link>
    <!-- END : 앱에서만 노출 -->
    <!-- START : 로그인 상태 -->
    <ul class="wrap-user-btn" v-if="this.$store.state.dp.isLogin">
      <li>
        <a href="javascript:void(0);" @click="toMypage" title="마이페이지로이동">MY</a>
      </li>
      <li>
        <a href="javascript:void(0);" @click="toCoupon" title="쿠폰내역페이지이동">
          쿠폰
          <span class="icon num">{{this.$store.state.dp.couponCount}}</span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);" @click="toOrder" title="주문배송페이지이동">
          주문배송
          <span class="icon num">{{$store.state.dp.orderQty}}</span>
        </a>
      </li>
    </ul>
    <!-- END : 로그인 상태 -->
  </div>
</template>

<script>
import SiteUtils from '@/common/SiteUtils';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import DateUtils from '@/common/DateUtils';
import ContextUtils from '@/common/ContextUtils';

export default {
  name: 'SidebarLoginInfo',
  data() {
    return {
      siteClass: CookieUtils.getSiteClass(),
      isApp: ContextUtils.isNative(),
      cmmSteId: CookieUtils.getCmmSteId(),
    };
  },
  async created() {
    try {
      if (this.$store.state.dp.isLogin) {
        const cmmMbrNo = await ApiUtils.get('/dp/fr/dspctgmgnt/get-cmm-mbr-no');
        const param = { cmmMbrNo: cmmMbrNo.data };
        await this.$store.dispatch('getMemberInfo', param);
        await this.$store.dispatch('getCouponInfo', '');
        // 배송지 API
        await this.$store.dispatch('getDeliveryplace', '');
        // 주문배송갯수 카운트
        await this.$store.dispatch('getDeliveryCount', '');
      }
      const odBsktUuid = CookieUtils.getOdBsktUuid();
      const params = {
        odBsktUuid: odBsktUuid,
      };
      this.$store.dispatch('getBsktQtyInfo', params);
      if (this.$store.state.dp.isLogin) {
        this.getDeliveTimeInfo();
      }
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  computed: {
    getUserGrade() {
      const custGrdCd = this.$store.state.dp.custGrdCd;
      let strCustGrd = '';
      switch (custGrdCd) {
        case '01':
          strCustGrd = 'vvip';
          break;
        case '02':
          strCustGrd = 'vip';
          break;
        case '03':
          strCustGrd = 'fam';
          break;
        case '04':
          strCustGrd = 'wel';
          break;
        default:
          strCustGrd = 'wel';
          break;
      }
      return strCustGrd;
    },
  },
  mounted() {

  },
  methods: {
    goMemberGrade() {
      const memberGradeUrl = SiteUtils.commo('/cu/regular_member_grade');
      location.href = memberGradeUrl;
    },
    toLogin() {
      const returnUrl = encodeURIComponent(location.href);
      const loginUrl = SiteUtils.commo('/cu/login?returnUrl=' + returnUrl);
      location.href = loginUrl;
    },
    toMypage() {
      const myPageUrl = SiteUtils.commo('/cu/my_page');
      location.href = myPageUrl;
    },
    toCoupon() {
      const myCoupon = SiteUtils.commo('/ev/coupon_list');
      location.href = myCoupon;
    },
    toOrder() {
      const bsktUrl = SiteUtils.commo(
        '/cs/orddeliv/ord_deliv_list?selectDelivStatCd='
      );
      location.href = bsktUrl;
    },
    getDelivery() {
      const loginUrl = SiteUtils.commo('/cu/delivery_place_add');
      location.href = loginUrl;
    },
    goDeliverySelect() {
      const loginUrl = SiteUtils.commo('/cu/delivery_place_list');
      location.href = loginUrl;
    },
    goDeliveryTime() {
      let loginUrl;
      if ( this.cmmSteId === '1' ) {
        loginUrl = SiteUtils.freshmo('/md/delivery_time');
      } else if ( this.cmmSteId === '2' ) {
        loginUrl = SiteUtils.dalimo('/md/delivery_time');
      } else {
        loginUrl = SiteUtils.marketformo('/md/delivery_time');
      }
      location.href = loginUrl;
    },
    async getDeliveTimeInfo() {
      const deliveParam = {
        delivTypeCd: '01',
        supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD'),
      };
      const response = await ApiUtils.post('/fo/od/deliv-info/now-order-deliv-time',
                    deliveParam);
      if (response.data.success === true) {
        const deliveTime = response.data.data;
        const date = new Date();
        const toDay = DateUtils.format(date, 'YYYY-MM-DD');
        const delivDt = DateUtils.format(deliveTime.delivDt, 'YYYY-MM-DD');

        const toDayArray = toDay.split('-');
        const delivDtArray = delivDt.split('-');

        const toDayDate = new Date(
          toDayArray[0],
          Number(toDayArray[1]) - 1,
          toDayArray[2]
        );
        const delivDtDate = new Date(
          delivDtArray[0],
          Number(delivDtArray[1]) - 1,
          delivDtArray[2]
        );
        const getTime = '';
        const intTime = '';
        const strTime = intTime < 12 ? '오전 ' : '오후 ';
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = week[new Date(delivDt).getDay()];
        const betweenDt =
          (delivDtDate.getTime() - toDayDate.getTime()) / 1000 / 60 / 60 / 24;
        let toDayStr = '';
        switch (betweenDt) {
          case 0:
            if (intTime != '') {
              toDayStr = '오늘 ' + strTime;
            } else {
              toDayStr = '오늘 ';
            }
            break;
          case 1:
            if (intTime != '') {
              toDayStr = '내일 ' + strTime;
            } else {
              toDayStr = '내일 ';
            }
            break;
          default:
            toDayStr =
              delivDtArray[1] + '/' + delivDtArray[2] + '(' + dayOfWeek + ')';
            break;
        }
        this.toDayStr = toDayStr;
        this.deliveTime =
          this.getConversion(deliveTime.delivBeginTm) +
          ' ~ ' +
          this.getConversion(deliveTime.delivEndTm);
        this.dataInfo = this.toDayStr + this.deliveTime + '도착';
        this.$store.state.dp.sidebarDeliveTimeInfo.toDayStr = this.toDayStr;
        this.$store.state.dp.sidebarDeliveTimeInfo.deliveTime = this.deliveTime;
      }
    },
    getConversion(time) {
      let rStrTime = '';
      if (time != null && time.length == 4) {
        const rTime = time;
        rStrTime = rTime.substring(0, 2) + ':' + rTime.substring(2, 4);
      }
      return rStrTime;
    },
  },
};
</script>
<style scoped>
</style>

