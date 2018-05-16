// import axios from 'axios'
import axios from '../utils/axiosService'
export const fetchEmployeeList = (page,size) => {
  // console.log('fetchEmployeeList')
  // return axios.get(`/api/employeeList?start=${start}&num=${num}`)
  let url = '/employee/list'   // 已经有webpack代理了
  return new Promise((resolve, reject)=> {
    axios.get(url,{
      params: {
        page: page,
        size: size
      }
    }).then((res)=>{
      console.log('in axios get')
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

// 查询
export const findEmployee = (em) => {

  let params = {}
  if(em.eid){
    params.eid =em.eid
  }
  if(em.name){
    params.name =em.name
  }
  if(em.department && em.department != '0'){
    params.department =em.department
  }
  // console.log(params)
  let url = '/employee/find'   // 已经有webpack代理了
  return new Promise((resolve, reject)=> {
    axios.get(url,{
      params
    }).then((res)=>{
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

// 更新员工状态
export const changeEmployeeStatus = (eid,status) => {
  console.log('addEmployee')
  // return axios.get(`/api/employeeList?start=${start}&num=${num}`)
  // let url = '/employee/add'  不行 代理失败了
  // let url = 'http://localhost:4000/employee/add'
  let url = '/employee/changeStatus'
  return new Promise((resolve, reject)=> {
    axios.post(url,{
      // params: {
        eid: eid,
        status: status
      // }
    }).then((res)=>{
      console.log('in axios get')
      resolve(res)
    }).catch((err)=>{
      console.log(err)
      resolve(err)
      // reject(err)
    })
  })
}
