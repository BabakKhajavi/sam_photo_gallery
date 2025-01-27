import { createContext } from 'react';
import { ToastMessageContextType } from '../types';

export const ToastMessageContext = createContext<
  ToastMessageContextType | undefined
>(undefined);
