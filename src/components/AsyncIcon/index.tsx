import React, { FC } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { IconFontProps } from '@ant-design/icons/lib/components/IconFont';

const ICONFONT_URL = '//at.alicdn.com/t/a/font_4034944_tmaekkb1sul.js';
const prefix = 'icon-';

type CommonIconProps = {
  type: string;
} & IconFontProps;

const AsyncIcon: FC<CommonIconProps> = ({ type, ...restProps }) => {
  const iconType = new RegExp(prefix).test(type) ? type : `${prefix}${type}`;

  const IconElement = createFromIconfontCN({
    scriptUrl: ICONFONT_URL,
  });

  return <IconElement {...restProps} type={iconType} />;
};

export default AsyncIcon;
