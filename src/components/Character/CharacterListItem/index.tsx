import * as React from "react";
import Image from "next/image";
import ImageListItem from "@mui/material/ImageListItem";
import { Typography, Box } from "@mui/material";
import Grow from "@mui/material/Grow";
import type { Lang, Character } from "@submodule/zzz-wiki-scrap/src/types";
import TeamBox from "../TeamBox";

export default function CharacterListItem({
  char,
  lang,
}: {
  char?: Character | null;
  lang: Lang;
}) {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setChecked(char ? true : false);
  }, [char]);

  return (
    <ImageListItem
      sx={{
        position: "relative",
        cursor: "pointer",
        border: "solid 2px transparent",
        boxSizing: "border-box",
      }}
    >
      <Box>
        {!char && <TeamBox />}
        {char && (
          <Grow in={checked}>
            <Box>
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
            </Box>
          </Grow>
        )}
      </Box>
    </ImageListItem>
  );
}
