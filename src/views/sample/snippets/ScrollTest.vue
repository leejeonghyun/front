<template>
  <div>
    <h1>Mobile Scroll Test</h1>
    <h2>Item List</h2>
    <ul id="list">
      <li
        v-for="(item, index) in itemList"
        :key="index"
        :item="item"
        class="item"
      >content {{ item.name }}</li>
    </ul>
    <div id="panel">loading: {{ loading }}</div>
    <div>Footer ======</div>
    <div>
      <Loading v-show="loading" />
    </div>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      itemList: [{ name: 1 }, { name: 2 }, { name: 3 }],
      moreData: true,
      loading: false,
      count: 0,
    };
  },
  mounted() {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll: function() {
      const el = document.querySelector('body');
      const y = window.scrollY + window.innerHeight;
      const height = el.offsetHeight;
      const ratio = Math.floor((y / height) * 100);
      if (ratio > 90 && this.moreData && !this.loading) {
        this.loadMore();
      }
    },
    loadMore: function() {
      this.loading = true;
      setTimeout(() => {
        this.count++;
        if (this.count > 6) {
          this.loading = false;
          this.moreData = false;
          return;
        } else {
          this.itemList.push(
            ...[
              { name: this.count * 3 + 1 },
              { name: this.count * 3 + 2 },
              { name: this.count * 3 + 3 },
            ]
          );
          this.loading = false;
        }
      }, 2000);
    },
  },
};
</script>
<style scoped>
ul {
  border: 1px solid #600;
}
ul >>> li {
  height: 160px;
  border: 2px solid #007;
}
#panel {
  right: 0;
  position: fixed;
  bottom: 0;
  background-color: antiquewhite;
  padding: 4px;
  margin: 3px;
}
</style>
