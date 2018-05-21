"use strict"

// 可登录的用户信息
import axios from '../utils/axiosService';

const User = {
  // 没有 promise 封装
  // login(data){
  //   console.log('in src api user login');
  //   return axios.get('/user/login',data);   // 这样子因为 所以得到的就是后台返回的res.json  或res.send
  // }
  login(data){
    return new Promise((resolve,reject) => {   // 这样 得到的就是封装后的 数据 res.send 或 json 保存在data中
      axios.post('/user/login',data).then((res) => {
        console.log('promise res' + res);
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
 // 注册
  register(data){
    return new Promise((resolve,reject) => {   // 这样 得到的就是封装后的 数据 res.send 或 json 保存在data中
      axios.post('/user/register',data).then((res) => {
        // console.log('promise res' + res);
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
};

export default User;
