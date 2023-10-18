import { useEffect, useState } from 'react';
import appStore from '@/store/app';
import { useSnapshot } from 'valtio';
import { history, useLocation } from '@umijs/max';
import { fuzzyQueryTree } from '@/utils/tree';
import publicStore from '@/store/public';

// 用户权限中心接入后再写业务逻辑
const useAuth = () => {
  const [auth, setAuth] = useState(true);

  const location = useLocation();

  const appState = useSnapshot(appStore.state);
  const publicState = useSnapshot(publicStore.state);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const routeMatch = (): boolean => {
    if (!auth) return false;

    const { pathname } = location;

    const { authTree } = publicState;

    // 授权管理页面特殊判断
    if (pathname?.includes('/user-center/platform-auth/authorization')) {
      return true;
    }

    const pathList = fuzzyQueryTree(authTree, pathname, 'key');

    if (!pathList?.length) return false;

    return true;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initAuth = () => {
    const token = localStorage.getItem('token');
    // 用户权限中心未登录
    if (!token) {
      setAuth(false);
      history.push('/login');
      return;
    }

    // 登录但未初始化
    if (!appState.token && token) {
      appStore.setToken(token);
      setAuth(true);
      return;
    }

    // 没有该路由或者该用户没有该路由的权限
    // 暂不做路由判断
    // if (!routeMatch()) {
    //   setAuth(false);
    //   return;
    // }

    setAuth(true);
  };

  useEffect(() => {
    initAuth();
  }, [appState.token, location.pathname]);

  return { auth };
};

export default useAuth;
