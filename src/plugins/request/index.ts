import { history } from '@umijs/max';
import { message } from 'antd';

// 获取请求头所需要的token
export const getToken = () => {
  const token = localStorage.getItem('token');
  return { Authorization: token };
};

// 登录过期时执行的方法
export const tokenFailure = (response: any) => {
  message.error(response.msg);
  localStorage.setItem('token', '');
  history.push('/login');
  message.destroy();
};
