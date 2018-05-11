import axios from '../utils/axiosService'

// 获取工资信息
export const fetchWage = (eid) => {
  // console.log('fetchEmployeeList')
  // return axios.get(`/api/employeeList?start=${start}&num=${num}`)
  let url = '/wage/find'   // 已经有webpack代理了
  return new Promise((resolve, reject)=> {
    axios.get(url,{
      params: {
        eid: eid,
      }
    }).then((res)=>{
      console.log('in axios get')
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}
