import axios from '../utils/axiosService'
export const fetchImages = (count) => {
  console.log('all')
  return axios.get(`/api/images?count=${count}`)
}

export const fetchImageById = (id) => {
  console.log('single get')
  return axios.get(`/api/images/${id}`)
}
