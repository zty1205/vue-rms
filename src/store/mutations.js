import * as types from './mutations-type'
import { fetchImages } from '../api/image'

const mutations = {

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
