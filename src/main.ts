import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import './assets/styles/main.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';

library.add(faTrash);
const pinia = createPinia();

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(PiniaVuePlugin);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // other options...
  // ...
  // note the same `pinia` instance can be used across multiple Vue apps on
  // the same page
  pinia,
}).$mount('#app');
