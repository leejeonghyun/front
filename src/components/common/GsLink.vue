<template>
  <a v-if="linkProps(to)"
    :href="toUrl" :title="title" :aria-label="ariaLabel" v-bind="$attrs" v-on="$listeners" :target="target">
    <slot></slot>
  </a>
  <router-link v-else
    :to="toUrl" :title="title" :aria-label="ariaLabel" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </router-link>
</template>

<script>
import SiteUtils from '@/common/SiteUtils';

export default {
  name: 'GsLink',
  props: {
    'to': {
      type: [String, Object],
      required: true,
    },
    'mall': {
      type: String,
      required: false,
    },
    'searchMall': {
      type: String,
      required: false,
    },
    'target': {
      type: String,
      required: false,
    },
    'title': {
      type: String,
      required: false,
    },
    'aria-label': {
      type: String,
      required: false,
    }
  },
  computed: {
    cssClass() {
      return this['class'];
    }
  },
  data() {
    return {
      toUrl: this.to,
      // isExternal: SiteUtils.checkUrl(location.host, this.to, this.mall).isExternal,
    };
  },
  methods: {
     linkProps(obj) {
      const siteInfo = SiteUtils.checkUrl(location.host, obj, this.mall);
      this.toUrl = this.linkUrl(siteInfo.toUrl);
      return siteInfo.isExternal;
    },
    linkUrl(obj) {
      let url = obj;
      const searchYn = obj.indexOf('/ss/search_result?keyword=') > -1 ? true : false;
      if (this.searchMall && searchYn) {
        const mallYn = obj.indexOf('&mall=') > -1 ? true : false;
        if (this.searchMall === 'gsfresh_m4' || this.searchMall === 'gsfresh') {
          url = obj + (!mallYn ? '&mall=all&t'+ Date.now() : '');
          url = url.replace(SiteUtils.marketformo(''), SiteUtils.freshmo(''));
        } else if (this.searchMall === 'dalisalda') {
          url = obj + (!mallYn ? '&mall=dalisalda&t'+ Date.now() : '');
          url = url.replace(SiteUtils.marketformo(''), SiteUtils.dalimo(''));
        } else {
          url = obj + (!mallYn ? '&mall=' + this.searchMall + '&t'+ Date.now() : '');
        }
      }
      return url;
    },
  },
};
</script>

<style scoped>
.gslink {
  width: 100%;
  height: 100%;
}
</style>
