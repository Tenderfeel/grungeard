/**
 * 危局強襲戦エネミーセレクター
 */
"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import type { Lang } from "@submodule/zzz-wiki-scrap/src/types";
import Image from "next/image";
import { Typography } from "@mui/material";

type DeadlyAssaultSelectorProps = { lang: Lang };

export default function DeadlyAssaultSelector({
  lang,
}: DeadlyAssaultSelectorProps) {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 400 }}>
      <Box sx={{ minWidth: 120, mt: 2 }}>
        <FormControl size="small">
          <InputLabel id="demo-simple-select-label">Target</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Target"
            onChange={handleChange}
          >
            <MenuItem value={10}>「冒涜者」</MenuItem>
            <MenuItem value={20}>ミアズマ・フィーンド・名は名なれど</MenuItem>
            <MenuItem value={30}>ミアズマの司祭</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Stack direction="row" gap={1} p={2}>
        <Image
          src="/assets/images/enemies/defiler.webp"
          width={100}
          height={138}
          alt=""
        />
        <Stack gap={1}>
          <Stack direction="row" gap={1} alignItems="center">
            <Typography variant="body2" color="textSecondary">
              弱点属性
            </Typography>

            <Stack direction="row">
              <Image
                src="/assets/images/stats/physical.png"
                width={24}
                height={24}
                alt="物理属性"
              />
              <Image
                src="/assets/images/stats/electric.png"
                width={24}
                height={24}
                alt="電気属性"
              />
            </Stack>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center">
            <Typography variant="body2" color="textSecondary">
              耐性属性
            </Typography>

            <Stack direction="row">
              <Image
                src="/assets/images/stats/ice.png"
                width={24}
                height={24}
                alt="氷属性"
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
