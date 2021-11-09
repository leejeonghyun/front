import SiteUtils from '@/common/SiteUtils';

export default {
  data() {
    return {
      touch: { x: 0, y: 0, ratio: 0, isSafe: false },
      isTrans: false,
      gnb: [
        { name: '하루판매', path: '/dp/one_day_sale' },
        { name: '홈', path: '/' },
        { name: '택배핫딜', path: '/dp/delivery_hot_deal' },
      ]
    };
  },
  mounted() {
    document.addEventListener('touchstart', this.touchStart);
    document.addEventListener('touchmove', this.touchMove);
    document.addEventListener('touchend', this.touchEnd);
  },
  destroyed() {
    document.removeEventListener('touchstart', this.touchStart);
    document.removeEventListener('touchmove', this.touchMove);
    document.removeEventListener('touchend', this.touchEnd);
  },
  methods: {
    touchStart(e) {
      this.resetSwiperData();
      const gnbArray = document.querySelectorAll('.wrap-gnb-slide li a, .wrap-dali-gnb-slide li a');
      this.gnb = [...gnbArray].map(item => {
        const parsed = item.outerHTML.match(/href="(\S*)"/);
        const path = (parsed && parsed.length > 1) ? parsed[1] : '/';
        return { name: item.title, path: path };
      });
      const pathname = location.pathname;
      const list = this.gnb.map(item => item.path);
      this.isTrans = list.includes(pathname) || pathname === '/SC-FO-SS-GF-MM-002';

      const target = e.target;
      const exclusiveSelectors = '.swiper-container, .swiper-pagination, .wrap-gnb, .wrap-dali-gnb,'
        + ' .wrap-main-quick, .wrap-category-food, .section-bottom, .ingredient-select, .promotion-hashtag,'
        + ' .logo-button-slide, #intergratedUI';
      this.touch.isSafe = this.findAncestor(target, exclusiveSelectors) === null;
      this.touch.x = e.touches[0].clientX;
      this.touch.y = e.touches[0].clientY;
    },
    findAncestor(el, sel) {
      while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el, sel)));
      return el;
    },
    touchMove(e) {
      const offsetx = e.touches[0].clientX - this.touch.x;
      const offsety = e.touches[0].clientY - this.touch.y;
      this.touch.ratio = Math.abs(offsetx) / Math.abs(offsety + 1);
      if (offsetx < -150) {
        this.$store.state.touchAction = 'swipe-left';
      } else if (offsetx > 150) {
        this.$store.state.touchAction = 'swipe-right';
      } else {
        this.$store.state.touchAction = '';
      }
    },
    touchEnd() {
      const gnb = this.gnb;
      let currentIdx = -1;
      gnb.filter((item, i) => {
        const pathname = (item.path) ? item.path.split('?')[0] : '';
        if (pathname === location.pathname) {
          currentIdx = i;
        }
      });

      if (currentIdx > -1 && this.touch.isSafe && this.touch.ratio > 1.2) {
        let offset = 0;
        if (this.$store.state.touchAction === 'swipe-left') {
          offset = 1;
        } else if (this.$store.state.touchAction === 'swipe-right') {
          offset = -1;
        } else {
          return;
        }
        let nextIdx = (currentIdx + offset) % gnb.length;
        if (nextIdx < 0) {
          nextIdx = gnb.length - 1;
        }
        const nextPath = gnb[nextIdx].path;

        this.resetSwiperData();

        SiteUtils.go(location.host, nextPath);
      };
    },
    resetSwiperData() {
      this.$store.state.touchAction = '';
      this.touch.isSafe = false;
      this.touch.ratio = 0;
    },

    /* // for transitional animation
    <transition name="pageView"
      v-on:enter="pageViewEnter"
      v-on:after-enter="pageViewAfterEnter">
    */
    pageViewEnter(el) {
      if (this.$store.state.touchAction === 'swipe-left') {
        el.style.right = '-100%';
      } else if (this.$store.state.touchAction === 'swipe-right') {
        el.style.left = '-100%';
      }
    },
    pageViewAfterEnter(el) {
      if (this.$store.state.touchAction === 'swipe-left') {
        el.style.right = '0';
      } else if (this.$store.state.touchAction === 'swipe-right') {
        el.style.left = '0';
      }
    },
  },
};
