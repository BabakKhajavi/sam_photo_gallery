import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { Layout } from '../modules/layout';
import { DashboardPaths } from '../types';

const AdvertisementDetailContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.AdvertisementDetailContainer,
  })),
);
const AdvertisementListContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.AdvertisementListContainer,
  })),
);
const ApproachDetailContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.ApproachDetailContainer,
  })),
);
const ApproachListContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.ApproachListContainer,
  })),
);
const CategoryDetailContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.CategoryDetailContainer,
  })),
);
const CategoryListContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.CategoryListContainer,
  })),
);
const CityDetailContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.CityDetailContainer,
  })),
);
const CityListContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.CityListContainer,
  })),
);
const ContactDetailContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.ContactDetailContainer,
  })),
);
const ContactListContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.ContactListContainer,
  })),
);
const FindUsDetailContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.FindUsDetailContainer,
  })),
);
const FindUsListContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.FindUsListContainer,
  })),
);
const GalleryDetailContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.GalleryDetailContainer,
  })),
);
const GalleryListContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.GalleryListContainer,
  })),
);
const JumbotronDetailContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.JumbotronDetailContainer,
  })),
);
const JumbotronListContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.JumbotronListContainer,
  })),
);
const RequestDetailContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.RequestDetailContainer,
  })),
);
const RequestListContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.RequestListContainer,
  })),
);
const ReviewDetailContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.ReviewDetailContainer,
  })),
);
const ReviewListContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.ReviewListContainer,
  })),
);
const SubcategoryDetailContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.SubcategoryDetailContainer,
  })),
);
const SubcategoryListContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.SubcategoryListContainer,
  })),
);
const WelcomeDetailContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.WelcomeDetailContainer,
  })),
);
const WelcomeListContainer = lazy(() =>
  import('../modules').then((module) => ({
    default: module.WelcomeListContainer,
  })),
);

export const routes: RouteObject[] = [
  {
    path: DashboardPaths.ROOT,
    element: <Layout />,
    children: [
      {
        path: DashboardPaths.ROOT,
        element: <RequestListContainer />,
      },
      {
        path: DashboardPaths.REQUEST,
        element: <RequestListContainer />,
      },
      {
        path: `/${DashboardPaths.REQUEST_DETAIL}/:id`,
        element: <RequestDetailContainer />,
      },
      {
        path: DashboardPaths.ADVERTISEMENT,
        element: <AdvertisementListContainer />,
      },
      {
        path: `/${DashboardPaths.ADVERTISEMENT_DETAIL}/:id`,
        element: <AdvertisementDetailContainer />,
      },
      {
        path: DashboardPaths.CATEGORY,
        element: <CategoryListContainer />,
      },
      {
        path: `/${DashboardPaths.CATEGORY_DETAIL}/:id`,
        element: <CategoryDetailContainer />,
      },
      {
        path: DashboardPaths.SUBCATEGORY,
        element: <SubcategoryListContainer />,
      },
      {
        path: `/${DashboardPaths.SUBCATEGORY}/:id`,
        element: <SubcategoryDetailContainer />,
      },
      { path: DashboardPaths.JUMBOTRON, element: <JumbotronListContainer /> },
      {
        path: `/${DashboardPaths.JUMBOTRON_DETAIL}/:id`,
        element: <JumbotronDetailContainer />,
      },
      { path: DashboardPaths.GALLERY, element: <GalleryListContainer /> },
      {
        path: `/${DashboardPaths.GALLERY_DETAIL}/:id`,
        element: <GalleryDetailContainer />,
      },
      { path: DashboardPaths.APPROACH, element: <ApproachListContainer /> },
      {
        path: `/${DashboardPaths.APPROACH_DETAIL}/:id`,
        element: <ApproachDetailContainer />,
      },
      { path: DashboardPaths.REVIEW, element: <ReviewListContainer /> },
      {
        path: `/${DashboardPaths.REVIEW_DETAIL}/:id`,
        element: <ReviewDetailContainer />,
      },
      { path: DashboardPaths.WELCOME, element: <WelcomeListContainer /> },
      {
        path: `/${DashboardPaths.WELCOME_DETAIL}/:id`,
        element: <WelcomeDetailContainer />,
      },
      { path: DashboardPaths.FIND_US, element: <FindUsListContainer /> },
      {
        path: `/${DashboardPaths.FIND_US}/:id`,
        element: <FindUsDetailContainer />,
      },
      { path: DashboardPaths.CONTACT, element: <ContactListContainer /> },
      {
        path: `/${DashboardPaths.CONTACT_DETAIL}/:id`,
        element: <ContactDetailContainer />,
      },
      { path: DashboardPaths.CITY, element: <CityListContainer /> },
      {
        path: `/${DashboardPaths.CITY_DETAIL}/:id`,
        element: <CityDetailContainer />,
      },

      { path: DashboardPaths.USER, element: <RequestListContainer /> },
      {
        path: `/${DashboardPaths.USER_DETAIL}/:id`,
        element: <RequestDetailContainer />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
