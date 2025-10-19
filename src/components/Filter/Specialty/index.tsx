"use client";

import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import specialties from "@submodule/zzz-wiki-scrap/data/specialties";
import type { Specialty } from "@submodule/zzz-wiki-scrap/data";
import Image from "next/image";

type SpecialtyFilterProps = {
  values: Specialty[];
  onSelect?: (selectedFormats: Specialty[]) => void;
};

/**
 * 特性フィルター
 */
export default function SpecialtyFilter({
  values,
  onSelect = () => {},
}: SpecialtyFilterProps) {
  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newValues: Specialty[]
  ) => {
    onSelect(newValues);
  };

  return (
    <ToggleButtonGroup
      value={values}
      onChange={handleFormat}
      id="SpecialityFilter"
      aria-label="Speciality Filter"
    >
      {specialties.map((specialty) => {
        return (
          <ToggleButton value={specialty.id} key={specialty.id}>
            <Image
              src={`/assets/images/specialties/${specialty.id}.png`}
              width={24}
              height={24}
              priority={true}
              alt={specialty.id}
            />
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}
