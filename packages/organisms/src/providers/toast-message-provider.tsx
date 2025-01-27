import { useState, ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { EnumSeverity } from '@packages/common';
import { ToastMessageContext } from '@packages/common/src/contexts/contexts';

export const ToastMessageProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<EnumSeverity>(EnumSeverity.INFO);

  const showMessage = (message: string, severity: EnumSeverity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ToastMessageContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </ToastMessageContext.Provider>
  );
};
