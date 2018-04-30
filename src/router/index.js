import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index/index';
import images from '@/components/image/ImageList';
import ImageBanner from '@/components/image/ImageBanner';
import NotePad from '@/components/notepad/NotePad';
import employeeList from '@/components/employee/employeeList';
// import login from '@/components/views/login';
// const login = resolve => require(['../components/views/login.vue'], resolve)

Vue.use(Router)
// 路由最好分开写
export default new Router({
    mode:'history',
    base:__dirname,
    routes: [
      // 默认展示index界面 重定向
      {path: '/',redirect: '/index'},
      // {
      //   path: '/login',
      //   component: login
      // },
      {
        path: '/index',
        component: index
      },
      {
        // path: '/images',
        path: '/images',
        component: images,
        children: [{
          path: ':id',
          component: ImageBanner
        }]
      },
      {
        // path: '/images',
        path: '/employee/list',
        component: employeeList
        // children: [{
        //   path: 'list',
        //   component: employeeList
        // }]
      },
      {
        path: '/NotePad',
        component: NotePad
      }

    ]
})
