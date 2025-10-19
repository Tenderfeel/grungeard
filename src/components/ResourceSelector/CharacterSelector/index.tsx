"use client";

import * as React from "react";
import { useAtom } from "jotai";
import Image from "next/image";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import { haveCharactersAtom } from "@/stores";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import type { Lang } from "@submodule/zzz-wiki-scrap/src/types";
import characters from "@submodule/zzz-wiki-scrap/data/characters";

type CharacterListProps = { lang: Lang };

export default function CharacterSelector({ lang }: CharacterListProps) {
  const reversedCharacters = [...characters].reverse();
  const [haveCharacters, setHaveCharacters] = useAtom(haveCharactersAtom);

  const theme = useTheme();
  const isBreakpointsUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  const handleClick = (charId: string) => {
    if (haveCharacters.includes(charId)) {
      setHaveCharacters([...haveCharacters.filter((id) => id != charId)]);
    } else {
      setHaveCharacters([...haveCharacters, charId]);
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
        id="CharacterSelector"
        cols={isBreakpointsUpLg ? 6 : 3}
        gap={1}
        rowHeight={167}
      >
        {reversedCharacters.map((char) => {
          const haveChar = haveCharacters.includes(char.id);
          return (
            <ImageListItem
              key={char.id}
              className="CharacterSelector__Item"
              sx={{
                position: "relative",
                cursor: "pointer",
                boxSizing: "border-box",
                borderRadius: 2,
                "&:hover > .charName": {
                  opacity: 1,
                  transform: "scale(1.2)",
                },
              }}
              onClick={() => handleClick(char.id)}
            >
              <Image
                src={`/assets/images/characters/${char.id}.png`}
                width={100}
                height={167}
                priority={true}
                alt=""
                style={{
                  opacity: `${haveChar ? 1 : 0.5}`,
                  transition: "all 0.3s ease",
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
                  opacity: `${haveChar ? 1 : 0.5}`,
                  transition: "all 0.3s ease",
                }}
              >
                {char.name[lang as Lang]}
              </Typography>
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
}
