<template>
  <span>{{filteredAndSorted}}</span>
</template>
<script>
export default {
  name: 'ProductName',
  props: {
    items: Array,
  },
  computed: {
    filteredAndSorted: function() {
      const data = this.$props.items;

      // 이 부분 수정해야됨.
      return data[0].rmnConrCntInfoInq[0].ctnsTitle;

      /* Object.keys(data).forEach(ele => {
        const dspConrSbjCd = '05';
        if (dspConrSbjCd == data[ele]['dspConrSbjCd']) {
          const list = data[ele]['rmnConrCntInfoInq'];
          return '냉장식품';
        }
      }); */
      /* Object.keys(data).forEach(ele => {
        const dspConrSbjCd = '05';
        if (dspConrSbjCd == data[ele]['dspConrSbjCd']) {
          const list = data[ele]['rmnConrCntInfoInq'];

          Object.keys(list).forEach(i => {
            // console.log(list[i]['ctnsTitle']);
            console.log(i);
            /* {{items.rmnTplConrCompoSbjInq[1].rmnConrCntInfoInq[0].ctnsTitle}}
            return list[i]['ctnsTitle'];
          });
        }
      });
        */
      /*  Object.keys(items).forEach(ele => {
        console.log(items[ele]);
      }); */
      /* const dspConrSbjCd = '05';

      Object.keys(items).forEach(ele => {
        if (dspConrSbjCd == items[ele]['dspConrSbjCd']) {
          const data = items[ele]['rmnConrCntInfoInq'];

          Object.keys(data).forEach(i => {
            console.log(data[i]['ctnsTitle']);
            return data[i]['ctnsTitle'];
          });
        }
      }); */
    },
  },
};
</script>
<style>
</style>