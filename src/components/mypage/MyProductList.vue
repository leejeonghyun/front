<template>
  <!-- START : list -->
  <li>
    <dl>
      <dt>
        <p class="tit">{{itemRow.itemNm}}</p>
      </dt>
      <dd class="thumb">
        <a href="#">
          <figure>
          <img :src="getItemImg(itemRow.itemImg)" :alt="itemRow.itemNm" @error="replaceByDefault" v-if="isNotEmpty(itemRow.itemImg)"/>
          <img src="@/assets/images/img/img_product_nothumb.jpg" title="GSFresh 로고" :alt="itemRow.itemNm" v-else/>
          </figure>
        </a>
      </dd>
      <dd class="option">
        <p class="option-info">옵션 : {{ itemRow.optVal }}</p>
      </dd>
      <dd class="count">
        <p class="option-info">수량 : {{ comma(itemRow.ordQty) }}</p>
      </dd>
      <dd class="shop">{{ itemRow.mallNm }}</dd>
      <dd class="list-price" aria-label="정상가격">
        <del>{{ comma(itemRow.bfrSalesAmt) }}</del>원
      </dd>
      <dd class="sale-price" aria-label="판매가격">
        <span class="number-sale-price">{{ comma(itemRow.salesAmt) }}</span>
        <span class="unit-won">원</span>
      </dd>
    </dl>
    <!-- START : 심플리쿡 옵션 있을 경우 TODO-->
    <!--
          <div class="simplycook-option">
      <dl>
        <dt>
          <p class="tit">당면 사리</p>
        </dt>
        <dd class="option-number txt">수량: 1개</dd>
        <dd class="sale-price">
          <span class="number-sale-price" aria-label="판매가격">500</span>
          <span class="unit-won">원</span>
        </dd>
      </dl>
      <dl>
        <dt>
          <p class="tit">시금치수제비</p>
        </dt>
        <dd class="option-number txt">수량: 1개</dd>
        <dd class="sale-price">
          <span class="number-sale-price" aria-label="판매가격">1,000</span>
          <span class="unit-won">원</span>
        </dd>
        <dd><button type="button" class="btn-del"><span class="hidden">옵션 삭제</span></button></dd>
      </dl>
    </div>
    -->
    <!--===================================
    심플리쿡 (checkbox 있는 경우)
    ====================================-->
        <template v-if="itemRow.subItemList != null && itemRow.subItemList.length > 0">
          <div class="simplycook-option"  v-if="itemRow.spckItemYn == 'Y'" >
                <template v-for="(subItemRow, index) in itemRow.subItemList">
                    <dl :key="index">
                      <dt>
                        <p class="tit"><label :for="'delvItem_chk_' + delivTypeRow.orgDelivTypeCd + '_' + itemRow.itemKey + '_' + subItemRow.itemKey">{{ subItemRow.itemNm }}</label></p>
                      </dt>
                      <dd class="option-number txt">수량 {{ comma(subItemRow.ordQty) }}</dd>
                      <dd class="sale-price">
                        <span class="number-sale-price" aria-label="판매가격">{{ comma(subItemRow.salesAmt) }}</span>
                        <span class="unit-won">원</span>
                      </dd>
                    </dl>
                </template>
          </div>
              <!--===================================
              심플리쿡 외
              ====================================-->
            <div class="simplycook-option" v-if="itemRow.spckItemYn != 'Y'" >
                <template v-for="(subItemRow, index) in itemRow.subItemList">
                    <!--===================================
                    증정
                    ====================================-->
                  <template v-if="subItemRow.presItemYn == 'Y'">
                    <dl :key="index">
                      <dt>
                        <p class="tit"><label :for="'delvItem_chk_' + delivTypeRow.orgDelivTypeCd + '_' + itemRow.itemKey + '_' + subItemRow.itemKey">{{ subItemRow.itemNm }}</label></p>
                      </dt>
                      <dd class="option-number txt">수량 {{ comma(subItemRow.ordQty) }}</dd>
                      <dd class="sale-price">
                        <span class="number-sale-price" aria-label="판매가격">{{ comma(subItemRow.salesAmt) }}</span>
                        <span class="unit-won">원</span>
                      </dd>
                    </dl>
                  </template>
                </template>
          </div>
            <!--===================================
            패키지
            ====================================-->
            <!--  <div class="simplycook-option"  v-if="itemRow.spckItemYn == 'Y'" > -->
                <template v-if="subItemRow.presItemYn == 'Y'">
                    <dl>
                      <dt>
                        <p class="tit"><label :for="'delvItem_chk_' + delivTypeRow.orgDelivTypeCd + '_' + itemRow.itemKey + '_' + subItemRow.itemKey">{{ subItemRow.itemNm }}</label></p>
                      </dt>
                      <dd class="option-number txt">수량 {{ comma(subItemRow.ordQty) }}</dd>
                      <dd class="sale-price">
                        <span class="number-sale-price" aria-label="판매가격">{{ comma(subItemRow.salesAmt) }}</span>
                        <span class="unit-won">원</span>
                      </dd>
                    </dl>
                </template>
           <!--  </div>  -->
        </template>

    <!-- END : 심플리쿡 옵션 있을 경우 -->
  </li>
  <!-- END : list -->
</template>
<script>
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import ApiUtils from '@/common/ApiUtils';
import ImgUtils from '@/common/ImgUtils';
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
export default {
  name: "MyProductList",
  props: ['itemRow'],
  data() {
    return {
    };
  },
  mixins: [],
  components: {
  },
  methods: {
    getItemImg(url) {
      let path = '';
      try {
        url = url.replace("{SIZE}", 300); // 임시로 사이즈 변경함
        path = ImgUtils.path(url);
      } catch (e) {
        path = '@/assets/images/img/img_product_nothumb.jpg';
      }
      return path;
    },
    comma(price) {
      const temp = NumberUtils.toComma(price);
      return temp;
    },
    isEmpty(x) {
      const temp = StringUtils.isEmpty(x);
      return temp;
    },
    isNotEmpty(x) {
      return !this.isEmpty(x);
    },
    replaceByDefault(e) {
      e.target.src = imgProductNothumb;
    },
  },
  mounted() {
  },
};
</script>
