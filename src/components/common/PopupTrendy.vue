<template>
  <!--  트렌디 레이어 팝업 만들기  -->
  <div
    id="modalTrendy"
    class="wrap-modal-trendy"
    role="dialog"
    aria-labelledby="dialog1Title"
    aria-modal="true"
  >
    <h2 id="dialog1Title" class="hidden">트렌드리스트</h2>
    <div class="wrap-slide-trendy">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(list, index) in trendyList" :key="index">
          <div class="inner">
            <a href="javascript:void(0);" @click="goCtg(list)">
              <figure class="wrap-img">
                <img v-lazy="getImg(list.itemImg)" :alt="list.itemNm" />
              </figure>
              <strong class="keyword">{{list.dspCtgNm}}</strong>
              <span class="ico-hashtag" v-if="list.ctnsTitle != null">{{list.ctnsTitle}}</span>
            </a>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <button class="btn-modal-close" @click="popupAction">닫기</button>
  </div>
</template>

<script>
import ItemTemplete from '@/common/ItemTemplete';
import LayPopupMixin from '@/mixins/LayerPopupMixin';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'PopupTrendy',
  mixins: [LayPopupMixin],
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      dspConrId: this.$store.state.dp.mainConrInfo.dspConrId_1028,
      trendyList: [],
      swiperOption: {
        slidesPerView: 'auto',
        freeMode: true,
        containerModifierClass: 'wrap-list-trendy ',
      },
    };
  },
  computed: {
    countTrendyData() {
      if (this.$store.state.dp.trendyList == undefined) {
        return 0;
      } else {
        return this.$store.state.dp.trendyList.length;
      }
    },
  },
  watch: {
    countTrendyData(newCount, oldCount) {
      if (newCount > 0) {
        this.getData();
      }
    },
  },
  methods: {
    goCtg(value) {
      this.$router.push({
        path: '/product',
        query: { dspCtgId: value.itemRepDspCtgId },
      });
    },
    popupAction() {
      this.$emit('popupEvent', 'modalTrendy');
      this.modalActiveEvent('modalTrendy');
    },
    getData() {
      const data = this.$store.state.dp.trendyList;

      if (data !== 0) {
        let tempRList;
        data.map(value => {
          let item = '';
          item = value.rdspCommConrSetInfo.map(
            list => list.rdspCommConrSbjInfo
          );
          tempRList = item;
        });
        tempRList.map(list => {
          if (list != null && list.length > 0) {
            let obj = {};
            list.map(item => {
              item.rdspCommConrCntInfo.map(value => {
                if (value.dspConrSbjCd == '01') {
                  obj = value;
                } else if (value.dspConrSbjCd == '05') {
                  obj.ctnsTitle = value.ctnsTitle;
                  obj.ctnsDesc = value.ctnsDesc;
                  obj.linkUrl = value.linkUrl;
                }
              });
            });
            if (!(Object.keys(obj).length == 0)) {
              this.trendyList.push(obj);
            }
          }
        });
      }
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
  },
  mounted() {
    this.modalActiveEvent('modalTrendy');
    if (this.countTrendyData > 0) {
      this.getData();
    }
  },
  updated() {
    /* this.scrollHeight(); */
  },
};
</script>

<style>
</style>
