import { Outlet, history } from '@umijs/max';
import { ReactElement } from 'react';

import './index.less';
import useAuth from '@/hooks/useAuth';

import HeadAsideLayout from './layout/head-aside-layout';
import AsideLayout from './layout/aside-layout';
import HeadLayout from './layout/head-layout';
import HeadFooterLayout from './layout/head-footer-layout';
import useRouterMeta from '@/hooks/useRouterMeta';
import { LayoutTypes } from '@/hooks/useRouterMeta/types';

const Layouts = () => {
  const { auth } = useAuth();
  const { metaState } = useRouterMeta();

  if (!auth) {
    history.push('/login');
    return;
  }

  const renderLayout = () => {
    const layoutMap: Record<LayoutTypes, ReactElement> = {
      headLayout: (
        <HeadLayout>
          <Outlet />
        </HeadLayout>
      ),
      headFooterLayout: (
        <HeadFooterLayout>
          <Outlet />
        </HeadFooterLayout>
      ),
      headAsideLayout: (
        <HeadAsideLayout>
          <Outlet />
        </HeadAsideLayout>
      ),
      asideLayout: (
        <AsideLayout>
          <Outlet />
        </AsideLayout>
      ),
      empty: <Outlet></Outlet>,
    };

    if (!metaState?.layout) return layoutMap.headAsideLayout;

    return layoutMap[metaState?.layout as LayoutTypes];
  };

  return renderLayout();
};

export default Layouts;
