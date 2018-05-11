import Vue from 'vue';
import Router from 'vue-router';
import images from '@/components/image/ImageList';
import ImageBanner from '@/components/image/ImageBanner';
import NotePad from '@/components/tools/NotePad';
import clock from '@/components/tools/clock';
import employeeList from '@/components/employee/employeeList';
import employeeAdd from '@/components/employee/employeeAdd';
import departmentList from '@/components/department/departmentList';
import applicant from '@/components/applicant/applicant';
import login from '@/components/views/login';
import home from '@/components/views/home';
import index from '@/components/index/index';
import myself from '@/components/mine/myself';
import AttendSalary from '@/components/mine/AttendSalary';
// const login = resolve => require(['../components/views/login.vue'], resolve)

Vue.use(Router)
// 路由最好分开写
export default new Router({
  mode:'history',
  base:__dirname,
  routes: [
    // 默认展示index界面 重定向
    {path: '/',redirect: '/login'},
    // {
    //   path: '/login',
    //   component: login
    // },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: home,
      children:[
        {path: '/home/',redirect: '/home/index'},
        // 二级路由如果写成 / index 就会变成一件路由 即使在children内
        {
          path: 'index',
          component: index
        },
        {
          path: 'images',
          component: images,
          children: [{
            path: ':id',
            component: ImageBanner
          }]
        },
        {
          path: 'employee/list',
          component: employeeList
        },
        {
          path: 'employee/add',
          component: employeeAdd
        },
        {
          path: 'department/list',
          component: departmentList
        },
        {
          path: 'applicant',
          component: applicant
        },
        {
          path: 'NotePad',
          component: NotePad
        },
        {
          path: 'clock',
          component: clock
        },
        {
          path: 'myself',
          component: myself
        },
        {
          path: 'AttendSalary',
          component: AttendSalary
        }
      ]
    }
  ]
})

