# プロジェクト構造

## ルートディレクトリ

```
├── src/                    # ソースコード
├── public/                 # 静的アセット
├── .kiro/                  # Kiro設定
├── .idx/                   # IDX開発環境
├── package.json            # 依存関係とスクリプト
├── next.config.ts          # Next.js設定
├── tsconfig.json           # TypeScript設定
├── firebase.json           # Firebaseホスティング設定
└── eslint.config.mjs       # ESLint設定
```

## ソース構造（`src/`）

### App Router（`src/app/`）

- **`[lang]/`** - 動的ロケールセグメントによる国際化ルート
  - `layout.tsx` - MUIテーマプロバイダー付きルートレイアウト
  - `page.tsx` - ホームページコンポーネント
  - `team-builder/` - チームビルダー機能ページ
- **`api/`** - APIルート
  - `characters/route.ts` - キャラクターデータエンドポイント

### コンポーネント（`src/components/`）

- **`Site/`** - サイト全体コンポーネント
  - `SiteHeader.tsx` - メインナビゲーションヘッダー
  - `ModeSwitch.tsx` - ダーク/ライトモード切り替え

### データ（`src/data/`）

- **`characters.ts`** - 多言語コンテンツ付きキャラクターデータベース

### 設定

- **`middleware.ts`** - i18nロケール検出とルーティング
- **`theme.ts`** - MUIテーマ設定
- **`@types/global.d.ts`** - グローバルTypeScript宣言

## アセット構成（`public/`）

```
public/
├── assets/
│   └── images/
│       └── characters/     # キャラクター画像
└── *.svg                   # サイトアイコンとグラフィック
```

## 命名規則

### ファイル・フォルダ

- **PascalCase** Reactコンポーネント（`SiteHeader.tsx`）
- **camelCase** ユーティリティとデータファイル（`characters.ts`）
- **kebab-case** ルートセグメント（`team-builder/`）

### コンポーネント

- **関数コンポーネント** TypeScript対応
- **Propsインターフェース** `ComponentNameProps`パターン
- **"use client"** クライアントサイドコンポーネント用ディレクティブ

### 国際化対応

- **多言語オブジェクト** `ja`と`en`キー
- **ロケールベースルーティング** `[lang]`動的セグメント経由
- **デフォルトロケール** 日本語へのフォールバック

## インポートパターン

- **絶対インポート** srcディレクトリ用`@/`エイリアス使用
- **名前付きインポート** MUIコンポーネントから
- **デフォルトインポート** Next.jsコンポーネントとユーティリティ用