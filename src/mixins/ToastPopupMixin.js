export default {
  data() {
    return {
      isToastShown: false,
    };
  },
  methods: {
    // toastActiveEvent(key) {
    //   const $target = event.currentTarget;
    //   if (this.modalActive[key] === undefined) {
    //     this.modalActive = Object.assign({}, this.modalActive, {[key]: true});
    //     this.isToastShown = true;
    //   } else {
    //     if ($target.getAttribute('aria-haspopup')) {
    //       this.modalActive = Object.assign({}, this.modalActive, {[key]: true});
    //       this.isToastShown = true;
    //     } else {
    //       this.modalActive = Object.assign({}, this.modalActive, {[key]: false});
    //       this.isToastShown = false;
    //     }
    //   }
    //   // this.modalFocusEvent($target, key);
    // },
    toastCloseEvent() { // 9월 수정 : 토스트 팝업 id 값 받아오기
      const toast = document.getElementById('popupToast');
      if (this.isToastShown || !toast) { // 토스트 메시지가 띄어져 있다면 함수를 끝냄
        return;
      }
      this.isToastShown = true;
      toast.classList.add('active'); // 토스트 메시지 활성화
      setTimeout(() => {
        this.removeToast();
      }, 2000); // 9월 수정 : 토스트 팝업 활성화 시간 변경
    },
    removeToast() {
      console.log('removeToast');
      const toast = document.getElementById('popupToast');
      if (!toast) {
        return;
      }
      toast.classList.remove('active');
      this.isToastShown = false;
      // 9월 수정 : 토스트 팝업 조건 변경
      (this.popupToastType === undefined) ? this.$emit('popupEvent', 'popupToast') : this.$emit('popupEvent', this.popupToastType);
    }
  },
  components: {
  }
};
