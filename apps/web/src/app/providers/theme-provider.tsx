'use client';

import React, { FC, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { goldenBlackTheme } from '@packages/common';
import { CssBaseline } from '@mui/material';

interface ClientThemeProviderProps {
  children: ReactNode;
}

export const ClientThemeProvider: FC<ClientThemeProviderProps> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={goldenBlackTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
