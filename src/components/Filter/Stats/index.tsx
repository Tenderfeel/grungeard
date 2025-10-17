"use client";

import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import statsList from "@submodule/zzz-wiki-scrap/data/stats";
import type { Stats } from "@submodule/zzz-wiki-scrap/data";
import Image from "next/image";

type StatsFilterProps = {
  values: Stats[];
  onSelect?: (selectedFormats: Stats[]) => void;
};

/**
 * 属性フィルター
 */
export default function StatsFilter({
  values,
  onSelect = () => {},
}: StatsFilterProps) {
  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newValues: Stats[]
  ) => {
    onSelect(newValues);
  };

  return (
    <ToggleButtonGroup
      value={values}
      onChange={handleFormat}
      aria-label="text formatting"
    >
      {statsList.map((statsData) => {
        return (
          <ToggleButton value={statsData.id} key={statsData.id}>
            <Image
              src={`/assets/images/stats/${statsData.id}.png`}
              width={24}
              height={24}
              priority={true}
              alt={statsData.id}
            />
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}
