'use client';

import { createTheme } from '@mui/material/styles';
import { M_PLUS_1p } from "next/font/google";

const mplus1p = M_PLUS_1p({
  variable: "--font-mplus1p",
  weight: "700",
  subsets: ["latin"],
});

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: mplus1p.style.fontFamily,
  },
  components: {
    
  },
});

export default theme;