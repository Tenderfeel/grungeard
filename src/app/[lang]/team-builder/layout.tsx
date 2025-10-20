import type { Metadata } from "next";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SiteHeader from "@/components/Site/SiteHeader";

export const metadata: Metadata = {
  title: "ZZZ Team Builder",
  description:
    "Zenless Zone Zero Web Application. Create a best team from a list of selected target monsters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <SiteHeader pageTitle="ZZZ Team Builder" />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          overflow: "hidden",
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minWidth: 0,
          }}
        >
          <Toolbar sx={{ displayPrint: "none" }} />
          <Box
            component="main"
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              overflow: "auto",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
