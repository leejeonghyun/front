<template>
  <div id="test">
    <h1>Link Test - {{ host }}</h1>
    <ul>
      <li>
        <router-link :to="`/sample`">router-link: /sample</router-link>
      </li>
      <li>
        <router-link :to="`http://www.gsfresh.com`">router-link: http://www.gsfresh.com</router-link>
      </li>
      <li>
        <router-link :to="`/ev/event_list`">router-link: /ev/event_list</router-link>
      </li>
      <li>
        <router-link
          :to="`/md/product_detail?itemId=8801068369809&storId=2267&supplFirmCd=31007`"
        >router-link: /md/product_detail?itemId=8801068369809&storId=2267&supplFirmCd=31007</router-link>
      </li>
      <li>
        <router-link :to="`/cu/login`">router-link: /cu/login</router-link>
      </li>
      <li>
        <button @click="goTo">router-link: /sample/snippets/link_test</button>
      </li>
      <li>
        <router-link to="/cp/gnb_special_deal01" class="button active">router-link: class</router-link>
      </li>
    </ul>
    <hr />
    <ul>
      <li>
        <gs-link to="/sample">gs-link: /sample</gs-link>
      </li>
      <li>
        <gs-link :to="`http://www.gsfresh.com`">gs-link: http://www.gsfresh.com</gs-link>
      </li>
      <li>
        <gs-link :to="`/ev/event_list`">gs-link: /ev/event_list</gs-link>
      </li>
      <li>
        <gs-link
          :to="`/md/product_detail?itemId=8801068369809&storId=2267&supplFirmCd=31007`"
        >gs-link: /md/product_detail?itemId=8801068369809&storId=2267&supplFirmCd=31007</gs-link>
      </li>
      <li>
        <gs-link :to="`/cu/login`">gs-link: /cu/login</gs-link>
      </li>
      <li>
        <gs-link :to="`/sample/snippets/link_test`">gs-link: /sample/snippets/link_test</gs-link>
      </li>
      <li>
        <gs-link :to="`/dp/ssevnt_list`">gs-link: default /dp/ssevnt_list</gs-link>
      </li>
      <li>
        <gs-link :to="`/dp/ssevnt_list`" :mall="`fr`">gs-link: fresh /dp/ssevnt_list</gs-link>
      </li>
      <li>
        <gs-link :to="`/dp/ssevnt_list`" :mall="`ds`">gs-link: dalisalda /dp/ssevnt_list</gs-link>
      </li>
      <li>
        <gs-link :to="`https://www.naver.com`" target="_blank" title="네이버">gs-link: target="_blank"</gs-link>
      </li>
      <li>
        <gs-link
          :to="{ path: '/cp/dalis_tip_detail', query: { setId: `test` }}"
          mall="ds"
        >gs-link: query object</gs-link>
      </li>
      <li>
        <gs-link to="/cp/gnb_special_deal01" class="button active" mall="ds">gs-link: class</gs-link>
      </li>
      <li>
        <gs-link to="/cp/gnb_special_deal01" mall="ds" @click="clickEvent">gs-link: click event</gs-link>
      </li>
      <li>
        <gs-link to="/ss/search_result?keyword=오징어&mall=all">gs-link: keyword=오징어</gs-link>
      </li>
      <li>
        <gs-link to="/od/bskt" class="btn-header-cart" aria-label="장바구니화면이동">
          <span class="num">
            gs-link: /od/bskt
            <span class="hidden">장바구니개수</span>99+ aria-label
          </span>
        </gs-link>
      </li>
      <li>
        <gs-link to="/">gs-link: / Home 링크</gs-link>
      </li>
      <li>
        <gs-link to="market://details?id=com.gsretail.android.smapp">gs-link: 안드로이드 링크</gs-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Link Test',
  },
  data() {
    return {
      host: location.host,
    };
  },
  methods: {
    goTo() {
      this.$router.push('/sample/snippets/link_test').catch(() => {});
    },
    clickEvent() {
      alert('tt');
    },
  },
};
</script>

<style scoped>
#test {
  padding: 10px;
}
</style>
