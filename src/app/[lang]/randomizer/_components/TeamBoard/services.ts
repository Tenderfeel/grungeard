import { useState, useMemo } from "react";
import { useAtomValue } from "jotai";
import type { Stats, Specialty } from "@submodule/zzz-wiki-scrap/data";
import type { Character, Bomp } from "@submodule/zzz-wiki-scrap/src/types";
import { haveCharactersAtom, haveBompsAtom } from "@/stores";
import characters from "@submodule/zzz-wiki-scrap/data/characters";
import bomps from "@submodule/zzz-wiki-scrap/data/bomps";
import type { SelectChangeEvent } from "@mui/material/Select";

type Team = {
  id: number;
  members: (Character | null)[];
  bomp: Bomp | null;
};

export default function useService() {
  const haveCharacterIds = useAtomValue(haveCharactersAtom);
  const haveBompIds = useAtomValue(haveBompsAtom);

  // チーム数
  const [teamCount, setTeamCount] = useState(1);

  const [teams, setTeams] = useState<Team[]>([]);

  // 選択中の属性
  const [selectStats, setSelectStats] = useState<Stats[]>([]);

  // 選択中の特性
  const [selectSpecialties, setSelectSpecialties] = useState<Specialty[]>([]);

  // AND | OR
  const [matchType, setMatchType] = useState("or");

  const handleMatchTypeChange = (event: SelectChangeEvent) => {
    setMatchType(event.target.value as string);
  };

  const handleStatsSelect = (newSelectStats: Stats[]) => {
    setSelectStats(newSelectStats);
  };

  const handleSpecialtySelect = (newSpecialties: Specialty[]) => {
    setSelectSpecialties(newSpecialties);
  };

  // キャラクター選抜
  const filterdCharacters = useMemo(() => {
    const results: Character[] = [];
    haveCharacterIds.forEach((characterId) => {
      // キャラクターデータ取得
      const characterData = characters.find(
        (character) => character.id === characterId
      );
      if (!characterData) return;

      // 属性と特性が選択されてない場合は全キャラ対象とする
      if (!selectStats.length && !selectSpecialties.length) {
        results.push(characterData);
      }

      // 選択された属性と特性にマッチするキャラを抽出
      const isStats = selectStats.some((stats) =>
        characterData.stats.includes(stats)
      );
      const isSpecialties = selectSpecialties.some(
        (speciality) => characterData.specialty === speciality
      );

      if (matchType === "or" && (isStats || isSpecialties)) {
        results.push(characterData);
      }

      if (matchType === "and" && isStats && isSpecialties) {
        results.push(characterData);
      }
    });
    return results;
  }, [haveCharacterIds, selectStats, selectSpecialties, matchType]);

  // ボンプ選抜（ボンプ版）
  const filteredBomps = useMemo(() => {
    const results: Bomp[] = [];
    haveBompIds.forEach((bompId) => {
      // ボンプデータ取得
      const bompData = bomps.find((bomp) => bomp.id === bompId);
      if (!bompData) return;

      // 属性が選択されてない場合は全ボンプ対象とする
      if (!selectStats.length) {
        results.push(bompData);
        return;
      }

      // 選択された属性にマッチするボンプを抽出
      if (selectStats.some((stats) => bompData.stats.includes(stats))) {
        results.push(bompData);
      }
    });
    return results;
  }, [haveBompIds, selectStats]);

  // ランダムに3体のキャラクターを選択する関数
  const getRandomCharacters = (
    characters: Character[],
    count: number = 3
  ): (Character | null)[] => {
    if (characters.length === 0) return [null, null, null];

    const shuffled = [...characters].sort(() => Math.random() - 0.5);
    const selected: (Character | null)[] = shuffled.slice(
      0,
      Math.min(count, characters.length)
    );

    // 3体に満たない場合はnullで埋める
    while (selected.length < 3) {
      selected.push(null);
    }

    return selected;
  };

  // ランダムに1つのボンプを選択する関数（ボンプ版）
  const getRandomBomp = (bomps: Bomp[]): Bomp | null => {
    if (bomps.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * bomps.length);
    return bomps[randomIndex];
  };

  // チームリスト作成（ボンプ版強化）

  function handleGenerateTeam() {
    const teams: Team[] = [];

    for (let i = 0; i < teamCount; i++) {
      const team: Team = {
        id: Date.now() + i, // より確実にユニークなIDを生成
        members: getRandomCharacters(filterdCharacters),
        bomp: getRandomBomp(filteredBomps), // ボンプもランダム選択
      };
      teams.push(team);
    }

    setTeams(teams);
  }

  return {
    selectStats,
    selectSpecialties,
    teams,
    teamCount,
    setTeamCount,
    matchType,

    handleStatsSelect,
    handleSpecialtySelect,
    handleGenerateTeam,
    handleMatchTypeChange,
  };
}
