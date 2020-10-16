// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import './css/base.css'
 
import $ from 'jquery'

Vue.config.productionTip = false //阻止显示生成模式的消息
Vue.use(VueLazyload, {
  loading: require('./assets/load/loading.gif'), 
  error: require('./assets/load/error.jpg')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,

})
