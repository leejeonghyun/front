<template>
  <div>
    <ul>
      <li>
        Fresh mo:
        <a :href="freshmo('/devlist.html')">{{ freshmo('') }}</a>
      </li>
      <li>
        달리살다 mo:
        <a :href="dalimo('/devlist.html')">{{ dalimo('') }}</a>
      </li>
      <li>
        공통 mo:
        <a :href="commo('/devlist.html')">{{ commo('') }}</a>
      </li>
      <li>
        Fresh pc:
        <a :href="freshpc('/devlist.html')">{{ freshpc('') }}</a>
      </li>
      <li>
        공통 pc:
        <a :href="compc('/devlist.html')">{{ compc('') }}</a>
      </li>
    </ul>
    <hr />
    <h2>SiteUtils.to(mallId, uri)</h2>
    <ul>
      <li>
        달리살다:
        <a :href="to('3', '/dp/main_view?a=b')">달리살다 페이지</a>
      </li>
    </ul>
  </div>
</template>

<script>
import SiteUtils from '@/common/SiteUtils';

export default {
  methods: {
    to(mallId, uri) {
      return SiteUtils.to(mallId, uri);
    },
    freshmo(uri) {
      return SiteUtils.freshmo(uri);
    },
    dalimo(uri) {
      return SiteUtils.dalimo(uri);
    },
    commo(uri) {
      return SiteUtils.commo(uri);
    },
    freshpc(uri) {
      return SiteUtils.freshpc(uri);
    },
    compc(uri) {
      return SiteUtils.compc(uri);
    },
  },
};
</script>

<style>
</style>
