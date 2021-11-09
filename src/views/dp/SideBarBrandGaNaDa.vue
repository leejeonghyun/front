<template>
  <span>
    <div class="wrap-brand-search">
      <div class="wrap-searchbar-dali">
        <div class="wrap-input search">
          <label for="search-input-brand-tap" class="hidden">검색어 입력</label>
          <input
            id="search-input-brand-tap resetId"
            ref="textId"
            type="text"
            v-model="brandSearch"
            placeholder="브랜드를 찾아보세요."
            @keyup.13="goSearch"
          />
          <button class="btn-reset" @click="resetBtn" aria-label="검색어 초기화"></button>
        </div>
        <button class="btn-searchbar-search-dali" aria-label="검색" @click="goSearch">
          <span class="hidden">검색</span>
        </button>
      </div>
    </div>
    <div class="dali-section-area type02">
      <ul class="search-brand-list" v-for="(list, index) in filteredList" :key="index">
        <li :id="`brand0${index + 1}`">
          <figure>
            <!-- <img src="@/assets/images/_temp/_logo_best_brand04.png" :alt="list.brandNm" /> -->
            <gs-link :to="{ path: '/dp/brand/' + list.dspCtgId, params: { id: list.dspCtgId}}">
              <img
                :src="getImg(list.brandImgPathNm)"
              />
            </gs-link>
          </figure>
          <span class="sorting-text" v-if="list.rk == 1">{{list.fst}}</span>
          <gs-link :to="{ path: '/dp/brand/' + list.dspCtgId, params: { id: list.dspCtgId}}">
            <em class="brand-name">{{list.dspCtgNm}}</em>
          </gs-link>
          <button
            class="btn-it"
            :class="{active: chkMyIt(list.delYn)}"
            aria-pressed="true"
            @click="myItAction(list.brandId)"
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
      <!-- 팝업 - toast -->
    </div>
  </span>
</template>
<script>
import ItemTemplete from '@/common/ItemTemplete';
import ApiUtils from '@/common/ApiUtils';
import PopupToast from '@/components/common/PopupToast';
import CookieUtils from '@/common/CookieUtils';
import LoginUtils from '@/common/LoginUtils';
import DateUtils from '@/common/DateUtils';

export default {
  name: 'SideBarBrandGaNaDa',
  components: {
    PopupToast,
  },
  data() {
    return {
      isActive: false,
      toastMessage: '',
      itemList: [],
      popup: {
        popupToastAlarm: false,
      },
      isLogin: this.$store.state.dp.isLogin, // 로그인 여부(true/false)
      cookieParams: {
        storId: '',
        supplFirmCd: '',
        mallId: '',
        dspScrSpCd: '',
        custGrdCd: '',
      },
      brandSearch: '',
    };
  },
  computed: {
    filteredList() {
      return this.$store.state.dp.ganadaBrandList.filter(e => {
        return e.dspCtgNm
          .toLowerCase()
          .includes(this.brandSearch.toLowerCase());
      });
    },
  },
  async created() {
    try {
      const params = {
        linkSsevntId: 'N',
        cmmMbrNo: this.isLogin ? this.$store.state.dp.cmmMbrNo : null,
      };
      this.$store.dispatch('getBaseBrandList', params); // BestBrand 목록
    } catch (e) {
      this.$gsdialog.alert('오류가 발생했습니다.').then(dialog => {
        console.log(e);
      });
    }
  },
  methods: {
    popupAction(type) {
      // 팝업 활성 / 비활성
      this.popup[`${type}`] = !this.popup[`${type}`];
      this.popup.open = !this.popup.open;
    },
    toastPopupAfterEnter(el) {
      el.style.opacity = 1;
    },
    toastPopupEnterLeave(el) {
      el.style.opacity = 0;
    },
    resetBtn() {
      this.$refs.textId.value = '';
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
          $btnIt.classList.remove(activeClass);
          $btnIt.setAttribute('aria-pressed', 'false');
          const response = await ApiUtils.put('/fo/md/itemaddinfomgnt/gnbBrand-favorite-update', param);
          console.log(response.data);
          if (response.data > 0) {
            this.popup.popupToastAlarm = true;
            const $this = this;
            // gnb 브랜드 삭제
            const idx3 = this.$store.state.dp.brandList.findIndex(
              i => i.brandId == brandId
            );
            if (!(idx3<0)) {
              this.$store.state.dp.brandList[idx3].delYn = 'Y';
            }
            setTimeout( function() {
              // 성공시 sidebar의 myItList를 새로 그린다
              $this.$emit('getMyItList', param);
            }, 2000);
          }
        } else {
          // 찜하기
          this.toastMessage = this.$store.state.dp.onText; // 찜추가 메세지
          console.log(brandId, '찜추가');
          $btnIt.classList.add(activeClass);
          $btnIt.setAttribute('aria-pressed', 'true');
          console.log(param);
          const response = await ApiUtils.post('/fo/md/itemaddinfomgnt/gnbBrand-favorite-insert', param);
          console.log(response.data);
          if (response.data > 0) {
            this.popup.popupToastAlarm = true;
            // gnb 브랜드 추가
            const idx3 = this.$store.state.dp.brandList.findIndex(
              i => i.brandId == brandId
            );
            if (!(idx3<0)) {
              this.$store.state.dp.brandList[idx3].delYn = 'N';
            }
            const $this = this;
            setTimeout( function() {
              // 성공시 sidebar의 myItList를 새로 그린다
              $this.$emit('getMyItList', param);
            }, 2000);
          }
        }
      } else {
        // 비로그인시 myIt 불가
        this.toastMessage = this.$store.state.dp.loginText; // 찜해제 메세지
        this.popup.popupToastAlarm = true;
      }
    },
    goSearch() {
      // 최근검색어 쿠키저장
      const params = {
        keyword: this.brandSearch,
        date: DateUtils.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      };
      // 검색결과 이동
      const params2 = {
        keyword: this.brandSearch,
        mall: this.$store.state.dp.cookieInfo.mallId,
        t: Date.now(),
      };
      this.$router.push({ name: 'SearchResult', query: params2 });
    },
  },
  mounted: async function () {
    const vm = this;

    await LoginUtils.nonLoginPromise().then(function(response) {
      const cookie = vm.getCookieMap();

      console.log('Brand 매장 ID storId', CookieUtils.getCookie('STOR_ID'));
      console.log(
        '공급업체코드 supplFirmCd',
        CookieUtils.getCookie('SUPPL_FIRM_CD')
      );
      console.log('접속몰 mallId', CookieUtils.getCookie('MALL_ID'));
      console.log(
        '사이트접속매체유형코드 steConnMdaTypeCd',
        CookieUtils.getCookie('STE_CONN_MDA_TYPE_CD')
      );

      vm.cookieParams.storId = cookie.storId;
      vm.cookieParams.supplFirmCd = cookie.supplFirmCd;
      vm.cookieParams.mallId = cookie.mallId;
      vm.cookieParams.dspScrSpCd = cookie.dspScrSpCd;
      vm.cookieParams.custGrdCd = cookie.custGrdCd;

      const itemListLen = vm.$store.state.dp.ganadaBrandList.length;
      vm.itemList = {};
    });
  },
};
</script>
<style scoped>
</style>
