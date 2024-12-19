export const UI_LANGS = ['fr', 'it', 'de', 'en', 'es', 'ca', 'eu', 'hu', 'zh_CN', 'sl'] as const;
export const API_LANGS = ['fr', 'it', 'de', 'en', 'es', 'ca', 'eu', 'zh', 'sl'] as const;

export type UiLang = (typeof UI_LANGS)[number];
export type ApiLang = (typeof API_LANGS)[number];
