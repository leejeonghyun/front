<template>
<div>
  <div style="width:100%;text-align:center;" v-bind:class="[siteClass]">
  방식 : <select v-model="mode" style="width:100px;" class="evActionSelect">
    <option val="get">get</option>
    <option val="post">post</option>
    <option val="put">put</option>
    <option val="del">del</option>
  </select><br />
  URL : <input id="ajax_url" style="border:1px solid #cccccc;width:300px;" v-model="url" /><br />
  파라미터 : <br />
  <textarea id="ajax_param" v-model="params" cols="100" rows="15"></textarea>
  <br /><br /><br />
    <button @click="action()" style="border:1px solid; margin:0px 10px;padding:5px;">확인</button>
  </div>
  <br /><br /><br />
  결과 : <br />
  <div ref="result" class="evActionResult"></div>
</div>
</template>
<style>
.evActionResult { white-space: pre; }
.evActionSelect { appearance: auto; }
</style>
<script>
import ApiUtils from '@/common/ApiUtils';
import CookieUtils from '@/common/CookieUtils';

export default {
  data() {
    return {
      mode: "get",
      url: "/fo/ev/eventmgnt/participation-possible-event-list",
      params: "{\r\nlimit:10,\r\noffset:0,\r\nparam:'aaa'\r\n}",
      siteClass: CookieUtils.getSiteClass(),
    };
  },
  methods: {
    action() {
      if (this.url == "") {
        alert("url 을 입력해주세요.");
        return;
      }
      if (this.params.trim() == "") {
        this.params = "{}";
      }
      if (this.mode == "get") {
        this.get();
      } else if (this.mode == "post") {
        this.post();
      } else if (this.mode == "put") {
        this.put();
      } else if (this.mode == "del") {
        this.del();
      }
    },
    get() {
      this.$refs.result.innerHTML="";
      ApiUtils.get(this.url, eval("("+this.params+")"))
      .then(res => {
        console.log(res);
        this.$refs.result.append(document.createTextNode(JSON.stringify(res.data.data, null, 4)));
      })
      .catch(e => {
        this.$refs.result.append(document.createTextNode(JSON.stringify(e, null, 4)));
      });
    },
    post() {
      this.$refs.result.innerHTML="";
      ApiUtils.post(this.url, eval("("+this.params+")"))
      .then(res => {
        console.log(res);
        this.$refs.result.append(document.createTextNode(JSON.stringify(res.data.data, null, 4)));
      })
      .catch(e => {
        this.$refs.result.append(document.createTextNode(JSON.stringify(e, null, 4)));
      });
    },
    put() {
      this.$refs.result.innerHTML="";
      ApiUtils.put(this.url, eval("("+this.params+")"))
      .then(res => {
        console.log(res);
        this.$refs.result.append(document.createTextNode(JSON.stringify(res.data.data, null, 4)));
      })
      .catch(e => {
        this.$refs.result.append(document.createTextNode(JSON.stringify(e, null, 4)));
      });
    },
    del() {
      this.$refs.result.innerHTML="";
      ApiUtils.del(this.url, eval("("+this.params+")"))
      .then(res => {
        console.log(res);
        this.$refs.result.append(document.createTextNode(JSON.stringify(res.data.data, null, 4)));
      })
      .catch(e => {
        this.$refs.result.append(document.createTextNode(JSON.stringify(e, null, 4)));
      });
    }
  },
  computed: {
  },
  async mounted() {

  },
};
</script>
<!-- 삭제예정 -->
