"use client";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Box from "@mui/material/Box";
import TeamBoard from "./TeamBoard";
import ResourceSelector from "@/components/ResourceSelector";

import type { Lang } from "@submodule/zzz-wiki-scrap/src/types";

export default function PageContent({ lang }: { lang: Lang }) {
  const theme = useTheme();
  const isBreakpointsUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isBreakpointsUpMd ? "row" : "column",
        justifyContent: isBreakpointsUpMd ? "center" : "flex-start",
        alignItems: isBreakpointsUpMd ? "flex-start" : "center",
        gap: 2,
      }}
    >
      <TeamBoard lang={lang as Lang} />

      <ResourceSelector lang={lang as Lang} />
    </Box>
  );
}
