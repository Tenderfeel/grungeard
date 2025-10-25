import { atomWithStorage } from "jotai/utils";

/**
 * 所持キャラクター
 */
export const haveCharactersAtom = atomWithStorage<string[]>(
  "grungeard.zzz.haveCharacters",
  []
);

/**
 * 所持ボンプ
 */
export const haveBompsAtom = atomWithStorage<string[]>(
  "grungeard.zzz.haveBomps",
  []
);

/**
 * 所持音動機
 */
export const haveWeaponsAtom = atomWithStorage<number[]>(
  "grungeard.zzz.haveWeapons",
  []
);
