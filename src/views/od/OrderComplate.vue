<!--
Design: views/od/SC-FO-PA-GS-MP-015
Pg id:
Uri:
-->
<template>
  <div id="popupOrderCompelete" class="wrap-full-popup active h100" role="dialog" aria-modal="true">
    <!-- : 실사용 소스 -->
    <!-- <div id="popupOrderCompelete" class="wrap-full-popup" role="dialog" aria-modal="true" :class="{active : this.modalActive.popupOrderCompelete}"> -->
    <div class="full-popup-body scroll-area">
      <div class="inner-full-popup">
        <section class="gift-receive-complete">
          <h1 class="hidden">결제 완료</h1>
          <section class="msg-complete order-complete">
            <h2 class="msg-complete-txt">주문이 완료되었습니다.</h2>
            <p class="msg-txt-info">이용해주셔서 감사합니다.<br>고객님의 주문내역을 확인해주세요.</p>
          </section>
          <section class="section-area">
            <dl class="order-info">
              <dt>주문번호</dt>
              <dd>{{ordInfo.ordId}}</dd>
            </dl>
          </section>
          <!-- START : 배송지 -->
          <section class="section-area" v-if="ordTypeCd !== '20'">
            <div class="sub-title">
              <h2>배송지</h2>
            </div>
            <div class="sub-inner-box">
              <div class="receive-delivery-info" v-for="ordFinDlvpInfoInfo in ordFinDlvpInfoList" v-bind:key="ordFinDlvpInfoInfo.delivId">
                <div class="my-address">
                  <p>{{ordFinDlvpInfoInfo.adrsNm}} [{{ordFinDlvpInfoInfo.dlvpNm}}]</p>
                  <p><span class="code">{{ordFinDlvpInfoInfo.zipcd}}</span> {{ordFinDlvpInfoInfo.adrsStnmAddr}} {{ordFinDlvpInfoInfo.adrsStnmDtlAddr}}</p>
                </div>
              </div>
            </div>
          </section>
          <!-- END : 배송지 -->
          <!-- START : 최종 결제금액 -->
          <section class="section-area">
            <div class="sub-title send-total-price">
              <h2>최종결제금액 <span class="price"><strong>{{numToComma(ordInfo.lastTdrAmt)}}</strong>원</span></h2>
            </div>
            <div class="sub-inner-box">
              <ul class="price-list">
                <li>총 상품금액 <span class="price">{{numToComma(ordInfo.totItemAmt)}}원</span></li>
                <li>총 할인 금액 <span class="price red">{{numToCommaDc(ordInfo.totDcAmt)}}원</span></li>
                <li>총 배송비 <span class="price">{{numToComma(ordInfo.totDlfee)}}원</span></li>
              </ul>
              <p class="txt-point">배송 완료 후, GS&amp;POINT적립 <span class="point">{{numToComma(itemOrdPntSavgAmt)}}P</span></p>
            </div>
          </section>
          <!-- END : 최종 결제금액 -->
          <!-- START : 결제 수단 -->
          <section class="section-area">
            <div class="sub-title">
              <h2>결제수단</h2>
            </div>
            <dl class="sub-inner-box detail-list" v-for="(ordFinTdrMeansInfoInfo, idx) in ordFinTdrMeansInfoList" v-bind:key="ordFinTdrMeansInfoInfo.tdrMeansDtlCd">
              <dt v-if="idx === 0">{{ordFinTdrMeansInfoInfo.fstRegDttm}}</dt>
              <dd>
                  <span v-if="idx != 0">+ </span>
                  {{ordFinTdrMeansInfoInfo.tdrMeansNm}}<span v-if="ordFinTdrMeansInfoInfo.tdrMeansCd === '02'">({{ordFinTdrMeansInfoInfo.pytcCardNm}}/{{ordFinTdrMeansInfoInfo.ccardInstlMths!='0'?ordFinTdrMeansInfoInfo.ccardInstlMths+'개월':'일시불'}})</span> {{numToComma(ordFinTdrMeansInfoInfo.tdrAmt)}}
                  <span v-if="ordFinTdrMeansInfoInfo.tdrMeansCd === '06'">P</span> <!-- GS&POINT -->
                  <span v-else-if="ordFinTdrMeansInfoInfo.tdrMeansCd === '13'">점</span> <!-- THE POP 리워즈 -->
                  <span v-else-if="ordFinTdrMeansInfoInfo.tdrMeansCd === '15'">원</span> <!-- 해피머니상품권 -->
                  <span v-else-if="ordFinTdrMeansInfoInfo.tdrMeansCd === '16'">원</span> <!-- 도서문화상품권 -->
                  <span v-else>원</span>
                </dd>
              <!-- <dd>tdrMeansNm 1,000P</dd>
              <dd>+ THE POP리워즈 500점</dd>
              <dd>+ 해피머니상품권 10,000원</dd>
              <dd>+ 신용카드(BC카드/일시불) 16,500원</dd> -->
            </dl>
          </section>
          <!-- END : 결제 수단 -->
          <!-- START : 유의사항 -->
          <section class="section-area" v-show="dawnDelivFlag">
            <div class="sub-inner-box">
              <dl class="order-caution">
                <dt class="ico-alert">새벽배송 유의사항</dt>
                <dd class="ico-alert2">새벽배송 박스와 받으신 포장재를 다음 주문 시 배달 지정 장소에 놓아 주시면 저희가 회수해 가겠습니다.</dd>
              </dl>
            </div>
          </section>
          <!-- END : 유의사항 -->
          <!-- START : 하단 버튼 -->
          <div class="bottom-btn-area">
            <button type="button" class="btn-md btn-bg darkgray" @click="popupCloseAction">주문내역확인</button>
            <button type="button" class="btn-md btn-bg lightgreen" @click="goShop">쇼핑하러 가기</button>
          </div>
          <!-- START : 하단 버튼 -->
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ApiUtils from '@/common/ApiUtils';
import NumberUtils from '@/common/NumberUtils';
import CookieUtils from '@/common/CookieUtils';
import SiteUtils from '@/common/SiteUtils';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import Tracker from '@/common/Tracker';
import ShareUtils from '@/common/ShareUtils';
import OrderMsg from '@/components/order/OrderMsg'; // 주문 메세지항목
import LoginUtils from '@/common/LoginUtils';

export default {
  props: {
    ordId: String,
  },
  name: "PopupOrderCompelete",
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '결제 완료 < 주문결제 < %s',
    meta: [
      {
        property: 'aa:page',
        content: '주문완료',
      },
    ],
  },
  mixins: [LayerPopupMixin],
  data() {
    return {
      ordInfo: {
        ordId: '',
        lastTdrAmt: '',
        totItemAmt: '',
        totDcAmt: '',
        totDlfee: '',
        gsPntSavgAmt: '',
      },
      ordTypeCd: '10',
      ordFinDlvpInfoList: null,
      ordFinTdrMeansInfoList: null,
      dawnDelivFlag: false,
      itemOrdPntSavgAmt: 0, // 멤버심적립금액
      loginYn: LoginUtils.isLogin(),
    };
  },
  components: {
  },
  watch: {
    ordTypeCd: function() {
      this.giftOrderSend();
    }
  },
  methods: {
    popupCloseAction() {
      // this.$emit('popupEvent', 'popupOrderCompelete');
      this.$router.push('/cs/orddeliv/ord_deliv_dtl/' + this.ordId); // 주문 상세 화면으로 이동
    },
    async srchOrdFin() {
      const params = {};
      params.ordId = this.ordId;
      const response = await ApiUtils.post('/fo/od/ordfinmgnt/order-finish', JSON.stringify(params));
      // console.log('response.data.data : ', response.data.data);
      this.ordInfo = response.data.data;
      this.ordTypeCd = this.ordInfo.tbOdOrdDtlDto.ordTypeCd;
      console.log(this.ordInfo);
      this.ordFinDlvpInfoList = response.data.data.ordFinDlvpInfoList;
      this.ordFinTdrMeansInfoList = response.data.data.ordFinTdrMeansInfoList;
      if (this.ordFinDlvpInfoList.findIndex(item=>item.delivTypeCd === '04') !== -1) {
        this.dawnDelivFlag = true;
      }
      if (this.ordFinDlvpInfoList) {
        let delivAdrs = '';
        for (let i = 0; i < this.ordFinDlvpInfoList.length; i++) {
          const dlvpInfo = this.ordFinDlvpInfoList[i];
          if (i === 0) {
            delivAdrs = dlvpInfo.adrsNm + dlvpInfo.dlvpNm + dlvpInfo.zipcd + dlvpInfo.adrsStnmAddr + dlvpInfo.adrsDtlAddr;
          } else {
            if (delivAdrs == dlvpInfo.adrsNm + dlvpInfo.dlvpNm + dlvpInfo.zipcd + dlvpInfo.adrsStnmAddr + dlvpInfo.adrsDtlAddr) {
              this.ordFinDlvpInfoList.splice(i, 1);
              i = i - 1;
            }
          }
        }
      }
    },
    numToCommaDc(dcAmt) {
      let temp = 0;
      if (dcAmt != "0") {
        temp = "-"+this.numToComma(dcAmt);
      }
      return temp;
    },
    numToComma(amt) {
      let temp = 0;
      if (amt != '') {
        temp = NumberUtils.toComma(amt);
      }
      return temp;
    },
    goShop() {
      // location.href = SiteUtils.to(CookieUtils.getMallId(), '/');
      const homeCode = 'fr_' + CookieUtils.getMallId() + '_' + CookieUtils.getMdaType();
      location.href = CookieUtils.getDomain(homeCode);
    },
    async retrievePntSavgRtInfo() {
      const iOrderRequestInputDto = {
        ordId: this.ordId
      };
      const response = await ApiUtils.get('/fo/od/ordsmgnt/ord-pntSavg-rate', iOrderRequestInputDto);
      this.itemOrdPntSavgAmt = response.data.data.gsPntSavg;
    },
    shareKa() {
        const snsUrl = CookieUtils.getDomain('cm', CookieUtils.getMallId()) + '/od/gift_rcv_dlv/' + this.ordId;
        const prodImg = "http://k.kakaocdn.net/dn/c4gG8s/btqDCbcEsU7/vDCTKRfId6jGFPoqy55QO1/kakaolink40_original.jpg"; // TODO
        const title = '선물이 도착했어요.'; // TODO
        const shareText = "제품명"; // TODO
        ShareUtils.shareKakaoTalk(snsUrl, shareText, prodImg, title, null);
    },
    giftOrderSend() {
      if (this.ordTypeCd === '20') {
        this.$gsdialog.confirm(OrderMsg.completeOrd, {html: true}).then(dialog =>{
          this.shareKa();
        });
      }
    }
  },
  mounted() {
    ShareUtils.init();
    this.srchOrdFin();
    this.retrievePntSavgRtInfo();
  }
};
</script>
