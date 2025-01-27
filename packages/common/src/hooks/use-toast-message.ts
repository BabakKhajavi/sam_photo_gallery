import { useContext } from 'react';
import { ToastMessageContext } from '../contexts/contexts';

export const useToastMessage = () => {
  const context = useContext(ToastMessageContext);
  if (!context) {
    throw new Error(
      'useToastMessage must be used within a ToastMessageProvider',
    );
  }
  return context;
};
