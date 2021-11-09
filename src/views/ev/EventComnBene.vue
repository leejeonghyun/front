<!-- START : 쿠폰 -->
<template>
  <section>
    <!-- 쿠폰 -->
    <section class="event-cont event-coupon type1" v-if="isShow && eventInfo.eventGvwyList && eventInfo.eventGvwyList.length > 0 && couponList.length > 0">
      <div class="wrap-event-coupon" v-for="(item, index) in couponList" :key="`coupon_`+index">
        <div class="wrap-coupon type-detail white">
          <div>
          <p class="type" v-if="item.promDtlTypeCd != '304'">{{item.promDtlTypeCdNm}}</p>
          <p class="type" v-else>배송비</p>
          <p class="price" v-if="item.promDtlTypeCd != '304'">{{toComma(item.beneApplVal)}}<span class="unit">{{item.dcTypeCd == 'R' ? '%' : '원'}}</span></p> <!-- 숫자일 경우 -->
          <p class="text" v-else>무료배송</p><!-- 문자일 경우 -->
          </div>
        </div>
        <p class="usedtype">
          <span>{{replaceMallNm(item.applMalls)}}</span>
        </p>
        <ul class="list-info">
          <li class="list-bar color-gray"><template v-if="item.evntApplStandAmt > 0">{{toComma(item.evntApplStandAmt)}}원 이상 구매 시 </template><template v-if="item.maxDcAmt > 0">최대 {{toComma(item.maxDcAmt)}} 원 할인</template></li>
          <li class="list-bar color-gray" v-if="item.cpnValidDurSpCd === '02'">{{convertCpDateFormat(item.cpnValidDurEndDttm)}} 까지</li>
        </ul>
      </div>
    </section>
    <section class="event-cont event-reward type2" v-if="isShow && (pointList && pointList.length > 0 || rewardsList && rewardsList.length > 0)">
      <!-- 포인트 -->
      <div class="wrap-event-coupon type-reward" :style="rewardsStyle" v-for="(item, index) in rewardsList" :key="`rewards_`+index">
        <div class="cont">
          <img :src="require('@/assets/images/img/logo_thepop.png')" alt="THEPOP" />
          <div class="price">{{toComma(item.gvwyApplVal)}}<span class="unit">원</span></div>
          <p class="desc">{{convertDateFormat(item.gvwyValidEndDt)}}까지</p>
        </div>
      </div>
      <!-- 리워즈 -->
      <div class="wrap-event-coupon type-reward" :style="pointStyle" v-for="(item, index) in pointList" :key="`point_`+index">
        <div class="cont">
          <img :src="require('@/assets/images/img/logo_gspoint.png')" alt="GS&POINT" />
          <div class="price">{{toComma(item.gvwyApplVal)}}<span class="unit">원</span></div>
        </div>
      </div>
    </section>
  </section>
</template>
<!-- END : 쿠폰 -->

<script>
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  name: 'EventComnBene',
  components: {
  },
  props: {
    eventInfo: Object,
    isShow: Boolean,
  },
  data() {
    return {
      couponList: [],
      rewardsStyle: 'background: linear-gradient(129deg, #459efc 0%,#297bd1 54%,#0c56a4 91%)',
      pointStyle: 'background: linear-gradient(129deg, #3eb9b9 0%,#009898 54%,#047b7b 91%)',
    };
  },
  async created() {
  },
  methods: {
    toComma(x) {
      return NumberUtils.toComma(x);
    },
    // 쿠폰 목록 조회
    async retrieveEventCouponList () {
      await ApiUtils.get('/ev/event/coupon/' + this.$route.params.eventId)
      .then(res => {
        if (res.data && res.data.success && res.data.data) {
          this.couponList = res.data.data;
        }
      });
    },
    convertDateFormat(dt) {
      return DateUtils.format(dt, "YYYY.MM.DD");
    },
    convertCpDateFormat(dt) {
      return DateUtils.format(dt, "YYYY.MM.DD HH:mm");
    },
    replaceMallNm(data) {
      return data.replace(',', ' · ');
    }
  },
  computed: {
    pointList() {
      if (this.eventInfo && this.eventInfo.eventGvwyList) {
        return this.eventInfo.eventGvwyList.filter((info) => {
          return info.gvwyTypeCd == "2";
        });
      }
      return null;
    },
    rewardsList() {
      if (this.eventInfo && this.eventInfo.eventGvwyList) {
        return this.eventInfo.eventGvwyList.filter((info) => {
          return info.gvwyTypeCd == "3";
        });
      }
      return null;
    },
  },
  watch: {
    // 응모내역조회 결과 (사용자가 체크인한 날짜 조회)
    eventInfo: function () {
      if (this.eventInfo.eventGvwyList) {
          const couponItem = this.eventInfo.eventGvwyList.find((info) => {
          return info.gvwyTypeCd == "1";
        });
        if (couponItem) {
          this.retrieveEventCouponList();
        }
      }
    }
  },
  mounted() {

  },
};
</script>
<!-- DEPBOSFR-398 FO_전체배포(1차) -->
