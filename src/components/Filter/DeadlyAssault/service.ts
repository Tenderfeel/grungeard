import { useState, useMemo } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";

import deadlyAssultEnemies from "@submodule/zzz-wiki-scrap/data/deadlyAssultEnemies";

export function useService() {
  const [selectedEnemyId, setSelectedEnemyId] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedEnemyId(event.target.value as string);
  };

  const selectedEnemy = useMemo(() => {
    if (selectedEnemyId) {
      return deadlyAssultEnemies.find((enemy) => enemy.id === selectedEnemyId);
    }
    return null;
  }, [selectedEnemyId]);

  return {
    selectedEnemyId,

    handleChange,
    selectedEnemy,
  };
}
