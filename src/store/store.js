import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isHome: true,
    // token: localStorage.getItem('vn-token'),
    user: { // 登录者信息
      uid: '',
      name: '',
      password: '',
      authorization: '',
      avatar_url: ''
    },
    showSignDialog: false,
    current: 1,
    all: 0,
    limitNum: 15,
    images: [],
    // 记录获取图片的次数，用于滚动加载
    fetchCount: 1,
    // 判断是否在加载，防止滚动加载多次
    isFetch: false
  },
  mutations,
  actions,
  getters
})

export default store
