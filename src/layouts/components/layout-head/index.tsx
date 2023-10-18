import { Button, Popover } from 'antd';
import { useSnapshot } from 'valtio';
import { history, useLocation } from '@umijs/max';
import { useMemo } from 'react';

import { logo, user, homeLogo } from '@/assets/images';
import styles from './index.less';
import appStore from '@/store/app';
import HeaderMenu from '../header-menu';

const LayoutHeader = () => {
  const appState = useSnapshot(appStore.state);

  const location = useLocation();

  const hideHomeMenu = useMemo(() => {
    const { pathname } = location;

    if (pathname === '/home' || pathname === '/') return true;

    return false;
  }, [location.pathname]);

  return (
    <div className={styles['header']}>
      <div className={styles['header-left']}>
        <div className={styles['header-left-logo']}>
          <img src={logo}></img>
          数字杭州
        </div>
        <div className={styles['header-split']}></div>
        {!hideHomeMenu && (
          <div
            className={styles['header-bg-icon']}
            onClick={() => history.push('/home')}
          >
            <img
              src={homeLogo}
              className={styles['header-bg-icon-icon']}
              alt=""
            />
          </div>
        )}

        <HeaderMenu />
      </div>

      <div className={styles['header-right']}>
        <div className={styles['header-split']}></div>
        <Popover
          content={
            <Button
              type="link"
              onClick={() => {
                appStore.logOut();
              }}
            >
              退出登录
            </Button>
          }
        >
          <div className={styles['user-message']}>
            <img src={user} />
            <div>{appState?.userInfo?.username || '未登录'}</div>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default LayoutHeader;
