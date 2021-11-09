<!-- 4월수정 START : 기획 & 디자인 전체적인 수정으로 마크업 전체 변경 -->
<template>
  <!-- START : 리스트 아이템 -->
  <div class="gift-item-details">
    <gs-link :to="detail()" class="wrap-image-state">
      <figure>
        <img
          :src="getItemImg(info.itemImageUrl)"
          :alt="info.itemNm"
          @error="replaceByDefault"
          v-if="isNotEmpty(info.itemImageUrl)"
        />
      </figure>
      <span class="state empty-delivery-info" v-if="info.stat_process === 1">배송정보미입력</span>
      <span class="state" v-if="info.stat_process === 2">선물수락</span>
      <span class="state" v-if="info.stat_process === 7">자동취소</span>
      <span class="state delivery-ing" v-if="info.stat_process === 4">배송중</span>
      <span class="state" v-if="info.stat_process === 5">배송완료</span>
      <span class="state" v-if="info.stat_process === 6">주문취소</span>
      <!-- <span class="state product-prepare" v-if="mode === true">{{info.giftTdrDelivStatNm}}</span>
      <span class="state product-prepare" v-if="mode === false">{{info.giftRcptDelivStatNm}}</span>-->
    </gs-link>

    <div class="details-cont" v-if="mode === 1">
      <!-- 받은 선물  -->
      <div class="inner-details-cont">
        <gs-link :to="detail()" class="details-cont-link">
          <span class="date">{{info.ordDt}}</span>
          <span class="from-name" v-if="mode === 1">from. {{info.giftTdrCmmMbrNm}}</span>
          <p class="product-name">
            <em>{{info.itemNm}}</em>
          </p>
        </gs-link>
      </div>
      <div class="btn-area-resend" v-if="info.stat_process === 4">
        <button type="type" class="btn-resend" @click="popupAction">배송조회</button>
      </div>
    </div>
    <div class="details-cont" v-if="mode === 2">
      <!-- 보낸 선물  -->
      <div class="inner-details-cont">
        <gs-link :to="detail()" class="details-cont-link">
          <span class="date">{{info.ordDt}}</span>
          <span class="to-name" v-if="mode === 2">to. {{info.giftRcptCmmMbrNm}}</span>
          <p class="product-name">
            <em>{{info.itemNm}}</em>
          </p>
        </gs-link>
        <!-- START : 배송정보 미입력일 경우 노출 -->
        <div v-if="info.stat_process === 1" class="btn-area-resend">
          <p>배송정보가 입력되지 않았어요</p>
          <button type="type" class="btn-resend" @click="sendMessage">메시지 재전송</button>
        </div>
        <!-- END : 배송정보 미입력일 경우 노출 -->
      </div>
    </div>
    <button type="button" class="btn-close-item" @click="delItem(info.ordId)">
      <span class="hidden">닫기</span>
    </button>
  </div>
  <!-- END : 리스트 아이템 -->
</template>
<script>
import ApiUtils from '@/common/ApiUtils';
import DateUtils from '@/common/DateUtils';
import NumberUtils from '@/common/NumberUtils';
import StringUtils from '@/common/StringUtils';
import ImgUtils from '@/common/ImgUtils';

export default {
  name: 'ReceivedSentGift',
  props: ['info', 'mode'],
  data() {
    return {
      // stateGift: state,
      // acceptGift: accept,
    };
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupTrackingShipping', this.info);
    },
    detail() {
      if (this.mode == 1) {
        return '/cu/received_gift_detail/' + this.info.ordId;
      } else {
        return '/cu/sent_gift_detail/' + this.info.ordId;
      }
    },
    delItem: async function(ordId) {
      const $this = this;
      this.$gsdialog
        .confirm('선택한 선물을 삭제하시겠습니까?')
        .then(function() {
          // todo 삭제
          const OrdGiftInqInputDto = {
            ordId: ordId,
            ordGiftInqType: $this.mode == 1 ? '1' : '2',
          };
          ApiUtils.post(
            '/fo/cu/mypgmgnt/order-gift-show-status',
            OrdGiftInqInputDto
          ).then(function() {
            $this.$emit('search', 1);
          });
        })
        .catch(function(err) {});
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
    getItemImg(url) {
      let path = '';
      try {
        url = url.replace('{SIZE}', 300); // 임시로 사이즈 변경함
        path = ImgUtils.path(url);
      } catch (e) {
        path = '@/assets/images/img/img_product_nothumb.jpg';
      }
      return path;
    },
    sendMessage() {
      this.$emit('sendMessage', this.info);
    },
  },
  mounted() {},
};
</script>
<!-- 4월수정 END : 기획 & 디자인 전체적인 수정으로 마크업 전체 변경 -->
