// サブモジュールの型定義をインポート
export * from "@submodule/zzz-wiki-scrap/src/types";

// Google Analytics用のグローバル型定義
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}
