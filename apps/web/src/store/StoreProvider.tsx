'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, StoreType } from './store';
import type { MenuProps } from '@/types/props/menu.types';
import { useAppDispatch } from './reduxHooks';
import { toggleSideMenu } from '@/app/layout/sidemenu/menuSlice';
export default function StoreProvider({
  menuState,
  children,
}: {
  menuState: MenuProps;
  children: React.ReactNode;
}) {
  const storeRef = useRef<StoreType | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(toggleSideMenu(menuState.isSideMenuOpen));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
