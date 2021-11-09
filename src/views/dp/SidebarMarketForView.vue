<template>
  <!-- START : MARKET FOR. -->
  <section class="wrap-marcket" v-if="cmmSteId == '3'">
    <h2>MARKET FOR:</h2>
    <ul class="wrap-list-marcket" v-if="marketforList!=null">
      <li v-for="(list, index) in marketforList" :key="index">
        <gs-link :to="list.linkUrl" :target="getTarget(list.scrConTypeCd)">
          <figure>
            <img :src="getImg(list.ctnsPathNm)" :alt="list.imgAltTextCnts" />
          </figure>
          {{list.ctnsTitle}}
        </gs-link>
      </li>
    </ul>
  </section>
  <section class="wrap-marcket" v-else>
    <h2>MARKET FOR:</h2>
    <ul class="wrap-list-marcket" v-if="marketforList!=null">
      <li v-for="(list, index) in marketforList" :key="index">
        <a href="#" @click.prevent="chkAgent(list)">
          <figure>
            <img :src="getImg(list.bnrImgPathNm)" :alt="list.mallMoveBnrNm" />
          </figure>
          {{list.mallMoveBnrNm}}
        </a>
      </li>
    </ul>
  </section>
  <!-- END : MARKET FOR -->
</template>
<script>
import ItemTemplete from '@/common/ItemTemplete';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';

export default {
  name: 'SidebarMarketForView',
  data() {
    return {
      marketforList: null,
      dspConrId: this.$store.state.dp.markForConrId,
      cmmSteId: CookieUtils.getCmmSteId(),
    };
  },
  async created() {
    try {
      await this.$store.dispatch('getMenuDspMarketForInfo', '');
      if (this.countMarketForData > 0) {
      this.getData();
      }
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  computed: {
    countMarketForData() {
      if (this.$store.state.dp.menuDspMarketForList == undefined) {
        return 0;
      } else {
        return this.$store.state.dp.menuDspMarketForList.length;
      }
    },
  },
  watch: {
    countMarketForData(newCount, oldCount) {
      if (newCount > 0) {
       this.marketforList = this.$store.state.dp.menuDspMarketForList;
      }
    },
  },
  methods: {
    chkAgent(data) {
     let url = '';
      // 새벽배송 쿠키 초기화
      CookieUtils.setCookie('showDaybreak', 'N');
      // 01 PC / 02 모바일 / 03 GSfresh 앱
      if (data.mallMoveBnrId === '62' && this.nowMda == '03') {
        if (ContextUtils.getAgent() == "ios" && data.conUrl != null) {
          url = data.conUrl;
          // 랄라블라 앱스토어 이동
          setTimeout( function() {
            location.href='https://itunes.apple.com/kr/app/id1067742963';
          }, 1500);
        } else if (ContextUtils.getAgent() == "android" && data.linkUrl != null) {
          alert(data.linkUrl);
          url = data.linkUrl;
        } else {
          url = data.bnrImgLinkUrl;
        }
      } else {
        url = data.bnrImgLinkUrl;
      }
        location.href = url;
    },
    async getData() {
      const data = this.$store.state.dp.menuDspMarketForList;
      console.log('this.cmmSteId', this.cmmSteId);
      if (data != null) {
        if (this.cmmSteId == '3') {
           data
          .filter(x => x.dspConrId == process.env.VUE_APP_M4_CONR_SIDE)
          .map(value => {
            this.marketforList =
              value.rnftpStorConrSetInfoInq[0].rnftpStorTplConrCompoSbjInq[0].rnftpStorConrCntInfoInq;
          });
          return this.marketforList;
        } else {
          data
          .filter(x => x.dspConrId == this.dspConrId)
          .map(value => {
            this.marketforList =
              value.rnftpStorConrSetInfoInq[0].rnftpStorTplConrCompoSbjInq[0].rnftpStorConrCntInfoInq;
          });
          return this.marketforList;
        }
      }
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    getTarget(scrConTypeCd) {
      const conTypeCd = scrConTypeCd;
      if (conTypeCd == '01') {
        return '_blank';
      } else if (conTypeCd == '02') {
        return '_parent';
      } else if (conTypeCd == '03') {
        return '_self';
      } else if (conTypeCd == '04') {
        return '_top';
      }
    },
  },
  async mounted() {
    if (this.countMarketForData > 0) {
      this.getData();
    }
  },
};
</script>
<style scoped>
</style>
