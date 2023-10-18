export default {
  // 用户权限中心相关配置
  '/userCenterMicro': {
    target: 'http://10.0.77.31:15351/userCenterMicro/',
    changeOrigin: true,
    pathRewrite: { '^/userCenterMicro': '' },
  },
  // 用户权限中心相关配置
  '/userCenterApi': {
    target: 'http://10.0.77.31:15351/',
    changeOrigin: true,
    pathRewrite: { '^/userCenterApi': '' },
  },
};
