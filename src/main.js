import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './assets/main.css'
import 'flowbite';
import './assets/tailwind.css'
import VueFlags from "@growthbunker/vueflags";

import router from './routes'
import axios from 'axios';
import Cryptoicon from 'vue-cryptoicon';
import icon from 'vue-cryptoicon/src/icons';
import store from './store';

Vue.use(VueFlags, {
  iconPath: '/flags/',
});

Cryptoicon.add(icon);
Vue.use(Cryptoicon);

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store, 
  render: h => h(App),
}).$mount('#app')
