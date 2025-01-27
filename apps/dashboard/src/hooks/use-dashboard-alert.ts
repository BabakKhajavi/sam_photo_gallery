import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/redux-hooks';
import { useToastMessage } from '@packages/common';
import { removeAlert } from '../modules/alert/alert-slice';

export const useDashboardAlert = () => {
  const dispatch = useAppDispatch();
  const { showMessage } = useToastMessage();
  const { alertType, alertMessage } = useAppSelector(
    (state) => state.alertReducer,
  );
  useEffect(() => {
    if (alertMessage) {
      showMessage(alertMessage, alertType);
      dispatch(removeAlert());
    }
  }, [alertMessage, alertType, dispatch, showMessage]);
};
