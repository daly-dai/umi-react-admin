export async function qiankun() {
  // 用户权限中心配置-》由后端地址提供
  const loginConfig = {};

  return {
    apps: [
      {
        name: 'userCenter', // 唯一名称，自定义
        entry: '/userCenterMicro', // 用户权限中心子应用访问地址
        props: {
          ...loginConfig,
          userCenterApiPrefix: '/userCenterApi',
        },
      },
    ],
    routes: [
      {
        path: '/user-center/*', // 访问微应用的路由前缀，可自定义
        microApp: 'userCenter', // apps中配置的微应用名称
      },
    ],
  };
}
