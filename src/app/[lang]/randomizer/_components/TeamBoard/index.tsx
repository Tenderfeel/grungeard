"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import StatsFilter from "@/components/Filter/Stats";
import SpecialtyFilter from "@/components/Filter/Specialty";
import CharacterListItem from "@/components/Character/CharacterListItem";
import BompListItem from "@/components/Character/BompListItem";
import type { Lang } from "@submodule/zzz-wiki-scrap/src/types";

import useService from "./services";
import { useEffect, useRef, useState } from "react";

import TeamBox from "@/components/Character/TeamBox";

// メンバー2人とボンプを並べた時の横幅
const CONTAINER_BASE_WIDTH = 422;

export default function TeamBoard({ lang }: { lang: Lang }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isBreakpointsUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const isBreakpointsDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [teamScaleTransform, setTeamScaleTransform] = useState("");

  useEffect(() => {
    // 540px 以下
    if (isBreakpointsDownSm) {
      const rect = document.body.getBoundingClientRect();
      if (!rect) return;

      if (rect.width < CONTAINER_BASE_WIDTH) {
        setTeamScaleTransform(
          `scale(${
            1 - (CONTAINER_BASE_WIDTH - rect.width + 10) / CONTAINER_BASE_WIDTH
          })`
        );
      } else {
        setTeamScaleTransform("scale(1)");
      }
    }
  }, [isBreakpointsDownSm]);

  const {
    selectStats,
    selectSpecialties,
    teams,
    matchType,

    handleStatsSelect,
    handleSpecialtySelect,
    handleGenerateTeam,
    handleMatchTypeChange,
    handleResetTeam,
  } = useService();

  return (
    <Stack
      gap={4}
      mt={2}
      id="TeamBoard"
      ref={containerRef}
      alignItems="center"
      sx={{
        minWidth: isBreakpointsUpMd ? CONTAINER_BASE_WIDTH : "inherit",
        maxWidth: "100%",
      }}
    >
      <Stack
        gap={1}
        sx={{
          maxWidth: isBreakpointsDownSm ? "calc(100% - 20px)" : "100%",
        }}
      >
        {/* 属性 */}
        <StatsFilter values={selectStats} onSelect={handleStatsSelect} />
        {/* 特性 */}
        <SpecialtyFilter
          values={selectSpecialties}
          onSelect={handleSpecialtySelect}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="match-select-label">Match type</InputLabel>
            <Select
              labelId="match-select-label"
              id="match-select"
              value={matchType}
              label="Match type"
              onChange={handleMatchTypeChange}
            >
              <MenuItem value="or">OR</MenuItem>
              <MenuItem value="and">AND</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Stack direction="row" gap={2}>
          <Button variant="outlined" onClick={handleResetTeam}>
            Reset
          </Button>
          <Button variant="contained" type="submit" sx={{ width: "70%" }}>
            Generate
          </Button>
        </Stack>
      </Stack>

      <Stack
        divider={<Divider flexItem />}
        id="TeamList"
        direction="row"
        sx={{
          transform: teamScaleTransform,
        }}
      >
        {teams.map((team, ti) => {
          return (
            <ImageList
              className="TeamItem"
              key={ti}
              cols={4}
              gap={1}
              sx={{ m: 0 }}
            >
              {team.members.map((member, mi) => {
                return <CharacterListItem key={mi} char={member} lang={lang} />;
              })}
              {!team.bomp && (
                <ImageListItem key={team.members.length + 1}>
                  <TeamBox />
                </ImageListItem>
              )}
              {team.bomp && (
                <BompListItem
                  id={team.members.length + 1}
                  bomp={team.bomp}
                  lang={lang}
                />
              )}
            </ImageList>
          );
        })}
      </Stack>
    </Stack>
  );
}
