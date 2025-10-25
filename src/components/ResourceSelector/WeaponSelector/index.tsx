"use client";

import * as React from "react";
import { useAtom } from "jotai";
import Image from "next/image";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import type { Lang } from "@submodule/zzz-wiki-scrap/src/types";
import weapons from "@submodule/zzz-wiki-scrap/data/weapons";
import { haveWeaponsAtom } from "@/stores";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type WeaponListProps = { lang: Lang };

/**
 * 音動機選択
 */
export default function WeaponSelector({ lang }: WeaponListProps) {
  const [haveWeapons, setHaveWeapons] = useAtom(haveWeaponsAtom);

  const theme = useTheme();
  const isBreakpointsUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  const handleClick = (weaponId: number) => {
    if (haveWeapons.includes(weaponId)) {
      setHaveWeapons([...haveWeapons.filter((id) => id != weaponId)]);
    } else {
      setHaveWeapons([...haveWeapons, weaponId]);
    }
  };

  return (
    <Box
      sx={{
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <ImageList
        id="BompSelector"
        cols={isBreakpointsUpLg ? 6 : 3}
        gap={1}
        rowHeight={100}
      >
        {weapons.map((weapon) => {
          const haveWeapon = haveWeapons.includes(weapon.id);
          return (
            <ImageListItem
              key={weapon.id}
              className="BompSelector__Item"
              sx={{
                position: "relative",
                cursor: "pointer",
                boxSizing: "border-box",
                borderRadius: 2,
                width: 100,
                overflow: "hidden",
                "&:hover > .charName": {
                  opacity: 1,
                  transform: "scale(1.2)",
                },
              }}
              onClick={() => handleClick(weapon.id)}
            >
              <Box
                sx={{
                  opacity: `${haveWeapon ? 1 : 0.5}`,
                  transition: "all 0.3s ease",
                }}
              >
                <Image
                  src={`/assets/images/weapons/${weapon.id}.png`}
                  width={100}
                  height={100}
                  priority={true}
                  alt=""
                  style={{
                    objectFit: "fill",
                    margin: "auto",
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-45%)",
                    zIndex: 0,
                  }}
                />

                {weapon.agentId && (
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      overflow: "hidden",
                      position: "absolute",
                      right: "0",
                      bottom: "10px",
                      background: "black",
                      border: "solid 2px black",
                    }}
                  >
                    <Image
                      src={`/assets/images/characters/${weapon.agentId}.png`}
                      width={24}
                      height={40}
                      priority={true}
                      alt=""
                      style={{
                        transition: "all 0.3s ease",
                        objectFit: "fill",
                        zIndex: 1,
                        marginTop: -10,
                      }}
                    />
                  </Box>
                )}

                <Image
                  src={`/assets/images/rank/${weapon.rarity}.png`}
                  width={24}
                  height={24}
                  priority={true}
                  alt=""
                  style={{
                    transition: "all 0.3s ease",
                    objectFit: "fill",
                    position: "absolute",
                    right: "24px",
                    bottom: "10px",
                    zIndex: 1,
                    background: "black",
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  width: 100,
                  height: 100,
                }}
              />
              <Typography
                className="charName"
                sx={{
                  position: "absolute",
                  right: "0.5rem",
                  top: "0.5rem",
                  fontSize: 10,
                  textShadow: "0 0 3px #000",
                  opacity: `${haveWeapon ? 1 : 0.5}`,
                  transition: "all 0.3s ease",
                }}
              >
                {weapon.name[lang as Lang]}
              </Typography>
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
}
