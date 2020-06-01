import Vue from "vue";
import App from "./App.vue";
import Vuex from 'vuex'
import { MapleStore } from "vue-handsontable-element";

Vue.use(Vuex)
Vue.config.productionTip = false;

new Vue({
  store: new Vuex.Store(MapleStore),
  render: h => h(App)
}).$mount("#app");
