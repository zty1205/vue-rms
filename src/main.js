// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
// 引入配置的router文件
import router from './router';
import IView from 'iview';
import 'iview/dist/styles/iview.css';


Vue.use(IView);

Vue.config.productionTip = false
Vue.prototype.$http = axios
// 懒加载图片 在图片为加载完成前 先显示这个图片
Vue.use(VueLazyload, {
  loading: require('./assets/img/placeholder.png')
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
