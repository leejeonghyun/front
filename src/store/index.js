import Vue from "vue";
import Vuex from "vuex";

import mbr from "./mbr.module";
/* import cs from "./cs.module"; */
import cs from "./cs";
import cu from "./cu.module";
import dp from "./dp";
import simpleCook from "./dp.simple_cook";
import md from "./md";
import search from "./search";
import m4Search from "./m4Search";
import ss from "./ss";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
    name: '헝가리',
    ordId: ''
  },

  modules: {
    mbr,
    cs,
    cu,
    dp,
    simpleCook,
    search,
    m4Search,
    md,
    ss,
  },

});
