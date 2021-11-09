<template>
  <transition
    name="popupOther"
    v-if="popup"
    v-on:enter="popupOtherEnter"
    v-on:after-enter="popupOtherAfterEnter"
    v-on:leave="popupOtherLeave"
  >
    <div
      id="intergratedUI"
      class="wrap-intergrated-popup"
      role="dialog"
      tabindex="0"
      aria-modal="true"
      :class="[{active : popupActive}, channelPosition]"
    >
      <div class="layer-bg" @click="popupAction"></div>
      <div class="layer-inner">
        <div class="text">
          <span class="text-info">모든 쇼핑을 빠르고 간편하게</span>
          <div class="typing"></div>
        </div>
        <!-- mall image size: 170px X 110px -->
        <div class="wrap-circle-mall">
          <ul ref="circleMall" class="circle-mall">
            <li>
              <a href="#" :class="mallActiveClass(0)">
                <img src="@/assets/images/_temp/_ico_ui_mall1.png" alt="GSfresh mall" />
              </a>
            </li>
            <li>
              <a href="#" :class="mallActiveClass(1)">
                <img src="@/assets/images/_temp/_ico_ui_mall2.png" alt="ORGANIC DALISALDA" />
              </a>
            </li>
            <li>
              <a href="#" :class="mallActiveClass(2)">
                <img src="@/assets/images/_temp/_ico_ui_mall3.png" alt="펫츠비" />
              </a>
            </li>
            <li>
              <a href="#" :class="mallActiveClass(3)">
                <img src="@/assets/images/_temp/_ico_ui_mall5.png" alt="새벽배송" />
              </a>
            </li>
            <li>
              <a href="#" :class="mallActiveClass(4)">
                <img src="@/assets/images/_temp/_ico_ui_mall4.png" alt="HARU" />
              </a>
            </li>
            <li>
              <a href="#" :class="mallActiveClass(5)">
                <img src="@/assets/images/_temp/_ico_ui_mall5.png" alt="새벽배송" />
              </a>
            </li>
            <li>
              <a href="#" :class="mallActiveClass(6)">
                <img src="@/assets/images/_temp/_ico_ui_mall4.png" alt="HARU" />
              </a>
            </li>
            <li>
              <a href="#" :class="mallActiveClass(7)">
                <img src="@/assets/images/_temp/_ico_ui_mall5.png" alt="새벽배송" />
              </a>
            </li>
            <li>
              <a href="#" :class="mallActiveClass(8)">
                <img src="@/assets/images/_temp/_ico_ui_mall4.png" alt="HARU" />
              </a>
            </li>
          </ul>
        </div>
        <!-- brand image size: 100px X 100px -->
        <div class="wrap-circle-brand">
          <ul ref="circleBrand" class="circle-brand">
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand1.png" alt />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand2.png" alt="WINE 25" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand3.png" alt="THRIVE" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand4.png" alt="you us" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand5.png" alt="SIMPLY COOK" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand6.png" alt="네니아" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand1.png" alt />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand2.png" alt="WINE 25" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand3.png" alt="THRIVE" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand4.png" alt="you us" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand6.png" alt="네니아" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand1.png" alt />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand2.png" alt="WINE 25" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand3.png" alt="THRIVE" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand4.png" alt="you us" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand3.png" alt="THRIVE" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/images/_temp/_ico_ui_brand4.png" alt="you us" />
              </a>
            </li>
          </ul>
        </div>
        <button
          class="btn-close-search-layer"
          @click="popupAction"
          aria-label="포커스 아웃 시 팝업 닫기"
          @keydown.9="tabFocusRemove('popupAction')"
        >
          <span class="hidden">닫기</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { gsap, Draggable, TweenLite } from 'gsap/all';
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'; // 수정 2020.02.06 : 팝업시 딤드 스크립트 수정
import CookieUtils from '@/common/CookieUtils';
export default {
  name: 'IntergratedUI',
  props: ['popup', 'channelPosition'],
  data() {
    return {
      popupActive: false,
      // 몰의 최대 메뉴 개수
      mallMaxNum: 10,
      // 몰의 중심점 기준 각 메뉴의 rotate value(360도에 최대 10개 기준)
      mallRotateValue: 36,
      // 화면에서 보여지는 몰의 아이템 갯수
      mallRotateView: 3,
      // 브랜드의 최대 메뉴 개수
      brandMaxNum: 18,
      // 브랜드의 중심점 기준 각 메뉴의 rotate value(360도에 최대 18개 기준)
      brandRotateValue: 20,
      // 화면에서 보여지는 브랜드의 아이템 갯수
      brandRotateView: 5,
      // mall active index 값
      mallActive: 3,
    };
  },
  mixins: [LayerPopupMixin],
  computed: {
    mallActiveClass(index) {
      return index => {
        return index === this.mallActive ? 'active' : '';
      };
    },
  },
  mounted() {

  },
  methods: {
    popupAction() {
      this.$emit('popupEvent', 'intergratedUI');
      this.modalActiveEvent('intergratedUI');
    },
    popupOtherEnter(el) {
      el.style.opacity = '0';
      el.style.bottom = '-100%';
    },
    popupOtherAfterEnter(el) {
      el.style.opacity = '1';
      el.style.bottom = '0';
      this.popupActive = true;
      gsap.registerPlugin(Draggable);
      // Mall Drag init
      Draggable.create(this.$refs.circleMall, {
        type: 'rotation',
        onDrag: el => {
          this.draggableRotate(this.$refs.circleMall, this.mallRotateValue, 0);
          if (this.$refs.circleMall.querySelector('.active')) {
            this.$refs.circleMall.querySelector('.active').className = '';
          }
        },
      });
      // Mall 한번에 표현 가능한 최대 개수인 10개 미만일때 최소, 최대 rotate값 설정.
      const rotationResult =
        (this.mallActive - this.mallRotateView + 1.5) * this.mallRotateValue; // + 1.5는 여유 공간 확보를 위한 수치
      TweenLite.set(this.$refs.circleMall, { rotation: -rotationResult });
      if (this.$refs.circleMall.childNodes.length < this.mallMaxNum) {
        const minRotation = -(
          this.mallRotateValue *
          (this.$refs.circleMall.childNodes.length - this.mallRotateView - 0.5)
        ); // - 0.5는 여유 공간 확보를 위한 수치
        Draggable.get(this.$refs.circleMall).applyBounds({
          minRotation,
          maxRotation: 0,
        });
      }
      Draggable.get(this.$refs.circleMall).update();
      this.draggableRotate(this.$refs.circleMall, this.mallRotateValue);
      // Brand Drag init
      Draggable.create(this.$refs.circleBrand, {
        type: 'rotation',
        onDrag: el => {
          this.draggableRotate(
            this.$refs.circleBrand,
            this.brandRotateValue,
            0
          );
          if (this.$refs.circleBrand.querySelector('.active')) {
            this.$refs.circleBrand.querySelector('.active').className = '';
          }
        },
      });
      // Brand 한번에 표현 가능한 최대 개수인 10개 미만일때 최소, 최대 rotate값 설정.
      if (this.$refs.circleBrand.childNodes.length < this.brandMaxNum) {
        const minRotation = -(
          this.brandRotateValue *
          (this.$refs.circleBrand.childNodes.length -
            this.brandRotateView -
            0.5)
        ); // - 0.5는 여유 공간 확보를 위한 수치
        Draggable.get(this.$refs.circleBrand).applyBounds({
          minRotation,
          maxRotation: 0,
        });
      }
    },
    popupOtherLeave(el) {
      if (this.popupActive) {
        Draggable.get(this.$refs.circleMall).kill();
        this.popupActive = false;
        el.style.opacity = '0';
        el.style.bottom = '-100%';
      }
    },
    // drag로 rotate된 자식들의 로고를 올바른 방향으로 회전
    draggableRotate(target, rotateValue) {
      const roatateTarget = target.childNodes;
      const rotation = Draggable.get(target).rotation;
      roatateTarget.forEach((value, index) => {
        value.children[0].style.transform = `rotate(${-rotateValue * index -
          rotation}deg)`;
      });
    },
  },
  updated() {
    if (!this.popupActive) {
      this.modalActiveEvent('intergratedUI');
      // 팝업 딤드 시 스크롤 막기
      if (this.intergratedUI) {
        disableBodyScroll(document.querySelector('.scroll-area'));
      } else {
        clearAllBodyScrollLocks(this); // 수정 2020.02.06 : 팝업시 딤드 스크립트 수정
      }
    }
  },
};
</script>
