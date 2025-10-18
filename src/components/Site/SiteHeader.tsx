"use client";

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Link from "next/link";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import ModeSwitch from "./ModeSwitch";

type SiteHeaderProps = {
  pageTitle?: string;
};

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  borderWidth: 0,
  borderBottomWidth: 1,
  borderStyle: "solid",
  borderColor: (theme.vars ?? theme).palette.divider,
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1,
  overflow: "hidden",
}));

export default function SiteHeader({ pageTitle }: SiteHeaderProps) {
  const theme = useTheme();
  return (
    <AppBar color="inherit" position="absolute" sx={{ displayPrint: "none" }}>
      <Toolbar sx={{ backgroundColor: "inherit", mx: { xs: -0.75, sm: -1 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Stack direction="row" alignItems="center">
            <Link href="/" style={{ textDecoration: "none" }}>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="h6"
                  sx={{
                    color: (theme.vars ?? theme).palette.primary.main,
                    fontWeight: "700",
                    ml: 1,
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                  }}
                >
                  {pageTitle ? pageTitle : "Grungeard.net"}
                </Typography>
              </Stack>
            </Link>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ marginLeft: "auto" }}
          >
            <Stack direction="row" alignItems="center">
              <ModeSwitch />
            </Stack>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
