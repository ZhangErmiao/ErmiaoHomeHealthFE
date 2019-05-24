// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
// import {ls} from './store/pageStore.js'
import store from './store/store.js'
import echarts from 'echarts'
import  'echarts/theme/macarons.js'
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  create: function () {},
  components: { App },
  template: '<App/>'
})
axios.defaults.headers['Authorization'] = localStorage.getItem('Authorization')

axios.interceptors.request.use((config) => {
  if (localStorage.getItem('Authorization')) {
    config.headers.Authorization = localStorage.getItem('Authorization')
  }
  return config
}, error => {
  return Promise.reject(error)
})
