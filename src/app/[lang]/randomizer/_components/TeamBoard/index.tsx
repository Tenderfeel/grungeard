"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import StatsFilter from "@/components/Filter/Stats";
import SpecialtyFilter from "@/components/Filter/Specialty";
import CharacterListItem from "@/components/Character/CharacterListItem";
import BompListItem from "@/components/Character/BompListItem";
import type { Lang } from "@submodule/zzz-wiki-scrap/src/types";

import useService from "./services";

const TeamBox = styled(Paper)(({ theme }) => ({
  width: 100,
  height: 167,
  padding: 0,
  ...theme.typography.body2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const BompBox = styled(Paper)(({ theme }) => ({
  width: 100,
  height: 167,
  padding: 0,
  ...theme.typography.body2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default function TeamBoard({ lang }: { lang: Lang }) {
  const {
    selectStats,
    selectSpecialties,
    teams,
    matchType,

    handleStatsSelect,
    handleSpecialtySelect,
    handleGenerateTeam,
    handleMatchTypeChange,
  } = useService();

  return (
    <Stack gap={4} mt={2} sx={{ minWidth: 422 }}>
      <Stack gap={1}>
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
        <Button variant="contained" onClick={handleGenerateTeam}>
          Generate
        </Button>
      </Stack>

      <Stack divider={<Divider flexItem />}>
        {teams.map((team, ti) => {
          return (
            <Stack direction="row" alignItems="flex-end" gap={1} key={ti}>
              <ImageList cols={3} gap={1} sx={{ m: 0 }}>
                {team.members.map((member, mi) => {
                  if (member === null) {
                    return (
                      <ImageListItem key={mi}>
                        <TeamBox>
                          <AddIcon fontSize="large" color="disabled" />
                        </TeamBox>
                      </ImageListItem>
                    );
                  } else {
                    return (
                      <CharacterListItem key={mi} char={member} lang={lang} />
                    );
                  }
                })}
              </ImageList>
              {!team.bomp && (
                <BompBox>
                  <AddIcon fontSize="large" color="disabled" />
                </BompBox>
              )}
              {team.bomp && <BompListItem bomp={team.bomp} lang={lang} />}
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
