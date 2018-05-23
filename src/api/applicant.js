import axios from 'axios'

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

export const changeApplicantStatus = (qid, status) => {
  return new Promise((resolve, reject)=> {
    let url = '/api/applicant/changeStatus'
    axios.post(url,{
      qid: qid,
      status: status
    }).then (res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export const addApplicant = (data) => {
  return new Promise((resolve, reject)=> {
    let url = '/api/applicant/add'
    console.log(data)
    axios.post(url,data).then (res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
