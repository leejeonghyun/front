<template>
  <!-- START : 선물 메시지 -->
  <section class="section-area gift-message-card-mobile">
    <div class="sub-title">
      <h2>{{ messageTitle }}</h2>
    </div>
    <div class="mode-change">
      <p class="wrap-btn">
        <button type="button" value="1" class="btn-circle" @click="toggleBtn" :class="{active : this.messagecard.giftOrdSpCd === '1'}">귀여운</button>
        <button type="button" value="2" class="btn-circle" @click="toggleBtn" :class="{active : this.messagecard.giftOrdSpCd === '2'}">감성적인</button>
      </p>
    </div>
    <div class="write-gift-msg-mobile">
      <div class="insert-msg">
        <img :src="require('@/assets/images/img/'+messagecard.selectImgUrl)" :alt="messagecard.selectTxt" />
      </div>
      <div class="msg-cont">
        <div class="msg-txt">
          <div class="wrap-textarea">
            <textarea name="giftMsgCnts" id="giftMsgCnts" v-model="giftMsgCnts" cols="" rows="" :placeholder="placehoderTxt" title="선물 메세지 입력" @blur="giftMsgInfoEvent()"></textarea>
            <div class="align-right">
              <span class="hidden">현재 작성한 글자 수</span>
              <em>{{inpTxtLen}}</em>
              <span>/</span>
              <span class="hidden">최대 작성 글자 수</span>
              100
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- START : 귀여운 -->
    <div class="slide-img gift_card_cd1" v-show="this.messagecard.giftOrdSpCd === '1'">
      <swiper :options="swipeMsgImg">
        <swiper-slide v-for="(giftMsgImgInfo, idx) in getGiftMsgImglist('1', giftMsgImglist)" v-bind:key="giftMsgImgInfo.giftImgId">
          <div class="inner-img-slide" v-if="giftMsgImgInfo.giftOrdSpCd === '1'">
            <input type="radio" v-bind:id="'giftImgId'+ giftMsgImgInfo.giftOrdSpCd + idx" name="giftImgId"
            v-bind:value="giftMsgImgInfo.giftImgFilePathNm"
            v-bind:imgId="giftMsgImgInfo.giftImgId"
            @click="changeImage"
            v-bind:data-img-url="giftMsgImgInfo.giftImg"
            @blur="giftMsgInfoEvent()">
            <label v-bind:for="'giftImgId'+ giftMsgImgInfo.giftOrdSpCd + idx"><img v-bind:src="require('@/assets/images/img/'+giftMsgImgInfo.giftImgFileNm)" alt=""></label>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <!-- END : 귀여운 -->
    <!-- START : 감성적인 -->
    <div class="slide-img gift_card_cd2" v-show="this.messagecard.giftOrdSpCd === '2'">
      <swiper :options="swipeMsgImg">
        <swiper-slide v-for="(giftMsgImgInfo, idx) in getGiftMsgImglist('2', giftMsgImglist)" v-bind:key="giftMsgImgInfo.giftImgId">
          <div class="inner-img-slide" v-if="giftMsgImgInfo.giftOrdSpCd === '2'">
            <input type="radio" v-bind:id="'giftImgId'+ giftMsgImgInfo.giftOrdSpCd + idx" name="giftImgId"
            v-bind:value="giftMsgImgInfo.giftImgFilePathNm"
            v-bind:imgId="giftMsgImgInfo.giftImgId"
            @click="changeImage"
            v-bind:data-img-url="giftMsgImgInfo.giftImg"
            @blur="giftMsgInfoEvent()">
            <label v-bind:for="'giftImgId'+ giftMsgImgInfo.giftOrdSpCd + idx"><img v-bind:src="require('@/assets/images/img/'+giftMsgImgInfo.giftImgFileNm)" alt=""></label>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
  <!-- END : 선물 메시지 -->
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import ApiUtils from '@/common/ApiUtils';
import StringUtils from '@/common/StringUtils';
export default {
  name: "GiftMessageWrite",
  data() {
    return {
      messagecard: {
        giftOrdSpCd: '1', // 카드 카테고리 TODO 디비컬럼추가되어야함
        selectImgId: '1',
        selectImgUrl: 'img_message1_1.png', // 선택한 카드 이미지 URL
        selectTxt: '', // 선택한 카드 alt, 텍스트
        placehoderTxt: '선물과 함께 감동의 말을 전해보세요. \n메시지 전달을 원할 경우 100자 이내로 입력해 주세요.', // placeholder
      },
      placehoderTxt: this.messagePlaceholder,
      swipeMsgImg: {
        slidesPerView: 3,
        spaceBetween: 7,
      },
      giftMsgImglist: [],
      inpTxtLen: 0,
      giftMsgCnts: '',
      giftMsgInfo: {
        giftMsgCnts: '',
        giftImgId: '',
      },
    };
  },
  props: ['messageTitle', 'messagePlaceholder', 'selectType'],
  directives: {},
  mixins: [],
  components: {
    swiper,
    swiperSlide,
  },
  methods: {
    // 메시지카드 카테고리 선택
    toggleBtn(event) {
      const target = event.target;
      this.messagecard.giftOrdSpCd = target.value;
      this.setCardDefault();
    },
    setCardDefault() {
      const $category = document.querySelector('.gift_card_cd'+this.messagecard.giftOrdSpCd+'');
      const inputContents = $category.querySelectorAll('input');
      if (inputContents.length > 0) {
        for (let i = 0; i < inputContents.length; i++ ) {
          inputContents[i].checked = false;
        }
        inputContents[0].checked = true;
        this.messagecard.selectImgUrl = inputContents[0].value;
        this.messagecard.selectImgId = inputContents[0].attributes.imgid.value;
        this.messagecard.selectTxt = inputContents[0].nextSibling.childNodes[0].getAttribute('alt');
      }
    },
    setPlaceholder() {
      if (this.messagePlaceholder === undefined) {
        this.placehoderTxt = '선물과 함께 감동의 말을 전해보세요. \n메시지 전달을 원할 경우 100자 이내로 입력해 주세요.';
      } else {
        this.placehoderTxt = this.messagePlaceholder;
      }
    },
    changeImage(el) {
      const $target = event.target;
      this.messagecard.selectImgUrl = $target.value;
      this.messagecard.selectImgId = $target.attributes.imgid.value;
      this.messagecard.selectTxt = $target.nextSibling.childNodes[0].getAttribute('alt');
    },
    // 선물하기 메세지 목록 조회
    async searchGiftMsgImglist() {
      const result = await ApiUtils.get('/fo/od/giftMgnt/gift-cart-msg-list');
      this.giftMsgImglist = result.data.data.giftCartMsgList;
      // 선물 메세지에 보여줄 최초 이미지 로딩
      this.messagecard.selectImgUrl = this.giftMsgImglist[0].giftImgFilePathNm;
      this.messagecard.selectImgId = this.giftMsgImglist[0].giftImgId;
    },
    getGiftMsgImglist(gbn, list) {
      const giftImgList = [];
      for (let i=0; i < list.length; i++) {
        if (list[i].giftOrdSpCd === gbn) {
          giftImgList.push(list[i]);
        }
      }
      return giftImgList;
    },
    getByteLength(str) {
      if (StringUtils.getByteLength(str) < 100) {
        this.inpTxtLen = StringUtils.getByteLength(str);
      } else {
        this.giftMsgCnts = str.substr(0, 30);
        // console.log("this.giftMsgCnts : ", this.giftMsgCnts);
        this.inpTxtLen = StringUtils.getByteLength(this.giftMsgCnts);
      }
    },
    giftMsgInfoEvent() {
      this.giftMsgInfo.giftMsgCnts = this.giftMsgCnts;
      this.giftMsgInfo.giftImgId = this.messagecard.selectImgId;
      this.$emit('giftMsgInfoEvent', this.giftMsgInfo);
    }
  },
  watch: {
    giftMsgCnts(newVal) {
      const len = StringUtils.getByteLength(newVal);
      if (len < 100) {
        this.inpTxtLen = len;
      } else {
        let strLength = 0;
        let strTitle = "";
        let strPiece = "";

        for (let i = 0; i < newVal.length; i++) {
          let code = newVal.charCodeAt(i);
          const ch = newVal.substr(i, 1).toUpperCase();
          // 체크 하는 문자를 저장
          strPiece = newVal.substr(i, 1);
          code = parseInt(code);

          if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && ((code > 255) || (code < 0))) {
            strLength = strLength + 3; // UTF-8 3byte 로 계산
          } else {
            strLength = strLength + 1;
          }

          if (strLength>100) { // 제한 길이 확인
            break;
          } else {
            strTitle = strTitle+strPiece; // 제한길이 보다 작으면 자른 문자를 붙여준다.
          }
        }
        this.giftMsgCnts = strTitle;
        // console.log("this.giftMsgCnts : ", this.giftMsgCnts);
      }
    }
  },
  destroyed() {
  },
  mounted() {
    this.setPlaceholder();
    // 선물하기 메세지 목록 조회
    this.searchGiftMsgImglist();
  },
};
</script>
