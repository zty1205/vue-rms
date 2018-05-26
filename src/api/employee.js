// import axios from 'axios'
import axios from '../utils/axiosService'

// 分页获取员工数据
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
      // console.log('in axios get')
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

// 条件查询
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

export const findEmployeeById = (eid) => {
  // console.log(params)
  let url = '/employee/findById'   // 已经有webpack代理了
  return new Promise((resolve, reject)=> {
    axios.get(url,{
      params: {
        eid: eid
      }
    }).then((res)=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

// 添加员工
export const addEmployee = (data) => {
  // console.log('addEmployee')
  // return axios.get(`/api/employeeList?start=${start}&num=${num}`)
  // let url = '/employee/add'  不行 代理失败了
  // let url = 'http://localhost:4000/employee/add'
  let url = '/employee/add'
  return new Promise((resolve, reject)=> {
    axios.post(url,data).then((res)=>{
      // console.log('in axios get')
      resolve(res)
    }).catch((err)=>{
      console.log(err)
      reject(err)
      // reject(err)
    })
  })
}

// 更新员工状态
export const changeEmployeeStatus = (eid,status) => {
  // console.log('addEmployee')
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
      // console.log('in axios get')
      resolve(res)
    }).catch((err)=>{
      console.log(err)
      // resolve(err)
      reject(err)
    })
  })
}

// 删除已离职员工
export const deleteEmployee = (eid) => {
  console.log('delete employee')
  let url = '/employee/delete/' + eid;
  console.log(url)
  return new Promise((resolve, reject)=> {
    axios.get(url).then(res => {
      resolve(res)
    }).catch((err)=>{
      console.log(err)
      reject(err)
    })
  })
}

// 修改员工信息
export const updateEmployee = (employee) => {
  let url = '/employee/update'
  return new Promise((resolve, reject)=> {
    axios.post(url,employee).then(res => {
      resolve(res)
    }).catch((err)=>{
      console.log(err)
      reject(err)
    })
  })
}
