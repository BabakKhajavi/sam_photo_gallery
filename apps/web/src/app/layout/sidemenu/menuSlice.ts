import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../../types/props/category.types';
import type { MenuInitializedState } from '../../../types/props/menu.types';
import { getCategories } from './menuActions';
export const menuInitialState: MenuInitializedState = {
  isSideMenuOpen: false,
  categories: [],
  isGettingCategories: false,
};
export const menuSlice = createSlice({
  name: 'menu',
  initialState: menuInitialState,
  reducers: {
    toggleSideMenu: (state, action) => {
      state.isSideMenuOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isGettingCategories = true;
    });
    builder.addCase(
      getCategories.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isGettingCategories = false;
        state.categories = action.payload;
      },
    );
    builder.addCase(
      getCategories.rejected,
      (state, action: PayloadAction<any>) => {
        state.isGettingCategories = false;
      },
    );
  },
});
export const { toggleSideMenu } = menuSlice.actions;
const menuReducer = menuSlice.reducer;
export default menuReducer;
