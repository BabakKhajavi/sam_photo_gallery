import {
  faList,
  faCartShopping,
  faGears,
} from '@fortawesome/free-solid-svg-icons';
import { MenuType } from './interfaces';
import { DashboardPaths } from './enums';
export const menuPath: MenuType[] = [
  {
    id: 0,
    title: 'Contents',
    path: DashboardPaths.CATEGORY,
    icon: faList,
    isOpen: false,
    subMenu: [
      {
        id: 0,
        title: 'Category',
        pageTitle: 'Category List',
        path: DashboardPaths.CATEGORY,
        isSelected: false,
      },
      {
        id: 1,
        title: 'Subcategory',
        pageTitle: 'Subcategory List',
        path: DashboardPaths.SUBCATEGORY,
        isSelected: false,
      },
      {
        id: 2,
        title: 'Jumbo',
        path: DashboardPaths.JUMBOTRON,
        pageTitle: 'Jumbotron List',
        isSelected: false,
      },

      {
        id: 3,
        title: 'Welcome',
        pageTitle: 'Welcome List',
        path: DashboardPaths.WELCOME,
        isSelected: false,
      },
      {
        id: 4,
        title: 'Gallery',
        pageTitle: 'Gallery List',
        path: DashboardPaths.GALLERY,
        isSelected: false,
      },
      {
        id: 5,
        title: 'Approach',
        pageTitle: 'Approach List',
        path: DashboardPaths.APPROACH,
        isSelected: false,
      },

      {
        id: 6,
        title: 'Review',
        pageTitle: 'Review List',
        path: DashboardPaths.REVIEW,
        isSelected: false,
      },
      {
        id: 7,
        title: 'Advertise',
        pageTitle: 'Advertise List',
        path: DashboardPaths.ADVERTISEMENT,
        isSelected: false,
      },
    ],
  },
  {
    id: 1,
    title: 'Requests',
    path: DashboardPaths.REQUEST,
    icon: faCartShopping,
    isOpen: false,
    subMenu: [
      {
        id: 0,
        title: 'Find Us',
        pageTitle: 'Find Us List',
        path: DashboardPaths.FIND_US,
        isSelected: false,
      },
      {
        id: 1,
        title: 'Cities',
        pageTitle: 'Cities List',
        path: DashboardPaths.CITY,
        isSelected: false,
      },
      {
        id: 2,
        title: 'Requests',
        pageTitle: 'Request List',
        path: DashboardPaths.REQUEST,
        isSelected: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Settings',
    path: DashboardPaths.USER,
    icon: faGears,
    isOpen: false,
    subMenu: [
      {
        id: 0,
        title: 'Users',
        pageTitle: 'Users List',
        path: DashboardPaths.USER,
        isSelected: false,
      },
      {
        id: 1,
        title: 'Contact',
        pageTitle: 'Contact List',
        path: DashboardPaths.CONTACT,
        isSelected: false,
      },
    ],
  },
];
