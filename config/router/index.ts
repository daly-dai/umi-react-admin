const routes = [
  {
    title: '登录',
    path: '/login',
    component: './login',
    layout: false,
  },
  {
    path: '/',
    component: '@/layouts/index',
    layout: false,
    routes: [
      {
        title: '首页',
        path: '/',
        redirect: '/home',
        meta: {
          layout: 'headFooterLayout',
        },
      },
      {
        title: '首页',
        path: '/home',
        component: './home-page',
        meta: {
          layout: 'headFooterLayout',
        },
      },
      {
        title: '列表页',
        path: '/aside',
        component: './aside',
        meta: {
          layout: 'headAsideLayout',
        },
      },
      {
        title: '详情页',
        path: '/detail',
        component: './detail',
        meta: {
          layout: 'headLayout',
        },
      },
    ],
  },
];



export default routes;
