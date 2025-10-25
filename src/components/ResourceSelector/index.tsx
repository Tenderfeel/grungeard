"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import type { Lang } from "@submodule/zzz-wiki-scrap/src/types";

import CharacterSelector from "@/components/ResourceSelector/CharacterSelector";
import BompSelector from "@/components/ResourceSelector/BompSelector";
import WeaponSelector from "./WeaponSelector";

export default function ResourceSelector({
  lang,
  showWeapon,
}: {
  lang: Lang;
  showWeapon?: boolean;
}) {
  const [value, setValue] = React.useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Stack>
        <Tabs
          value={value}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="キャラ" />
          <Tab label="ボンプ" />
          {showWeapon && <Tab label="音動機" />}
        </Tabs>
      </Stack>
      {value === 0 && <CharacterSelector lang={lang as Lang} />}
      {value === 1 && <BompSelector lang={lang as Lang} />}
      {value === 2 && showWeapon && <WeaponSelector lang={lang as Lang} />}
    </Box>
  );
}
