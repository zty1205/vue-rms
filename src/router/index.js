import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index/index';
import images from '@/components/image/ImageList';
import ImageBanner from '@/components/image/ImageBanner';
import NotePad from '@/components/notepad/NotePad';

Vue.use(Router)

export default new Router({
    mode:'history',
    base:__dirname,
    routes: [
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
        path: '/NotePad',
        component: NotePad
      },
      // 默认展示index界面 重定向
      {path: '/',redirect: '/index'}
    ]
})
