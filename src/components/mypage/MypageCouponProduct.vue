<template>
  <!-- @상품목록 리스트 앱종료형 -->
<div>
  <div class="product list product-app-close" v-for="(list,i) in itemList" v-bind:key="i">
    <div class="item">
      <!-- START : 3. 썸네일 -->
      <div class="item-thumbnail">
        <a href="javascript://" @click="fnSite(list.itemId, itemMallList[i], list.delivTypeCd, list.storId, list.supplFirmCd)" class="item-link">
          <!-- : 품절 상품 시 -->
          <div class="sold-out" v-if="list.ofsYn == 'Y' || list.sellPosbQty == 0">
            <strong>품절</strong>
          </div>
          <figure class="identify">
            <img :src="getImg(list.itemImg)" :title="list.itemNm" v-if="list.itemImg!=null"/>
            <!-- : 썸네일 없을 경우 -->
            <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="list.itemNm" v-else-if="list.sellAgeRestrCd !='19' && list.itemImg === null || list.itemImg === ''" />
            <!-- : 성인본인인증이 필요한 경우 -->
            <img src="@/assets/images/img/img_product_identification.jpg" title="성인인증필요" :alt="list.itemNm" v-else-if="list.sellAgeRestrCd ==='19'" />
          </figure>
        </a>
      </div>
      <!-- END : 3. 썸네일 -->
      <div class="wrap-info">
        <dl class="info" title="상품정보">
          <dt>
            <!-- START : 6. 유형 -->
            <template v-if="$store.state.dp.daybreak">
              <span class="wrap-delivery-tag">
                <!-- span class="delivery-desc daybreak">2/24(월) 오전 7시 이전 도착</span -->
              </span>
            </template>
            <template v-else>
              <span class="wrap-delivery-tag">
                <!-- <span v-if="list.delivTypeCd == '02' && !(list.ssevntClasfCd == '02')" class="delivery-info">전국택배</span>
                <span v-if="list.delivTypeCd == '03' && !(list.ssevntClasfCd == '02')" class="delivery-info">업체택배</span> -->
                <span v-if="list.resvItemYn == 'Y'" class="delivery-info">예약배송</span>
                <span
                  v-if="list.resvItemYn == 'Y'"
                  class="delivery-desc"
                >{{getDay(list.itemStkotInstBeginDt)}} 부터 순차배송</span>
                <span
                  v-if="list.abrdDrctPurchItemYn == 'Y'"
                  class="delivery-info overseas"
                >해외배송</span>
                <span v-if="(list.delivTypeCd == '01' || list.delivTypeCd == '02') && list.ssevntClasfCd == '02'" class="delivery-info">위대한 빅세일</span>
                <span v-if="list.delivTypeCd == '03' && list.ssevntClasfCd == '02'" class="delivery-info">위대한 택배</span>
              </span>
            </template>
            <!-- END : 6. 유형 -->
            <!-- START : 7. MD소구문구(GS fresh), 브랜드명(달리살다) -->
            <p class="title-desc" v-if="list.itemPrStnCnts !== null">
              <span class="md">{{list.itemPrStnCnts}}</span>
            </p>
            <!-- END : 7. MD소구문구(GS fresh), 브랜드명(달리살다) -->
            <!-- START 8. 상품명 두 줄 -->
            <strong class="title">
              <span class="hidden">상품명</span>
              <em>{{list.itemNm}}</em>
            </strong>
            <!-- END 8. 상품명 -->
          </dt>
          <!-- START : 9. 가격정보 (GS fresh) -->
          <dd class="discount" v-if="list.bfrSellAmt!=list.sellAmt">
            <span class="hidden">할인율</span>
            <strong class="num">{{getDcRate(list.bfrSellAmt,list.sellAmt)}}</strong>%
          </dd>
          <dd class="list-price" v-if="list.bfrSellAmt > 0 && (list.dblePrcIndYn='Y') && (list.bfrSellAmt!=list.sellAmt)"><!-- : 할인가 일 경우만 노출 -->
            <span class="hidden">할인 적용 전 가격</span>
            <del class="price">{{comma(list.bfrSellAmt)}}</del>원
          </dd>
          <dd class="selling-price" v-if="list.bfrSellAmt > 0">
            <span class="hidden">할인 적용 후 가격</span>
            <strong class="price">{{comma(list.sellAmt)}}</strong>원
          </dd>
          <!-- END : 9. 가격정보 (GS fresh) -->
        </dl>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';
import ItemTemplete from '@/common/ItemTemplete';
export default {
  name: 'ProductListAppClose',
  components: {
  },
  props: {
    dayBreakProduct: { // 새벽배송만 나오는 항목 체크
      type: Boolean,
      default: false, // 기본은 hidden 상태
    },
    popup: Object,
  },
  data() {
    return {
      lists: [],
      param: '',
      itemList: [],
      itemMallList: [],
    };
  },
  methods: {
    comma: function(val) {
      return NumberUtils.toComma(val);
    },
    fnSite(val, mallId, delCd, storId, supplFirmCd) {
      if (delCd == "03") {
        console.log("업체택배_");
        const param = 'itemId='+val;
        const url = "/md/product_detail?"+ param + '&storId=' + storId + '&supplFirmCd=' + supplFirmCd + '&mallId=' + mallId;
        location.href = SiteUtils.to(mallId, url);
      } else {
        const param = 'itemId='+val;
        const url = "/md/product_detail?"+ param;
        location.href = SiteUtils.to(mallId, url);
      }
    },
    getDay(itemStkotInstBeginDt) {
      return ItemTemplete.getDay(itemStkotInstBeginDt);
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    getDcRate(bfrSellAmt, sellAmt) {
      return ItemTemplete.getDcRate(bfrSellAmt, sellAmt);
    },
  },
  mounted: async function() {
    await ApiUtils.get('/fo/ev/cpnprommgnt/use-possible-item-list', this.popup)
    .then(res => {
      if (res.data && res.data.success && res.data.data) {
        this.lists = res.data.data;
        if (this.lists != null && this.lists.length >0) {
          for (let i=0; i<this.lists.length; i++) {
            this.param += "&itemId="+this.lists[i].itemId;
            this.itemMallList[i] = this.lists[i].mallId;
          }
          if (this.param != '') {
            const pMallId = CookieUtils.getCookie('MALL_ID');
            const pStorId = CookieUtils.getCookie('STOR_ID');
            const pSupplFirmCd = CookieUtils.getCookie('SUPPL_FIRM_CD');
            const pCmmSteId = CookieUtils.getCmmSteId();// [202017P] 2021.03.11 Market For 커머스사이트ID 추가
            ApiUtils.get('/fo/md/itemaddinfomgnt/multi-item-list?mallId='+pMallId + '&storId='+pStorId+'&supplFirmCd='+pSupplFirmCd +'&cmmSteId='+pCmmSteId + this.param)
            .then(res => {
              if (res.data && res.data.success && res.data.data) {
                this.itemList = res.data.data;
              }
            })
            .catch(e => {
              this.$gsdialog.alert(e.response.data.statusMessage);
            });
          }
        }
      }
    })
    .catch(e => {
      this.$gsdialog.alert(e.response.data.statusMessage);
    });
  },
};
</script>
