import { useAppSelector } from '@/store/reduxHooks';
import { type RootState } from '@/store/store';
export const useMenu = () =>
  useAppSelector((state: RootState) => state.menuReducer);
