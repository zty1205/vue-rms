import axios from '../utils/axiosService'
// import axios from 'axios'
export const fetchImages = (count) => {
  console.log('all')
  return axios.get(`/images/list?count=${count}`)
}

export const fetchImageById = (id) => {
  console.log('single get')
  return axios.get(`/images/${id}`)
}
