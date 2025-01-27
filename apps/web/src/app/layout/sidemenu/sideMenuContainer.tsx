'use client';
import { FC, useEffect, useState, Fragment } from 'react';
import type {
  SideMenuContainerProps,
  SideMenu,
} from '../../../types/props/menu.types';
import { Category } from '../../../types/props/category.types';
import { useMenu } from '@/hooks/useMenu';
import { toggleSideMenu } from './menuSlice';
import { useAppDispatch } from '@/store/reduxHooks';
import SideMenuSlide from './sideMenu';
const SideMenuContainer: FC<SideMenuContainerProps> = ({ categories }) => {
  const menuReducer = useMenu();
  const dispatch = useAppDispatch();
  const [menuList, setMenuList] = useState<SideMenu[]>([]);
  useEffect(() => {
    try {
      let newMenuList: SideMenu[] = [];
      if (categories?.length > 0) {
        categories.forEach((category: Category) => {
          let newMenuItem = { ...category, isOpen: false };
          newMenuList.push(newMenuItem);
        });
        setMenuList(newMenuList);
      } else {
      }
    } catch (error: any) {
      console.log('Error Message=>', error?.message);
    }
  }, [categories]);

  const handleMenuItemClick = (index: number) => {
    let newMenuList: SideMenu[] = [];
    menuList.forEach((menuItem, menuIndex) => {
      let newIsOpen: boolean;
      if (menuIndex === index) {
        newIsOpen = !menuList[index].isOpen;
      } else {
        newIsOpen = false;
      }
      newMenuList.push({ ...menuItem, isOpen: newIsOpen });
    });
    setMenuList(newMenuList);
  };
  const displaySideMenu = () => {
    dispatch(toggleSideMenu(false));
  };
  return (
    <Fragment>
      <SideMenuSlide
        menuList={menuList}
        displaySideMenu={displaySideMenu}
        handleMenuItemClick={handleMenuItemClick}
        isSideMenuOpen={menuReducer.isSideMenuOpen}
      />
    </Fragment>
  );
};
export default SideMenuContainer;
