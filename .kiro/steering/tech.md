# 技術スタック

## コアフレームワーク

- **Next.js 15.5.4** App Routerアーキテクチャ
- **React 19.1.0** TypeScript 5対応
- **Turbopack** 高速開発・ビルド

## UI・スタイリング

- **Material-UI (MUI) v7** emotionベーススタイリング
- **CSS-in-JS** emotion/styledを使用
- **ダーク/ライトモード** MUIカラースキームシステム対応
- **M PLUS 1p** Googleフォントをタイポグラフィに使用

## 国際化対応

- **@formatjs/intl-localematcher** ロケール検出
- **negotiator** 言語設定解析
- サポートロケール: `en`（英語）、`ja`（日本語）
- デフォルトロケール: 日本語（`ja`）

## 開発ツール

- **ESLint** Next.js設定
- **TypeScript** strictモード有効
- パスエイリアス設定（`@/*` → `./src/*`）

## デプロイメント

- **Firebase Hosting** フレームワークバックエンド
- **Asia-East1** リージョン設定

## 共通コマンド

```bash
# 開発
npm run dev          # Turbopack開発サーバー起動
npm run build        # Turbopackプロダクションビルド
npm run start        # プロダクションサーバー起動
npm run lint         # ESLint実行

# 開発サーバーは http://localhost:3000 で起動
```

## ビルド設定

- **Turbopack** 開発・ビルド両方で有効
- **ES2017** ターゲット（幅広い互換性）
- **インクリメンタルコンパイル** 有効
- **TypeScript strict** 設定