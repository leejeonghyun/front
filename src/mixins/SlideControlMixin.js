export default {
  data() {
    return {
      modalActive: {},
      modalBtn: {},
    };
  },
  methods: {
    slidePlayEvent(swiper, slidePlay) {
      const status = slidePlay;
      if (status) {
        this.$refs[swiper].swiper.autoplay.start();
      } else {
        this.$refs[swiper].swiper.autoplay.stop();
      }
      return !status;
    },
    slideStopEvent(swiper) {
      this.$refs[swiper].swiper.autoplay.stop();
      return false;
    },
    slidePrevEvent(swiper) {
      this.$refs[swiper].swiper.slidePrev();
    },
    slideNextEvent(swiper) {
      this.$refs[swiper].swiper.slideNext();
    },
    /*
    - swiperName : swpier ref name,
    - pagination : pagination 유무 true 값으로 확인
    - type : pagination type - true 값으로 fraction 타입 구분
    - option : 한 화면에서 컴포넌트가 아닌 swiper로 슬라이드 여러개 호출 시 각 swiperoption 지정 (option 명)
    */
    slideNextPrevButton(swiperName, pagination, type, option) {
      const swiperPrev = swiperName + 'Prev';
      const swiperNext = swiperName + 'Next';
      if (option === undefined) {
        this.$set(this.swiperOption, 'navigation', {
          nextEl: this.$refs[swiperNext],
          prevEl: this.$refs[swiperPrev],
        });
        if (pagination) {
          const swiperpagination = swiperName + 'Pagination';
          if (type) {
            this.$set(this.swiperOption, 'pagination', {
              el: this.$refs[swiperpagination],
              type: 'fraction',
            });
          } else {
            this.$set(this.swiperOption, 'pagination', {
              el: this.$refs[swiperpagination]
            });
          }
        }
        const swiperScrollbar = swiperName + 'Scrollbar';
        this.$set(this.swiperOption, 'scrollbar', {
          el: this.$refs[swiperScrollbar],
        });
        this.$refs[swiperName].swiper.destroy();
        this.$nextTick(() => {
          this.$refs[swiperName].mountInstance();
          this.$refs[swiperName].swiper.update();
        });
      } else {
        this.$set(this[option], 'navigation', {
          nextEl: this.$refs[swiperNext],
          prevEl: this.$refs[swiperPrev],
        });
        if (pagination) {
          const swiperpagination = swiperName + 'Pagination';
          if (type) {
            this.$set(this[option], 'pagination', {
              el: this.$refs[swiperpagination],
              type: 'fraction',
            });
          } else {
            this.$set(this[option], 'pagination', {
              el: this.$refs[swiperpagination]
            });
          }
        }
        const swiperScrollbar = swiperName + 'Scrollbar';
        this.$set(this[option], 'scrollbar', {
          el: this.$refs[swiperScrollbar],
        });
        this.$refs[swiperName].swiper.destroy();
        this.$nextTick(() => {
          this.$refs[swiperName].mountInstance();
          this.$refs[swiperName].swiper.update();
        });
      };
      for (let i = 0; i < this.$refs[swiperName].$el.firstElementChild.children.length; i++) {
        const $slides = this.$refs[swiperName].$el.querySelectorAll('.swiper-slide');
        $slides[i].setAttribute('tabindex', '0');
      };
    },
    slideFocusEvent(swiperName, index) {
      this.$refs[swiperName].swiper.slideTo(index, 0);
    }
  },
  updated() {
  }
};
