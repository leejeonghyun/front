<template>
  <div>
    <ul>
      <li>
        <gs-link to="/sample/snippets/cookie_test">/sample/snippets/cookie_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/cookie_set_test">/sample/snippets/cookie_set_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/form_test">/sample/snippets/form_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/event_bus_test">/sample/snippets/event_bus_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/validate_test">/sample/snippets/validate_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/on_test">/sample/snippets/on_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/emit_test">/sample/snippets/emit_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/param_test">/sample/snippets/param_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/object_test">/sample/snippets/object_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/scroll_test">/sample/snippets/scroll_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/img_test">/sample/snippets/img_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/site_test">/sample/snippets/site_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/share_test">/sample/snippets/share_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/paging_test">/sample/snippets/paging_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/paging_multi_test">/sample/snippets/paging_multi_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/alert_test">/sample/snippets/alert_test</gs-link>
      </li>
      <li>
        <gs-link to="/sample/snippets/link_test">/sample/snippets/link_test</gs-link>
      </li>
    </ul>
  </div>
</template>

<script>
import CookieUtils from '@/common/CookieUtils';

export default {
  metaInfo: {
    title: CookieUtils.getMetaInfoTitle(),
    titleTemplate: '코드 샘플 < %s',
  },
};
</script>
