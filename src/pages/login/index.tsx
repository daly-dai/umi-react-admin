import { xwc as userSvg } from '@/assets/images';
import SvgIcon from '@/components/SvgIcon';
import { USER_ACCOUNT } from '@/constants';
import appStore from '@/store/app';
import { createCode } from '@/utils/tools';
import { history } from '@umijs/max';
import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import './index.less';

interface LoginProps {
  account: string;
  password: string;
}
const Login: React.FC = () => {
  const [form] = Form.useForm();

  /**
   * 登录逻辑处理
   * @param data
   * @returns
   */
  const handleLogin = async (data: LoginProps) => {
    await form.validateFields();

    if (data.password !== USER_ACCOUNT.password) {
      message.error('请输入正确的密码');
      return;
    }

    appStore.setToken(createCode(24));

    appStore.setUserInfo({
      userName: 'admin',
    });

    message.success('登录成功');

    history.push('/home');
  };

  useEffect(() => {
    form.setFieldsValue({
      account: 'admin',
      password: 'admin',
    });
  }, []);

  const renderLoginForm = () => {
    return (
      <Form<LoginProps>
        form={form}
        onFinish={handleLogin}
        labelCol={{ span: 4 }}
        labelAlign="left"
      >
        <Form.Item
          rules={[{ required: true, message: '请输入用户名' }]}
          label="账号"
          name="account"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: '请输入密码' }]}
          label="密码"
          name="password"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
            size="large"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className="login">
      <div className="login-bg">
        <SvgIcon name="bg" className="cl-svg"></SvgIcon>
      </div>
      <div className="login-center">
        <div className="login-center-left">
          <img src={userSvg}></img>
        </div>
        <div className="login-center-right">{renderLoginForm()}</div>
      </div>
    </div>
  );
};

export default Login;
