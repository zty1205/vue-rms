import axios from 'axios'

export const fetchEmployeeList = () => {
  console.log('fetchEmployeeList')
  // return axios.get(`/api/employeeList?start=${start}&num=${num}`)
  let url = 'http://localhost:4000/employee/list'
  return new Promise((resolve, reject)=> {
    axios.get(url).then((res)=>{
      console.log('in axios get')
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}
