"use client";
import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Tooltip from "@mui/material/Tooltip";

import type { Lang } from "@submodule/zzz-wiki-scrap/src/types";
import characters from "@submodule/zzz-wiki-scrap/data/characters";

type CharacterListProps = { lang: Lang };

export default function CharacterSelector({ lang }: CharacterListProps) {
  const reversedCharacters = [...characters].reverse();
  const [value, setValue] = React.useState(0);
  const [haveCharacters, setHaveCharacters] = React.useState<string[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClick = (charId: string) => {
    if (haveCharacters.includes(charId)) {
      setHaveCharacters([...haveCharacters.filter((id) => id != charId)]);
    } else {
      setHaveCharacters([...haveCharacters, charId]);
    }
  };

  return (
    <Box>
      <Stack>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="所有キャラ" />
        </Tabs>
      </Stack>
      <ImageList cols={3} gap={1}>
        {reversedCharacters.map((char) => {
          const haveChar = haveCharacters.includes(char.id);
          return (
            <Tooltip title={char.fullName[lang]} key={char.id} arrow>
              <ImageListItem
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  opacity: `${haveChar ? 1 : 0.5}`,
                  boxSizing: "border-box",
                  borderRadius: 2,
                }}
                onClick={() => handleClick(char.id)}
              >
                <Image
                  src={`/assets/images/characters/${char.id}.png`}
                  width={100}
                  height={167}
                  priority={true}
                  alt=""
                />
                <Typography
                  sx={{
                    position: "absolute",
                    right: "0.5rem",
                    top: "0.5rem",
                    fontSize: 10,
                    textShadow: "0 0 3px #000",
                  }}
                >
                  {char.name[lang as Lang]}
                </Typography>
              </ImageListItem>
            </Tooltip>
          );
        })}
      </ImageList>
    </Box>
  );
}
