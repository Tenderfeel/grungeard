type Lang = "en" | "ja";

// 陣営
type Faction = {
  id: number;
  name: { [key in Lang]: string };
};

// 特性
type Specialty =
  | "attack" // 強攻
  | "stun" // 撃破
  | "anomaly" //異常
  | "support" // 支援
  | "defense" // 防護
  | "rupture"; // 命破 ;

type Stats =
  | "ether" // エーテル
  | "fire" // 炎
  | "ice" //氷
  | "physical" // 物理
  | "electric" // 電気
  | "frostAttribute" // 霜烈
  | "auricInk"; // 玄墨

type AttackType =
  | "slash" // 斬撃
  | "pierce" // 刺突
  | "strike";

type Rarity = "A" | "S";

// キャラクター
type Character = {
  id: number;
  name: { [key in Lang]: string };
  fullName: { [key in Lang]: string };
  specialty: Specialty; // 特性
  stats: Stats; // 属性
  attackType: AttackType; // 攻撃タイプ
  faction: Faction<"id">; // 陣営
  rarity: Rarity; // レア度
  attr: Attributes; // ステータス
};

type Attributes = {
  // HP
  hp: number[];
  // 攻撃力
  atk: number[];
  // 防御力
  def: number[];
  // 衝撃力
  impact: number;
  // 会心率
  critRate: number;
  // 会心ダメージ
  critDmg: number;
  // 異常マスタリー
  anomalyMastery: number;
  // 異常掌握
  anomalyProficiency: number;
  // 貫通率
  penRatio: number;
  // エネルギー自動回復
  energy: number;
};
