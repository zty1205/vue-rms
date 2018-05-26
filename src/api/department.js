import axios from '../utils/axiosService'
export const fetchDepartmentList = () => {
  // console.log('fetch department')
  let url = '/department/list'   // 已经有webpack代理了
  return new Promise((resolve, reject)=> {
    axios.get(url).then(res=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}
// info 包含 parent_id 该部门的父部门id, name, range部门等级
export const addDepartment = (info) => {
  // console.log('add department')
  let url = '/department/add'
  return new Promise((resolve, reject)=> {
    axios.post(url,info).then(res=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

export const findDepartmentByID = (did) => {
  let url = '/department/get'
  return new Promise((resolve, reject)=> {
    axios.get(url,{params:{
        did: did
      }
    }).then(res=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}
