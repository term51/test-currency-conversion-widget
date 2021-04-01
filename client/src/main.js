import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import App from './App.vue';
Vue.use(VueCompositionApi);

import store from './store'

import dateFilter from "@/filters/date.filter";
Vue.filter("dateNormalize", dateFilter);

Vue.config.productionTip = false;

new Vue({
   store,
   render: h => h(App)
}).$mount('#app');
