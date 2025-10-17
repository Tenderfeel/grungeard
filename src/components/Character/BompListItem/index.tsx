import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import { Typography } from "@mui/material";
import type { Lang, Bomp } from "@submodule/zzz-wiki-scrap/src/types";

export default function BompListItem({
  bomp,
  lang,
}: {
  bomp: Bomp;
  lang: Lang;
}) {
  return (
    <ImageListItem
      key={bomp.id}
      sx={{
        position: "relative",
        cursor: "pointer",
        boxSizing: "border-box",
        borderRadius: 2,
        width: 100,
        overflow: "hidden",
        "&:hover > .bompName": {
          opacity: 1,
          transform: "scale(1.2)",
        },
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
        src={`/assets/images/stats/${bomp.stats}.png`}
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
    </ImageListItem>
  );
}
