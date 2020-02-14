import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
Vue.config.productionTip = false

new Vue({
  store,
  axios,
  router,
  render: h => h(App)
}).$mount('#app')