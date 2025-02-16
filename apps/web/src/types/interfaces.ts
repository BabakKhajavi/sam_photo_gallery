import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface PageMapState {
  pageTitle: string;
  referencePath: string;
  referencePageTitle: string;
}

export interface SubMenuType {
  id: number;
  title: string;
  pageTitle: string;
  path: string;
  isSelected: boolean;
}

export interface MenuType {
  id: number;
  title: string;
  path: string;
  icon: IconDefinition;
  isOpen: boolean;
  subMenu: SubMenuType[];
}
