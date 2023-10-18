import { FC, ReactNode } from 'react';

import styles from './index.less';
import LayoutHeader from '@/layouts/components/layout-head';
import Footer from '@/layouts/components/footer';

interface HeadFooterLayoutProps {
  children: ReactNode;
}

const HeadFooterLayout: FC<HeadFooterLayoutProps> = ({ children }) => {
  return (
    <div className={styles['page']}>
      <div className={styles['page-head']}>
        <LayoutHeader />
      </div>
      <div className={styles['page-content']}>{children}</div>
      <div className={styles['page-footer']}>
        <Footer />
      </div>
    </div>
  );
};

export default HeadFooterLayout;
