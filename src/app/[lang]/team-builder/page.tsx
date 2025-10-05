import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import type { Lang } from "@submodule/zzz-wiki-scrap/src/types";

import CharacterList from "@/components/Character/CharacterList/indext";

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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CharacterList lang={lang as Lang} />
      </Box>
    </Container>
  );
}
