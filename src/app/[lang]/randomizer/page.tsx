import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import type { Lang } from "@submodule/zzz-wiki-scrap/src/types";

import TeamBoard from "./_components/TeamBoard";
import ResourceSelector from "@/components/ResourceSelector";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <TeamBoard lang={lang as Lang} />

        <ResourceSelector lang={lang as Lang} />
      </Box>
    </Container>
  );
}
