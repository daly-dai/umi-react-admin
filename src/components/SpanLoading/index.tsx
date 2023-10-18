import React, { FC } from 'react';
import loading from '@/assets/images/loading.svg';
import { Spin } from 'antd';
import { SpinProps, SpinSize } from 'antd/es/spin';

type LoadingProps = {
  size: SpinSize;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
} & SpinProps;

const SpanLoading: FC<LoadingProps> = ({
  size = 'small',
  imgProps,
  ...props
}) => {
  return (
    <Spin
      indicator={<img src={loading} {...imgProps} />}
      size={size}
      {...props}
    />
  );
};

export default SpanLoading;
