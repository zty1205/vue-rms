import * as types from './mutations-type'
import { fetchImages } from '../api/image'
import User from '../api/user'

const mutations = {
// 用户登录 存储登录人员信息
  [types.SET_LOGIN_USER] (state, data) {
      state.user = data
  },

  // 保存token
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_MESSAGE] (state, message) {
    state.message = message
  },
  [types.FETCH_IMAGES] (state, count) {
    fetchImages(count).then(res => {
      state.images = res.data
    }).then(() => {
      state.isFetch = false
    })
  }
}

export default mutations
