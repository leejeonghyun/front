<!--
views/od/SC-FO-OD-GS-MP-030
-->
<template>
    <!-- START : 배송지 목록 레이어 -->
    <div id="popupMutiAddrList" class="wrap-layer addr-layer" role="dialog" aria-labelledby="popupMutiAddrList" aria-modal="true" :class="[{active : this.modalActive.popupMutiAddrList}, siteClass]">
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-bottom-fixed">
        <div class="title">
          <h3 class="left">배송지 목록</h3>
          <p class="btn-right"><a href="javascript://" class="btn-border btn-small" @click="goMbrDlvpAdd">새 배송지추가</a></p>
        </div>
        <p class="box-alert color-gray"><strong class="point">최대 10개까지 배송지 선택이 가능합니다.</strong><br>배송지에 따라 상품의 행사/재고 상태가 변경될 수 있습니다.</p>
        <div class="scroll-area">
          <ul class="addr-list inner-box">
            <li v-for="mbrDlvp in mbrDlvpList" v-bind:key="mbrDlvp.mbrDlvpSeqno">
              <p class="inp-chk bg">
                <input type="checkbox" name="addrList" :id="`${'addr' + mbrDlvp.mbrDlvpSeqno}`" v-model="mbrDlvp.chk">
                <label :for="`${'addr' + mbrDlvp.mbrDlvpSeqno}`">
                  <span class="name">
                    <strong>{{mbrDlvp.encAdrsNm}}</strong>[{{mbrDlvp.dlvpNm}}]
                  <span class="default" v-if="mbrDlvp.baseDlvpYn === 'Y'">기본배송지</span>
                  </span>
                </label>
              </p>
              <p class="addr-txt"><span class="code">{{mbrDlvp.zipCd}}</span> {{mbrDlvp.encStnmBaseAddr}} {{mbrDlvp.encStnmDtlAddr}}</p>
            </li>
          </ul>
        </div>
        <div class="wrap-btn">
          <button type="button" class="btn-lg btn-bg lightgreen" @click="popupCloseAction">선택</button>
        </div>
        <button class="btn-layer-close" @click="popupAction">
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
    <!-- END : 배송지 목록 레이어 -->
</template>

<script>
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';
export default {
  name: "PoupSelectAddress",
  props: {
    bsktIds: Array,
    type: String,
  },
  data() {
    return {
      mbrDlvpList: {},
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mixins: [LayerPopupMixin],
  components: {
  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'popupMutiAddrList');
      // this.modalActiveEvent('popupMutiAddrList');
    },
    async popupCloseAction() {
      const multiDelivBsktTemp = JSON.parse(localStorage.getItem('multiDelivBskt'));
      const mbrDlvpList = [];
      let selectedCnt = 0;
      let msg = '';
      console.log(multiDelivBsktTemp);
      if (multiDelivBsktTemp) {
        selectedCnt = multiDelivBsktTemp.mbrDlvpList.length;
      }
      this.mbrDlvpList.forEach(function (mbrDlvp) {
        if (mbrDlvp.chk) {
          if (multiDelivBsktTemp) {
            for (let idx=0; idx<multiDelivBsktTemp.mbrDlvpList.length; idx++) {
              if (mbrDlvp.mbrDlvpSeqno === multiDelivBsktTemp.mbrDlvpList[idx].mbrDlvpSeqno) {
                msg = '이미 선택한 배송지 입니다.';
                break;
              }
            }
          }
          mbrDlvpList.push(mbrDlvp);
        }
      });

      if (msg !== '') {
        alert(msg);
        return;
      }

      if (mbrDlvpList.length === 0) {
        alert('배송지를 1개 이상 선택해주세요.');
        return;
      } else if (mbrDlvpList.length > (10 - selectedCnt)) {
        alert('최대 10개까지 배송지 선택이 가능합니다.');
        return;
      }

      const iBsktPut = {};

      iBsktPut.bsktIds = this.bsktIds;
      iBsktPut.mbrDlvpList = mbrDlvpList;
      iBsktPut.mallId = CookieUtils.getMallId();

      const result = await ApiUtils.post('/fo/od/bsktmgnt/multi-deliv-basket-item', iBsktPut);

      if (result.data.success) {
        console.log(result.data.data);
        const multiDelivBskt = result.data.data;
        localStorage.removeItem('multiDelivBskt');
        if (multiDelivBsktTemp) {
          for (let idx=0; idx<multiDelivBskt.mbrDlvpList.length; idx++) {
            multiDelivBsktTemp.mbrDlvpList.push(multiDelivBskt.mbrDlvpList[idx]);
          }
          localStorage.setItem('multiDelivBskt', JSON.stringify(multiDelivBsktTemp));
          this.popupAction();
          this.$emit('refreshBskt');
        } else {
          localStorage.setItem('multiDelivBskt', JSON.stringify(multiDelivBskt));
          this.popupAction();
          this.$router.push({name: 'multiDelivBskt'});
        }
      }
    },
    goMbrDlvpAdd() {
      localStorage.setItem('returnUrl', '/od/bskt');
      this.$router.push('/cu/delivery_place_add');
    },
  },
  async mounted() {
    try {
      this.modalActiveEvent('popupMutiAddrList');
    } catch (e) {
    };

    const result2 = await ApiUtils.get('/fo/od/bsktmgnt/delivery-area');
    this.mbrDlvpList = result2.data.data;
    if (this.mbrDlvpList) {
      this.mbrDlvpList.forEach(function (mbrDlvp) {
        if (mbrDlvp.baseDlvpYn === 'Y') {
          mbrDlvp.chk = false;
        } else {
          mbrDlvp.chk = false;
        }
      });
    }
  },
  destroyed() {
    // this.$emit('popupEvent', 'popupMutiAddrList');
  }
};
</script>
