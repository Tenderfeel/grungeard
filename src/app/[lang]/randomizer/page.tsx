import * as React from "react";
import Container from "@mui/material/Container";
import type { Lang } from "@submodule/zzz-wiki-scrap/src/types";

import PageContent from "./_components/PageContent";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <Container maxWidth="lg" sx={{ p: 0 }}>
      <PageContent lang={lang as Lang} />
    </Container>
  );
}
