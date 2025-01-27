// import { gaEvent } from '@/utils/gtag';

import styles from './header.module.scss';
import { API } from '@/utils/api';
import { HeaderProps } from '../../../types/props/header.types';
import HeaderDesktopLayout from './components/headerDesktop/headerDesktopLayout';
import HeaderTabletLayout from './components/headerTablet/headerTabletLayout';
import HeaderMobileLayout from './components/headerMobile/headerMobiletLayout';
const Header: React.FC<HeaderProps> = async () => {
  const api = new API();
  const categories = await api.get(`category/find`, { cache: 'force-cache' });
  return (
    <div className={styles.wrapper}>
      <HeaderDesktopLayout menuList={categories} />
      <HeaderTabletLayout menuList={categories} />
      <HeaderMobileLayout menuList={categories} />
    </div>
  );
};

export default Header;
