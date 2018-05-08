// import axios from 'axios'
import axios from '../utils/axiosService'
export const fetchEmployeeList = () => {
  console.log('fetchEmployeeList')
  // return axios.get(`/api/employeeList?start=${start}&num=${num}`)
  let url = '/employee/list'   // 已经有webpack代理了
  return new Promise((resolve, reject)=> {
    axios.get(url).then((res)=>{
      console.log('in axios get')
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

export const addEmployee = (data) => {
  console.log('addEmployee')
  // return axios.get(`/api/employeeList?start=${start}&num=${num}`)
  // let url = '/employee/add'  不行 代理失败了
  // let url = 'http://localhost:4000/employee/add'
  let url = '/employee/add'
  return new Promise((resolve, reject)=> {
    axios.post(url,data).then((res)=>{
      console.log('in axios get')
      resolve(res)
    }).catch((err)=>{
      console.log(err)
      resolve(err)
      // reject(err)
    })
  })
}
