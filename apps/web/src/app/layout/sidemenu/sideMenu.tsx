'use client';
import { FC, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Collapse } from '@mui/material';
import Slide from '@mui/material/Slide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import styles from './sideMenu.module.scss';

interface SideMenuSlideProps {
  menuList: any;
  displaySideMenu: () => void;
  handleMenuItemClick: (index: number) => void;
  isSideMenuOpen: boolean;
}

const SideMenuSlide: FC<SideMenuSlideProps> = ({
  menuList,
  displaySideMenu,
  handleMenuItemClick,
  isSideMenuOpen,
}) => {
  return (
    <div className={styles.wrapper}>
      <Slide
        in={isSideMenuOpen}
        direction={'right'}
        style={{
          backgroundColor: '#e8e8e8',
          height: '100vh',
        }}
      >
        <div>
          <div className={styles.header_wrapper}>
            <Image
              src={'/images/main-logo.webp'}
              alt="a golden closet logo"
              width={245}
              height={50}
              priority
              className="image"
            />
            <FontAwesomeIcon
              className={styles.close_icon}
              icon={faTimes}
              onClick={displaySideMenu}
            ></FontAwesomeIcon>
          </div>
          <div className={styles.menu_wrapper}>
            <div className={styles.menu_item} onClick={displaySideMenu}>
              <Link href="/" replace>
                Home
              </Link>
            </div>
            {menuList.map((item, index) => (
              <Fragment key={`submenu-item-${index}`}>
                <div
                  className={styles.menu_item}
                  key={item.category_id}
                  onClick={() => handleMenuItemClick(index)}
                >
                  <div>{item.category_name}</div>
                  <FontAwesomeIcon
                    className={styles.chevron_icon}
                    icon={item.isOpen ? faChevronDown : faChevronRight}
                    onClick={() => handleMenuItemClick(index)}
                  />
                </div>
                {item.subcategories.length > 0 && (
                  <Collapse in={item.isOpen}>
                    <div className={styles.submenu_wrapper}>
                      {item.subcategories.map((subMenuItem, i) => (
                        <div
                          key={`submenu-item-${i}`}
                          onClick={displaySideMenu}
                          className={styles.submenu_item}
                        >
                          <Link
                            className={styles.custom_link}
                            href={`/subcategory/${subMenuItem.subcategory_id}`}
                            replace
                          >
                            {subMenuItem.subcategory_name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </Collapse>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </Slide>
    </div>
  );
};
export default SideMenuSlide;
