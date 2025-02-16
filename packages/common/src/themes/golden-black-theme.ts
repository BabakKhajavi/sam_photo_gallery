import { createTheme } from '@mui/material/styles';

import { baseTheme } from './base';
declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      light: string;
      main: string;
      dark: string;
      contrastText: string;
      lightGray: string;
      golden: string;
      lightGolden: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      light: string;
      main: string;
      dark: string;
      contrastText: string;
      lightGray: string;
      golden: string;
      lightGolden: string;
    };
  }
}

export const goldenBlackTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    customColors: {
      light: '#f5e1a4',
      main: '#e4cd84',
      dark: '#b39b5e',
      contrastText: '#000',
      lightGray: '#d3d3d3',
      golden: '#e4cd84',
      lightGolden: '#f2e77e',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '8px 16px',
          color: '#e4cd84',
          backgroundColor: '#000',
          '&:hover': {
            backgroundColor: '#66666e',
          },
          '&:disabled': {
            cursor: 'default',
            backgroundColor: '#e6e8e6',
            color: '#7e7f83',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          color: '#000',
          '&.Mui-checked': {
            color: '#000',
          },
          '& .MuiSvgIcon-root': { fontSize: 28 },
        },
      },
    },
  },
});
