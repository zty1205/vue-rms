import axios from 'axios'

// function getApply(applicantId) {
//   let url = '/applicant/apply'
//   return axios.get(url,{
//     params: {
//       applicantId: applicantId
//     }
//   })
// }

// function getAudit(auditorId) {
//   let url = '/applicant/audit'
//   return axios.get(url,{
//     params: {
//       auditorId: auditorId
//     }
//   })
// }

export const getApply = (applicantId)=>{
let url = '/api/applicant/apply'
  return new Promise((resolve, reject)=> {
    axios.get(url,{
      params: {
        applicantId: applicantId
      }
    }).then(res=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

export const getAudit = (auditorId) => {
  let url = '/api/applicant/audit'
  return new Promise((resolve, reject)=> {
    axios.get(url,{
      params: {
        auditorId: auditorId
      }
    }).then(res=>{
      resolve(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

export const fetchApplicantList = (aid) => {
  return new Promise((resolve, reject)=> {
    axios.all([getApply(aid),getAudit(aid)]).then(axios.spread((apply,audit)=>{
      // console.log(apply)
      // console.log(audit)
      resolve(apply,audit)
    }))
  })

}
