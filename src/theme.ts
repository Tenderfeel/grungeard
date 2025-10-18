"use client";

import { createTheme } from "@mui/material/styles";
import { M_PLUS_1p } from "next/font/google";

const mplus1p = M_PLUS_1p({
  variable: "--font-mplus1p",
  weight: "700",
  subsets: ["latin"],
});

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  typography: {
    fontFamily: mplus1p.style.fontFamily,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 540,
      md: 768,
      lg: 1080,
      xl: 1420,
      xxl: 1920,
    },
  },
  components: {},
});

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

export default theme;
