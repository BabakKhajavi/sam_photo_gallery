import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { menuPath, MenuType } from '../../types';

export interface MenuStateType {
  menu: MenuType[];
}
const initialState: MenuStateType = {
  menu: menuPath,
};
export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    updateMenu: (state, action: PayloadAction<MenuType[]>) => {
      state.menu = action.payload;
    },
  },
});
export const { updateMenu } = menuSlice.actions;
const menuReducer = menuSlice.reducer;
export { menuReducer };
