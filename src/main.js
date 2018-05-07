// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import VueLazyload from 'vue-lazyload'
// 引入配置的router文件
import router from './router/index';
import iView from 'iview';
import 'iview/dist/styles/iview.css';


Vue.use(iView);

Vue.config.productionTip = false

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
