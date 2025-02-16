import { createSlice } from '@reduxjs/toolkit';
import { PageMapState } from '../../types';

const initialState: PageMapState = {
  pageTitle: '',
  referencePath: '',
  referencePageTitle: '',
};
export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    initiatePageHeader: (state) => {
      state.pageTitle = '';
      state.referencePath = '';
      state.referencePageTitle = '';
    },
    updatePagemap: (state, action) => {
      const { payload } = action;
      state.pageTitle = payload.pageTitle;
      state.referencePath = payload.referencePath;
      state.referencePageTitle = payload.referencePageTitle;
    },
  },
});
export const { initiatePageHeader, updatePagemap } = mapSlice.actions;
const mapReducer = mapSlice.reducer;
export { mapReducer };
