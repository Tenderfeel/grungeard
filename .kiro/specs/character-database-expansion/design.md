# 設計書

## 概要

この設計書では、`src/data/characters.ts`のキャラクターデータベースを拡張し、40 以上のゼンレスゾーンゼロキャラクターの完全なデータセットを実装する技術的アプローチを定義します。現在のライカンのみの実装から、すべての利用可能なキャラクター画像に対応する包括的なデータベースへと拡張します。

## アーキテクチャ

### データ構造アーキテクチャ

```typescript
// 既存のCharacter型定義（src/@types/global.d.ts）
type Character = {
  id: number;
  name: { [key in Lang]: string };
  fullName: { [key in Lang]: string };
  specialty: Specialty; // 特性
  stats: Stats; // 属性
  attackType: AttackType; // 攻撃タイプ
  faction: Faction; // 陣営
  rarity: Rarity; // レア度
  attr: Attributes; // ステータス
};

// 関連型定義
type Faction = {
  id: number;
  name: { [key in Lang]: string };
};

type Attributes = {
  hp: number[]; // HP
  atk: number[]; // 攻撃力
  def: number[]; // 防御力
  impact: number; // 衝撃力
  critRate: number; // 会心率
  critDmg: number; // 会心ダメージ
  anomalyMastery: number; // 異常マスタリー
  anomalyProficiency: number; // 異常掌握
  penRatio: number; // 貫通率
  energy: number; // エネルギー自動回復
};
```

### ファイル構成

- **メインデータファイル**: `src/data/characters.ts` - キャラクター配列のエクスポート
- **型定義**: `src/@types/global.d.ts` - Character 型と Lang 型の定義
- **画像アセット**: `public/assets/images/characters/` - キャラクター画像ファイル

## コンポーネントとインターフェース

### データ提供インターフェース

```typescript
// characters.tsのエクスポート構造
export default Character[] // キャラクター配列
```

### API エンドポイント統合

既存の`src/app/api/characters/route.ts`エンドポイントは、拡張されたキャラクターデータを自動的に提供します。

### 国際化対応

各キャラクターの`name`、`fullName`、`faction`フィールドは多言語オブジェクトとして実装：

```typescript
{
  name: {
    ja: "日本語名",
    en: "English Name"
  },
  fullName: {
    ja: "フルネーム（日本語）",
    en: "Full Name (English)"
  },
  faction: {
    id: 1, // factions.tsのIDを参照
    name: {
      ja: "派閥名（日本語）",
      en: "Faction Name (English)"
    }
  }
}
```

## データモデル

### キャラクター分類システム

#### 特技（Specialty）分類

`Specialty`型

- **attack（強攻）**: 高火力アタッカー
- **stun（撃破）**: 敵の撃破値を削る
- **anomaly（異常）**: 状態異常を付与
- **support（支援）**: チームサポート
- **defense（防護）**: 防御・シールド
- **rupture（命破）**: 新しい特技タイプ

#### 属性（Stats）分類

`Stats`型

- **physical（物理）**: 物理属性
- **fire（炎）**: 炎属性
- **ice（氷）**: 氷属性
- **electric（電気）**: 電気属性
- **ether（エーテル）**: エーテル属性
- **frostAttribute（霜烈）**: 霜烈属性
- **auricInk（玄墨）**: 玄墨属性

#### 攻撃タイプ（AttackType）分類

`AttackType`型

- **strike（打撃）**: 打撃系攻撃
- **slash（斬撃）**: 斬撃系攻撃
- **pierce（刺突）**: 刺突系攻撃

#### 陣営(faction)分類

`Faction`型は`src/data/factions.ts`で定義され、以下の構造を持ちます：

```typescript
type Faction = {
  id: number;
  name: { [key in Lang]: string };
};
```

利用可能な陣営（`src/data/factions.ts`参照）：

1. **邪兎屋** (id: 1)
   - en: Cunning Hares
2. **ヴィクトリア家政** (id: 2)
   - en: Victoria Housekeeping Co.
3. **白祇重工** (id: 3)
   - en: Belobog Heavy Industries
4. **防衛軍・オボルス小隊** (id: 4)
   - en: Defense Force - Obol Squad
5. **対ホロウ特別行動部第六課** (id: 5)
   - en: Hollow Special Operations Section 6
6. **特務捜査班** (id: 6)
   - en: Criminal Investigation Special Response Team
7. **カリュドーンの子** (id: 7)
   - en: Sons of Calydon
8. **スターズ・オブ・リラ** (id: 8)
   - en: Stars of Lyra
9. **防衛軍・シルバー小隊** (id: 9)
   - en: Defense Force - Silver Squad
10. **モッキンバード** (id: 10)
    - en: Mockingbird
11. **雲嶽山** (id: 11)
    - en: Yunkui Summit
12. **怪啖屋** (id: 12)
    - en: Spook Shack

キャラクターデータでは、陣営 ID を参照して faction を指定します。

#### レアリティシステム

`Rarity`型

- **S**: 最高レアリティ
- **A**: 標準レアリティ

#### キャラクターステータス(attr)

`Attributes`型は各キャラクターの基本ステータスを定義します。Wiki の「突破」項目で確認できる数値データです。

```typescript
type Attributes = {
  hp: number[]; // HP（レベル別配列）
  atk: number[]; // 攻撃力（レベル別配列）
  def: number[]; // 防御力（レベル別配列）
  impact: number; // 衝撃力
  critRate: number; // 会心率
  critDmg: number; // 会心ダメージ
  anomalyMastery: number; // 異常マスタリー
  anomalyProficiency: number; // 異常掌握
  penRatio: number; // 貫通率
  energy: number; // エネルギー自動回復
};
```

- **hp, atk, def**: レベル 1 からレベル 60 までの配列データ
- **その他のステータス**: 固定値として定義

### ID 管理システム

キャラクター ID は数値型で管理し、以下の原則に従います：

- 数値型（number）による一意識別子
- 1 から始まる連番
- 画像ファイル名との対応は別途管理
- データベース的な整合性を保証

### 画像ファイル対応

各キャラクターは`public/assets/images/characters/`内の対応する画像ファイルを持ちます：

- ファイル名パターン: `{character-name}.png`
- 画像とデータの 1 対 1 対応を保証

## エラーハンドリング

### データ整合性チェック

1. **型安全性**: TypeScript の型システムによる静的チェック
2. **必須フィールド**: すべての Character プロパティの存在確認
3. **列挙値検証**: specialty、stats、attackType、rarity の有効値チェック
4. **多言語対応**: ja/en キーの存在確認

### 実行時エラー対応

```typescript
// データ検証の例
const validateCharacter = (character: Character): boolean => {
  return (
    typeof character.id === "number" &&
    character.name.ja &&
    character.name.en &&
    character.fullName.ja &&
    character.fullName.en &&
    ["attack", "stun", "anomaly", "support", "defense", "rupture"].includes(
      character.specialty
    ) &&
    [
      "ether",
      "fire",
      "ice",
      "physical",
      "electric",
      "frostAttribute",
      "auricInk",
    ].includes(character.stats) &&
    ["slash", "pierce", "strike"].includes(character.attackType) &&
    character.faction.ja &&
    character.faction.en &&
    ["A", "S"].includes(character.rarity)
  );
};
```

## テスト戦略

### 単体テスト

1. **データ構造テスト**: 各キャラクターオブジェクトの型適合性
2. **必須フィールドテスト**: すべての必要プロパティの存在確認
3. **多言語テスト**: ja/en キーの存在と値の妥当性
4. **列挙値テスト**: specialty、stats、attackType、rarity の有効値確認

### 統合テスト

1. **API エンドポイントテスト**: `/api/characters`の正常動作確認
2. **画像対応テスト**: 各キャラクターに対応する画像ファイルの存在確認
3. **国際化テスト**: 日本語・英語表示の正常動作確認

### データ品質テスト

1. **完全性テスト**: すべての画像ファイルに対応するデータエントリの存在
2. **一意性テスト**: キャラクター ID の重複チェック
3. **整合性テスト**: ゲーム内データとの整合性確認

## 実装フェーズ

### フェーズ 1: データ構造準備

- 既存の Character 型定義の確認
- データ検証ユーティリティの実装

### フェーズ 2: キャラクターデータ追加

- 画像ファイルリストの分析
- 各キャラクターの基本情報収集
- データエントリの段階的追加

### フェーズ 3: データ品質保証

- 型安全性の確認
- データ完全性の検証
- テストケースの実行

### フェーズ 4: 統合とテスト

- API エンドポイントとの統合確認
- フロントエンド表示の動作確認
- 国際化機能の動作確認

## パフォーマンス考慮事項

### メモリ使用量

- 40+キャラクターのデータセットは軽量
- 静的インポートによる効率的な読み込み

### 読み込み時間

- TypeScript コンパイル時の静的解決
- バンドルサイズへの最小限の影響

### 拡張性

- 新キャラクター追加の容易性
- 既存データ構造の後方互換性維持

## セキュリティ考慮事項

### データ整合性

- TypeScript による型安全性
- 実行時データ検証

### 入力検証

- 列挙値の厳密なチェック
- 必須フィールドの存在確認

## 保守性とドキュメント

### コード品質

- 一貫した命名規則
- 適切なコメント付与
- TypeScript 型定義の活用

### 将来の拡張

- 新キャラクター追加のガイドライン
- データ構造変更時の影響範囲明確化
- バージョン管理戦略
