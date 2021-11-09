<template>
  <div class="info-product" v-bind:class="[siteClass]">
    <div class="info-product-top">
      <div class="inp-chk bg">
        <input
          type="checkbox"
          :id="delivRow.ordId + '_' + delivRow.delivTypeCd"
          v-model="delivRow.chk"
          @click="delivTypeClickVali($event, delivRow)"
          @change="delivTypeChk(delivRow)"
        />
        <label :for="delivRow.ordId + '_' + delivRow.delivTypeCd">
          {{delivRow.delivTypeNm}}
          <span style="display:none;">{{checkedCount}}</span>
        </label>
      </div>
    </div>
    <ul class="list-product">
      <li v-for="(ordItem, idx) in delivRow.itemList" :key="idx" :ordItem="ordItem">
        <div class="comp-product">
          <div class="inp-chk">
            <input
              type="checkbox"
              v-model="ordItem.chk"
              :id="ordItem.ordItemSeqno"
              @click="itemClickVali($event, ordItem, delivRow)"
              @change="itemChk(ordItem, delivRow)"
            />
            <label>
              <span class="hidden">상품선택</span>
            </label>
          </div>
          <div class="thumb">
            <figure>
              <img
                :src="getItemImg(ordItem.itemImg)"
                :alt="ordItem.itemNm"
                @error="replaceByDefault"
                v-if="isNotEmpty(ordItem.itemImg)"
              />
              <img
                src="@/assets/images/img/img_product_nothumb.jpg"
                title="GSFresh 로고"
                :alt="ordItem.itemNm"
                v-else
              />
            </figure>
          </div>
          <div class="text">
            <p class="brand">{{ordItem.storNm}}</p>
            <p class="name">{{ordItem.itemNm}}*{{ordItem.itemOrdQty}}개</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import store from '@/store/index';
import ImgUtils from '@/common/ImgUtils';
import StringUtils from '@/common/StringUtils';
import imgProductNothumb from '@/assets/images/img/img_product_nothumb.jpg';
import CookieUtils from '@/common/CookieUtils';
export default {
  components: {},
  methods: {
    delivTypeClickVali(evt, delivRow) {
      if (!this.isEmpty(this.$store.state.cs.ordId) && !this.isEmpty(this.$store.state.cs.delivTypeCd)) {
        if (this.isNotEmpty(this.$store.state.cs.ordId) && delivRow.ordId != this.$store.state.cs.ordId) {
          this.$gsdialog.alert('선택하신 상품은 주문이 달라서<br> 1:1 문의를 같이 접수할 수 없습니다.', { html: true });
          evt.preventDefault();
          return;
        }
        if (this.isNotEmpty(this.$store.state.cs.delivTypeCd) && delivRow.delivTypeCd != this.$store.state.cs.delivTypeCd) {
          this.$gsdialog.alert('선택하신 상품은 배송방법이 달라서<br> 1:1 문의를 같이 접수할 수 없습니다.', { html: true });
          evt.preventDefault();
          return;
        }
      }
      const supplFirmList = [];
      let supplFirmCd = "";
      delivRow.itemList.forEach(item => {
      // console.log("supplFirmCd : " + supplFirmCd);
        if (supplFirmCd != item.supplFirmCd) {
          supplFirmList.push(item.supplFirmCd);
          supplFirmCd = item.supplFirmCd;
        }
      });
      if (supplFirmList.length > 1) {
        this.$gsdialog.alert('선택하신 상품은 공급업체가 달라서<br> 1:1 문의를 같이 접수할 수 없습니다.', { html: true });
        evt.preventDefault();
        return;
      }
    },
    itemClickVali(evt, ordItem, delivRow) {
        // console.log("ordItem.ordId" + ordItem.ordId);
        if (this.isNotEmpty(this.$store.state.cs.ordId) && delivRow.ordId != this.$store.state.cs.ordId && ordItem.ordId != this.$store.state.cs.ordId) {
          this.$gsdialog.alert('선택하신 상품은 주문이 달라서<br> 1:1 문의를 같이 접수할 수 없습니다.', { html: true });
          evt.preventDefault();
          return;
        }
        if (this.isNotEmpty(this.$store.state.cs.delivTypeCd) && delivRow.delivTypeCd != this.$store.state.cs.delivTypeCd) {
          this.$gsdialog.alert('선택하신 상품은 배송방법이 달라서<br> 1:1 문의를 같이 접수할 수 없습니다.', { html: true });
          evt.preventDefault();
          return;
        }
        // 아이템 클릭
        if (this.isNotEmpty(this.$store.state.cs.supplFirmCd) && !this.isEmpty(this.$store.state.cs.supplFirmCd)) {
          if (this.$store.state.cs.supplFirmCd != ordItem.supplFirmCd) {
            this.$gsdialog.alert('선택하신 상품은 공급업체가 달라서<br> 1:1 문의를 같이 접수할 수 없습니다.', { html: true });
            evt.preventDefault();
            return;
          }
        }
      // }
    },
    // 배송유형 체크
    delivTypeChk(delivRow) {
      this.checkedCount = 0;
      delivRow.itemList.forEach(item => {
        item.chk = delivRow.chk;
        // 체크시
        if (delivRow.chk) {
          // 값 셋팅
          this.$store.state.cs.ordId = delivRow.ordId;
          this.$store.state.cs.delivTypeCd = delivRow.delivTypeCd;
          this.checkedCount++;
        } else {
          // 값 리셋(supplFirmCd도 필요)
          this.$store.state.cs.ordId = null;
          this.$store.state.cs.delivTypeCd = null;
          this.$store.state.cs.supplFirmCd = null;
          this.checkedCount = 0;
        }
      });
    },
    // 주문상품 체크
    itemChk(ordItem, delivRow) {
      let chkRow = 0;
      delivRow.itemList.forEach(item => {
        if (item.chk) {
          this.$store.state.cs.supplFirmCd = item.supplFirmCd;
          chkRow++;
        }
      });
      const row = delivRow.itemList.length;
      // 체크시
      if (ordItem.chk) {
        // 값 셋팅
        this.$store.state.cs.ordId = delivRow.ordId;
        this.$store.state.cs.delivTypeCd = delivRow.delivTypeCd;
        this.$store.state.cs.supplFirmCd = ordItem.supplFirmCd;
        // 체크모두 되면 부모chk 체크
        if (chkRow == row) {
          delivRow.chk = ordItem.chk;
        }
      } else {
        this.$store.state.cs.ordId = delivRow.ordId;
        this.$store.state.cs.delivTypeCd = delivRow.delivTypeCd;
        // 체크가 남아있으면 값 있으면, 공급업체코드 남겨야함.
        if (chkRow > 0 ) {
          this.$store.state.cs.supplFirmCd = delivRow.itemList[0].supplFirmCd;
        } else {
          // 값 리셋
          this.$store.state.cs.ordId = null;
          this.$store.state.cs.delivTypeCd = null;
          this.$store.state.cs.supplFirmCd = null;
        }
        if (chkRow != row) {
          delivRow.chk = ordItem.chk;
        }
      }
      // 반영을 위해 임시로..
      this.checkedCount++;
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
  props: {
    delivRow: {
      type: Object,
    },
  },
  data() {
    return {
      checkedCount: 0,
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  mounted() {
    this.$store.state.cs.ordId = "";
    this.$store.state.cs.delivTypeCd = "";
    this.$store.state.cs.supplFirmCd = "";
  },
  computed: {},
};
</script>
