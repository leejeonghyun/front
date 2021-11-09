export default {
  data() {
    return {
      openedModal: false,
      modalActive: {},
      modalBtn: {},
    };
  },
  methods: {
    modalActiveEvent(key) {
      const $target = event && event.currentTarget;
      if (this.modalActive[key] === undefined) {
        this.$set(this.modalActive, [key], true);
        this.openedModal = true;
      } else {
        if ($target.getAttribute('aria-haspopup')) {
          this.$set(this.modalActive, [key], true);
          this.openedModal = true;
        } else {
          this.$set(this.modalActive, [key], false);
          this.openedModal = false;
        }
      }
      if ($target) {
        this.modalFocusEvent($target, key);
      }
    },
    modalFocusEvent(element, key) { // 버튼 포커스 이동
      const isModalBtn = element.getAttribute('aria-haspopup');
      const wrapper = document.getElementById(key);
      if (isModalBtn) { // 레이어 팝업 활성화, 팝업 내 버튼 포커스
        wrapper.setAttribute('tabindex', 0);
        this.$set(this.modalBtn, [key], element);
        wrapper.focus();
      } else { // 레이어 팝업 비활성화, 컨텐츠 내 버튼 팝업
        this.modalBtn[key].focus();
      }
    },
    tabFocusRemove(popupClose) { // 팝업 닫기 버튼 탭 이동 시 팝업 닫기
      if (!event.shiftKey) { // shift + tab 시 동작 안하기
        event.preventDefault();
        this[popupClose](); // 팝업 닫기 함수 호출
      }
    }
  }
};
