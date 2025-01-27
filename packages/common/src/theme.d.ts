/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaletteOptions } from '@mui/material/styles';
import { Palette } from '@mui/material/styles/createPalette';
declare module '@mui/material/styles/createPalette' {
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
      light?: string;
      main?: string;
      dark?: string;
      contrastText?: string;
      lightGray?: string;
      golden?: string;
      lightGolden?: string;
    };
  }
}
