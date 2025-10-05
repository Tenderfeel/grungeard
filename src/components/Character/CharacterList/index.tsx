import * as React from "react";
import Image from "next/image";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Typography } from "@mui/material";
import type { Lang } from "@submodule/zzz-wiki-scrap/src/types";
import characters from "@submodule/zzz-wiki-scrap/data/characters";

type CharacterListProps = { lang: Lang };

export default function CharacterList({ lang }: CharacterListProps) {
  const reversedCharacters = [...characters].reverse();

  return (
    <ImageList cols={3} gap={0}>
      {reversedCharacters.map((char) => (
        <React.Fragment key={char.id}>
          <ImageListItem
            sx={{
              position: "relative",
              cursor: "pointer",
              border: "solid 2px transparent",
              boxSizing: "border-box",
            }}
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
        </React.Fragment>
      ))}
    </ImageList>
  );
}
