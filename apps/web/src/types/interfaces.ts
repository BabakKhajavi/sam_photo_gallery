import { ReactNode } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';

export interface Subcategory {
  subcategory_id: number;
  subcategory_name: string;
}
export interface Category {
  category_id: number;
  category_name: string;
  subcategories: Subcategory[];
}
export interface CustomButtonProps {
  children?: ReactNode;
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  color?: string;
  hoverBackColor?: string;
  hoverTextColor?: string;
  disabledBackColor?: string;
  disabledTextColor?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  isGolden?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
  tabIndex?: number;
}

export interface ButtonInputProps {
  children?: ReactNode;
  padding?: string;
  margin?: string;
  backgroundcolor?: string;
  color?: string;
  height?: string;
  hoverbackcolor?: string;
  hovertextcolor?: string;
  disabledbackcolor?: string;
  disabledtextcolor?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  handleUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearFile: () => void;
  setFieldValue: (field: string, value: any) => void;
  fileName?: string | null;
  placehoder?: string;
  isOptional?: boolean;
}
export interface SubscribeProps {}
export interface HeaderProps {
  categories: Category[];
}
export interface HeaderLayoutProps {
  menuList: Category[];
  toggleSideMenuChecked?: () => void;
}
export interface IJumbotronProps {
  jumbotron_id: number;
  title: string;
  subtitle: string;
  media: string;
  is_main_jumbotron: boolean;
  subcategory_id: number;
  className: string;
}
export interface IChildrenProps {
  children?: ReactNode;
}
export interface IAvertiseProps {
  font_family1: string | '';
  font_family2: string | '';
  font_family3: string | '';
  font_family4: string | '';
  font_family5: string | '';
  font_size1: string | '';
  font_size2: string | '';
  font_size3: string | '';
  font_size4: string | '';
  font_size5: string | '';
  color1: string | '';
  color2: string | '';
  color3: string | '';
  color4: string | '';
  color5: string | '';
  font_weight1: string | '';
  font_weight2: string | '';
  font_weight3: string | '';
  font_weight4: string | '';
  font_weight5: string | '';
  margin1: string | '';
  margin2: string | '';
  margin3: string | '';
  margin4: string | '';
  margin5: string | '';
  is_blinking1: boolean | null;
  is_blinking2: boolean | null;
  is_blinking3: boolean | null;
  is_blinking4: boolean | null;
  is_blinking5: boolean | null;
  des1: string | '';
  des2: string | '';
  des3: string | '';
  des4: string | '';
  des5: string | '';
}

export interface MenuInitializedState {
  isSideMenuOpen: boolean;
  categories: Category[];
  isGettingCategories: boolean;
}
export type CategoryAsyncThunk = AsyncThunk<Category[], any, any>;
// Horizontal Menu
export type Menu = Category[];
export interface MenuProps extends MenuInitializedState {}
// Side Menu
export interface SideMenu extends Category {
  isOpen: boolean;
}
export interface SideMenuSlideProps {
  menuList: SideMenu[];
  displaySideMenu: () => void;
  handleMenuItemClick: (index: number) => void;
  isSideMenuOpen: boolean;
}
export interface SideMenuContainerProps {
  categories: Category[];
}
