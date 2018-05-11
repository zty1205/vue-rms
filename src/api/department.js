import axios from '../utils/axiosService'
export const fetchDepartmentList = () => {
  console.log('fetch department')
  let url = '/department/list'   // 已经有webpack代理了
  return new Promise((resolve, reject)=> {
    axios.get(url).then(res=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}
