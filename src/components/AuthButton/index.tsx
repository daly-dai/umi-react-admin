import { Button, ButtonProps } from 'antd';
import { FC } from 'react';

interface AuthProps {
  authCode: string;
}

type AuthButtonProps = AuthProps & Partial<ButtonProps>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AuthButton: FC<AuthButtonProps> = ({ authCode, children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default AuthButton;
