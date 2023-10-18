import { history } from '@umijs/max';
import { Menu } from 'antd';

const HEADER_MENU = [
  {
    key: '/home',
    label: '首页',
  },
  {
    key: '/aside',
    label: '侧边栏页面',
  },
  {
    key: '/detail',
    label: '详情页',
  },
];

const HeaderMenu = () => {
  return (
    <Menu
      onClick={(e: any) => {
        history.push(e.key);
      }}
      style={{ marginLeft: '15px' }}
      theme="light"
      mode="horizontal"
      items={HEADER_MENU}
    />
  );
};

export default HeaderMenu;
