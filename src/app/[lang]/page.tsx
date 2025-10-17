import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import Image from "next/image";

import BgImage from "@/assets/images/site/bg_body.jpg";
import BgSplashImg from "@/assets/images/site/bg_splash.png";
import LogoImg from "@/assets/images/site/logo.png";

export default function Home() {
  return (
    <Box sx={{ display: "grid", overflow: "hidden" }}>
      <Image
        src={BgImage}
        alt=""
        priority={true}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          margin: 0,
          objectFit: "cover",
          gridArea: "1/1",
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100dvw",
          height: "100dvh",
          gridArea: "1/1",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            position: "relative",
            width: BgSplashImg.width,
            height: BgSplashImg.height,
            minWidth: BgSplashImg.width,
            minHeight: BgSplashImg.height,
          }}
        >
          <Image
            src={BgSplashImg}
            alt=""
            priority={true}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: -1,
            }}
          />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              margin: "1rem 0 0 0",
            }}
          >
            <Image src={LogoImg} alt="Grungerad.net" priority={true} />
          </Typography>

          <Link
            href="/randomizer"
            color="secondary"
            component={NextLink}
            sx={{ mb: 4, display: "block" }}
          >
            ZZZ Team Randomizer
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
