<template>
  <div></div>
</template>
<script>
export default {
  props: {
  },
  name: 'BoxMapResponse',
  data() {
    return {
      form: {
        centerShortName: '',
        centerCode: '',
        centerName: '',
        codePany: '',
        routeCode: '',
        routeOrder: '',
        hoCode: '',
        storeAddress1: '',
        storeAddress2: '',
        storeCode: '',
        storeName: '',
        postNo: '',
        storeTel: '',
      },
    };
  },
  metaInfo: {
    title: 'BOX25MAP',
    titleTemplate: 'BOX25MAP',
  },
  mounted: async function() {
    const that = this;
    const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    const deleteEventMethod = window.addEventListener ? "removeEventListener" : "detachEvent";
    const eventer = window[eventMethod];
    const messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    const fnc = function(e) {
      // thymeleaf 도메인으로부터 들어온 경우에만 적용
      if (e !== null && e.data !== null && (location.href.indexOf(e.origin) < 0 && e.origin != ("https://gum.criteo.com"))) {
        console.log("BoxMapResponse =====>");
        console.log(e.origin);
        console.log(e.data);
        that.form = e.data;
        parent.callbackBox(that.form);
        window[deleteEventMethod](messageEvent, fnc, false);
      }
    };
    eventer(messageEvent, fnc, false);
  }
};
</script>
