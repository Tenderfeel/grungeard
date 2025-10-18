import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import { Typography } from "@mui/material";
import Grow from "@mui/material/Grow";
import type { Lang, Bomp } from "@submodule/zzz-wiki-scrap/src/types";
import TeamBox from "../TeamBox";

export default function BompListItem({
  bomp,
  lang,
  id,
}: {
  bomp?: Bomp | null;
  lang: Lang;
  id?: string | number | null;
}) {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setChecked(bomp ? true : false);
  }, [bomp]);

  return (
    <ImageListItem
      key={id}
      sx={{
        position: "relative",
        cursor: "pointer",
        boxSizing: "border-box",
        borderRadius: 2,
        width: 100,
        height: 167,
        overflow: "hidden",
        "&:hover > .bompName": {
          opacity: 1,
          transform: "scale(1.2)",
        },
      }}
    >
      <Box>
        {!bomp && <TeamBox />}
        {bomp && (
          <Box>
            <Grow in={checked}>
              <Box
                sx={{
                  position: "relative",
                  width: 100,
                  height: 167,
                }}
              >
                <Image
                  src={`/assets/images/bomps/${bomp.id}.png`}
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
                  src={`/assets/images/rank/${bomp.rarity}.png`}
                  width={24}
                  height={24}
                  priority={true}
                  alt=""
                  style={{
                    transition: "all 0.3s ease",
                    objectFit: "fill",
                    position: "absolute",
                    right: "24px",
                    bottom: "0",
                    zIndex: 1,
                    background: "black",
                  }}
                />
                <Image
                  src={`/assets/images/stats/${bomp.stats}.png`}
                  width={24}
                  height={24}
                  priority={true}
                  alt=""
                  style={{
                    transition: "all 0.3s ease",
                    objectFit: "fill",
                    position: "absolute",
                    right: "0",
                    bottom: "0",
                    zIndex: 1,
                    background: "black",
                  }}
                />
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 2,
                    width: 100,
                    height: 167,
                  }}
                />
                <Typography
                  className="bompName"
                  sx={{
                    position: "absolute",
                    right: "0.5rem",
                    top: "0.5rem",
                    fontSize: 10,
                    textShadow: "0 0 3px #000",
                    transition: "all 0.3s ease",
                  }}
                >
                  {bomp.name[lang as Lang]}
                </Typography>
              </Box>
            </Grow>
          </Box>
        )}
      </Box>
    </ImageListItem>
  );
}
