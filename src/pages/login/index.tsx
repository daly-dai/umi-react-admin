import React from 'react';
import './index.less';
import { xwc as userSvg } from '@/assets/images';
import { Button, Form, Input } from 'antd';
import { USER_INFO } from '@/constants';

interface LoginProps {
  userName: string;
  password: string;
}
const Login: React.FC = () => {
  const [form] = Form.useForm();

  const handleLogin = async(data:LoginProps) => {
    await form.validateFields();

    if(data === USER_INFO) {
      
    }

  };

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
          label="用户名"
          name="userName"
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
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className="login">
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
