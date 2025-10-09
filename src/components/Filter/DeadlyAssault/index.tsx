/**
 * 危局強襲戦エネミーセレクター
 */
"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import type { Lang } from "@submodule/zzz-wiki-scrap/src/types";
import deadyAssultEnemies from "@submodule/zzz-wiki-scrap/data/deadyAssultEnemies";
import EnemyDetailCard from "./EnemyDetailCard";

type DeadlyAssaultSelectorProps = { lang: Lang };

export default function DeadlyAssaultSelector({
  lang,
}: DeadlyAssaultSelectorProps) {
  const [selectedEnemyId, setSelectedEnemyId] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedEnemyId(event.target.value as string);
  };

  const selectedEnemy = React.useMemo(() => {
    if (selectedEnemyId) {
      return deadyAssultEnemies.find((enemy) => enemy.id === selectedEnemyId);
    }
    return null;
  }, [selectedEnemyId]);

  return (
    <Box sx={{ minWidth: 400, maxWidth: 600 }}>
      <FormControl size="small" sx={{ minWidth: 120, mt: 2 }}>
        <InputLabel id="demo-simple-select-label">Target</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedEnemyId}
          label="Target"
          onChange={handleChange}
        >
          {deadyAssultEnemies.map((deadyAssultEnemy) => {
            return (
              <MenuItem key={deadyAssultEnemy.id} value={deadyAssultEnemy.id}>
                {deadyAssultEnemy.name[lang]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {selectedEnemy && (
        <EnemyDetailCard lang={lang} enemyData={selectedEnemy} />
      )}
    </Box>
  );
}
