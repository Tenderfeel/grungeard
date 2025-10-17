"use client";
import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import type { Lang } from "@submodule/zzz-wiki-scrap/src/types";
import bomps from "@submodule/zzz-wiki-scrap/data/bomps";

type BompListProps = { lang: Lang };

export default function BompSelector({ lang }: BompListProps) {
  const [haveBomps, setHaveBomps] = React.useState<string[]>([]);

  const handleClick = (charId: string) => {
    if (haveBomps.includes(charId)) {
      setHaveBomps([...haveBomps.filter((id) => id != charId)]);
    } else {
      setHaveBomps([...haveBomps, charId]);
    }
  };

  return (
    <Box
      sx={{
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <ImageList cols={3} gap={1}>
        {bomps.map((char) => {
          const haveChar = haveBomps.includes(char.id);
          return (
            <ImageListItem
              key={char.id}
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
              onClick={() => handleClick(char.id)}
            >
              <Box
                sx={{
                  opacity: `${haveChar ? 1 : 0.5}`,
                  transition: "all 0.3s ease",
                }}
              >
                <Image
                  src={`/assets/images/bomps/${char.id}.png`}
                  width={167}
                  height={167}
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

                <Image
                  src={`/assets/images/stats/${char.stats}.png`}
                  width={24}
                  height={24}
                  priority={true}
                  alt=""
                  style={{
                    transition: "all 0.3s ease",
                    objectFit: "fill",
                    position: "absolute",
                    right: "10px",
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
                  height: 167,
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
