import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import Vant from 'vant'

Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

let fz = document.documentElement.clientWidth/7.5;
document.documentElement.style.fontSize= fz + "px";
window.addEventListener('resize', () => {
  fz = document.documentElement.clientWidth/7.5;
  document.documentElement.style.fontSize= fz + "px";
})