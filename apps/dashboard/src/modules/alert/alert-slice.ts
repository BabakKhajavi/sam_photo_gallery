import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EnumSeverity, IAlert } from '@packages/common';

const initialState: IAlert = {
  alertType: EnumSeverity.INFO,
  alertMessage: '',
};
export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    removeAlert: (state) => {
      state.alertType = EnumSeverity.INFO;
      state.alertMessage = '';
    },
    updateAlert: (state, action: PayloadAction<IAlert>) => {
      const { alertType, alertMessage } = action.payload;
      state.alertType = alertType;
      state.alertMessage = alertMessage;
    },
  },
});
export const { removeAlert, updateAlert } = alertSlice.actions;
const alertReducer = alertSlice.reducer;
export { alertReducer };
