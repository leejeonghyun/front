<template>
  <div class="dali-section-area">
    <h2>Best Brand</h2>
    <ul class="best-brand">
      <li v-for="(item, index) in $store.state.dp.baseBrandList" :key="index">
        <figure>
          <gs-link :to="{ path: '/dp/brand/' + item.dspCtgId }">
            <img
              :src="getImg(item.brandImgPathNm)"
            />
          </gs-link>
        </figure>
        <gs-link :to="{ path: '/dp/brand/' + item.dspCtgId }">
          <em class="brand-name">{{item.dspCtgNm}}</em>
        </gs-link>
        <button
          class="btn-it"
          :class="{active: chkMyIt(item.delYn)}"
          @click="myItAction(item.brandId)"
        >
          <span class="hidden">찜하기</span>
        </button>
      </li>
    </ul>
    <transition name="toastPopup"
      v-on:after-enter="toastPopupAfterEnter"
      v-on:leave="toastPopupEnterLeave"
    >
      <PopupToast :ToastMessage="toastMessage" @popupEvent="popupAction" v-if="popup.popupToastAlarm" :popupToast="popup.popupToastAlarm" popupToastType="popupToastAlarm" />
    </transition>
  </div>
</template>

<script>
import ItemTemplete from '@/common/ItemTemplete';
import ApiUtils from '@/common/ApiUtils';
import PopupToast from '@/components/common/PopupToast';
import LayPopupMixin from '@/mixins/LayerPopupMixin';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';

export default {
  name: 'SideBaseBrandView',
  components: {
    PopupToast,
  },
  data() {
    return {
      isActive: false,
      toastMessage: '',
      popup: {
        popupToastAlarm: false,
      },
      isLogin: this.$store.state.dp.isLogin, // 로그인 여부(true/false)
      cookie: {}, // 쿠키값
    };
  },
  async created() {
    try {
      const params = {
        mnScrExpsrYn: 'Y',
        linkSsevntId: null,
      };
      if (this.isLogin) {
        const cmmMbrNo = await ApiUtils.get('/dp/ds/dspctgmgnt/get-cmm-mbr-no');
        params.cmmMbrNo = cmmMbrNo.data;
      }
      this.$store.dispatch('getBaseBrandList', params); // BestBrand 목록
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  mounted() {
    // 로그인 시
  },
  methods: {
    popupAction(type) {
      // 팝업 활성/비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    toastPopupAfterEnter(el) {
      el.style.opacity = 1;
    },
    toastPopupEnterLeave(el) {
      el.style.opacity = 0;
    },
    chkMyIt(delYn) {
      // 현재 브랜드 카테고리 아이디 가져오는 것이 없음
      // 베스트 브랜드에서 추가한 뒤 체크할 것
      if (this.$store.state.dp.isLogin) {
        if (delYn == 'N') {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    getCookieMap() {
      const custGrdCdYn = CookieUtils.getCookie('CUST_GRD_CD') != '';
      return {
        storId: CookieUtils.getCookie('STOR_ID'),
        supplFirmCd: CookieUtils.getCookie('SUPPL_FIRM_CD'),
        mallId: CookieUtils.getCookie('MALL_ID'),
        dspScrSpCd: '02',
        mdaType: CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD'),
        custGrdCd: CookieUtils.getCookie('CUST_GRD_CD'),
      };
    },
    getImg(imgUrl) {
      return ItemTemplete.img(imgUrl);
    },
    popupToastAction() {
      // 토스트 팝업 초기화
      this.popup.popupToastOn = false;
      this.popup.popupToastOff = false;
      this.popup.popupToastMyitOn = false;
    },
    async myItAction(brandId) {
      const vm = this;
      if (this.isLogin) {
        // 로그인시 myIt 가능
        const param = {
          brandId: brandId,
          userId: this.$store.state.dp.userId,
          cmmMbrNo: this.$store.state.dp.cmmMbrNo,
        };
        const $btnIt = event.target;
        const activeClass = 'active';
        if ($btnIt.classList.contains(activeClass)) {
          // 찜삭제
          this.toastMessage = this.$store.state.dp.offText; // 찜해제 메세지
          console.log(brandId, '찜삭제');
          // $btnIt.classList.remove(activeClass);
          // $btnIt.setAttribute('aria-pressed', 'false');
          const response = await ApiUtils.put('/fo/md/itemaddinfomgnt/gnbBrand-favorite-update', param);
          console.log(response);
          if (response.data > 0) {
            this.popup.popupToastAlarm = true;
            const $this = this;
            setTimeout( function() {
              // 성공시 sidebar의 myItList를 새로 그린다
              $this.$emit('getMyItList', param);
            }, 300);
            // basebrand del Y
            const idx = this.$store.state.dp.baseBrandList.findIndex(
              i => i.brandId == brandId
            );
            if (!(idx<0)) {
              this.$store.state.dp.baseBrandList[idx].delYn = 'Y';
            }
            // gnb 브랜드 삭제
            const idx3 = this.$store.state.dp.brandList.findIndex(
              i => i.brandId == brandId
            );
            if (!idx3<0) {
              this.$store.state.dp.brandList[idx3].delYn = 'Y';
            }
          }
        } else {
          // 찜하기
          this.toastMessage = this.$store.state.dp.onText; // 찜추가 메세지
          console.log(brandId, '찜추가');
          $btnIt.classList.add(activeClass);
          $btnIt.setAttribute('aria-pressed', 'true');
          console.log(param);
          const response = await ApiUtils.post('/fo/md/itemaddinfomgnt/gnbBrand-favorite-insert', param);
          console.log(response);
          if (response.data > 0) {
            const $this = this;
            setTimeout( function() {
              // 성공시 sidebar의 myItList를 새로 그린다
              $this.$emit('getMyItList', param);
            }, 300);
             // basebrand del N
            const idx = this.$store.state.dp.baseBrandList.findIndex(
              i => i.brandId == brandId
            );
            if (!(idx<0)) {
              this.$store.state.dp.baseBrandList[idx].delYn = 'N';
            }
            // store 값 update
            // gnb 브랜드 목록에 추가
            const idx3 = this.$store.state.dp.brandList.findIndex(
              i => i.brandId == brandId
            );
            console.log(this.$store.state.dp.brandList[idx3]);
            if (!(idx3<0)) {
              this.$store.state.dp.brandList[idx3].delYn = 'N';
            }
            this.popup.popupToastAlarm = true;
          }
        }
      } else {
        console.log('비로그인 찜');
        // 비로그인시 myIt불가
        this.toastMessage = this.$store.state.dp.loginText; // 찜해제 메세지
        console.log(this.toastMessage);
        this.popup.popupToastAlarm = true;
      }
    },
  },
};
</script>
